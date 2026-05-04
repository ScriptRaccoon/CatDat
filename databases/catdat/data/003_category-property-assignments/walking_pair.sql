INSERT INTO category_property_assignments (
	category_id,
	property_id,
	is_satisfied,
	reason
)
VALUES
(
	'walking_pair',
	'finite',
	TRUE,
	'This is trivial.'
),
(
	'walking_pair',
	'small',
	TRUE,
	'This is trivial.'
),
(
	'walking_pair',
	'self-dual',
	TRUE,
	'This is trivial.'
),
(
	'walking_pair',
	'semi-strongly connected',
	TRUE,
	'This is trivial.'
),
(
	'walking_pair',
	'generator',
	TRUE,
	'It is easy to check that $0$ is a generator.'
),
(
	'walking_pair',
	'left cancellative',
	TRUE,
	'The two morphisms $0 \rightrightarrows 1$ are clearly monomorphisms.'
),
(
	'walking_pair',
	'skeletal',
	TRUE,
	'The two objects are not isomorphic.'
),
(
	'walking_pair',
	'one-way',
	TRUE,
	'This is trivial.'
),
(
	'walking_pair',
	'pullbacks',
	FALSE,
	'The two morphisms $a,b : 0 \rightrightarrows 1$ have no pullback, since it would have to consist of identities $0 \leftarrow 0 \rightarrow 0$, but $a \neq b$.'
),
(
	'walking_pair',
	'sifted colimits',
	TRUE,
	'A proof can be found <a href="/pdf/walking_parallel_pair_sifted_colimit.pdf" target="_blank">here</a>.'
),
(
	'walking_pair',
	'strongly connected',
	FALSE,
	'There is no morphism $1 \to 0$.'
);