INSERT INTO implication_input (
	id,
	assumptions,
	conclusions,
	reason,
	is_equivalence
)
VALUES
(
	'biproducts_definition_consequences',
	'["biproducts"]',
	'["zero morphisms", "finite products", "finite coproducts"]',
	'This holds by definition of biproducts.',
	FALSE
),
(
	'biproducts_unital',
	'["biproducts", "finitely complete"]',
	'["unital"]',
	'For all objects $X,Y$ the morphism $X \sqcup Y \to X \times Y$ is an isomorphism, hence a strong epimorphism.',
	FALSE
),
(
	'pointed_characterization',
	'["pointed"]',
	'["zero morphisms", "initial object"]',
	'This is easy.',
	TRUE
),
(
	'disjoint_coproducts_equivalence',
	'["disjoint coproducts"]',
	'["coproducts", "disjoint finite coproducts"]',
	'This is easy.',
	TRUE
),
(
	'disjoint_coproducts_consequence',
	'["disjoint finite coproducts"]',
	'["finite coproducts"]',
	'This holds by definition.',
	FALSE
),
(
	'disjoint_coproducts_thin_trivial',
	'["disjoint finite coproducts", "thin"]',
	'["trivial"]',
	'For every object $A$ the two inclusions $A \rightrightarrows A + A$ must be equal, so their equalizer is $A$, but also $0$ since the coproduct is disjoint. Hence $A = 0$.',
	FALSE
),
(
	'disjoint_coproducts_strict',
	'["disjoint finite coproducts", "strict terminal object"]',
	'["thin"]',
	'Let $1$ be the strict terminal object, and let $A$ be any object. Then $1 \to A + 1$ is an isomorphism, since $1$ is strict. Also, $A \to A + 1$ is a monomorphism by assumption. It follows that the unique morphism $u : A \to 1$ is a monomorphism. For all $f,g : B \to A$ we have $uf = ug$ (since $1$ is terminal), hence $f = g$.',
	FALSE
),
(
	'exact_filtered_colimits_condition',
	'["exact filtered colimits"]',
	'["filtered colimits", "finitely complete"]',
	'This holds by definition.',
	FALSE
),
(
	'cartesian_filtered_colimits_condition',
	'["cartesian filtered colimits"]',
	'["filtered colimits", "finite products"]',
	'This holds by definition.',
	FALSE
),
(
	'exact_includes_cartesian_filtered_colimits',
	'["exact filtered colimits"]',
	'["cartesian filtered colimits"]',
	'If filtered colimits commute with finite limits, they commute with finite products in particular.',
	FALSE
),
(
	'infinitary_distributive_consequence',
	'["infinitary distributive"]',
	'["finite products", "coproducts"]',
	'This holds by definition.',
	FALSE
),
(
	'infinitary_distributive_condition',
	'["infinitary distributive"]',
	'["distributive"]',
	'This is trivial.',
	FALSE
),
(
	'distributive_condition',
	'["distributive"]',
	'["finite products", "finite coproducts"]',
	'This holds by definition.',
	FALSE
),
(
	'distributive_duality',
	'["thin", "distributive"]',
	'["codistributive"]',
	'This is equivalent to the classical result that the <a href="https://en.wikipedia.org/wiki/Distributive_lattice" target="_blank">distributivity law in a lattice</a> can be defined in two ways, see e.g. Birkhoff, <i>Lattice Theory</i>, Ch. IX, Thm. 1.',
	FALSE
),
(
	'strict_initial_consequence',
	'["strict initial object"]',
	'["initial object"]',
	'This holds by definition.',
	FALSE
),
(
	'strict_initial_trivial',
	'["strict initial object", "pointed"]',
	'["trivial"]',
	'If $0$ is the zero object, then for every object $A$ the unique morphism $A \to 0$ is an isomorphism by assumption.',
	FALSE
),
(
	'strict_initial_left_criterion',
	'["left cancellative", "initial object"]',
	'["strict initial object"]',
	'It suffices to prove that in general any monomorphism $f : A \to 0$ into an initial object is an isomorphism. If $g : 0 \to A$ is the unique morphism, then $f \circ g = \mathrm{id}_0$ since $0$ is initial. But then $f$ is a split epimorphism and a monomorphism, hence an isomorphism.',
	FALSE
),
(
	'strict_initial_right_criterion',
	'["right cancellative", "initial object"]',
	'["strict initial object"]',
	'Let $f : A \to 0$ be a morphism. Let $g : 0 \to A$ be the unique morphism. It is an epimorphism by assumption. Also, $f \circ g = \mathrm{id}_0$ since $0$ is initial. But then $g$ is a split monomorphism and an epimorphism, hence an isomorphism.',
	FALSE
),
(
	'extensive_assumption',
	'["extensive"]',
	'["finite coproducts"]',
	'This holds by definition.',
	FALSE
),
(
	'infinitary_extensive_assumption',
	'["infinitary extensive"]',
	'["coproducts"]',
	'This holds by definition.',
	FALSE
),
(
	'infinitary_extensive_finitary',
	'["infinitary extensive"]',
	'["extensive"]',
	'This is obvious.',
	FALSE
),
(
	'distributive_consequence',
	'["distributive"]',
	'["strict initial object"]',
	'See the <a href="https://ncatlab.org/nlab/show/distributive+category" target="_blank">nLab</a> or Prop. 3.4 in <a href="https://doi.org/10.1016/0022-4049(93)90035-R" target="_blank">Introduction to extensive and distributive categories</a>.',
	FALSE
),
(
	'distributive_criterion',
	'["cartesian closed", "finite coproducts"]',
	'["distributive"]',
	'Each functor $A \times -$ is left adjoint and hence preserves finite coproducts (in fact, all colimits).',
	FALSE
),
(
	'infinitary_distributive_criterion',
	'["cartesian closed", "coproducts"]',
	'["infinitary distributive"]',
	'Each functor $A \times -$ is left adjoint and hence preserves coproducts (in fact, all colimits).',
	FALSE
),
(
	'infinite_distributive_filtered_criterion',
	'["distributive", "cartesian filtered colimits", "coproducts"]',
	'["infinitary distributive"]',
	'Each functor $A \times -$ preserves finite coproducts and filtered colimits, hence all coproducts.',
	FALSE
),
(
	'extensive_strict',
	'["extensive"]',
	'["strict initial object"]',
	'This is Prop. 2.8 in <a href="https://doi.org/10.1016/0022-4049(93)90035-R" target="_blank">Introduction to extensive and distributive categories</a>.',
	FALSE
),
(
	'extensive_consequence',
	'["extensive"]',
	'["disjoint finite coproducts"]',
	'This is Prop. 2.6 in <a href="https://doi.org/10.1016/0022-4049(93)90035-R" target="_blank">Introduction to extensive and distributive categories</a>.',
	FALSE
),
(
	'extensive_distributivity',
	'["extensive", "finite products"]',
	'["distributive"]',
	'This is Prop. 4.5 in <a href="https://doi.org/10.1016/0022-4049(93)90035-R" target="_blank">Introduction to extensive and distributive categories</a>.',
	FALSE
),
(
	'infinitary_extensive_distributivity',
	'["infinitary extensive", "finite products"]',
	'["infinitary distributive"]',
	'One can adjust the proof of Prop. 4.5 in <a href="https://doi.org/10.1016/0022-4049(93)90035-R" target="_blank">Introduction to extensive and distributive categories</a> (which deals with the finite case).',
	FALSE
),
(
	'regular_def',
	'["regular"]',
	'["finitely complete"]',
	'This holds by definition of a regular category.',
	FALSE
),
(
	'lextensive_def',
	'["lextensive"]',
	'["extensive", "finitely complete"]',
	'This holds by definition.',
	TRUE
),
(
	'power_construction',
	'["copowers", "cartesian closed"]',
	'["powers"]',
	'The power $X^I$ can be constructed as $[I \otimes 1, X]$ because
	<p>$\mathrm{Hom}(T,[I \otimes 1, X]) \cong \mathrm{Hom}(T \times (I \otimes 1),X)$</p>
	<p>$\cong \mathrm{Hom}(I \otimes (T \times 1),X) \cong \mathrm{Hom}(I \otimes T,X)$</p>
	<p>$ \cong \mathrm{Hom}(T,X)^I.$</p>
	<p>In the second isomorphism we have used that $T \times -$ preserves copowers, which is true because it is a left adjoint.',
	FALSE
),
(
	'countable_power_construction',
	'["countable copowers", "cartesian closed"]',
	'["countable powers"]',
	'We can recycle <a href="/category-implication/power_construction">this proof</a>.',
	FALSE
);