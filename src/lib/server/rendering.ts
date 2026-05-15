import katex from 'katex'
import { is_object } from './utils'
import MarkdownIt from 'markdown-it'
import { MACROS } from './macros'

const MATH_REGEX = /\$\$(.*?)\$\$|\$(.*?)\$/gs

function render_formula(
	formula: string,
	options: { displayMode: boolean } = { displayMode: false },
): string {
	if (formula.includes('\\emptyset')) {
		console.warn(
			`Warning: Use \\varnothing instead of \\emptyset.\nFormula: ${formula}`,
		)
	}

	return katex.renderToString(formula, {
		throwOnError: true,
		macros: MACROS,
		...options,
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

const md = new MarkdownIt()

function render_content(txt: string): string {
	const formulas: Record<string, string> = {}
	const with_placeholders = txt.replace(
		MATH_REGEX,
		(_, display_formula, inline_formula) => {
			const placeholder = `@@MATH-${Object.keys(formulas).length}@@`
			formulas[placeholder] =
				display_formula === undefined
					? render_formula(inline_formula, { displayMode: false })
					: render_formula(display_formula, { displayMode: true })
			return placeholder
		},
	)
	let html = md.render(with_placeholders)
	for (const [placeholder, rendered] of Object.entries(formulas)) {
		html = html.replaceAll(placeholder, rendered)
	}
	return html
}

const content_dict: Record<string, string> = import.meta.glob('$lib/content/*.md', {
	query: '?raw',
	import: 'default',
	eager: true,
})

export function get_rendered_content(file: string) {
	const key = `/src/lib/content/${file}.md`
	const txt = content_dict[key]
	if (!txt) return null
	return render_content(txt)
}
