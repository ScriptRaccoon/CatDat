INSERT INTO functor_properties (
    id,
    relation,
    description,
    nlab_link,
    invariant_under_equivalences,
    dual_property_id
)
VALUES 
    (
        'faithful',
        'is',
        'A functor is faithful when it is injective on Hom-sets: If $F(f)=F(g)$, then $f=g$.',
        'https://ncatlab.org/nlab/show/faithful+functor',
        TRUE,
        'faithful'
    ),
    (
        'full',
        'is',
        'A functor is full when it is surjective on Hom-sets: Every morphism $F(A) \to F(B)$ is induced by a morphism $A \to B$.',
        'https://ncatlab.org/nlab/show/full+functor',
        TRUE,
        'full'
    ),
    (
        'essentially surjective',
        'is',
        'A functor $F : \mathcal{C} \to \mathcal{D}$ is essentially surjective when every object $Y \in \mathcal{D}$ is isomorphic to $F(X)$ for some $X \in \mathcal{C}$.',
        'https://ncatlab.org/nlab/show/essentially+surjective+functor',
        TRUE,
        'essentially surjective'
    ),
    (
        'equivalence',
        'is an',
        'A functor is an equivalence if it has a pseudo-inverse functor.',
        'https://ncatlab.org/nlab/show/equivalence+of+categories',
        TRUE,
        'equivalence'
    ),
    (
        'continuous',
        'is',
        'A functor is continuous when it preserves all small limits.',
        'https://ncatlab.org/nlab/show/continuous+functor',
        TRUE,
        'cocontinuous'
    ),
    (
        'cocontinuous',
        'is',
        'A functor is cocontinuous when it preserves all small colimits.',
        'https://ncatlab.org/nlab/show/cocontinuous+functor',
        TRUE,
        'continuous'
    ),
    -- Here is why we do not call this property "preserves products":
    -- Either we name the property "preserves products" and choose the
    -- empty relation '' (instead of 'is'). But then negations will not be
    -- formatted properly ("does not preserves products").
    -- Or we name property "products" and choose the relation 'preserves'.
    -- But then we will never be able to add the properties of "reflecting products",
    -- "creating products", etc.
    (
        'product-preserving',
        'is',
        'A functor $F$ preserves products when for every family of objects $(A_i)$ in the source whose product $\prod_i A_i$ exists, also the product $\prod_i F(A_i)$ exists in the target and such that the canonical morphism $F(\prod_i A_i) \to \prod_i F(A_i)$ is an isomorphism.',
        NULL,
        TRUE,
        'coproduct-preserving'
    ),
    (
        'coproduct-preserving',
        'is',
        'A functor $F$ preserves coproducts when for every family of objects $(A_i)$ in the source whose coproduct $\prod_i A_i$ exists, also the coproduct $\coprod_i F(A_i)$ exists in the target and such that the canonical morphism $\coprod_i F(A_i) \to F(\coprod_i A_i)$ is an isomorphism.',
        NULL,
        TRUE,
        'product-preserving'
    ),
    (
        'finite-product-preserving',
        'is',
        'A functor $F$ preserves finite products when for every finite family of objects $(A_i)$ in the source whose product $\prod_i A_i$ exists, also the product $\prod_i F(A_i)$ exists in the target and such that the canonical morphism $F(\prod_i A_i) \to \prod_i F(A_i)$ is an isomorphism.',
        NULL,
        TRUE,
        'finite-coproduct-preserving'
    ),
    (
        'finite-coproduct-preserving',
        'is',
        'A functor $F$ preserves finite coproducts when for every family of objects $(A_i)$ in the source whose coproduct $\prod_i A_i$ exists, also the coproduct $\coprod_i F(A_i)$ exists in the target and such that the canonical morphism $\coprod_i F(A_i) \to F(\coprod_i A_i)$ is an isomorphism.',
        NULL,
        TRUE,
        'finite-product-preserving'
    ),
    (
        'terminal-object-preserving',
        'is',
        'A functor $F$ preserves terminal objects when it maps every terminal object to a terminal object. It is not assumed that the source category has a terminal object.',
        NULL,
        TRUE,
        'initial-object-preserving'
    ),
    (
        'initial-object-preserving',
        'is',
        'A functor $F$ preserves initial objects when it maps every initial object to an initial object. It is not assumed that the source category has a initial object.',
        NULL,
        TRUE,
        'terminal-object-preserving'
    ),
    (
        'equalizer-preserving',
        'is',
        'A functor $F$ preserves equalizers when for every parallel pair of morphisms $f,g : A \to B$ whose equalizer $i : E \to A$ exists, also $F(i) : F(E) \to F(A)$ is an equalizer of $F(f),F(g) : F(A) \to F(B)$.',
        NULL,
        TRUE,
        'coequalizer-preserving'
    ),
    (
        'coequalizer-preserving',
        'is',
        'A functor $F$ preserves coequalizers when for every parallel pair of morphisms $f,g : A \to B$ whose coequalizer $p : B \to Q$ exists, also $F(p) : F(B) \to F(Q)$ is an coequalizer of $F(f),F(g) : F(A) \to F(B)$.',
        NULL,
        TRUE,
        'equalizer-preserving'
    ),
    (
        'left adjoint',
        'is a',
        'A functor $F : \mathcal{C} \to \mathcal{D}$ is a left adjoint when there is a functor $G : \mathcal{D} \to \mathcal{C}$ such that there are natural bijections $\hom(F(A),B) \cong \hom(A,G(B))$.',
        'https://ncatlab.org/nlab/show/left+adjoint',
        TRUE,
        'right adjoint'
    ),
    (
        'right adjoint',
        'is a',
        'A functor $F : \mathcal{C} \to \mathcal{D}$ is a right adjoint when there is a functor $G : \mathcal{D} \to \mathcal{C}$ such that there are natural bijections $\hom(G(A),B) \cong \hom(A,F(B))$.',
        'https://ncatlab.org/nlab/show/right+adjoint',
        TRUE,
        'left adjoint'
    ),
    (
        'monadic',
        'is',
        'A functor $F : \mathcal{C} \to \mathcal{D}$ is monadic when there is a monad $T$ on $\mathcal{D}$ such that $F$ is equivalent to the forgetful functor $U^T : \mathbf{Alg}(T) \to \mathcal{D}$.',
        'https://ncatlab.org/nlab/show/monadic+functor',
        TRUE,
        'comonadic'
    ),
    (
        'comonadic',
        'is',
        'A functor $F : \mathcal{C} \to \mathcal{D}$ is comonadic when there is a comonad $T$ on $\mathcal{D}$ such that $F$ is equivalent to the forgetful functor $U^T : \mathbf{CoAlg}(T) \to \mathcal{D}$.',
        'https://ncatlab.org/nlab/show/comonadic+functor',
        TRUE,
        'monadic'
    ),
    (
        'conservative',
        'is',
        'A functor $F : \mathcal{C} \to \mathcal{D}$ is conservative when it is isomorphic-reflecting: If $f$ is a morphism in $\mathcal{C}$ such that $F(f)$ is an isomorphism, then $f$ is an isomorphism.',
        'https://ncatlab.org/nlab/show/conservative+functor',
        TRUE,
        'conservative'
    ),
    (
        'finitary',
        'is',
        'A functor is finitary when it preserves filtered colimits.',
        'https://ncatlab.org/nlab/show/finitary+functor',
        TRUE,
        'cofinitary'
    ),
    (
        'cofinitary',
        'is',
        'A functor is cofinitary when it preserves cofiltered limits.',
        NULL,
        TRUE,
        'finitary'
    ),
    (
        'left exact',
        'is',
        'A functor is left exact when it preserves finite limits.',
        'https://ncatlab.org/nlab/show/exact+functor',
        TRUE,
        'right exact'
    ),
    (
        'right exact',
        'is',
        'A functor is right exact when it preserves finite colimits.',
        'https://ncatlab.org/nlab/show/exact+functor',
        TRUE,
        'left exact'
    ),
    (
        'exact',
        'is',
        'A functor is exact when it is left exact and right exact.',
        'https://ncatlab.org/nlab/show/exact+functor',
        TRUE,
        'exact'
    ),
    (
        'representable',
        'is',
        'A functor $F : \mathcal{C} \to \mathcal{D}$ is representable if $\mathcal{C}$ is locally small, $\mathcal{D} = \mathbf{Set}$, and there is an object $A \in \mathcal{C}$ with $F \cong \mathrm{Hom}(A,-)$.',
        'https://ncatlab.org/nlab/show/representable+functor',
        TRUE,
        NULL
    ),
    (
        'monomorphism-preserving',
        'is',
        'A functor $F : \mathcal{C} \to \mathcal{D}$ preserves monomorphisms if every monomorphism in $\mathcal{C}$ is mapped to a monomorphism in $\mathcal{D}$.<br>This property is useful to rule out some adjunctions.',
        'https://ncatlab.org/nlab/show/monomorphism',
        TRUE,
        'epimorphism-preserving'
    ),
    (
        'epimorphism-preserving',
        'is',
        'A functor $F : \mathcal{C} \to \mathcal{D}$ preserves epimorphisms if every epimorphism in $\mathcal{C}$ is mapped to an epimorphism in $\mathcal{D}$.<br>This property is useful to rule out some adjunctions.',
        'https://ncatlab.org/nlab/show/epimorphism',
        TRUE,
        'monomorphism-preserving'
    );
