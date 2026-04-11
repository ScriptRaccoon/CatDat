INSERT INTO category_property_assignments (
	category_id,
	property_id,
	is_satisfied,
	reason
)
VALUES
(
	'BN',
	'small',
	TRUE,
	'This is trivial.'
),
(
	'BN',
	'strongly connected',
	TRUE,
	'This is trivial.'
),
(
	'BN',
	'self-dual',
	TRUE,
	'The identity is a self-duality since the addition is commutative.'
),
(
	'BN',
	'generator',
	TRUE,
	'The unique object is a generator for trivial reasons.'
),
(
	'BN',
	'pullbacks',
	TRUE,
	'For natural numbers $n,m$ we need to find a universal pair $p,q$ of natural numbers satisfying $n + p = m + q$. We may assume w.l.o.g. $n \leq m$. Then take $p = m-n$, $q = 0$.'
),
(
	'BN',
	'left cancellative',
	TRUE,
	'This is because addition of natural numbers is cancellative.'
),
(
	'BN',
	'skeletal',
	TRUE,
	'There is just one object.'
),
(
	'BN',
	'locally cartesian closed',
	TRUE,
	'The slice category $B\mathbb{N} / *$ is isomorphic to the poset $(\mathbb{N},\geq)$ (not to $(\mathbb{N},\leq)$). This category is thin and and semi-strongly connected, <a href="/category-implication/sequential_implies_lcc">hence</a> cartesian closed.'
),
(
	'BN',
	'essentially finite',
	FALSE,
	'This is trivial.'
),
(
	'BN',
	'thin',
	FALSE,
	'This is trivial.'
),
(
	'BN',
	'sequential limits',
	FALSE,
	'Assume that the sequence $\cdots \xrightarrow{1}  \bullet \xrightarrow{1} \bullet \xrightarrow{1} \bullet$ has a limit. This is a (universal) sequence of natural numbers $n_0,n_1,\dotsc$ satisfying $n_i = n_{i+1} + 1$. But then $n_i = n_0 - i$, and in particular $n_{n_0 + 1} = - 1$, a contradiction.'
),
(
	'BN',
	'one-way',
	FALSE,
	'This is trivial.'
),
(
	'BN',
	'sifted',
	FALSE,
	'The category of cospans from $*$ to $*$ in $B\mathbb N$ is equivalent to a countable discrete category.'
);
