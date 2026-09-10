import type { StructureType } from '$lib/commons/types'
import { db } from '$lib/server/db'
import { render_nested_formulas } from '$lib/server/formulas'
import { to_placeholders } from '$shared/utils'
import { error } from 'node:console'
import structure_history from '$shared/structure.history.json'

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

	const proof_number = db
		.prepare<never[], number>('SELECT COUNT(*) FROM property_assignments')
		.pluck()
		.get()!

	if (!proof_number) {
		error(500, 'Could not load number of proofs')
	}

	const automated_proof_number = db
		.prepare<never[], number>(
			`SELECT COUNT(*) FROM property_assignments
			WHERE is_deduced = TRUE`
		)
		.pluck()
		.get()!

	if (!automated_proof_number) {
		error(500, 'Could not load number of automated proofs')
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
		.prepare<
			string[],
			{ id: string; type: StructureType; name: string; notation: string }
		>(
			`SELECT id, type, name, notation
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

	const recent_structures_ids = Object.entries(structure_history)
		.sort((a, b) => b[1].localeCompare(a[1]))
		.slice(0, 10)
		.map((a) => a[0])

	const recent_structures = db
		.prepare<string[], { id: string; type: StructureType; name: string }>(
			`SELECT id, type, name
			FROM structures
			WHERE id IN ${to_placeholders(recent_structures_ids)}`
		)
		.all(...recent_structures_ids)
		.sort(
			(a, b) =>
				recent_structures_ids.indexOf(a.id) - recent_structures_ids.indexOf(b.id)
		)

	return {
		stats: {
			structure_number,
			property_number,
			implication_number,
			proof_number,
			automated_proof_number
		},
		example_structures,
		selected_structures,
		recent_structures
	}
}
