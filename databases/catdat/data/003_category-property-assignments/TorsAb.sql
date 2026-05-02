INSERT INTO category_property_assignments (
	category_id,
	property_id,
	is_satisfied,
	reason
)
VALUES
(
	'TorsAb',
	'locally small',
	TRUE,
	'There is a forgetful functor $\mathbf{TorsAb} \to \mathbf{Ab}$ and $\mathbf{Ab}$ is locally small.'
),
(
	'TorsAb',
	'cocomplete',
	TRUE,
	'The embedding $\mathbf{TorsAb} \hookrightarrow \mathbf{Ab}$ is closed under colimits and $\mathbf{Ab}$ is cocomplete.'
),
(
	'TorsAb',
	'complete',
	TRUE,
	'The embedding $\mathbf{TorsAb} \hookrightarrow \mathbf{Ab}$ has a right adjoint, sending an abelian group $A$ to its torsion subgroup $T(A)$. Since $\mathbf{Ab}$ is complete, $\mathbf{TorsAb}$ is complete as well. The limit of a diagram of torsion abelian groups is the torsion subgroup of the limit of the underlying abelian groups. Notice that the torsion subgroup is not required in the case of equalizers, since a subgroup of a torsion abelian group is already torsion. Also, a <i>finite</i> product of torsion abelian groups is already torsion.'
),
(
	'TorsAb',
	'preadditive',
	TRUE,
	'It is a full subcategory of the preadditive category $\mathbf{Ab}$.'
),
(
	'TorsAb',
	'normal',
	TRUE,
	'If $f : A \to B$ is a monomorphism, it is injective (see below). In $\mathbf{Ab}$ it is then the kernel of $B \to B/f(A)$. Since $B/f(A)$ is torsion, it is also the kernel in $\mathbf{TorsAb}$.'
),
(
	'TorsAb',
	'conormal',
	TRUE,
	'If $f : A \to B$ is an epimorphism, it is surjective (see below). In $\mathbf{Ab}$ it is then the cokernel of its kernel $K \hookrightarrow A$. Since $K$ is torsion, it is also the cokernel in $\mathbf{TorsAb}$.'
),
(
	'TorsAb',
	'finitely accessible',
	TRUE,
	'We already know that (filtered) colimits exist and are preserved by the forgetful functor to $\mathbf{Ab}$. Every torsion abelian group is the filtered colimit of its finitely generated subgroups (which are finite). These are finitely presentable in $\mathbf{Ab}$, hence also in $\mathbf{TorsAb}$.'
),
(
	'TorsAb',
	'skeletal',
	FALSE,
	'This is trivial.'
),
(
	'TorsAb',
	'split abelian',
	FALSE,
	'The sequence $0 \to \mathbb{Z}/2 \to \mathbb{Z}/4 \to \mathbb{Z}/2 \to 0$ does not split.'
),
(
	'TorsAb',
	'CSP',
	FALSE,
	'The canonical homomorphism $\bigoplus_{n \geq 0} \mathbb{Z}/2 \to T(\prod_{n \geq 0} \mathbb{Z}/2)$ is not surjective, since the torsion element $(1,1,\dotsc)$ does not lie in the image. Hence, it is no epimorphism.'
),
(
	'TorsAb',
	'locally strongly finitely presentable',
	FALSE,
	'Assume that it is locally strongly finitely presentable, and therefore the category of algebras of a multi-sorted finitary algebraic theory. For each sort $s$ let $F_s$ be the free algebra on one generator of sort $s$. One of them must be non-trivial, since otherwise the category would be thin. So assume $F_s \neq 0$. It is finitely presentable, hence a finite abelian group, and regular projective. Any direct summand will have the same properties. So we find that some $\mathbb{Z}/p^k$ (with $k \geq 1$ and $p$ prime) is regular projective. However, the exact sequence in $\mathbf{TorsAb}$
	$$0 \to \mathbb{Z}/p \to \mathbb{Z}/p^{k+1} \to \mathbb{Z}/p^k \to 0$$
	does not split.'
);
