INSERT INTO functor_property_assignments (
    functor_id,
    property_id,
    is_satisfied,
    reason
)
VALUES
(
    'free_group',
    'left adjoint',
    TRUE,
    'This functor is left adjoint to the forgetful functor.'
),
(
    'free_group',
    'monomorphism-preserving',
    TRUE,
    'This can be deduced from the description of the elements of a free group, but here is an abstract argument: Split monomorphisms are preserved by any functor. The only injective maps in $\mathbf{Set}$ that are not split are $\varnothing \hookrightarrow X$ (for non-empty $X$), and $F(\varnothing) \to F(X)$ is injective since $F(\varnothing)$ is the trivial group.'
),
(
    'free_group',
    'faithful',
    TRUE,
    'A left adjoint is faithful if and only if its unit consists of monomorphisms. So we only need to check that every set <i>embeds</i> into (the underlying set of) its free group. But this is clear since $X$ already embeds into the free abelian group $\mathbb{Z}^{\oplus X}$, which is a quotient of the free group.'
),
(
    'free_group',
    'conservative',
    TRUE,
    'Let $f : X \to Y$ be a map of sets such that $F(f) : F(X) \to F(Y)$ is an isomorphism of groups. We know that $F$ is faithful, so that it reflects monomorphisms. Thus, $f$ is injective. Choose a complement $U \subseteq Y$ of $f(X) \subseteq Y$. Then $F(X) \to F(Y) = F(X) \sqcup F(U)$ is an isomorphism. This implies $F(U)=1$ and hence $U = \varnothing$.'
),
(
    'free_group',
    'essentially surjective',
    FALSE,
    'Not every group is free (consider $\mathbb{Z}/2$).'
),
(
    'free_group',
    'terminal-object-preserving',
    FALSE,
    'The free group of rank $1$ is not the trivial group.'
),
(
    'free_group',
    'full',
    FALSE,
    'The map $1 = \mathrm{Hom}(1,1) \to \mathrm{Hom}(F(1),F(1)) = \mathrm{Hom}(\mathbb{Z},\mathbb{Z}) = \mathbb{Z}$ is not surjective.'
),
(
    'free_group',
    'equalizer-preserving',
    FALSE,
    'Let $f,g : \{a,b\} \rightrightarrows \{c,d\}$ be the two constant maps, $f \equiv c$, $g \equiv d$. Their equalizer is empty, and the free group on that equalizer is trivial. Now consider the induced group homomorphisms $F(f), F(g) : F(\{a,b\}) \rightrightarrows F(\{c,d\})$ and observe that $a \cdot b^{-1}$ lies in the kernel of both homomorphisms, hence in their equalizer.'
);
