INSERT INTO category_property_assignments (
	category_id,
	property_id,
	is_satisfied,
	reason
)
VALUES
(
	'On',
	'thin',
	TRUE,
	'This is trivial.'
),
(
	'On',
	'locally small',
	TRUE,
	'This is trivial.'
),
(
	'On',
	'cocomplete',
	TRUE,
	'Every set of ordinal numbers has a supremum.'
),
(
	'On',
	'binary products',
	TRUE,
	'For ordinal numbers $\alpha,\beta$ their minimum exists, it is $\alpha$ when $\alpha \leq \beta$ and $\beta$ otherwise.'
),
(
	'On',
	'connected limits',
	TRUE,
	'Every non-empty set of ordinal numbers has a minimum.'
),
(
	'On',
	'well-powered',
	TRUE,
	'This is because for every ordinal $\alpha$ the collection of ordinals $\leq \alpha$ is a set (namely, $\alpha + 1$).'
),
(
	'On',
	'skeletal',
	TRUE,
	'The relation $\leq$ is antisymmetric.'
),
(
	'On',
	'strongly connected',
	TRUE,
	'It is well-known that for ordinals $\alpha,\beta$ we have $\alpha \leq \beta$ or $\beta \leq \alpha$.'
),
(
	'On',
	'direct',
	TRUE,
	'This is because the ordinal numbers with respect to $<$ are well-founded (by definition).'
),
(
	'On',
	'terminal object',
	FALSE,
	'There is no largest ordinal $\alpha$ since $\alpha + 1$ will always be larger.'
),
(
	'On',
	'well-copowered',
	FALSE,
	'The "quotients" of $0$ are all ordinals.'
),
(
	'On',
	'inverse',
	FALSE,
	'Consider the strictly increasing sequence $0 < 1 < 2 < \cdots$.'
);