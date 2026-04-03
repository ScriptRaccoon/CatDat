INSERT INTO category_property_assignments (
	category_id,
	property_id,
	is_satisfied,
	reason
)
VALUES
(
	'Sp',
	'essentially small',
	TRUE,
	'This holds because $\mathbf{FinSet}$ and $\mathbb{B}$ are essentially small.'
),
(
	'Sp',
	'elementary topos',
	TRUE,
	'The category is equivalent to $\prod_{n \geq 0} \Sigma_n{-}\mathbf{FinSet}$ (where $\Sigma_n$ denotes the symmetric group of order $n$), and each $\Sigma_n{-}\mathbf{FinSet}$ is an elementary topos since $\mathbf{FinSet}$ is and $\Sigma_n$ is a finite group, cf. <a href="https://ncatlab.org/nlab/show/Sketches+of+an+Elephant" target="_blank">Johnstone</a>, Part B, Corollary 2.3.18.'
),
(
	'Sp',
	'locally small',
	FALSE,
	NULL
),
(
	'Sp',
	'strict terminal object',
	FALSE,
	'This is trivial.'
),
(
	'Sp',
	'countable products',
	FALSE,
	NULL
),
(
	'Sp',
	'countable coproducts',
	FALSE,
	NULL
),
(
	'Sp',
	'skeletal',
	FALSE,
	'This is trivial.'
),
(
	'Sp',
	'Malcev',
	FALSE,
	NULL
),
(
	'Sp',
	'strongly connected',
	FALSE,
	'For $n \geq 0$ let $E_n$ be the combinatorial species of $n$-sets: $E_n(A) = \{A\}$ when $A$ has cardinality $n$, otherwise $E_n(A) = \varnothing$. Then there is no morphism between $E_n$ and $E_m$ unless $n = m$.'
);
