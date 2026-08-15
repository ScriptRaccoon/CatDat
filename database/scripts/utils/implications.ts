import type { PropertyMeta } from './properties'
import { type StructureType } from '$shared/config'
import { get_property_label } from '$shared/property.utils'
import { type NormalizedImplication } from '$shared/implications'
import { remove_underscores } from '$shared/utils'

function get_assumption_string(
	implication: NormalizedImplication,
	properties_dict: Record<string, PropertyMeta>,
	type: StructureType,
	conditional = false
): string {
	const { assumptions } = implication

	const own = assumptions.size
		? Array.from(assumptions)
				.map(
					(assumption) =>
						`${properties_dict[assumption][conditional ? 'conditional_relation' : 'relation']} ${get_property_label(assumption)}`
				)
				.join(' and ')
		: `is a ${remove_underscores(type)}`

	if (!implication.associated_assumptions) return own

	const associated = Object.entries(implication.associated_assumptions)
		.map(
			([map, props]) =>
				`and the ${remove_underscores(map)} has the required properties (${Array.from(props!).join(', ')})`
		)
		.join(', ')

	return `${own}, ${associated}`
}

function get_conclusion_string(
	implication: NormalizedImplication,
	properties_dict: Record<string, PropertyMeta>,
	conditional = false
): string {
	const { conclusion } = implication

	return `${properties_dict[conclusion][conditional ? 'conditional_relation' : 'relation']} ${get_property_label(conclusion)}`
}

export function get_proof_string(
	implication: NormalizedImplication,
	properties_dict: Record<string, PropertyMeta>,
	type: StructureType
) {
	const assumption_string = get_assumption_string(implication, properties_dict, type)
	const conclusion_string = get_conclusion_string(implication, properties_dict)

	const ref = `by <a href="/${type}-implication/${implication.id}">this result</a>`

	return `Since it ${assumption_string}, it ${conclusion_string} (${ref}).`
}

export function get_contradiction_string(
	implication: NormalizedImplication,
	properties_dict: Record<string, PropertyMeta>,
	property: string,
	type: StructureType
) {
	const assumption_string = get_assumption_string(
		implication,
		properties_dict,
		type,
		true
	)
	const conclusion_string = get_conclusion_string(implication, properties_dict, true)

	const has_multiple_assumptions =
		implication.assumptions.size > 1 || !!implication.associated_assumptions

	const ref = `by <a href="/${type}-implication/${implication.id}">this result</a>`

	const relation = properties_dict[property].relation

	const contra = `Assume for contradiction that it ${relation} ${get_property_label(property)}`

	return has_multiple_assumptions
		? `${contra}. Then it ${assumption_string}, so it ${conclusion_string} (${ref}) – contradiction.`
		: `${contra}. Then it ${conclusion_string} (${ref}) – contradiction.`
}
