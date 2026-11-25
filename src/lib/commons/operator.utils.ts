const OPERATORS = {
	and: {
		symbol: '∧',
		label: 'and'
	},
	not: {
		symbol: '¬',
		label: 'not'
	},
	implies: {
		symbol: '⟹',
		label: 'implies'
	},
	equivalent: {
		symbol: '⟺',
		label: 'is equivalent to'
	},
	indistinguishable: {
		symbol: '≈',
		label: 'is indistinguishable from'
	}
}

/**
 * Returns the HTML of an operator, for example in an implication, which is
 * styled in app.css.
 */
export function get_operator_html(operator: keyof typeof OPERATORS) {
	const { symbol, label } = OPERATORS[operator]
	return `<span class="operator" role="img" aria-label="${label}">${symbol}</span>`
}
