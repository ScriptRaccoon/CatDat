INSERT INTO category_property_assignments (
	category_id,
	property_id,
	is_satisfied,
	reason
)
VALUES
(
	'Sh(X)',
	'locally small',
	TRUE,
	'This is easy.'
),
(
	'Sh(X)',
	'Grothendieck topos',
	TRUE,
	'This holds by definition of a Grothendieck topos.'
),
(
	'Sh(X)',
	'Malcev',
	FALSE,
	'Consider the subsheaf of $\underline{\mathbb{N}} \times \underline{\mathbb{N}}$ consisting of locally constant functions $(f,g) : X \to \mathbb{N} \times \mathbb{N}$ with $f \leq g$ pointwise. This is reflexive, but not symmetric.'
),
(
	'Sh(X)',
	'skeletal',
	FALSE,
	'Consider constant sheaves for isomorphic but non-equal sets.'
),
(
	'Sh(X)',
	'cofiltered-limit-stable epimorphisms',
	FALSE,
	'Our <a href="/category/Set">counterexample for $\mathbf{Set}$</a> (using infinite intersections) also works in $\mathbf{Sh}(X)$ by using constant sheaves. We could also apply a variant of (the dual of) <a href="/lemma/filtered-monos">this lemma</a> to the constant sheaf functor $\mathbf{Set} \to \mathbf{Sh}(X)$, which does not preserve all cofiltered limits, but does preserve intersections.'
);