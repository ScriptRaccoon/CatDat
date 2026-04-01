INSERT INTO properties (
	id,
	relation,
	description,
	nlab_link,
	dual_property_id,
	invariant_under_equivalences
)
VALUES
(
	'cartesian closed',
	'is',
	'A category is <i>cartesian closed</i> if all finite products and exponentials exist.',
	'https://ncatlab.org/nlab/show/cartesian+closed+category',
	NULL,
	TRUE
),
(
	'locally cartesian closed',
	'is',
	'A category is <i>locally cartesian closed</i> if each of its slice categories is cartesian closed.',
	'https://ncatlab.org/nlab/show/locally+cartesian+closed+category',
	NULL,
	TRUE
),
(
	'subobject classifier',
	'has a',
	'A category $\mathcal{C}$ has a <i>subobject classifier</i> if it has finite limits and a monomorphism* $\top : 1 \to \Omega$ such that for every monomorphism $m : A \to B$ there is a unique morphism $\chi_m : B \to \Omega$ such that $B \leftarrow A \rightarrow 1$ is the pullback of $B \rightarrow \Omega \leftarrow 1$. Equivalently, the functor $\mathrm{Sub} : \mathcal{C}^{\mathrm{op}} \to \mathbf{Set}^+$ is representable.<br>
	*Every morphism $1 \to \Omega$ is a split monomorphism anyway.',
	'https://ncatlab.org/nlab/show/subobject+classifier',
	NULL,
	TRUE
),
(
	'regular subobject classifier',
	'has a',
	'A category $\mathcal{C}$ has a <i>regular subobject classifier</i> if it has finite limits and a regular monomorphism* $\top : 1 \to \Omega$ such that for every regular monomorphism $m : A \to B$ there is a unique morphism $\chi_m : B \to \Omega$ such that $B \leftarrow A \rightarrow 1$ is the pullback of $B \rightarrow \Omega \leftarrow 1$. Equivalently, the functor $\mathrm{Sub}_{\mathrm{reg}} : \mathcal{C}^{\mathrm{op}} \to \mathbf{Set}^+$ is representable.<br>
	*Every morphism $1 \to \Omega$ is a split monomorphism and hence regular anyway.',
	'https://ncatlab.org/nlab/show/subobject+classifier',
	NULL,
	TRUE
),
(
	'elementary topos',
	'is an',
	'An <i>elementary topos</i> is a cartesian closed category with finite limits and a subobject classifier.',
	'https://ncatlab.org/nlab/show/topos',
	NULL,
	TRUE
),
(
	'Grothendieck topos',
	'is a',
	'A <i>Grothendieck topos</i> is a category that is equivalent to the category of sheaves on a site.',
	'https://ncatlab.org/nlab/show/Grothendieck+topos',
	NULL,
	TRUE
);