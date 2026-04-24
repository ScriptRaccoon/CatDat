INSERT INTO category_properties (
	id,
	relation,
	description,
	nlab_link,
	dual_property_id,
	invariant_under_equivalences
)
VALUES
(
	'inhabited',
	'is',
	'A category is <i>inhabited</i> if it has at least one object. In classical logic, this is equivalent to being <i>non-empty</i> (which is a double negation).',
	'https://ncatlab.org/nlab/show/inhabited+set',
	'inhabited',
	TRUE
),
(
	'small',
	'is',
	'A category is <i>small</i> when the collection of objects and the collection of morphisms are sets, i.e. small.',
	'https://ncatlab.org/nlab/show/small+category',
	'small',
	FALSE
),
(
	'essentially small',
	'is',
	'A category is <i>essentially small</i> when it is equivalent to a small category. In particular, there is a set of objects such that every object is isomorphic to an object in this set. In contrast to the property of being small, being essentially small is invariant under equivalences of categories.',
	'https://ncatlab.org/nlab/show/small+category',
	'essentially small',
	TRUE
),
(
	'locally small',
	'is',
	'A category is <i>locally small</i> when for every pair of objects $A,B$ the collection of morphisms $A \to B$ is a set. Here, we work with a set-theoretic foundation in which there are sets and collections. Categories are based on collections of objects and morphisms.',
	'https://ncatlab.org/nlab/show/locally+small+category',
	'locally small',
	FALSE
),
(
	'locally essentially small',
	'is',
	'A category is <i>locally essentially small</i> when for every pair of objects $A,B$ the collection of morphisms $A \to B$ is isomorphic to a set. (Here, we work with a set-theoretic foundation in which there are sets and collections. Categories are based on collections of objects and morphisms.) Equivalently, the category is equivalent to a locally small category. In contrast to being locally small, this condition is invariant under equivalences of categories. This is why we have added it to the database. For instance, every algebraic category is locally essentially small, but not necessarily locally small. This indicates that this is the "right" notion to work with.',
	NULL,
	'locally essentially small',
	TRUE
),
(
	'finite',
	'is',
	'A category is <i>finite</i> if it has finitely many objects and morphisms.',
	'https://ncatlab.org/nlab/show/finite+category',
	'finite',
	FALSE
),
(
	'essentially finite',
	'is',
	'A category is <i>essentially finite</i> if it is equivalent to a finite category. Equivalently, there are only finitely many objects up to isomorphism, and the collection of morphisms between any two objects is isomorphic to a finite set. In contrast to being finite, this property is invariant under equivalences of categories.',
	NULL,
	'essentially finite',
	TRUE
),
(
	'countable',
	'is',
	'A category is <i>countable</i> if it has countably many objects and morphisms.',
	NULL,
	'countable',
	FALSE
),
(
	'essentially countable',
	'is',
	'A category is <i>essentially countable</i> if it is equivalent to a countable category.',
	NULL,
	'essentially countable',
	TRUE
),
(
	'well-powered',
	'is',
	'A category is <i>well-powered</i> if the collection of subobjects of any object is isomorphic to a set.',
	'https://ncatlab.org/nlab/show/well-powered+category',
	'well-copowered',
	TRUE
),
(
	'well-copowered',
	'is',
	'A category is <i>well-copowered</i> if the collection of quotients of any object is isomorphic to a set.',
	'https://ncatlab.org/nlab/show/well-powered+category',
	'well-powered',
	TRUE
),
(
	'generator',
	'has a',
	'An object $G$ of a category is called a <i>generator</i> if for every pair of parallel morphisms $f,g : A \rightrightarrows B$ the equation $f = g$ holds if for every morphism $h : G \to A$ we have $f \circ h = g \circ h$. Equivalently, the functor $\mathrm{Hom}(G,-) : \mathcal{C} \to \mathbf{Set}^+$ is faithful. This property refers to the existence of a generator. By definition, $G$ is a generator if and only if $\{G\}$ is a <a href="/category-property/generating_set">generating set</a>.',
	'https://ncatlab.org/nlab/show/separator',
	'cogenerator',
	TRUE
),
(
	'cogenerator',
	'has a',
	'An object $Q$ of a category is called a <i>cogenerator</i> if for every pair of parallel morphisms $f,g : A \rightrightarrows B$ the equation $f = g$ holds if for every morphism $h : B \to Q$ we have $h \circ f = h \circ g$. Equivalently, the functor $\mathrm{Hom}(-,Q) : \mathcal{C}^{\mathrm{op}} \to \mathbf{Set}^+$ is faithful. This property refers to the existence of a cogenerator. By definition, $Q$ is a cogenerator if and only if $\{Q\}$ is a <a href="/category-property/cogenerating_set">cogenerating set</a>.',
	'https://ncatlab.org/nlab/show/cogenerator',
	'generator',
	TRUE
),
(
	'generating set',
	'has a',
	'A set of objects $S$ is called a <i>generating set</i> if for every pair of parallel morphisms $f,g : A \rightrightarrows B$, $f = g$ holds if and only if for every morphism $h : G \to A$ with $G \in S$ we have $f \circ h = g \circ h$. Equivalently, the functor $(\hom(G,-))_{G \in S} : \mathcal{C} \to (\mathbf{Set}^+)^S$ is faithful. This property refers to the existence of a generating set.',
	'https://ncatlab.org/nlab/show/separator',
	'cogenerating set',
	TRUE
),
(
	'cogenerating set',
	'has a',
	'A set of objects $S$ is called a <i>cogenerating set</i> if for every pair of parallel morphisms $f,g : A \rightrightarrows B$, $f = g$ holds if and only if for every morphism $h : B \to G$ with $G \in S$ we have $h \circ f = h \circ g$. Equivalently, the functor $(\hom(-,G))_{G \in S} : \mathcal{C}^{\mathrm{op}} \to (\mathbf{Set}^+)^S$ is faithful. This property refers to the existence of a cogenerating set.',
	'https://ncatlab.org/nlab/show/cogenerator',
	'generating set',
	TRUE
);