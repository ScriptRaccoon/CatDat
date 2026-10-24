import type {
	GroupedPropertyShort,
	PropertyShort,
	StructureType
} from '#lib/commons/types.ts'
import { db } from '#lib/server/db.ts'

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
		.prepare<never[], { id: string; type: string; relation: string }>(
			`SELECT id, type, relation FROM properties`
		)
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
			`SELECT pt.tag
			FROM property_tags pt
			WHERE pt.type = ?
			AND EXISTS (
				SELECT 1 FROM property_tag_assignments pta
				WHERE pta.tag = pt.tag AND pta.type = pt.type
			)
			ORDER BY pt.id`
		)
		.pluck()
		.all(type)

	const keywords_db = db
		.prepare<[StructureType], { property_id: string; keyword: string }>(
			`SELECT property_id, keyword
			FROM property_keywords
			WHERE type = ?`
		)
		.all(type)

	const keywords: Record<string, string[]> = {}

	for (const { property_id, keyword } of keywords_db) {
		keywords[property_id] ??= []
		keywords[property_id].push(keyword)
	}

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

	return { type, grouped_properties, total, grouped_total, tags, keywords }
}

export function fetch_tagged_properties(type: StructureType, tag: string) {
	const properties = db
		.prepare<[StructureType, string], PropertyShort>(
			`SELECT p.id, p.relation
			FROM property_tag_assignments pta
			INNER JOIN properties p
			ON p.id = pta.property_id AND p.type = ?
			WHERE pta.tag = ? AND pta.type = p.type
			ORDER BY lower(id)`
		)
		.all(type, tag)

	return { type, properties, tag }
}
