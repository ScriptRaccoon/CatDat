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
);