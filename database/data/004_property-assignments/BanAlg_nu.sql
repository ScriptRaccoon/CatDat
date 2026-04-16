INSERT INTO category_property_assignments (
	category_id,
	property_id,
	is_satisfied,
	reason
)
VALUES
(
	'BanAlg_nu',
	'complete',
	TRUE,
	'This is because $\mathbf{Ban}$ is complete and then the algebra operations are defined point-wise.'
),
(
	'BanAlg_nu',
	'cocomplete',
	TRUE,
	'If $(\mathcal{C},\otimes)$ is a cocomplete monoidal category (which includes the requirement that $\otimes$ is cocontinuous in each variable), then its category of semigroup objects is cocomplete: this is a straight forward generalization of the construction of colimits of classical semigroups.'
),
(
	'BanAlg_nu',
	'zero morphisms',
	TRUE,
	'The zero maps provide zero morphisms because we do not assume units here.'
),
(
	'BanAlg_nu',
	'skeletal',
	FALSE,
	'This is trivial.'
),
(
	'BanAlg_nu',
	'balanced',
	FALSE,
	'We can take the same counterexample as in the <a href="/category/BanAlg_u">unital case</a>.'
);