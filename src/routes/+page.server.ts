import type { StructureType } from '#lib/commons/types.ts'
import { db } from '#lib/server/db.ts'
import { render_nested_text } from '#lib/server/text.ts'
import { to_placeholders } from '#shared/utils.ts'
import { error } from 'node:console'
import { history } from '#shared/history.ts'
import { get_property_url } from '#shared/property.utils.ts'

const NUMBER_RECENT = 20

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

	const example_structures = render_nested_text(example_structures_db.slice(2))

	const selected_structures = render_nested_text({
		Haus: example_structures_db[0],
		FinAb: example_structures_db[1]
	})

	const structure_name_query = db
		.prepare<[string, StructureType], string>(
			`SELECT name FROM structures WHERE id = ? AND type = ?`
		)
		.pluck()

	const recent_structures = history.structures
		.slice(-NUMBER_RECENT)
		.reverse()
		.map(({ type, id }) => ({
			href: `/${type}/${id}`,
			label: structure_name_query.get(id, type)!
		}))

	const recent_properties = history.properties
		.slice(-NUMBER_RECENT)
		.reverse()
		.map(({ type, id }) => ({ href: get_property_url(id, type), label: id }))

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
		recent_structures,
		recent_properties
	}
}
