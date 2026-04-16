INSERT INTO category_property_assignments (
	category_id,
	property_id,
	is_satisfied,
	reason
)
VALUES
(
	'BG_c',
	'countable',
	TRUE,
	'This is because $G$ is countable.'
),
(
	'BG_c',
	'small',
	TRUE,
	'This is trivial.'
),
(
	'BG_c',
	'groupoid',
	TRUE,
	'This is trivial.'
),
(
	'BG_c',
	'connected',
	TRUE,
	'This is trivial.'
),
(
	'BG_c',
	'generator',
	TRUE,
	'The unique object is a generator for trivial reasons.'
),
(
	'BG_c',
	'skeletal',
	TRUE,
	'There is just one object.'
),
(
	'BG_c',
	'essentially finite',
	FALSE,
	'This is because we choose $G$ to be infinite.'
);
