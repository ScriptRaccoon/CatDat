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
	'A category is <i>mono-regular</i> when every monomorphism is regular, i.e. the equalizer of a pair of morphisms. Notice that this is not standard terminology, <a href="https://math.stackexchange.com/questions/5031588" target="_blank">apparently</a> the literature has no name for this yet. A <i>preadditive</i> category is mono-regular iff it is normal. The notion of a normal category is reserved for categories with zero morphisms, while mono-regular applies to all categories.',
	'https://ncatlab.org/nlab/show/regular+monomorphism',
	'epi-regular',
	TRUE
),
(
	'epi-regular',
	'is',
	'A category is <i>epi-regular</i> when every epimorphism is regular, i.e. the coequalizer of a pair of morphisms. Notice that this is not standard terminology, <a href="https://math.stackexchange.com/questions/5031588" target="_blank">apparently</a> the literature has no name for this yet. A <i>preadditive</i> category is epi-regular iff it is conormal. The notion of a conormal category is reserved for categories with zero morphisms, while epi-regular applies to all categories.',
	'https://ncatlab.org/nlab/show/regular+epimorphism',
	'mono-regular',
	TRUE
),
(
	'normal',
	'is',
	'A category is <i>normal</i> if it has zero morphisms and every monomorphism is a kernel of some morphism (in which case case it is also called a <i>normal monomorphism</i>). The assumption of having zero morphisms makes it possible to talk about kernels.',
	'https://ncatlab.org/nlab/show/normal+monomorphism',
	'conormal',
	TRUE
),
(
	'conormal',
	'is',
	'A category is <i>conormal</i> if it has zero morphisms and every epimorphism is a cokernel of some morphism (in which case case it is also called a <i>normal epimorphism</i>). The assumption of having zero morphisms makes it possible to talk about cokernels.',
	'https://ncatlab.org/nlab/show/normal+epimorphism',
	'normal',
	TRUE
),
(
	'left cancellative',
	'is',
	'A category is <i>left cancellative</i> if for every morphism $f : A \to B$ and every parallel pair of morphisms $g,h : T \rightrightarrows A$ with $f \circ g = f \circ h$ we have $g = h$. Equivalently, every morphism is a monomorphism.',
	'https://ncatlab.org/nlab/show/cancellative+category',
	'right cancellative',
	TRUE
),
(
	'right cancellative',
	'is',
	'A category is <i>right cancellative</i> if for every morphism $f : A \to B$ and every parallel pair of morphisms $g,h : B \rightrightarrows T$ with $g \circ f = h \circ f$ we have $g = h$. Equivalently, every morphism is an epimorphism.',
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
	$$\cdots \to A_2 \to A_1 \to A_0.$$
	For example, a poset is direct iff it is well-founded.',
	'https://ncatlab.org/nlab/show/direct+category',
	'inverse',
	FALSE
),
(
	'inverse',
	'is',
	'A category is <i>inverse</i> if its dual is direct, i.e., if it contains no infinite sequence of non-identity morphisms of the form
	$$A_0 \to A_1 \to A_2 \to \cdots.$$',
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
),
(
	'filtered-colimit-stable monomorphisms',
	'has',
	'A category has <i>filtered-colimit-stable monomorphisms</i> if it has filtered colimits and for every filtered diagram of monomorphisms $(X_i \to Y_i)$ also their colimit $\mathrm{colim}_i X_i \to \mathrm{colim}_i Y_i$ is a monomorphism.',
	NULL,
	'cofiltered-limit-stable epimorphisms',
	TRUE 
),
(
	'cofiltered-limit-stable epimorphisms',
	'has',
	'A category has <i>cofiltered-limit-stable epimorphisms</i> if it has cofiltered limits and for every cofiltered diagram of epimorphisms $(X_i \to Y_i)$ also their limit $\lim_i X_i \to \lim_i Y_i$ is an epimorphism.',
	NULL,
	'filtered-colimit-stable monomorphisms',
	TRUE 
),
(
	'core-thin',
	'is',
	'A category is <i>core-thin</i> if it satisfies the following equivalent conditions:
	<ol>
		<li>Its <a href="https://ncatlab.org/nlab/show/core+groupoid" target="_blank">core</a> is thin.</li>
		<li>Parallel isomorphisms are equal.</li>
		<li>Every automorphism is the identity.</li>
	</ol>',
	'https://ncatlab.org/nlab/show/gaunt+category',
	'core-thin',
	TRUE
),
(
	'gaunt',
	'is',
	'A category is <i>gaunt</i> when every isomorphism $f : A \to B$ must be the identity (in particular, $A = B$). This is the "skeletal variant" of being core-thin.',
	'https://ncatlab.org/nlab/show/gaunt+category',
	'gaunt',
	FALSE
);
