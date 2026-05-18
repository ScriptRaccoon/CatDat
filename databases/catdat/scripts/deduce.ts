import { deduce_category_implications } from './deduce-category-implications'
import { deduce_functor_implications } from './deduce-functor-implications'
import { deduce_special_objects } from './deduce-special-objects'
import { deduce_special_morphisms } from './deduce-special-morphisms'
import { deduce_properties_for_entities } from './deduce-entity-properties'

deduce()

/**
 * Makes deductions for categories and functors.
 */
function deduce() {
	deduce_category_implications()
	deduce_properties_for_entities('category')

	deduce_special_objects()
	deduce_special_morphisms()

	deduce_functor_implications()
	deduce_properties_for_entities('functor')
}
