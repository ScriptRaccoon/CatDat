import katex from 'katex'
import { is_object } from './utils'
import MarkdownIt from 'markdown-it'
import { MACROS } from './macros'
import matter from 'gray-matter'

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

function slugify_heading(text: string): string {
	return text.trim().replace(/\s+/g, '_').toLowerCase()
}

md.renderer.rules.heading_open = (tokens, idx, options, _, self) => {
	const token = tokens[idx + 1]
	const text =
		token?.children
			?.filter((t) => t.type === 'text')
			.map((t) => t.content)
			.join('') ?? ''
	const id = slugify_heading(text)
	tokens[idx].attrSet('id', id)
	return self.renderToken(tokens, idx, options)
}

md.renderer.rules.link_open = (tokens, idx, options, _, self) => {
	const token = tokens[idx]

	const href_index = token.attrIndex('href')
	if (href_index >= 0) {
		const href = token.attrs?.[href_index]?.[1]

		if (href?.startsWith('https://') || href?.startsWith('http://')) {
			token.attrSet('target', '_blank')
		}
	}

	return self.renderToken(tokens, idx, options)
}

function render_content<T = Record<string, unknown>>(
	txt: string,
): { meta_data: T; html: string } {
	const { data, content } = matter(txt)

	const formulas: Record<string, string> = {}
	const with_placeholders = content.replace(
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

	return { meta_data: data as T, html }
}

export const content_ids = Object.keys(import.meta.glob('$lib/content/*.md'))
	.map((path) => path.split('/').pop()?.replace('.md', '') ?? '')
	.filter(Boolean)

export const content_dict: Record<string, string> = import.meta.glob(
	'$lib/content/*.md',
	{
		query: '?raw',
		import: 'default',
		eager: true,
	},
)

type ContentMetaData = {
	title: string
	description: string
	author?: string
}

export function get_rendered_content(file: string) {
	const key = `/src/lib/content/${file}.md`
	const txt = content_dict[key]
	if (!txt) return null
	return render_content<ContentMetaData>(txt)
}
