import { deduce_category_implications } from './deduce-category-implications'
import { deduce_category_properties } from './deduce-category-properties'
import { deduce_functor_implications } from './deduce-functor-implications'
import { deduce_functor_properties } from './deduce-functor-properties'
import { deduce_special_objects } from './deduce-special-objects'
import { deduce_special_morphisms } from './deduce-special-morphisms'

deduce()

/**
 * Makes deductions for categories and functors.
 */
function deduce() {
	deduce_category_implications()
	deduce_category_properties()

	deduce_special_objects()
	deduce_special_morphisms()

	deduce_functor_implications()
	deduce_functor_properties()
}
