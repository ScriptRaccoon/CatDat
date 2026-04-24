INSERT INTO functor_implications_view (
    id,
    assumptions,
    source_assumptions,
    target_assumptions,
    conclusions,
    reason,
    is_equivalence
)
VALUES
    (
        'equivalence_criterion',
        '["full", "faithful", "essentially surjective"]',
        '[]',
        '[]',
        '["equivalence"]',
        'This is standard, see <a href="https://ncatlab.org/nlab/show/Categories+for+the+Working+Mathematician" target="_blank">Mac Lane</a>, Ch. IV, Theorem 4.1.',
        TRUE
    ),
    (
        'continuous_consequences',
        '["continuous"]',
        '[]',
        '[]',
        '["product-preserving", "equalizer-preserving", "cofinitary"]',
        'This is trivial.',
        FALSE
    ),
    (
        'products_consequences',
        '["product-preserving"]',
        '[]',
        '[]',
        '["finite-product-preserving"]',
        'This is trivial.',
        FALSE
    ),
    (
        'finite_products_consequences',
        '["finite-product-preserving"]',
        '[]',
        '[]',
        '["terminal-object-preserving"]',
        'This is trivial.',
        FALSE
    ),
    (
        'continuous_criterion',
        '["product-preserving", "equalizer-preserving"]',
        '["products"]',
        '[]',
        '["continuous"]',
        'This follows from the construction of limits via equalizers and products, see  <a href="https://ncatlab.org/nlab/show/Categories+for+the+Working+Mathematician" target="_blank">Mac Lane</a>, Ch. V, Theorem 2.2.',
        FALSE
    ),
    (
        'continuous_criterion_filtered',
        '["left exact", "cofinitary"]',
        '["finitely complete"]',
        '[]',
        '["continuous"]',
        'This is because every limit can be written as a filtered limit of finite limits, see <a href="https://ncatlab.org/nlab/show/Categories+for+the+Working+Mathematician" target="_blank">Mac Lane</a>, Ch. IX, Theorem 1.1.',
        FALSE
    ),
    (
        'product_criterion_filtered',
        '["finite-product-preserving", "cofinitary"]',
        '["finite products"]',
        '[]',
        '["product-preserving"]',
        'This is because every product can be written as a filtered limit of finite products, see <a href="https://ncatlab.org/nlab/show/Categories+for+the+Working+Mathematician" target="_blank">Mac Lane</a>, Ch. IX, Theorem 1.1.',
        FALSE
    ),
    (
        'exact_definition',
        '["exact"]',
        '[]',
        '[]',
        '["left exact", "right exact"]',
        'This holds by definition.',
        TRUE
    ),
    (
        'left_exact_consequences',
        '["left exact"]',
        '[]',
        '[]',
        '["finite-product-preserving", "terminal-object-preserving"]',
        'Both finite products and terminal objects are special cases of finite limits.',
        FALSE
    ),
    (
        'left_exact_criterion',
        '["finite-product-preserving", "equalizer-preserving"]',
        '["finite products"]',
        '[]',
        '["left exact"]',
        'This follows from the construction of finite limits via equalizers and finite products, see  <a href="https://ncatlab.org/nlab/show/Categories+for+the+Working+Mathematician" target="_blank">Mac Lane</a>, Ch. V, Theorem 2.2.',
        FALSE
    ),
    (
        'equivalence_consequences',
        '["equivalence"]',
        '[]',
        '[]',
        '["continuous", "right adjoint", "monadic"]',
        'This is easy.',
        FALSE
    ),
    (
        'right_adjoint_consequences',
        '["right adjoint"]',
        '[]',
        '[]',
        '["continuous"]',
        'This is standard, see <a href="https://ncatlab.org/nlab/show/Categories+for+the+Working+Mathematician" target="_blank">Mac Lane</a>, Ch. V, Theorem 5.1.',
        FALSE
    ),
    (
        'saft',
        '["continuous"]',
        '["complete", "locally small", "well-powered", "cogenerating set"]',
        '["locally small"]',
        '["right adjoint"]',
        'This is the Special Adjoint Functor Theorem. The proof can be found, for example, at the <a href="https://ncatlab.org/nlab/show/adjoint+functor+theorem" target="_blank">nLab</a>, or in <a href="https://ncatlab.org/nlab/show/Categories+for+the+Working+Mathematician" target="_blank">Mac Lane</a>, Ch. V, Theorem 8.2.',
        FALSE
    ),
    (
        'monadic_consequences',
        '["monadic"]',
        '[]',
        '[]',
        '["faithful", "right adjoint", "conservative"]',
        'This is clear since for a monad $T$ the forgetful functor from the category of $T$-algebras has these properties.',
        FALSE
    ),
    (
        'representable_is_continuous',
        '["representable"]',
        '[]',
        '[]',
        '["continuous"]',
        'This is standard, see <a href="https://ncatlab.org/nlab/show/Categories+for+the+Working+Mathematician" target="_blank">Mac Lane</a>, Ch. V, Theorem 4.1.',
        FALSE
    ),
    (
        'left_exact_preserves_mono',
        '["left exact"]',
        '[]',
        '[]',
        '["monomorphism-preserving"]',
        'This is because $f : X \to Y$ is a monomorphism if and only the square displaying $\mathrm{id}_Y \circ f = \mathrm{id}_Y \circ f$ is a pullback square.',
        FALSE
    ),
    (
        'faithful-via-equalizers',
        '["equalizer-preserving", "conservative"]',
        '["equalizers"]',
        '[]',
        '["faithful"]',
        'Let $f,g : X \rightrightarrows Y$ be two morphisms in the source category, and choose an equalizer $E \hookrightarrow X$. By assumption, $F(E) \to F(X)$ is the equalizer of $F(f),F(g) : F(X) \rightrightarrows F(Y)$. Thus, if $F(f) = F(g)$, then $F(E) \to F(X)$ is an isomorphism. Since $F$ is conservative, $E \to X$ is an isomorphism, which means $f = g$.',
        FALSE
    ),
    (
        'monadic_full_trivial',
        '["monadic", "full"]',
        '[]',
        '[]',
        '["equivalence"]',
        'Assume that $T$ is a monad on $\mathcal{C}$ such that the forgetful functor $U : \mathbf{Alg}(T) \to \mathcal{C}$ is full. Then by general facts about adjunctions (see <a href="https://math.stackexchange.com/questions/1994963" target="_blank">MSE/1994963</a>) the unit $\eta : \mathrm{id}_{\mathcal{C}} \to T$ is an isomorphism of functors. Then it is an isomorphism of monads, so that $U$ is an equivalence.',
        FALSE
    );