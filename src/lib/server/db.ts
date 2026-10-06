import { get_client } from '#shared/db.js'

/**
 * Database client for the CatDat database holding all mathematical knowledge
 */
export const db = get_client({ readonly: true })
