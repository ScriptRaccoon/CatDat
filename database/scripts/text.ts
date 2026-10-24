import chokidar from 'chokidar'
import * as v from 'valibot'
import { get_client, mark_database_update } from '#shared/db.ts'
import { STRUCTURE_TYPES, type StructureType } from '#shared/config.ts'
import { get_property_assignments, parse_folder } from './utils/seed.helpers'
import {
	category_yaml_schema,
	implications_yaml_schema,
	property_yaml_schema,
	structure_yaml_schema
} from './utils/seed.schemas'
import { get_data_folders } from './utils/folders'
import { are_equal_lists } from '#shared/utils.ts'

const db = get_client({ readonly: false })

/**
 * Labels of the counted updates, in the order they are reported
 */
const UPDATE_LABELS = [
	'structure names',
	'structure notations',
	'structure alternative notations',
	'structure descriptions',
	'structure nLab links',
	'structure comments',
	'structure keywords',
	'object descriptions',
	'morphism descriptions',
	'proofs',
	'property descriptions',
	'property nLab links',
	'property keywords',
	'implication proofs'
] as const

type UpdateLabel = (typeof UPDATE_LABELS)[number]

const watch_mode = process.argv.includes('--watch')

if (watch_mode) {
	watch()
} else {
	run_text_update()
}

/**
 * Updates text-only changes to existing structures, properties, and implications
 */
function run_text_update() {
	try {
		const data = STRUCTURE_TYPES.map((type) => {
			const folders = get_data_folders(type)

			return {
				type,
				structures: parse_folder(folders.structures, structure_yaml_schema),
				categories:
					type === 'category'
						? parse_folder(folders.structures, category_yaml_schema)
						: [],
				properties: parse_folder(folders.properties, property_yaml_schema),
				implications: parse_folder(
					folders.implications,
					implications_yaml_schema
				).flat()
			}
		})

		const counts = new Map<UpdateLabel, number>(
			UPDATE_LABELS.map((label) => [label, 0])
		)

		function record(label: UpdateLabel) {
			counts.set(label, (counts.get(label) ?? 0) + 1)
		}

		db.transaction(() => {
			for (const {
				type,
				structures,
				categories,
				properties,
				implications
			} of data) {
				for (const structure of structures) {
					update_structure(structure, record)
				}

				for (const category of categories) {
					update_category(category, record)
				}

				for (const property of properties) {
					update_property(type, property, record)
				}

				for (const implication of implications) {
					update_implication(implication, record)
				}
			}
		})()

		const update_txt = UPDATE_LABELS.filter((label) => counts.get(label))
			.map((label) => `${counts.get(label)} ${label}`)
			.join(', ')

		if (update_txt) {
			console.info(`Updated text: ${update_txt}.`)
			mark_database_update()
		} else {
			console.info('Text is up to date.')
		}
	} catch (error) {
		console.error(error instanceof Error ? error.message : error)
		if (!watch_mode) process.exitCode = 1
	}
}

/**
 * Updates the text fields of a structure, its comments and keywords,
 * and the proofs of its property assignments
 */
function update_structure(
	structure: v.InferOutput<typeof structure_yaml_schema>,
	record: (label: UpdateLabel) => void
) {
	const existing_structure = db
		.prepare<
			[string],
			{
				name: string
				notation: string
				alternative_notation: string | null
				description: string
				nlab_link: string | null
			}
		>(
			`SELECT name, notation, alternative_notation, description, nlab_link
			FROM structures WHERE id = ?`
		)
		.get(structure.id)

	if (!existing_structure) {
		throw new Error(`Structure ${structure.id} is missing; run pnpm db:update first.`)
	}

	const fields: [keyof typeof existing_structure, string | null, UpdateLabel][] = [
		['name', structure.name, 'structure names'],
		['notation', structure.notation, 'structure notations'],
		[
			'alternative_notation',
			structure.alternative_notation || null,
			'structure alternative notations'
		],
		['description', structure.description, 'structure descriptions'],
		['nlab_link', structure.nlab_link, 'structure nLab links']
	]

	for (const [column, value, label] of fields) {
		if (existing_structure[column] === value) continue
		db.prepare(`UPDATE structures SET ${column} = ? WHERE id = ?`).run(
			value,
			structure.id
		)
		record(label)
	}

	const existing_comments = db
		.prepare<[string], { comment: string }>(
			`SELECT comment FROM structure_comments
			WHERE structure_id = ? ORDER BY id`
		)
		.all(structure.id)
		.map(({ comment }) => comment)

	const comments = structure.comments ?? []

	if (!are_equal_lists(existing_comments, comments)) {
		db.prepare(`DELETE FROM structure_comments WHERE structure_id = ?`).run(
			structure.id
		)
		const comment_insert = db.prepare(
			`INSERT INTO structure_comments (structure_id, comment) VALUES (?, ?)`
		)
		for (const comment of comments) {
			comment_insert.run(structure.id, comment)
		}
		record('structure comments')
	}

	const existing_keywords = db
		.prepare<[string], { keyword: string }>(
			`SELECT keyword FROM structure_keywords
			WHERE structure_id = ? ORDER BY rowid`
		)
		.all(structure.id)
		.map(({ keyword }) => keyword)

	const keywords = structure.keywords ?? []

	if (!are_equal_lists(existing_keywords, keywords)) {
		db.prepare(`DELETE FROM structure_keywords WHERE structure_id = ?`).run(
			structure.id
		)
		const keyword_insert = db.prepare(
			`INSERT INTO structure_keywords (structure_id, keyword) VALUES (?, ?)`
		)
		for (const keyword of keywords) {
			keyword_insert.run(structure.id, keyword)
		}
		record('structure keywords')
	}

	for (const assignment of get_property_assignments(structure)) {
		const existing_assignment = db
			.prepare<[string, string], { proof: string; is_deduced: number }>(
				`SELECT proof, is_deduced FROM property_assignments
				WHERE structure_id = ? AND property_id = ?`
			)
			.get(structure.id, assignment.property)

		if (!existing_assignment) {
			throw new Error(
				`Property assignment ${structure.id}/${assignment.property} is missing; run pnpm db:update first.`
			)
		}

		if (existing_assignment.is_deduced) {
			throw new Error(
				`Property assignment ${structure.id}/${assignment.property} is derived; run pnpm db:update first.`
			)
		}

		if (existing_assignment.proof !== assignment.proof) {
			db.prepare(
				`UPDATE property_assignments SET proof = ?
				WHERE structure_id = ? AND property_id = ? AND is_deduced = FALSE`
			).run(assignment.proof, structure.id, assignment.property)
			record('proofs')
		}
	}
}

