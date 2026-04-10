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
);