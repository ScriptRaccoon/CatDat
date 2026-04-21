INSERT INTO category_property_assignments (
	category_id,
	property_id,
	is_satisfied,
	reason
)
VALUES
(
	'R-Mod',
	'locally small',
	TRUE,
	'There is a forgetful functor $R{-}\mathbf{Mod} \to \mathbf{Set}$ and $\mathbf{Set}$ is locally small.'
),
(
	'R-Mod',
	'abelian',
	TRUE,
	'This is standard, see <a href="https://ncatlab.org/nlab/show/Categories+for+the+Working+Mathematician" target="_blank">Mac Lane</a>, Ch. VIII.'
),
(
	'R-Mod',
	'finitary algebraic',
	TRUE,
	'Take the algebraic theory of an $R$-module (given by the algebraic theory of an abelian group and for each $r \in R$ a unary operation).'
),
(
	'R-Mod',
	'split abelian',
	FALSE,
	'By assumption, $R$ is not semisimple, so that there is a non-projective $R$-module, which yields a non-split sequence.'
),
(
	'R-Mod',
	'skeletal',
	FALSE,
	'This is trivial.'
),
(
	'R-Mod',
	'CSP',
	FALSE,
	'The canonical homomorphism $\bigoplus_{n \geq 0} R \to \prod_{n \geq 0} R$ is not surjective, hence no epimorphism.'
);