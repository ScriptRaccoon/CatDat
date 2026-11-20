import { get_client } from '#shared/db.ts'
import { devlog } from '#shared/utils.ts'
import { get_proof_link, get_special_morphism_plural } from '#shared/property.utils.ts'
import { get_structure_parent_map } from './utils/structures'

const db = get_client({ readonly: false })

export function deduce_special_morphisms() {
	console.info('\n--- Deduce special morphisms ---')

	const deduction = db.transaction(() => {
		clear_deduced_special_morphisms()
		inherit_special_morphisms_from_parents()
		deduce_special_morphisms_by_rules()
		deduce_special_morphisms_of_dual_categories()
	})

	deduction()
}

/**
 * Clears deduced special morphisms
 */
function clear_deduced_special_morphisms() {
	db.prepare(
		`DELETE FROM special_morphism_assignments
		WHERE is_deduced = TRUE`
	).run()
}

/**
 * Inherit special morphism assignments from parent categories
 */
function inherit_special_morphisms_from_parents() {
	type SpecialMorphism = { kind: string; description: string; proof: string }

	const parent_map = get_structure_parent_map(db, 'category')

	const get_parent_special_morphisms = db.prepare<[string], SpecialMorphism>(
		`SELECT kind, description, proof
		FROM special_morphism_assignments
		WHERE category_id = ? AND is_deduced = FALSE`
	)

	const insert_special_morphism = db.prepare(
		`INSERT INTO special_morphism_assignments (
			category_id, kind, description, proof, is_deduced
		) VALUES (?, ?, ?, ?, TRUE)
		ON CONFLICT (category_id, kind) DO NOTHING`
	)

	let inherited_count = 0

	for (const [category_id, parent_id] of parent_map) {
		if (!parent_id) continue

		const inherited_morphisms = new Map<string, SpecialMorphism>()
		let current_id: string | null = parent_id

		while (current_id) {
			const parent_entries = get_parent_special_morphisms.all(current_id)

			for (const entry of parent_entries) {
				if (!inherited_morphisms.has(entry.kind)) {
					inherited_morphisms.set(entry.kind, entry)
				}
			}

			current_id = parent_map.get(current_id) ?? null
		}

		for (const [kind, entry] of inherited_morphisms) {
			const parent_link = `<a href="/category/${parent_id}">parent category</a>`
			const proof_link = get_proof_link('category', parent_id, kind)
			const proof = `This follows from the ${parent_link} (${proof_link}).`
			const res = insert_special_morphism.run(
				category_id,
				kind,
				entry.description,
				proof
			)
			inherited_count += res.changes
		}
	}

	devlog(`Inherited ${inherited_count} special morphisms from parents`)
}

/**
 * Deduces special morphisms from the rules from the special_morphism_rules
 * table. The proof states the property with a link to its proof,
 * followed by the argument of the rule, if any. We ignore duplicate
 * assignments here because of overlaps with previous deductions.
 */
function deduce_special_morphisms_by_rules() {
	type Rule = {
		property_id: string
		relation: string
		kind: string
		description: string
		proof: string | null
	}

	const rules = db
		.prepare<[], Rule>(
			`SELECT r.property_id, p.relation, r.kind, r.description, r.proof
			FROM special_morphism_rules r
			INNER JOIN properties p ON p.id = r.property_id AND p.type = r.property_type
			ORDER BY r.id`
		)
		.all()

	const get_categories = db.prepare<[string], { id: string }>(
		`SELECT structure_id AS id
		FROM property_assignments
		WHERE type = 'category' AND property_id = ? AND is_satisfied = TRUE`
	)

	const insert_special_morphism = db.prepare(
		`INSERT INTO special_morphism_assignments (
			category_id, kind, description, proof, is_deduced
		) VALUES (?, ?, ?, ?, TRUE)
		ON CONFLICT (category_id, kind) DO NOTHING`
	)

	for (const { property_id, relation, kind, description, proof } of rules) {
		let count = 0

		for (const { id } of get_categories.all(property_id)) {
			const proof_link = get_proof_link('category', id, property_id)
			const statement = `The category ${relation} ${property_id} (${proof_link}).`
			const full_proof = proof ? `${statement} ${proof}` : statement
			const res = insert_special_morphism.run(id, kind, description, full_proof)
			count += res.changes
		}

		devlog(
			`Deduced ${count} descriptions of ${get_special_morphism_plural(kind)} in ${property_id} categories`
		)
	}
}

/**
 * Deduce special morphisms in dual categories.
 * For example, monomorphisms in C describe epimorphisms in C^op.
 * We ignore duplicate assignments here because of overlaps
 * with previous deductions.
 */
function deduce_special_morphisms_of_dual_categories() {
	type DualSpecialMorphism = {
		category_id: string
		dual_category_id: string
		kind: string
		dual_kind: string
		description: string
	}

	const dual_special_morphisms = db
		.prepare<[], DualSpecialMorphism>(
			`SELECT
				s.id AS category_id,
				s.dual_structure_id AS dual_category_id,
				sma.kind,
				p.dual_property_id AS dual_kind,
				sma.description
			FROM structures s
			INNER JOIN special_morphism_assignments sma ON sma.category_id = s.id
			INNER JOIN properties p ON p.id = sma.kind AND p.type = 'morphism'
			WHERE s.type = 'category'
				AND s.dual_structure_id IS NOT NULL
				AND p.dual_property_id IS NOT NULL`
		)
		.all()

	const insert_special_morphism = db.prepare(
		`INSERT INTO special_morphism_assignments (
			category_id, kind, description, proof, is_deduced
		) VALUES (?, ?, ?, ?, TRUE)
		ON CONFLICT (category_id, kind) DO NOTHING`
	)

	let count = 0

	for (const entry of dual_special_morphisms) {
		const dual_link = `<a href="/category/${entry.category_id}">dual category</a>`
		const proof_link = get_proof_link('category', entry.category_id, entry.kind)
		const proof = `This follows from the ${dual_link} (${proof_link}).`
		const res = insert_special_morphism.run(
			entry.dual_category_id,
			entry.dual_kind,
			entry.description,
			proof
		)
		count += res.changes
	}

	devlog(`Deduced ${count} special morphisms by duality`)
}
