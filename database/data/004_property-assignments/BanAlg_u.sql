INSERT INTO category_property_assignments (
	category_id,
	property_id,
	is_satisfied,
	reason
)
VALUES
(
	'BanAlg_u',
	'complete',
	TRUE,
	'This is because $\mathbf{Ban}$ is complete and then the algebra operations are defined point-wise.'
),
(
	'BanAlg_u',
	'cocomplete',
	TRUE,
	'If $(\mathcal{C},\otimes)$ is a cocomplete monoidal category (which includes the requirement that $\otimes$ is cocontinuous in each variable), then its category of monoid objects is cocomplete: this is a straight forward generalization of the construction of colimits of classical monoids.'
),
(
	'BanAlg_u',
	'semi-strongly connected',
	FALSE,
	'There is no unital $\mathbb{C}$-algebra homomorphism between $M_2(\mathbb{C})$ and $M_3(\mathbb{C})$.'
),
(
	'BanAlg_u',
	'skeletal',
	FALSE,
	'This is trivial.'
),
(
	'BanAlg_u',
	'balanced',
	FALSE,
	'The inclusion $\alpha : C^1([0,1]) \hookrightarrow C([0,1])$ provides a counterexample, where $C^1([0,1])$ is equipped with the norm $||f||_1 := ||f|| + ||f''||$. Since $\alpha$ is injective, it is a monomorphism. It is also an epimorphism since it has dense image by the Weierstrass approximation theorem. But of course $\alpha$ is no isomorphism.'
);