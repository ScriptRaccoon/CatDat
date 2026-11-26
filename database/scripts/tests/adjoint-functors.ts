import { db } from './db'
import { devlog } from '#shared/utils.ts'

/**
 * Tests for functors that if L is left adjoint to R,
 * then R is right adjoint to L, and vice versa.
 * Also tests dom(L)=cod(R) and cod(L)=dom(R).
 */
export function test_adjoint_functor_relationships() {
	const checks: Array<{
		query: string
		format: (row: Record<string, string | null>) => string
	}> = [
		{
			query: `
			SELECT
				ass1.source_structure_id AS right_1,
				ass1.target_structure_id AS left,
				ass2.target_structure_id AS right_2
			FROM associated_structures ass1
			LEFT JOIN associated_structures ass2
			ON
				ass2.source_type = 'functor'
				AND ass2.label = 'right_adjoint'
				AND ass2.source_structure_id = ass1.target_structure_id
			WHERE
				ass1.source_type = 'functor'
				AND ass1.label = 'left_adjoint'
				AND (right_2 IS NULL OR right_2 <> right_1)
			`,
			format: ({ right_1, left, right_2 }) =>
				`❌ Adjoint asymmetry: ${left} is declared as left adjoint to ${right_1}, but ${right_2 ?? 'no functor'} is recorded as its right adjoint.`
		},
		{
			query: `
			SELECT
				ass1.source_structure_id AS left_1,
				ass1.target_structure_id AS right,
				ass2.target_structure_id AS left_2
			FROM associated_structures ass1
			LEFT JOIN associated_structures ass2
			ON
				ass2.source_type = 'functor'
				AND ass2.label = 'left_adjoint'
				AND ass2.source_structure_id = ass1.target_structure_id
			WHERE
				ass1.source_type = 'functor'
				AND ass1.label = 'right_adjoint'
				AND (left_2 IS NULL OR left_2 <> left_1)
			`,
			format: ({ left_1, right, left_2 }) =>
				`❌ Adjoint asymmetry: ${right} is declared as right adjoint to ${left_1}, but ${left_2 ?? 'no functor'} is recorded as its left adjoint.`
		},
		{
			query: `
			SELECT
				ass.source_structure_id AS functor,
				ass.target_structure_id AS left_adjoint,
				dom.target_structure_id AS functor_domain,
				adj_cod.target_structure_id AS left_adjoint_codomain
			FROM
				associated_structures ass
			INNER JOIN associated_structures dom
			ON
				dom.label = 'domain'
				AND dom.source_type = 'functor'
				AND dom.source_structure_id = ass.source_structure_id
			INNER JOIN associated_structures adj_cod
			ON
				adj_cod.label = 'codomain'
				AND adj_cod.source_type = 'functor'
				AND adj_cod.source_structure_id = ass.target_structure_id
			WHERE
				ass.label = 'left_adjoint'
				AND functor_domain <> left_adjoint_codomain
			`,
			format: ({ functor, left_adjoint, functor_domain, left_adjoint_codomain }) =>
				`❌ Domain/codomain mismatch: ${functor} has domain ${functor_domain}, but its left adjoint ${left_adjoint} has codomain ${left_adjoint_codomain}.`
		},
		{
			query: `
			SELECT
				ass.source_structure_id AS functor,
				ass.target_structure_id AS left_adjoint,
				cod.target_structure_id AS functor_codomain,
				adj_dom.target_structure_id AS left_adjoint_domain
			FROM
				associated_structures ass
			INNER JOIN associated_structures cod
			ON
				cod.label = 'codomain'
				AND cod.source_type = 'functor'
				AND cod.source_structure_id = ass.source_structure_id
			INNER JOIN associated_structures adj_dom
			ON
				adj_dom.label = 'domain'
				AND adj_dom.source_type = 'functor'
				AND adj_dom.source_structure_id = ass.target_structure_id
			WHERE
				ass.label = 'left_adjoint'
				AND functor_codomain <> left_adjoint_domain`,
			format: ({ functor, left_adjoint, functor_codomain, left_adjoint_domain }) =>
				`❌ Domain/codomain mismatch: ${functor} has codomain ${functor_codomain}, but its left adjoint ${left_adjoint} has domain ${left_adjoint_domain}.`
		}
	]

	const violations = checks.flatMap(({ query, format }) =>
		db
			.prepare<never[], Record<string, string | null>>(query)
			.all()
			.map((row) => format(row))
	)

	if (violations.length > 0) {
		throw new Error(violations.join('\n'))
	}

	devlog('✅ Adjoint functor relationships are valid')
}
