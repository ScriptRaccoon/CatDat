import { devlog, format_row } from '#shared/utils.ts'
import { get_anchor_ids } from '#shared/content.ts'
import { STRUCTURE_TYPES, type StructureType } from '#shared/config.ts'
import { decode_property_ID } from '#shared/property.utils.ts'
import MarkdownIt from 'markdown-it'
import fs from 'node:fs'
import path from 'node:path'
import { db } from './db'

const get_assignment_status = db.prepare<
	[string, string, StructureType],
	{ is_deduced: number }
>(
	`SELECT is_deduced FROM property_assignments
	WHERE structure_id = ? AND property_id = ? AND type = ?`
)

const get_special_morphism_status = db.prepare<[string, string], { is_deduced: number }>(
	`SELECT is_deduced FROM special_morphism_assignments
	WHERE category_id = ? AND kind = ?`
)

const get_entry = {
	structures: db.prepare<[string, string], string>(
		`SELECT id FROM structures WHERE id = ? AND type = ?`
	),
	properties: db.prepare<[string, string], string>(
		`SELECT id FROM properties WHERE id = ? AND type = ?`
	),
	implications: db.prepare<[string, string], string>(
		`SELECT id FROM implications WHERE id = ? AND type = ?`
	)
}

/**
 * Checks if all links in the database and in the content pages refer to existing entries.
 */
export function check_link_targets_exist() {
	const content_pages = get_content_pages()

	const content_links = [...content_pages].flatMap(([id, { markdown }]) =>
		get_link_tags(markdown).map((link) => ({
			text: link,
			error_prefix: `❌ Content page ${id}`
		}))
	)

	const texts = [...content_links, ...get_database_texts()]

	for (const { text, error_prefix } of texts) {
		const link_regex = new RegExp(
			`<a\\s+href="\\/(${STRUCTURE_TYPES.join('|')})(?:-(implication|property))?\\/([^"?]+)(?:\\?([^"]*))?"([^>]*)>`,
			'g'
		)

		for (const match of text.matchAll(link_regex)) {
			const type = match[1] as StructureType
			const id = match[3]
			const query = match[4]
			const allow_deduced = /\sdata-allow-deduced(?=[\s=]|$)/.test(match[5])
			const sort =
				match[2] === 'implication'
					? 'implications'
					: match[2] === 'property'
						? 'properties'
						: 'structures'

			const decoded_id = sort === 'properties' ? decode_property_ID(id) : id

			const exists = get_entry[sort].get(decoded_id, type)

			if (!exists) {
				throw new Error(
					`${error_prefix} has a link to "${id}" which does not exist:\n"${text}"`
				)
			}

			if (query === undefined) {
				if (allow_deduced) {
					throw new Error(
						`${error_prefix} has a link to "${id}" with data-allow-deduced, but without "?proof=":\n"${text}"`
					)
				}
				continue
			}

			if (sort !== 'structures') {
				throw new Error(
					`${error_prefix} has a link to "${id}" with a query, which is only supported for structures:\n"${text}"`
				)
			}

			check_proof_link_target(
				id,
				type,
				new URLSearchParams(query),
				error_prefix,
				allow_deduced
			)
		}

		const content_link_regex = /<a\s+href="\/content\/([^"#]+)(?:#([^"]+))?"/g

		for (const match of text.matchAll(content_link_regex)) {
			const [, content_id, anchor] = match
			check_content_link(
				content_pages.get(content_id),
				content_id,
				anchor,
				error_prefix
			)
		}
	}

	const anchor_link_regex = /\]\(#([^)]+)\)/g

	for (const [content_id, page] of content_pages) {
		for (const [, anchor] of page.markdown.matchAll(anchor_link_regex)) {
			check_content_link(page, content_id, anchor, `❌ Content page ${content_id}`)
		}
	}

	devlog(`✅ Link targets exist`)
}

/**
 * Checks the query of a link to a proof on a structure page. A link with
 * "?proof=<key>" cites the argument of a proof, so the proof must be
 * assigned (not deduced). A link marked with "data-allow-deduced" cites
 * only the statement, so its target may also be deduced. The key is the
 * ID of a property or, for categories, the kind of a special morphism.
 */
