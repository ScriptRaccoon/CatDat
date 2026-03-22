INSERT INTO CATEGORIES (
	id,
	name,
	notation,
	objects,
	morphisms,
	description,
	nlab_link
)
VALUES
	-- basic categories
    (
		'Set',
		'category of sets',
		'$\mathbf{Set}$',
		'sets',
		'maps',
		'The category of sets plays a fundamental role in category theory. Due to the Yoneda embedding, many results about general categories can be reduced to the category of sets. It is also usually the first example of a category that one encounters.',
		'https://ncatlab.org/nlab/show/Set'
	),
	(
		'Ab',
		'category of abelian groups',
		'$\mathbf{Ab}$',
		'abelian groups',
		'group homomorphisms',
		'This is the prototype of an abelian category.',
		'https://ncatlab.org/nlab/show/Ab'
	),
	(
		'Top',
		'category of topological spaces',
		'$\mathbf{Top}$',
		'topological spaces',
		'continuous functions',
		'This is the most basic category of geometric objects.',
		'https://ncatlab.org/nlab/show/Top'
	),
	(
		'Grp',
		'category of groups',
		'$\mathbf{Grp}$',
		'groups',
		'group homomorphisms',
		'This is the prototype of a finitary algebraic category.',
		'https://ncatlab.org/nlab/show/Grp'
	),
	(
		'Vect',
		'category of vector spaces',
		'$\mathbf{Vect}_K$',
		'vector spaces over a field $K$',
		'linear maps',
		'This is a special case of the category of modules over a ring, where the ring is a field. It is the prototype of a split abelian category.',
		'https://ncatlab.org/nlab/show/Vect'
	),
	(
		'Ring',
		'category of rings',
		'$\mathbf{Ring}$',
		'rings',
		'ring homomorphisms',
		'Here, rings always have a unit, and homomorphisms preserve them.',
		'https://ncatlab.org/nlab/show/Ring'
	),
	(
		'Alg(R)',
		'category of algebras',
		'$\mathbf{Alg}(R)$',
		'algebras over a commutative ring $R \neq 0$',
		'maps preserving the ring and module structure',
		'This is a generalization of the category of rings, which we get for $R = \mathbb{Z}$. We assume our rings (and algebras) to be unital. For $R = 0$ we would get the trivial category, which is why we exclude this here.',
		'https://ncatlab.org/nlab/show/Alg'
	),
	(
		'CRing',
		'category of commutative rings',
		'$\mathbf{CRing}$',
		'commutative rings',
		'ring homomorphisms',
		NULL,
		'https://ncatlab.org/nlab/show/CRing'
	),
	(
		'CAlg(R)',
		'category of commutative algebras',
		'$\mathbf{CAlg}(R)$',
		'commutative algebras over a commutative ring $R \neq 0$',
		'maps preserving the ring and module structure',
		'This is a generalization of the category of commutative rings, which we get for $R = \mathbb{Z}$. In general, $\mathbf{CAlg}(R) \cong R \,/\, \mathbf{CRing}$. We assume our rings (and algebras) to be unital. For $R = 0$ we would get the trivial category, which is why we exclude this here.',
		'https://ncatlab.org/nlab/show/CommAlg'
	),
	(
		'Rng',
		'category of rngs',
		'$\mathbf{Rng}$',
		'rngs, that is, non-unital rings',
		'maps that preserve addition and multiplication',
		NULL,
		'https://ncatlab.org/nlab/show/Rng'
	),
    (
		'Set*',
		'category of pointed sets',
		'$\mathbf{Set}_*$',
		'pointed sets',
		'pointed maps',
		'This is the category of sets with a distinguished element, often called the base point. A map is called pointed when it preserves the base point.',
		'https://ncatlab.org/nlab/show/pointed+set'
	),
    (
		'Mon',
		'category of monoids',
		'$\mathbf{Mon}$',
		'monoids',
		'monoid homomorphisms',
		NULL,
		'https://ncatlab.org/nlab/show/category+of+monoids'
	),
    (
		'CMon',
		'category of commutative monoids',
		'$\mathbf{CMon}$',
		'commutative monoids',
		'monoid homomorphisms',
		NULL,
		'https://ncatlab.org/nlab/show/category+of+monoids'
	),
	(
		'Pos',
		'category of posets',
		'$\mathbf{Pos}$',
		'posets (i.e., partial orders)',
		'order-preserving functions',
		NULL,
		'https://ncatlab.org/nlab/show/Pos'
	),
    (
		'M-Set',
		'category of M-sets',
		'$M{-}\mathbf{Set}$',
		'sets with a left action of a monoid $M$',
		'maps that are compatible with the $M$-action, meaning $f(m \cdot x)=m \cdot f(x)$, also called $M$-maps',
		'Here, $M$ can be any monoid. But the most important special case is that of a group.',
		'https://ncatlab.org/nlab/show/MSet'
	),
	(
		'R-Mod',
		'category of left modules over a ring',
		'$R{-}\mathbf{Mod}$',
		'left $R$-modules',
		'$R$-linear maps',
		'This is the prototype of an abelian category. The category of right modules is the same with the opposite ring $R^{\mathrm{op}}$, hence not listed here.<br>
		To settle the unsatisfied properties, we make several assumptions: $R \neq 0$ (otherwise we would have the trivial category), that $R$ is not a field (otherwise we would have the category of vector spaces, which is in a separate entry), and moreover that $R$ is <i>not</i> semisimple: If $R$ is semisimple, then by the Artin-Wedderburn theorem, the category is equivalent to a finite direct product of categories $D{-}\mathbf{Mod}$ for division rings $D$, and the case of division rings is in a separate entry.',
		'https://ncatlab.org/nlab/show/module'
	),
	(
		'R-Mod_div',
		'category of left modules over a division ring',
		'$R{-}\mathbf{Mod}$',
		'left $R$-modules',
		'$R$-linear maps',
		'Here, we assume that $R$ is a non-commutative division ring, i.e. a skew-field which is not a field. The category of modules behaves mostly the same as in the commutative case.',
		'https://ncatlab.org/nlab/show/module'
	),
    (
		'Rel',
		'category of sets and relations',
		'$\mathbf{Rel}$',
		'sets',
		'A morphism from $A$ to $B$ is a relation, i.e. a subset of $A \times B$.',
		'This category is self-dual as it can be: There is an isomorphism $\mathbf{Rel} \cong \mathbf{Rel}^{\mathrm{op}}$ that is the identity on objects and maps a relation to its opposite relation. It is the prototype of a dagger-category.',
		'https://ncatlab.org/nlab/show/Rel'
	),

	-- categories with of "finite" objects
    (
		'FinSet',
		'category of finite sets',
		'$\mathbf{FinSet}$',
		'finite sets',
		'maps',
		NULL,
		'https://ncatlab.org/nlab/show/FinSet'
	),
	(
		'FinAb',
		'category of finite abelian groups',
		'$\mathbf{FinAb}$',
		'finite abelian groups',
		'group homomorphisms',
		NULL,
		'https://ncatlab.org/nlab/show/finite+abelian+group'
	),
	(
		'Abfg',
		'category of finitely generated abelian groups',
		'$\mathbf{Ab}_{\mathrm{fg}}$',
		'finitely generated abelian groups',
		'group homomorphisms',
		NULL,
		'https://ncatlab.org/nlab/show/finitely+generated+module'
	),
    (
		'B',
		'category of finite sets and bijections',
		'$\mathbb{B}$',
		'finite sets',
		'bijective maps',
		'This category is also known as the permutation groupoid. It appears in the definition of a combinatorial species.',
		'https://ncatlab.org/nlab/show/permutation+groupoid'
	),
	(
		'FI',
		'category of finite sets and injections',
		'$\mathrm{FI}$',
		'finite sets',
		'injective maps',
		'This category is badly-behaved in itself, but plays an important role in representation theory.',
		NULL
	),
	(
		'FS',
		'category of finite sets and surjections',
		'$\mathrm{FS}$',
		'finite sets',
		'surjective maps',
		'This category is badly-behaved in itself, but it appears in representation theory. It has two connected components, consisting of the empty set and the non-empty finite sets.',
		NULL
	),

	-- tiny categories
	(
		'0',
		'empty category',
		'$0$',
		'no objects',
		'no morphisms',
		'This is the category with no objects and no morphisms. It is the initial object in the category of (small) categories.',
		'https://ncatlab.org/nlab/show/empty+category'
	),
	(
		'1',
		'trivial category',
		'$\mathbf{1}$',
		'a single object $0$',
		'only the identity morphism',
		'This is the simplest category, consisting of a single object $0$ and only the identity morphism $0 \to 0$. It is the terminal object in the category of small categories.',
		'https://ncatlab.org/nlab/show/terminal+category'
	),
	(
		'2',
		'discrete category on two objects',
		'$\mathbf{2}$',
		'two objects',
		'only the two identity morphisms',
		'For a more concrete representation, this is the subcategory of $\mathbf{CRing}$ of the two fields $\mathbb{F}_2$ and $\mathbb{F}_3$.',
		NULL
	),
	(
		'walking_morphism',
		'walking morphism',
		'$\{0 \to 1\}$',
		'$0$, $1$',
		'the two identities and a single morphism from $0$ to $1$',
		'This is also known as the interval category. It has the property that functors $\{0 \to 1\} \to \mathcal{C}$ are the same as morphisms in $\mathcal{C}$.',
		'https://ncatlab.org/nlab/show/interval+category'
	),
    (
		'walking_pair',
		'walking parallel pair of morphisms',
		'$\{0 \rightrightarrows 1 \}$',
		'two objects $0$ and $1$',
		'the two identities and two parallel morphisms from $0$ to $1$',
		'The name of this category comes from the fact that it consists of two parallel morphisms, and a functor out of this category is the same as a parallel pair of morphisms in the target category.',
		'https://ncatlab.org/nlab/show/walking+structure'
	),
	(
		'walking_isomorphism',
		'walking isomorphism',
		'$\{0 \rightleftarrows 1\}$',
		'two objects $0$ and $1$',
		'identities, and two morphisms $0 \to 1$ and $1 \to 0$ that are mutually inverse',
		'The name of this category comes from the fact that it consists of two objects and an isomorphism between them, and a functor out of this category is the same as an isomorphism in the target category. The walking isomorphism is actually equivalent to the trivial category.',
		'https://ncatlab.org/nlab/show/walking+isomorphism'
	),
	(
		'walking_composable_pair',
		'walking composable pair',
		'$\{ 0 \to 1 \to 2 \}$',
		'three objects $0,1,2$',
		'a single morphism from each natural number to one greater than or equal to it',
		'The name of this category comes from the fact that a functor out of it is the same as a composable pair of morphisms.',
		'https://ncatlab.org/nlab/show/composable+pair'
	),

	-- examples of thin categories
    (
		'N',
		'partial order of natural numbers',
		'$(\mathbb{N},\leq)$',
		'natural numbers $0, 1, 2, \dotsc$',
		'a unique morphism $(n,m) : n \to m$ if $n \leq m$',
		'This can also be seen as the path category of the infinite linear graph $\bullet \to \bullet \to \bullet \to \cdots$.',
		NULL
	),
    (
		'real_interval',
		'partial order [0,1]',
		'$([0,1],\leq)$',
		'real numbers between $0$ and $1$',
		'a unique morphism $(s,t) : s \to t$ when $s \leq t$',
		'Every partial order can be regarded as a thin category. This is a specific example. This category is locally $\aleph_1$-presentable (in fact, <i>every</i> object is $\aleph_1$-presentable), but not locally finitely presentable (in fact, only $0$ is finitely presentable).',
		'https://ncatlab.org/nlab/show/interval'
	),
	(
		'Zdiv',
		'preorder of integers w.r.t. divisibility',
		'$(\mathbb{Z},\mid)$',
		'integers',
		'a unique morphism $(a,b) : a \to b$ if $a$ divides $b$',
		'This is a preorder, not a partial order, because $a$ and $-a$ divide each other, but are not equal for $a \neq 0$. Notice that this category is equivalent (but not isomorphic) to $(\mathbb{N},\mid)$.',
		NULL
	),
	(
		'Noo',
		'partial order of extended natural numbers',
		'$(\mathbb{N}_\infty, \leq)$',
		'natural numbers and $\infty$',
		'a unique morphism $(n, m) : n \to m$ if $n \leq m$, where of course $n \leq \infty$ for all $n$',
		NULL,
		NULL
	),
    (
		'On',
		'partial order of ordinal numbers',
		'$(\mathbf{On},\leq)$',
		'ordinal numbers',
		'a unique morphism $(\alpha,\beta): \alpha \to \beta$ if $\alpha \leq \beta$',
		'This is a large variant of the partial order of natural numbers.',
		NULL
	),

	-- categories appearing in topology, geometry, and algebraic geometry
    (
		'sSet',
		'category of simplicial sets',
		'$\mathbf{sSet}$',
		'simplicial sets, i.e. functors $\Delta^{\mathrm{op}} \to \mathbf{Set}$',
		'natural transformations',
		NULL,
		'https://ncatlab.org/nlab/show/SimpSet'
	),
	(
		'Met',
		'category of metric spaces with non-expansive maps',
		'$\mathbf{Met}$',
		'metric spaces',
		'non-expansive maps $f$, meaning $d(f(x),f(y)) \leq d(x,y)$ for all $x,y$',
		NULL,
		'https://ncatlab.org/nlab/show/Met'
	),
	(
		'Met_oo',
		'category of metric spaces with ∞ allowed',
		'$\mathbf{Met}_{\infty}$',
		'metric spaces, where the metric is allowed to assume the value $\infty$',
		'non-expansive maps $f$, meaning $d(f(x),f(y)) \leq d(x,y)$ for all $x,y$',
		'The fact that we allow $\infty$ means that universal constructions work much better.',
		'https://ncatlab.org/nlab/show/Met'
	),
	(
		'Met_c',
		'category of metric spaces with continuous maps',
		'$\mathbf{Met}_c$',
		'metric spaces',
		'continuous maps',
		'This category is equivalent to the subcategory of $\mathbf{Top}$ (or $\mathbf{Haus}$) that consists of metrizable topological spaces.',
		NULL
	),
	(
		'Man',
		'category of smooth manifolds',
		'$\mathbf{Man}$',
		'smooth manifolds',
		'smooth maps',
		'Here, a smooth manifold is assumed to be finite-dimensional, Hausdorff, and second-countable.',
		'https://ncatlab.org/nlab/show/Diff'
	),
	(
		'LRS',
		'category of locally ringed spaces',
		'$\mathbf{LRS}$',
		'locally ringed spaces',
		'morphisms of locally ringed spaces, thus consisting of a continuous map and a homomorphism of sheaves that induces local ring homomorphisms in the stalks',
		NULL,
		NULL
	),
	(
		'Sch',
		'category of schemes',
		'$\mathbf{Sch}$',
		'schemes',
		'morphism of locally ringed spaces',
		NULL,
		NULL
	),
	(
		'Z',
		'category of Z-functors',
		'$[\mathbf{CRing}, \mathbf{Set}]$',
		'Z-functors, i.e. functors from commutative rings to sets',
		'natural transformations',
		'This category is used in functorial algebraic geometry. It also provides a typical example of a functor category that is not locally small, but nevertheless relevant. Most of its properties are directly derived from the category of sets, so other functor categories $[\mathbf{C}, \mathbf{Set}]$ for large categories $\mathbf{C}$ will be similar.',
		NULL
	),
	(
		'Sh(X)',
		'category of sheaves',
		'$\mathrm{Sh}(X)$',
		'sheaves of sets on a topological space $X$',
		'morphisms of sheaves',
		'Here, we assume that the topological space $X$ is neither discrete nor indiscrete, since otherwise this category is just a product of copies of $\mathbf{Set}$. Another valid notation is $\mathrm{Sh}(X,\mathbf{Set})$.',
		'https://ncatlab.org/nlab/show/category+of+sheaves'
	),
	(
		'Sh(X,Ab)',
		'category of abelian sheaves',
		'$\mathrm{Sh}(X,\mathbf{Ab})$',
		'sheaves of abelian groups on a topological space $X$',
		'morphisms of sheaves',
		'Here, we assume that the topological space $X$ is neither discrete nor indiscrete, since otherwise this category is just a product of copies of $\mathbf{Ab}$.',
		'https://ncatlab.org/nlab/show/sheaf+of+abelian+groups'
	),

	-- deloopings
    (
		'BG',
		'delooping of an infinite group',
		'$BG$',
		'a single object',
		'the elements of an infinite group $G$',
		'Every group $G$ yields a groupoid $BG$ with a single object, morphisms given by the elements of $G$, and composition given by the group operation. In this example, we consider the case of an infinite group $G$.',
		'https://ncatlab.org/nlab/show/delooping'
	),
	(
		'BGf',
		'delooping of a non-trivial finite group',
		'$BG$',
		'a single object',
		'the elements of a non-trivial finite group $G$',
		'Every group $G$ yields a groupoid $BG$ with a single object, morphisms given by the elements of $G$, and composition given by the group operation. In this example, we consider the case of a non-trivial finite group $G$ (such as $G = C_2$).',
		'https://ncatlab.org/nlab/show/delooping'
	),
	(
		'BN',
		'delooping of the additive monoid of natural numbers',
		'$B\mathbb{N}$',
		'a single object',
		'the natural numbers, with addition serving as composition',
		'Every monoid $M$ induces a one-object category $BM$ with morphisms given by the elements of $M$, and composition given by the monoid operation. Some of the properties of this category depend on the specific monoid. In this example, we take the commutative monoid $M = (\mathbb{N},+,0)$, so composition is $n \circ m = n + m$.',
		NULL
	),
	(
		'BOn',
		'delooping of the additive monoid of ordinal numbers',
		'$B\mathbf{On}$',
		'a single object',
		'ordinal numbers, with addition as composition',
		'Every monoid $M$ induces a one-object category $BM$. This also works when $M$ is large, in which case $BM$ is not locally small. In this example, we apply this construction to the large monoid of ordinal numbers with respect to addition, so composition is $\alpha \circ \beta = \alpha + \beta$.',
		NULL
	),

	-- various categories
	(
		'Fld',
		'category of fields',
		'$\mathbf{Fld}$',
		'fields',
		'field homomorphisms (i.e., ring homomorphisms)',
		'This is a typical example of a bad category of good objects.',
		'https://ncatlab.org/nlab/show/Field'
	),
	(
		'Ban',
		'category of Banach spaces with linear contractions',
		'$\mathbf{Ban}$',
		'Banach spaces over $\mathbb{C}$',
		'linear contractions, i.e. linear maps of norm $\leq 1$',
		'The choice of morphisms is similar to that of $\mathbf{Met}$ which yields the best categorical properties.',
		'https://ncatlab.org/nlab/show/Banach+space'
	),
	(
		'Meas',
		'category of measurable spaces',
		'$\mathbf{Meas}$',
		'measurable spaces',
		'measurable maps',
		'This is very similar to the category of topological spaces. Accordingly, limits and colimits can be constructed in the same way.',
		'https://ncatlab.org/nlab/show/Meas'
	),

	(
		'Cat',
		'category of small categories',
		'$\mathbf{Cat}$',
		'small categories',
		'functors',
		'This is the category of small categories and functors between them. It is the prototype of a 2-category, but here we only treat it as a 1-category.',
		'https://ncatlab.org/nlab/show/Cat'
	),
	(
		'FinOrd',
		'category of finite orders',
		'$\mathbf{FinOrd}$',
		'finite totally ordered sets',
		'order-preserving maps',
		'This is also known as the augmented simplex category. The finite orders of the form $\{0,1,\dotsc,n-1\}$ for $n \in \mathbb{N}$ provide a skeleton (for $n = 0$ this includes the empty set), and the category is often presented in this way.',
		'https://ncatlab.org/nlab/show/augmented+simplex+category'
	),
	(
		'Sp',
		'category of combinatorial species',
		'$\mathbf{Sp}$',
		'combinatorial species, defined as functors $\mathbb{B} \to \mathbf{FinSet}$, where $\mathbb{B}$ is the category of finite sets and bijections',
		'natural transformations',
		'Most categorical properties are immediately inferred from $\mathbf{FinSet}$. Notice that this category is not locally small; it is just equivalent to a locally small category.',
		'https://ncatlab.org/nlab/show/species'
	),

	-- artificial categories
    (
		'FreeAb',
		'category of free abelian groups',
		'$\mathbf{FreeAb}$',
		'free abelian groups',
		'group homomorphisms',
		NULL,
		NULL
	),
	(
		'Setne',
		'category of non-empty sets',
		'$\mathbf{Set}_{\neq \emptyset}$',
		'non-empty sets',
		'maps',
		'This entry demonstrates that removing an object (the empty set) can drastically change the properties of a category. In particular, this category is neither complete nor cocomplete.',
		'https://ncatlab.org/nlab/show/inhabited+set'
	);