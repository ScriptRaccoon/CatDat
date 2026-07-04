import type { StructureType } from './types'

export const STRUCTURES: StructureType[] = ['category', 'functor', 'morphism']

export function is_structure_type(txt: string): txt is StructureType {
	return (STRUCTURES as string[]).includes(txt)
}

export const PLURALS = {
	category: 'categories',
	functor: 'functors',
	morphism: 'morphisms',
}

export function get_selected_type(pathname: string): StructureType {
	for (const type of STRUCTURES) {
		const matches =
			pathname.startsWith(`/${type}`) || pathname.startsWith(`/${PLURALS[type]}`)
		if (matches) return type
	}
	return 'category'
}
