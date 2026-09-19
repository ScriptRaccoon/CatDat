import * as v from 'valibot'

export const config_yaml_schema = v.object({
	structure_tags: v.array(v.string()),
	category_tags: v.array(v.string()),
	functor_tags: v.array(v.string()),
	morphism_tags: v.array(v.string()),
	symmetric_monoidal_category_tags: v.array(v.string()),
	category_property_tags: v.array(v.string()),
	functor_property_tags: v.array(v.string()),
	morphism_property_tags: v.array(v.string()),
	symmetric_monoidal_category_property_tags: v.array(v.string()),
	relations: v.array(
		v.object({
			relation: v.string(),
			negation: v.string(),
			conditional: v.string()
		})
	),
	special_objects: v.array(
		v.object({
			kind: v.string(),
			dual: v.string()
		})
	),
	special_morphisms: v.array(
		v.object({
			kind: v.string(),
			dual: v.string()
		})
	)
})

export const special_morphism_rule_yaml_schema = v.array(
	v.object({
		property: v.string(),
		kind: v.string(),
		description: v.string(),
		proof: v.string()
	})
)

export const property_entry_schema = v.object({
	property: v.string(),
	proof: v.string(),
	check_redundancy: v.optional(v.boolean()),
	label: v.optional(v.string()),
	references: v.optional(v.array(v.string()))
})

export const structure_yaml_schema = v.object({
	id: v.string(),
	name: v.string(),
	notation: v.string(),
	description: v.string(),
	nlab_link: v.nullable(v.string()),
	tags: v.array(v.string()),
	related: v.array(v.string()),
	dual: v.optional(v.string()),
	parent: v.optional(v.string()),
	associated: v.optional(v.record(v.string(), v.nullable(v.string()))),
	satisfied_properties: v.array(property_entry_schema),
	unsatisfied_properties: v.array(property_entry_schema),
	undecidable_properties: v.optional(v.array(property_entry_schema)),
	comments: v.optional(v.array(v.string()))
})

export const category_yaml_schema = v.object({
	id: v.string(),
	objects: v.string(),
	morphisms: v.string(),
	special_objects: v.record(
		v.string(),
		v.object({
			description: v.string()
		})
	),
	special_morphisms: v.record(
		v.string(),
		v.object({
			description: v.string(),
			proof: v.string()
		})
	)
})

export const property_yaml_schema = v.object({
	id: v.string(),
	relation: v.string(),
	description: v.string(),
	nlab_link: v.nullable(v.string()),
	dual: v.nullable(v.string()),
	invariant_under_equivalences: v.boolean(),
	related: v.array(v.string()),
	tags: v.array(v.string())
})

export const implications_yaml_schema = v.array(
	v.object({
		id: v.string(),
		assumptions: v.array(v.string()),
		conclusions: v.array(v.string()),
		associated_assumptions: v.optional(v.record(v.string(), v.array(v.string()))),
		proof: v.string(),
		is_equivalence: v.optional(v.boolean())
	})
)
