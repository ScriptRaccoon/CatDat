INSERT INTO category_property_assignments (
	category_id,
	property_id,
	is_satisfied,
	reason
)
VALUES
(
	'BG_f',
	'finite',
	TRUE,
	'This is trivial.'
),
(
	'BG_f',
	'groupoid',
	TRUE,
	'This is trivial.'
),
(
	'BG_f',
	'semi-strongly connected',
	TRUE,
	'This is trivial.'
),
(
	'BG_f',
	'generator',
	TRUE,
	'The unique object is a generator for trivial reasons.'
),
(
	'BG_f',
	'skeletal',
	TRUE,
	'There is just one object.'
),
(
	'BG_f',
	'trivial',
	FALSE,
	'This is trivial.'
);
