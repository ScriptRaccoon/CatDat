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
);
