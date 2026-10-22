import katex from 'katex'
import YAML from 'yaml'
import path from 'node:path'
import fs from 'node:fs'

const MACROS = YAML.parse(
	fs.readFileSync(path.resolve('database', 'data', 'macros.yaml'), 'utf8')
) as Record<string, string>

// The third group is the punctuation directly after an inline formula
// (see append_suffix). It does not include ], which would break the syntax
// of Markdown links.
export const MATH_REGEX = /\$\$(.*?)\$\$|\$(.*?)\$([.,;:)-]*)/gs

const HTML_START = '<span class="katex-html" aria-hidden="true">'

const SPAN_TAG_REGEX = /<span(?: class="([^"]*)")?[^>]*>|<\/span>/g

type Chunk = {
	markup: string
	is_base: boolean
	is_break_point: boolean
}

/**
 * Renders a formula with KaTeX. The optional suffix is punctuation that
 * directly follows an inline formula in the text, such as a period.
 */
export function render_formula(
	formula: string,
	options: { displayMode: boolean } = { displayMode: false },
	suffix = ''
): string {
	const html = katex.renderToString(formula, {
		throwOnError: true,
		macros: MACROS,
		...options
	})

	const html_start = html.indexOf(HTML_START)
	if (html_start === -1) return html + suffix

	const start = html_start + HTML_START.length

	// the unbreakable pieces of the formula (.katex-base), each marked as to
	// whether a line break after it is preferred, and the index where they end
	const { chunks, end } = parse_chunks(html, start)

	let head = html.slice(0, start)

	if (suffix) {
		append_suffix(chunks, suffix)
		// .katex-html is hidden from screen readers, which read the MathML instead
		head = head.replace('</math>', `</math>${suffix}`)
	}

	// replace the content of .katex-html
	return head + group_chunks(chunks) + html.slice(end)
}

export function render_formulas(txt: string): string {
	return txt.replace(MATH_REGEX, (_, display_formula, inline_formula, suffix) => {
		if (display_formula !== undefined) {
			return render_formula(display_formula, { displayMode: true })
		}

		return render_formula(inline_formula, { displayMode: false }, suffix)
	})
}

/**
 * When a formula does not fit into one line, this makes the line break
 * happen after a relation (such as =, ⊆, →) rather than after a binary
 * operator (such as +, ×, ∘).
 * For example, `a + b = c + d` may break into `a + b =` and `c + d`, but
 * not into `a +` and `b = c + d`, unless `a + b =` alone is wider than the
 * line. An explicit `\allowbreak` counts like a relation. This applies to
 * inline and display formulas.
 *
 * Takes the chunks of the HTML output of KaTeX and returns their markup
 * with the chunks between two relations wrapped into `.formula-group`
 * elements.
 */
function group_chunks(chunks: Chunk[]): string {
	// without a break point before the last chunk, all chunks would form a
	// single group, which is pointless since .katex is an inline block anyway
	const has_inner_break_point = chunks
		.slice(0, -1)
		.some((chunk) => chunk.is_break_point)
	if (!has_inner_break_point) return chunks.map((chunk) => chunk.markup).join('')

	// KaTeX ends a chunk after each relation and binary operator and allows
	// a line break between any two chunks. We wrap the chunks between two
	// break points into a .formula-group, which is an inline block (see
	// app.css), so that a line break inside a group only happens when the
	// group does not fit into a line on its own.
	const parts: string[] = []
	let group: string[] = []

	const close_group = () => {
		// a single chunk is unbreakable anyway
		if (group.length <= 1) {
			parts.push(...group)
		} else {
			parts.push(`<span class="formula-group">${group.join('')}</span>`)
		}
		group = []
	}

	for (const chunk of chunks) {
		// other children, such as line breaks and equation tags, stay as they are
		if (!chunk.is_base) {
			close_group()
			parts.push(chunk.markup)
			continue
		}

		group.push(chunk.markup)
		if (chunk.is_break_point) close_group()
	}

	close_group()

	return parts.join('')
}

/**
 * Browsers allow a line break between an inline block, such as .katex, and
 * the next character. So punctuation directly after a formula may start a
 * new line, which always happens when the formula is wider than the line.
 * To prevent this, the punctuation is moved into the last chunk of the
 * formula, which is unbreakable. Its font is adjusted in app.css.
 */
function append_suffix(chunks: Chunk[], suffix: string) {
	const markup = `<span class="formula-suffix">${suffix}</span>`
	const last_chunk = chunks.at(-1)

	if (last_chunk?.is_base) {
		const closing_tag = '</span>'
		last_chunk.markup =
			last_chunk.markup.slice(0, -closing_tag.length) + markup + closing_tag
	} else {
		chunks.push({ markup, is_base: false, is_break_point: false })
	}
}

/**
 * Splits the HTML output of KaTeX, which begins at the given index, into
 * its chunks and determines after which of them a line break is preferred.
 * Also returns the index where the HTML output ends.
 */
function parse_chunks(html: string, start: number): { chunks: Chunk[]; end: number } {
	const chunks: Chunk[] = []
	let depth = 0
	let chunk_start = start
	let is_base = false
	let last_classes: string[] = []
	let has_allowbreak = false

	// the chunks and their children are spans, so the span tags
	// (with their depth) suffice to find them
	for (const match of html.slice(start).matchAll(SPAN_TAG_REGEX)) {
		const index = start + match.index

		if (match[0] === '</span>') {
			// a closing tag at depth 0 closes .katex-html itself
			if (depth === 0) return { chunks, end: index }

			depth--

			// the chunk is complete. It is a break point if its last child
			// (ignoring spaces) is a relation or if it contains an explicit
			// \allowbreak.
			if (depth === 0) {
				chunks.push({
					markup: html.slice(chunk_start, index + match[0].length),
					is_base,
					is_break_point: has_allowbreak || last_classes.includes('mrel')
				})
			}
		} else {
			const classes = match[1]?.split(' ') ?? []

			// a new chunk begins
			if (depth === 0) {
				chunk_start = index
				is_base = classes.includes('katex-base')
				last_classes = []
				has_allowbreak = false
			}
			// a child of the current chunk
			else if (depth === 1) {
				if (classes.includes('allowbreak')) has_allowbreak = true
				if (!classes.includes('mspace')) last_classes = classes
			}

			depth++
		}
	}

	throw new Error(`Unexpected HTML output of KaTeX: ${html}`)
}
