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
	'Pos',
	'category of posets',
	'$\mathbf{Pos}$',
	'partially ordered sets (aka posets), i.e. sets equipped with a reflexive, transitive, antisymmetric relation',
	'order-preserving functions',
	'Even though there are many similarities with $\mathbf{Prost}$, the main difference is that the forgetful functor $\mathbf{Pos} \to \mathbf{Set}$ has no right adjoint.',
	'https://ncatlab.org/nlab/show/Pos',
	NULL
),
(
	'Prost',
	'category of prosets',
	'$\mathbf{Prost}$',
	'preordered sets (aka prosets), i.e. sets equipped with a reflexive, transitive relation',
	'order-preserving functions',
	'Even though there are many similarities with $\mathbf{Pos}$, the main difference is that the forgetful functor $\mathbf{Prost} \to \mathbf{Set}$ has a right adjoint, mapping $X$ to $(X , X \times X)$ (chaotic preorder).',
	'https://ncatlab.org/nlab/show/Prost',
	NULL
),
(
	'FinOrd',
	'category of finite ordered sets',
	'$\mathbf{FinOrd}$',
	'finite (totally) ordered sets',
	'order-preserving maps',
	'This is also known as the augmented simplex category. The finite ordered sets of the form $\{1 < \dotsc < n\}$ for $n \in \mathbb{N}$ provide a skeleton (for $n = 0$ this includes the empty set).',
	'https://ncatlab.org/nlab/show/augmented+simplex+category',
	NULL
);