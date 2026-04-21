import { deduce_category_implications } from './deduce-category-implications'
import { deduce_category_properties } from './deduce-category-properties'
import { deduce_functor_implications } from './deduce-functor-implications'
import { deduce_functor_properties } from './deduce-functor-properties'
import { deduce_special_objects } from './deduce-special-objects'
import { deduce_special_morphisms } from './deduce-special-morphisms'
import { get_client } from './shared'

/**
 * Makes deductions for categories and functors.
 */
async function deduce() {
	const db = get_client()

	await db.execute('PRAGMA foreign_keys = ON')

	await deduce_category_implications(db)
	await deduce_category_properties(db)

	await deduce_special_objects(db)
	await deduce_special_morphisms(db)

	await deduce_functor_implications(db)
	await deduce_functor_properties(db)
}

await deduce()
