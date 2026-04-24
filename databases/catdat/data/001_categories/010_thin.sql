INSERT INTO categories (
	id,
	name,
	notation,
	objects,
	morphisms,
	description,
	nlab_link,
	dual_category_id
)
VALUES
(
	'N',
	'poset of natural numbers',
	'$(\mathbb{N},\leq)$',
	'natural numbers $0, 1, 2, \dotsc$',
	'a unique morphism $(n,m) : n \to m$ if $n \leq m$',
	'This can also be seen as the path category of the infinite linear graph $\bullet \to \bullet \to \bullet \to \cdots$.',
	NULL,
	NULL
),
(
	'real_interval',
	'poset [0,1]',
	'$([0,1],\leq)$',
	'real numbers between $0$ and $1$',
	'a unique morphism $(s,t) : s \to t$ when $s \leq t$',
	'Every poset can be regarded as a small thin category. This is a specific example. This category is locally $\aleph_1$-presentable (in fact, <i>every</i> object is $\aleph_1$-presentable), but not locally finitely presentable (in fact, only $0$ is finitely presentable).',
	'https://ncatlab.org/nlab/show/interval',
	NULL
),
(
	'Z_div',
	'proset of integers w.r.t. divisibility',
	'$(\mathbb{Z},\mid)$',
	'integers',
	'a unique morphism $(a,b) : a \to b$ if $a$ divides $b$',
	'This is a proset, not a poset, because $a$ and $-a$ divide each other, but are not equal for $a \neq 0$. Notice that this category is equivalent (but not isomorphic) to $(\mathbb{N},\mid)$.',
	NULL,
	NULL
),
(
	'N_oo',
	'poset of extended natural numbers',
	'$(\mathbb{N}_\infty, \leq)$',
	'natural numbers and $\infty$',
	'a unique morphism $(n, m) : n \to m$ if $n \leq m$, where of course $n \leq \infty$ for all $n$',
	NULL,
	NULL,
	NULL
),
(
	'On',
	'poset of ordinal numbers',
	'$(\mathbf{On},\leq)$',
	'ordinal numbers',
	'a unique morphism $(\alpha,\beta): \alpha \to \beta$ if $\alpha \leq \beta$',
	'This is a large variant of the poset of natural numbers.',
	NULL,
	NULL
);