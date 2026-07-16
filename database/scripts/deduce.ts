import { deduce_special_objects } from './deduce-special-objects'
import { deduce_special_morphisms } from './deduce-special-morphisms'
import { deduce_properties_for_structures } from './deduce-structure-properties'
import { restrict_functor_properties } from './restrict-functor-properties'
import {
	clear_deduced_implications,
	create_dualized_implications,
	create_self_dual_implications
} from './deduce-implications'
import { restrict_morphism_properties } from './restrict-morphism-properties'

deduce()

/**
 * Makes deductions for categories, functors, and other categorical structures.
 */
function deduce() {
	// --- categories ---
	clear_deduced_implications('category')
	create_dualized_implications('category')
	create_self_dual_implications('category')
	deduce_properties_for_structures('category')
	deduce_special_objects()
	deduce_special_morphisms()

	// --- functors ---
	clear_deduced_implications('functor')
	create_dualized_implications('functor')
	deduce_properties_for_structures('functor')
	restrict_functor_properties()

	// --- morphisms ---
	clear_deduced_implications('morphism')
	create_dualized_implications('morphism')
	deduce_properties_for_structures('morphism')
	restrict_morphism_properties()
}
