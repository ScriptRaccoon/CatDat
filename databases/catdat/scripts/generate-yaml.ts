import { get_client } from './shared'
import YAML from 'yaml'
import fs from 'node:fs'
import path from 'node:path'

// TEMPORARY SCRIPT TO GENERATE THE YAML FILES FOR ALL CATEGORIES
// THE CODE IS UGLY ON PURPOSE.

const db = get_client()

const categories = db
	.prepare(
		`SELECT
            id, name, notation, objects, morphisms, description,
            nlab_link, dual_category_id
        FROM categories c
        `,
	)
	.all() as {
	id: string
	name: string
	notation: string
	objects: string
	morphisms: string
	description?: string | null
	nlab_link?: string | null
	dual_category_id?: string | null
}[]

for (const category of categories) {
	if (!category.description) delete category.description
	if (!category.nlab_link) delete category.nlab_link
	if (!category.dual_category_id) delete category.dual_category_id

	const tags = (
		db
			.prepare(`SELECT tag FROM category_tag_assignments WHERE category_id = ?`)
			.all(category.id) as { tag: string }[]
	).map((o) => o.tag)

	const related_categories = (
		db
			.prepare(
				`SELECT related_category_id AS id FROM related_categories WHERE category_id = ?`,
			)
			.all(category.id) as { id: string }[]
	).map((o) => o.id)

	const comments = (
		db
			.prepare(`SELECT comment FROM category_comments WHERE category_id = ?`)
			.all(category.id) as { comment: string }[]
	).map((o) => o.comment)

	const satisfied_properties_db = db
		.prepare(
			`SELECT property_id, reason, check_redundancy FROM category_property_assignments WHERE category_id = ? AND is_deduced = FALSE AND is_satisfied = TRUE ORDER BY id`,
		)
		.all([category.id]) as {
		property_id: string
		reason: string
		check_redundancy: number
	}[]

	const satisfied_properties = satisfied_properties_db.map((o) => {
		const { property_id, reason } = o
		return o.check_redundancy
			? { property_id, reason }
			: { property_id, reason, check_redundancy: false }
	})

	const unsatisfied_properties = db
		.prepare(
			`SELECT property_id, reason FROM category_property_assignments WHERE category_id = ? AND is_deduced = FALSE AND is_satisfied = FALSE ORDER BY id`,
		)
		.all([category.id]) as { property_id: string; reason: string }[]

	const category_property_comments = db
		.prepare(
			`SELECT property_id, comment FROM category_property_comments WHERE category_id = ?`,
		)
		.all(category.id) as { property_id: string; comment: string }[]

	const special_objects_db = db
		.prepare(`SELECT type, description FROM special_objects WHERE category_id = ?`)
		.all(category.id) as { type: string; description: string }[]

	const special_objects = special_objects_db.reduce<
		Record<string, { description: string }>
	>((acc, row) => {
		acc[row.type] = {
			description: row.description,
		}
		return acc
	}, {})

	const special_morphisms_db = db
		.prepare(
			`SELECT type, description, reason FROM special_morphisms WHERE category_id = ?`,
		)
		.all(category.id) as { type: string; description: string; reason: string }[]

	const special_morphisms = special_morphisms_db.reduce<
		Record<string, { description: string; reason: string }>
	>((acc, row) => {
		acc[row.type] = {
			description: row.description,
			reason: row.reason,
		}
		return acc
	}, {})

	const full_category = {
		...category,
		tags,
		related_categories,
		comments,
		satisfied_properties,
		unsatisfied_properties,
		category_property_comments,
		special_objects,
		special_morphisms,
	} as any

	if (!comments.length) {
		delete full_category.comments
	}

	if (!category_property_comments.length) {
		delete full_category.category_property_comments
	}

	let file_content = YAML.stringify(full_category, {
		indent: 2,
		lineWidth: 2000,
	})

	file_content = file_content.replace('\ntags:', '\n\ntags:')

	file_content = file_content.replace(
		'\nrelated_categories:',
		'\n\nrelated_categories:',
	)

	file_content = file_content.replace(
		'\nsatisfied_properties:',
		'\n\nsatisfied_properties:',
	)

	file_content = file_content.replace(
		'\nunsatisfied_properties:',
		'\n\nunsatisfied_properties:',
	)

	file_content = file_content.replace(
		'\ncategory_property_comments:',
		'\n\ncategory_property_comments:',
	)

	file_content = file_content.replace('\ncomments:', '\n\ncomments:')

	file_content = file_content.replaceAll(`  - property_id:`, `\n  - property_id:`)

	file_content = file_content.replace('\nspecial_objects:', '\n\nspecial_objects:')
	file_content = file_content.replace('\nspecial_morphisms:', '\n\nspecial_morphisms:')

	const file_path = path.join(
		process.cwd(),
		'databases',
		'catdat',
		'data_yaml',
		'categories',
		`${category.id.replace('*', '_pointed')}.yaml`,
	)
	fs.writeFileSync(file_path, file_content, 'utf8')
}
