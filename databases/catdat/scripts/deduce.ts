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
function deduce() {
	const db = get_client()

	db.exec('PRAGMA foreign_keys = ON')

	deduce_category_implications(db)
	deduce_category_properties(db)

	deduce_special_objects(db)
	deduce_special_morphisms(db)

	deduce_functor_implications(db)
	deduce_functor_properties(db)
}

deduce()
