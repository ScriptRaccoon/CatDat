/**
 * Converts a heading or the label of a theorem environment into an anchor ID,
 * e.g. "Lemma 14" into "lemma_14"
 */
export function to_anchor_id(label: string) {
	return label.trim().replace(/\s+/g, '_').toLowerCase()
}

/**
 * Matches the first line of a theorem environment in a content page,
 * e.g. "::: Lemma 14", and captures the label.
 */
export const THEOREM_ENVIRONMENT_REGEX =
	/^:::\s*((?:lemma|theorem|proposition|corollary|claim)\b.*)$/i

/**
 * Matches a Markdown heading, e.g. "## References", and captures its text.
 */
const HEADING_REGEX = /^#+\s+(.*)$/

/**
 * Returns the anchor IDs of the headings and theorem environments in a content page
 */
export function get_anchor_ids(markdown: string) {
	return markdown
		.split('\n')
		.map((line) => line.trim())
		.map(
			(line) =>
				line.match(HEADING_REGEX)?.[1] ??
				line.match(THEOREM_ENVIRONMENT_REGEX)?.[1]
		)
		.filter((label) => label !== undefined)
		.map(to_anchor_id)
}
