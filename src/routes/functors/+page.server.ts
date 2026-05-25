import type { StructureShort, TagObject } from '$lib/commons/types'
import { batch } from '$lib/server/db.catdat'
import { error } from '@sveltejs/kit'
import sql from 'sql-template-tag'

export const load = async () => {
	const { results, err } = batch<[StructureShort, TagObject]>([
		sql`SELECT id, name FROM functors ORDER BY lower(name)`,
		sql`SELECT tag FROM functor_tags ORDER BY id`,
	])

	if (err) error(500, 'Functors could not be loaded')

	const [functors, tag_objects] = results

	const tags = tag_objects.map(({ tag }) => tag)

	return { functors, tags }
}
