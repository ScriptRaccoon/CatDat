import fs from 'node:fs'
import path from 'node:path'

/**
 * For the download feature, the local database file is copied
 * to the folder with static assets.
 */

const source = path.resolve('database', 'catdat.db')
const target = path.join(path.resolve('static', 'databases'), 'catdat-snapshot.db')

fs.copyFileSync(source, target)
