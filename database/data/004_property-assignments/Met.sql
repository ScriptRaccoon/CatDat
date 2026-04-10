INSERT INTO category_property_assignments (
	category_id,
	property_id,
	is_satisfied,
	reason
)
VALUES
(
	'Met',
	'locally small',
	TRUE,
	'There is a forgetful functor $\mathbf{Met} \to \mathbf{Set}$ and $\mathbf{Set}$ is locally small.'
),
(
	'Met',
	'well-powered',
	TRUE,
	'This follows since monomorphisms are injective.'
),
(
	'Met',
	'equalizers',
	TRUE,
	'Just restrict the metric to the equalizer built from the sets.'
),
(
	'Met',
	'binary products',
	TRUE,
	'The product of two metric spaces $(X,d)$, $(Y,d)$ is $(X \times Y,d)$ with $d((x_1,y_1),(x_2,x_2)) := \sup(d(x_1,x_2),d(y_1,y_2))$.' 
),
(
	'Met',
	'terminal object',
	TRUE,
	'The one-point metric space is terminal.'
),
(
	'Met',
	'coequalizers',
	TRUE,
	'See <a href="https://mathoverflow.net/questions/123739" target="_blank">MO/123739</a>.'
),
(
	'Met',
	'directed colimits',
	TRUE,
	'Given a directed diagram $(X_i)$ of metric spaces, take the directed colimit $X$ of the underlying sets with the following metric: If $x,y \in X$, let $d(x,y)$ be infimum of all $d(x_i,y_i)$, where $x_i,y_i \in X_i$ are some preimages of $x,y$ in some $X_i$. This is only a pseudo-metric, so finally take the associated metric space (Kolmogorov quotient). The definition ensures that each $X_i \to X$ is non-expansive, and the universal property is easy to check.' 
),
(
	'Met',
	'strict initial object',
	TRUE,
	'This is because the initial object is the empty metric space.'
),
(
	'Met',
	'generator',
	TRUE,
	'The one-point metric space is a generator since it represents the forgetful functor $\mathbf{Met} \to \mathbf{Set}$.'
),
(
	'Met',
	'cogenerator',
	TRUE,
	'We claim that $\mathbb{R}$ with the usual metric is a cogenerator. Let $a,b \in X$ be two points of a metric space such that $f(a)=f(b)$ for all non-expansive maps $f : X \to \mathbb{R}$. This applies in particular to $f(x) := d(a,x)$ and shows that $0=d(a,a)=d(a,b)$, so that $a=b$.' 
),
(
	'Met',
	'well-copowered',
	TRUE,
	'If $f : X \to Y$ is an epimorphism, then $f(X)$ is dense in $Y$ (see below). Hence, there is an injective map $Y \to X^{\mathbb{N}}$, which bounds the size of $Y$.'
),
(
	'Met',
	'semi-strongly connected',
	TRUE,
	'Every non-empty metric space is weakly terminal (by using constant maps).'
),
(
	'Met',
	'countable powers',
	FALSE,
	'Assume that the power $P = \mathbb{R}^{\mathbb{N}}$ exists, where $\mathbb{R}$ has the usual metric. Since the forgetful functor $\mathbf{Met} \to \mathbf{Set}$ is representable, it preserves limits, powers in particular. Thus, we may assume that $P$ is the set of sequences of numbers and that the projections $p_n : P \to \mathbb{R}$ are given by $p_n(x) = x_n$. Now consider the sequences $x = (n)_n$ and $y = (0)_n$. Since each $p_n$ is non-expansive, we get $d(x,y) \geq d(p_n(x),p_n(y)) = d(n,0) = n$. But then $d(x,y) = \infty$, a contradiction.'
),
(
	'Met',
	'binary copowers',
	FALSE,
	'The coproduct of two non-empty metric spaces does not exist, see <a href="https://math.stackexchange.com/questions/1778408" target="_blank">MSE/1778408</a>. For example, the copower $\mathbb{R} \sqcup \mathbb{R}$ does not exist. We only get coproducts when allowing $\infty$ as a distance, as in $\mathbf{Met}_{\infty}$.'
),
(
	'Met',
	'strict terminal object',
	FALSE,
	'This is trivial.'
),
(
	'Met',
	'balanced',
	FALSE,
	'The inclusion $\mathbb{Q} \hookrightarrow \mathbb{R}$ is a counterexample; it is an epimorphism since $\mathbb{Q}$ is dense in $\mathbb{R}$.'
),
(
	'Met',
	'cartesian closed',
	FALSE,
	'This is proven in <a href="https://math.stackexchange.com/questions/5131457" target="_blank">MSE/5131457</a>.'
),
(
	'Met',
	'essentially small',
	FALSE,
	'This is trivial.'
),
(
	'Met',
	'exact filtered colimits',
	FALSE,
	'Remark 2.7 in <a href="https://arxiv.org/abs/2006.01399" target="_blank">this paper</a>'
),
(
	'Met',
	'skeletal',
	FALSE,
	'This is trivial.'
),
(
	'Met',
	'Malcev',
	FALSE,
	'Consider the metric subspace $\{(a,b) \in \mathbb{R}^2 : a \leq b\}$ of $\mathbb{R}^2$.'
);
