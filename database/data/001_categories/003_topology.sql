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
	'simplicial sets, i.e. functors $\Delta^{\mathrm{op}} \to \mathbf{Set}$',
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
	'Here, a smooth manifold is assumed to be finite-dimensional, Hausdorff, and second-countable.',
	'https://ncatlab.org/nlab/show/Diff',
	NULL
);