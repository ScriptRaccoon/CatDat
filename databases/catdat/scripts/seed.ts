import fs from 'node:fs'
import path from 'node:path'
import { get_client } from './utils/helpers'
import YAML from 'yaml'
import type {
	CategoryYaml,
	ConfigYaml,
	CategoryPropertyYaml,
	CategoryImplicationYaml,
	FunctorImplicationYaml,
	FunctorPropertyYaml,
	FunctorYaml,
} from './seed.types'
import { create_schema_hash, get_saved_schema_hash } from './utils/schema'

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
		console.error(`❌ Your schema is outdated. Run first pnpm db:setup.`)
		process.exit(1)
	}

	clear_all_data()

	seed_config()

	seed_category_properties()
	seed_category_implications()
	seed_categories()

	seed_functor_properties()
	seed_functor_implications()
	seed_functors()
}

function read_yaml_file<T>(...parts: string[]): T {
	const content = fs.readFileSync(path.join(...parts), 'utf8')
	return YAML.parse(content) as T
}

function get_yaml_files(folder: string) {
	return fs
		.readdirSync(folder)
		.filter((file) => file.endsWith('.yaml'))
		.sort()
}

function clear_all_data() {
	console.info(`\nClear all tables ...`)
	try {
		db.transaction(() => {
			db.pragma('foreign_keys = OFF')

			db.prepare(`DELETE FROM category_implication_assumptions`).run()
			db.prepare(`DELETE FROM category_implication_conclusions`).run()
			db.prepare(`DELETE FROM category_implications`).run()

			db.prepare(`DELETE FROM special_morphisms`).run()
			db.prepare(`DELETE FROM special_morphism_types`).run()

			db.prepare(`DELETE FROM special_objects`).run()
			db.prepare(`DELETE FROM special_object_types`).run()

			db.prepare(`DELETE FROM category_property_comments`).run()
			db.prepare(`DELETE FROM category_property_assignments`).run()

			db.prepare(`DELETE FROM category_comments`).run()
			db.prepare(`DELETE FROM related_categories`).run()
			db.prepare(`DELETE FROM category_tag_assignments`).run()
			db.prepare(`DELETE FROM categories`).run()

			db.prepare(`DELETE FROM tags`).run()

			db.prepare(`DELETE FROM related_category_properties`).run()
			db.prepare(`DELETE FROM category_properties`).run()

			db.prepare(`DELETE FROM functor_property_assignments`).run()
			db.prepare(`DELETE FROM functor_properties`).run()
			db.prepare(`DELETE FROM functors`).run()

			db.prepare(`DELETE FROM relations`).run()

			db.prepare(`DELETE FROM functor_implication_assumptions`).run()
			db.prepare(`DELETE FROM functor_implication_conclusions`).run()
			db.prepare(`DELETE FROM functor_implication_source_assumptions`).run()
			db.prepare(`DELETE FROM functor_implication_target_assumptions`).run()
			db.prepare(`DELETE FROM functor_implications`).run()
		})()
	} catch (err) {
		console.error(`Error clearing data:`, err)
		process.exit(1)
	}
}

function seed_config() {
	console.info(`\nSeed config...`)

	const config = read_yaml_file<ConfigYaml>(data_folder, 'config.yaml')

	const tag_insert = db.prepare(`INSERT INTO tags (tag) VALUES (?)`)

	const relation_insert = db.prepare(
		`INSERT INTO relations (relation, negation, conditional) VALUES (?, ?, ?)`,
	)

	const object_insert = db.prepare(
		`INSERT INTO special_object_types (type, dual) VALUES (?, ?)`,
	)

	const morphism_insert = db.prepare(
		`INSERT INTO special_morphism_types (type, dual) VALUES (?, ?)`,
	)

	try {
		db.transaction(() => {
			db.pragma('defer_foreign_keys = ON')

			for (const tag of config.tags) tag_insert.run(tag)

			for (const { relation, negation, conditional } of config.relations) {
				relation_insert.run(relation, negation, conditional)
			}

			for (const { type, dual } of config.special_object_types) {
				object_insert.run(type, dual)
			}

			for (const { type, dual } of config.special_morphism_types) {
				morphism_insert.run(type, dual)
			}
		})()
	} catch (err) {
		console.error(`Error seeding config:`, err)
		process.exit(1)
	}
}

