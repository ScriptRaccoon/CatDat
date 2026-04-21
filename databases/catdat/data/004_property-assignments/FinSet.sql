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
	'essentially countable',
	TRUE,
	'Every finite set is isomorphic to some $\{1,\dotsc,n\}$ for some $n \in \mathbb{N}$.'
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
	'semi-strongly connected',
	TRUE,
	'Every non-empty finite set is weakly terminal (by using constant maps).'
),
(
	'FinSet',
	'cogenerator',
	TRUE,
	'The two-element set is a cogenerator.'
),
(
	'FinSet',
	'ℵ₁-accessible',
	TRUE,
	'The inclusion $\mathbf{FinSet} \hookrightarrow \mathbf{Set}$ is closed under ℵ₁-filtered colimits, that is, any ℵ₁-filtered colimit of finite sets is again finite. Since every finite set is ℵ₁-presentable in $\mathbf{Set}$, it is still ℵ₁-presentable in $\mathbf{FinSet}$. Therefore, $\mathbf{FinSet}$ is ℵ₁-accessible, where every object is ℵ₁-presentable.'
),
(
	'FinSet',
	'small',
	FALSE,
	'Even the collection of all singletons is not a set.'
),
(
	'FinSet',
	'countable copowers',
	FALSE,
	'If countable copowers exist, then by <a href="/lemma/hilberts_hotel">Hilbert''s Hotel</a> there is some object $C$ with $C \cong 1 \sqcup C$. If $C$ has $m \in \mathbb{N}$ elements, this implies the contradiction $m = 1 + m$.'
),
(
	'FinSet',
	'countable powers',
	FALSE,
	'If countable powers exist, then by <a href="/lemma/hilberts_hotel">Hilbert''s Hotel</a> there is an object $P$ with $P \cong \{0,1\} \times P$ and a morphism $\{0,1\} \to P$. If $P$ has $m \in \mathbb{N}$ elements, this implies $m = 2m$ and hence $m = 0$, i.e. $P = \varnothing$. But then there cannot be a map $\{0,1\} \to P$.'
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
),
(
	'FinSet',
	'countable',
	FALSE,
	'This is trivial.'
),
(
	'FinSet',
	'natural numbers object',
	FALSE,
	'If $(N,z,s)$ is a natural numbers object, then
	<p>$1 \xrightarrow{z} N \xleftarrow{s} N$</p>
	is a coproduct cocone by <a href="https://ncatlab.org/nlab/show/Sketches+of+an+Elephant" target="_blank">Johnstone</a>, Part A, Lemma 2.5.5. But there is no finite set $N$ with $N \cong 1 + N$.'
);
