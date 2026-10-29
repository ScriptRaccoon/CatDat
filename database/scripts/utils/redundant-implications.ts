import type { Database } from 'better-sqlite3'
import { STRUCTURE_TYPES, type StructureType } from '#shared/config.ts'
import {
	get_associated_implications,
	get_normalized_implications,
	has_associated_assumptions,
	stringify_with_asterisk
} from '#shared/implications.ts'
import { close_associated_assumptions, find_deduction } from '#shared/deduction.utils.ts'
import { capitalize, devlog, remove_underscores } from '#shared/utils.ts'

/**
 * Tests that there are no redundant implications,
 * except for those marked with check_redundancy: false.
 * All redundancies are collected before an error is thrown.
 */
export function test_no_redundant_implications(db: Database) {
	const errors: string[] = []

	for (const type of STRUCTURE_TYPES) {
		errors.push(...get_redundant_implication_errors(db, type))
	}

	if (errors.length > 0) {
		const hint = [
			'',
			'Remove each redundant implication or conclusion from its YAML file.',
			'Only keep it if there is a good reason, e.g. it states a definition',
			'or an insightful consequence, and then mark it with check_redundancy: false.'
		]
		throw new Error([errors.join('\n\n'), ...hint].join('\n'))
	}
}

/**
 * Checks for redundant implications and returns one error message per implication.
 * An implication is redundant if one of its normalized implications
 * P_1 + ... + P_n ===> Q can be deduced from all other normalized implications,
 * except the dual one. Implications marked with check_redundancy: false are skipped.
 */
function get_redundant_implication_errors(db: Database, type: StructureType): string[] {
	const implications = get_normalized_implications(db, type)

	const original_implications = db
		.prepare<
			[StructureType],
			{ id: string; dual_implication_id: string | null; check_redundancy: 0 | 1 }
		>(
			`SELECT id, dual_implication_id, check_redundancy
			FROM implications
			WHERE type = ? AND is_deduced = FALSE`
		)
		.all(type)

	const dual_properties_list = db
		.prepare<[StructureType], [string, string | null]>(
			`SELECT id, dual_property_id FROM properties WHERE type = ?`
		)
		.raw()
		.all(type)

	const dual_properties_map = new Map(dual_properties_list)

	const associated_implications = get_associated_implications(db, type)

	let ignore_count = 0

	const errors: string[] = []

	for (const original of original_implications) {
		const { id, dual_implication_id, check_redundancy } = original

		if (!check_redundancy) {
			ignore_count++
			continue
		}

		const redundancies: string[] = []
		let has_asterisk = false

		for (const piece of implications.filter((impl) => impl.id === id)) {
			const dual_conclusion = dual_properties_map.get(piece.conclusion)

			const other_implications = implications.filter(
				(impl) =>
					impl !== piece &&
					!(
						impl.id === dual_implication_id &&
						impl.conclusion === dual_conclusion
					)
			)

			const deduction = find_deduction(
				piece.assumptions,
				other_implications,
				(property) => property === piece.conclusion,
				close_associated_assumptions(
					piece.associated_assumptions,
					associated_implications
				)
			)

			if (!deduction) continue

			if ([piece, ...deduction].some(has_associated_assumptions)) {
				has_asterisk = true
			}

			redundancies.push(
				[
					`   Claim: ${stringify_with_asterisk(piece)}`,
					'   Proof:',
					...deduction.map(
						(impl) => `   - ${stringify_with_asterisk(impl)} [${impl.id}]`
					)
				].join('\n')
			)
		}

		if (redundancies.length > 0) {
			const lines = [
				`❌ Redundant ${remove_underscores(type)} implication [${id}]`,
				...redundancies
			]
			if (has_asterisk) {
				lines.push('   * has assumptions about associated structures (not shown)')
			}
			errors.push(lines.join('\n'))
		}
	}

	if (errors.length === 0) {
		devlog(
			`✅ ${capitalize(remove_underscores(type))} implications are not redundant (${ignore_count} ignored)`
		)
	}

	return errors
}
