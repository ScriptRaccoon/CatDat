INSERT INTO functor_property_assignments (
    functor_id,
    property_id,
    is_satisfied,
    reason
)
VALUES
(
    'power_set_covariant',
    'monomorphism-preserving',
    TRUE,
    'If $f : X \to Y$ is injective, then $f^* \circ f_* = \mathrm{id}_{P(X)}$, so that $f_*$ is injective.'
),
(
    'power_set_covariant',
    'epimorphism-preserving',
    TRUE,
    'If $f : X \to Y$ is surjective, then $f_* \circ f^* = \mathrm{id}_{P(Y)}$, so that $f^*$ is surjective.'
),
(
    'power_set_covariant',
    'faithful',
    TRUE,
    'Let $f,g : X \rightrightarrows Y$ be two maps with $f_* = g_* : P(X) \rightrightarrows P(Y)$. Then $\{f(x)\} = f_*(\{x\}) = g_*(\{x\}) = \{g(x)\}$ and hence $f(x) = g(x)$ for all $x \in X$.'
),
(
    'power_set_covariant',
    'conservative',
    TRUE,
    'Assume that $f : X \to Y$ is a map such that $f_* : P(X) \to P(Y)$ is an isomorphism. There is some $A \subseteq X$ with $Y = f_*(A)$, this proves that $f$ is surjective. It is also injective: If $x,y \in X$ satisfy $f(x) = f(y)$, then $f_*(\{x\}) = f_*(\{y\})$, and hence $\{x\} = \{y\}$, i.e. $x = y$.'
),
(
    'power_set_covariant',
    'full',
    FALSE,
    'Take any map $P(X) \to P(X)$ that does not preserve the empty set, say the constant map with value $X$ (for $X \neq \varnothing$).'
),
(
    'power_set_covariant',
    'terminal-object-preserving',
    FALSE,
    'We have $2^1 \neq 1$.'
),
(
    'power_set_covariant',
    'initial-object-preserving',
    FALSE,
    'We have $2^0 \neq 0$.'
),
(
    'power_set_covariant',
    'essentially surjective',
    FALSE,
    'Every power set is non-empty.'
),
(
    'power_set_covariant',
    'finitary',
    FALSE,
    'The filtered colimit $\mathbb{N} = \bigcup_{n \geq 0} \mathbb{N}_{\leq n}$ is not preserved by $P$, since $\bigcup_{n \geq 0} P(\mathbb{N}_{\leq n})$ just consists of the <i>finite</i> subsets of $\mathbb{N}$.'
),
(
    'power_set_covariant',
    'equalizer-preserving',
    FALSE,
    'Any pair of distinct surjective maps $f,g : X \rightrightarrows Y$ provides a counterexample: Their equalizer $E$ is a proper subset of $X$, so that $P(E)$ cannot contain $X$. But $f_*(X) = Y = g_*(X)$ shows that $X$ is contained in the equalizer of $f_*,g_* : P(X) \rightrightarrows P(Y)$.'
),
(
    'power_set_covariant',
    'coequalizer-preserving',
    FALSE,
    'Let $X := \{x,y\}$. Consider the two maps $x,y : \{0\} \rightrightarrows X$. Their coequalizer $Q = X / (x = y)$ has just one element, so that $P(Q)$ has two elements. The induced maps $x_*,y_* : P(\{0\}) \rightrightarrows P(X)$ (which already agree on the empty set) have coequalizer $P(X) / (\{x\} = \{y\})$, which has $3$ elements. So it cannot be $P(Q)$.'
);
