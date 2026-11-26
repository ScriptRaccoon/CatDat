import { get_client } from '#shared/db.ts'

/**
 * The read-only database client shared by all tests.
 */
export const db = get_client({ readonly: true })
