import { are_disjoint } from '$shared/utils'
import * as v from 'valibot'

const distinct_strings_schema = v.pipe(
	v.array(v.string()),
	v.check(
		(values) => new Set(values).size === values.length,
		'Values must be pairwise distinct.'
	)
)

export const config_yaml_schema = v.strictObject({
	structure_tags: distinct_strings_schema,
	category_tags: distinct_strings_schema,
	functor_tags: distinct_strings_schema,
	morphism_tags: distinct_strings_schema,
	symmetric_monoidal_category_tags: distinct_strings_schema,

	category_property_tags: distinct_strings_schema,
	functor_property_tags: distinct_strings_schema,
	morphism_property_tags: distinct_strings_schema,
	symmetric_monoidal_category_property_tags: distinct_strings_schema,

	relations: v.array(
		v.strictObject({
			relation: v.string(),
			negation: v.string(),
			conditional: v.string()
		})
	),

	special_objects: v.array(
		v.strictObject({
			kind: v.string(),
			dual: v.string()
		})
	),

	special_morphisms: v.array(
		v.strictObject({
			kind: v.string(),
			dual: v.string()
		})
	)
})

export const special_morphism_rule_yaml_schema = v.array(
	v.strictObject({
		property: v.string(),
		kind: v.string(),
		description: v.string(),
		proof: v.string()
	})
)

const property_entry_schema = v.strictObject({
	property: v.string(),
	proof: v.string(),
	check_redundancy: v.optional(v.literal(false)),
	label: v.optional(v.string()),
	references: v.optional(distinct_strings_schema)
})

export const structure_yaml_schema = v.pipe(
	v.object({
		id: v.string(),
		name: v.string(),
		notation: v.string(),
		description: v.string(),
		nlab_link: v.nullable(v.string()),
		tags: v.pipe(distinct_strings_schema, v.minLength(1)),
		related: distinct_strings_schema,
		dual: v.optional(v.string()),
		parent: v.optional(v.string()),
		associated: v.optional(v.record(v.string(), v.nullable(v.string()))),
		satisfied_properties: v.array(property_entry_schema),
		unsatisfied_properties: v.array(property_entry_schema),
		undecidable_properties: v.optional(v.array(property_entry_schema)),
		comments: v.optional(v.array(v.string()))
	}),
	v.check(
		(structure) =>
			are_disjoint(
				[
					structure.satisfied_properties,
					structure.unsatisfied_properties,
					structure.undecidable_properties ?? []
				],
				(entry) => entry.property
			),
		'Satisfied, unsatisfied, and undecidable properties must be disjoint.'
	)
)

export const category_yaml_schema = v.object({
	id: v.string(),
	objects: v.string(),
	morphisms: v.string(),
	special_objects: v.record(v.string(), v.strictObject({ description: v.string() })),
	special_morphisms: v.record(
		v.string(),
		v.strictObject({ description: v.string(), proof: v.string() })
	)
})

export const property_yaml_schema = v.strictObject({
	id: v.string(),
	relation: v.string(),
	description: v.string(),
	nlab_link: v.nullable(v.string()),
	dual: v.nullable(v.string()),
	invariant_under_equivalences: v.boolean(),
	related: distinct_strings_schema,
	tags: v.pipe(distinct_strings_schema, v.minLength(1))
})

export const implications_yaml_schema = v.array(
	v.pipe(
		v.strictObject({
			id: v.string(),
			assumptions: distinct_strings_schema,
			conclusions: v.pipe(distinct_strings_schema, v.minLength(1)),
			associated_assumptions: v.optional(
				v.record(v.string(), distinct_strings_schema)
			),
			proof: v.string(),
			is_equivalence: v.optional(v.literal(true))
		}),
		v.check(
			(impl) =>
				impl.assumptions.length > 0 ||
				(impl.associated_assumptions !== undefined &&
					Object.keys(impl.associated_assumptions).length > 0),
			`Implication must have at least one assumption or associated assumptions.`
		)
	)
)
