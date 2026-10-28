import { db } from '#lib/server/db.ts'
import type { StructureShort, StructureType } from '#lib/commons/types.ts'
import { deduce_properties } from '#shared/deduction.utils.ts'
import { get_normalized_implications } from '#shared/implications.ts'

export function fetch_missing_data(type: StructureType) {
	const structures_with_unknown_properties = db
		.prepare<[StructureType], StructureShort & { count: number }>(
			`SELECT
				s.id,
				s.name,
				COUNT(*) AS count
			FROM structures s
			INNER JOIN properties p ON p.type = s.type
			LEFT JOIN property_assignments pa
			ON pa.structure_id = s.id AND pa.property_id = p.id
			WHERE s.type = ? AND pa.property_id IS NULL
			GROUP BY s.id
			ORDER BY lower(s.name)`
		)
		.all(type)

	const indistinguishable_structure_pairs = db
		.prepare<
			[StructureType],
			{ id1: string; name1: string; id2: string; name2: string }
		>(
			`WITH signatures AS (
				SELECT
					s.id,
					s.name,
					group_concat(coalesce(pa.is_satisfied, '?'), '' ORDER BY p.id) AS signature
				FROM structures s
				JOIN properties p ON p.type = s.type
				LEFT JOIN property_assignments pa
				ON pa.structure_id = s.id AND pa.property_id = p.id
				WHERE s.type = ?
				GROUP BY s.id
			)
			SELECT
				s1.id AS id1,
				s1.name AS name1,
				s2.id AS id2,
				s2.name AS name2
			FROM signatures s1
			JOIN signatures s2
			ON s1.id < s2.id AND s1.signature = s2.signature
			ORDER BY s1.id, s2.id`
		)
		.all(type)

	const properties = db
		.prepare<[StructureType], { id: string; dual_property_id: string | null }>(
			`SELECT id, dual_property_id
			FROM properties
			WHERE type = ?
			ORDER BY lower(id)`
		)
		.all(type)

	const assignments = db
		.prepare<
			[StructureType],
			{ structure_id: string; property_id: string; is_satisfied: 0 | 1 }
		>(
			`SELECT structure_id, property_id, is_satisfied
			FROM property_assignments
			WHERE type = ? AND is_satisfied IS NOT NULL`
		)
		.all(type)

	const total_unknown_property_pairs = structures_with_unknown_properties.reduce(
		(total, item) => item.count + total,
		0
	)

	const implications = get_normalized_implications(db, type).filter(
		(impl) => !impl.associated_assumptions
	)

	const assignments_by_structure: Record<
		string,
		{ satisfied: string[]; unsatisfied: string[] }
	> = {}

	for (const { structure_id, property_id, is_satisfied } of assignments) {
		assignments_by_structure[structure_id] ??= { satisfied: [], unsatisfied: [] }
		const { satisfied, unsatisfied } = assignments_by_structure[structure_id]
		if (is_satisfied) satisfied.push(property_id)
		else unsatisfied.push(property_id)
	}

	// maps p to the set of all q such that some structure witnesses p ∧ ¬q
	const witnessed_pairs = new Map<string, Set<string>>()

	for (const { satisfied, unsatisfied } of Object.values(assignments_by_structure)) {
		for (const p of satisfied) {
			let witnessed_qs = witnessed_pairs.get(p)
			if (!witnessed_qs) {
				witnessed_qs = new Set()
				witnessed_pairs.set(p, witnessed_qs)
			}
			for (const q of unsatisfied) witnessed_qs.add(q)
		}
	}

	const is_witnessed = (p: string, q: string) => witnessed_pairs.get(p)?.has(q) ?? false

	const missing_combinations: [string, string][] = []

	for (const p of properties) {
		// p ∧ ¬q is contradictory iff q can be deduced from p
		const { deduced_satisfied_properties: deducible_properties } = deduce_properties(
			new Set([p.id]),
			implications,
			() => ({ proof: null, stop: false })
		)

		for (const q of properties) {
			if (p.id === q.id) continue

			if (is_witnessed(p.id, q.id)) continue

			if (
				p.dual_property_id &&
				q.dual_property_id &&
				is_witnessed(p.dual_property_id, q.dual_property_id)
			) {
				continue
			}

			if (deducible_properties.has(q.id)) continue

			missing_combinations.push([p.id, q.id])
		}
	}

	return {
		structures_with_unknown_properties,
		indistinguishable_structure_pairs,
		total_unknown_property_pairs,
		missing_combinations
	}
}
