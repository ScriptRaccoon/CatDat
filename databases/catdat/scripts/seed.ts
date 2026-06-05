import path from 'node:path'
import { get_client, seed_file, seed_files, pluralize } from './utils/helpers'
import { create_schema_hash, get_saved_schema_hash } from './utils/schema'
import { PROOF_LENGTH_THRESHOLD, STRUCTURE_MAPS, type StructureType } from './config'
import type {
	CategoryYaml,
	ConfigYaml,
	PropertyYaml,
	FunctorYaml,
	ProofWarning,
	PropertyEntry,
	StructureYaml,
	ImplicationYaml,
} from './seed.types'

const db = get_client()

const data_folder = path.resolve('databases', 'catdat', 'data')

const proof_length_warnings: ProofWarning[] = []

seed()

/**
 * Seeds the data recorded in YAML files into the database.
 */
function seed() {
	console.info('\n--- Seed CatDat database ---')

	const schema_hash = get_saved_schema_hash()
	const actual_hash = create_schema_hash()

	if (schema_hash !== actual_hash) {
		console.error(`❌ Your schema appears to be outdated. Run first pnpm db:setup.`)
		process.exit(1)
	}

	clear_all_tables()

	seed_config()

	seed_properties('category')
	seed_implications('category')
	seed_structures('category', insert_category)

	seed_properties('functor')
	seed_implications('functor')
	seed_structures('functor', insert_functor)

	print_proof_length_warnings()
}

/**
 * Clears all tables in the database. This is done as a first step.
 */
