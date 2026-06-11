import path from 'node:path'
import { get_client, seed_file, seed_files } from './utils/helpers'
import type {
	CategoryYaml,
	ConfigYaml,
	ImplicationYaml,
	FunctorYaml,
	PropertyEntry,
	StructureYaml,
	PropertyYaml,
} from './seed.types'
import { create_schema_hash, get_saved_schema_hash } from './utils/schema'
import { PLURALS, STRUCTURE_MAPS, type StructureType } from './config'

const db = get_client()

const data_folder = path.resolve('databases', 'catdat', 'data')

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
	seed_implications({ type: 'category', folder: 'category-implications' })
	seed_structures({ type: 'category', folder: 'categories', extra: insert_category })

	seed_properties({ type: 'functor', folder: 'functor-properties' })
	seed_implications({ type: 'functor', folder: 'functor-implications' })
	seed_structures({ type: 'functor', folder: 'functors', extra: insert_functor })
}

/**
 * Checks if the schema is up-to-date, and throws an error otherwise.
 */
function check_schema() {
	console.info(`\nCheck schema ...`)

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
	console.info(`\nClear all tables ...`)

	const tx = db.transaction(() => {
		db.pragma('defer_foreign_keys = ON')

		db.prepare(`DELETE FROM special_morphisms`).run()
		db.prepare(`DELETE FROM special_morphism_types`).run()
		db.prepare(`DELETE FROM special_objects`).run()
		db.prepare(`DELETE FROM special_object_types`).run()

		db.prepare(`DELETE FROM source_assumptions`).run()
		db.prepare(`DELETE FROM target_assumptions`).run()
		db.prepare(`DELETE FROM adjoint_functors`).run()

		db.prepare(`DELETE FROM assumptions`).run()
		db.prepare(`DELETE FROM conclusions`).run()
		db.prepare(`DELETE FROM implications`).run()

		db.prepare(`DELETE FROM property_assignments`).run()
		db.prepare(`DELETE FROM related_properties`).run()
		db.prepare(`DELETE FROM properties`).run()

		db.prepare(`DELETE FROM related_structures`).run()
		db.prepare(`DELETE FROM structure_comments`).run()
		db.prepare(`DELETE FROM structure_tag_assignments`).run()
		db.prepare(`DELETE FROM tags`).run()
		db.prepare(`DELETE FROM relations`).run()

		// this deletes categories and functors automatically
		db.prepare(`DELETE FROM structures`).run()
	})

	try {
		tx()
	} catch (err) {
		console.error(`Error clearing data:`, err)
		process.exit(1)
	}
}

/**
 * Seeds the data from the global config file `config.yaml`.
 */
function seed_config() {
	const tag_insert = db.prepare<[string, StructureType]>(
		`INSERT INTO tags (tag, type) VALUES (?, ?)`,
	)

	const relation_insert = db.prepare(
		`INSERT INTO relations (relation, conditional) VALUES (?, ?)`,
	)

	const object_insert = db.prepare(
		`INSERT INTO special_object_types (type, dual) VALUES (?, ?)`,
	)

	const morphism_insert = db.prepare(
		`INSERT INTO special_morphism_types (type, dual) VALUES (?, ?)`,
	)

	function insert_config(config: ConfigYaml) {
		for (const tag of config.shared_tags) {
			tag_insert.run(tag, 'category')
			tag_insert.run(tag, 'functor')
		}

		for (const tag of config.category_tags) {
			tag_insert.run(tag, 'category')
		}

		for (const tag of config.functor_tags) {
			tag_insert.run(tag, 'functor')
		}

		for (const { relation, conditional } of config.relations) {
			relation_insert.run(relation, conditional)
		}

		for (const { type, dual } of config.special_object_types) {
			object_insert.run(type, dual)
		}

		for (const { type, dual } of config.special_morphism_types) {
			morphism_insert.run(type, dual)
		}
	}

	seed_file(db, 'config', path.join(data_folder, 'config.yaml'), insert_config)
}

/**
 * Seeds all structures from YAML files of a given type,
 * including their property assignments.
 */
function seed_structures<T extends StructureYaml>({
	type,
	folder,
	extra,
}: {
	type: StructureType
	folder: string
	extra?: (structure: T) => void
}) {
	const structure_insert = db.prepare(
		`INSERT INTO structures (
			id, type, name, notation, description, nlab_link,
			dual_structure_id
		)
		VALUES (?, ?, ?, ?, ?, ?, ?)`,
	)

	const tag_insert = db.prepare(
		`INSERT INTO structure_tag_assignments (structure_id, tag, type)
		VALUES (?, ?, ?)`,
	)

	const comment_insert = db.prepare(
		`INSERT INTO structure_comments (structure_id, comment)
		VALUES (?, ?)`,
	)

	const related_insert = db.prepare(
		`INSERT INTO related_structures (structure_id, related_structure_id, type)
		VALUES (?, ?, ?)`,
	)

	const property_assignment_insert = db.prepare(
		`INSERT INTO property_assignments (
			structure_id, property_id, type, is_satisfied, proof, check_redundancy
		) VALUES (?, ?, ?, ?, ?, ?)`,
	)

	function insert_property_assignments(
		structure_id: string,
		entries: PropertyEntry[],
		is_satisfied: 0 | 1 | null,
	) {
		for (const entry of entries) {
			property_assignment_insert.run(
				structure_id,
				entry.property,
				type,
				is_satisfied,
				entry.proof,
				entry.check_redundancy === false ? 0 : 1,
			)
		}
	}

	function insert_structure(structure: T) {
		structure_insert.run(
			structure.id,
			type,
			structure.name,
			structure.notation,
			structure.description,
			structure.nlab_link,
			structure[`dual_${type}`] || null,
		)

		for (const tag of structure.tags) {
			tag_insert.run(structure.id, tag, type)
		}

		for (const comment of structure.comments ?? []) {
			comment_insert.run(structure.id, comment)
		}

		for (const related of structure[`related_${PLURALS[type]}`] ?? []) {
			related_insert.run(structure.id, related, type)
		}

		insert_property_assignments(structure.id, structure.satisfied_properties, 1)
		insert_property_assignments(structure.id, structure.unsatisfied_properties, 0)
		insert_property_assignments(
			structure.id,
			structure.undecidable_properties ?? [],
			null,
		)

		if (extra) extra(structure)
	}

	seed_files(db, PLURALS[type], path.join(data_folder, folder), insert_structure)
}

