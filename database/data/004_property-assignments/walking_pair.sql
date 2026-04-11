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
	'initial object',
	FALSE,
	'$0$ is not initial since it has two morphisms to $1$, and $1$ has not initial since it has no morphism to $0$.'
),
(
	'walking_pair',
	'binary products',
	FALSE,
	'We cannot have $0 \times 1 = 1$ since there is no morphism $1 \to 0$. So assume $0 \times 1 = 0$, say with projections $\mathrm{id}_0 : 0 \to 0$ and $a : 0 \to 1$. By applying the universal property to  $\mathrm{id}_0 : 0 \to 0$ and the other morphism $b : 0 \to 1$, it immediately follows $a=b$, which is a contradiction.'
),
(
	'walking_pair',
	'equalizers',
	FALSE,
	'The two morphisms $a,b : 0 \rightrightarrows 1$ have no equalizer, since it would have to be the identity of $0$, but $a \neq b$.'
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
),
(
	'walking_pair',
	'sifted',
	FALSE,
	'The category of cospans from $0$ to $0$ has $3$ connected components, not one.'
);