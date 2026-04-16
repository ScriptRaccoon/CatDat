INSERT INTO category_property_assignments (
	category_id,
	property_id,
	is_satisfied,
	reason
)
VALUES
(
	'CVNA',
	'complete',
	TRUE,
	'See Prop. 5.3 and Prop. 6.6 in <a href="https://arxiv.org/pdf/1202.2994v2" target="_blank">Quantum Collections</a>.'
),
(
	'CVNA',
	'coproducts',
	TRUE,
	'See Prop. 6.1 in <a href="https://arxiv.org/pdf/1202.2994v2" target="_blank">Quantum Collections</a>.'
),
(
	'CVNA',
	'coequalizers',
	TRUE,
	'See Prop. 5.7 in <a href="https://arxiv.org/pdf/1202.2994v2" target="_blank">Quantum Collections</a>. Commutativity is preserved.'
), 
(
	'CVNA',
	'pointed',
	FALSE,
	'The terminal object $0$ is not the initial object $\mathbb{C}$.'
),
(
	'CVNA',
	'cocartesian coclosed',
	FALSE,
	'See Prop. 6.7 in <a href="https://arxiv.org/pdf/1202.2994v2" target="_blank">Quantum Collections</a>.'
);
