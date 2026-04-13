INSERT INTO category_property_assignments (
	category_id,
	property_id,
	is_satisfied,
	reason
)
VALUES
(
	'Set',
	'locally small',
	TRUE,
	'The collection of maps between two sets $X,Y$ is a subset of $X \times Y$ and therefore a set.'
),
(
	'Set',
	'Grothendieck topos',
	TRUE,
	'It is equivalent to the category of sheaves on a one-point space.'
),
(
	'Set',
	'semi-strongly connected',
	TRUE,
	'Every non-empty set is weakly terminal (by using constant maps).'
),
(
	'Set',
	'finitary algebraic',
	TRUE,
	'Use the empty algebraic theory.'
),
(
	'Set',
	'skeletal',
	FALSE,
	'This is trivial.'
),
(
	'Set',
	'Malcev',
	FALSE,
	'There are lots of non-symmetric reflexive relations, for example $\leq$ on $\mathbb{N}$.'
);
