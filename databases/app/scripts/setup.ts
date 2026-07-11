import dotenv from 'dotenv'
import { createClient } from '@libsql/client'
import { devlog } from '$shared/utils'

dotenv.config({ quiet: true })

const APP_DB_URL = process.env.APP_DB_URL
const APP_DB_AUTH_TOKEN = process.env.APP_DB_AUTH_TOKEN

if (!APP_DB_URL) throw new Error('No APP_DB_URL found')

const db = createClient({
	url: APP_DB_URL,
	authToken: APP_DB_AUTH_TOKEN
})

setup()

/**
 * Creates the tables in the app database.
 */
async function setup() {
	console.info('\n--- Setup App database ---')
	await create_visits_table()
	await create_submissions_table()
	await create_actions_table()
}

/**
 * Creates the page visits table.
 */
async function create_visits_table() {
	await db.execute(`
        CREATE TABLE IF NOT EXISTS visits (
            id INTEGER PRIMARY KEY,
            created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
            theme TEXT NOT NULL CHECK (theme in ('dark', 'light')),
            device_type TEXT NOT NULL CHECK (device_type in ('mobile', 'tablet', 'desktop')),
            country TEXT
        )
    `)

	devlog('Visits table ready')
}

/**
 * Creates the table of submissions.
 */
async function create_submissions_table() {
	await db.execute(`
        CREATE TABLE IF NOT EXISTS submissions (
            id INTEGER PRIMARY KEY,
            created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
            title TEXT NOT NULL,
            body TEXT NOT NULL,
            name TEXT,
            url TEXT NOT NULL,
            approved_at TEXT
        )
    `)

	devlog('Submissions table ready')
}

/**
 * Creates the user actions table, used to record anonymously various user actions.
 */
async function create_actions_table() {
	await db.execute(`
        CREATE TABLE IF NOT EXISTS user_actions (
            id INTEGER PRIMARY KEY,
            action TEXT NOT NULL,
            value TEXT,
            created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
        )
    `)

	devlog('User actions table ready')
}
