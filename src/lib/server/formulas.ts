import katex from 'katex'
import YAML from 'yaml'
import path from 'node:path'
import fs from 'node:fs'

const MACROS = YAML.parse(
	fs.readFileSync(path.resolve('database', 'data', 'macros.yaml'), 'utf8')
) as Record<string, string>

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

export function render_formulas(txt: string): string {
	return txt.replace(MATH_REGEX, (_, display_formula, inline_formula) => {
		if (display_formula !== undefined) {
			return render_formula(display_formula, { displayMode: true })
		}

		return render_formula(inline_formula, { displayMode: false })
	})
}
