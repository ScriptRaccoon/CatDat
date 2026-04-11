INSERT INTO category_property_assignments (
	category_id,
	property_id,
	is_satisfied,
	reason
)
VALUES
(
	'BG',
	'small',
	TRUE,
	'This is trivial.'
),
(
	'BG',
	'groupoid',
	TRUE,
	'This is trivial.'
),
(
	'BG',
	'connected',
	TRUE,
	'This is trivial.'
),
(
	'BG',
	'generator',
	TRUE,
	'The unique object is a generator for trivial reasons.'
),
(
	'BG',
	'skeletal',
	TRUE,
	'There is just one object.'
),
(
	'BG',
	'trivial',
	FALSE,
	'This is trivial.'
),
(
	'BG',
	'essentially finite',
	FALSE,
	'This is because we choose $G$ to be infinite.'
),
(
	'BG',
	'sifted',
	FALSE,
	'The category of cospans from $*$ to $*$ in the delooping $BG$ of any group $G$ is equivalent to a discrete category with $|G|$ objects.'
);
