import dotenv from 'dotenv'
import { createClient } from '@libsql/client'

dotenv.config({ quiet: true })

const DB_VISITS_URL = process.env.DB_VISITS_URL
const DB_VISITS_AUTH_TOKEN = process.env.DB_VISITS_AUTH_TOKEN

if (!DB_VISITS_URL) throw new Error('No DB_VISITS_URL found')

const db_visits = createClient({
	url: DB_VISITS_URL,
	authToken: DB_VISITS_AUTH_TOKEN,
})

migrate()

/**
 * Creates the visits database and its tables.
 */
async function migrate() {
	await create_visits_table()
}

/**
 * Creates the visits table.
 */
async function create_visits_table() {
	await db_visits.execute(`
        CREATE TABLE IF NOT EXISTS visits (
            id INTEGER PRIMARY KEY,
            created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
            theme TEXT NOT NULL CHECK (theme in ('dark', 'light')),
            device_type TEXT NOT NULL CHECK (device_type in ('mobile', 'tablet', 'desktop')),
            country TEXT
        )
    `)

	console.info('Created visits table')
}
