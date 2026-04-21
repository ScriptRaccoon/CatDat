INSERT INTO category_property_assignments (
	category_id,
	property_id,
	is_satisfied,
	reason
)
VALUES
(
	'PMet',
	'locally small',
	TRUE,
	'There is a forgetful functor $\mathbf{PMet} \to \mathbf{Set}$ and $\mathbf{Set}$ is locally small.'
),
(
	'PMet',
	'equalizers',
	TRUE,
	'Just restrict the pseudo-metric to the equalizer built from the sets.'
),
(
	'PMet',
	'binary products',
	TRUE,
	'The product of two pseudo-metric spaces $(X,d)$, $(Y,d)$ is $(X \times Y,d)$ with $d((x_1,y_1),(x_2,x_2)) := \sup(d(x_1,x_2),d(y_1,y_2))$.' 
),
(
	'PMet',
	'terminal object',
	TRUE,
	'The one-point (pseudo-)metric space is terminal.'
),
(
	'PMet',
	'coequalizers',
	TRUE,
	'See <a href="https://mathoverflow.net/questions/123739" target="_blank">MO/123739</a>.'
),
(
	'PMet',
	'directed colimits',
	TRUE,
	'Given a directed diagram $(X_i)$ of pseudo-metric spaces, take the directed colimit $X$ of the underlying sets with the following pseudo-metric: If $x,y \in X$, let $d(x,y)$ be infimum of all $d(x_i,y_i)$, where $x_i,y_i \in X_i$ are some preimages of $x,y$ in some $X_i$. The definition ensures that each $X_i \to X$ is non-expansive, and the universal property is easy to check.' 
),
(
	'PMet',
	'exact filtered colimits',
	TRUE,
	'Let $\mathcal{I}$ be a finite category and $\mathcal{J}$ be a small filtered category, w.l.o.g. a directed poset. Let $X : \mathcal{I} \times \mathcal{J} \to \mathbf{PMet}$ be a diagram. We need to show that the canonical map $\mathrm{colim}_{j \in \mathcal{J}} \lim_{i \in \mathcal{I}} X(i,j) \to \lim_{i \in \mathcal{I}} \mathrm{colim}_{j \in \mathcal{J}}  X(i,j)$ is an isomorphism. It is bijective since the forgetful functor to $\mathbf{Set}$ preserves finite limits and filtered colimits and since $\mathbf{Set}$ has exact filtered colimits. That the map is isometric can easily be reduced to the following lemma: If $d_{i,j} \in \mathbb{R}_{\geq 0}$ are numbers for $i \in \mathcal{I}$, $j \in \mathcal{J}$ with $j \leq k \implies d_{i,k} \leq d_{i,j}$, then $\inf_j \sup_i d_{i,j} = \sup_i \inf_j d_{i,j}$. This can be proven directly. Alternatively, use that the thin category $(\mathbb{R}_{\geq 0} \cup \{\infty\},\leq)$ is isomorphic to $([0,1],\leq)$, and we already know that <a href="/category/real_interval">it has exact filtered colimits</a>.'
),
(
	'PMet',
	'strict initial object',
	TRUE,
	'The empty (pseudo-)metric space is initial and clearly strict.'
),
(
	'PMet',
	'generator',
	TRUE,
	'The one-point (pseudo-)metric space is a generator since it represents the forgetful functor $\mathbf{PMet} \to \mathbf{Set}$.'
),
(
	'PMet',
	'cogenerator',
	TRUE,
	'The set $\{0,1\}$ equipped with the pseudo-metric $d(0,1)=0$ is a cogenerator since every map into is automatically non-expansive and since $\{0,1\}$ is a cogenerator in $\mathbf{Set}$.' 
),
(
	'PMet',
	'semi-strongly connected',
	TRUE,
	'Every non-empty pseudo-metric space is weakly terminal (by using constant maps).'
),
(
	'PMet',
	'well-powered',
	TRUE,
	'This follows since monomorphisms are injective (see below).'
),
(
	'PMet',
	'well-copowered',
	TRUE,
	'This follows since epimorphisms are surjective (see below).'
),
(
	'PMet',
	'balanced',
	FALSE,
	'Let $d : \mathbb{R} \times \mathbb{R} \to \mathbb{R}_{\geq 0}$ be the usual Euclidean metric on $\mathbb{R}$ and $0 : \mathbb{R} \times \mathbb{R} \to \mathbb{R}_{\geq 0}$ be the zero pseudo-metric. Then the identity map $(\mathbb{R},d) \to (\mathbb{R},0)$ provides a counterexample.'
),
(
	'PMet',
	'cartesian closed',
	FALSE,
	'This is proven in <a href="https://math.stackexchange.com/questions/5131457" target="_blank">MSE/5131457</a>.'
),
(
	'PMet',
	'countable powers',
	FALSE,
	'Assume that the power $P = \mathbb{R}^{\mathbb{N}}$ exists, where $\mathbb{R}$ has the usual (pseudo-)metric. Since the forgetful functor $\mathbf{PMet} \to \mathbf{Set}$ is representable, it preserves limits, powers in particular. Thus, we may assume that $P$ is the set of sequences of numbers and that the projections $p_n : P \to \mathbb{R}$ are given by $p_n(x) = x_n$. Now consider the sequences $x = (n)_n$ and $y = (0)_n$. Since each $p_n$ is non-expansive, we get $d(x,y) \geq d(p_n(x),p_n(y)) = d(n,0) = n$. But then $d(x,y) = \infty$, a contradiction.'
),
(
	'PMet',
	'binary copowers',
	FALSE,
	'The coproduct of two non-empty pseudo-metric spaces does not exist, see <a href="https://math.stackexchange.com/questions/1778408" target="_blank">MSE/1778408</a> (the proof also works for pseudo-metric spaces). For example, the copower $\mathbb{R} \sqcup \mathbb{R}$ does not exist. We only get coproducts when allowing $\infty$ as a distance.'
),
(
	'PMet',
	'strict terminal object',
	FALSE,
	'This is trivial.'
),
(
	'PMet',
	'essentially small',
	FALSE,
	'This is trivial.'
),
(
	'PMet',
	'skeletal',
	FALSE,
	'This is trivial.'
),
(
	'PMet',
	'Malcev',
	FALSE,
	'Take any counterexample in $\mathbf{Set}$ and equip it with the zero pseudo-metric.'
),
(
	'PMet',
	'natural numbers object',
	FALSE,
	'If $(N,z,s)$ is a natural numbers object in $\mathbf{PMet}$, then
	<p>$1 \xrightarrow{z} N \xleftarrow{s} N$</p>
	is a coproduct cocone by <a href="https://ncatlab.org/nlab/show/Sketches+of+an+Elephant" target="_blank">Johnstone</a>, Part A, Lemma 2.5.5. Since there is a map $1 \to N$, we have $N \neq \varnothing$. However, the coproduct of two non-empty pseudo-metric spaces does not exist, see <a href="https://math.stackexchange.com/questions/1778408" target="_blank">MSE/1778408</a>.'
);
