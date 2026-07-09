import { batch, db } from '$lib/server/db.catdat'
import sql from 'sql-template-tag'
import type { StructureShort, StructureType } from '$lib/commons/types'
import { error } from '@sveltejs/kit'
import { contradiction_worker } from '$lib/server/consistency'
import { get_normalized_implications } from '$shared/implications'

export function fetch_missing_data(type: StructureType) {
	const { results, err } = batch<
		[
			StructureShort & { count: number },
			{ id1: string; name1: string; id2: string; name2: string },
			{ id: string; dual_property_id: string | null },
			{ p: string; q: string }
		]
	>([
		// structures with unknown properties
		sql`
			SELECT s.id, s.name, COUNT(*) AS count
			FROM structures s
			INNER JOIN properties p ON p.type = s.type
			LEFT JOIN property_assignments pa
				ON pa.structure_id = s.id
				AND pa.property_id = p.id
			WHERE
				s.type = ${type}
				AND pa.property_id IS NULL
			GROUP BY s.id
			ORDER BY lower(s.name);
		`,
		// undistinguishable structure pairs
		sql`
			SELECT
				s1.id AS id1, s1.name AS name1,
				s2.id AS id2, s2.name AS name2
			FROM structures s1
			JOIN structures s2
				ON s1.id < s2.id AND s2.type = s1.type
			JOIN properties p ON p.type = s1.type
			LEFT JOIN property_assignments a1
				ON a1.structure_id = s1.id AND a1.property_id = p.id
			LEFT JOIN property_assignments a2
				ON a2.structure_id = s2.id AND a2.property_id = p.id
			WHERE s1.type = ${type}
			GROUP BY s1.id, s1.name, s2.id, s2.name
			HAVING SUM(
			CASE
				WHEN a1.is_satisfied IS a2.is_satisfied THEN 0
				ELSE 1
			END
			) = 0;
		`,
		// properties
		sql`
			SELECT id, dual_property_id
			FROM properties
			WHERE type = ${type}
			ORDER BY lower(id)
		`,
		// witnessed property combinations of the form "p and not q"
		sql`
            SELECT DISTINCT
                a.property_id AS p,
                an.property_id AS q
            FROM property_assignments a
            INNER JOIN property_assignments an
            ON a.structure_id = an.structure_id
            WHERE
                a.type = ${type}
                AND an.type = ${type}
                AND a.is_satisfied = TRUE
                AND an.is_satisfied = FALSE
	    `
	])

	if (err) error(500, 'Failed to load data')

	const [
		structures_with_unknown_properties,
		undistinguishable_structure_pairs,
		properties,
		witnessed_pairs
	] = results

	const total_unknown_property_pairs = structures_with_unknown_properties.reduce(
		(total, item) => item.count + total,
		0
	)

	const implications = get_normalized_implications(db, type).filter(
		(impl) => !impl.mapped_assumptions
	)

	const witnessed_pairs_set = new Set(witnessed_pairs.map(({ p, q }) => `${p}|${q}`))

	const missing_combinations: [string, string][] = []

	for (const p of properties) {
		for (const q of properties) {
			if (p.id === q.id) continue

			if (witnessed_pairs_set.has(`${p.id}|${q.id}`)) continue

			if (
				p.dual_property_id &&
				q.dual_property_id &&
				witnessed_pairs_set.has(`${p.dual_property_id}|${q.dual_property_id}`)
			) {
				continue
			}

			const contradiction = contradiction_worker(
				new Set([p.id]),
				new Set([q.id]),
				implications
			)

			if (!contradiction) missing_combinations.push([p.id, q.id])
		}
	}

	return {
		structures_with_unknown_properties,
		undistinguishable_structure_pairs,
		total_unknown_property_pairs,
		missing_combinations
	}
}
