CREATE TEMP TABLE monomorphisms (
    category_id TEXT NOT NULL,
    description TEXT NOT NULL,
	reason TEXT NOT NULL
);

INSERT INTO monomorphisms (
	category_id,
	description,
	reason
)
VALUES
(
	'0',
	'none',
	'This is trivial.'
),
(
	'1',
	'every morphism',
	'This is trivial.'
),
(
	'2',
	'every morphism',
	'This is trivial.'
),
(
	'Ab',
	'injective homomorphisms',
	'This holds in every finitary algebraic category: the forgetful functor to $\mathbf{Set}$ is faithful, hence reflects monomorphisms, and it is continuous (even representable), hence preserves monomorphisms.'
),
(
	'Ab_fg',
	'injective homomorphisms',
	'Let $f : A \to B$ be a monomorphism of finitely generated abelian groups. Let $a \in A$ be in the kernel of $a$. Then we may view $a$ as a morphism $a : \mathbb{Z} \to A$ with $f \circ a = 0$, and $\mathbb{Z}$ is finitely generated. Hence, $a = 0$.'
),
(
	'Alg(R)',
	'injective ring homomorphisms',
	'This holds in every finitary algebraic category: the forgetful functor to $\mathbf{Set}$ is faithful, hence reflects monomorphisms, and it is continuous (even representable), hence preserves monomorphisms.'
),
(
	'B',
	'every morphism',
	'This is trivial.'
),
(
	'Ban',
	'injective linear contractions',
	'The unit ball functor $U : \mathbf{Ban} \to \mathbf{Set}$ is faithful and representable (by $\mathbb{C}$), hence reflects and preserves monomorphisms.'
),
(
	'BG',
	'every morphism',
	'This is trivial.'
),
(
	'BG_f',
	'every morphism',
	'This is trivial.'
),
(
	'BN',
	'every morphism',
	'This is because addition of natural numbers is cancellative.'
),
(
	'BOn',
	'every ordinal number',
	'This is because ordinal addition is left cancellative.'
),
(
	'Cat',
	'faithful functors that are injective on objects',
	'Faithful functors that are injective on objects are clearly monomorphisms. For the converse, assume that $F : \mathcal{C} \to \mathcal{D}$ is a monomorphic functor. Two objects $A,B \in \mathcal{C}$ with $F(A) = F(B)$ can be regarded as functors $A,B : 1 \to \mathcal{C}$ from the trivial category satisfying $F \circ A = F \circ B$, so that $A = B$. Now assume that $f,g : A \to B$ are morphisms in $\mathcal{C}$ with $F(f) = F(g)$. These can be regarded as functors $f,g : \{ 0 \to 1 \} \to \mathcal{C}$ from the walking morphism category satisfying $F \circ f = F \circ g$, so that $f = g$.'
),
(
	'CMon',
	'injective homomorphisms',
	'This holds in every finitary algebraic category: the forgetful functor to $\mathbf{Set}$ is faithful, hence reflects monomorphisms, and it is continuous (even representable), hence preserves monomorphisms.'
),
(
	'CRing',
	'injective ring homomorphisms',
	'This holds in every finitary algebraic category: the forgetful functor to $\mathbf{Set}$ is faithful, hence reflects monomorphisms, and it is continuous (even representable), hence preserves monomorphisms.'
),
(
	'FI',
	'every morphism',
	'This is trivial.'
),
(
	'FinAb',
	'injective homomorphisms',
	'Let $f : A \to B$ be a monomorphism of finite abelian groups. Let $a \in A$ be in the kernel of $a$, say of order $n$. Then we may view $a$ as a morphism $a : \mathbb{Z}/n \to A$ with $f \circ a = 0$, and $\mathbb{Z}/n$ is finite. Hence, $a = 0$.'
),
(
	'FinOrd',
	'injective order-preserving maps',
	'The same proof as for $\mathbf{Set}$ can be used.'
),
(
	'FinSet',
	'injective maps',
	'The same proof as for $\mathbf{Set}$ can be used.'
),
(
	'Fld',
	'every morphism',
	'It is well-known that field homomorphisms are injective.'
),
(
	'FreeAb',
	'injective homomorphisms',
	'Let $f : A \to B$ be a monomorphism of free abelian groups. Let $a \in A$ be in the kernel of $a$. Then we may view $a$ as a morphism $a : \mathbb{Z} \to A$ with $f \circ a = 0$, and $\mathbb{Z}$ is free. Hence, $a = 0$.'
),
(
	'FS',
	'bijective maps',
	'Assume that $f : X \to Y$ is a monomorphism in this category. If $a,b \in X$ are such that $a \neq b$ but $f(a) = f(b)$, let $h : X \to X$ be the transposition that swaps $a$, $b$. Then $f \circ \mathrm{id}_X = f = f \circ h$, so by assumption $\mathrm{id}_X = h$, a contradiction. This shows that $f$ is bijective.'
),
(
	'Grp',
	'injective homomorphisms',
	'This holds in every finitary algebraic category: the forgetful functor to $\mathbf{Set}$ is faithful, hence reflects monomorphisms, and it is continuous (even representable), hence preserves monomorphisms.'
),
(
	'Haus',
	'injective continuous maps',
	'The same proof as for $\mathbf{Set}$ can be used.'
),
(
	'M-Set',
	'injective $M$-maps',
	'This holds in every finitary algebraic category: the forgetful functor to $\mathbf{Set}$ is faithful, hence reflects monomorphisms, and it is continuous (even representable), hence preserves monomorphisms.'
),
(
	'Man',
	'injective smooth maps',
	'The same proof as for $\mathbf{Set}$ can be used.'
),
(
	'Meas',
	'injective measurable maps',
	'The same proof as for $\mathbf{Set}$ can be used.'
),
(
	'Met',
	'injective non-expansive maps',
	'The same proof as for $\mathbf{Set}$ can be used.'
),
(
	'Met_c',
	'injective continuous maps',
	'The same proof as for $\mathbf{Set}$ can be used.'
),
(
	'Met_oo',
	'injective non-expansive maps',
	'The same proof as for $\mathbf{Set}$ can be used.'
),
(
	'CAlg(R)',
	'injective homomorphisms',
	'This holds in every finitary algebraic category: the forgetful functor to $\mathbf{Set}$ is faithful, hence reflects monomorphisms, and it is continuous (even representable), hence preserves monomorphisms.'
),
(
	'Mon',
	'injective homomorphisms',
	'This holds in every finitary algebraic category: the forgetful functor to $\mathbf{Set}$ is faithful, hence reflects monomorphisms, and it is continuous (even representable), hence preserves monomorphisms.'
),
(
	'N',
	'every morphism',
	'It is a thin category.'
),
(
	'N_oo',
	'every morphism',
	'It is a thin category.'
),
(
	'On',
	'every morphism',
	'It is a thin category.'
),
(
	'Pos',
	'injective order-preserving functions',
	'The same proof as for $\mathbf{Set}$ can be used.'
),
(
	'Prost',
	'injective order-preserving functions',
	'The same proof as for $\mathbf{Set}$ can be used.'
),
(
	'R-Mod',
	'injective $R$-linear maps',
	'This holds in every finitary algebraic category: the forgetful functor to $\mathbf{Set}$ is faithful, hence reflects monomorphisms, and it is continuous (even representable), hence preserves monomorphisms.'
),
(
	'real_interval',
	'every morphism',
	'It is a thin category.'
),
(
	'Rel',
	'A relation $R : A \to B$ is a monomorphism iff the map $R_* : P(A) \to P(B)$ defined by $T \mapsto \{b \in B : \exists \, a \in T: (a,b) \in R \}$ is injective.',
	'See <a href="https://math.stackexchange.com/questions/350716/" target="_blank">MSE/350716</a>.'
),
(
	'Ring',
	'injective ring homomorphisms',
	'This holds in every finitary algebraic category: the forgetful functor to $\mathbf{Set}$ is faithful, hence reflects monomorphisms, and it is continuous (even representable), hence preserves monomorphisms.'
),
(
	'Rng',
	'injective rng homomorphisms',
	'This holds in every finitary algebraic category: the forgetful functor to $\mathbf{Set}$ is faithful, hence reflects monomorphisms, and it is continuous (even representable), hence preserves monomorphisms.'
),
(
	'Set',
	'injective maps',
	'For the non-trivial direction, if $f : X \to Y$ is a monomorphism of sets and $a,b \in X$ satisfy $f(a) = f(b)$, then $f \circ a = f \circ b$ when we regard $a,b$ as morphisms $a,b : 1 \to X$. Hence, $a = b$. More generally, if $\mathcal{C}$ is a category that admits a faithful and representable functor $U : \mathcal{C} \to \mathbf{Set}$, then the monomorphisms in $\mathcal{C}$ are precisely the morphisms whose $U$-image is injective.'
),
(
	'Set*',
	'injective pointed maps',
	'This holds in every finitary algebraic category: the forgetful functor to $\mathbf{Set}$ is faithful, hence reflects monomorphisms, and it is continuous (even representable), hence preserves monomorphisms.'
),
(
	'Setne',
	'injective maps',
	'The same proof as for $\mathbf{Set}$ can be used.'
),
(
	'SetxSet',
	'pairs of injective maps',
	'This follows from the fact for the category of sets.'
),
(
	'Sh(X)',
	'morphisms of sheaves that are injective on every open subset',
	'For the non-trivial direction, assume that $f : F \to G$ is a monomorphism of sheaves on $X$. Then the diagonal $F \to F \times_G F$ is an isomorphism. Since pullbacks of sheaves are constructed section-wise, it follows that the diagonal $F(U) \to F(U) \times_{G(U)} F(U)$ is an isomorphism for every open set $U \subseteq X$. But this means that $f(U) : F(U) \to G(U)$ is injective.'
),
(
	'Sh(X,Ab)',
	'morphisms of abelian sheaves that are injective on every open subset',
	'For the non-trivial direction, assume that $f : F \to G$ is a monomorphism of abelian sheaves on $X$. Then the diagonal $F \to F \times_G F$ is an isomorphism. Since pullbacks of abelian sheaves are constructed section-wise, it follows that the diagonal $F(U) \to F(U) \times_{G(U)} F(U)$ is an isomorphism for every open set $U \subseteq X$. But this means that $f(U) : F(U) \to G(U)$ is injective.'
),
(
	'Sp',
	'pointwise injective natural transformations',
	'If $a : F \to G$ is a monomorphism of species, then the diagonal morphism $F \to F \times_G F$ is an isomorphism, so that for every $x$ the diagonal morphism $F(x) \to F(x) \times_{G(x)} F(x)$ is an isomorphism, i.e., $a(x) : F(x) \to G(x)$ is a monomorphism. This argument works for every functor category where the target has fiber products.'
),
(
	'sSet',
	'pointwise injective transformations',
	'If $a : F \to G$ is a monomorphism of simplicial sets, then the diagonal morphism $F \to F \times_G F$ is an isomorphism, so that for every $n$ the diagonal morphism $F(n) \to F(n) \times_{G(n)} F(n)$ is an isomorphism, i.e., $a(n) : F(n) \to G(n)$ is a monomorphism. This argument works for every functor category where the target has fiber products.'
),
(
	'Top',
	'injective continuous maps',
	'The same proof as for $\mathbf{Set}$ can be used.'
),
(
	'Top*',
	'injective pointed continuous maps',
	'For the non-trivial direction: The forgetful functor $\mathbf{Top}_* \to \mathbf{Set}$ is representable (take the discrete two-point space) and hence preserves monomorphisms.'
),
(
	'Vect',
	'injective linear maps',
	'This holds in every finitary algebraic category: the forgetful functor to $\mathbf{Set}$ is faithful, hence reflects monomorphisms, and it is continuous (even representable), hence preserves monomorphisms.'
),
(
	'walking_commutative_square',
	'every morphism',
	'It is a thin category.'
),
(
	'walking_composable_pair',
	'every morphism',
	'It is a thin category.'
),
(
	'walking_fork',
	'every morphism',
	'This is easily checked.'
),
(
	'walking_idempotent',
	'the identity',
	'This is trivial.'
),
(
	'walking_isomorphism',
	'every morphism',
	'This is trivial.'
),
(
	'walking_morphism',
	'every morphism',
	'It is a thin category.'
),
(
	'walking_pair',
	'every morphism',
	'This is trivial.'
),
(
	'walking_span',
	'every morphism',
	'It is a thin category.'
),
(
	'Z',
	'pointwise injective natural transformations',
	'If $a : F \to G$ is a monomorphism of Z-functors, then the diagonal morphism $F \to F \times_G F$ is an isomorphism, so that for every $R$ the diagonal morphism $F(R) \to F(R) \times_{G(R)} F(R)$ is an isomorphism, i.e., $a(R) : F(R) \to G(R)$ is a monomorphism. This argument works for every functor category where the target has fiber products.'
),
(
	'Z_div',
	'every morphism',
	'It is a thin category.'
);

INSERT INTO special_morphisms
	(category_id, description, reason, type)
SELECT
	category_id, description, reason, 'monomorphisms'
FROM monomorphisms;

DROP TABLE monomorphisms;
