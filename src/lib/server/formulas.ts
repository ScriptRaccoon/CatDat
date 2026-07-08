import katex from 'katex'
import { is_object } from './utils'
import { MACROS } from './macros'

export const MATH_REGEX = /\$\$(.*?)\$\$|\$(.*?)\$/gs

export function render_formula(
	formula: string,
	options: { displayMode: boolean } = { displayMode: false }
): string {
	return katex.renderToString(formula, {
		throwOnError: true,
		macros: MACROS,
		...options
	})
}

function render_formulas(txt: string): string {
	return txt.replace(MATH_REGEX, (_, display_formula, inline_formula) => {
		if (display_formula !== undefined) {
			return render_formula(display_formula, { displayMode: true })
		}

		return render_formula(inline_formula, { displayMode: false })
	})
}

export function render_nested_formulas<T>(obj: T): T {
	if (!obj) return obj

	if (typeof obj === 'string') {
		const with_line_breaks = obj.replaceAll('\n', '<br>')
		return render_formulas(with_line_breaks) as T
	}

	if (Array.isArray(obj)) {
		return obj.map(render_nested_formulas) as T
	}

	if (is_object(obj)) {
		const result: Record<string, unknown> = {}
		for (const key in obj) {
			result[key] = render_nested_formulas(obj[key])
		}
		return result as T
	}

	return obj
}