/**
 * Updates the descriptions of objects and morphisms of a category
 */
function update_category(
	category: v.InferOutput<typeof category_yaml_schema>,
	record: (label: UpdateLabel) => void
) {
	const existing = db
		.prepare<[string], { objects: string; morphisms: string }>(
			`SELECT objects, morphisms FROM categories WHERE id = ?`
		)
		.get(category.id)

	if (!existing)
		throw new Error(`Category ${category.id} is missing; run pnpm db:update first.`)

	if (existing.objects !== category.objects) {
		db.prepare(`UPDATE categories SET objects = ? WHERE id = ?`).run(
			category.objects,
			category.id
		)
		record('object descriptions')
	}

	if (existing.morphisms !== category.morphisms) {
		db.prepare(`UPDATE categories SET morphisms = ? WHERE id = ?`).run(
			category.morphisms,
			category.id
		)
		record('morphism descriptions')
	}
}

/**
 * Updates the description, nLab link, and keywords of a property
 */
function update_property(
	type: StructureType,
	property: v.InferOutput<typeof property_yaml_schema>,
	record: (label: UpdateLabel) => void
) {
	const existing = db
		.prepare<
			[string, StructureType],
			{ description: string; nlab_link: string | null }
		>(`SELECT description, nlab_link FROM properties WHERE id = ? AND type = ?`)
		.get(property.id, type)

	if (!existing)
		throw new Error(
			`Property ${type}/${property.id} is missing; run pnpm db:update first.`
		)

	if (existing.description !== property.description) {
		db.prepare(`UPDATE properties SET description = ? WHERE id = ? AND type = ?`).run(
			property.description,
			property.id,
			type
		)
		record('property descriptions')
	}

	if (existing.nlab_link !== property.nlab_link) {
		db.prepare(`UPDATE properties SET nlab_link = ? WHERE id = ? AND type = ?`).run(
			property.nlab_link,
			property.id,
			type
		)
		record('property nLab links')
	}

	const existing_keywords = db
		.prepare<[string, StructureType], { keyword: string }>(
			`SELECT keyword FROM property_keywords
			WHERE property_id = ? AND type = ? ORDER BY rowid`
		)
		.all(property.id, type)
		.map(({ keyword }) => keyword)

	const keywords = property.keywords ?? []

	if (!are_equal_lists(existing_keywords, keywords)) {
		db.prepare(
			`DELETE FROM property_keywords WHERE property_id = ? AND type = ?`
		).run(property.id, type)
		const keyword_insert = db.prepare(
			`INSERT INTO property_keywords (property_id, type, keyword) VALUES (?, ?, ?)`
		)
		for (const keyword of keywords) {
			keyword_insert.run(property.id, type, keyword)
		}
		record('property keywords')
	}
}

/**
 * Updates the proof of an implication
 */
function update_implication(
	implication: v.InferOutput<typeof implications_yaml_schema>[number],
	record: (label: UpdateLabel) => void
) {
	const existing = db
		.prepare<[string], { proof: string; is_deduced: number }>(
			`SELECT proof, is_deduced FROM implications WHERE id = ?`
		)
		.get(implication.id)

	if (!existing)
		throw new Error(
			`Implication ${implication.id} is missing; run pnpm db:update first.`
		)

	if (existing.is_deduced)
		throw new Error(
			`Implication ${implication.id} is derived; run pnpm db:update first.`
		)

	if (existing.proof !== implication.proof) {
		db.prepare(`UPDATE implications SET proof = ? WHERE id = ?`).run(
			implication.proof,
			implication.id
		)
		record('implication proofs')
	}
}

function watch() {
	const watched_folders = STRUCTURE_TYPES.flatMap((type) =>
		Object.values(get_data_folders(type))
	)
	let update_timer: NodeJS.Timeout | undefined

	function on_change(file: string) {
		if (!file.endsWith('.yaml')) return
		console.info(`File changed: ${file}`)
		if (update_timer) clearTimeout(update_timer)
		update_timer = setTimeout(() => run_text_update(), 150)
	}

	const watcher = chokidar.watch(watched_folders, {
		persistent: true,
		ignoreInitial: true,
		awaitWriteFinish: { stabilityThreshold: 200, pollInterval: 50 }
	})

	watcher.on('add', on_change).on('change', on_change).on('unlink', on_change)
	console.info(`Watching for text changes...`)
}
