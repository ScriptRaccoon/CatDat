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
	'We prove that $\{0,1\}$ is a cogenerator: The surjective maps $X \to \{0,1\}$ correspond to the non-empty proper subsets of $X$. If $a,b \in X$ are elements that have the same image under each surjective map $X \to \{0,1\}$, it therefore means that they lie in the same non-empty proper subsets of $X$. This implies $a=b$: If $X = \{a\}$, this is trivial. Otherwise, use the subset $\{a\}$.'
),
(
	'FS',
	'wide pushouts',
	TRUE,
	'We construct wide pushouts as in $\mathbf{Set}$ and observe that the universal property still holds when we restrict to surjective maps. If $f_i : S \to X_i$ are surjective maps and $P$ is their wide pushout, then each $X_i \to P$ is surjective, so that in particular $P$ is finite.'
),
(
	'FS',
	'coequalizers',
	TRUE,
	'We construct coequalizers as in $\mathbf{FinSet}$ (or $\mathbf{Set}$) and observe that the universal property still holds when we restrict to surjective maps.'
),
(
	'FS',
	'mono-regular',
	TRUE,
	'Every monomorphism is an isomorphism (see below), hence regular.'
),
(
	'FS',
	'epi-regular',
	TRUE,
	'If $f : X \to Y$ is a surjective map of finite sets, it is the coequalizer of the two projections $p_1, p_2 : X \times_Y X \rightrightarrows X$ in $\mathbf{FinSet}$, but also in $\mathbf{FS}$. Notice that $p_1,p_2$ are surjective. Even though $X \times_Y X$ is not a pullback in $\mathbf{FS}$, we can use this finite set here.'
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
	'If $f : \varnothing \to X$ is surjective, then $X = \varnothing$, and if $f : X \to \varnothing$ is any map, then also $X = \varnothing$. This shows that $\{ \varnothing \}$ is a connected component in this category. (The other connected component consists of all non-empty finite sets.)'
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
),
(
	'FS',
	'binary copowers',
	FALSE,
	'Assume that the copower $X := 2+2$ exists. Since we have a surjective map $2 \to X$, the set $X$ has at most $2$ elements. The codiagonal $X \to 2$ shows that $X$ has at least $2$ elements. Thus, $X \cong 2$. For all finite sets $Y$ we get a bijection $\mathrm{Hom}(2,Y) \cong \mathrm{Hom}(2,Y)^2$, in particular the cardinalities are the same. For $Y=2$ this gives the contradiction $2 = 4$.'
);
