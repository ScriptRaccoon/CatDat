INSERT INTO categories (
	id,
	name,
	notation,
	objects,
	morphisms,
	description,
	nlab_link,
	dual_category_id
)
VALUES
(
	'BG_c',
	'delooping of an infinite countable group',
	'$BG$',
	'a single object',
	'the elements of an infinite countable group $G$',
	'Every group $G$ yields a groupoid $BG$ with a single object $*$, morphisms given by the elements of $G$, and composition given by the group operation. In this example, we consider the case of an infinite countable group $G$ (such as $G = \mathbb{Z}$).',
	'https://ncatlab.org/nlab/show/delooping',
	NULL
),
(
	'BG_f',
	'delooping of a non-trivial finite group',
	'$BG$',
	'a single object',
	'the elements of a non-trivial finite group $G$',
	'Every group $G$ yields a groupoid $BG$ with a single object $*$, morphisms given by the elements of $G$, and composition given by the group operation. In this example, we consider the case of a non-trivial finite group $G$ (such as $G = C_2$).',
	'https://ncatlab.org/nlab/show/delooping',
	NULL
),
(
	'BN',
	'delooping of the additive monoid of natural numbers',
	'$B\mathbb{N}$',
	'a single object',
	'the natural numbers, with addition serving as composition',
	'Every monoid $M$ induces a category $BM$ with a single object $*$, morphisms given by the elements of $M$, and composition given by the monoid operation. Some of the properties of this category depend on the specific monoid. In this example, we take the commutative monoid $M = (\mathbb{N},+,0)$, so composition is $n \circ m = n + m$.',
	NULL,
	NULL
),
(
	'BOn',
	'delooping of the additive monoid of ordinal numbers',
	'$B\mathbf{On}$',
	'a single object',
	'ordinal numbers, with addition as composition',
	'Every monoid $M$ induces a category $BM$ with a single object $*$. This also works when $M$ is large, in which case $BM$ is not locally small. In this example, we apply this construction to the large monoid of ordinal numbers with respect to addition, so composition is $\alpha \circ \beta = \alpha + \beta$.',
	NULL,
	NULL
);