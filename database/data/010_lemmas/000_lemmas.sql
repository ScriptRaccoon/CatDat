INSERT INTO lemmas (
    id,
    title,
    claim,
    proof
) VALUES 
(
    'thin_algebraic_categories',
    'Algebraic categories are "never" thin',
    'Let $\mathcal{C}$ be a <a href="/category-property/thin">thin</a> and <a href="/category-property/finitary_algebraic">finitary algebraic</a> category. Then $\mathcal{C} \simeq 1$ or $\mathcal{C} \simeq \{0 < 1\}$.',
    'Let $F : \mathbf{Set} \to \mathcal{C}$ denote the free algebra functor. Every object $A \in \mathcal{C}$ admits a regular epimorphism $F(X) \twoheadrightarrow A$ for some set $X$. But since $\mathcal{C}$ is thin, every regular epimorphism must be an isomorphism. Also, $F(X)$ is a coproduct of copies of $F(1)$, which means it is either the initial object $0$ or $F(1)$ itself (since $\mathcal{C}$ is thin). If $F(1) \cong 0$, then every object is isomorphic to the initial object $0$, and hence $\mathcal{C}$ is trivial. If not, then $\mathcal{C}$ has exactly two objects up to isomorphism, $0$ and $F(1)$, there is a morphism $0 \to F(1)$, but no morphism $F(1) \to 0$. Since $\mathcal{C}$ is thin, we conclude $\mathcal{C} \simeq \{0 \to 1\}$.'
),
(
    'hilberts_hotel',
    'Hilbert''s Hotel',
    'Let $\mathcal{C}$ be a category with countable powers. Then for every object $X \in \mathcal{C}$ there is an object $P \in \mathcal{C}$ with $P \cong X \times P$ and which has a morphism $X \to P$.',
    'Take $P := X^{\mathbb{N}}$. Since $\mathbb{N} \cong 1 + \mathbb{N}$ as sets, we have $P \cong X \times P$. The diagonal provides a morphism $X \to P$.'
),
(
    'preadditive_structure_unique',
    'Uniqueness of preadditive structures',
    'Let $\mathcal{C}$ be a preadditive category (or more generally, a category enriched in commutative monoids) with finite products and finite coproducts. Then for all objects $X,Y$ the canonical morphism
    <p>$\alpha : X \oplus Y \to X \times Y$</p>
    is an isomorphism. Moreover, the preadditive structure is <i>unique</i>: If $f,g : A \rightrightarrows B$ are morphisms, their sum
    <p>$f+g : A \to B$</p>
    is the composite of $(f,g) : A \to B \times B$, the inverse $\alpha^{-1} : B \oplus B \to B \times B$, and the codiagonal $\nabla : B \oplus B \to B$.',
    'The morphism $\alpha : X \oplus Y \to X \times Y$ is defined by the equations
    <p>$p_1 \circ \alpha \circ i_1 = \mathrm{id}_X, \quad p_2 \circ \alpha \circ i_2 = \mathrm{id}_Y$</p>
    <p>$p_2 \circ \alpha \circ i_1 = 0,\quad p_1 \circ \alpha \circ i_2 = 0$.</p>
    It does not depend on the choice of preadditive structure since zero morphisms are unique. It is an isomorphism: Define
    <p>$\beta := i_1 \circ p_1  + i_2 \circ p_2 : X \times Y \to X \oplus Y$.</p>
    Then $\alpha \circ \beta = \mathrm{id}_{X \times Y}$ because
    <p>$p_1 \circ \alpha \circ \beta = p_1 \circ \alpha \circ i_1 \circ p_1 + p_1 \circ \alpha \circ i_2 \circ p_2 = \mathrm{id}_1 \circ p_1 + 0 \circ p_2 = p_1$</p>
    and likewise $p_2 \circ \alpha \circ \beta = p_2$. We also have $\beta \circ \alpha = \mathrm{id}_{X \oplus Y}$ with a very similar calculation that shows $\beta \circ \alpha \circ i_1 = i_1$ and $\beta \circ \alpha \circ i_2 = i_2$.
    <p>Therefore, for morphisms $f,g : A \rightrightarrows B$ the composite $A \to B$ in the claim is equal to</p>
    $\begin{aligned} \nabla \circ \beta \circ (f,g) & = \nabla \circ (i_1 \circ p_1  + i_2 \circ p_2) \circ (f,g) \\ & = \nabla \circ i_1 \circ p_1 \circ (f,g) + \nabla \circ i_2 \circ p_2 \circ (f,g) \\ & = p_1 \circ (f,g)  +  p_2 \circ (f,g) \\ & = f + g. \end{aligned}$'
),
(
	'generator_construction',
    'Construction of Generators',
    'In a category let $S$ be a generating set which is <a href="/category-property/strongly_connected">strongly connected</a> (between any two objects in $S$ there is a morphism). If the coproduct $U := \coprod_{G \in S} G$ exists, then it is a generator.',
    'This is a straight forward generalization of <a href="/category-implication/generator_via_coproduct">this result</a>. We remark that the assumption about $S$ implies that each inclusion $G \to U$ has a left inverse. Now let $f,g : A \rightrightarrows B$ be two morphisms with $f h = g h$ for all $h : U \to A$. If $G \in S$, any morphism $G \to A$ extends to $U$ by our preliminary remark. Thus, $fh = gh$ holds for all $h : G \to A$ and $G \in S$. Since $S$ is a generating set, this implies $f = g$.'
),
(
    'limits_in_factor_categories',
    'Limits in factor categories',
    'Let $\mathcal{C},\mathcal{D}$ be two categories. Assume that $\mathcal{D}$ is inhabited. If $\mathcal{C} \times \mathcal{D}$ has limits of a given shape, then $\mathcal{C}$ also has limits of this shape.',
    'Let $U \in \mathcal{D}$ be a fixed object. Assume that $X : \mathcal{J} \to \mathcal{C}$ is a diagram. Assume that the diagram $(X,U) : \mathcal{J} \to \mathcal{C} \times \mathcal{D}$ (which is constant in the second variable) has a limit cone $((p_i, u_i) : (L,V) \to (X_i,U))$, thus consisting of morphisms $p_i : L \to X_i$ and $u_i : V \to U$. Clearly, $(p_i : L \to X_i)$ is a cone over $X$. We prove that it is universal:<br>
    Let $(f_i : T \to X_i)$ be a cone over $X$. Then $((f_i,\mathrm{id}_U) : (T,U) \to (X_i,U))$ is a cone over $(X,U)$. Hence, there is a unique morphism $(f,v) : (T,U) \to (L,V)$, consisting of $f : T \to L$ and $v : U \to V$, such that $(p_i,u_i) \circ (f,v) = (f_i,\mathrm{id}_U)$, i.e. $p_i \circ f = f_i$ and $u_i \circ v = \mathrm{id}_U$. If $g : T \to L$ is another morphism with $p_i \circ g = f_i$, then uniqueness applied to $(g,v)$ shows that $f = g$.'
),
(
    'cogenerators_in_product_categories',
    'Cogenerators in product categories',
    'For a family of categories $(\mathcal{C}_i)_{i \in I}$, each having a cogenerator $Q_i$ which is weakly terminal, the object $(Q_i)_{i \in I}$ is a cogenerator in the product category $\prod_{i \in I} \mathcal{C}_i$.',
    'Let $(f_i: A_i \to B_i)_{i \in I}$ and $(g_i: A_i \to B_i)_{i \in I}$ be two parallel morphisms in the product category which are coequalized by any morphism $(B_i \to Q_i)_{i \in I}$. Let $i_0 \in I$. We claim that $f_{i_0},g_{i_0} : A_{i_0} \rightrightarrows B_{i_0}$ are coequalized by all morphisms $B_{i_0} \to Q_{i_0}$, and hence are equal: Indeed, for all $i \neq i_0$ we may choose some morphism $B_i \to Q_i$ since $Q_i$ is weakly terminal. Thus, the morphism $B_{i_0} \to Q_{i_0}$ extends to a morphism $(B_i \to Q_i)_{i \in I}$ in the product category. By assumption, it coequalizes $(f_i)_{i \in I}$ and $(g_i)_{i \in I}$. By looking at the $i_0$-component are done.'
),
(
    'special_sequential_colimits',
    'Finite structures usually have no sequential colimits',
    'Let $\mathcal{C}$ be a category with finite powers, including a terminal object $1$. Let $a : 1 \to X$ be a morphism. Assume that the sequence of morphisms $(X^n,a) : X^n \to X^{n+1}$ for $n \geq 0$ admits a colimit $(i_n : X^n \to C)$. Then for every $m \geq 0$ there is a split epimorphism $C \to X^m$. In particular, if $U : \mathcal{C} \to \mathbf{Set}$ is a functor preserving finite powers and $\mathrm{card}(U(X)) \geq 2$, then $U(C)$ is infinite.',
    'Let $m \geq 0$ be fixed. For $n \geq 0$ we define a morphism $u_n : X^n \to X^m$ as follows: It is the projection on the first $m$ factors for $m \leq n$, and $(X^n,a^{m-n})$ for $m \geq n$ (for $m=n$ these agree). With generalized elements this says:
    <p>$u_n(x_1,\dotsc,x_n) = \begin{cases} (x_1,\dotsc,x_m) & m \leq n \\ (x_1,\dotsc,x_n,a,\dotsc,a) & m \geq n \end{cases}$</p>
    We claim that $u_n = u_{n+1} \circ (X^n,a)$, i.e.
    <p>$u_n(x_1,\dotsc,x_n) = u_{n+1}(x_1,\dotsc,x_n,a)$.</p>
    If $m \leq n$ (hence, $m \leq n+1$), both sides are equal to $(x_1,\dotsc,x_m)$. If $m > n$, i.e. $m \geq n+1$, both sides are equal to $(x_1,\dotsc,x_n,a,\dotsc,a)$. This proves the claim.
    <br>Hence, there is a unique morphism $\varphi : C \to X^m$ such that $\varphi \circ i_n = u_n$ for all $n \geq 0$. Since $u_m$ is the identity, $\varphi$ is a split epimorphism.
    <br>If $U$ is a functor with the mentioned properties, $U(\varphi)$ is also a split epimorphism from $U(C)$ to $U(X^m) \cong U(X)^m$, and $U(X)^m$ has $\geq 2^m$ elements. This holds for all $m$, so that $U(C)$ is infinite.'
),
(
    'missing_cogenerating_sets',
    'Missing cogenerating sets',
    'Let $\mathcal{C}$ be a category with a faithful functor $U: \mathcal{C} \to \mathbf{Set}$. Assume there exists a collection of objects $\mathcal{F} \subseteq \operatorname{Ob}(\mathcal{C})$ satisfying the following conditions:
    <ol>
        <li>For any $X \in \mathcal{F}$ and any non-terminal $Y \in \mathcal{C}$, for every morphism $f: X \to Y$ its underlying map $U(f) : U(X) \to U(Y)$ is injective.</li>
        <li>For every infinite cardinal number $\kappa$, there exists an object $X \in \mathcal{F}$ such that $\mathrm{card}(U(X)) \geq \kappa$ and such that $X$ has a non-identity endomorphism.</li>
    </ol>
    Then $\mathcal{C}$ does not have a cogenerating set.',
    'Assume that there is a cogenerating set $S$. By assumption (2) there is an object $X \in \mathcal{F}$ such that $U(X)$ is larger than all the $U(Y)$ with $Y \in S$ (w.r.t. cardinalities) and which has a non-identity endomorphism $\sigma : X \to X$. Since $S$ cogenerates, there is a morphism $f : X \to Y$ with $Y \in S$ and $f \sigma \neq f$. For this, $Y$ must be non-terminal. By (1) the map $U(f) : U(X) \to U(Y)$ is injective. This is a contradiction.'
),
(
    'missing_cogenerator',
    'Missing cogenerator',
    'Let $\mathcal{C}$ be a pointed category with a faithful functor $U: \mathcal{C} \to \mathbf{Set}$. Assume there exists a collection of non-zero objects $\mathcal{F} \subseteq \operatorname{Ob}(\mathcal{C})$ satisfying the following conditions:
    <ol>
        <li>For any $X \in \mathcal{F}$ and any $Y \in \mathcal{C}$, every non-zero morphism $f: X \to Y$ is injective on underlying sets.</li>
        <li>For every $Y \in \mathcal{C}$ there is some object $X \in \mathcal{F}$ such that $\mathrm{card}(U(X)) > \mathrm{card}(U(Y))$.</li>
    </ol>
    Then $\mathcal{C}$ does not have a cogenerator.',
    'Assume that there is a cogenerator $Y$. By assumption (2) there is an object $X \in \mathcal{F}$ such that $U(X)$ is larger than $U(Y)$ (w.r.t. cardinalities). Since $0,\mathrm{id}_X : X \rightrightarrows X$ are distinct, there is a morphism $f : X \to Y$ with $f \neq 0$. But then $U(f) : U(X) \to U(Y)$ is injective by assumption (1), which contradicts our choice of $X$.'
),
(
    'subobject_classifiers_coreflection',
    'Coreflection of subobject classifiers',
    'Let $\mathcal{D}$ be a category with a (regular) subobject classifier $\Omega$. Assume that $\mathcal{C} \to \mathcal{D}$ is a full subcategory such that (1) any (regular) $\mathcal{D}$-subobject of an object in $\mathcal{C}$ already lies in $\mathcal{C}$, (2) it is coreflective, i.e. there is a functor $R : \mathcal{D} \to \mathcal{C}$ right adjoint to the inclusion. Then $R(\Omega)$ is a (regular) subobject classifier in $\mathcal{C}$.',
    'If $X \in \mathcal{C}$, then $\mathrm{Hom}(X,R(\Omega)) \cong \mathrm{Hom}(X,\Omega)$ is isomorphic to the collection of $\mathcal{D}$-subobjects of $X$, which by assumption coincide with the $\mathcal{C}$-subobjects of $X$.'
);