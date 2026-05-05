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
	'There is a forgetful functor $\TorsAb \to \Ab$ and $\Ab$ is locally small.'
),
(
	'TorsAb',
	'cocomplete',
	TRUE,
	'The embedding $\TorsAb \hookrightarrow \Ab$ is closed under colimits and $\Ab$ is cocomplete.'
),
(
	'TorsAb',
	'complete',
	TRUE,
	'The embedding $\TorsAb \hookrightarrow \Ab$ has a right adjoint, sending an abelian group $A$ to its torsion subgroup $T(A)$. Since $\Ab$ is complete, $\TorsAb$ is complete as well. The limit of a diagram of torsion abelian groups is the torsion subgroup of the limit of the underlying abelian groups. Notice that the torsion subgroup is not required in the case of equalizers, since a subgroup of a torsion abelian group is already torsion. Also, a <i>finite</i> product of torsion abelian groups is already torsion.'
),
(
	'TorsAb',
	'preadditive',
	TRUE,
	'It is a full subcategory of the preadditive category $\Ab$.'
),
(
	'TorsAb',
	'normal',
	TRUE,
	'If $f : A \to B$ is a monomorphism, it is injective (see below). In $\Ab$ it is then the kernel of $B \to B/f(A)$. Since $B/f(A)$ is torsion, it is also the kernel in $\TorsAb$.'
),
(
	'TorsAb',
	'conormal',
	TRUE,
	'If $f : A \to B$ is an epimorphism, it is surjective (see below). In $\Ab$ it is then the cokernel of its kernel $K \hookrightarrow A$. Since $K$ is torsion, it is also the cokernel in $\TorsAb$.'
),
(
	'TorsAb',
	'finitely accessible',
	TRUE,
	'We already know that (filtered) colimits exist and are preserved by the forgetful functor to $\Ab$. Every torsion abelian group is the filtered colimit of its finitely generated subgroups (which are finite). These are finitely presentable in $\Ab$, hence also in $\TorsAb$.'
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
	'The sequence $0 \to \IZ/2 \to \IZ/4 \to \IZ/2 \to 0$ does not split.'
),
(
	'TorsAb',
	'CSP',
	FALSE,
	'The canonical homomorphism $\bigoplus_{n \geq 0} \IZ/2 \to T(\prod_{n \geq 0} \IZ/2)$ is not surjective, since the torsion element $(1,1,\dotsc)$ does not lie in the image. Hence, it is no epimorphism.'
),
(
	'TorsAb',
	'locally strongly finitely presentable',
	FALSE,
	'Assume that it is locally strongly finitely presentable, and therefore the category of algebras of a multi-sorted finitary algebraic theory. For each sort $s$ let $F_s$ be the free algebra on one generator of sort $s$. One of them must be non-trivial, since otherwise the category would be thin. So assume $F_s \neq 0$. It is finitely presentable, hence a finite abelian group, and regular projective. Any direct summand will have the same properties. So we find that some $\IZ/p^k$ (with $k \geq 1$ and $p$ prime) is regular projective. However, the exact sequence in $\TorsAb$
	$$0 \to \IZ/p \to \IZ/p^{k+1} \to \IZ/p^k \to 0$$
	does not split.'
);

-- properties that should be ignored by the redundancy check script
UPDATE category_property_assignments
SET check_redundancy = FALSE
WHERE category_id = 'TorsAb'
AND property_id IN ('complete', 'cocomplete');
