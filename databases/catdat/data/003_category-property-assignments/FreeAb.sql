INSERT INTO category_property_assignments (
	category_id,
	property_id,
	is_satisfied,
	reason
)
VALUES
(
	'FreeAb',
	'locally small',
	TRUE,
	'There is a forgetful functor $\FreeAb \to \Set$ and $\Set$ is locally small.'
),
(
	'FreeAb',
	'additive',
	TRUE,
	'This follows easily from the fact for abelian groups.'
),
(
	'FreeAb',
	'coproducts',
	TRUE,
	'This is is because free abelian groups are closed under direct sums of abelian groups.'
),
(
	'FreeAb',
	'well-powered',
	TRUE,
	'This is clear since the monomorphisms are injective.'
),
(
	'FreeAb',
	'well-copowered',
	TRUE,
	'See <a href="https://math.stackexchange.com/questions/5025660" target="_blank">MSE/5025660</a>.'
),
(
	'FreeAb',
	'equalizers',
	TRUE,
	'Subgroups of free abelian groups are free abelian.'
),
(
	'FreeAb',
	'generator',
	TRUE,
	'As for $\Ab$, the group $\IZ$ is a generator.'
),
(
	'FreeAb',
	'cogenerator',
	TRUE,
	'It is easy to check that $\IZ$ is a cogenerator for free abelian groups.'
),
(
	'FreeAb',
	'regular',
	TRUE,
	'This follows formally from the fact that $\Ab$ is regular and $\FreeAb$ is closed under subobjects and finite products: By Prop. 2.5 in the <a href="https://ncatlab.org/nlab/show/regular+category">nlab</a> it suffices to prove that there are pullback-stable (reg epi, mono)-factorizations. Every homomorphism $f  : A \to B$ in $\FreeAb$ factors as $f = i \circ p : A \twoheadrightarrow C \hookrightarrow B$, where $C$ is a subgroup, hence free, and $A \to C$ is surjective. Clearly, surjective homomorphisms are pullback-stable. It remains to show that they coincide with the regular epimorphisms.<br>
	(1) If $f : A \to B$ is surjective, it is the coequalizer of $A \times_B A \rightrightarrows A$ in $\Ab$. Since $A \times_B A$ is free abelian, $f$ is also an coequalizer in $\FreeAb$.<br>
	(2) If $f : A \to B$ is a regular epimorphism in $\FreeAb$, consider the factorization $f = i \circ p$ as above. Since $f$ is an extremal epimorphism, $i$ must be an isomorphism, so that $f$ is surjective.'
),
(
	'FreeAb',
	'countable powers',
	FALSE,
	'Assume that the power $P = \prod_{n \geq 0} \IZ$ exists in this category. The projections $P \to \IZ$ induce an isomorphism of abelian groups $\Hom(\IZ, P) \to \prod_n \Hom(\IZ, \IZ)$, hence $P \cong \IZ^{\IN}$. But it is <a href="https://groupprops.subwiki.org/wiki/Baer-Specker_group_is_not_free_abelian" target="_blank">well-known</a> that $\IZ^{\IN}$ is not free abelian.'
),
(
	'FreeAb',
	'balanced',
	FALSE,
	'The homomorphism $2 : \IZ \to \IZ$ is a counterexample.'
),
(
	'FreeAb',
	'skeletal',
	FALSE,
	'This is trivial.'
),
(
	'FreeAb',
	'sequential colimits',
	FALSE,
	'See <a href="https://mathoverflow.net/questions/509715" target="_blank">MO/509715</a>.'
),
(
	'FreeAb',
	'effective cocongruences',
	FALSE,
	'We will let $E$ be the abelian group with presentation $\langle a, b, c \mid a - b = 2c \rangle$, with two morphisms $\mathbb{Z} \rightrightarrows E$ given by $1\mapsto a$, $1\mapsto b$. Note that $E$ is free with basis $\{ b, c \}$. Then $\operatorname{Hom}(E, G) \cong \{ (x, y, z) \in G^3 \mid x - y = 2z \}$. Observe that since $G$ is torsion-free, the projection onto the first two coordinates is injective; and $(x, y)$ is in the image precisely when $x \equiv y \pmod{2G}$, which gives an equivalence relation. Therefore, $E$ gives a cocongruence on $\mathbb{Z}$.<br>
	On the other hand, if $E$ were the cokernel pair of $h : H \to \mathbb{Z}$, that would mean that for $x, y : \mathbb{Z} \to G$, $x \equiv y \pmod{2G}$ if and only if $x \circ h = y \circ h$. In particular, from the case $G := \mathbb{Z}$, $x := 2 \operatorname{id}$, $y := 0$, we would have $2h = 0$. That implies $h = 0$, but then that would give $\operatorname{id}_{\mathbb{Z}} \equiv 0 \pmod{2}$, resulting in a contradiction.'
);

INSERT INTO category_property_comments (category_id, property_id, comment)
VALUES
(
    'FreeAb',
    'accessible',
    'The question if this category is accessible is undecidable in ZFC. See <a href="https://math.stackexchange.com/questions/720885" target="_blank">MSE/720885</a>.'
);
