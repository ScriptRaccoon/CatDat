import { STRUCTURE_TYPES, type StructureType } from '$shared/config'

export function is_structure_type(txt: string): txt is StructureType {
	return (STRUCTURE_TYPES as readonly string[]).includes(txt)
}

export const PLURALS: Record<StructureType, string> = {
	category: 'categories',
	functor: 'functors',
	morphism: 'morphisms'
}

export function get_selected_type(pathname: string): StructureType {
	for (const type of STRUCTURE_TYPES) {
		const matches = pathname.startsWith(`/${type}`)
		if (matches) return type
	}
	return 'category'
}
