INSERT INTO category_property_assignments (
	category_id,
	property_id,
	is_satisfied,
	reason
)
VALUES
(
	'walking_composable_pair',
	'finite',
	TRUE,
	'This is trivial.'
),
(
	'walking_composable_pair',
	'semi-strongly connected',
	TRUE,
	'This is trivial.'
),
(
	'walking_composable_pair',
	'skeletal',
	TRUE,
	'This is trivial.'
),
(
	'walking_composable_pair',
	'self-dual',
	TRUE,
	'This is trivial.'
),
(
	'walking_composable_pair',
	'finitary algebraic',
	FALSE,
	'This follows from <a href="/lemma/thin_algebraic_categories">this lemma</a>.'
),
(
	'walking_composable_pair',
	'locally strongly finitely presentable',
	TRUE,
	'Take the two-sorted (finitary) algebraic theory with exactly one unary operation between them and the equation $x=y$ for each sort. There are exactly three algebras for this theory up to isomorphism: the identities on the empty set and the singleton, the morphism from the empty set to the singleton.
	Hence we get the equivalence to $\{0 \to  1 \to 2\}$.'
)
;
