INSERT INTO category_property_assignments (
	category_id,
	property_id,
	is_satisfied,
	reason
)
VALUES
(
	'Ab',
	'locally small',
	TRUE,
	'There is a forgetful functor $\mathbf{Ab} \to \mathbf{Set}$ and $\mathbf{Set}$ is locally small.'
),
(
	'Ab',
	'abelian',
	TRUE,
	'This is standard, see <a href="https://ncatlab.org/nlab/show/Categories+for+the+Working+Mathematician" target="_blank">Mac Lane</a>, Ch. VIII.'
),
(
	'Ab',
	'finitary algebraic',
	TRUE,
	'Take the algebraic theory of a commutative group.'
),
(
	'Ab',
	'split abelian',
	FALSE,
	'The short exact sequence $0 \xrightarrow{} \mathbb{Z} \xrightarrow{p} \mathbb{Z} \xrightarrow{} \mathbb{Z}/p \xrightarrow{} 0$ does not split. '
),
(
	'Ab',
	'skeletal',
	FALSE,
	'This is trivial.'
),
(
	'Ab',
	'CSP',
	FALSE,
	'The canonical homomorphism $\bigoplus_{n \geq 0} \mathbb{Z} \to \prod_{n \geq 0} \mathbb{Z}$ is not surjective, hence no epimorphism.'
);
