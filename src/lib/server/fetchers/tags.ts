import type { StructureType } from '$lib/commons/types'
import { db } from '$lib/server/db'

export function fetch_structure_tags() {
	return db
		.prepare<
			never[],
			{ tag: string; type: StructureType }
		>(`SELECT tag, type FROM structure_tags`)
		.all()
}

export function fetch_property_tags() {
	return db
		.prepare<
			never[],
			{ tag: string; type: StructureType }
		>(`SELECT tag, type FROM property_tags`)
		.all()
}
