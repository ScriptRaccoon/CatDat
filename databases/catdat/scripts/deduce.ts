import { deduce_special_objects } from './deduce-special-objects'
import { deduce_special_morphisms } from './deduce-special-morphisms'
import { deduce_properties_for_structures } from './deduce-structure-properties'
import { restrict_functor_properties } from './restrict-functor-properties'
import { deduce_implications } from './deduce-implications'

deduce()

/**
 * Makes deductions for categories and functors.
 */
function deduce() {
	deduce_implications()

	// deduce_properties_for_structures('category')

	deduce_special_objects()
	deduce_special_morphisms()

	restrict_functor_properties()
	// deduce_properties_for_structures('functor')
}
