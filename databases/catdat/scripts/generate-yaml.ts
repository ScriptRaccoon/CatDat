import { get_client } from './shared'
import YAML from 'yaml'
import fs from 'node:fs'
import path from 'node:path'

// TEMPORARY SCRIPT TO GENERATE THE YAML FILES FOR ALL PROPERTIES
// THE CODE IS UGLY ON PURPOSE.

const db = get_client()

const properties = db
	.prepare(
		`SELECT id, relation, description, nlab_link,
			dual_property_id, invariant_under_equivalences
        FROM category_properties ORDER BY lower(id)`,
	)
	.all() as {
	id: string
	relation: string
	description: string
	nlab_link?: string | null
	invariant_under_equivalences: number | Boolean
	dual_property_id?: string | null
}[]

console.info(properties.length)

for (const property of properties) {
	if (!property.nlab_link) delete property.nlab_link
	if (!property.dual_property_id) delete property.dual_property_id

	property.invariant_under_equivalences = Boolean(property.invariant_under_equivalences)

	const related_properties = (
		db
			.prepare(
				`SELECT related_property_id AS id FROM related_category_properties WHERE property_id = ?`,
			)
			.all(property.id) as { id: string }[]
	).map((o) => o.id)

	const full_property = {
		...property,
		related_properties,
	} as any

	let file_content = YAML.stringify(full_property, {
		indent: 2,
		lineWidth: 2000,
	})

	file_content = file_content.replace(
		'\nrelated_properties:',
		'\n\nrelated_properties:',
	)

	const file_path = path.join(
		process.cwd(),
		'databases',
		'catdat',
		'data_yaml',
		'category-properties',
		`${property.id}.yaml`,
	)
	fs.writeFileSync(file_path, file_content, 'utf8')
}
