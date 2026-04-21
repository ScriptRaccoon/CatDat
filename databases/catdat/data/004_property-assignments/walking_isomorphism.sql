INSERT INTO category_property_assignments (
	category_id,
	property_id,
	is_satisfied,
	reason
)
VALUES
(
	'walking_isomorphism',
	'trivial',
	TRUE,
	'The inclusion $\{0\} \hookrightarrow \{0 \to 1\}$ is clearly an equivalence.'
),
(
	'walking_isomorphism',
	'finite',
	TRUE,
	'This is trivial.'
),
(
	'walking_isomorphism',
	'small',
	TRUE,
	'This is trivial.'
),
(
	'walking_isomorphism',
	'skeletal',
	FALSE,
	'The two objects are isomorphic, but different.'
);
