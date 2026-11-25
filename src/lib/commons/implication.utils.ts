const OPERATORS = {
	and: { symbol: '∧', label: 'and' },
	implies: { symbol: '⟹', label: 'implies' },
	equivalent: { symbol: '⟺', label: 'is equivalent to' }
}

/**
 * Returns the HTML of an operator in an implication, which is styled in app.css.
 */
export function get_operator_html(operator: keyof typeof OPERATORS) {
	const { symbol, label } = OPERATORS[operator]
	return `<span class="implication-operator" role="img" aria-label="${label}">${symbol}</span>`
}
