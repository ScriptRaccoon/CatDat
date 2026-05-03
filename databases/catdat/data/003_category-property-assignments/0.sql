INSERT INTO category_property_assignments (
	category_id,
	property_id,
	is_satisfied,
	reason
)
VALUES
(
	'0',
	'preadditive',
	TRUE,
	'This is vacuously true.'
),
(
	'0',
	'discrete',
	TRUE,
	'This is trivial.'
),
(
	'0',
	'binary products',
	TRUE,
	'This is vacuously true.'
),
(
	'0',
	'finite',
	TRUE,
	'This is trivial.'
),
(
	'0',
	'small',
	TRUE,
	'This is trivial.'
),
(
	'0',
	'multi-algebraic',
	TRUE,
	'The terminal category $\1$ becomes an FPC-sketch by selecting the unique empty cone and cocone. Then, a $\Set$-valued model of this sketch is a functor $\1 \to \Set$ sending the unique object to a terminal and initial object, which never exists. Hence, $\0$ is the category of models of this FPC-sketch.'
),
(
	'0',
	'inhabited',
	FALSE,
	'This is trivial.'
);
