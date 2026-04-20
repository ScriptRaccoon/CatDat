INSERT INTO category_property_assignments (
	category_id,
	property_id,
	is_satisfied,
	reason
)
VALUES
(
	'R-Mod_div',
	'locally small',
	TRUE,
	'There is a forgetful functor $R{-}\mathbf{Mod} \to \mathbf{Set}$ and $\mathbf{Set}$ is locally small.'
),
(
	'R-Mod_div',
	'split abelian',
	TRUE,
	'It is a standard fact that the category of $R$-modules is abelian for any ring $R$. If $R$ is a division ring, then by linear algebra every $R$-module has a basis, hence is projective, so that every short exact sequence splits.'
),
(
	'R-Mod_div',
	'finitary algebraic',
	TRUE,
	'Take the algebraic theory of an $R$-module (given by the algebraic theory of an abelian group and for each $r \in R$ a unary operation).'
),
(
	'R-Mod_div',
	'skeletal',
	FALSE,
	'This is trivial.'
),
(
	'R-Mod_div',
	'CSP',
	FALSE,
	'The canonical homomorphism $\bigoplus_{n \geq 0} R \to \prod_{n \geq 0} R$ is not surjective, hence no epimorphism.'
);