import type {
	GroupedPropertyShort,
	PropertyShort,
	StructureType
} from '$lib/commons/types'
import { db } from '$lib/server/db'

export function get_property_ids(type: StructureType) {
	return db
		.prepare<[StructureType], string>(
			`SELECT id FROM properties
			WHERE type = ?
			ORDER BY lower(id)`
		)
		.pluck()
		.all(type)
}

export function fetch_property_relation_dict() {
	const rows = db
		.prepare<
			never[],
			{ id: string; type: string; relation: string }
		>(`SELECT id, type, relation FROM properties`)
		.all()

	const dict: Record<string, Record<string, string>> = {}

	for (const { id, type, relation } of rows) {
		dict[type] ??= {}
		dict[type][id] = relation
	}

	return dict
}

export function fetch_grouped_properties_and_tags(type: StructureType) {
	const properties = db
		.prepare<[StructureType], GroupedPropertyShort>(
			`SELECT id, relation, dual_property_id
			FROM properties
			WHERE type = ?
			ORDER BY lower(id)`
		)
		.all(type)

	const tags = db
		.prepare<[StructureType], string>(
			`SELECT t.tag
			FROM property_tags t
			WHERE t.type = ?
			AND EXISTS (
				SELECT 1 FROM property_tag_assignments a
				WHERE a.tag = t.tag AND a.type = t.type
			)
			ORDER BY t.id`
		)
		.pluck()
		.all(type)

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
				relation: p.relation
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

	return { type, grouped_properties, total, grouped_total, tags }
}

export function fetch_tagged_properties(type: StructureType, tag: string) {
	const properties = db
		.prepare<[StructureType, string], PropertyShort>(
			`SELECT p.id, p.relation
			FROM property_tag_assignments t
			INNER JOIN properties p
			ON p.id = t.property_id AND p.type = ?
			WHERE t.tag = ? AND t.type = p.type
			ORDER BY lower(id)`
		)
		.all(type, tag)

	return { type, properties, tag }
}
