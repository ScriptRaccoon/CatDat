import fs from 'node:fs'
import path from 'node:path'
import { get_property_assignments, seed_file, seed_files } from './utils/seed.helpers'
import { get_client } from '$shared/db'
import { create_schema_hash, get_saved_schema_hash } from './utils/schema'
import { STRUCTURE_TYPES, type StructureType, PLURALS } from '$shared/config'
import { capitalize, devlog } from '$shared/utils'
import {
	category_yaml_schema,
	config_yaml_schema,
	implications_yaml_schema,
	property_yaml_schema,
	special_morphism_rule_yaml_schema,
	structure_yaml_schema
} from './utils/seed.schemas'
import * as v from 'valibot'

const db = get_client({ readonly: false })

const data_folder = path.resolve('database', 'data')

const structure_history_file = path.resolve('shared', 'structure.history.json')
const structure_history: Record<string, string> = JSON.parse(
	fs.readFileSync(structure_history_file, 'utf8')
)

let structure_history_changed = false

seed()

/**
 * Seeds the data recorded in YAML files into the database.
 */
function seed() {
	console.info('\n--- Seed CatDat database ---')

	check_schema()
	clear_all_tables()
	seed_config()

	seed_properties({ type: 'category', folder: 'category-properties' })
	seed_special_morphism_rules()
	seed_implications({ type: 'category', folder: 'category-implications' })
	seed_structures({ type: 'category', folder: 'categories' })
	seed_special_category_data({ folder: 'categories' })

	seed_properties({ type: 'functor', folder: 'functor-properties' })
	seed_implications({ type: 'functor', folder: 'functor-implications' })
	seed_structures({ type: 'functor', folder: 'functors' })

	seed_properties({ type: 'morphism', folder: 'morphism-properties' })
	seed_implications({ type: 'morphism', folder: 'morphism-implications' })
	seed_structures({ type: 'morphism', folder: 'morphisms' })

	seed_properties({
		type: 'symmetric_monoidal_category',
		folder: 'symmetric_monoidal_category_properties'
	})
	seed_implications({
		type: 'symmetric_monoidal_category',
		folder: 'symmetric_monoidal_category_implications'
	})
	seed_structures({
		type: 'symmetric_monoidal_category',
		folder: 'symmetric_monoidal_categories'
	})

	if (structure_history_changed) {
		fs.writeFileSync(
			structure_history_file,
			`${JSON.stringify(structure_history, null, '\t')}\n`
		)
	}
}

/**
 * Checks if the schema is up-to-date, and throws an error otherwise.
 */
function check_schema() {
	devlog(`\nCheck schema ...`)

	const schema_hash = get_saved_schema_hash()
	const actual_hash = create_schema_hash()

	if (schema_hash !== actual_hash) {
		console.error(`❌ Your schema appears to be outdated. Run first pnpm db:setup.`)
		process.exit(1)
	}
}

/**
 * Clears all tables in the database. This is done as a first step.
 */
function clear_all_tables() {
	devlog(`\nClear all tables ...`)

	const tx = db.transaction(() => {
		db.pragma('defer_foreign_keys = ON')

		db.prepare(`DELETE FROM special_morphism_rules`).run()
		db.prepare(`DELETE FROM special_morphism_assignments`).run()
		db.prepare(`DELETE FROM special_morphisms`).run()
		db.prepare(`DELETE FROM special_object_assignments`).run()
		db.prepare(`DELETE FROM special_objects`).run()

		db.prepare(`DELETE FROM associated_assumptions`).run()
		db.prepare(`DELETE FROM assumptions`).run()
		db.prepare(`DELETE FROM conclusions`).run()
		db.prepare(`DELETE FROM implications`).run()

		db.prepare(`DELETE FROM property_assignments`).run()
		db.prepare(`DELETE FROM related_properties`).run()
		db.prepare(`DELETE FROM property_tag_assignments`).run()
		db.prepare(`DELETE FROM property_tags`).run()
		db.prepare(`DELETE FROM properties`).run()

		db.prepare(`DELETE FROM related_structures`).run()
		db.prepare(`DELETE FROM structure_comments`).run()
		db.prepare(`DELETE FROM structure_tag_assignments`).run()
		db.prepare(`DELETE FROM structure_tags`).run()
		db.prepare(`DELETE FROM relations`).run()

		db.prepare(`DELETE FROM structures`).run()
		db.prepare(`DELETE FROM associated_structures`).run()
	})

	try {
		tx()
	} catch (err) {
		console.error(`❌ Error clearing data:`, err)
		process.exit(1)
	}
}

/**
 * Seeds the data from the global config file `config.yaml`.
 */
