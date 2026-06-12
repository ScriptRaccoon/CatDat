import type { GroupedPropertyShort, StructureType } from '$lib/commons/types'
import sql from 'sql-template-tag'
import { query } from '../db.catdat'
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

export function get_grouped_properties(type: StructureType) {
	const { rows: properties, err } = query<GroupedPropertyShort>(sql`
		SELECT id, relation, dual_property_id FROM properties
		WHERE type = ${type}
		ORDER BY lower(id)
	`)

	if (err) error(500, 'Could not load properties')

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

	return { grouped_properties, total, grouped_total }
}