/**
 * Inserts the data of a category that is specific to categories.
 */
function insert_category(category: CategoryYaml) {
	const category_insert = db.prepare(
		`INSERT INTO categories (
	        id, objects, morphisms
		) VALUES (?, ?, ?)`,
	)

	const special_object_insert = db.prepare(
		`INSERT INTO special_objects (category_id, type, description) VALUES (?, ?, ?)`,
	)

	const special_morphism_insert = db.prepare(
		`INSERT INTO special_morphisms (category_id, type, description, proof)
		VALUES (?, ?, ?, ?)`,
	)

	category_insert.run(category.id, category.objects, category.morphisms)

	for (const [type, entry] of Object.entries(category.special_objects)) {
		if (!entry) continue
		special_object_insert.run(category.id, type, entry.description)
	}

	for (const [type, entry] of Object.entries(category.special_morphisms)) {
		if (!entry) continue
		special_morphism_insert.run(category.id, type, entry.description, entry.proof)
	}
}

/**
 * Inserts the data of a functor that is specific to functors.
 */
function insert_functor(functor: FunctorYaml) {
	const functor_insert = db.prepare(
		`INSERT INTO functors (id, source, target) VALUES (?, ?, ?)`,
	)

	const adjoint_insert = db.prepare(
		`INSERT INTO adjoint_functors (left_adjoint, right_adjoint)
		VALUES (?, ?)
		ON CONFLICT (left_adjoint, right_adjoint) DO NOTHING`,
	)

	functor_insert.run(functor.id, functor.source, functor.target)

	if (functor.left_adjoint) {
		adjoint_insert.run(functor.left_adjoint, functor.id)
	}
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
		VALUES (?, ?, ?)`,
	)

	function insert_property(property: PropertyYaml) {
		property_insert.run(
			property.id,
			type,
			property.relation,
			property.description,
			property.nlab_link || null,
			property.dual_property || null,
			Number(property.invariant_under_equivalences),
		)

		for (const related of property.related_properties) {
			related_insert.run(property.id, related, type)
		}
	}

	seed_files(
		db,
		`properties of ${PLURALS[type]}`,
		path.join(data_folder, folder),
		insert_property,
	)
}

/**
 * Seeds all implications of a given type from YAML files.
 */
function seed_implications({ type, folder }: { type: StructureType; folder: string }) {
	const implication_insert = db.prepare(
		`INSERT INTO implications (
	        id, type, proof, is_equivalence
		) VALUES (?, ?, ?, ?)`,
	)

	const assumption_insert = db.prepare(
		`INSERT INTO assumptions (
			implication_id, property_id, type
		) VALUES (?, ?, ?)`,
	)

	const source_assumption_insert = db.prepare(
		`INSERT INTO source_assumptions (
			implication_id, property_id, type, property_type
		) VALUES (?, ?, ?, ?)`,
	)

	const target_assumption_insert = db.prepare(
		`INSERT INTO target_assumptions (
			implication_id, property_id, type, property_type
		) VALUES (?, ?, ?, ?)`,
	)

	const mapped_assumption_inserts = {
		source: source_assumption_insert,
		target: target_assumption_insert,
	}

	const conclusion_insert = db.prepare(
		`INSERT INTO conclusions (
			implication_id, property_id, type
		) VALUES (?, ?, ?)`,
	)

	function insert_implications(implications: ImplicationYaml[]) {
		for (const impl of implications) {
			implication_insert.run(impl.id, type, impl.proof, Number(impl.is_equivalence))

			for (const assumption of impl.assumptions) {
				assumption_insert.run(impl.id, assumption, type)
			}

			for (const conclusion of impl.conclusions) {
				conclusion_insert.run(impl.id, conclusion, type)
			}

			for (const map of STRUCTURE_MAPS) {
				const [name, from, to] = map
				if (from !== type) continue

				for (const assumption of impl[`${name}_assumptions`] ?? []) {
					mapped_assumption_inserts[name].run(impl.id, assumption, type, to)
				}
			}
		}
	}

	seed_files(
		db,
		`${type} implications`,
		path.join(data_folder, folder),
		insert_implications,
	)
}
