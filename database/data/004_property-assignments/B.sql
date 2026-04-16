INSERT INTO category_property_assignments (
	category_id,
	property_id,
	is_satisfied,
	reason
)
VALUES
(
	'B',
	'locally small',
	TRUE,
	'There is a forgetful functor $\mathbb{B} \to \mathbf{Set}$ and $\mathbf{Set}$ is locally small.'
),
(
	'B',
	'essentially small',
	TRUE,
	'Every finite set is isomorphic to some $\{1,\dotsc,n\}$ for some $n \in \mathbb{N}$.'
),
(
	'B',
	'groupoid',
	TRUE,
	'This is trivial.'
),
(
	'B',
	'inhabited',
	TRUE,
	'This is trivial.'
),
(
	'B',
	'small',
	FALSE,
	'Even the collection of singletons is not small.'
),
(
	'B',
	'connected',
	FALSE,
	'For every $n \geq 0$ there is a connected component of sets of size $n$.'
),
(
	'B',
	'generator',
	FALSE,
	'This is trivial.'
),
(
	'B',
	'essentially finite',
	FALSE,
	'This is trivial.'
),
(
	'B',
	'skeletal',
	FALSE,
	'This is trivial.'
);