function seed_config() {
	const structure_tag_insert = db.prepare<[string, StructureType]>(
		`INSERT INTO structure_tags (tag, type) VALUES (?, ?)`
	)

	const property_tag_insert = db.prepare<[string, StructureType]>(
		`INSERT INTO property_tags (tag, type) VALUES (?, ?)`
	)

	const relation_insert = db.prepare(
		`INSERT INTO relations (relation, negation, conditional) VALUES (?, ?, ?)`
	)

	const special_object_insert = db.prepare(
		`INSERT INTO special_objects (kind, dual) VALUES (?, ?)`
	)

	const special_morphism_insert = db.prepare(
		`INSERT INTO special_morphisms (kind, dual) VALUES (?, ?)`
	)

	function insert_config(config: v.InferOutput<typeof config_yaml_schema>) {
		for (const type of STRUCTURE_TYPES) {
			for (const tag of config.structure_tags) {
				structure_tag_insert.run(tag, type)
			}

			for (const tag of config[`${type}_tags`]) {
				structure_tag_insert.run(tag, type)
			}

			for (const tag of config[`${type}_property_tags`]) {
				property_tag_insert.run(tag, type)
			}
		}

		for (const { relation, negation, conditional } of config.relations) {
			relation_insert.run(relation, negation, conditional)
		}

		for (const { kind, dual } of config.special_objects) {
			special_object_insert.run(kind, dual)
		}

		for (const { kind, dual } of config.special_morphisms) {
			special_morphism_insert.run(kind, dual)
		}
	}

	seed_file(
		db,
		'config',
		path.join(data_folder, 'config.yaml'),
		config_yaml_schema,
		insert_config
	)
}

/**
 * Seeds special morphism deduction rules from a YAML file.
 */
function seed_special_morphism_rules() {
	const rule_insert = db.prepare(
		`INSERT INTO special_morphism_rules
			(property_id, kind, description, proof)
		VALUES (?, ?, ?, ?)`
	)

	function insert_rules(
		rules: v.InferOutput<typeof special_morphism_rule_yaml_schema>
	) {
		for (const { property, kind, description, proof } of rules) {
			rule_insert.run(property, kind, description, proof)
		}
	}

	seed_file(
		db,
		'special morphism rules',
		path.join(data_folder, 'special-morphism-rules.yaml'),
		special_morphism_rule_yaml_schema,
		insert_rules
	)
}

/**
 * Seeds all structures from YAML files of a given type,
 * including their property assignments.
 */
function seed_structures({ type, folder }: { type: StructureType; folder: string }) {
	const structure_associations = db
		.prepare<
			[StructureType],
			{ label: string; target_type: StructureType; required: 0 | 1 }
		>(
			`SELECT label, target_type, required
			FROM structure_associations WHERE source_type = ?`
		)
		.all(type)

	const structure_insert = db.prepare(
		`INSERT INTO structures (
			id, type, name, notation, description, nlab_link,
			dual_structure_id, parent_structure_id
		)
		VALUES (?, ?, ?, ?, ?, ?, ?, ?)`
	)

	const tag_insert = db.prepare(
		`INSERT INTO structure_tag_assignments (structure_id, tag, type)
		VALUES (?, ?, ?)`
	)

	const comment_insert = db.prepare(
		`INSERT INTO structure_comments (structure_id, comment)
		VALUES (?, ?)`
	)

	const related_insert = db.prepare(
		`INSERT INTO related_structures (structure_id, related_structure_id, type)
		VALUES (?, ?, ?)`
	)

	const property_assignment_insert = db.prepare(
		`INSERT INTO property_assignments (
			structure_id, property_id, type, is_satisfied,
			proof, check_redundancy, label
		) VALUES (?, ?, ?, ?, ?, ?, ?)`
	)

	const proof_reference_insert = db.prepare(
		`INSERT INTO proof_references (
			structure_id, property_id, type, reference
		) VALUES (?, ?, ?, ?)`
	)

	const associated_structure_insert = db.prepare(
		`INSERT INTO associated_structures (
			label, source_type, target_type,
			source_structure_id, target_structure_id
		) VALUES (?, ?, ?, ?, ?)`
	)

	function insert_structure(structure: v.InferOutput<typeof structure_yaml_schema>) {
		structure_insert.run(
			structure.id,
			type,
			structure.name,
			structure.notation,
			structure.description,
			structure.nlab_link,
			structure.dual || null,
			structure.parent || null
		)

		record_structure_addition(structure.id)

		for (const { label, target_type, required } of structure_associations) {
			if (required && !structure.associated?.[label]) {
				console.error(
					`❌ ${capitalize(type)} "${structure.id}" has no ${label.toString()}`
				)
				process.exit(1)
			}

			if (structure.associated?.[label]) {
				associated_structure_insert.run(
					label,
					type,
					target_type,
					structure.id,
					structure.associated?.[label]
				)
			}
		}

		for (const tag of structure.tags) {
			tag_insert.run(structure.id, tag, type)
		}

		for (const comment of structure.comments ?? []) {
			comment_insert.run(structure.id, comment)
		}

		for (const related of structure.related) {
			related_insert.run(structure.id, related, type)
		}

		const property_assignments = get_property_assignments(structure)

		for (const entry of property_assignments) {
			property_assignment_insert.run(
				structure.id,
				entry.property,
				type,
				entry.is_satisfied,
				entry.proof,
				entry.check_redundancy === false ? 0 : 1,
				entry.label || null
			)

			for (const ref of entry.references ?? []) {
				proof_reference_insert.run(structure.id, entry.property, type, ref)
			}
		}
	}

	seed_files(
		db,
		PLURALS[type],
		path.join(data_folder, folder),
		structure_yaml_schema,
		insert_structure
	)
}

