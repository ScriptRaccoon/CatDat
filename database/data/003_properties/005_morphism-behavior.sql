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
	'groupoid',
	'is a',
	'A <i>groupoid</i> is a category in which every morphism is an isomorphism.',
	'https://ncatlab.org/nlab/show/groupoid',
	'groupoid',
	TRUE
),
(
	'mono-regular',
	'is',
	'A category is <i>mono-regular</i> when every monomorphism is regular, i.e. the equalizer of a pair of morphisms. Notice that this is not standard terminology, <a href="https://math.stackexchange.com/questions/5031588" target="_blank">apparently</a> the literature has no name for this yet. A <i>preadditive</i> category is mono-regular iff every monomorphism is a kernel, and this type of category is commonly known as a <i>normal category</i>. We avoid this terminology here since it only applies to a certain type of categories, but mono-regular applies to all categories.',
	'https://ncatlab.org/nlab/show/regular+monomorphism',
	'epi-regular',
	TRUE
),
(
	'epi-regular',
	'is',
	'A category is <i>epi-regular</i> when every epimorphism is regular, i.e. the coequalizer of a pair of morphisms. Notice that this is not standard terminology, <a href="https://math.stackexchange.com/questions/5031588" target="_blank">apparently</a> the literature has no name for this yet. A <i>preadditive</i> category is epi-regular iff every epimorphism is a cokernel, and this type of category is commonly known as a <i>conormal category</i>. We avoid this terminology here since it only applies to a certain type of categories, but epi-regular applies to all categories.',
	'https://ncatlab.org/nlab/show/regular+epimorphism',
	'mono-regular',
	TRUE
),
(
	'left cancellative',
	'is',
	'A category is <i>left cancellative</i> if for every morphism $f : A \to B$ and every parallel pair of morphisms $g,h : B \to C$ with $f \circ g = f \circ h$ we have $g = h$. Equivalently, every morphism is a monomorphism.',
	'https://ncatlab.org/nlab/show/cancellative+category',
	'right cancellative',
	TRUE
),
(
	'right cancellative',
	'is',
	'A category is <i>right cancellative</i> if for every morphism $f : A \to B$ and every parallel pair of morphisms $g,h : C \to A$ with $g \circ f = h \circ f$ we have $g = h$. Equivalently, every morphism is an epimorphism.',
	'https://ncatlab.org/nlab/show/cancellative+category',
	'left cancellative',
	TRUE
),
(
	'Cauchy complete',
	'is',
	'A category is <i>Cauchy complete</i> if every idempotent splits. That is, every endomorphism $e : X \to X$ with $e^2 = e$ may be written as $e = i \circ p$ for some morphisms $p : X \to Y$ and $i : Y \to X$ with $p \circ i = \mathrm{id}_Y$. Equivalently, the pair $e,\mathrm{id}_X : X \rightrightarrows X$ has an equalizer (or an coequalizer).',
	'https://ncatlab.org/nlab/show/Cauchy+complete+category',
	'Cauchy complete',
	TRUE
),
(
	'balanced',
	'is',
	'A category is <i>balanced</i> if every morphism which is a monomorphism and an epimorphism must be an isomorphism.',
	'https://ncatlab.org/nlab/show/balanced+category',
	'balanced',
	TRUE
),
(
	'direct',
	'is',
	'A category is <i>direct</i> if it contains no infinite sequence of non-identity morphisms of the form
	<p>$\cdots \to A_2 \to A_1 \to A_0.$</p>
	For example, a poset is direct iff it is well-founded.',
	'https://ncatlab.org/nlab/show/direct+category',
	'inverse',
	FALSE
),
(
	'inverse',
	'is',
	'A category is <i>inverse</i> if its dual is direct, i.e., if it contains no infinite sequence of non-identity morphisms of the form
	<p>$A_0 \to A_1 \to A_2 \to \cdots.$</p>',
	'https://ncatlab.org/nlab/show/inverse+category',
	'direct',
	FALSE
),
(
	'one-way',
	'is',
	'A category is <i>one-way</i> if every endomorphism in it is equal to the identity.',
	'https://ncatlab.org/nlab/show/one-way+category',
	'one-way',
	TRUE
);