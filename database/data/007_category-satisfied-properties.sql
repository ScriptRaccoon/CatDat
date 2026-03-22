CREATE TEMP TABLE category_properties (
    category_id TEXT NOT NULL,
    property_id TEXT NOT NULL,
    reason TEXT
);

INSERT INTO category_properties (
	category_id,
	property_id,
	reason
)
VALUES
	-- basic categories
	(
		'Set',
		'locally small',
		'The collection of maps between two sets $X,Y$ is a subset of $X \times Y$ and therefore a set.'
	),
	(
		'Set',
		'Grothendieck topos',
		'It is equivalent to the category of sheaves on a one-point space.'
	),
	(
		'Set',
		'strongly connected',
		'Every nonempty set is weakly terminal.'
	),
	(
		'Set',
		'finitary algebraic',
		'Use the empty algebraic theory.'
	),
	(
		'Ab',
		'locally small',
		'There is a forgetful functor $\mathbf{Ab} \to \mathbf{Set}$ and $\mathbf{Set}$ is locally small.'
	),
	(
		'Ab',
		'abelian',
		'standard'
	),
	(
		'Ab',
		'finitary algebraic',
		'Take the algebraic theory of a commutative group.'
	),
	(
		'Top',
		'locally small',
		'There is a forgetful functor $\mathbf{Top} \to \mathbf{Set}$ and $\mathbf{Set}$ is locally small.'
	),
	(
		'Top',
		'complete',
		'Take the limit of the underlying sets and endow it with the coarsest topology making all projections continuous.'
	),
	(
		'Top',
		'cocomplete',
		'Take the colimit of the underlying sets and endow it with the finest topology making all inclusions continuous.'
	),
	(
		'Top',
		'well-powered',
		'This is clear from the classification of monomorphisms as injective continuous maps.'
	),
	(
		'Top',
		'well-copowered',
		'This is clear from the classification of epimorphisms as surjective continuous maps.'
	),
	(
		'Top',
		'infinitary distributive',
		'The canonical continuous map $\coprod_i (X \times Y_i) \to X \times \coprod_{i \in I} Y_i$ is bijective since $\mathbf{Set}$ is infinitary distributive, and one easily checks with the definitions of product and coproduct topologies that it maps open sets to open sets.'
	),
	(
		'Top',
		'generator',
		'The one-point space is a generator since it represents the forgetful functor $\mathbf{Top} \to \mathbf{Set}$.'
	),
	(
		'Top',
		'cogenerator',
		'It is easily checked that the indiscrete two-point space is a cogenerator.'
	),
	(
		'Top',
		'disjoint coproducts',
		'This follows easily from the corresponding fact for sets.'
	),
	(
		'Top',
		'strongly connected',
		'Every nonempty space is weakly terminal.'
	),
	(
		'Grp',
		'locally small',
		'There is a forgetful functor $\mathbf{Grp} \to \mathbf{Set}$ and $\mathbf{Set}$ is locally small.'
	),
	(
		'Grp',
		'pointed',
		'The trivial group is a zero object.'
	),
	(
		'Grp',
		'finitary algebraic',
		'Take the algebraic theory of a group.'
	),
	(
		'Grp',
		'mono-regular',
		'See Prop. 4.2 at the <a href="https://ncatlab.org/nlab/show/regular+monomorphism#Examples" target="_blank">nLab</a>.'
	),
	(
		'Grp',
		'disjoint coproducts',
		'It follows from the normal form of the elements of coproducts of groups that the inclusions $G \to G \sqcup H \leftarrow H$ are injective (hence, monomorphisms) and that their intersection is trivial.'
	),
	(
		'Grp',
		'epi-regular',
		'This holds since every epimorphism is surjective, and surjective homomorphism $A \to B$ is the coequalizer of its kernel pair $A \times_B A \rightrightarrows A$.'
	),
	(
		'Grp',
		'Malcev',
		'See Example 2.2.4 in <a href="https://ncatlab.org/nlab/show/Malcev,+protomodular,+homological+and+semi-abelian+categories" target="_blank">Malcev, protomodular, homological and semi-abelian categories</a>.'
	),
	(
		'Vect',
		'locally small',
		'There is a forgetful functor $\mathbf{Vect} \to \mathbf{Set}$ and $\mathbf{Set}$ is locally small.'
	),
	(
		'Vect',
		'split abelian',
		'It is a fact from linear algebra that every subspace has a complement.'
	),
	(
		'Vect',
		'finitary algebraic',
		'Take the algebraic theory of a vector space.'
	),
	(
		'Ring',
		'locally small',
		'There is a forgetful functor $\mathbf{Ring} \to \mathbf{Set}$ and $\mathbf{Set}$ is locally small.'
	),
	(
		'Ring',
		'finitary algebraic',
		'Take the algebraic theory of a ring.'
	),
	(
		'Ring',
		'strict terminal object',
		'If $f : 0 \to R$ is a homomorphism, then $R$ satisfies $1=f(1)=f(0)=0$, so that $R=0$.'
	),
	(
		'Ring',
		'Malcev',
		'follows in the same way as for (additive) groups'
	),
	(
		'Alg(R)',
		'locally small',
		'There is a forgetful functor $\mathbf{Alg}(R) \to \mathbf{Set}$ and $\mathbf{Set}$ is locally small.'
	),
	(
		'Alg(R)',
		'finitary algebraic',
		'Take the algebraic theory of an $R$-algebra.'
	),
	(
		'Alg(R)',
		'strict terminal object',
		'If $f : 0 \to A$ is an algebra homomorphism, then $A$ satisfies $1=f(1)=f(0)=0$, so that $A=0$.'
	),
	(
		'Alg(R)',
		'Malcev',
		'follows in the same way as for (additive) groups'
	),
	(
		'CRing',
		'locally small',
		'There is a forgetful functor $\mathbf{CRing} \to \mathbf{Set}$ and $\mathbf{Set}$ is locally small.'
	),
	(
		'CRing',
		'finitary algebraic',
		'Take the algebraic theory of a commutative ring.'
	),
	(
		'CRing',
		'strict terminal object',
		'If $f : 0 \to R$ is a homomorphism, then $R$ satisfies $1=f(1)=f(0)=0$, so that $R=0$.'
	),
	(
		'CRing',
		'Malcev',
		'follows in the same way as for (additive) groups'
	),
	(
		'CRing',
		'codistributive',
		'Coproducts of commutative rings are constructed using the tensor product of abelian groups. For finite families, the canonical homomorphism $A \otimes \prod_i B_i \to \prod_i (A \otimes B_i)$ is an isomorphism: It suffices to check this for for the underlying abelian groups, but it is well-known that the tensor product commutes with direct sums, hence with finite products.'
	),
	(
		'CAlg(R)',
		'locally small',
		'There is a forgetful functor $\mathbf{CAlg(R)} \to \mathbf{Set}$ and $\mathbf{Set}$ is locally small.'
	),
	(
		'CAlg(R)',
		'finitary algebraic',
		'Take the algebraic theory of a commutative ring.'
	),
	(
		'CAlg(R)',
		'strict terminal object',
		'If $f : 0 \to R$ is a homomorphism, then $R$ satisfies $1=f(1)=f(0)=0$, so that $R=0$.'
	),
	(
		'CAlg(R)',
		'Malcev',
		'follows in the same way as for (additive) groups'
	),
	(
		'CAlg(R)',
		'codistributive',
		'Coproducts of commutative algebras are constructed using the tensor product of modules. For finite families, the canonical homomorphism $A \otimes_R \prod_i B_i \to \prod_i (A \otimes_R B_i)$ is an isomorphism: It suffices to check this for for the underlying $R$-modules, but it is well-known that the tensor product commutes with direct sums, hence with finite products.'
	),
	(
		'Rng',
		'locally small',
		'There is a forgetful functor $\mathbf{Rng} \to \mathbf{Set}$ and $\mathbf{Set}$ is locally small.'
	),
	(
		'Rng',
		'finitary algebraic',
		'Take the algebraic theory of a rng.'
	),
	(
		'Rng',
		'pointed',
		'The zero ring is a zero object.'
	),
	(
		'Rng',
		'disjoint coproducts',
		'The coproduct of two rngs $R,S$ has as underlying additive group $R \oplus S \oplus (R \otimes S) \oplus (S \otimes R) \oplus \cdots$ from which the claim easily follows.'
	),
	(
		'Rng',
		'Malcev',
		'follows in the same way as for (additive) groups'
	),
	(
		'Set*',
		'locally small',
		'There is a forgetful functor $\mathbf{Set}_* \to \mathbf{Set}$ and $\mathbf{Set}$ is locally small.'
	),
	(
		'Set*',
		'pointed',
		'The singleton set is a zero object.'
	),
	(
		'Set*',
		'finitary algebraic',
		'Take the algebraic theory with just one constant.'
	),
	(
		'Set*',
		'subobject classifier',
		'The pointed set $(\{0,1\},1)$ is a subobject classifier.'
	),
	(
		'Set*',
		'cogenerator',
		'The pointed set $(\{0,1\},1)$ is a cogenerator.'
	),
	(
		'Set*',
		'disjoint coproducts',
		'This follows easily from the description of coproducts as wedge sums.'
	),
	(
		'Set*',
		'epi-regular',
		'Every epimorphism is surjective for this category, and in an algebraic category every surjective homomorphism is a regular epimorphism.'
	),
	(
		'Mon',
		'locally small',
		'There is a forgetful functor $\mathbf{Mon} \to \mathbf{Set}$ and $\mathbf{Set}$ is locally small.'
	),
	(
		'Mon',
		'pointed',
		'The trivial monoid is a zero object.'
	),
	(
		'Mon',
		'finitary algebraic',
		'Take the algebraic of a monoid.'
	),
	(
		'Mon',
		'disjoint coproducts',
		'It follows from the normal form of the elements of coproducts of monoids that the inclusions $G \to G \sqcup H \leftarrow H$ are injective (hence, monomorphisms) and that their intersection is trivial.'
	),
	(
		'CMon',
		'locally small',
		'There is a forgetful functor $\mathbf{CMon} \to \mathbf{Set}$ and $\mathbf{Set}$ is locally small.'
	),
	(
		'CMon',
		'pointed',
		'The trivial monoid is a zero object.'
	),
	(
		'CMon',
		'finitary algebraic',
		'Take the algebraic of a commutative monoid.'
	),
	(
		'CMon',
		'disjoint coproducts',
		'This follows from the description of the coproduct as a form of direct sum (very similar to $\mathbf{Ab}$).'
	),
	(
		'CMon',
		'biproducts',
		'This follows from the explicit construction of coproducts and products.'
	),
	(
		'Pos',
		'locally small',
		'There is a forgetful functor $\mathbf{Pos} \to \mathbf{Set}$ and $\mathbf{Set}$ is locally small.'
	),
	(
		'Pos',
		'locally finitely presentable',
		'See <a href="https://ncatlab.org/nlab/show/Locally+Presentable+and+Accessible+Categories" target="_blank">Adamek-Rosicky</a>, Example 1.10.'
	),
	(
		'Pos',
		'cartesian closed',
		'For partial orders $P,Q$ we endow $\hom(P,Q)$ with the partial order in which $f \leq g$ holds iff $f(p) \leq g(p)$ for all $p \in P$. The universal evaluation map is $\hom(P,Q) \times P \to Q$, $(f,p) \mapsto f(p)$, it is order-preserving, and it satisfies the universal property.'
	),
	(
		'Pos',
		'cogenerator',
		'We prove that the poset $\{0 < 1 \}$ is a cogenerator: Let $P$ be a poset and $a,b \in P$ be two elements such that $f(a) = f(b)$ for all order-preserving maps $f : P \to \{0 < 1 \}$. This means that $a$ and $b$ lie in the same upper sets. In particular, $b$ lies in the upper set generated by $a$, meaning %$a \leq b$, and similarly we deduce $b \leq a$. Thus, $a = b$.'
	),
	(
		'Pos',
		'disjoint coproducts',
		'This follows easily from the corresponding fact for sets, since the coproduct of posets is built using the disjoint union.'
	),
	(
		'Pos',
		'strongly connected',
		'Every nonempty preorder is weakly terminal.'
	),
	(
		'M-Set',
		'locally small',
		'There is a forgetful functor $M{-}\mathbf{Set} \to \mathbf{Set}$ and $\mathbf{Set}$ is locally small.'
	),
	(
		'M-Set',
		'Grothendieck topos',
		'It is the category of sheaves on the opposite of the one-object category associated to $M$.'
	),
	(
		'M-Set',
		'finitary algebraic',
		'Take the algebraic theory of an $M$-sets (having a unary operation for each $m \in M$).'
	),
	(
		'R-Mod',
		'locally small',
		'There is a forgetful functor $R{-}\mathbf{Mod} \to \mathbf{Set}$ and $\mathbf{Set}$ is locally small.'
	),
	(
		'R-Mod',
		'abelian',
		'standard'
	),
	(
		'R-Mod',
		'finitary algebraic',
		'Take the algebraic theory of an $R$-module (given by the algebraic theory of an abelian group and for each $r \in R$ a unary operation).'
	),
	(
		'R-Mod_div',
		'locally small',
		'There is a forgetful functor $R{-}\mathbf{Mod} \to \mathbf{Set}$ and $\mathbf{Set}$ is locally small.'
	),
	(
		'R-Mod_div',
		'split abelian',
		'It is a standard fact that the category of $R$-modules is abelian for any ring $R$. If $R$ is a division ring, then by linear algebra every $R$-module has a basis, hence is projective, so that every short exact sequence splits.'
	),
	(
		'R-Mod_div',
		'finitary algebraic',
		'Take the algebraic theory of an $R$-module (given by the algebraic theory of an abelian group and for each $r \in R$ a unary operation).'
	),
	(
		'Rel',
		'locally small',
		'The set of morphisms $X \to Y$ is the set $P(X \times Y)$.'
	),
	(
		'Rel',
		'self-dual',
		'There is an isomorphism $\mathbf{Rel} \to \mathbf{Rel}^{\mathrm{op}}$ that is the identity on objects (sets) and maps a relation $R \subseteq X \times Y$ to the opposite relation $R^o \subseteq Y \times X$ defined by $R^o := \{(y,x) : (x,y) \in R \}$.'
	),
	(
		'Rel',
		'pointed',
		'The empty set is clearly both initial and terminal.'
	),
	(
		'Rel',
		'generator',
		'One checks that the the one-point set is a generator.'
	),
	(
		'Rel',
		'disjoint coproducts',
		'It is an easy exercise to deduce this from the corresponding fact for sets and that sets form a distributive category.'
	),
	(
		'Rel',
		'well-powered',
		'Any relation $R : A \to B$ induces an injective map $P(A) \to P(B)$, so that in particular there is an injective map $A \to P(B)$.'
	),
	(
		'Rel',
		'balanced',
		'See <a href="https://math.stackexchange.com/questions/5030393" target="_blank">MSE/5030393</a>.'
	),
	(
		'Rel',
		'biproducts',
		'This is a consequence of the description of coproducts and products, both are disjoint unions (even for infinite families).'
	),

	-- categories of "finite" objects
	(
		'FinSet',
		'locally small',
		'There is a forgetful functor $\mathbf{FinSet} \to \mathbf{Set}$ and $\mathbf{Set}$ is locally small.'
	),
	(
		'FinSet',
		'essentially small',
		'Every finite set is isomorphic to some $[n] = \{1,\dotsc,n\}$ for some $n \in \mathbb{N}$.'
	),
	(
		'FinSet',
		'elementary topos',
		'This follows easily from the fact that sets form an elementary topos.'
	),
	(
		'FinSet',
		'generator',
		'The one-point set is a generator since it represents the forgetful functor $\mathbf{FinSet} \to \mathbf{Set}$.'
	),
	(
		'FinSet',
		'strongly connected',
		'Every nonempty finite set is weakly terminal.'
	),
	(
		'FinSet',
		'cogenerator',
		'The two-element set is a cogenerator.'
	),
	(
		'FinAb',
		'locally small',
		'There is a forgetful functor $\mathbf{FinAb} \to \mathbf{Set}$ and $\mathbf{Set}$ is locally small.'
	),
	(
		'FinAb',
		'essentially small',
		'The underlying set of a finite structure can be chosen to be a subset of $\mathbb{N}$.'
	),
	(
		'FinAb',
		'abelian',
		'follows from the fact for abelian groups'
	),
	(
		'FinAb',
		'self-dual',
		'Pontrjagin duality'
	),
	(
		'Abfg',
		'locally small',
		'There is a forgetful functor $\mathbf{FinAb} \to \mathbf{Set}$ and $\mathbf{Set}$ is locally small.'
	),
	(
		'Abfg',
		'essentially small',
		'Every finitely generated abelian group is isomorphic to a group of the form $\mathbb{Z}^n / U$, where $n \in \mathbb{N}$ and $U$ is a subgroup of $\mathbb{Z}^n$. And these constitute a set.'
	),
	(
		'Abfg',
		'abelian',
		'This follows from the fact for abelian groups and the fact that subgroups of finitely generated abelian groups are also finitely generated.'
	),
	(
		'Abfg',
		'generator',
		'The group $\mathbb{Z}$ is a generator since it represents the forgetful functor to $\mathbf{Set}$.'
	),

	(
		'B',
		'locally small',
		'There is a forgetful functor $\mathbb{B} \to \mathbf{Set}$ and $\mathbf{Set}$ is locally small.'
	),
	(
		'B',
		'essentially small',
		'Every finite set is isomorphic to some $[n] = \{1,\dotsc,n\}$ for some $n \in \mathbb{N}$.'
	),
	(
		'B',
		'groupoid',
		'trivial'
	),
	(
		'B',
		'inhabited',
		'trivial'
	),
	(
		'FI',
		'locally small',
		'There is a forgetful functor $\mathbf{FI} \to \mathbf{Set}$ and $\mathbf{Set}$ is locally small.'
	),
	(
		'FI',
		'initial object',
		'Take the empty set.'
	),
	(
		'FI',
		'left cancellative',
		'trivial'
	),
	(
		'FI',
		'essentially small',
		'Every finite set is isomorphic to some $[n] = \{1,\dotsc,n\}$ for some $n \in \mathbb{N}$.'
	),
	(
		'FI',
		'generator',
		'The one-point set is a generator since it represents the forgetful functor $\mathbf{FI} \to \mathbf{Set}$.'
	),
	(
		'FI',
		'connected limits',
		NULL
	),
	(
		'FI',
		'mono-regular',
		NULL
	),
	(
		'FI',
		'epi-regular',
		NULL
	),
	(
		'FS',
		'locally small',
		'There is a forgetful functor $\mathbf{FS} \to \mathbf{Set}$ and $\mathbf{Set}$ is locally small.'
	),
	(
		'FS',
		'essentially small',
		'Every finite set is isomorphic to some $[n] = \{1,\dotsc,n\}$ for some $n \in \mathbb{N}$.'
	),
	(
		'FS',
		'right cancellative',
		'trivial'
	),
	(
		'FS',
		'cogenerator',
		NULL
	),
	(
		'FS',
		'wide pushouts',
		NULL
	),
	(
		'FS',
		'coequalizers',
		NULL
	),
	(
		'FS',
		'mono-regular',
		NULL
	),
	(
		'FS',
		'epi-regular',
		NULL
	),

	-- tiny categories
	(
		'0',
		'preadditive',
		'This is vacuously true.'
	),
	(
		'0',
		'discrete',
		'trivial'
	),
	(
		'0',
		'binary products',
		'This is vacuously true.'
	),
	(
		'0',
		'finite',
		'trivial'
	),
	(
		'0',
		'locally cartesian closed',
		'This is vacuously true.'
	),
	(
		'1',
		'trivial',
		'trivial'
	),
	(
		'1',
		'finite',
		'trivial'
	),
	(
		'1',
		'discrete',
		'trivial'
	),
	(
		'2',
		'discrete',
		'trivial'
	),
	(
		'2',
		'finite',
		'trivial'
	),
	(
		'2',
		'inhabited',
		'trivial'
	),
	(
		'walking_morphism',
		'finitary algebraic',
		'Take the algebraic theory with no operations but with the equation $x=y$ that is supposed to hold for all elements $x,y$. The algebras for this theory are the empty set and the singleton set, hence we get the equivalence to $\{0 \to 1\}$.'
	),
	(
		'walking_morphism',
		'self-dual',
		'trivial'
	),
	(
		'walking_morphism',
		'finite',
		'trivial'
	),
	(
		'walking_morphism',
		'infinitary distributive',
		'Clearly, this category is (co)complete. Also, the functors $X \mapsto X \times 1 = X$ and $X \mapsto X \times 0 = 0$ are clearly cocontinuous.'
	),
	(
		'walking_morphism',
		'skeletal',
		'The two objects are not isomorphic'
	),
	(
		'walking_morphism',
		'strongly connected',
		'trivial'
	),
	(
		'walking_pair',
		'finite',
		'trivial'
	),
	(
		'walking_pair',
		'self-dual',
		'trivial'
	),
	(
		'walking_pair',
		'strongly connected',
		'trivial'
	),
	(
		'walking_pair',
		'generator',
		'It is easy to check that $0$ is a generator.'
	),
	(
		'walking_pair',
		'directed colimits',
		'Every directed diagram can be reduced to one of the three trivial diagrams $0 \to 0$, $0 \to 1$, $1 \to 1$, which have colimits $0$, $1$, resp. $1$.'
	),
	(
		'walking_pair',
		'left cancellative',
		'The two morphisms $0 \to 1$ are clearly monomorphisms.'
	),
	(
		'walking_pair',
		'skeletal',
		'The two objects are not isomorphic.'
	),
	(
		'walking_isomorphism',
		'trivial',
		'The inclusion $\{0\} \hookrightarrow \{0 \to 1\}$ is clearly an equivalence.'
	),
	(
		'walking_isomorphism',
		'finite',
		'trivial'
	),
	(
		'walking_composable_pair',
		'finite',
		'trivial'
	),
	(
		'walking_composable_pair',
		'strongly connected',
		'trivial'
	),
	(
		'walking_composable_pair',
		'skeletal',
		'trivial'
	),
	(
		'walking_composable_pair',
		'products',
		'trivial'
	),
	(
		'walking_composable_pair',
		'self-dual',
		'trivial'
	),

	-- geometric categories
	(
		'Sh(X)',
		'locally small',
		'easy'
	),
	(
		'Sh(X)',
		'Grothendieck topos',
		'by definition of a Grothendieck topos'
	),
	(
		'sSet',
		'locally small',
		'This follows from the general fact that $[\mathcal{C},\mathcal{D}]$ is locally small when $\mathcal{C}$ is small and $\mathcal{D}$ is locally small, here applied to $\mathcal{C} = \Delta^{\mathrm{op}}$ and $\mathcal{D} = \mathbf{Set}$.'
	),
	(
		'Sh(X,Ab)',
		'locally small',
		'easy'
	),
	(
		'Sh(X,Ab)',
		'Grothendieck abelian',
		'This is standard, see for example Theorem 18.1.6. in <a href="https://ncatlab.org/nlab/show/Categories+and+Sheaves" target="_blank">Kashiwara-Schapira</a>.'
	),
	(
		'sSet',
		'Grothendieck topos',
		'obvious'
	),
	(
		'sSet',
		'locally finitely presentable',
		'This follows from the fact that the free cocompletion of a small category is locally finitely presentable.'
	),
	(
		'Met',
		'locally small',
		'There is a forgetful functor $\mathbf{Met} \to \mathbf{Set}$ and $\mathbf{Set}$ is locally small.'
	),
	(
		'Met',
		'well-powered',
		'This follows since monomorphisms are injective.'
	),
	(
		'Met',
		'equalizers',
		'Just restrict the metric to the equalizer built from the sets.'
	),
	(
		'Met',
		'binary products',
		'The product of two metric spaces $(X,d)$, $(Y,d)$ is $(X \times Y,d)$ with $d((x_1,y_1),(x_2,x_2)) := \sup(d(x_1,x_2),d(y_1,y_2))$.' 
	),
	(
		'Met',
		'terminal object',
		'The one-point metric space is terminal.'
	),
	(
		'Met',
		'coequalizers',
		NULL
	),
	(
		'Met',
		'directed colimits',
		'Given a directed diagram $(X_i)$ of metric spaces, take the directed colimit $X$ of the underlying sets with the following metric: If $x,y \in X$, let $d(x,y)$ be infimum of all $d(x_i,y_i)$, where $x_i,y_i \in X_i$ are some preimages of $x,y$ in some $X_i$. This is only a pseudo-metric, so finally take the associated metric space (Kolmogorov quotient). The definition ensures that each $X_i \to X$ is non-expansive, and the universal property is easy to check.' 
	),
	(
		'Met',
		'strict initial object',
		'This is because the initial object is the empty metric space.'
	),
	(
		'Met',
		'generator',
		'The one-point metric space is a generator since it represents the forgetful functor $\mathbf{Met} \to \mathbf{Set}$.'
	),
	(
		'Met',
		'cogenerator',
		'We claim that $\mathbb{R}$ with the usual metric is a cogenerator. Let $a,b \in X$ be two points of a metric space such that $f(a)=f(b)$ for all non-expansive maps $f : X \to \mathbb{R}$. This applies in particular to $f(x) := d(a,x)$ and shows that $0=d(a,a)=d(a,b)$, so that $a=b$.' 
	),
	(
		'Met',
		'well-copowered',
		'If $f : X \to Y$ is an epimorphism, then $f(X)$ is dense in $Y$ (see below). Hence, there is an injective map $Y \to X^{\mathbb{N}}$, which bounds the size of $Y$.'
	),
	(
		'Met_oo',
		'locally small',
		'There is a forgetful functor $\mathbf{Met}_{\infty} \to \mathbf{Set}$ and $\mathbf{Set}$ is locally small.'
	),
	(
		'Met_oo',
		'locally ℵ₁-presentable',
		'Example 4.5 in <a href="https://arxiv.org/abs/1504.02660" target="_blank">this preprint</a>'
	),
	(
		'Met_oo',
		'infinitary distributive',
		'This follows from the corresponding fact for topological spaces. Here, the coproduct metric takes value $\infty$ for points in distinct spaces.'
	),
	(
		'Met_oo',
		'cogenerator',
		'The proof is similar to $\mathbf{Met}$, a cogenerator is given by $\mathbb{R} \cup \{\infty\}$ with the metric in which $d(a,\infty)=\infty$ for $a \in \mathbb{R}$. Then one checks that the maps $d(a,-) : X \to \mathbb{R} \cup \{\infty\}$ are non-expansive and finishes as for $\mathbf{Met}$.'
	),
	(
		'Met_oo',
		'disjoint coproducts',
		'This easily follows from the corresponding fact for sets, since coproducts are built using disjoint unions.'
	),
	(
		'Met_c',
		'locally small',
		'There is a forgetful functor $\mathbf{Met}_c \to \mathbf{Set}$ and $\mathbf{Set}$ is locally small.'
	),
	(
		'Met_c',
		'equalizers',
		'Just restrict the metric to the equalizer built from the sets.'
	),
	(
		'Met_c',
		'disjoint coproducts',
		'This easily follows from the corresponding fact for sets, since coproducts are built using disjoint unions.'
	),
	(
		'Met_c',
		'well-powered',
		'follows easily from the fact that monomorphisms here are injective'
	),
	(
		'Met_c',
		'generator',
		'The one-point metric space is a generator since it represents the forgetful functor $\mathbf{Met}_c \to \mathbf{Set}$.'
	),
	(
		'Met_c',
		'cogenerator',
		'The same proof as for $\mathbf{Met}$ shows that $\mathbb{R}$ with the usual metric is a cogenerator.'
	),
	(
		'Met_c',
		'infinitary distributive',
		'This follows from the corresponding fact for topological spaces.'
	),
	(
		'Met_c',
		'countable products',
		 'For finite products, we take the cartesian product with, say, the sup-metric. The product of countably many metric spaces $(X_i,d_i)_{i \geq 0}$ is given by the cartesian product $\prod_{i \geq 0} X_i$ with the metric $d(x,y) := \sum_{i \geq 0} d_i(x_i,y_i)/(1 + d_i(x_i,y_i))$. See Engelking''s book <i>General Topology</i>.'
	),
	(
		'Met_c',
		'well-copowered',
		'If $f : X \to Y$ is an epimorphism, then $f(X)$ is dense in $Y$ (see below). Hence, there is an injective map $Y \to X^{\mathbb{N}}$, which bounds the size of $Y$.'
	),
	(
		'Man',
		'locally small',
		'There is a forgetful functor $\mathbf{Man} \to \mathbf{Set}$ and $\mathbf{Set}$ is locally small.'
	),
	(
		'Man',
		'well-powered',
		'This follows from the fact that monomorphisms are injective here.'
	),
	(
		'Man',
		'well-copowered',
		'This follows from the fact that epimorphisms have dense image (see below), which bounds the size of the codomain.'
	),
	(
		'Man',
		'distributive',
		'This follows from the corresponding fact for topological spaces.'
	),
	(
		'Man',
		'generator',
		'The $0$-dimensional one-point manifold is a generator since it represents the forgetful functor $\mathbf{Top} \to \mathbf{Set}$.'
	),
	(
		'Man',
		'cogenerator',
		'The manifold $\mathbb{R}$ is a cogenerator, since for every smooth manifold $M$ and points $p \neq q$ in $M$ there is a smooth function $f : M \to \mathbb{R}$ with $f(p) = 1$ and $f(q) = 0$ (John Lee, Introduction to Smooth Manifolds, Prop. 2.25).'
	),
	(
		'Man',
		'disjoint finite coproducts',
		'This follows from the corresponding fact for topological spaces.'
	),
	(
		'Man',
		'countable coproducts',
		'Take the usual disjoint union, which is clearly a smooth manifold, still second-countable. (Without that condition, all coproducts would exist.)'
	),
	(
		'Man',
		'Cauchy complete',
		'See Theorem 2.1 at the <a href="https://ncatlab.org/nlab/show/smooth+manifold" target="_blank">nLab</a>.'
	),

	(
		'LRS',
		'locally small',
		'For two ringed spaces $(X,O_X), (Y,O_Y)$, the collection of morphisms $X \to Y$ of ringed spaces is the collection $\prod_{f \in \hom(X,Y)} \hom(O_Y,f_* O_X)$, which is a set since $\hom(X,Y)$ is a set and each $\hom(O_Y,f_* O_X)$ is a set.'
	),
	(
		'LRS',
		'complete',
		'See <a href="https://arxiv.org/abs/1103.2139" target="_blank">Localization of ringed spaces</a> by W. Gillam. See also <a href="https://math.stackexchange.com/questions/1033675" target="_blank">MSE/1033675</a>.'
	),
    (
		'LRS',
		'cocomplete',
		'See Demazure-Gabriel''s "Groupes algébriques", I. §1. 1.6. Specifically, the forgetful functor to ringed spaces preserves colimits, and colimits of ringed spaces are built from colimits of topological spaces and limits of commutative rings, see <a href="https://math.stackexchange.com/questions/1646202" target="_blank">MSE/1646202</a>.'
	),
    (
        'LRS',
        'well-powered',
        'Let $f : X \to Y$ be a monomorphism of locally ringed spaces. I claim that $f$ is injective, from which the claim will follow. The diagonal $\Delta : X \to X \times_Y X$ is an isomorphism. By the explicit construction of fiber products, $X \times_Y X$ consists of triples $(x_1,x_2,\mathfrak{p})$ where $x_1,x_2 \in X$, $y := f(x_1) = f(x_2)$ and $\mathfrak{p}$ is a prime ideal in $k(x_1) \otimes_{k(y)} k(x_2)$. The map $\Delta$ is given by $\Delta(x) = \bigl(x,x,\ker(k(x) \otimes_{k(f(x))} k(x) \to k(x)\bigr)$, and it is bijective. This clearly implies that $f$ is injective (and that each tensor product $k(x) \otimes_{k(f(x))} k(x)$ has a unique prime ideal, namely the kernel mentioned).'
    ),
    (
        'LRS',
        'well-copowered',
        'It is enough to prove that every epimorphism of locally ringed spaces is surjective. The forgetful functor $\mathbf{LRS} \to \mathbf{RS}$ has a right adjoint (see <a href="https://arxiv.org/abs/1103.2139" target="_blank">Localization of ringed spaces</a> by W. Gillam), so it preserves epimorphisms. The forgetful functor $\mathbf{RS} \to \mathbf{Top}$ also has a right adjoint, namely $X \mapsto (X,\underline{\mathbb{Z}})$, so it also preserves epimorphisms.'
    ),
	(
		'LRS',
		'infinitary distributive',
		'See <a href="https://math.stackexchange.com/questions/5036488/" target="_blank">MSE/5036488</a>.'
	),
 	(
        'LRS',
        'disjoint coproducts',
        'This can easily be derived from the explicit construction of coproducts: The topological space is the disjoint union, the sheaf is the "product".'
    ),
	(
		'Sch',
		'locally small',
		'There is a forgetful functor $\mathbf{Sch} \to \mathbf{LRS}$ and $\mathbf{LRS}$ is locally small.'
	),
	(
		'Sch',
		'terminal object',
		'The scheme $\mathrm{Spec}(\mathbf{Z})$ is terminal.'
	),
	(
		'Sch',
		'pullbacks',
		'This is the well-known construction of the fiber product of schemes, see e.g. EGA I, Chap. I, Thm. 3.2.1.'
	),
    (
        'Sch',
        'disjoint coproducts',
        'This follows from the corresponding fact for locally ringed spaces.'
    ),
    (
        'Sch',
        'well-powered',
        'This is because every monomorphism of schemes is injective, so that the size of the underlying set of a subobject is bounded.'
    ),
	(
		'Sch',
		'infinitary distributive',
		'This follows from the corresponding fact for locally ringed spaces, see <a href="https://math.stackexchange.com/questions/5036488/" target="_blank">MSE/5036488</a>.'
	),
	(
		'Z',
		'complete',
		'follows immediately from the fact for $\mathbf{Set}$'
	),
	(
		'Z',
		'cocomplete',
		'follows immediately from the fact for $\mathbf{Set}$'
	),
	(
		'Z',
		'infinitary distributive',
		'follows immediately from the fact for $\mathbf{Set}$'
	),
	(
		'Z',
		'exact filtered colimits',
		'follows immediately from the fact for $\mathbf{Set}$'
	),
	(
		'Z',
		'disjoint coproducts',
		'follows immediately from the fact for $\mathbf{Set}$'
	),
	(
		'Z',
		'mono-regular',
		'follows immediately from the fact for $\mathbf{Set}$'
	),
	(
		'Z',
		'epi-regular',
		'follows immediately from the fact for $\mathbf{Set}$'
	),

	-- thin categories
	(
		'N',
		'small',
		'trivial'
	),
	(
		'N',
		'thin',
		'trivial'
	),
	(
		'N',
		'finitely cocomplete',
		'Finitely many natural numbers have a supremum natural number.'
	),
	(
		'N',
		'binary products',
		'Two natural numbers have a minimum.'
	),
	(
		'N',
		'connected limits',
		'Every non-empty set of natural numbers has a minimum.'
	),
	(
		'N',
		'skeletal',
		'The relation $\leq$ is antisymmetric.'
	),
	(
		'N',
		'strongly connected',
		'trivial'
	),
	(
		'On',
		'thin',
		'trivial'
	),
	(
		'On',
		'locally small',
		'trivial'
	),
	(
		'On',
		'cocomplete',
		'Every set of ordinal numbers has a supremum.'
	),
	(
		'On',
		'binary products',
		'For ordinal numbers $\alpha,\beta$ their minimum exists, it is $\alpha$ when $\alpha \leq \beta$ and $\beta$ otherwise.'
	),
	(
		'On',
		'connected limits',
		'Every non-empty set of ordinal numbers has a minimum.'
	),
	(
		'On',
		'well-powered',
		'This is because for every ordinal $\alpha$ the collection of ordinals $\leq \alpha$ is a set (namely, $\alpha + 1$).'
	),
	(
		'On',
		'skeletal',
		'The relation $\leq$ is antisymmetric'
	),
	(
		'On',
		'strongly connected',
		'trivial'
	),
	(
		'real_interval',
		'small',
		'trivial'
	),
	(
		'real_interval',
		'self-dual',
		'Take $t \mapsto 1-t$.'
	),
	(
		'real_interval',
		'strongly connected',
		'trivial'
	),
	(
		'real_interval',
		'locally ℵ₁-presentable',
		'See <a href="https://math.stackexchange.com/questions/4481902/locally-presentable-vs-compactly-presentable-categories#comment9399784_4482185" target="_blank">MSE/4481902</a>.'
	),
	(
		'real_interval',
		'skeletal',
		'The relation $\leq$ is antisymmetric.'
	),
	(
		'Zdiv',
		'small',
		'trivial'
	),
	(
		'Zdiv',
		'products',
		'Take the $\gcd$ of a subset. This also works for infinite sets, for example the $\gcd$ of all primes is $0$.'
	),
	(
		'Zdiv',
		'distributive',
		'We need to prove $\mathrm{lcm}_i \gcd(a, b_i) \cong \gcd(a, \mathrm{lcm}_i b_i)$ for finite families. If $x$ denotes the LHS and $y$ denotes the RHS, the relation $x \mid y$ is formal. If $v_p(-) : \mathbb{Z} \to \mathbb{N}_{\infty}$  denotes the multiplicity of a prime $p$, then $v_p(x)$ equals $\max_i \min(v_p(a),v_p(b_i))$, and $v_p(y)$ equals $\min(v_p(a), \max_i v_p(b_i))$. Since our family is finite, there is some $i_0$ with $\max_i v_p(b_i) = v_p(b_{i_0})$. Then $v_p(x) \geq \min(v_p(a),v_p(b_{i_0})) = v_p(y)$. This proves $y \mid x$.'
	),
	(
		'Zdiv',
		'codistributive',
		'We need to prove $\mathrm{lcm}(a, \gcd_i b_i) \cong \gcd_i \mathrm{lcm}(a,b_i)$ for finite families. This is clear for the empty family (both sides are $0$ then), so assume it is non-empty. If $x$ denotes the LHS and $y$ denotes the RHS, the relation $x \mid y$ is formal. If $v_p(-) : \mathbb{Z} \to \mathbb{N}_{\infty}$ denotes the multiplicity of a prime $p$, then $v_p(x)$ equals $\max(v_p(a), \min_i v_p(b_i))$, and $v_p(y)$ equals $\min_i \max(v_p(a), v_p(b_i))$. Choose some $i_0$ with $\min_i v_p(b_i) = v_p(b_{i_0})$. Then $v_p(x) = \max(v_p(a), v_p(b_{i_0})) \geq v_p(y)$.'
	),
	(
		'Zdiv',
		'locally ℵ₁-presentable',
		'Every $\aleph_1$-directed diagram is eventually constant.'
	),
	(
		'Noo',
		'small',
		'trivial'
	),
	(
		'Noo',
		'coproducts',
		'Take the supremum.'
	),
	(
		'Noo',
		'skeletal',
		'The relation $\leq$ is antisymmetric'
	),
	(
		'Noo',
		'infinitary distributive',
		'We need to prove that $\sup_i \min(a,b_i) = \min(a, \sup_i b_i)$. The inequality $\leq$ is formal, we need to prove $\geq$. For the empty index set both sides are $0$. If $a = \infty$, both sides are $\sup_i b_i$. If the set $\{b_i\}$ is bounded, there is some $i_0$ with $b_{i_0} = \sup_i b_i$. Then $\sup_i \min(a,b_i) \geq \sup_i \min(a,b_{i_0}) =  \min(a, \sup_i b_i)$. If $a < \infty$ and the set $\{b_i\}$ is unbounded, there is some $i_0$ with $b_{i_0} > a$. Then $\sup_i \min(a,b_i) \geq \min(a,b_{i_0}) = a = \min(a,\infty) = \min(a, \sup_i b_i)$.'
	),
	(
		'Noo',
		'locally finitely presentable',
		'Every natural number is finitely presentable, and $\infty$ is the colimit of all $n < \infty$.'
	),
	(
		'Noo',
		'infinitary codistributive',
		'We need to prove $\max(a, \inf_i b_i) = \inf_i \max(a,b_i)$. The inequality $\leq$ is formal, we need to prove $\geq$. For the empty index set both sides are $\infty$. Otherwise, there is some $i_0$ with $b_{i_0} = \inf_i b_i$. Then $\max(a, \inf_i b_i) = \max(a, b_{i_0}) \geq   \inf_i \max(a,b_i)$.'
	),
	(
		'Noo',
		'strongly connected',
		'trivial'
	),

	-- deloopings
	(
		'BG',
		'small',
		'trivial'
	),
	(
		'BG',
		'groupoid',
		'trivial'
	),
	(
		'BG',
		'strongly connected',
		'trivial'
	),
	(
		'BG',
		'generator',
		'The unique object is a generator for trivial reasons.'
	),
	(
		'BG',
		'skeletal',
		'There is just one object'
	),
	(
		'BGf',
		'finite',
		'trivial'
	),
	(
		'BGf',
		'groupoid',
		'trivial'
	),
	(
		'BGf',
		'strongly connected',
		'trivial'
	),
	(
		'BGf',
		'generator',
		'The unique object is a generator for trivial reasons.'
	),
	(
		'BGf',
		'skeletal',
		'There is just one object'
	),
	(
		'BN',
		'small',
		'trivial'
	),
	(
		'BN',
		'strongly connected',
		'trivial'
	),
	(
		'BN',
		'self-dual',
		'The identity is a self-duality since the addition is commutative.'
	),
	(
		'BN',
		'generator',
		'The unique object is a generator for trivial reasons.'
	),
	(
		'BN',
		'pullbacks',
		'For natural numbers $n,m$ we need to find a universal pair $p,q$ of natural numbers satisfying $n + p = m + q$. We may assume w.l.o.g. $n \leq m$. Then take $p = m-n$, $q = 0$.'
	),
	(
		'BN',
		'left cancellative',
		'This is because addition of natural numbers is cancellative.'
	),
	(
		'BN',
		'skeletal',
		'There is just one object.'
	),

	(
		'BOn',
		'strongly connected',
		'trivial'
	),
	(
		'BOn',
		'generator',
		'There is just one object.'
	),
	(
		'BOn',
		'cogenerator',
		'There is just one object.'
	),
	(
		'BOn',
		'left cancellative',
		'It is well-known that ordinal addition satisfies $\alpha + \beta = \alpha + \gamma \implies \beta = \gamma$.'
	),
	(
		'BOn',
		'well-copowered',
		'This follows from the description of epimorphisms as finite ordinals, see <a href="https://math.stackexchange.com/questions/5029605" target="_blank">MO/5029605</a>.'
	),
	(
		'BOn',
		'equalizers',
		'See <a href="https://math.stackexchange.com/questions/5029668/" target="_blank">MSE/5029668</a>.'
	),
	(
		'BOn',
		'skeletal',
		'There is just one object.'
	),
	(
		'BOn',
		'pullbacks',
		'If $\alpha,\beta$ are ordinals, w.l.o.g. $\alpha \leq \beta$, choose $\delta$ with $\beta = \alpha + \delta$. Then the pair $\delta,0$ is a pullback of $\alpha,\beta$: We have $\alpha + \delta = \beta + 0$, and if $\epsilon_1,\,\epsilon_2$ is a pair of ordinals with $\alpha + \epsilon_1 = \beta + \epsilon_2$, we may cancel $\alpha$ to get $\epsilon_1 = \delta + \epsilon_2$, so that the pair factors as $\delta + \epsilon_2,\, 0 + \epsilon_2$.'
	),
	(
		'BOn',
		'filtered limits',
		'See <a href="https://math.stackexchange.com/questions/5129138/" target="_blank">MSE/5129138</a>.'
	),

	-- various categories
	(
		'Ban',
		'locally small',
		'There is a forgetful functor $\mathbf{Ban} \to \mathbf{Set}$ and $\mathbf{Set}$ is locally small.' 
	),
	(
		'Ban',
		'pointed',
		'The trivial Banach space $\{0\}$ is a zero object.'
	),
	(
		'Ban',
		'locally ℵ₁-presentable',
		'Example 1.48 in <a href="https://ncatlab.org/nlab/show/Locally+Presentable+and+Accessible+Categories" target="_blank">Adamek-Rosicky</a>.'
	),
	(
		'Ban',
		'disjoint coproducts',
		'This follows from the corresponding fact for vector spaces, since the coproduct is built from the direct sum of vector spaces (using the $1$-norm).'
	),
	(
		'Ban',
		'cogenerator',
		'Hahn-Banach shows that $\mathbb{C}$ is a cogenerator'
	),
	(
		'Meas',
		'locally small',
		'There is a forgetful functor $\mathbf{Meas} \to \mathbf{Set}$ and $\mathbf{Set}$ is locally small.'
	),
	(
		'Meas',
		'well-powered',
		'follows from the fact that monomorphisms are injective here'
	),
	(
		'Meas',
		'well-copowered',
		'follows from the fact that epimorphisms are surjective here'
	),
	(
		'Meas',
		'complete',
		'Take the limit of the underlying sets and take the smallest $\sigma$-algebra making all projections measurable.'
	),
	(
		'Meas',
		'cocomplete',
		'Take the colimit of the underlying sets and take the largest $\sigma$-algebra making all inclusions measurable. That is, a set is measurable iff its preimage under each inclusion is measurable.'
	),
	(
		'Meas',
		'infinitary distributive',
		'We need to check that the canonical bijective measurable map $\coprod_i X \times Y_i \to X \times \coprod_i Y_i$ maps measurable sets onto measurable sets. By the description of measurable sets in a disjoint union, it suffices to prove that each $X \times Y_i \to X \times \coprod_i Y_i$ maps measurable sets onto measurable sets. So it suffices to prove that $f : X \times Y \to X \times (Y + Z)$ does that. Using that $f$ is injective and that $f(X \times Y)$ is measurable, it follows that the subsets of $X \times Y$ that are mapped to a measurable set via $f$ form a $\sigma$-algebra. But the $\sigma$-algebra of $X \times Y$ is generated by sets of the form $U \times V$ for measurable subsets $U,V$, and their $f$-images are clearly measurable.'
	),
	(
		'Meas',
		'generator',
		'The one-point measurable space (with the unique $\sigma$-algebra) is a generator since it represents the forgetful functor $\mathbf{Meas} \to \mathbf{Set}$.'
	),
	(
		'Meas',
		'cogenerator',
		'Take the two-element set $2$ endowed with the trivial $\sigma$-algebra (where only $\emptyset$ and $2$ are measurable), and use that $2$ is a cogenerator for $\mathbf{Set}$.'
	),
	(
		'Meas',
		'disjoint coproducts',
		'This follows easily from the corresponding fact for sets, since coproducts are built using disjoint unions here.'
	),
	(
		'Cat',
		'locally small',
		'There is a forgetful functor $\mathbf{Cat} \to \mathbf{Set} \times \mathbf{Set}$, $\mathcal{C} \mapsto (\mathrm{Ob}(\mathcal{C}),\mathrm{Mor}(\mathcal{C}))$, and $\mathbf{Set} \times \mathbf{Set}$ is locally small.'
	),
	(
		'Cat',
		'cartesian closed',
		'See p. 98 in <a href="https://ncatlab.org/nlab/show/Categories+for+the+Working+Mathematician" target="_blank">Mac Lane</a>.'
	),
	(
		'Cat',
		'locally finitely presentable',
		'See <a href="https://mathoverflow.net/questions/84460" target="_blank">MO/84460</a>.'
	),
	(
		'Cat',
		'disjoint coproducts',
		'This follows easily from the description of a coproduct of categories (based on disjoint unions).'
	),
	(
		'Cat',
		'strongly connected',
		'Every nonempty category is weakly terminal.'
	),
	(
		'Fld',
		'locally small',
		'There is a forgetful functor $\mathbf{Fld} \to \mathbf{Set}$ and $\mathbf{Set}$ is locally small.'
	),
	(
		'Fld',
		'directed colimits',
		'Consider a directed diagram $(F_i)$ of fields and take the colimit $F$ in the category of commutative rings. Now one checks that $F$ is a field as well, and the universal property remains true for fields.'
	),
	(
		'Fld',
		'connected limits',
		'Consider a connected diagram $(F_i)$ of fields and take the limit $F$ in the category of commutative rings. Now one checks that $F$ is a field as well, and the universal property remains true for fields. Namely, $1 = 0$ in $F$ would imply that $1 = 0$ in each $F_i$ and hence, since the diagram is connected, in some $F_i$, which is a contradiction. And if $x \in F$ is non-zero, then all components $x_i$ are non-zero and hence invertible: Choose some $j$ such that $x_j$ is non-zero. Since there is a zig zag path of morphisms between $i$ and $j$ in the index category, which get mapped to field homomorphisms which are injective, it follows that $x_i$ is non-zero.'
	),
	(
		'Fld',
		'inhabited',
		'trivial'
	),
	(
		'Fld',
		'left cancellative',
		'It is well-known that every field homomorphism is injective and hence a monomorphism.'
	),
	(
		'Fld',
		'well-powered',
		'The subfields of a given field form a set.'
	),
	(
		'Fld',
		'well-copowered',
		'Epimorphisms are the purely inseparable field extensions. If $K \to L$ is purely inseparable, then for all $x \in L$ there is some $n \in \mathbb{N}$ with $x^n \in L$. An element of $K$ has at most $n$ $n$th-roots. So we can bound the size of $L$.'
	),
	(
		'FinOrd',
		'essentially small',
		'Every finite order is isomorphic to $\{1 < \cdots < n \}$ for some $n \in \mathbb{N}$.'
	),
	(
		'FinOrd',
		'locally small',
		'There is a forgetful functor $\mathbf{FinOrd} \to \mathbf{Set}$ and $\mathbf{Set}$ is locally small.'
	),
	(
		'FinOrd',
		'finitely complete',
		NULL
	),
	(
		'FinOrd',
		'generator',
		'The one-point finite order is a generator since it represents the forgetful functor $\mathbf{FinOrd} \to \mathbf{Set}$.'
	),
	(
		'FinOrd',
		'cogenerator',
		NULL
	),
	(
		'FinOrd',
		'strict initial object',
		'The empty order is initial and is clearly strict.'
	),
	(
		'FinOrd',
		'coequalizers',
		NULL
	),
	(
		'FinOrd',
		'mono-regular',
		NULL
	),
	(
		'FinOrd',
		'epi-regular',
		NULL
	),

	(
		'Sp',
		'essentially small',
		'This holds because $\mathbf{FinSet}$ and $\mathbb{B}$ are essentially small.'
	),
	(
		'Sp',
		'finitely complete',
		'This follows from the corresponding fact for $\mathbf{FinSet}$.'
	),
	(
		'Sp',
		'finitely cocomplete',
		'This follows from the corresponding fact for $\mathbf{FinSet}$.'
	),
	(
		'Sp',
		'mono-regular',
		'This follows from the corresponding fact for $\mathbf{FinSet}$ since there every monomorphism is even effective.'
	),
	(
		'Sp',
		'epi-regular',
		'This follows from the corresponding fact for $\mathbf{FinSet}$ since there every epimorphism is even effective.'
	),
	(
		'Sp',
		'distributive',
		'This follows from the corresponding fact for $\mathbf{FinSet}$.'
	),
	(
		'Sp',
		'disjoint finite coproducts',
		'This follows from the corresponding fact for $\mathbf{FinSet}$.'
	),

	-- artificial categories
	(
		'FreeAb',
		'locally small',
		'There is a forgetful functor $\mathbf{FreeAb} \to \mathbf{Set}$ and $\mathbf{Set}$ is locally small.'
	),
	(
		'FreeAb',
		'additive',
		'This follows easily from the fact for abelian groups.'
	),
	(
		'FreeAb',
		'coproducts',
		'free abelian groups are closed under direct sums of abelian groups'
	),
	(
		'FreeAb',
		'well-powered',
		'This is clear since the monomorphisms are injective.'
	),
	(
		'FreeAb',
		'well-copowered',
		'See <a href="https://math.stackexchange.com/questions/5025660" target="_blank">MSE/5025660</a>.'
	),
	(
		'FreeAb',
		'equalizers',
		'Subgroups of free abelian groups are free abelian.'
	),
	(
		'FreeAb',
		'generator',
		'As for $\mathbf{Ab}$, the group $\mathbb{Z}$ is a generator.'
	),
	(
		'FreeAb',
		'cogenerator',
		'It is easy to check that $\mathbb{Z}$ is a cogenerator for free abelian groups.'
	),
	(
		'FreeAb',
		'Malcev',
		'follows in the same way as for abelian groups'
	),

	(
		'Setne',
		'locally small',
		'There is a forgetful functor $\mathbf{Set}_{\neq \emptyset} \to \mathbf{Set}$ and $\mathbf{Set}$ is locally small.'
	),
	(
		'Setne',
		'generator',
		'The one-point set is clearly a generator.'
	),
	(
		'Setne',
		'cogenerator',
		'The two-point set is a cogenerator, this follows as for $\mathbf{Set}$.'
	),
	(
		'Setne',
		'well-powered',
		'This follows from the description of monomorphisms as injective functions.'
	),
	(
		'Setne',
		'well-copowered',
		'This follows from the description of epimorphisms as surjective functions.'
	),
	(
		'Setne',
		'products',
		'Take the product of non-empty sets inside of $\mathbf{Set}$ and observe that it is non-empty by the axiom of choice.'
	),
	(
		'Setne',
		'binary coproducts',
		'The disjoint union of two non-empty sets is non-empty.'
	),
	(
		'Setne',
		'wide pushouts',
		'The wide pushout taken in $\mathbf{Set}$ is clearly non-empty, and it still satisfies the universal property.'
	),
	(
		'Setne',
		'coequalizers',
		'The coequalizer taken in $\mathbf{Set}$ is clearly non-empty, and it still satisfies the universal property.'
	),
	(
		'Setne',
		'cartesian closed',
		'This follows as for $\mathbf{Set}$, since for non-empty sets $X,Y$ there is at least one function $X \to Y$.'
	),
	(
		'Setne',
		'mono-regular',
		'This follows as for $\mathbf{Set}$.'
	),
	(
		'Setne',
		'epi-regular',
		'This follows as for $\mathbf{Set}$.'
	);

INSERT INTO category_property_assignments
	(category_id, property_id, reason, is_satisfied)
SELECT
	category_id, property_id, reason, TRUE
FROM category_properties;

DROP TABLE category_properties;
