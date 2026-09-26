import fs from 'node:fs'
import path from 'node:path'
import * as v from 'valibot'
import { get_client } from '$shared/db'
import { STRUCTURE_TYPES, type StructureType } from '$shared/config'
import { get_property_assignments, parse_file } from './utils/seed.helpers'
import { structure_yaml_schema } from './utils/seed.schemas'

const db = get_client({ readonly: false })

const data_folder = path.resolve('database', 'data')

const structure_folders: Record<StructureType, string> = {
	category: 'categories',
	functor: 'functors',
	morphism: 'morphisms',
	symmetric_monoidal_category: 'symmetric_monoidal_categories'
}

main()

function main() {
	try {
		const structures: v.InferOutput<typeof structure_yaml_schema>[] = []

		for (const type of STRUCTURE_TYPES) {
			const folder = path.join(data_folder, structure_folders[type])
			const files = fs
				.readdirSync(folder)
				.filter((file) => file.endsWith('.yaml'))
				.sort()

			for (const file of files) {
				const file_path = path.join(folder, file)
				structures.push(parse_file(file_path, structure_yaml_schema))
			}
		}

		const tx_update = db.transaction(() => {
			let name_updates = 0
			let notation_updates = 0
			let description_updates = 0
			let nlab_link_updates = 0
			let proof_updates = 0

			for (const structure of structures) {
				const existing = db
					.prepare<
						[string],
						{
							name: string
							notation: string
							description: string
							nlab_link: string | null
						}
					>(
						`SELECT name, notation, description, nlab_link FROM structures WHERE id = ?`
					)
					.get(structure.id)

				if (!existing)
					throw new Error(
						`Structure ${structure.id} is missing; run pnpm db:update first.`
					)

				if (existing.name !== structure.name) {
					db.prepare(`UPDATE structures SET name = ? WHERE id = ?`).run(
						structure.name,
						structure.id
					)
					name_updates++
				}

				if (existing.notation !== structure.notation) {
					db.prepare(`UPDATE structures SET notation = ? WHERE id = ?`).run(
						structure.notation,
						structure.id
					)
					notation_updates++
				}

				if (existing.description !== structure.description) {
					db.prepare(`UPDATE structures SET description = ? WHERE id = ?`).run(
						structure.description,
						structure.id
					)
					description_updates++
				}

				if (existing.nlab_link !== structure.nlab_link) {
					db.prepare(`UPDATE structures SET nlab_link = ? WHERE id = ?`).run(
						structure.nlab_link,
						structure.id
					)
					nlab_link_updates++
				}

				for (const assignment of get_property_assignments(structure)) {
					const existing_assignment = db
						.prepare<[string, string], { proof: string; is_deduced: number }>(
							`SELECT proof, is_deduced FROM property_assignments
							WHERE structure_id = ? AND property_id = ?`
						)
						.get(structure.id, assignment.property)

					if (!existing_assignment) {
						throw new Error(
							`Property assignment ${structure.id}/${assignment.property} is missing; run pnpm db:update first.`
						)
					}

					if (existing_assignment.is_deduced) {
						throw new Error(
							`Property assignment ${structure.id}/${assignment.property} is derived; run pnpm db:update first.`
						)
					}

					if (existing_assignment.proof !== assignment.proof) {
						db.prepare(
							`UPDATE property_assignments SET proof = ?
							WHERE structure_id = ? AND property_id = ? AND is_deduced = FALSE`
						).run(assignment.proof, structure.id, assignment.property)
						proof_updates++
					}
				}
			}

			return {
				name_updates,
				notation_updates,
				description_updates,
				nlab_link_updates,
				proof_updates
			}
		})()

		const {
			name_updates,
			notation_updates,
			description_updates,
			nlab_link_updates,
			proof_updates
		} = tx_update

		console.info(
			`Updated text: ${name_updates} names, ` +
				`${notation_updates} notations, ` +
				`${description_updates} descriptions, ` +
				`${nlab_link_updates} nLab links, ` +
				`${proof_updates} proofs.`
		)
	} catch (error) {
		console.error(error instanceof Error ? error.message : error)
		process.exit(1)
	} finally {
		db.close()
	}
}
