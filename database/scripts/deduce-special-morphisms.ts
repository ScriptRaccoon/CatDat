import { get_client } from '$shared/db'
import { devlog } from '$shared/utils'

const db = get_client({ readonly: false })

export function deduce_special_morphisms() {
	console.info('\n--- Deduce special morphisms ---')
	clear_deduced_special_morphisms()
	deduce_special_morphisms_by_rules()
	deduce_special_morphisms_of_dual_categories()
}

/**
 * Clears deduced special morphisms
 */
function clear_deduced_special_morphisms() {
	db.prepare(`DELETE FROM special_morphisms WHERE is_deduced = TRUE`).run()
}

/**
 * A rule specifies how a certain type of special morphism can be deduced.
 * TODO: move this to the database.
 */
type Rule = {
	property: string
	type: string
	description: string
	proof: string
}

/**
 * Rules for deducing special morphisms in categories that satisfy a given property.
 * TODO: move this to the database.
 */
const RULES: Rule[] = [
	{
		property: 'groupoid',
		type: 'isomorphisms',
		description: 'every morphism',
		proof: 'The category is a groupoid.'
	},
	{
		property: 'finitary algebraic',
		type: 'isomorphisms',
		proof: 'bijective morphisms',
		description:
			'This characterization holds in every finitary algebraic category: the inverse of a bijective morphism is again a morphism.'
	},
	{
		property: 'finitary algebraic',
		type: 'monomorphisms',
		description: 'injective morphisms',
		proof: 'This holds in every finitary algebraic category: the forgetful functor to sets is faithful, hence reflects monomorphisms, and it is continuous (even representable), hence preserves monomorphisms.'
	},
	{
		property: 'finitary algebraic',
		type: 'regular epimorphisms',
		description: 'surjective morphisms',
		proof: 'This holds in every finitary algebraic category: the construction of coequalizers shows that every regular epimorphism is surjective. Conversely, the fundamental theorem on homomorphisms states that every surjective homomorphism $A \\to B$ is the coequalizer of the two projections $A \\times_B A \\rightrightarrows A$.'
	},
	{
		property: 'thin',
		type: 'monomorphisms',
		description: 'every morphism',
		proof: 'It is a thin category.'
	},
	{
		property: 'thin',
		type: 'epimorphisms',
		description: 'every morphism',
		proof: 'It is a thin category.'
	},
	{
		property: 'left cancellative',
		type: 'monomorphisms',
		description: 'every morphism',
		proof: 'The category is left cancellative.'
	},
	{
		property: 'right cancellative',
		type: 'epimorphisms',
		description: 'every morphism',
		proof: 'The category is right cancellative.'
	},
	{
		property: 'left cancellative',
		type: 'regular epimorphisms',
		description: 'same as isomorphisms',
		proof: 'The category is left cancellative, and a regular epimorphism which is a monomorphism must be an isomorphism.'
	},
	{
		property: 'right cancellative',
		type: 'regular monomorphisms',
		description: 'same as isomorphisms',
		proof: 'The category is right cancellative, and a regular monomorphism which is an epimorphism must be an isomorphism.'
	},
	{
		property: 'mono-regular',
		type: 'regular monomorphisms',
		description: 'same as monomorphisms',
		proof: 'The category is mono-regular.'
	},
	{
		property: 'epi-regular',
		type: 'regular epimorphisms',
		description: 'same as epimorphisms',
		proof: 'The category is epi-regular.'
	}
]

/**
 * Deduces special morphisms as specified by a rule.
 * We ignore duplicate assignments here because of overlaps
 * with previous deductions.
 */
function deduce_special_morphisms_by_rule(rule: Rule) {
	const { property, type, description, proof } = rule

	const res = db
		.prepare(
			`INSERT INTO special_morphisms (
                category_id,
                type,
                description,
                proof,
                is_deduced
            )
            SELECT
                structure_id,
                ?,
                ?,
                ?,
                TRUE
            FROM property_assignments
            WHERE type = 'category'
            AND property_id = ?
            AND is_satisfied = TRUE
            ON CONFLICT (category_id, type) DO NOTHING`
		)
		.run(type, description, proof, property)

	devlog(`Deduced ${res.changes} descriptions of ${type} in ${property} categories`)
}

/**
 * Deduces special morphisms for all rules.
 */
function deduce_special_morphisms_by_rules() {
	for (const rule of RULES) {
		deduce_special_morphisms_by_rule(rule)
	}
}

/**
 * Deduce special morphisms in dual categories.
 * For example, monomorphisms in C describe epimorphisms in C^op.
 * We ignore duplicate assignments here because of overlaps
 * with previous deductions.
 */
function deduce_special_morphisms_of_dual_categories() {
	const res = db
		.prepare(
			`INSERT INTO special_morphisms (
                category_id,
                type,
                description,
                proof,
                is_deduced
            )
            SELECT
                c.dual_structure_id,
                t.dual,
                m.description,
                'This is deduced from its dual category.',
                TRUE
            FROM structures c
            INNER JOIN special_morphisms m ON m.category_id = c.id
            INNER JOIN special_morphism_types t ON t.type = m.type
            WHERE c.type = 'category' AND c.dual_structure_id IS NOT NULL
            ON CONFLICT (category_id, type) DO NOTHING`
		)
		.run()

	devlog(`Deduced ${res.changes} special morphisms by duality`)
}
