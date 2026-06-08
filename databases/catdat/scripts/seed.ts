import path from 'node:path'
import { get_client, seed_file, seed_files } from './utils/helpers'
import type {
	CategoryYaml,
	ConfigYaml,
	CategoryPropertyYaml,
	CategoryImplicationYaml,
	FunctorImplicationYaml,
	FunctorPropertyYaml,
	FunctorYaml,
	PropertyEntry,
} from './seed.types'
import { create_schema_hash, get_saved_schema_hash } from './utils/schema'
import { PLURALS, STRUCTURES } from './config'

const db = get_client()

const data_folder = path.resolve('databases', 'catdat', 'data')

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

	seed_category_properties()
	seed_category_implications()
	seed_categories()

	seed_functor_properties()
	seed_functor_implications()
	seed_functors()
}

/**
 * Clears all tables in the database. This is done as a first step.
 */
function clear_all_tables() {
	console.info(`\nClear all tables ...`)

	const tx = db.transaction(() => {
		db.pragma('foreign_keys = OFF')

		db.prepare(`DELETE FROM special_morphisms`).run()
		db.prepare(`DELETE FROM special_morphism_types`).run()
		db.prepare(`DELETE FROM special_objects`).run()
		db.prepare(`DELETE FROM special_object_types`).run()

		db.prepare(`DELETE FROM functor_implication_source_assumptions`).run()
		db.prepare(`DELETE FROM functor_implication_target_assumptions`).run()
		db.prepare(`DELETE FROM adjoint_functors`).run()

		for (const type of STRUCTURES) {
			const plural = PLURALS[type]

			db.prepare(`DELETE FROM ${type}_implication_assumptions`).run()
			db.prepare(`DELETE FROM ${type}_implication_conclusions`).run()
			db.prepare(`DELETE FROM ${type}_implications`).run()
			db.prepare(`DELETE FROM ${type}_property_assignments`).run()
			db.prepare(`DELETE FROM ${type}_comments`).run()
			db.prepare(`DELETE FROM related_${plural}`).run()
			db.prepare(`DELETE FROM ${type}_tag_assignments`).run()
			db.prepare(`DELETE FROM related_${type}_properties`).run()
			db.prepare(`DELETE FROM ${type}_properties`).run()
			db.prepare(`DELETE FROM ${plural}`).run()
			db.prepare(`DELETE FROM ${type}_tags`).run()
		}

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
	const category_tag_insert = db.prepare(`INSERT INTO category_tags (tag) VALUES (?)`)
	const functor_tag_insert = db.prepare(`INSERT INTO functor_tags (tag) VALUES (?)`)

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
			category_tag_insert.run(tag)
			functor_tag_insert.run(tag)
		}

		for (const tag of config.category_tags) {
			category_tag_insert.run(tag)
		}

		for (const tag of config.functor_tags) {
			functor_tag_insert.run(tag)
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
 * Seeds all properties of categories from YAML files.
 */
function seed_category_properties() {
	const property_insert = db.prepare(
		`INSERT INTO category_properties (
			id, relation, description, nlab_link,
			dual_property_id, invariant_under_equivalences
		) VALUES (?, ?, ?, ?, ?, ?)`,
	)

	const related_insert = db.prepare(
		`INSERT INTO related_category_properties
		(property_id, related_property_id)
		VALUES (?, ?)`,
	)

	function insert_property(property: CategoryPropertyYaml) {
		property_insert.run(
			property.id,
			property.relation,
			property.description,
			property.nlab_link || null,
			property.dual_property || null,
			Number(property.invariant_under_equivalences),
		)

		for (const related of property.related_properties) {
			related_insert.run(property.id, related)
		}
	}

	seed_files<CategoryPropertyYaml>(
		db,
		'category properties',
		path.join(data_folder, 'category-properties'),
		insert_property,
	)
}

/**
 * Seeds all implications between category properties from YAML files.
 */
function seed_category_implications() {
	const implication_insert = db.prepare(
		`INSERT INTO category_implications (
	        id, proof, is_equivalence
		) VALUES (?, ?, ?)`,
	)

	const assumption_insert = db.prepare(
		`INSERT INTO category_implication_assumptions (
			implication_id, property_id
		) VALUES (?, ?)`,
	)

	const conclusion_insert = db.prepare(
		`INSERT INTO category_implication_conclusions (
			implication_id, property_id
		) VALUES (?, ?)`,
	)

	function insert_implications(implications: CategoryImplicationYaml[]) {
		for (const impl of implications) {
			implication_insert.run(impl.id, impl.proof, Number(impl.is_equivalence))

			for (const assumption of impl.assumptions) {
				assumption_insert.run(impl.id, assumption)
			}

			for (const conclusion of impl.conclusions) {
				conclusion_insert.run(impl.id, conclusion)
			}
		}
	}

	seed_files(
		db,
		'category implications',
		path.join(data_folder, 'category-implications'),
		insert_implications,
	)
}

/**
 * Seeds all categories from YAML files, including their property assignments.
 */
function seed_categories() {
	const category_insert = db.prepare(
		`INSERT INTO categories (
	        id, name, notation, objects, morphisms,
	        description, nlab_link, dual_category_id
		) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
	)

	const tag_insert = db.prepare(
		`INSERT INTO category_tag_assignments (category_id, tag) VALUES (?, ?)`,
	)

	const comment_insert = db.prepare(
		`INSERT INTO category_comments (category_id, comment) VALUES (?, ?)`,
	)

	const related_insert = db.prepare(
		`INSERT INTO related_categories (category_id, related_category_id) VALUES (?, ?)`,
	)

	const special_object_insert = db.prepare(
		`INSERT INTO special_objects (category_id, type, description) VALUES (?, ?, ?)`,
	)

	const special_morphism_insert = db.prepare(
		`INSERT INTO special_morphisms (category_id, type, description, proof)
		VALUES (?, ?, ?, ?)`,
	)

	const property_assignment_insert = db.prepare(
		`INSERT INTO category_property_assignments (
			category_id, property_id, is_satisfied, proof, check_redundancy
		) VALUES (?, ?, ?, ?, ?)`,
	)

	function insert_property_assignments(
		category_id: string,
		entries: PropertyEntry[],
		is_satisfied: 0 | 1 | null,
	) {
		for (const entry of entries) {
			property_assignment_insert.run(
				category_id,
				entry.property,
				is_satisfied,
				entry.proof,
				entry.check_redundancy === false ? 0 : 1,
			)
		}
	}

	function insert_category(category: CategoryYaml) {
		category_insert.run(
			category.id,
			category.name,
			category.notation,
			category.objects,
			category.morphisms,
			category.description,
			category.nlab_link,
			category.dual_category || null,
		)

		for (const tag of category.tags) {
			tag_insert.run(category.id, tag)
		}

		for (const comment of category.comments ?? []) {
			comment_insert.run(category.id, comment)
		}

		for (const related of category.related_categories) {
			related_insert.run(category.id, related)
		}

		for (const [type, entry] of Object.entries(category.special_objects)) {
			if (!entry) continue
			special_object_insert.run(category.id, type, entry.description)
		}

		for (const [type, entry] of Object.entries(category.special_morphisms)) {
			if (!entry) continue
			special_morphism_insert.run(category.id, type, entry.description, entry.proof)
		}

		insert_property_assignments(category.id, category.satisfied_properties, 1)
		insert_property_assignments(category.id, category.unsatisfied_properties, 0)
		insert_property_assignments(
			category.id,
			category.undecidable_properties ?? [],
			null,
		)
	}

	seed_files(db, 'categories', path.join(data_folder, 'categories'), insert_category)
}

/**
 * Seeds all properties of functors from YAML files.
 */
function seed_functor_properties() {
	const property_insert = db.prepare(`
		INSERT INTO functor_properties (
			id, relation, description,
			required_source, required_target,
			nlab_link, dual_property_id,
			invariant_under_equivalences
		) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`)

	const related_insert = db.prepare(
		`INSERT INTO related_functor_properties
		(property_id, related_property_id)
		VALUES (?, ?)`,
	)

	function insert_property(property: FunctorPropertyYaml) {
		property_insert.run(
			property.id,
			property.relation,
			property.description,
			property.required_source || null,
			property.required_target || null,
			property.nlab_link || null,
			property.dual_property || null,
			Number(property.invariant_under_equivalences),
		)

		for (const related of property.related_properties) {
			related_insert.run(property.id, related)
		}
	}

	seed_files(
		db,
		'functor properties',
		path.join(data_folder, 'functor-properties'),
		insert_property,
	)
}

/**
 * Seeds all implications between functor properties from YAML files.
 */
function seed_functor_implications() {
	const implication_insert = db.prepare(
		`INSERT INTO functor_implications (
	        id, proof, is_equivalence
		) VALUES (?, ?, ?)`,
	)

	const assumption_insert = db.prepare(
		`INSERT INTO functor_implication_assumptions (
			implication_id, property_id
		) VALUES (?, ?)`,
	)

	const source_assumption_insert = db.prepare(
		`INSERT INTO functor_implication_source_assumptions (
			implication_id, property_id
		) VALUES (?, ?)`,
	)

	const target_assumption_insert = db.prepare(
		`INSERT INTO functor_implication_target_assumptions (
			implication_id, property_id
		) VALUES (?, ?)`,
	)

	const conclusion_insert = db.prepare(
		`INSERT INTO functor_implication_conclusions (
			implication_id, property_id
		) VALUES (?, ?)`,
	)

	function insert_implications(implications: FunctorImplicationYaml[]) {
		for (const impl of implications) {
			implication_insert.run(impl.id, impl.proof, Number(impl.is_equivalence))

			for (const assumption of impl.assumptions) {
				assumption_insert.run(impl.id, assumption)
			}

			for (const assumption of impl.source_assumptions) {
				source_assumption_insert.run(impl.id, assumption)
			}

			for (const assumption of impl.target_assumptions) {
				target_assumption_insert.run(impl.id, assumption)
			}

			for (const conclusion of impl.conclusions) {
				conclusion_insert.run(impl.id, conclusion)
			}
		}
	}

	seed_files(
		db,
		'functor implications',
		path.join(data_folder, 'functor-implications'),
		insert_implications,
	)
}

/**
 * Seeds all functors from YAML files.
 */
function seed_functors() {
	const functor_insert = db.prepare(
		`INSERT INTO functors (
	        id, name, notation, source, target, description, nlab_link
		) VALUES (?, ?, ?, ?, ?, ?, ?)`,
	)

	const tag_insert = db.prepare(
		`INSERT INTO functor_tag_assignments (functor_id, tag) VALUES (?, ?)`,
	)

	const comment_insert = db.prepare(
		`INSERT INTO functor_comments (functor_id, comment) VALUES (?, ?)`,
	)

	const related_insert = db.prepare(
		`INSERT INTO related_functors (functor_id, related_functor_id) VALUES (?, ?)`,
	)

	const adjoint_insert = db.prepare(
		`INSERT INTO adjoint_functors (left_adjoint, right_adjoint)
		VALUES (?, ?)
		ON CONFLICT (left_adjoint, right_adjoint) DO NOTHING`,
	)

	const property_assignment_insert = db.prepare(
		`INSERT INTO functor_property_assignments (
			functor_id, property_id, is_satisfied, proof, check_redundancy
		) VALUES (?, ?, ?, ?, ?)`,
	)

	function insert_property_assignments(
		functor_id: string,
		entries: PropertyEntry[],
		is_satisfied: 0 | 1 | null,
	) {
		for (const entry of entries) {
			property_assignment_insert.run(
				functor_id,
				entry.property,
				is_satisfied,
				entry.proof,
				entry.check_redundancy === false ? 0 : 1,
			)
		}
	}

	function insert_functor(functor: FunctorYaml) {
		functor_insert.run(
			functor.id,
			functor.name,
			functor.notation,
			functor.source,
			functor.target,
			functor.description || null,
			functor.nlab_link || null,
		)

		for (const tag of functor.tags) {
			tag_insert.run(functor.id, tag)
		}

		if (functor.left_adjoint) {
			adjoint_insert.run(functor.left_adjoint, functor.id)
		}

		for (const comment of functor.comments ?? []) {
			comment_insert.run(functor.id, comment)
		}

		for (const related of functor.related_functors) {
			related_insert.run(functor.id, related)
		}

		insert_property_assignments(functor.id, functor.satisfied_properties, 1)
		insert_property_assignments(functor.id, functor.unsatisfied_properties, 0)
		insert_property_assignments(
			functor.id,
			functor.undecidable_properties ?? [],
			null,
		)
	}

	seed_files(db, 'functors', path.join(data_folder, 'functors'), insert_functor)
}
