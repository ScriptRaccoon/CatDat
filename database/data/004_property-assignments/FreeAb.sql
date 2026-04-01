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
	'There is a forgetful functor $\mathbf{FreeAb} \to \mathbf{Set}$ and $\mathbf{Set}$ is locally small.'
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
	'As for $\mathbf{Ab}$, the group $\mathbb{Z}$ is a generator.'
),
(
	'FreeAb',
	'cogenerator',
	TRUE,
	'It is easy to check that $\mathbb{Z}$ is a cogenerator for free abelian groups.'
),
(
	'FreeAb',
	'regular',
	TRUE,
	'This follows formally from the fact that $\mathbf{Ab}$ is regular and $\mathbf{FreeAb}$ is closed under subobjects and finite products: By Prop. 2.5 in the <a href="https://ncatlab.org/nlab/show/regular+category">nlab</a> it suffices to prove that there are pullback-stable (reg epi, mono)-factorizations. Every homomorphism $f  : A \to B$ in $\mathbf{FreeAb}$ factors as $f = i \circ p : A \twoheadrightarrow C \hookrightarrow B$, where $C$ is a subgroup, hence free, and $A \to C$ is surjective. Clearly, surjective homomorphisms are pullback-stable. It remains to show that they coincide with the regular epimorphisms.<br>
	(1) If $f : A \to B$ is surjective, it is the coequalizer of $A \times_B A \rightrightarrows A$ in $\mathbf{Ab}$. Since $A \times_B A$ is free abelian, $f$ is also an coequalizer in $\mathbf{FreeAb}$.<br>
	(2) If $f : A \to B$ is a regular epimorphism in $\mathbf{FreeAb}$, consider the factorization $f = i \circ p$ as above. Since $f$ is an extremal epimorphism, $i$ must be an isomorphism, so that $f$ is surjective.'
),
(
	'FreeAb',
	'countable products',
	FALSE,
	'Assume that the product $P$ of countably many copies of $\mathbb{Z}$ exists in this category. The projections $P \to \mathbb{Z}$ induce an isomorphism of abelian groups $\mathrm{Hom}(\mathbb{Z}, P) \to \prod_n \mathrm{Hom}(\mathbb{Z}, \mathbb{Z})$, hence $P \cong \mathbb{Z}^{\mathbb{N}}$. But it is <a href="https://groupprops.subwiki.org/wiki/Baer-Specker_group_is_not_free_abelian" target="_blank">well-known</a> that $\mathbb{Z}^{\mathbb{N}}$ is not free abelian.'
),
(
	'FreeAb',
	'balanced',
	FALSE,
	'The homomorphism $2 : \mathbb{Z} \to \mathbb{Z}$ is a counterexample.'
),
(
	'FreeAb',
	'directed colimits',
	FALSE,
	'See <a href="https://math.stackexchange.com/questions/5025660" target="_blank">this post</a>'
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
);