function clear_all_tables() {
	console.info(`\nClear all tables ...`)

	const tx = db.transaction(() => {
		db.prepare(`DELETE FROM special_morphisms`).run()
		db.prepare(`DELETE FROM special_morphism_types`).run()
		db.prepare(`DELETE FROM special_objects`).run()
		db.prepare(`DELETE FROM special_object_types`).run()

		db.prepare(`DELETE FROM structure_map_values`).run()

		db.prepare(`DELETE FROM assumptions`).run()
		db.prepare(`DELETE FROM mapped_assumptions`).run()
		db.prepare(`DELETE FROM conclusions`).run()
		db.prepare(`DELETE FROM implications`).run()

		db.prepare(`DELETE FROM property_assignments`).run()
		db.prepare(`DELETE FROM related_properties`).run()
		db.prepare(`DELETE FROM dual_properties`).run()
		db.prepare(`DELETE FROM properties`).run()

		db.prepare(`DELETE FROM related_structures`).run()
		db.prepare(`DELETE FROM dual_structures`).run()
		db.prepare(`DELETE FROM structure_comments`).run()
		db.prepare(`DELETE FROM tag_assignments`).run()
		db.prepare(`DELETE FROM structures`).run()

		db.prepare(`DELETE FROM categories`).run()

		db.prepare(`DELETE FROM tags`).run()
		db.prepare(`DELETE FROM relations`).run()
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
	const tag_insert = db.prepare(`INSERT INTO tags (tag, type) VALUES (?, ?)`)

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
 * Seeds all properties of a given structure type from YAML files.
 */
function seed_properties(type: StructureType) {
	const property_insert = db.prepare(
		`INSERT INTO properties (
			id, type, relation, description, nlab_link,
			invariant_under_equivalences
		) VALUES (?, ?, ?, ?, ?, ?)`,
	)

	const related_insert = db.prepare(
		`INSERT INTO related_properties (property, related_property, type) VALUES (?, ?, ?)`,
	)

	const dual_insert = db.prepare(
		`INSERT INTO dual_properties (property, dual_property, type) VALUES (?, ?, ?)`,
	)

	function insert_property(property: PropertyYaml) {
		property_insert.run(
			property.id,
			type,
			property.relation,
			property.description,
			property.nlab_link || null,
			Number(property.invariant_under_equivalences),
		)

		for (const related of property.related_properties) {
			related_insert.run(property.id, related, type)
		}

		if (property.dual_property) {
			dual_insert.run(property.id, property.dual_property, type)
		}
	}

	seed_files(
		db,
		`${type} properties`,
		path.join(data_folder, `${type}-properties`),
		insert_property,
	)
}

/**
 * Seeds all structures of a given type from YAML files,
 * including their related structures and property assignments.
 */
function seed_structures<Struct extends StructureYaml>(
	type: StructureType,
	extra?: (item: Struct) => void,
) {
	const structure_insert = db.prepare(
		`INSERT INTO structures (
	        id, type, name, notation, description, nlab_link
		) VALUES (?, ?, ?, ?, ?, ?)`,
	)

	const tag_insert = db.prepare(
		`INSERT INTO tag_assignments (structure, type, tag) VALUES (?, ?, ?)`,
	)

	const comment_insert = db.prepare(
		`INSERT INTO structure_comments (structure, type, comment) VALUES (?, ?, ?)`,
	)

	const related_insert = db.prepare(
		`INSERT INTO related_structures (structure, related_structure, type) VALUES (?, ?, ?)`,
	)

	const property_assignment_insert = db.prepare(
		`INSERT INTO property_assignments (
			type, structure, property,
			is_satisfied, proof, check_redundancy
		) VALUES (?, ?, ?, ?, ?, ?)`,
	)

	function insert_property_assignments(
		structure_id: string,
		entries: PropertyEntry[],
		is_satisfied: 0 | 1 | null,
	) {
		for (const entry of entries) {
			property_assignment_insert.run(
				type,
				structure_id,
				entry.property,
				is_satisfied,
				entry.proof,
				entry.check_redundancy === false ? 0 : 1,
			)
			if (entry.proof.length >= PROOF_LENGTH_THRESHOLD) {
				proof_length_warnings.push({
					structure: structure_id,
					type,
					property: entry.property,
					length: entry.proof.length,
				})
			}
		}
	}

	function insert_structure(structure: Struct) {
		structure_insert.run(
			structure.id,
			type,
			structure.name,
			structure.notation,
			structure.description,
			structure.nlab_link,
		)

		for (const tag of structure.tags) {
			tag_insert.run(structure.id, type, tag)
		}

		for (const comment of structure.comments ?? []) {
			comment_insert.run(structure.id, type, comment)
		}

		for (const related of structure.related) {
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

	seed_files(
		db,
		pluralize(type),
		path.join(data_folder, pluralize(type)),
		insert_structure,
	)
}

/**
 * Inserts the data of a category that is only relevant for categories.
 */
function insert_category(category: CategoryYaml) {
	const category_insert = db.prepare(`
		INSERT INTO categories (id, objects, morphisms) VALUES (?, ?, ?)
	`)

	const dual_insert = db.prepare(`
		INSERT INTO dual_structures (type, structure, dual_structure)
		VALUES ('category', ?, ?)`)

	const special_object_insert = db.prepare(
		`INSERT INTO special_objects (category, type, description) VALUES (?, ?, ?)`,
	)

	const special_morphism_insert = db.prepare(
		`INSERT INTO special_morphisms (category, type, description, proof)
		VALUES (?, ?, ?, ?)`,
	)

	category_insert.run(category.id, category.objects, category.morphisms)

	if (category.dual_category) {
		dual_insert.run(category.id, category.dual_category)
	}

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
 * Inserts the data of a functor that is only relevant for functors.
 */
function insert_functor(functor: FunctorYaml) {
	const value_insert = db.prepare(
		`INSERT INTO structure_map_values
			(map, input, input_type, output, output_type)
		VALUES (?, ?, 'functor', ?, ?)`,
	)

	// TODO: refactor this using the STRUCTURE_MAPS object

	value_insert.run('source', functor.id, functor.source, 'category')
	value_insert.run('target', functor.id, functor.target, 'category')

	if (functor.left_adjoint) {
		value_insert.run('left_adjoint', functor.id, functor.left_adjoint, 'functor')
	}
}

/**
 * Seeds all implications between properties from YAML files.
 */
function seed_implications(type: StructureType) {
	const implication_insert = db.prepare(
		`INSERT INTO implications (
	        id, type, proof, is_equivalence
		) VALUES (?, ?, ?, ?)`,
	)

	const assumption_insert = db.prepare(
		`INSERT INTO assumptions (implication, property, type) VALUES (?, ?, ?)`,
	)

	const mapped_assumption_insert = db.prepare(
		`INSERT INTO mapped_assumptions
			(map, implication, implication_type, property, property_type)
		VALUES (?, ?, ?, ?, ?)`,
	)

	const conclusion_insert = db.prepare(
		`INSERT INTO conclusions (implication, property, type) VALUES (?, ?, ?)`,
	)

	function insert_implication(impl: ImplicationYaml) {
		implication_insert.run(impl.id, type, impl.proof, Number(impl.is_equivalence))

		for (const p of impl.assumptions) {
			assumption_insert.run(impl.id, p, type)
		}

		for (const q of impl.conclusions) {
			conclusion_insert.run(impl.id, q, type)
		}

		if (impl.mapped_assumptions) {
			for (const map in impl.mapped_assumptions) {
				const prop_type = STRUCTURE_MAPS[type][map]
				for (const prop of impl.mapped_assumptions[map]) {
					mapped_assumption_insert.run(map, impl.id, type, prop, prop_type)
				}
			}
		}
	}

	function insert_implications(implications: ImplicationYaml[]) {
		for (const impl of implications) {
			insert_implication(impl)
		}
	}

	seed_files(
		db,
		`${type} implications`,
		path.join(data_folder, `${type}-implications`),
		insert_implications,
	)
}

function print_proof_length_warnings() {
	if (!proof_length_warnings.length) return

	console.info('\n--- Proof Length Warnings ---')

	proof_length_warnings.sort((a, b) => b.length - a.length)

	for (const { structure, type, property, length } of proof_length_warnings) {
		console.warn(
			`🟡 The proof for (${structure}, ${property}) of type ${type} has ${length} characters. Consider moving it to a content page.`,
		)
	}
}
