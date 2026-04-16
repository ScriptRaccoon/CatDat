INSERT INTO category_property_assignments (
	category_id,
	property_id,
	is_satisfied,
	reason
)
VALUES
(
	'2',
	'discrete',
	TRUE,
	'This is trivial.'
),
(
	'2',
	'finite',
	TRUE,
	'This is trivial.'
),
(
	'2',
	'small',
	TRUE,
	'This is trivial.'
),
(
	'2',
	'inhabited',
	TRUE,
	'This is trivial.'
),
(
	'2',
	'multi-algebraic',
	TRUE,
	'There is an FPC-sketch whose $\mathbf{Set}$-model is precisely a pair $(X,Y)$ of sets such that the coproduct $X+Y$ is a singleton. Any $\mathbf{Set}$-model of such a sketch is isomorphic to either $(\varnothing, 1)$ or $(1, \varnothing)$, hence the category of models is equivalent to $\mathbf{2}$.'
),
(
	'2',
	'connected',
	FALSE,
	'The objects $0$, $1$ have no zig-zag path between them.'
);
