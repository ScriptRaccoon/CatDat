import type { StructureType } from '$lib/commons/types'
import { db } from '$lib/server/db'
import { render_nested_formulas } from '$lib/server/formulas'
import { to_placeholders } from '$shared/utils'
import { error } from 'node:console'

export const load = () => {
	const structure_number = db
		.prepare<never[], number>('SELECT COUNT(*) FROM structures')
		.pluck()
		.get()!

	if (!structure_number) {
		error(500, 'Could not load number of structures')
	}

	const property_number = db
		.prepare<never[], number>('SELECT COUNT(*) FROM properties')
		.pluck()
		.get()!

	if (!property_number) {
		error(500, 'Could not load number of properties')
	}

	const implication_number = db
		.prepare<never[], number>('SELECT COUNT(*) FROM implications')
		.pluck()
		.get()!

	if (!implication_number) {
		error(500, 'Could not load number of implications')
	}

	const assignment_number = db
		.prepare<never[], number>('SELECT COUNT(*) FROM property_assignments')
		.pluck()
		.get()!

	if (!assignment_number) {
		error(500, 'Could not load number of property assignments')
	}

	const example_structure_ids = [
		'Haus',
		'FinAb',
		'Set',
		'Grp',
		'CompHaus',
		'Delta',
		'Met_oo',
		'pi_1',
		'rational_product',
		'Ab_tensor'
	]

	const example_structures_db = db
		.prepare<string[], { id: string; type: StructureType; notation: string }>(
			`SELECT id, type, notation
			FROM structures
			WHERE id IN ${to_placeholders(example_structure_ids)}`
		)
		.all(...example_structure_ids)

	const order = new Map(example_structure_ids.map((id, index) => [id, index]))

	example_structures_db.sort((a, b) => order.get(a.id)! - order.get(b.id)!)

	const example_structures = render_nested_formulas(example_structures_db.slice(2))

	const selected_structures = render_nested_formulas({
		Haus: example_structures_db[0],
		FinAb: example_structures_db[1]
	})

	return {
		stats: {
			structure_number,
			property_number,
			implication_number,
			assignment_number
		},
		example_structures,
		selected_structures
	}
}
