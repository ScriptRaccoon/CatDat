INSERT INTO category_property_assignments (
	category_id,
	property_id,
	is_satisfied,
	reason
)
VALUES
(
	'N_oo',
	'small',
	TRUE,
	'This is trivial.'
),
(
	'N_oo',
	'coproducts',
	TRUE,
	'Take the supremum.'
),
(
	'N_oo',
	'skeletal',
	TRUE,
	'The relation $\leq$ is antisymmetric.'
),
(
	'N_oo',
	'direct',
	TRUE,
	'This is because the natural numbers with $\infty$ with respect to $<$ are well-founded.'
),
(
	'N_oo',
	'finitary algebraic',
	FALSE,
	'This follows from <a href="/lemma/thin_algebraic_categories">this lemma</a>.'
),
(
	'N_oo',
	'locally strongly finitely presentable',
	TRUE,
	'Every natural number is strongly finitely presentable, and $\infty$ is the colimit of all $n < \infty$.'
),
(
	'N_oo',
	'semi-strongly connected',
	TRUE,
	'This is trivial.'
),
(
	'N_oo',
	'essentially finite',
	FALSE,
	'This is trivial.'
),
(
	'N_oo',
	'self-dual',
	FALSE,
	'This is because every upper set is infinite, but every lower set is finite.'
),
(
	'N_oo',
	'inverse',
	FALSE,
	'Consider the strictly increasing sequence $0 < 1 < 2 < \cdots$.'
);
