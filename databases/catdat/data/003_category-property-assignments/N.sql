INSERT INTO category_property_assignments (
	category_id,
	property_id,
	is_satisfied,
	reason
)
VALUES
(
	'N',
	'small',
	TRUE,
	'This is trivial.'
),
(
	'N',
	'thin',
	TRUE,
	'This is trivial.'
),
(
	'N',
	'finitely cocomplete',
	TRUE,
	'Finitely many natural numbers have a supremum natural number.'
),
(
	'N',
	'binary products',
	TRUE,
	'Two natural numbers have a minimum.'
),
(
	'N',
	'connected limits',
	TRUE,
	'Every non-empty set of natural numbers has a minimum.'
),
(
	'N',
	'semi-strongly connected',
	TRUE,
	'This is trivial.'
),
(
	'N',
	'direct',
	TRUE,
	'This is because the natural numbers with respect to $<$ are well-founded.'
),
(
	'N',
	'countable',
	TRUE,
	'This is trivial.'
),
(
	'N',
	'countable coproducts',
	FALSE,
	'The numbers $0,1,2,\dotsc$ have no supremum, i.e. no coproduct.'
);

-- properties that should be ignored by the redundancy check script
UPDATE category_property_assignments
SET check_redundancy = FALSE
WHERE category_id = 'N'
AND property_id IN ('thin', 'finitely cocomplete');