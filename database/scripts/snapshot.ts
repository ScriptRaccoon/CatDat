import fs from 'node:fs'
import path from 'node:path'

const source = path.resolve('database', 'catdat.db')
const target = path.join(path.resolve('static', 'databases'), 'catdat-snapshot.db')

fs.copyFileSync(source, target)
