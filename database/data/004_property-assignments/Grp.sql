INSERT INTO category_property_assignments (
	category_id,
	property_id,
	is_satisfied,
	reason
)
VALUES
(
	'Grp',
	'locally small',
	TRUE,
	'There is a forgetful functor $\mathbf{Grp} \to \mathbf{Set}$ and $\mathbf{Set}$ is locally small.'
),
(
	'Grp',
	'pointed',
	TRUE,
	'The trivial group is a zero object.'
),
(
	'Grp',
	'finitary algebraic',
	TRUE,
	'Take the algebraic theory of a group.'
),
(
	'Grp',
	'mono-regular',
	TRUE,
	'See Prop. 4.2 at the <a href="https://ncatlab.org/nlab/show/regular+monomorphism#Examples" target="_blank">nLab</a>.'
),
(
	'Grp',
	'epi-regular',
	TRUE,
	'This holds since every epimorphism is surjective, and surjective homomorphism $A \to B$ is the coequalizer of its kernel pair $A \times_B A \rightrightarrows A$.'
),
(
	'Grp',
	'Malcev',
	TRUE,
	'See Example 2.2.4 in <a href="https://ncatlab.org/nlab/show/Malcev,+protomodular,+homological+and+semi-abelian+categories" target="_blank">Malcev, protomodular, homological and semi-abelian categories</a>.'
),
(
	'Grp',
	'subobject classifier',
	FALSE,
	'If there was a subgroup classifier $\Omega$, every subgroup of any group would be the kernel of a homomorphism to $\Omega$. But not every subgroup is normal.'
),
(
	'Grp',
	'cogenerator',
	FALSE,
	'We apply <a href="/lemma/missing_cogenerator">this lemma</a> to the collection of simple groups: Any non-trivial homomorphism from a simple group to a group must be injective, and for every infinite cardinal $\kappa$ there is a simple group of size $\geq \kappa$ (for example, the alternating group on $\kappa$ elements).'
),
(
	'Grp',
	'skeletal',
	FALSE,
	'This is trivial.'
),
(
	'Grp',
	'coregular',
	FALSE,
	'This is because injective group homomorphisms are not stable under pushouts, see e.g. <a href="https://math.stackexchange.com/questions/601463/" target="_blank">MSE/601463</a> or <a href="https://math.stackexchange.com/questions/5088032" target="_blank">MSE/5088032</a>.'
),
(
	'Grp',
	'counital',
	FALSE,
	'The canonical morphism $F_2 = \mathbb{Z} \sqcup \mathbb{Z} \to \mathbb{Z} \times \mathbb{Z}$ is not a monomorphism since $F_2$ is not abelian.'
),
(
	'Grp',
	'regular quotient object classifier',
	FALSE,
	'Assume that $\mathbf{Grp}$ has a (regular) quotient object classifier, i.e. a group $P$ such that every surjective homomorphism $G \to H$ is the cokernel of a unique homomorphism $\varphi : P \to G$. Equivalently, every normal subgroup $N \subseteq G$ is $\langle \langle \varphi(P) \rangle \rangle$ for a unique homomorphism $\varphi : P \to G$, where $\langle \langle - \rangle \rangle$ denotes the normal closure. If $c_g : G \to G$ denotes the conjugation with $g \in G$, then the images of $\varphi$ and $c_g \circ \varphi$ have the same normal closures, so the homomorphisms must be equal. In other words, $\varphi$ factors through the center $Z(G)$. But then every normal subgroup of $G$, in particular $G$ itself, would be contained in $Z(G)$, which is wrong for every non-abelian group $G$.'
);