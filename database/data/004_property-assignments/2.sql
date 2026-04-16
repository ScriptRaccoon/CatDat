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
	'connected',
	FALSE,
	'The objects $0$, $1$ have no zig-zag path between them.'
);
