INSERT INTO category_property_assignments (
	category_id,
	property_id,
	is_satisfied,
	reason
)
VALUES
(
	'Sh(X)',
	'locally small',
	TRUE,
	'This is easy.'
),
(
	'Sh(X)',
	'Grothendieck topos',
	TRUE,
	'This holds by definition of a Grothendieck topos.'
),
(
	'Sh(X)',
	'skeletal',
	FALSE,
	'Consider constant sheaves for isomorphic but non-equal sets.'
),
(
	'Sh(X)',
	'trivial',
	FALSE,
	'This is because $X$ is assumed to be non-empty.'
);