/**
 * Adds the structure to the history in case it is new.
 */
function record_structure_addition(id: string) {
	if (structure_history[id]) return

	const date = new Date().toLocaleDateString('en-CA')
	structure_history[id] = date
	structure_history_changed = true
}

/**
 * Inserts data of categories that is specific to categories.
 */
function seed_special_category_data({ folder }: { folder: string }) {
	const category_insert = db.prepare(
		`INSERT INTO categories (
	        id, objects, morphisms
		) VALUES (?, ?, ?)`
	)

	const special_object_insert = db.prepare(
		`INSERT INTO special_object_assignments (
			category_id, kind, description
		) VALUES (?, ?, ?)`
	)

	const special_morphism_insert = db.prepare(
		`INSERT INTO special_morphism_assignments (
			category_id, kind, description, proof
		) VALUES (?, ?, ?, ?)`
	)

	function insert_category(category: v.InferOutput<typeof category_yaml_schema>) {
		category_insert.run(category.id, category.objects, category.morphisms)

		for (const [kind, entry] of Object.entries(category.special_objects)) {
			special_object_insert.run(category.id, kind, entry.description)
		}

		for (const [kind, entry] of Object.entries(category.special_morphisms)) {
			special_morphism_insert.run(category.id, kind, entry.description, entry.proof)
		}
	}

	seed_files(
		db,
		'special category data',
		path.join(data_folder, folder),
		category_yaml_schema,
		insert_category
	)
}

/**
 * Seeds all properties of a given type from YAML files.
 */
function seed_properties({ type, folder }: { type: StructureType; folder: string }) {
	const property_insert = db.prepare(`
		INSERT INTO properties (
			id, type, relation, description,
			nlab_link, dual_property_id,
			invariant_under_equivalences
		) VALUES (?, ?, ?, ?, ?, ?, ?)`)

	const related_insert = db.prepare(
		`INSERT INTO related_properties
			(property_id, related_property_id, type)
		VALUES (?, ?, ?)`
	)

	const tag_insert = db.prepare(
		`INSERT INTO property_tag_assignments
			(property_id, tag, type)
		VALUES (?, ?, ?)`
	)

	function insert_property(property: v.InferOutput<typeof property_yaml_schema>) {
		property_insert.run(
			property.id,
			type,
			property.relation,
			property.description,
			property.nlab_link,
			property.dual,
			Number(property.invariant_under_equivalences)
		)

		for (const related of property.related) {
			related_insert.run(property.id, related, type)
		}

		for (const tag of property.tags) {
			tag_insert.run(property.id, tag, type)
		}
	}

	seed_files(
		db,
		`properties of ${PLURALS[type]}`,
		path.join(data_folder, folder),
		property_yaml_schema,
		insert_property
	)
}

/**
 * Seeds all implications of a given type from YAML files.
 */
function seed_implications({ type, folder }: { type: StructureType; folder: string }) {
	const structure_associations = db
		.prepare<[StructureType], { label: string; target_type: StructureType }>(
			`SELECT label, target_type
			FROM structure_associations WHERE source_type = ?`
		)
		.all(type)

	const implication_insert = db.prepare(
		`INSERT INTO implications (
	        id, type, proof, is_equivalence
		) VALUES (?, ?, ?, ?)`
	)

	const assumption_insert = db.prepare(
		`INSERT INTO assumptions (
			implication_id, property_id, type
		) VALUES (?, ?, ?)`
	)

	const conclusion_insert = db.prepare(
		`INSERT INTO conclusions (
			implication_id, property_id, type
		) VALUES (?, ?, ?)`
	)

	const associated_assumption_insert = db.prepare(
		`INSERT INTO associated_assumptions (
			implication_id, label, property_id, type, property_type
		) VALUES (?, ?, ?, ?, ?)`
	)

	function insert_implications(
		implications: v.InferOutput<typeof implications_yaml_schema>
	) {
		for (const impl of implications) {
			implication_insert.run(impl.id, type, impl.proof, impl.is_equivalence ? 1 : 0)

			for (const assumption of impl.assumptions) {
				assumption_insert.run(impl.id, assumption, type)
			}

			for (const conclusion of impl.conclusions) {
				conclusion_insert.run(impl.id, conclusion, type)
			}

			if (!impl.associated_assumptions) continue

			for (const { label, target_type } of structure_associations) {
				for (const assumption of impl.associated_assumptions[label] ?? []) {
					associated_assumption_insert.run(
						impl.id,
						label,
						assumption,
						type,
						target_type
					)
				}
			}
		}
	}

	seed_files(
		db,
		`${type} implications`,
		path.join(data_folder, folder),
		implications_yaml_schema,
		insert_implications
	)
}
