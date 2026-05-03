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
	'$\Pos$',
	'partially ordered sets (aka posets), i.e. sets equipped with a reflexive, transitive, antisymmetric relation',
	'order-preserving functions',
	'Even though there are many similarities with $\Prost$, the main difference is that the forgetful functor $\Pos \to \Set$ has no right adjoint.',
	'https://ncatlab.org/nlab/show/Pos',
	NULL
),
(
	'Prost',
	'category of prosets',
	'$\Prost$',
	'preordered sets (aka prosets), i.e. sets equipped with a reflexive, transitive relation',
	'order-preserving functions',
	'Even though there are many similarities with $\Pos$, the main difference is that the forgetful functor $\Prost \to \Set$ has a right adjoint, mapping $X$ to $(X , X \times X)$ (chaotic preorder).',
	'https://ncatlab.org/nlab/show/Prost',
	NULL
),
(
	'FinOrd',
	'category of finite ordered sets',
	'$\FinOrd$',
	'finite (totally) ordered sets',
	'order-preserving maps',
	'The finite ordered sets of the form $\{1 < \dotsc < n\}$ for $n \in \IN$ provide a skeleton (including the empty set for $n = 0$), the augmented simplex category.',
	'https://ncatlab.org/nlab/show/total+order',
	NULL
);