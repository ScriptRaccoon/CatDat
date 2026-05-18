import { redirect } from '@sveltejs/kit'

export const load = () => redirect(301, '/content/contribute')
