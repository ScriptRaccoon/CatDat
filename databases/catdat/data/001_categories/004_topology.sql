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
	'Top',
	'category of topological spaces',
	'$\mathbf{Top}$',
	'topological spaces',
	'continuous functions',
	'This is the most basic category of geometric objects.',
	'https://ncatlab.org/nlab/show/Top',
	NULL
),
(
	'Top*',
	'category of pointed topological spaces',
	'$\mathbf{Top}_*$',
	'pointed topological spaces',
	'pointed continuous functions',
	'This category plays an important role in algebraic topology and homotopy theory. Although it may appear similar to $\mathbf{Top}$, adding a base point drastically changes its categorical properties. In particular, it introduces a zero object.',
	'https://ncatlab.org/nlab/show/pointed+topological+space',
	NULL
),
(
	'Haus',
	'category of Hausdorff spaces',
	'$\mathbf{Haus}$',
	'Hausdorff spaces',
	'continuous functions',
	'This is the full subcategory of $\mathbf{Top}$ consisting of those spaces that are <a href="https://en.wikipedia.org/wiki/Hausdorff_space" target="_blank">Hausdorff</a>.',
	'https://ncatlab.org/nlab/show/Hausdorff+space',
	NULL
),
(
	'sSet',
	'category of simplicial sets',
	'$\mathbf{sSet}$',
	'simplicial sets, i.e. functors $\Delta^{\mathrm{op}} \to \mathbf{Set}$ where $\Delta$ is the <a href="/category/Delta">simplex category</a>',
	'natural transformations',
	NULL,
	'https://ncatlab.org/nlab/show/SimpSet',
	NULL
),
(
	'Man',
	'category of smooth manifolds',
	'$\mathbf{Man}$',
	'smooth manifolds',
	'smooth maps',
	'Here, a smooth manifold is defined as a second-countable Hausdorff space with a smooth atlas. The dimension is locally constant, not necessarily constant.',
	'https://ncatlab.org/nlab/show/Diff',
	NULL
),
(
	'Delta',
	'simplex category',
	'$\Delta$',
	'the non-empty ordered sets $[n] := \{0 < \cdots < n\}$ for $n \in \mathbb{N}$',
	'order-preserving maps',
	'The simplex category is a skeleton of $\mathbf{FinOrd} \setminus \{\varnothing\}$. It plays an important role in topology and is used to define the <a href="/category/sSet">category of simplicial sets</a>.',
	'https://ncatlab.org/nlab/show/simplex+category',
	NULL
);