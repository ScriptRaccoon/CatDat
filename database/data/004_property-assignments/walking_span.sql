INSERT INTO category_property_assignments (
	category_id,
	property_id,
	is_satisfied,
	reason
)
VALUES
(
	'walking_span',
	'finite',
	TRUE,
	'This is trivial.'
),
(
	'walking_span',
	'skeletal',
	TRUE,
	'The three objects are not isomorphic.'
),
(
	'walking_span',
	'initial object',
	TRUE,
	'$0$ is an initial object.'
),
(
	'walking_span',
	'thin',
	TRUE,
	'This is trivial.'
),
(
	'walking_span',
	'binary products',
	TRUE,
	'We have $0 \times x = 0$ for all $x$, $x \times x = x$, and $1 \times 2 = 0$.'
),
(
	'walking_span',
	'locally cartesian closed',
	TRUE,
	'The slice category over $0$ is the <a href="/category/1">trivial category</a>, and the slice category over $1$ is the <a href="/category/walking_morphism">interval category</a>, which is cartesian closed (see there). The same holds for $2$ by symmetry.'
),
(
	'walking_span',
	'filtered',
	FALSE,
	'There is no cospan $1 \rightarrow x \leftarrow 2$.'
),
(
	'walking_span',
	'strongly connected',
	FALSE,
	'There is no morphism between $1$ and $2$.'
);