function seed_categories() {
	console.info(`\nSeed categories ...`)

	const folder = path.join(data_folder, 'categories')
	const files = get_yaml_files(folder)

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
		`INSERT INTO special_morphisms (category_id, type, description, reason)
		VALUES (?, ?, ?, ?)`,
	)

	const property_assignment_insert = db.prepare(
		`INSERT INTO category_property_assignments (
			category_id, property_id, is_satisfied, reason, check_redundancy
		) VALUES (?, ?, ?, ?, ?)`,
	)

	const property_comment_insert = db.prepare(`
		INSERT INTO category_property_comments (
			category_id, property_id, comment
		) VALUES (?, ?, ?)`)

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
			special_morphism_insert.run(
				category.id,
				type,
				entry.description,
				entry.reason,
			)
		}

		for (const entry of category.satisfied_properties) {
			property_assignment_insert.run(
				category.id,
				entry.property,
				1,
				entry.reason,
				entry.check_redundancy === false ? 0 : 1,
			)
		}

		for (const entry of category.unsatisfied_properties) {
			property_assignment_insert.run(
				category.id,
				entry.property,
				0,
				entry.reason,
				entry.check_redundancy === false ? 0 : 1,
			)
		}

		for (const comment_obj of category.category_property_comments ?? []) {
			property_comment_insert.run(
				category.id,
				comment_obj.property,
				comment_obj.comment,
			)
		}
	}

	const tx = db.transaction(() => {
		db.pragma('defer_foreign_keys = ON')

		for (const category_file of files) {
			console.info(`Seed: ${category_file}`)

			const category = read_yaml_file<CategoryYaml>(folder, category_file)
			insert_category(category)
		}
	})

	try {
		tx()
	} catch (err) {
		console.error(`Error seeding categories:`, err)
		process.exit(1)
	}
}

