import MarkdownIt from 'markdown-it'
import matter from 'gray-matter'
import { MATH_REGEX, render_formula } from './formulas'
import path from 'node:path'
import fs from 'node:fs'

const md = new MarkdownIt({ html: true })

// add id attribute to each heading
md.renderer.rules.heading_open = (tokens, idx, options, _, self) => {
	const token = tokens[idx + 1]
	const text =
		token?.children
			?.filter((t) => t.type === 'text')
			.map((t) => t.content)
			.join('') ?? ''
	const id = text.trim().replace(/\s+/g, '_').toLowerCase()
	tokens[idx].attrSet('id', id)
	return self.renderToken(tokens, idx, options)
}

// open external links in new tab
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

// add structure and classes to theorem environments
md.block.ruler.before(
	'fence',
	'theorem_environment',
	(state, start_line, end_line, silent) => {
		const start = state.bMarks[start_line] + state.tShift[start_line]
		const max = state.eMarks[start_line]
		const line = state.src.slice(start, max).trim()

		const match = line.match(/^:::\s*(lemma|theorem|proposition|corollary|claim)/i)
		if (!match) return false

		const title = line.slice(3).trim()

		let next_line = start_line + 1

		while (next_line < end_line) {
			const nStart = state.bMarks[next_line] + state.tShift[next_line]
			const nEnd = state.eMarks[next_line]
			const text = state.src.slice(nStart, nEnd).trim()

			if (text === ':::') break
			next_line++
		}

		if (silent) return true

		const body_lines = state.getLines(
			start_line + 1,
			next_line,
			state.blkIndent,
			true,
		)

		const body_html = md.renderInline(body_lines.trim())

		const token = state.push('html_block', '', 0)
		token.content =
			`<div class="theorem">` +
			`<span class="theorem-title">${title}.</span>` +
			`${body_html}` +
			`</div>`

		state.line = next_line + 1
		return true
	},
)

/**
 * Replaces the math formulas in a markdown text with placeholders and
 * returns a dictionary with the rendered formulas.
 */
function preprocess_math(content: string) {
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

	return { processed_content: with_placeholders, formulas }
}

/**
 * Replaces the placeholders with the rendered formulas.
 */
function postprocess_math(html: string, formulas: Record<string, string>) {
	for (const [placeholder, rendered] of Object.entries(formulas)) {
		html = html.replaceAll(placeholder, rendered)
	}
	return html
}

/**
 * Replaces SVG placeholders with file contents
 */
function insert_svg(content: string) {
	const regex = /@@@SVG:([^@]+)@@@/g

	return content.replace(regex, (_, src: string) => {
		if (!src.startsWith('/')) return ''

		const svg_path = path.resolve(`static${src}`)
		return fs.readFileSync(svg_path, 'utf8')
	})
}

/**
 * Renders markdown content and formulas of a given string
 */
function render_content<T = Record<string, unknown>>(
	txt: string,
): { meta_data: T; html: string } {
	const { data, content } = matter(txt)

	const { processed_content, formulas } = preprocess_math(content)

	const html = md.render(processed_content)

	const html_with_formulas = postprocess_math(html, formulas)

	const html_with_svg = insert_svg(html_with_formulas)

	return { meta_data: data as T, html: html_with_svg }
}

/**
 * Names of stored markdown files
 */
export const content_ids = Object.keys(import.meta.glob('$lib/content/*.md'))
	.map((path) => path.split('/').pop()?.replace('.md', '') ?? '')
	.filter(Boolean)

/**
 * Dictionary mapping an id to the text content stored in the respective file
 */
const content_dict: Record<string, string> = import.meta.glob('$lib/content/*.md', {
	query: '?raw',
	import: 'default',
	eager: true,
})

type ContentMetaData = {
	title: string
	description: string
	author?: string
}

/**
 * Returns the rendered content of a markdown file
 */
export function get_rendered_content(id: string) {
	const key = `/src/lib/content/${id}.md`
	const txt = content_dict[key]
	if (!txt) return null
	return render_content<ContentMetaData>(txt)
}
