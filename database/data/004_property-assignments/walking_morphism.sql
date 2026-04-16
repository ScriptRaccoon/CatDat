INSERT INTO category_property_assignments (
	category_id,
	property_id,
	is_satisfied,
	reason
)
VALUES
(
	'walking_morphism',
	'finitary algebraic',
	TRUE,
	'Take the algebraic theory with no operations but with the equation $x=y$ that is supposed to hold for all elements $x,y$. The algebras for this theory are the empty set and the singleton set, hence we get the equivalence to $\{0 \to 1\}$.'
),
(
	'walking_morphism',
	'self-dual',
	TRUE,
	'This is trivial.'
),
(
	'walking_morphism',
	'finite',
	TRUE,
	'This is trivial.'
),
(
	'walking_morphism',
	'small',
	TRUE,
	'This is trivial.'
),
(
	'walking_morphism',
	'infinitary distributive',
	TRUE,
	'Clearly, this category is (co)complete. Also, the functors $X \mapsto X \times 1 = X$ and $X \mapsto X \times 0 = 0$ are clearly cocontinuous.'
),
(
	'walking_morphism',
	'skeletal',
	TRUE,
	'The two objects are not isomorphic.'
),
(
	'walking_morphism',
	'semi-strongly connected',
	TRUE,
	'This is trivial.'
),
(
	'walking_morphism',
	'trivial',
	FALSE,
	'This is trivial.'
);