function seed_category_properties() {
	console.info(`\nSeed category properties ...`)

	const folder = path.join(data_folder, 'category-properties')
	const files = get_yaml_files(folder)

	const property_insert = db.prepare(`
		INSERT INTO category_properties (
			id, relation, description, nlab_link,
			dual_property_id, invariant_under_equivalences
		) VALUES (?, ?, ?, ?, ?, ?)`)

	const related_insert = db.prepare(
		`INSERT INTO related_category_properties (property_id, related_property_id) VALUES (?, ?)`,
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

	const tx = db.transaction(() => {
		db.pragma('defer_foreign_keys = ON')

		for (const property_file of files) {
			console.info(`Seed: ${property_file}`)

			const property = read_yaml_file<CategoryPropertyYaml>(folder, property_file)
			insert_property(property)
		}
	})

	try {
		tx()
	} catch (err) {
		console.error(`Error seeding category categories:`, err)
		process.exit(1)
	}
}

function seed_category_implications() {
	console.info(`\nSeed category implications ...`)

	const folder = path.join(data_folder, 'category-implications')
	const files = get_yaml_files(folder)

	const implication_insert = db.prepare(
		`INSERT INTO category_implications (
	        id, reason, is_equivalence
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

	function insert_implication(impl: CategoryImplicationYaml) {
		implication_insert.run(impl.id, impl.reason, Number(impl.is_equivalence))

		for (const assumption of impl.assumptions) {
			assumption_insert.run(impl.id, assumption)
		}

		for (const conclusion of impl.conclusions) {
			conclusion_insert.run(impl.id, conclusion)
		}
	}

	const tx = db.transaction(() => {
		for (const implications_file of files) {
			console.info(`Seed: ${implications_file}`)

			const implications = read_yaml_file<CategoryImplicationYaml[]>(
				folder,
				implications_file,
			)

			for (const impl of implications) {
				insert_implication(impl)
			}
		}
	})

	try {
		tx()
	} catch (err) {
		console.error(`Error seeding category implications:`, err)
		process.exit(1)
	}
}

function seed_functor_properties() {
	console.info(`\nSeed functor properties ...`)

	const folder = path.join(data_folder, 'functor-properties')
	const files = get_yaml_files(folder)

	const property_insert = db.prepare(`
		INSERT INTO functor_properties (
			id, relation, description, nlab_link,
			dual_property_id, invariant_under_equivalences
		) VALUES (?, ?, ?, ?, ?, ?)`)

	function insert_property(property: FunctorPropertyYaml) {
		property_insert.run(
			property.id,
			property.relation,
			property.description,
			property.nlab_link || null,
			property.dual_property || null,
			Number(property.invariant_under_equivalences),
		)
	}

	const tx = db.transaction(() => {
		db.pragma('defer_foreign_keys = ON')

		for (const property_file of files) {
			console.info(`Seed: ${property_file}`)

			const property = read_yaml_file<FunctorPropertyYaml>(folder, property_file)
			insert_property(property)
		}
	})

	try {
		tx()
	} catch (err) {
		console.error(`Error seeding functor properties:`, err)
		process.exit(1)
	}
}

function seed_functor_implications() {
	console.info(`\nSeed functor implications ...`)

	const folder = path.join(data_folder, 'functor-implications')
	const files = get_yaml_files(folder)

	const implication_insert = db.prepare(
		`INSERT INTO functor_implications (
	        id, reason, is_equivalence
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

	function insert_implication(impl: FunctorImplicationYaml) {
		implication_insert.run(impl.id, impl.reason, Number(impl.is_equivalence))

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

	const tx = db.transaction(() => {
		for (const implications_file of files) {
			console.info(`Seed: ${implications_file}`)

			const implications = read_yaml_file<FunctorImplicationYaml[]>(
				folder,
				implications_file,
			)

			for (const impl of implications) {
				insert_implication(impl)
			}
		}
	})

	try {
		tx()
	} catch (err) {
		console.error(`Error seeding category implications:`, err)
		process.exit(1)
	}
}

function seed_functors() {
	console.info(`\nSeed functors ...`)

	const folder = path.join(data_folder, 'functors')
	const files = get_yaml_files(folder)

	const functor_insert = db.prepare(
		`INSERT INTO functors (
	        id, name, source, target, description, nlab_link
		) VALUES (?, ?, ?, ?, ?, ?)`,
	)

	const property_assignment_insert = db.prepare(
		`INSERT INTO functor_property_assignments (
			functor_id, property_id, is_satisfied, reason
		) VALUES (?, ?, ?, ?)`,
	)

	function insert_functor(functor: FunctorYaml) {
		functor_insert.run(
			functor.id,
			functor.name,
			functor.source,
			functor.target,
			functor.description || null,
			functor.nlab_link || null,
		)

		for (const entry of functor.satisfied_properties) {
			property_assignment_insert.run(functor.id, entry.property, 1, entry.reason)
		}

		for (const entry of functor.unsatisfied_properties) {
			property_assignment_insert.run(functor.id, entry.property, 0, entry.reason)
		}
	}

	const tx = db.transaction(() => {
		db.pragma('defer_foreign_keys = ON')

		for (const functor_file of files) {
			console.info(`Seed: ${functor_file}`)

			const functor = read_yaml_file<FunctorYaml>(folder, functor_file)
			insert_functor(functor)
		}
	})

	try {
		tx()
	} catch (err) {
		console.error(`Error seeding functors:`, err)
		process.exit(1)
	}
}
