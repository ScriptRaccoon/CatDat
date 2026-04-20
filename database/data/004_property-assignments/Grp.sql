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
	'This holds since every epimorphism is surjective, and a surjective homomorphism $A \to B$ is the coequalizer of its kernel pair $A \times_B A \rightrightarrows A$.'
),
(
	'Grp',
	'Malcev',
	TRUE,
	'See Example 2.2.4 in <a href="https://ncatlab.org/nlab/show/Malcev,+protomodular,+homological+and+semi-abelian+categories" target="_blank">Malcev, protomodular, homological and semi-abelian categories</a>.'
),
(
	'Grp',
	'conormal',
	TRUE,
	'Since epimorphisms are surjective (see below), this is the first isomorphism theorem for groups.'
),
(
	'Grp',
	'normal',
	FALSE,
	'Every non-normal subgroup provides a counterexample.'
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
	'CIP',  -- TODO: remove code duplication with "counital" proof
	FALSE,
	'The canonical morphism $F_2 = \mathbb{Z} \sqcup \mathbb{Z} \to \mathbb{Z} \times \mathbb{Z}$ is not a monomorphism since $F_2$ is not abelian.'
),
(
	'Grp',
	'regular quotient object classifier',
	FALSE,
	'Assume that $\mathbf{Grp}$ has a (regular) quotient object classifier, i.e. a group $P$ such that every surjective homomorphism $G \to H$ is the cokernel of a unique homomorphism $\varphi : P \to G$. Equivalently, every normal subgroup $N \subseteq G$ is $\langle \langle \varphi(P) \rangle \rangle$ for a unique homomorphism $\varphi : P \to G$, where $\langle \langle - \rangle \rangle$ denotes the normal closure. If $c_g : G \to G$ denotes the conjugation with $g \in G$, then the images of $\varphi$ and $c_g \circ \varphi$ have the same normal closures, so the homomorphisms must be equal. In other words, $\varphi$ factors through the center $Z(G)$. But then every normal subgroup of $G$, in particular $G$ itself, would be contained in $Z(G)$, which is wrong for every non-abelian group $G$.'
),
(
	'Grp',
	'cocartesian cofiltered limits',
	FALSE,
	'For cofiltered diagrams of groups $(H_i)$ and a group $G$ the canonical homomorphism
	<br>$\alpha : G \sqcup \lim_i H_i \to \lim_i (G \sqcup H_i)$<br>
	is injective, but often fails to be surjective because the components of an element in the image have bounded <i>free product length</i> (the number of factors appearing in the reduced form). Specifically, consider the free groups $G = \langle y \rangle$ and $H_n = \langle x_1,\dotsc,x_n \rangle$ for $n \in \mathbb{N}$ with the truncation maps $H_{n+1} \to H_n$, $x_{n+1} \mapsto 1$. Define
	<br>$p_n := x_1 \, y \, x_2 \, y \, \cdots \, x_{n-1} \, y \, x_n \, y^{-(n-1)} \in G \sqcup H_n$.<br>
	If we substitute $x_{n+1}=1$ in $p_{n+1}$, we get $p_n$. Thus, we have $p = (p_n) \in \lim_n (G \sqcup H_n)$. This element does not lie in the image of $\alpha$ since the free product length of $p_n$ (which is well-defined) is $2n$, which is unbounded.'
),
(
	'Grp',
	'CSP',
	FALSE,
	'The canonical homomorphism $\coprod_{n \geq 0} \mathbb{Z} \to \prod_{n \geq 0} \mathbb{Z}$ is not surjective because its domain is countable and its codomain is uncountable. Hence it is no epimorphism.'
);