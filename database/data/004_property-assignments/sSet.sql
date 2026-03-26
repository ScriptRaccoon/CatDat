INSERT INTO category_property_assignments (
	category_id,
	property_id,
	is_satisfied,
	reason
)
VALUES
(
	'sSet',
	'locally small',
	TRUE,
	'This follows from the general fact that $[\mathcal{C},\mathcal{D}]$ is locally small when $\mathcal{C}$ is small and $\mathcal{D}$ is locally small, here applied to $\mathcal{C} = \Delta^{\mathrm{op}}$ and $\mathcal{D} = \mathbf{Set}$.'
),
(
	'sSet',
	'Grothendieck topos',
	TRUE,
	'obvious'
),
(
	'sSet',
	'locally strongly finitely presentable',
	TRUE,
	'This follows from the fact that every category of presheaves over a small category is locally strongly finitely presentable.'
),
(
	'sSet',
	'strict terminal object',
	FALSE,
	NULL
),
(
	'sSet',
	'skeletal',
	FALSE,
	'trivial'
),
(
	'sSet',
	'Malcev',
	FALSE,
	'Any counterexample for $\mathbf{Set}$ (i.e., any non-symmetric reflexive relation) yields one for this category by taking constant simplicial sets.'
);
