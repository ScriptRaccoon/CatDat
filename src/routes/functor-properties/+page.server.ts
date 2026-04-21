import type { PropertyShort } from '$lib/commons/types'
import { query } from '$lib/server/db.catdat'
import { error } from '@sveltejs/kit'
import sql from 'sql-template-tag'

// TODO: remove code duplication with category properties list page

export const load = async () => {
	const { rows: properties, err } = await query<
		PropertyShort & { dual_property_id?: string }
	>(sql`
        SELECT id, relation, dual_property_id FROM functor_properties
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
