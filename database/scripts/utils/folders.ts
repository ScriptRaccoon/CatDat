import path from 'node:path'
import { type StructureType } from '#shared/config.ts'

/**
 * Folder containing all YAML data files.
 */
export const DATA_FOLDER = path.resolve('database', 'data')

const STRUCTURE_FOLDERS: Record<StructureType, string> = {
	category: 'categories',
	functor: 'functors',
	morphism: 'morphisms',
	symmetric_monoidal_category: 'symmetric_monoidal_categories'
}

/**
 * Returns the folders with the YAML files of structures,
 * properties, and implications of a given type.
 */
export function get_data_folders(type: StructureType) {
	return {
		structures: path.join(DATA_FOLDER, STRUCTURE_FOLDERS[type]),
		properties: path.join(DATA_FOLDER, `${type}-properties`),
		implications: path.join(DATA_FOLDER, `${type}-implications`)
	}
}
