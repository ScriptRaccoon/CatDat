INSERT INTO properties (
	id,
	relation,
	description,
	nlab_link,
	dual_property_id,
	invariant_under_equivalences
)
VALUES
(
	'trivial',
	'is',
	'A category is <i>trivial</i> if it is equivalent to the <a href="/category/1">trivial category</a>. Equivalently, there is an initial object $0$ such that for every object $A$ the unique morphism $0 \to A$ is an isomorphism. Notice that we do not demand that the category is <i>isomorphic</i> to the trivial category. As a consequence, every inhabited indiscrete category is trivial in our sense.',
	'https://ncatlab.org/nlab/show/terminal+category',
	'trivial',
	TRUE
),
(
	'thin',
	'is',
	'A category is <i>thin</i> when between any pair of objects there is at most one morphism. Such categories correspond to preordered collections.',
	'https://ncatlab.org/nlab/show/thin+category',
	'thin',
	TRUE
),
(
	'discrete',
	'is',
	'A category is <i>discrete</i> when every morphism is an identity morphism. Thus, a discrete category is merely a collection of objects.',
	'https://ncatlab.org/nlab/show/discrete+category',
	'discrete',
	FALSE
),
(
	'essentially discrete',
	'is',
	'A category is <i>essentially discrete</i> if it is equivalent to a discrete category. Equivalently, it is a thin groupoid. Notice that the nLab calls this property simply "discrete". In contrast to being discrete, this property is invariant under equivalences of categories. An essentially discrete category is the same as a <i>setoid</i> (a set equipped with an equivalence relation).',
	'https://ncatlab.org/nlab/show/discrete+category',
	'essentially discrete',
	TRUE
),
(
	'skeletal',
	'is',
	'A category is <i>skeletal</i> when isomorphic objects are already equal. Every category is equivalent to a skeletal category (using the axiom of choice).',
	'https://ncatlab.org/nlab/show/skeleton',
	'skeletal',
	FALSE
),
(
	'gaunt',
	'is',
	'A category is <i>gaunt</i> when every isomorphism $f : A \to B$ must be the identity (in particular, $A = B$).',
	'https://ncatlab.org/nlab/show/gaunt+category',
	'gaunt',
	FALSE
);