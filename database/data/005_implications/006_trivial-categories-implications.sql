INSERT INTO implication_input (
	id,
	assumptions,
	conclusions,
	reason,
	is_equivalence
)
VALUES
(
	'discrete_consequence',
	'["discrete"]',
	'["essentially discrete", "locally small", "skeletal"]',
	'This is trivial.',
	FALSE
),
(
	'essentially_discrete_characterization',
	'["essentially discrete"]',
	'["thin", "groupoid"]',
	'This is trivial.',
	TRUE
),
(
	'essentially_discrete_consequence',
	'["essentially discrete"]',
	'["locally essentially small", "connected limits"]',
	'This is trivial.',
	FALSE
),
(
	'essentially_discrete_trivial',
	'["essentially discrete", "connected"]',
	'["trivial"]',
	'This is trivial.',
	FALSE
),
(
	'trivial_consequence',
	'["trivial"]',
	'["finitary algebraic", "Grothendieck topos", "split abelian", "self-dual", "essentially discrete", "essentially finite"]',
	'This is trivial.',
	FALSE
),
(
	'thin_consequence',
	'["thin"]',
	'["equalizers", "left cancellative"]',
	'Any two parallel morphisms are equal, so their equalizer is the identity, and every morphism is a monomorphism as well.',
	FALSE
),
(
	'thin_inhabited_consequence',
	'["thin", "inhabited"]',
	'["generator"]',
	'Any object will be a generator for trivial reasons.',
	FALSE
),
(
	'freyd_small',
	'["essentially small", "products"]',
	'["thin"]',
	'See <a href="https://ncatlab.org/nlab/show/Categories+for+the+Working+Mathematician" target="_blank">Mac Lane</a>, V.2, Prop. 3. The proof works for any category with products.',
	FALSE
),
(
	'freyd_countable',
	'["essentially countable", "countable products"]',
	'["thin", "products"]',
	'To see that the category is thin, use <a href="https://ncatlab.org/nlab/show/Categories+for+the+Working+Mathematician" target="_blank">Mac Lane</a>, V.2, Prop. 3. The proof can easily be adapted to this case. So the category is equivalent to a countable preordered set. But then products are just infima, so that repetitions of objects do not matter, and every product can be reduced to a countable one.',
	FALSE
),
(
	'freyd_finite',
	'["essentially finite", "finite products"]',
	'["thin", "products"]',
	'To see that the category is thin, use <a href="https://ncatlab.org/nlab/show/Categories+for+the+Working+Mathematician" target="_blank">Mac Lane</a>, V.2, Prop. 3. The proof can easily be adapted to this case. So the category is equivalent to a finite preordered set. But then products are just infima, so that repetitions of objects do not matter, and every product can be reduced to a finite one.',
	FALSE
),
(
	'cocomplete_thin_criterion',
	'["essentially small", "thin", "complete"]',
	'["cocomplete"]',
	'The supremum of a subset in a (small) proset is the infimum of the set of upper bounds.',
	FALSE
),
(
	'cartesian_closed_thin_criterion',
	'["essentially small", "thin", "complete", "infinitary distributive"]',
	'["cartesian closed"]',
	'This is an application of the adjoint functor theorem. Specifically, if $P$ is a complete lattice in which $\sup_i \inf(t,x_i) = \inf(t, \sup_i y_i)$ always holds, then the functor $\inf(t,-)$ is a left adjoint because it preserves all suprema.',
	FALSE
),
(
	'sequential_implies_lcc',
	'["thin", "semi-strongly connected"]',
	'["locally cartesian closed"]',
	'Each slice is thin, semi-strongly connected, and has a terminal object. Thus, it corresponds to a linear order with a largest element $1$. Every such category is cartesian closed, where the exponential $a \Rightarrow b$ (Heyting implication) is $1$ when $a \leq b$ and otherwise $b$.',
	FALSE
),
(
	'thin_implies_regular',
	'["thin", "finitely complete"]',
	'["regular"]',
	'In a thin category, regular epimorphisms are isomorphisms, and the rest is clear as well.',
	FALSE
),
(
	'thin_zero_trivial',
	'["thin", "zero morphisms", "inhabited"]',
	'["trivial"]',
	'This is easy.',
	FALSE
),
(
	'thin_power',
	'["thin", "terminal object"]',
	'["powers"]',
	'This is because for non-empty set $I$ the power $X^I$ is just $X$.',
	FALSE
),
(
	'thin_binary_power',
	'["thin"]',
	'["binary powers"]',
	'This is because $X \times X = X$.',
	FALSE
),
(
	'thin_exact_filtered_colimits',
	'["thin", "cartesian filtered colimits"]',
	'["exact filtered colimits"]',
	'In a thin category, every (finite) limit can be reduced to a (finite) product.',
	FALSE
);