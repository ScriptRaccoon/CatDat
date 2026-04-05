INSERT INTO category_property_assignments (
	category_id,
	property_id,
	is_satisfied,
	reason
)
VALUES
(
	'FinSet',
	'locally small',
	TRUE,
	'There is a forgetful functor $\mathbf{FinSet} \to \mathbf{Set}$ and $\mathbf{Set}$ is locally small.'
),
(
	'FinSet',
	'essentially small',
	TRUE,
	'Every finite set is isomorphic to some $[n] = \{1,\dotsc,n\}$ for some $n \in \mathbb{N}$.'
),
(
	'FinSet',
	'elementary topos',
	TRUE,
	'This follows easily from the fact that sets form an elementary topos.'
),
(
	'FinSet',
	'generator',
	TRUE,
	'The one-point set is a generator since it represents the forgetful functor $\mathbf{FinSet} \to \mathbf{Set}$.'
),
(
	'FinSet',
	'strongly connected',
	TRUE,
	'Every nonempty finite set is weakly terminal (by using constant maps).'
),
(
	'FinSet',
	'cogenerator',
	TRUE,
	'The two-element set is a cogenerator.'
),
(
	'FinSet',
	'small',
	FALSE,
	'Even the collection of all singletons is not a set.'
),
(
	'FinSet',
	'strict terminal object',
	FALSE,
	'This is trivial.'
),
(
	'FinSet',
	'countable copowers',
	FALSE,
	'Assume that the copower $C := \mathbb{N} \otimes 1$ exists. Since coproducts are associative and finite coproducts exist, we get $C \cong 1 \sqcup C$. It $C$ has $m \in \mathbb{N}$ elements, this implies $m = 1 + m$, which is a contradiction.'
),
(
	'FinSet',
	'countable powers',
	FALSE,
	'Assume that the power $P := \{0,1\}^{\mathbb{N}}$ exists. Since products are associative and finite products exists, we get $P \cong \{0,1\} \times P$. If $P$ has $m \in \mathbb{N}$ elements, this implies $m = 2m$ and hence $m = 0$, i.e. $P = \varnothing$. But there is a diagonal morphism $\{0,1\} \to P$, making $P = \varnothing$ impossible.'
),
(
	'FinSet',
	'skeletal',
	FALSE,
	'This is trivial.'
),
(
	'FinSet',
	'Malcev',
	FALSE,
	'There are lots of non-symmetric reflexive relations.'
);
