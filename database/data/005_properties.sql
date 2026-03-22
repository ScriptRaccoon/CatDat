INSERT INTO properties (
	id,
	prefix,
	description,
	nlab_link,
	dual_property_id,
	invariant_under_equivalences
)
VALUES
    -- properties related to limits and colimits
	(
		'complete',
		'is',
		'A category is <i>complete</i> when every small diagram in the category has a limit.',
		'https://ncatlab.org/nlab/show/complete+category',
		'cocomplete',
		TRUE
	),
	(
		'cocomplete',
		'is',
		'A category is <i>cocomplete</i> when every small diagram in the category has a colimit.',
		'https://ncatlab.org/nlab/show/cocomplete+category',
		'complete',
		TRUE
	),
	(
		'cartesian closed',
		'is',
		'A category is <i>cartesian closed</i> if all finite products and exponentials exist.',
		'https://ncatlab.org/nlab/show/cartesian+closed+category',
		NULL,
		TRUE
	),
	(
		'locally cartesian closed',
		'is',
		'A category is <i>locally cartesian closed</i> if each of its slice categories is cartesian closed.',
		'https://ncatlab.org/nlab/show/locally+cartesian+closed+category',
		NULL,
		TRUE
	),
	(
		'pullbacks',
		'has',
		'A category $\mathcal{C}$ has <i>pullbacks</i> if every cospan of morphisms $A \rightarrow S \leftarrow B$ has a pullback $A \times_S B$. This is also known as a fiber product. Equivalently, the slice category $\mathcal{C}/S$ has binary products.',
		'https://ncatlab.org/nlab/show/pullback',
		'pushouts',
		TRUE
	),
	(
		'pushouts',
		'has',
		'A category $\mathcal{C}$ has <i>pushouts</i> if every span of morphisms $A \leftarrow S \rightarrow B$ has a pushout $A \sqcup_S B$. This is also known as a fiber coproduct. Equivalently, the coslice category $S/\mathcal{C}$ has binary coproducts.',
		'https://ncatlab.org/nlab/show/pushout',
		'pullbacks',
		TRUE
	),
	(
		'finitely complete',
		'is',
		'A category is <i>finitely complete</i> when every finite diagram has a limit.',
		'https://ncatlab.org/nlab/show/finitely+complete+category',
		'finitely cocomplete',
		TRUE
	),
	(
		'finitely cocomplete',
		'is',
		'A category is <i>finitely cocomplete</i> when every finite diagram has a colimit.',
		'https://ncatlab.org/nlab/show/finitely+cocomplete+category',
		'finitely complete',
		TRUE
	),
	(
		'initial object',
		'has an',
		'An <i>initial object</i> is an object that has a unique morphism to every object in the category. This property refers to the existence of an initial object.',
		'https://ncatlab.org/nlab/show/initial+object',
		'terminal object',
		TRUE
	),
	(
		'terminal object',
		'has a',
		'A <i>terminal object</i> (or <i>final object</i>) is an object that has a unique morphism from every object in the category. This property refers to the existence of a terminal object.',
		'https://ncatlab.org/nlab/show/terminal+object',
		'initial object',
		TRUE
	),
	(
		'products',
		'has',
		'Given a family of objects $(A_i)_{i \in I}$, a <i>product</i> $\prod_{i \in I} A_i$ is defined as an object with morphisms $p_i : \prod_{i \in I} A_i \to A_i$ satisfying the following universal property: For every object $T$ and every family of morphisms $(f_i : T \to A_i)_{i \in I}$ there is a unique morphism $f : T \to \prod_{i \in I} A_i$ such that $p_i \circ f = f_i$ for all $i \in I$. This property refers to the existence of products.',
		'https://ncatlab.org/nlab/show/cartesian+product',
		'coproducts',
		TRUE
	),
	(
		'coproducts',
		'has',
		'Given a family of objects $(A_i)_{i \in I}$, a <i>coproduct</i> $\coprod_{i \in I} A_i$ is defined as an object with morphisms $i_i : A_i \to \coprod_{i \in I} A_i$ satisfying the following universal property: For every object $T$ and every family of morphisms $(f_i : A_i \to T)_{i \in I}$ there is a unique morphism $f : \coprod_{i \in I} A_i \to T$ such that $f \circ i_i = f_i$ for all $i \in I$. This property refers to the existence of coproducts.',
		'https://ncatlab.org/nlab/show/coproduct',
		'products',
		TRUE
	),
	(
		'finite products',
		'has',
		'A category has <i>finite products</i> if it has products for finite families of objects. Equivalently, it has a terminal object and binary products.',
		'https://ncatlab.org/nlab/show/finite+product',
		'finite coproducts',
		TRUE
	),
	(
		'finite coproducts',
		'has',
		'A category has <i>finite coproducts</i> if it has coproducts for finite families of objects. Equivalently, it has an initial object and binary coproducts.',
		'https://ncatlab.org/nlab/show/finite+coproduct',
		'finite products',
		TRUE
	),
	(
		'biproducts',
		'has',
		'A category has <i>biproducts</i> when it has zero morphisms, finite products, finite coproducts, and for every finite family of objects $A_1,\dotsc,A_n$ the canonical morphism $A_1 \sqcup \cdots \sqcup A_n \to A_1 \times \cdots \times A_n$ is an isomorphism. It is then also called <i>semi-additive</i>.',
		'https://ncatlab.org/nlab/show/biproduct',
		'biproducts',
		TRUE
	),
	(
		'binary products',
		'has',
		'A category has <i>binary products</i> if every pair $A,B$ of objects has a product $A \times B$.',
		'https://ncatlab.org/nlab/show/binary+product',
		'binary coproducts',
		TRUE
	),
	(
		'binary coproducts',
		'has',
		'A category has <i>binary coproducts</i> if every pair $A,B$ of objects has a coproduct $A \sqcup B$.',
		'https://ncatlab.org/nlab/show/coproduct',
		'binary products',
		TRUE
	),
	(
		'countable products',
		'has',
		'A category has <i>countable products</i> if it has products for countable families of objects.',
		NULL,
		'countable coproducts',
		TRUE
	),
	(
		'countable coproducts',
		'has',
		'A category has <i>countable coproducts</i> if it has coproducts for countable families of objects.',
		NULL,
		'countable products',
		TRUE
	),
	(
		'equalizers',
		'has',
		'An <i>equalizer</i> of a pair of morphisms $f,g : A \to B$ is an object $E$ with a morphism $e : E \to A$ such that $f \circ e = g \circ e$ and which is universal with respect to this property. This property refers to the existence of equalizers.',
		'https://ncatlab.org/nlab/show/equalizer',
		'coequalizers',
		TRUE
	),
	(
		'coequalizers',
		'has',
		'A <i>coequalizer</i> of a pair of morphisms $f,g : A \to B$ is an object $C$ with a morphism $c : B \to C$ such that $c \circ f = c \circ g$ and which is universal with respect to this property. This property refers to the existence of coequalizers.',
		'https://ncatlab.org/nlab/show/coequalizer',
		'equalizers',
		TRUE
	),
	(
		'filtered limits',
		'has',
		'A category has <i>filtered limits</i> if it has limits of diagrams indexed by cofiltered categories.',
		'https://ncatlab.org/nlab/show/filtered+limit',
		'filtered colimits',
		TRUE
	),
	(
		'filtered colimits',
		'has',
		'A category has <i>filtered colimits</i> if it has colimits of diagrams indexed by filtered categories.',
		'https://ncatlab.org/nlab/show/filtered+colimit',
		'filtered limits',
		TRUE
	),
	(
		'directed limits',
		'has',
		'A category has <i>directed limits</i> if it has limits of diagrams indexed by codirected posets. This is actually equivalent to having filtered limits.',
		'https://ncatlab.org/nlab/show/directed+limit',
		'directed colimits',
		TRUE
	),
	(
		'directed colimits',
		'has',
		'A category has <i>directed colimits</i> if it has colimits of diagrams indexed by directed posets. This is actually equivalent to having filtered colimits. Directed colimits are (somewhat confusingly) also known as <i>inverse limits</i>.',
		'https://ncatlab.org/nlab/show/directed+colimit',
		'directed limits',
		TRUE
	),
	(
		'sequential limits',
		'has',
		'A category has <i>sequential limits</i> if it has limits of diagrams of the following form: $\cdots \bullet \to \bullet \to \bullet$',
		'https://ncatlab.org/nlab/show/sequential+limit',
		'sequential colimits',
		TRUE
	),
	(
		'sequential colimits',
		'has',
		'A category has <i>sequential colimits</i> if it has colimits of diagrams of the following form: $\bullet \to \bullet \to \bullet \to \cdots$',
		'https://ncatlab.org/nlab/show/sequential+colimit',
		'sequential limits',
		TRUE
	),
	(
		'connected limits',
		'has',
		'A category has <i>connected limits</i> if it has limits of diagrams indexed by connected categories.',
		'https://ncatlab.org/nlab/show/connected+limit',
		'connected colimits',
		TRUE
	),
	(
		'connected colimits',
		'has',
		'A category has <i>connected colimits</i> if it has colimits of diagrams indexed by connected categories.',
		'https://ncatlab.org/nlab/show/connected+colimit',
		'connected limits',
		TRUE
	),
	(
		'pointed',
		'is',
		'A category is <i>pointed</i> when it has a zero object, i.e. an object which is both initial and terminal.',
		'https://ncatlab.org/nlab/show/pointed+category',
		'pointed',
		TRUE
	),
	(
		'strict initial object',
		'has a',
		'A <i>strict initial object</i> is an initial object $0$ such that every morphism $A \to 0$ is an isomorphism. This property refers to the existence of a strict initial object.',
		'https://ncatlab.org/nlab/show/strict+initial+object',
		'strict terminal object',
		TRUE
	),
	(
		'strict terminal object',
		'has a',
		'A <i>strict terminal object</i> is a terminal object $1$ such that every morphism $1 \to A$ is an isomorphism. This property refers to the existence of a strict terminal object.',
		'https://ncatlab.org/nlab/show/strict+terminal+object',
		'strict initial object',
		TRUE
	),
	(
		'infinitary distributive',
		'is',
		'A category is <i>infinitary distributive</i> if it has finite products, all small coproducts, and for every object $A$ the functor $A \times -$ preserves all small coproducts. Concretely, for every family of objects $(B_i)$ the canonical morphism $\coprod_i (A \times B_i) \to A \times \coprod_i B_i$ must be an isomorphism.',
		'https://ncatlab.org/nlab/show/distributive+category',
		'infinitary codistributive',
		TRUE
	),
	(
		'distributive',
		'is',
		'A category is <i>distributive</i> if it has finite products, finite coproducts, and for every object $A$ the functor $A \times -$ preserves finite coproducts. Concretely, for every finite family of objects $(B_i)$ the canonical morphism $\coprod_i (A \times B_i) \to A \times \coprod_i B_i$ must be an isomorphism.',
		'https://ncatlab.org/nlab/show/distributive+category',
		'codistributive',
		TRUE
	),
	(
		'infinitary codistributive',
		'is',
		'A category is <i>infinitary codistributive</i> if it has finite coproducts, all small products, and for every object $A$ the functor $A \sqcup -$ preserves all small products. Concretely, for every family of objects $(B_i)$ the canonical morphism $A \sqcup \prod_i B_i \to \prod_i (A \sqcup B_i)$ must be an isomorphism.' ,
		NULL,
		'infinitary distributive',
		TRUE
	),
	(
		'codistributive',
		'is',
		'A category is <i>codistributive</i> if it has finite coproducts, finite products, and for every object $A$ the functor $- \sqcup A$ preserves finite products. Concretely, for every finite family of objects $(B_i)$ the canonical morphism $A \sqcup \prod_i B_i \to \prod_i (A \sqcup B_i)$ must be an isomorphism.',
		NULL,
		'distributive',
		TRUE
	),
	(
		'exact filtered colimits',
		'has',
		'In a category $\mathcal{C}$, which we assume to have filtered colimits and finite limits, we say that <i>filtered colimits are exact</i> if for every finite category $\mathcal{I}$ the functor $\lim : [\mathcal{I}, \mathcal{C}] \to \mathcal{C}$ preserves filtered colimits. Equivalently, for every diagram $X : \mathcal{I} \times \mathcal{J} \to \mathcal{C}$, where $\mathcal{I}$ is finite and $\mathcal{J}$ is filtered, the canonical morphism $\mathrm{colim}_{j} \lim_{i} X(i,j) \to \lim_{i} \mathrm{colim}_j X(i,j)$ is an isomorphism.',
		'https://ncatlab.org/nlab/show/commutativity+of+limits+and+colimits',
		NULL,
		TRUE
	),
	(
		'disjoint finite coproducts',
		'has',
		'A category has <i>disjoint finite coproducts</i> if it has finite coproducts, for every pair of objects $A,B$ the coproduct inclusions $A \rightarrow A+B \leftarrow B$ are monomorphisms, and the pullback $A \times_{A + B} B$ exists and is given by the initial object $0$.',
		'https://ncatlab.org/nlab/show/disjoint+coproduct',
		NULL,
		TRUE
	),
	(
		'disjoint coproducts',
		'has',
		'A category has <i>disjoint coproducts</i> if it has coproducts, the coproduct inclusions $A_i \to \coprod_{i \in I} A_i$ are monomorphisms, and the pullback of the inclusions $A_i \to \coprod_{i \in I} A_i$ and $A_j \to \coprod_{i \in I} A_i$ for $i \neq j$ exists and is given by the initial object $0$.',
		'https://ncatlab.org/nlab/show/disjoint+coproduct',
		NULL,
		TRUE
	),
	(
		'wide pullbacks',
		'has',
		'A category $\mathcal{C}$ has <i>wide pullbacks</i> if for every object $S$ the slice category $\mathcal{C}/S$ has arbitrary products.',
		'https://ncatlab.org/nlab/show/wide+pullback',
		'wide pushouts',
		TRUE
	),
	(
		'wide pushouts',
		'has',
		'A category $\mathcal{C}$ has <i>wide pushouts</i> if for every object $S$ the coslice category $S/\mathcal{C}$ has arbitrary coproducts.',
		'https://ncatlab.org/nlab/show/wide+pushout',
		'wide pullbacks',
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

    -- properties related to size constraints

	(
		'small',
		'is',
		'A category is <i>small</i> when the collection of objects and the collection of morphisms is a set, i.e. small.',
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
		'A category is <i>locally small</i> when for every pair of objects $A,B$ the collection of morphisms $A \to B$ is a set. (Here, we work with a set-theoretic foundation in which there are sets and collections. Categories are based on collections of objects and morphisms.)',
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

    -- other properties
	(
		'inhabited',
		'is',
		'A category is <i>inhabited</i> (or <i>non-empty</i>) if it has at least one object.',
		'https://ncatlab.org/nlab/show/inhabited+set',
		'inhabited',
		TRUE
	),
	(
		'trivial',
		'is',
		'A category is <i>trivial</i> if it is equivalent to the trivial category (with just one object and just one morphism). Equivalently, there is an initial object $0$ such that for every object $A$ the unique morphism $0 \to A$ is an isomorphism. Notice that we do not demand that the category is isomorphic to the trivial category. As a consequence, every inhabited indiscrete category is trivial in our sense.',
		'https://ncatlab.org/nlab/show/terminal+category',
		'trivial',
		TRUE
	),
	(
		'finitary algebraic',
		'is',
		'A category is <i>finitary algebraic</i> if it is equivalent to the category of models of a finitary algebraic theory. This is also known as a variety of finitary algebras.',
		'https://ncatlab.org/nlab/show/algebraic+category',
		NULL,
		TRUE
	),
	(
		'self-dual',
		'is',
		'A category is <i>self-dual</i> if it is equivalent to its opposite (or dual) category.',
		'https://ncatlab.org/nlab/show/opposite+category',
		'self-dual',
		TRUE
	),
	(
		'groupoid',
		'is a',
		'A <i>groupoid</i> is a category in which every morphism is an isomorphism.',
		'https://ncatlab.org/nlab/show/groupoid',
		'groupoid',
		TRUE
	),
	(
		'thin',
		'is',
		'A category is <i>thin</i> when between any pair of objects there is at most one morphism. Such categories correspond to preordered collections of objects.',
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
		'A category is <i>essentially discrete</i> if it is equivalent to a discrete category. Equivalently, it is a thin groupoid. Notice that the nLab calls this property simply "discrete". In contrast to being discrete, clearly this property is invariant under equivalences of categories. An essentially discrete category is the same as a <i>setoid</i> (a set equipped with an equivalence relation).',
		'https://ncatlab.org/nlab/show/discrete+category',
		'essentially discrete',
		TRUE
	),
	(
		'zero morphisms',
		'has',
		'A category has <i>zero morphisms</i> if for every pair of objects $A,B$ there is a distinguished morphism $0_{A,B} : A \to B$, called the zero morphism, such that we have $f \circ 0_{A,B} = 0_{A,C}$ and $0_{B,C} \circ g = 0_{A,C}$ for all morphisms $f : B \to C$ and $g : A \to B$. The zero morphisms are unique if they exist, hence this is actually a property of the category.',
		'https://ncatlab.org/nlab/show/zero+morphism',
		'zero morphisms',
		TRUE
	),
	(
		'preadditive',
		'is',
		'A category is <i>preadditive</i> when it is locally essentially small* and each hom-set carries the structure of an abelian group such that the composition is bilinear. Notice that "preadditive" is an extra structure. The property here just says that some preadditive structure exists.<br>*We demand this instead of the more common "locally small" to ensure that preadditive categories are invariant under equivalences of categories.',
		'https://ncatlab.org/nlab/show/Ab-enriched+category',
		'preadditive',
		TRUE
	),
	(
		'additive',
		'is',
		'A category is <i>additive</i> if it is preadditive and has finite products (equivalently, finite coproducts). Note that in the context of finite products, the preadditive structure <a href="https://mathoverflow.net/questions/502067" target="_blank">is unique</a>.',
		'https://ncatlab.org/nlab/show/additive+category',
		'additive',
		TRUE
	),
	(
		'abelian',
		'is',
		'A category is <i>abelian</i> if it is additive, every morphism has a kernel and a cokernel, and every monomorphism and epimorphism is normal. Equivalently, it is additive, has equalizers and coequalizers, and it is mono-regular and epi-regular. As opposed to many other concepts of categories, being abelian turns out to be a mere property. For example, monoidal not just a property.',
		'https://ncatlab.org/nlab/show/abelian+category',
		'abelian',
		TRUE
	),
	(
		'split abelian',
		'is',
		'A category is <i>split abelian</i> if it is abelian and every short exact sequence splits. Equivalently, every object is projective. Equivalently, every object is injective.',
		'https://ncatlab.org/nlab/show/split+exact+sequence',
		'split abelian',
		TRUE
	),
	(
		'Grothendieck abelian',
		'is',
		'A category is <i>Grothendieck abelian</i> if it is abelian, has coproducts (and is therefore cocomplete), a generator, and filtered colimits commute with finite limits. These categories play an important role in homological algebra.',
		'https://ncatlab.org/nlab/show/Grothendieck+category',
		NULL,
		TRUE
	),	
	(
		'locally finitely presentable',
		'is',
		'A category is <i>locally finitely presentable</i> if it is locally essentially small*, cocomplete, and there is a set $S$ of finitely presentable objects such that every object is a filtered colimit of objects in $S$. This is the same as being locally $\aleph_0$-presentable.<br>*Many authors assume the category to be locally small, but this is inconvenient since then locally finitely presentable categories would not be invariant under equivalences of categories.',
		'https://ncatlab.org/nlab/show/locally+finitely+presentable+category',
		NULL,
		TRUE
	),
	(
		'locally presentable',
		'is',
		'Let $\kappa$ be a regular cardinal. A category is <i>locally $\kappa$-presentable</i> if it is locally essentially small*, cocomplete, and there is a set of $\kappa$-presentable objects $S$ such that every object is a $\kappa$-filtered colimit of objects in $S$. A category is <i>locally presentable</i> if it is locally $\kappa$-presentable for some regular cardinal $\kappa$.<br>*Many authors assume the category to be locally small, but this is inconvenient since then locally presentable categories would not be invariant under equivalences of categories.',
		'https://ncatlab.org/nlab/show/locally+presentable+category',
		NULL,
		TRUE
	),
	(
		'locally ℵ₁-presentable',
		'is',
		'This is the special case of the notion of a locally $\kappa$-presentable, where $\kappa = \aleph_1$ is the first uncountable cardinal.',
		'https://ncatlab.org/nlab/show/locally+presentable+category',
		NULL,
		TRUE
	),
	(
		'subobject classifier',
		'has a',
		'A category $\mathcal{C}$ has a <i>subobject classifier</i> if it has finite limits and a monomorphism $\top : 1 \to \Omega$ from the terminal object such that for every monomorphism $m : A \to B$ there is a unique morphism $\chi_m : B \to \Omega$ such that $B \leftarrow A \rightarrow 1$ is the pullback of $B \rightarrow \Omega \leftarrow 1$. Equivalently, the functor $\mathrm{Sub} : \mathcal{C}^{\mathrm{op}} \to \mathbf{Set}^+$ is representable.',
		'https://ncatlab.org/nlab/show/subobject+classifier',
		NULL,
		TRUE
	),
	(
		'elementary topos',
		'is an',
		'An <i>elementary topos</i> is a cartesian closed category with finite limits and a subobject classifier.',
		'https://ncatlab.org/nlab/show/topos',
		NULL,
		TRUE
	),
	(
		'Grothendieck topos',
		'is a',
		'A <i>Grothendieck topos</i> is a category that is equivalent to the category of sheaves on a site.',
		'https://ncatlab.org/nlab/show/Grothendieck+topos',
		NULL,
		TRUE
	),
	(
		'connected',
		'is',
		'A category is <i>connected</i> if it is inhabited and every two objects can be joined via a zig-zag path of morphisms. Equivalently, $\mathcal{C}$ is connected if $\mathcal{C} \simeq \coprod_{i \in I} \mathcal{C}_i$ implies $\mathcal{C}_i \simeq 0$ for some $i$.',
		'https://ncatlab.org/nlab/show/connected+category',
		'connected',
		TRUE
	),
	(
		'strongly connected',
		'is',
		'A category is <i>strongly connected</i> if it is inhabited and every two objects $A,B$ can be joined via a morphism: there is a morphism $A \to B$ or there is a morphism $B \to A$. Notice that this is stronger than being connected, and that posets with this property are precisely the inhabited totally ordered sets.',
		NULL,
		'strongly connected',
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
		'generator',
		'has a',
		'An object $G$ of a category is called a <i>generator</i> if for every pair of parallel morphisms $f,g : A \to B$, $f = g$ holds if for every morphism $h : G \to A$ we have $f \circ h = g \circ h$. Equivalently, the functor $\mathrm{Hom}(G,-) : \mathcal{C} \to \mathbf{Set}^+$ is faithful. This property refers to the existence of a generator.',
		'https://ncatlab.org/nlab/show/separator',
		'cogenerator',
		TRUE
	),
	(
		'cogenerator',
		'has a',
		'An object $Q$ of a category is called a <i>cogenerator</i> if for every pair of parallel morphisms $f,g : A \to B$, $f = g$ holds if for every morphism $h : B \to Q$ we have $h \circ f = h \circ g$. Equivalently, the functor $\mathrm{Hom}(-,Q) : \mathcal{C}^{\mathrm{op}} \to \mathbf{Set}^+$ is faithful. This property refers to the existence of a cogenerator.',
		'https://ncatlab.org/nlab/show/cogenerator',
		'generator',
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
		'A category is <i>Cauchy complete</i> if every idempotent splits. That is, every idempotent endomorphism $e : X \to X$ (that is, $e^2 = e$) may be written as $e = i \circ p$ for some morphisms $p : X \to Y$ and $i : Y \to X$ with $p \circ i = \mathrm{id}_Y$. Equivalently, the pair $e,\mathrm{id}_X : X \rightrightarrows X$ has an equalizer (or coequalizer).',
		'https://ncatlab.org/nlab/show/Cauchy+complete+category',
		'Cauchy complete',
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
		'Malcev',
		'is',
		'A category is <i>Malcev</i> when it has finite limits and every internal reflexive relation is an internal equivalence relation: That is, if $R \subseteq X^2$ is a subobject with $\Delta_X \subseteq R$, then $R$ is symmetric and transitive. The dual of an elementary topos is Malcev.',
		'https://ncatlab.org/nlab/show/Malcev+category',
		NULL,
		TRUE
	);