INSERT INTO functor_property_assignments (
    functor_id,
    property_id,
    is_satisfied,
    reason
)
VALUES
(
    'forget_vector',
    'representable',
    TRUE,
    'This functor is represented by any $1$-dimensional vector space.'
),
(
    'forget_vector',
    'conservative',
    TRUE,
    'It is standard that the inverse of a bijective linear map is also linear.'
),
(
    'forget_vector',
    'finitary',
    TRUE,
    'For every algebraic category the forgetful functor to the category of sets preserves filtered colimits.'
),
(
    'forget_vector',
    'monadic',
    TRUE,
    'For every algebraic category the forgetful functor to the category of sets is monadic.'
),
(
    'forget_vector',
    'epimorphism-preserving',
    TRUE,
    'This follows from the classifications of epimorphisms in the <a href="/category/Vect">category of vector spaces</a> and in the <a href="/category/Set">category of sets</a>.'
),
(
    'forget_vector',
    'initial-object-preserving',
    FALSE,
    'The underlying set of a trivial vector space is not empty.'
),
(
    'forget_vector',
    'essentially surjective',
    FALSE,
    'The empty has has no vector space structure.'
),
(
    'forget_vector',
    'coequalizer-preserving',
    FALSE,
    'The coequalizer of $0,i_1 : K \to K^2$ in $\mathbf{Vect}$ is $p_2 : K^2 \to K$, but the coequalizer in $\mathbf{Set}$ is $(K \times K^*) \cup \{(0,0)\}$.'
);