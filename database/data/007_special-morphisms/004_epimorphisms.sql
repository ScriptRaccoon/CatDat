CREATE TEMP TABLE epimorphisms (
    category_id TEXT NOT NULL,
    description TEXT NOT NULL,
	reason TEXT NOT NULL
);

INSERT INTO epimorphisms (
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
	'This is clear since it is discrete.'
),
(
	'2',
	'every morphism',
	'This is clear since it is discrete.'
),
(
	'Ab',
	'surjective homomorphisms',
	'For the non-trivial direction, if $f : A \to B$ is an epimorphism, then $p \circ f = 0$ for the projection  $p : B \to B/f(A)$ implies that $p = 0$, so that $B = f(A)$.'
),
(
	'Ab_fg',
	'surjective homomorphisms',
	'Use the same proof as for abelian groups.'
),
(
	'B',
	'every morphism',
	'This is trivial.'
),
(
	'Ban',
	'linear contractions with dense image',
	'Let $f : X \to Y$ be an epimorphism of Banach spaces. The subspace $U := \overline{f(X)} \subseteq Y$ is closed. It is well-known that the quotient $Y/U$ is also a Banach space with a projection $p : Y \to Y/U$. Since $p \circ f = 0 = 0 \circ f$, we infer $p = 0$, so that $U = Y$.'
),
(
	'BG_c',
	'every morphism',
	'This holds because it is a groupoid.'
),
(
	'BG_f',
	'every morphism',
	'This holds because it is a groupoid.'
),
(
	'BN',
	'every morphism',
	'Addition of natural numbers is cancellative.'
),
(
	'BOn',
	'finite ordinal numbers',
	'See <a href="https://math.stackexchange.com/questions/5029605" target="_blank">MSE/5029605</a>.'
),
(
	'Cat',
	'A functor $F : \mathcal{C} \to \mathcal{D}$ is an epimorphism iff $F$ is surjective on objects and for every morphism $s$ in $\mathcal{D}$ there is a zigzag over $U := F(\mathcal{C})$, meaning morphisms $u_1,\dotsc,u_{m+1} \in U$, $v_1,\dotsc,v_m \in U$, $x_1,\dotsc,x_m \in \mathcal{D}$ and $y_1,\dotsc,y_m \in \mathcal{D}$ such that $s = x_1 u_1$, $u_1 = v_1 y_1$, $x_{i-1} v_{i-1} = x_i u_i$, $u_i y_{i-1} = v_i y_i$, $x_m v_m = u_{m+1}$ and $u_{m+1} y_m = s$.',
	'This is an extension of the <a href="https://en.wikipedia.org/wiki/Isbell''s_zigzag_theorem" target="_blank">corresponding theorem for monoids</a> and proven in <a href="https://www.jstor.org/stable/2373286" target="_blank">Epimorphisms and Dominions, III</a> by John R. Isbell.'
),
(
	'CMon',
	'A morphism in $\mathbf{CMon}$ is an epimorphism iff it is an epimorphism in $\mathbf{Mon}$, which in turn can be characterized by <a href="https://en.wikipedia.org/wiki/Isbell''s_zigzag_theorem" target="_blank">Isbell''s zigzag theorem</a>.',
	'If $f : M \to N$ is a homomorphism of commutative monoids which is an epimorphism in $\mathbf{Mon}$, then it is trivially also an epimorphism in $\mathbf{CMon}$. The converse requires a proof, which can be found at <a href="https://math.stackexchange.com/a/5133596/1650">MSE/5133488</a>.
	'
),
(
	'CAlg(R)',
	'a homomorphism of algebras which is an epimorphism of commutative rings',
	'The forgetful functor $\mathbf{CAlg}(R) \to \mathbf{Ring}$ is faithful and hence reflects epimorphisms, but it also preserves epimorphisms since it preserves pushouts (since $\mathbf{CAlg}(R) \cong R / \mathbf{Ring}$). For epimorphisms of commutative rings see their <a href="/category/CRing">detail page</a>.'
),
(
	'CRing',
	'A ring map $f : R \to S$ is an epimorphism iff $S$ equals the <i>dominion</i> of $f(R) \subseteq S$, meaning that for every $s \in S$ there is some matrix factorization $(s) = Y X Z$ with $X \in M_{n \times n}(R)$, $Y \in M_{1 \times n}(S)$, and $Z \in M_{n \times 1}(S)$.',
	'See <a href="https://stacks.math.columbia.edu/tag/04VM" target="_blank">Stacks Project</a> ,or, for many more results, the seminar <a href="https://www.numdam.org/issues/SAC_1967-1968__2_/">Les épimorphismes d''anneaux</a>. See also <a href="https://mathoverflow.net/questions/109/" target="_blank">MO/109</a> for some results.'
),
(
	'Delta',
	'surjective order-preserving maps',
	'We can use the same <a href="/category/FinOrd">proof as for $\mathbf{FinOrd}$</a> since this has merely used the non-empty ordered set $\{0 < 1\}$.'
),
(
	'FI',
	'bijective maps',
	'Take an epimorphism $X \to Y$ in this category, w.l.o.g. the inclusion of a subset $X \subseteq Y$. This means that for two injective maps $f,g : Y \rightrightarrows T$ with $f|_X = g|_X$ we must have $f = g$. Let $T := Y + (Y \setminus X)$ (disjoint union), $f$ be the inclusion into the first summand, $g|_X$ be the inclusion into the first summand, and $g|_{Y \setminus X}$ be the inclusion into the second summand. Then $f$ and $g$ are injective with $f|_X = g|_X$, so that $f = g$. But this means $X = Y$.'
),
(
	'FinAb',
	'surjective homomorphisms',
	'Use the same proof as for abelian groups.'
),
(
	'FinGrp',
	'surjective homomorphisms',
	'For the non-trivial direction, if $f : G \to H$ is an epimorphism, we may factor it as $G \to f(G) \to H$, and $f(G) \to H$ is still an epimorphism, but also an inclusion and hence a monomorphism. Since we already know that the category is mono-regular, $f(G) \to H$ must be an isomorphism.'
),
(
	'FinOrd',
	'surjective order-preserving maps',
	'The proof is similar to the one for $\mathbf{Set}$: If $f : X \to Y$ is an epimorphism of (finite) orders, in particular for all morphisms $g,h : Y \to \{0 < 1\}$ with $g \circ f = h \circ f$ we have $g = h$. This means for all upper sets $A,B \subseteq Y$ with $f^*(A) = f^*(B)$ we have $A = B$. If $y \in Y$, apply this to the intervals $A = Y_{\geq y}$ and $B = Y_{> y}$, which are different. Hence, there is some $x \in f^*(A) \setminus f^*(B)$, which means $f(x) \geq y$ but not $f(x) > y$, so that $f(x) = y$.'
),
(
	'FinSet',
	'surjective maps',
	'Use the same proof as for sets.'
),
(
	'Fld',
	'purely inseparable homomorphisms',
	'See <a href="https://math.stackexchange.com/questions/687869" target="_blank">MSE/687869</a>.'
),
(
	'FreeAb',
	'homomorphisms $f : A \to B$ with the property that $f(A)$ is not contained in a proper direct summand of $B$.',
	'Let $f : A \to B$ be a morphism of free abelian groups such that $f(A)$ is not contained in a proper direct summand of $B$. Then $f$ is an epimorphism: If $t : B \to C$ is a morphism with $t \circ f = 0$, we want to show $t = 0$. Since the image of $t$ is free abelian (as a subgroup of $B$), we may assume that $t$ is surjective. Since $C$ is free, $t$ splits, so its kernel $K$ is a direct summand of $B$ (Splitting Lemma). It contains $f(A)$ because of $t \circ f = 0$. By assumption, $K = B$, so that $t = 0$. Conversely, assume that $f : A \to B$ is an epimorphism, and that $f(A)$ is contained in a direct summand $K$ of $B$. Let $L$ be a complement of $B$ (which is free abelian) and let $p : B \to L$ be the projection. Then $t \circ f = 0$, so $t = 0$. But then $L = 0$, which means $K = B$.'
),
(
	'FS',
	'every morphism',
	'This is trivial.'
),
(
	'Grp',
	'surjective homomorphisms',
	'For the non-trivial direction, if $f : G \to H$ is an epimorphism, we may factor it as $G \to f(G) \to H$, and $f(G) \to H$ is still an epimorphism, but also an inclusion and hence a monomorphism. Since we already know that the category is balanced, $f(G) \to H$ must be an isomorphism.'
),
(
	'Haus',
	'continuous maps with dense image',
	'It is clear that continuous maps with dense image are epimorphism, but the other direction is non-trivial. See <a href="https://math.stackexchange.com/questions/214045" target="_blank">MSE/214045</a> for a proof.'
),
(
	'M-Set',
	'surjective $M$-maps',
	'This holds in every functor category $[\mathcal{C},\mathbf{Set}]$, here applied to the case that $\mathcal{C}$ has just one object.'
),
(
	'Man',
	'smooth maps with dense image',
	'Let $f : X \to Y$ be a smooth map which is not dense. Choose some non-empty open subset $U \subseteq Y$ that is disjoint from $f(X)$. Take any $p \in U$. There is a smooth <i>bump function</i> $g : Y \to \mathbb{R}$ with $g(p) = 1$ and $\mathrm{supp}(g) \subseteq U$ (John Lee, Introduction to Smooth Manifolds, Prop. 2.25). Hence, $g \neq 0$ and $g \circ f = 0 = 0 \circ f$. Thus, $f$ is not an epimorphism.'
),
(
	'Meas',
	'surjective measurable maps',
	'Use the same proof as for sets, where $2 = \{0,1\}$ is endowed with the trivial $\sigma$-algebra.'
),
(
	'Met',
	'non-expansive maps with dense image',
	'See <a href="https://math.stackexchange.com/questions/937387" target="_blank">MSE/937387</a>.'
),
(
	'Met_c',
	'continuous maps with dense image',
	'See <a href="https://math.stackexchange.com/questions/937387" target="_blank">MSE/937387</a>.'
),
(
	'Met_oo',
	'non-expansive maps with dense image',
	'See <a href="https://math.stackexchange.com/questions/937387" target="_blank">MSE/937387</a>.'
),
(
	'Mon',
	'A monoid map $f : T \to S$ is an epimorphism iff $S$ equals the <i>dominion</i> of $U := f(T) \subseteq S$, meaning that for every $s \in S$ there are $u_1,\dotsc,u_{m+1} \in U$, $v_1,\dotsc,v_m \in U$, $x_1,\dotsc,x_m \in S$ and $y_1,\dotsc,y_m \in S$ such that $s = x_1 u_1$, $u_1 = v_1 y_1$, $x_{i-1} v_{i-1} = x_i u_i$, $u_i y_{i-1} = v_i y_i$, $x_m v_m = u_{m+1}$ and $u_{m+1} y_m = s$.',
	'This is <a href="https://en.wikipedia.org/wiki/Isbell''s_zigzag_theorem" target="_blank">Isbell''s zigzag Theorem</a>, see references there.'
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
	'PMet',
	'surjective non-expansive maps',
	'Let $f : X \to Y$ be a non-expansive map that is not surjective. Choose $y_0 \in Y \setminus f(X)$. We extend the pseudo-metric from $Y$ to $Z := Y \sqcup \{y''_0\}$ via $d(y,y''_0) := d(y,y_0)$, i.e., we make $y_0,y''_0$ indistinguishable. Let $g : Y \to Z$ be the inclusion and $h : Y \to Z$ be the map that composes $g$ with the swap between $y_0$ and $y''_0$. Both are isometric and satisfy $g \circ f = h \circ f$. Therefore, $f$ is not an epimorphism.'
),
(
	'On',
	'every morphism',
	'It is a thin category.'
),
(
	'Pos',
	'surjective order-preserving functions',
	'Clearly, surjective maps are epimorphisms. Conversely, assume that $f : P \to Q$ is an order-preserving map which is not surjective. Choose $q \in Q \setminus f(P)$. The order-preserving maps $Q \to \{0 < 1\}$ correspond to the upper sets in $Q$, and composing them with $f$ corresponds to taking their $f$-preimages. Consider the two upper sets $Q_{> q}$ and $Q_{\geq q}$. Their $f$-preimages are the same since $q \notin f(P)$. Therefore, $f$ is not an epimorphism.'
),
(
	'Prost',
	'surjective order-preserving functions',
	'Clearly, surjective maps are epimorphisms. The converse follows since, as mentioned, the forgetful functor $\mathbf{Prost} \to \mathbf{Set}$ has a right adjoint hence preserves epimorphisms.'
),
(
	'R-Mod',
	'surjective $R$-linear maps',
	'The forgetful functor to abelian groups is faithful and preserves colimits, hence reflects and preserves epimorphisms. Alternatively, use the same proof as for abelian groups.'
),
(
	'R-Mod_div',
	'surjective $R$-linear maps',
	'The forgetful functor to abelian groups is faithful and preserves colimits, hence reflects and preserves epimorphisms. Alternatively, use the same proof as for abelian groups.'
),
(
	'real_interval',
	'every morphism',
	'It is a thin category.'
),
(
	'Rel',
	'A relation $R : A \to B$ is an epimorphism iff the map $R^* : P(B) \to P(A)$ defined by $S \mapsto \{a \in A : \exists \, b \in S: (a,b) \in R \}$ is injective.',
	'See <a href="https://math.stackexchange.com/questions/350716/" target="_blank">MSE/350716</a>.'
),
(
	'Set_c',
	'surjective maps',
	'For the non-trivial direction, if $f : X \to Y$ is an epimorphism of countable sets, then in particular $f^* : \hom(Y,2) \to \hom(X,2)$ is injective, which identifies with $f^* : P(Y) \to P(X)$. Then for all $y \in Y$ we have $f^*(\{y\}) \neq f^*(\varnothing) = \varnothing$, so that $y$ has a preimage.'
),
(
	'Set',
	'surjective maps',
	'For the non-trivial direction, if $f : X \to Y$ is an epimorphism of sets, then in particular $f^* : \hom(Y,2) \to \hom(X,2)$ is injective, which identifies with $f^* : P(Y) \to P(X)$. Then for all $y \in Y$ we have $f^*(\{y\}) \neq f^*(\varnothing) = \varnothing$, so that $y$ has a preimage.'
),
(
	'Set*',
	'surjective pointed maps',
	'If $f : X \to Y$ is an epimorphism of pointed sets, then the inclusion $i : f(X) \hookrightarrow Y$ is an epimorphism as well. But it is also a split monomorphism (we may map everything in $Y \setminus f(X)$ to the base point of $f(X)$, and do not touch the rest), hence an isomorphism.'
),
(
	'Setne',
	'surjective maps',
	'For the non-trivial direction, let $f : X \to Y$ be an epimorphism of non-empty sets. Then the inclusion $f(X) \hookrightarrow Y$ is an epimorphism as well, but also a split monomorphism (we can just map everything in $Y \setminus f(X)$ to a fixed element of $f(X)$). As such, it must be an isomorphism.'
),
(
	'SetxSet',
	'pairs of surjective maps',
	'This follows from the fact for the category of sets.'
),
(
	'Sh(X)',
	'morphisms of sheaves $f : F \to G$ that are "locally surjective": for every local section $g \in G(U)$ there is an open covering $U = \bigcup_{i \in I} U_i$ such that each $g|_{U_i} \in G(U_i)$ is contained in the image of $f(U_i) : F(U_i) \to G(U_i)$.',
	'The one direction is easy. For the other one, assume that $f : F \to G$ is an epimorphism of sheaves. For every $x \in X$ the map on stalks $f_x : F_x \to G_x$ is an epimorphism because the stalk functor $\mathrm{Sh}(X) \to \mathbf{Set}$ admits a right adjoint: take skyscraper sheaves. For $x \in U$ then $g_x \in G_x$ has a preimage in $F_x$, say represented by some $f \in F(V_x)$ for some $x \in V_x \subseteq U$. By construction of the stalk $G_x$, there is some $x \in U_x \subseteq V_x$ with $f(U_x)(f|_{U_x}) = g|_{U_x}$. Hence, the sets $(U_x)$ provide the open covering.'
),
(
	'Sh(X,Ab)',
	'morphisms of abelian sheaves $f : F \to G$ that are "locally surjective": for every local section $g \in G(U)$ there is an open covering $U = \bigcup_{i \in I} U_i$ such that each $g|_{U_i} \in G(U_i)$ is contained in the image of $f(U_i) : F(U_i) \to G(U_i)$.',
	'The one direction is easy. For the other one, assume that $f : F \to G$ is an epimorphism of abelian sheaves. For every $x \in X$ the homomorphism on stalks $f_x : F_x \to G_x$ is an epimorphism because the stalk functor  $\mathrm{Sh}(X,\mathbf{Ab}) \to \mathbf{Ab}$ admits a right adjoint: take skyscraper sheaves. For $x \in U$ then $g_x \in G_x$ has a preimage in $F_x$, say represented by some $f \in F(V_x)$ for some $x \in V_x \subseteq U$. By construction of the stalk $G_x$, there is some $x \in U_x \subseteq V_x$ with $f(U_x)(f|_{U_x}) = g|_{U_x}$. Hence, the sets $(U_x)$ provide the open covering.'
),
(
	'Sp',
	'pointwise surjective natural transformations',
	'This holds in every functor category $[\mathcal{C},\mathbf{Set}]$.'
),
(
	'sSet',
	'pointwise surjective transformations',
	'This holds in every functor category $[\mathcal{C},\mathbf{Set}]$.'
),
(
	'Top',
	'surjective continuous maps',
	'The proof works exactly as for the category of sets, where we endow $2$ with the indiscrete topology.'
),
(
	'Top*',
	'surjective pointed continuous maps',
	'For the non-trivial direction: The forgetful functor $\mathbf{Top}_* \to \mathbf{Top}$ preserves pushouts and hence also epimorphisms, and we already know the epimorphisms in $\mathbf{Top}$.'
),
(
	'Vect',
	'surjective linear maps',
	'The forgetful functor to abelian groups is faithful and preserves colimits, hence reflects and preserves epimorphisms. Alternatively, just use the same proof as for abelian groups.'
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
	'the identities and $f,g$',
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
	'This holds because it is a groupoid.'
),
(
	'walking_morphism',
	'every morphism',
	'It is a thin category.'
),
(
	'walking_pair',
	'every morphism',
	'Each $0 \to 1$ is an epimorphism since the only morphism starting at $1$ is the identity.'
),
(
	'walking_span',
	'every morphism',
	'It is a thin category.'
),
(
	'Z',
	'objectwise surjective natural transformations',
	'This holds in every functor category $[\mathcal{C},\mathbf{Set}]$, here applied to the case that $\mathcal{C}$ has just one object.'
),
(
	'Z_div',
	'every morphism',
	'It is a thin category.'
);

INSERT INTO special_morphisms
	(category_id, description, reason, type)
SELECT
	category_id, description, reason, 'epimorphisms'
FROM epimorphisms;

DROP TABLE epimorphisms;