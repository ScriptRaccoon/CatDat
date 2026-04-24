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
	'essentially countable',
	TRUE,
	'Every finite set is isomorphic to some $\{1,\dotsc,n\}$ for some $n \in \mathbb{N}$.'
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
	'filtered-colimit-stable monomorphisms',
	TRUE,
	'This is because every monomorphism is an isomorphism in this category (see below), and isomorphisms are always stable under any type of colimit.'
),
(
	'FS',
	'multi-terminal object',
	TRUE,
	'The empty set and a singleton give a multi-terminal object.'
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
	'Let $G$ be a finite set. There are at least two morphisms $G + 2 \rightrightarrows 2$, but there is no morphism $G \to G + 2$ at all. Hence, $G$ is not a generator.'
),
(
	'FS',
	'sequential limits',
	FALSE,
	'Let $X_n := \{1,\dotsc,n\}$. We define the truncation $p_n : X_{n+1} \to X_n$ by extending the identity of $X_n$ with $p_n(n+1) := n$. Assume the sequence of truncations $\cdots \to X_2 \to X_1$ has a limit $(f_n : X \to X_n)$ in this category. But $f_n$ is surjective, so that $\mathrm{card}(X) \geq n$ for all $n$. Since $X$ is finite, this is a contradiction.'
),
(
	'FS',
	'pullbacks',
	FALSE,
	'The connected component of non-empty sets has a terminal object, $1$, and it suffices to prove that it has no products. Let $X$ be a finite set with more than $1$ element. Assume that the product $P$ of $X$ with itself exists. The diagonal $X \to P$ is a split monomorphism, hence injective, but also surjective, i.e. an isomorphism. In other words, the two projections $P \rightrightarrows X$ are equal. The universal property of $P$ now implies that every two morphisms $Y \rightrightarrows X$ are equal, which is absurd.'
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
	'core-thin',
	FALSE,
	'Its core is the <a href="/category/B">category of finite sets and bijections</a>, which we know is not thin.'
),
(
	'FS',
	'binary copowers',
	FALSE,
	'Assume that the copower $X := 2+2$ exists. Since we have a surjective map $2 \to X$, the set $X$ has at most $2$ elements. The codiagonal $X \to 2$ shows that $X$ has at least $2$ elements. Thus, $X \cong 2$. For all finite sets $Y$ we get a bijection $\mathrm{Hom}(2,Y) \cong \mathrm{Hom}(2,Y)^2$, in particular the cardinalities are the same. For $Y=2$ this gives the contradiction $2 = 4$.'
),
(
	'FS',
	'locally cocartesian coclosed',
	FALSE,
	'If $X$ is a finite set, the coslice category $X / \mathbf{FS}$ is thin and in fact equivalent to the lattice of equivalence relations on $X$. If $X$ has $\geq 3$ elements, it is not codistributive* and <a href="/category-implication/dual_distributive_criterion">hence</a> not cocartesian coclosed: For simplicity assume $X = \{a,b,c\}$. The bottom element $\bot$ corresponds to the partition $\{\{a\},\{b\},\{c\}\}$, the top element $\top$ to the partition $\{\{a,b,c\}\}$. Now consider the three equivalence relations $E_1,E_2,E_3$ corresponding to the three partitions
	$$\{\{a,b\},\{c\}\}, \, \{\{a,c\},\{b\}\}, \, \{\{b,c\},\{a\}\}.$$
	Then
	$$E_1 \vee (E_2 \wedge E_3) = E_1 \vee \bot = E_1,$$
	but
	$$(E_1 \vee E_2) \wedge (E_1 \vee E_3) = \top \wedge \top = \top.$$
	*For thin categories, the properties codistributive and distributive <a href="/category-implication/distributive_duality">are equivalent</a>.'
),
(
	'FS',
	'multi-initial object',
	FALSE,
	'If a multi-initial object exists, then the connected component consisting of non-empty finite sets has an initial object $X$. Then, any non-empty finite set cannot have a cardinality strictly greater than $X$,  which is a contradiction.'
),
(
	'FS',
	'countable',
	FALSE,
	'This is trivial.'
);
