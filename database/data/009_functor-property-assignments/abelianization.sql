INSERT INTO functor_property_assignments (
    functor_id,
    property_id,
    is_satisfied,
    reason
)
VALUES
(
    'abelianization',
    'left adjoint',
    TRUE,
    'This functor is left adjoint to the forgetful functor.' 
),
(
    'abelianization',
    'finite-product-preserving',
    TRUE,
    'See <a href="https://mathoverflow.net/questions/386144">MO/386144</a>.'
),
(
    'abelianization',
    'product-preserving',
    FALSE,
    'If $G$ is a group, the canonical homomorphism $(G^{\mathbb{N}})^{\mathrm{ab}} \to (G^{\mathrm{ab}})^{\mathbb{N}}$ is surjective, but does not need to be an isomorphism: otherwise, the inclusion $[G^{\mathbb{N}}, G^{\mathbb{N}}] \subseteq [G,G]^{\mathbb{N}}$ would be an equality. But this requires the commutator width of $G$ to be finite, which fails for $G = F_2$ for instance. See also <a href="https://arxiv.org/abs/1608.02220">The abelianization of inverse limits of groups</a>, Remark 0.0.7.'
),
(
    'abelianization',
    'monomorphism-preserving',
    FALSE,
    'The monomorphism $A_3 \hookrightarrow S_3$ is mapped to $A_3 \to 1$.'
),
(
    'abelianization',
    'essentially surjective',
    TRUE,
    'For abelian groups $G$ we have $G \cong G^{\mathrm{ab}}$.'
),
(
    'abelianization',
    'faithful',
    FALSE,
    'Both the inclusion $A_3 \hookrightarrow S_3$ and the trivial homomorphism $A_3 \to S_3$ are mapped to the trivial homomorphism $A_3 \to 1$.'
),
(
    'abelianization',
    'conservative',
    FALSE,
    'The proper inclusion $S_3 \hookrightarrow S_4$ gets mapped to the trivial homomorphism $1 \to 1$, which is an isomorphism.'
),
(
    'abelianization',
    'full',
    FALSE,
    'See <a href="https://math.stackexchange.com/questions/716686" target="_blank">MSE/716686</a>.'
);