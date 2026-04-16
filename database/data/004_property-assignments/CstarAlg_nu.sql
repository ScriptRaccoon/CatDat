INSERT INTO category_property_assignments (
	category_id,
	property_id,
	is_satisfied,
	reason
)
VALUES
-- TODO: add properties here
(
	'C*Alg_nu',
	'inhabited',
	TRUE,
	'This is clear.'
),
(
	'C*Alg_nu',
	'skeletal',
	FALSE,
	'This is trivial.'
);