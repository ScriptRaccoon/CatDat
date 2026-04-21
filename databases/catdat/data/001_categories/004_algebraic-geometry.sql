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
	'Sh(X)',
	'category of sheaves',
	'$\mathrm{Sh}(X)$',
	'sheaves of sets on a topological space $X$',
	'morphisms of sheaves',
	'Here, we assume that the topological space $X$ is neither discrete nor indiscrete, since otherwise this category is just a product of copies of $\mathbf{Set}$. Another valid notation is $\mathrm{Sh}(X,\mathbf{Set})$.',
	'https://ncatlab.org/nlab/show/category+of+sheaves',
	NULL
),
(
	'Sh(X,Ab)',
	'category of abelian sheaves',
	'$\mathrm{Sh}(X,\mathbf{Ab})$',
	'sheaves of abelian groups on a topological space $X$',
	'morphisms of sheaves',
	'Here, we assume that the topological space $X$ is neither discrete nor indiscrete, since otherwise this category is just a product of copies of $\mathbf{Ab}$.',
	'https://ncatlab.org/nlab/show/sheaf+of+abelian+groups',
	NULL
),
(
	'LRS',
	'category of locally ringed spaces',
	'$\mathbf{LRS}$',
	'locally ringed spaces',
	'morphisms of locally ringed spaces, thus consisting of a continuous map and a homomorphism of sheaves that induces local ring homomorphisms in the stalks',
	NULL,
	'https://ncatlab.org/nlab/show/locally+ringed+topological+space',
	NULL
),
(
	'Sch',
	'category of schemes',
	'$\mathbf{Sch}$',
	'schemes',
	'morphisms of locally ringed spaces',
	NULL,
	'https://ncatlab.org/nlab/show/scheme',
	NULL
),
(
	'Z',
	'category of Z-functors',
	'$[\mathbf{CRing}, \mathbf{Set}]$',
	'Z-functors, i.e. functors from commutative rings to sets',
	'natural transformations',
	'This category is used in functorial algebraic geometry. It also provides a typical example of a functor category that is not locally small, but nevertheless relevant. Most of its properties are directly derived from the category of sets, so other functor categories $[\mathbf{C}, \mathbf{Set}]$ for large categories $\mathbf{C}$ will be similar.',
	NULL,
	NULL
);