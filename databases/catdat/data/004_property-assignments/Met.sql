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
	'This is because the <a href="/category/PMet">category of pseudo-metric spaces</a> has coequalizers and $\mathbf{Met} \hookrightarrow \mathbf{PMet}$ has a left adjoint, mapping a pseudo-metric space $X$ to $X /{\sim}$ where $x \sim y \iff d(x,y)=0$. Concretely, we take the coequalizer in the category of pseudo-metric spaces and then identify points with distance zero.' 
),
(
	'Met',
	'directed colimits',
	TRUE,
	'This is because the <a href="/category/PMet">category of pseudo-metric spaces</a> has directed colimits and $\mathbf{Met} \hookrightarrow \mathbf{PMet}$ has a left adjoint, mapping a pseudo-metric space $X$ to $X /{\sim}$ where $x \sim y \iff d(x,y)=0$. Concretely, we take the directed colimit in the category of pseudo-metric spaces and then identify points with distance zero.' 
),
(
	'Met',
	'cartesian filtered colimits',
	TRUE,
	'The canonical map $\mathrm{colim}_i (X \times Y_i) \to X \times \mathrm{colim}_i Y_i$ is an isomorphism for directed diagrams $(Y_i)$: It is surjective by the concrete description of directed colimits. It is isometric because of the elementary observation $\inf_i \max(r, s_i) = \max(r, \inf_i s_i)$ for $r, s_i \in \mathbb{R}$, where $i \leq j \implies s_i \geq s_j$.'
),
(
	'Met',
	'strict initial object',
	TRUE,
	'The empty metric space is initial and clearly strict.'
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
	'The inclusion $\mathbb{Q} \hookrightarrow \mathbb{R}$ is a counterexample; it is an epimorphism since $\mathbb{Q}$ is dense in $\mathbb{R}$. Alternatively, consider the identity map $(X,2d) \to (X,d)$ for any non-trivial metric space $(X,d)$.'
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
	'filtered-colimit-stable monomorphisms',
	FALSE,
	'The following example is taken from Remark 2.7 in <a href="https://arxiv.org/abs/2006.01399" target="_blank">Approximate injectivity and smallness in metric-enriched categories</a> by Adamek-Rosicky: For $n \geq 1$ let $X_n$ denote the metric space with underlying set $\{0,1\}$ in which $0,1$ have distance $1/n$. We have bijective non-expansive maps $X_n \to X_{n+1}$, $x \mapsto x$. The colimit of this sequence in $\mathbf{PMet}$ is $\{0,1\}$ where $0,1$ have distance $0$, so the colimit in $\mathbf{Met}$ collapses to $\{0\}$. Therefore, the colimit of the monomorphisms $X_0 \to X_n$, $x \mapsto x$ is the non-injective map $X_0 \to \{0\}$.'
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
),
(
	'Met',
	'natural numbers object',
	FALSE,
	'If $(N,z,s)$ is a natural numbers object in $\mathbf{Met}$, then
	<p>$1 \xrightarrow{z} N \xleftarrow{s} N$</p>
	is a coproduct cocone by <a href="https://ncatlab.org/nlab/show/Sketches+of+an+Elephant" target="_blank">Johnstone</a>, Part A, Lemma 2.5.5. Since there is a map $1 \to N$, we have $N \neq \varnothing$. However, the coproduct of two non-empty metric spaces does not exist, see <a href="https://math.stackexchange.com/questions/1778408" target="_blank">MSE/1778408</a>.'
);