INSERT INTO category_property_assignments (
	category_id,
	property_id,
	is_satisfied,
	reason
)
VALUES
-- TODO: add properties here
(
	'C*Alg_u',
	'inhabited',
	TRUE,
	'This is clear.'
),
(
	'C*Alg_u',
	'skeletal',
	FALSE,
	'This is trivial.'
);