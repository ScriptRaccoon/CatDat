INSERT INTO category_property_assignments (
	category_id,
	property_id,
	is_satisfied,
	reason
)
VALUES
(
	'FS',
	'locally small',
	TRUE,
	'There is a forgetful functor $\mathbf{FS} \to \mathbf{Set}$ and $\mathbf{Set}$ is locally small.'
),
(
	'FS',
	'essentially small',
	TRUE,
	'Every finite set is isomorphic to some $[n] = \{1,\dotsc,n\}$ for some $n \in \mathbb{N}$.'
),
(
	'FS',
	'right cancellative',
	TRUE,
	'This is trivial.'
),
(
	'FS',
	'cogenerator',
	TRUE,
	NULL
),
(
	'FS',
	'wide pushouts',
	TRUE,
	NULL
),
(
	'FS',
	'coequalizers',
	TRUE,
	NULL
),
(
	'FS',
	'mono-regular',
	TRUE,
	NULL
),
(
	'FS',
	'epi-regular',
	TRUE,
	NULL
),
(
	'FS',
	'small',
	FALSE,
	'Even the collection of all singletons is not small.'
),
(
	'FS',
	'connected',
	FALSE,
	'If $f : \emptyset \to X$ is surjective, then $X = \emptyset$, and if $f : X \to \emptyset$ is any map, then also $X = \emptyset$. This shows that $\{ \emptyset \}$ is a connected component in this category.'
),
(
	'FS',
	'generator',
	FALSE,
	'Let $G$ be a finite set. There are at least two morphisms $G + 2 \to 2$, but there is no morphism $G \to G + 2$ at all. Hence, $G$ is not a generator.'
),
(
	'FS',
	'sequential limits',
	FALSE,
	'Let $[n] := \{1,\dotsc,n\}$. We define the projection $p_n : [n+1] \to [n]$ by extending the identity of $[n]$ with $p_n(n+1) := n$. Assume the sequence of projections $\cdots \to [2] \to [1]$ has a limit $X$ in this category with maps $f_n : X \to [n]$. But $f_n$ is surjective, so that $\mathrm{card}(X) \geq n$ for all $n$. Since $X$ is finite, this is a contradiction.'
),
(
	'FS',
	'pullbacks',
	FALSE,
	'The connected component of non-empty sets has a terminal object, $1$, and it suffices to prove that it has no products. Let $X$ be a finite set with more than $1$ element. Assume that the product $P$ of $X$ with itself exists. The diagonal $X \to P$ is a split monomorphism, hence injective, but also surjective, i.e. an isomorphism. In other words, the two projections $P \to X$ are equal. The universal property of $P$ now implies that all morphisms $Y \to X$ are equal, which is absurd.'
),
(
	'FS',
	'essentially finite',
	FALSE,
	'This is trivial.'
),
(
	'FS',
	'skeletal',
	FALSE,
	'This is trivial.'
),
(
	'FS',
	'one-way',
	FALSE,
	'Already the full subcategory of <a href="/category/B">finite sets and bijections</a> is not one-way.'
);

