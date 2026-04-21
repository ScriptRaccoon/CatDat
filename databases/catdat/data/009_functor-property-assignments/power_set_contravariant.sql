INSERT INTO functor_property_assignments (
    functor_id,
    property_id,
    is_satisfied,
    reason
)
VALUES
(
    'power_set_contravariant',
    'representable',
    TRUE,
    'This is because there are natural bijections $P(X) \cong \mathrm{Hom}(X,2)$, sending a subset to its characteristic function.'
),
(
    'power_set_contravariant',
    'monadic',
    TRUE,
    'See <a href="https://ncatlab.org/nlab/show/Sketches+of+an+Elephant" target="_blank">Johnstone</a>, Theorem 2.2.7.'
),
(
    'power_set_contravariant',
    'epimorphism-preserving',
    TRUE,
    'If $f : X \to Y$ is injective, then $f^* : P(Y) \to P(X)$ is surjective, since for all $A \subseteq X$ we have $A = f^*(f_*(A))$.'
),
(
    'power_set_contravariant',
    'coequalizer-preserving',
    FALSE,
    'The power set functor preserves reflexive coequalizers, but not all coequalizers, i.e. there are maps $f,g : Y \to X$ with equalizer $E \subseteq Y$ such that $P(Y) \twoheadrightarrow P(E)$ is not the coequalizer of $f^*,g^* : P(X) \to P(Y)$: Let $X=\{0,1\}$ and $Y=\{a,b,c\}$. Define maps $f,g:Y\to X$ by $f(a)=0$, $f(b)=0$, $f(c)=1$ and $g(a)=0$, $g(b)=1$, $g(c)=0$. Their equalizer is $E = \{a\}$, so that $P(E)$ has $2$ elements. For $S=\{0\}$ one has $f^*(S)=\{a,b\}$, $g^*(S)=\{a,c\}$, and for $S=\{1\}$ one has $f^*(S)=\{c\}$, $g^*(S)=\{b\}$. Thus the coequalizer of $f^*,g^*$ is obtained from $P(Y)$ by imposing the two relations $\{a,b\} \sim \{a,c\}$ and $\{c\} \sim \{b\}$. But then it as $8-2 = 6$ elements.'
),
(
    'power_set_contravariant',
    'initial-object-preserving',
    FALSE,
    'In fact, the initial object does not even lie in the essential image since $P(X) \neq 0$ for all $X$.'
),
(
    'power_set_contravariant',
    'finitary',
    FALSE,
    'Consider the sequence of projections $\cdots \twoheadrightarrow \{0,1\}^2 \twoheadrightarrow \{0,1\}^1$. Its limit in $\mathbf{Set}$ (i.e. colimit in $\mathbf{Set}^{\mathrm{op}}$) is $\{0,1\}^{\mathbb{N}}$, which is uncountable, so that $P(\{0,1\}^{\mathbb{N}})$ is also uncountable. But the colimit of the induced diagram $P(\{0,1\}^1) \hookrightarrow P(\{0,1\}^2) \hookrightarrow \cdots$ is countable since each $P(\{0,1\}^n)$ is finite.'
),
(
    'power_set_contravariant',
    'essentially surjective',
    FALSE,
    'The initial object does not lie in the essential image since $P(X) \neq 0$ for all $X$.'
),
(
    'power_set_contravariant',
    'full',
    FALSE,
    'The maps $f^* : P(Y) \to P(X)$ preserve the empty set, so take the constant map $P(X) \to P(X)$, $T \mapsto X$ for instance (where $X$ is non-empty).'
);
