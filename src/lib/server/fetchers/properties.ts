import type {
	GroupedPropertyShort,
	PropertyShort,
	StructureType,
	TagObject,
} from '$lib/commons/types'
import sql from 'sql-template-tag'
import { query, batch } from '$lib/server/db.catdat'
import { error } from '@sveltejs/kit'

export function get_property_ids(type: StructureType) {
	const { rows, err } = query<{ id: string }>(
		sql`
			SELECT id FROM properties
			WHERE type = ${type}
			ORDER BY lower(id)
		`,
	)

	if (err) error(500, 'Failed to load properties')

	return rows.map(({ id }) => id)
}

export function fetch_grouped_properties_and_tags(type: StructureType) {
	const { results, err } = batch<[GroupedPropertyShort, TagObject]>([
		sql`
		SELECT id, relation, dual_property_id
		FROM properties
		WHERE type = ${type}
		ORDER BY lower(id)
	`,
		sql`
			SELECT t.tag
			FROM property_tags t
			WHERE t.type = ${type}
			AND EXISTS (
				SELECT 1 FROM property_tag_assignments a
				WHERE a.tag = t.tag AND a.type = ${type}
			)
			ORDER BY t.id
		`,
	])

	if (err) error(500, 'Failed to load properties')

	const [properties, tag_objects] = results

	const tags = tag_objects.map(({ tag }) => tag)

	const seen = new Set()

	const grouped_properties: typeof properties = []

	for (const p of properties) {
		if (seen.has(p.id) || (p.dual_property_id && seen.has(p.dual_property_id))) {
			continue
		}

		if (p.id.startsWith('co') && p.dual_property_id) {
			const swap = {
				id: p.dual_property_id,
				dual_property_id: p.id,
				relation: p.relation,
			}
			grouped_properties.push(swap)
		} else {
			grouped_properties.push(p)
		}

		seen.add(p.id)
		if (p.dual_property_id) seen.add(p.dual_property_id)
	}

	const total = properties.length
	const grouped_total = grouped_properties.length

	return { grouped_properties, total, grouped_total, tags }
}

export function fetch_tagged_properties(type: StructureType, tag: string) {
	const { rows: properties, err } = query<PropertyShort>(sql`
		SELECT p.id, p.relation
		FROM property_tag_assignments t
		INNER JOIN properties p
		ON p.id = t.property_id AND p.type = ${type}
		WHERE t.tag = ${tag} AND t.type = ${type}
		ORDER BY lower(id)
	`)

	if (err) error(500, `Properties could not be loaded`)

	return { properties, tag }
}
