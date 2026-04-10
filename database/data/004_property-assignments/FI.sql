INSERT INTO category_property_assignments (
	category_id,
	property_id,
	is_satisfied,
	reason
)
VALUES
(
	'FI',
	'locally small',
	TRUE,
	'There is a forgetful functor $\mathbf{FI} \to \mathbf{Set}$ and $\mathbf{Set}$ is locally small.'
),
(
	'FI',
	'initial object',
	TRUE,
	'Take the empty set.'
),
(
	'FI',
	'left cancellative',
	TRUE,
	'This is trivial.'
),
(
	'FI',
	'essentially small',
	TRUE,
	'Every finite set is isomorphic to some $[n] = \{1,\dotsc,n\}$ for some $n \in \mathbb{N}$.'
),
(
	'FI',
	'generator',
	TRUE,
	'The one-point set is a generator since it represents the forgetful functor $\mathbf{FI} \to \mathbf{Set}$.'
),
(
	'FI',
	'equalizers',
	TRUE,
	'We construct equalizers just like in $\mathbf{FinSet}$ and observe that the universal property still holds.'
),
(
	'FI',
	'wide pullbacks',
	TRUE,
	'We construct wide pullbacks just like in $\mathbf{Set}$, i.e., for a w.l.o.g. non-empty family of injective maps $f_i : X_i \to S$ we consider the subset $P \subseteq \prod_{i \in I} X_i$ of those tuples $x$ where $f_i(x_i) = f_j(x_j)$. Each projection $P \to X_i$ is injective, so in particular $P$ is finite, and $P \to X_i$ becomes a morphism in $\mathbf{FI}$. It is easy to check that the universal property still holds in $\mathbf{FI}$.'
),
(
	'FI',
	'mono-regular',
	TRUE,
	'If $f : X \to Y$ is an injective map of finite sets, it is the equalizer of the two injective maps $i_1,i_2 : Y \rightrightarrows Y \sqcup_X Y$, and $Y \sqcup_X Y$ is finite.'
),
(
	'FI',
	'epi-regular',
	TRUE,
	'This is because every epimorphism is actually an isomorphism (see below).'
),
(
	'FI',
	'semi-strongly connected',
	TRUE,
	'If $X,Y$ are two finite sets, we have $\mathrm{card}(X) \leq \mathrm{card}(Y)$ or $\mathrm{card}(Y) \leq \mathrm{card}(X)$. In the first case there will be an injection $X \to Y$, in the second case there will be an injection $Y \to X$.'
),
(
	'FI',
	'locally cartesian closed',
	TRUE,
	'IF $X$ is a finite set, the slice category $\mathbf{FI} / X$ is equivalent to the poset of subsets of $X$. This is cartesian closed because $A \cap B \subseteq C$ holds if and only if $B \subseteq (X \setminus A) \cup C$, where $A,B,C \subseteq X$.'
),
(
	'FI',
	'small',
	FALSE,
	'Even the collection of all singletons is not small.'
),
(
	'FI',
	'cogenerator',
	FALSE,
	'Let $Q$ be finite set. When $Q$ is empty, it is clearly no cogenerator. Otherwise, $Q + 1$ has at least two elements, so that there are two different morphisms $1 \rightrightarrows Q + 1$. But there is no morphism $Q + 1 \to Q$ at all. Hence, $Q$ is no cogenerator.'
),
(
	'FI',
	'binary powers',
	FALSE,
	'Assume that two finite sets $X,Y$ have a product $P$ in this category. Elements of $P$ are the same as maps $1 \to P$, and they are automatically injective. Therefore, $P \cong \hom(1,P) \times \hom(1,X) \times \hom(1,Y) \cong X \times Y$, and the projections must agree as well. But they are usually not injective. In particular, the product $X \times X$ never exists when $X$ has $>1$ elements.' 
),
(
	'FI',
	'sequential colimits',
	FALSE,
	'Let $[n] := \{1,\dotsc,n\}$. Assume the sequence of inclusion maps $[1] \to [2] \to \cdots$ has a colimit $X$ in this category with maps $f_n : [n] \to X$. But $f_n$ must be an injective map, so that $\mathrm{card}(X) \geq n$ for all $n$. Since $X$ is finite, this is a contradiction.'
),
(
	'FI',
	'essentially finite',
	FALSE,
	'This is trivial.'
),
(
	'FI',
	'skeletal',
	FALSE,
	'This is trivial.'
),
(
	'FI',
	'one-way',
	FALSE,
	'Already the full subcategory of <a href="/category/B">finite sets and bijections</a> is not one-way.'
);
