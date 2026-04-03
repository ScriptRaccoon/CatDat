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
	'FinSet',
	'category of finite sets',
	'$\mathbf{FinSet}$',
	'finite sets',
	'maps',
	NULL,
	'https://ncatlab.org/nlab/show/FinSet',
	NULL
),
(
	'B',
	'category of finite sets and bijections',
	'$\mathbb{B}$',
	'finite sets',
	'bijective maps',
	'This category is also known as the permutation groupoid. It appears in the definition of a combinatorial species.',
	'https://ncatlab.org/nlab/show/permutation+groupoid',
	NULL
),
(
	'FI',
	'category of finite sets and injections',
	'$\mathbf{FI}$',
	'finite sets',
	'injective maps',
	'This category is badly-behaved in itself, but plays an important role in representation theory.',
	NULL,
	NULL
),
(
	'FS',
	'category of finite sets and surjections',
	'$\mathbf{FS}$',
	'finite sets',
	'surjective maps',
	'This category is badly-behaved in itself, but it appears in representation theory. It has two connected components, consisting of the empty set and the non-empty finite sets.',
	NULL,
	NULL
),
(
	'Sp',
	'category of combinatorial species',
	'$\mathbf{Sp}$',
	'combinatorial species, defined as functors $\mathbb{B} \to \mathbf{FinSet}$, where $\mathbb{B}$ is the category of finite sets and bijections',
	'natural transformations',
	'Most categorical properties are immediately inferred from $\mathbf{FinSet}$. Notice that this category is not locally small; it is just equivalent to a locally small category.',
	'https://ncatlab.org/nlab/show/species',
	NULL
);