import { createClient } from '@libsql/client'
import dotenv from 'dotenv'
import { deduce_category_implications } from './deduce-category-implications'
import { deduce_category_properties } from './deduce-category-properties'
import { deduce_functor_implications } from './deduce-functor-implications'
import { deduce_functor_properties } from './deduce-functor-properties'

dotenv.config({ quiet: true })

const DB_URL = process.env.DB_URL
const DB_AUTH_TOKEN = process.env.DB_AUTH_TOKEN

if (!DB_URL) throw new Error('No DB_URL found')

const db = createClient({
	url: DB_URL,
	authToken: DB_AUTH_TOKEN,
})

await db.execute('PRAGMA foreign_keys = ON')

await deduce_category_implications(db)
await deduce_category_properties(db)

await deduce_functor_implications(db)
await deduce_functor_properties(db)
