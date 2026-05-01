INSERT INTO category_property_assignments (
	category_id,
	property_id,
	is_satisfied,
	reason
)
VALUES
(
	'TorsFreeAb',
	'locally small',
	TRUE,
	'There is a forgetful functor $\mathbf{TorsFreeAb} \to \mathbf{Ab}$ and $\mathbf{Ab}$ is locally small.'
),
(
	'TorsFreeAb',
	'complete',
	TRUE,
	'The embedding $\mathbf{TorsFreeAb} \hookrightarrow \mathbf{Ab}$ is closed under limits and $\mathbf{Ab}$ is complete.'
),
(
	'TorsFreeAb',
	'cocomplete',
	TRUE,
	'The embedding $\mathbf{TorsFreeAb} \hookrightarrow \mathbf{Ab}$ has a left adjoint, sending an abelian group $A$ to its torsion-free reflection $A/T(A)$, where $T(A)$ is the torsion subgroup of $A$. Since $\mathbf{Ab}$ is cocomplete, $\mathbf{TorsFreeAb}$ is cocomplete as well. The colimit of a diagram of torsion-free abelian groups is the torsion-free reflection of the colimit of the underlying abelian groups. Notice that the reflection is not required in the case of coproducts: the direct sum of torsion-free abelian groups is again torsion-free. It is also not required for filtered colimits.'
),
(
	'TorsFreeAb',
	'finitely accessible',
	TRUE,
	'We already saw that filtered colimits exist and are preserved by the forgetful functor to $\mathbf{Ab}$. Every torsion-free abelian group is the filtered colimit of its finitely generated subgroups, which are in fact free. Finitely generated free abelian groups are finitely presentable in $\mathbf{Ab}$ and therefore also in $\mathbf{TorsFreeAb}$.'
),
(
	'TorsFreeAb',
	'preadditive',
	TRUE,
	'It is a full subcategory of the preadditive category $\mathbf{Ab}$.'
),
(
	'TorsFreeAb',
	'cogenerator',
	TRUE,
	'The additive group $\mathbb{Q}$ is a cogenerator since every torsion-free abelian group $A$ embeds into $A \otimes \mathbb{Q}$, which is a vector space over $\mathbb{Q}$, and by linear algebra $K$ is a cogenerator in the category of vector spaces over $K$.'
),
(
	'TorsFreeAb',
	'regular',
	TRUE,
	'The regular epimorphisms are exactly the surjective homomorphisms (see below), and these are clearly stable under pullbacks.'
),
(
	'TorsFreeAb',
	'coregular',
	TRUE,
	'It suffices to prove that regular monomorphisms (which are classified below) are stable under pushouts. Let $i : A \to B$ be a regular monomorphism in $\mathbf{TorsFreeAb}$, i.e. $i$ is injective and its $\mathbf{Ab}$-cokernel $B/i(A)$ is torsion-free, and let $f : B \to C$ be any morphism in $\mathbf{TorsFreeAb}$. Their $\mathbf{Ab}$-pushout is
	$$P = (B \times C)/\{(i(a),-f(a)): a \in A\}.$$
	It is torsion-free: If $n \in \mathbb{Z} \setminus \{0\}$ and $n (b,c) = (i(a),-f(a))$, there is some $a'' \in A$ with $b = i(a'')$ since $B/i(A)$ is torsion-free. It follows $n a'' = a$, and then $c = -f(a'')$ since $C$ is torsion-free. Thus, $(b,c) = (i(a''),-f(a''))$, which proves our claim. Therefore, $P$ is also the pushout in $\mathbf{TorsFreeAb}$. The homomorphism $j : C \to P$, $j(c) = [0,c]$ is injective (since $\mathbf{Ab}$ is coregular, but a direct proof is also easy), and by the universal property of $P$ its $\mathbf{Ab}$-cokernel is isomorphic to the $\mathbf{Ab}$-cokernel of $i$, which is torsion-free.'
),
(
	'TorsFreeAb',
	'skeletal',
	FALSE,
	'This is trivial.'
),
(
	'TorsFreeAb',
	'balanced',
	FALSE,
	'It can be checked directly that $2 : \mathbb{Z} \to \mathbb{Z}$ is both a monomorphism and an epimorphism, but no isomorphism. This also follows from the general classification of mono- and epimorphisms below.'
),
(
	'TorsFreeAb',
	'CSP',
	FALSE,
	'The canonical homomorphism $\bigoplus_{n \geq 0} \mathbb{Z} \to \prod_{n \geq 0} \mathbb{Z}$ is injective, but not an epimorphism, since the quotient $\prod_{n \geq 0} \mathbb{Z} / \bigoplus_{n \geq 0} \mathbb{Z}$ is not torsion. In fact, it is torsion-free and non-zero.'
),
(
	-- TODO: rework this when effective congruences are added to the database
	'TorsFreeAb',
	'multi-algebraic',
	FALSE,
	'Every multi-algebraic category has effective congruences, but the congruence $E = \{(x,y) \in \mathbb{Z}^2 : 2 \mid x-y \}$ on $\mathbb{Z}$ is not effective in $\mathbf{TorsFreeAb}$: Otherwise, the inclusion $E \hookrightarrow \mathbb{Z}^2$ would be a regular monomorphism. By their classification below, $\mathbb{Z}^2 / E$ would be torsion-free. But $(1,0) \notin E$ and $2 (1,0) \in E$.'
);