function check_proof_link_target(
	structure_id: string,
	type: StructureType,
	params: URLSearchParams,
	error_prefix: string,
	allow_deduced: boolean
) {
	const keys = [...params.keys()]

	if (keys.length !== 1 || keys[0] !== 'proof') {
		throw new Error(
			`${error_prefix} has a link to "${structure_id}" with an invalid query "${params}"`
		)
	}

	const proof_key = decode_property_ID(params.get('proof')!)

	const assignment = get_assignment_status.get(structure_id, proof_key, type)

	const special_morphism =
		type === 'category'
			? get_special_morphism_status.get(structure_id, proof_key)
			: undefined

	const target = assignment ?? special_morphism

	if (!target) {
		throw new Error(
			`${error_prefix} links to the proof of "${proof_key}" for "${structure_id}", which does not exist`
		)
	}

	if (target.is_deduced && !allow_deduced) {
		throw new Error(
			`${error_prefix} links to the proof of "${proof_key}" for "${structure_id}", which is deduced. Rewrite the citing proof, or add data-allow-deduced to the link if it cites only the statement.`
		)
	}
}

type ContentPage = { markdown: string; anchors: Set<string> }

/**
 * Returns the markdown and the anchor IDs of the headings and theorem environments
 * of each content page, and checks that no anchor ID occurs twice on a page.
 */
function get_content_pages() {
	const content_pages = new Map<string, ContentPage>()

	for (const file of fs.readdirSync(path.resolve('content'))) {
		if (!file.endsWith('.md')) continue
		const content_id = path.basename(file, '.md')
		const markdown = fs.readFileSync(path.resolve('content', file), 'utf8')
		const ids = get_anchor_ids(markdown)
		const anchors = new Set(ids)

		if (anchors.size !== ids.length) {
			const duplicate = ids.find((id, i) => ids.indexOf(id) !== i)
			throw new Error(
				`Content page ${content_id} has two headings or theorem environments with the anchor "${duplicate}"`
			)
		}

		content_pages.set(content_id, { markdown, anchors })
	}

	return content_pages
}

const md = new MarkdownIt({ html: true })

/**
 * Returns the opening HTML tags of all links on a content page
 */
function get_link_tags(markdown: string): string[] {
	return md.render(markdown).match(/<a\s[^>]*>/g) ?? []
}

/**
 * Checks if a link to a content page, optionally with an anchor, has a target.
 * The page is undefined if the linked content page does not exist.
 */
function check_content_link(
	page: ContentPage | undefined,
	content_id: string,
	anchor: string | undefined,
	error_prefix: string
) {
	if (!page) {
		throw new Error(
			`${error_prefix} has a link to "${content_id}" which does not exist`
		)
	}

	if (anchor !== undefined && !page.anchors.has(anchor)) {
		throw new Error(
			`${error_prefix} has a link to "${content_id}#${anchor}" which does not exist`
		)
	}
}

/**
 * Returns the texts with links in all text columns of all tables, i.e. the texts
 * from the YAML files as well as those created by the deduction. Each text comes
 * with the other values of its row, so that the row can be identified.
 * The texts are read from the database instead of the YAML files, since the
 * texts created by the deduction exist only in the database.
 */
function get_database_texts() {
	const tables = db
		.prepare<never[], string>(
			`SELECT name FROM sqlite_schema
			WHERE type = 'table' AND name NOT LIKE 'sqlite_%'`
		)
		.pluck()
		.all()

	return tables.flatMap((table) => {
		const text_columns = db
			.prepare<[string], string>(
				`SELECT name FROM pragma_table_info(?) WHERE type = 'TEXT'`
			)
			.pluck()
			.all(table)

		// only the rows whose text in this column contains a link
		return text_columns.flatMap((column) =>
			db
				.prepare<never[], Record<string, unknown>>(
					`SELECT * FROM "${table}" WHERE "${column}" LIKE '%<a %'`
				)
				.all()
				.map((row) => ({
					text: String(row[column]),
					error_prefix: `❌ ${table}.${column} ${format_row(row, column)}`
				}))
		)
	})
}
