INSERT INTO category_property_assignments (
	category_id,
	property_id,
	is_satisfied,
	reason
)
VALUES
(
	'Met_c',
	'locally small',
	TRUE,
	'There is a forgetful functor $\mathbf{Met}_c \to \mathbf{Set}$ and $\mathbf{Set}$ is locally small.'
),
(
	'Met_c',
	'equalizers',
	TRUE,
	'Just restrict the metric to the equalizer built from the sets.'
),
(
	'Met_c',
	'coproducts',
	TRUE,
	'See <a href="https://math.stackexchange.com/questions/5004389" target="_blank">MSE/5004389</a>.'
),
(
	'Met_c',
	'infinitary extensive',
	TRUE,
	'This follows from the existence of coproducts and from the fact that $\mathbf{Top}$ is infinitary extensive.'
),
(
	'Met_c',
	'well-powered',
	TRUE,
	'This follows easily from the fact that monomorphisms are injective in this category.'
),
(
	'Met_c',
	'generator',
	TRUE,
	'The one-point metric space is a generator since it represents the forgetful functor $\mathbf{Met}_c \to \mathbf{Set}$.'
),
(
	'Met_c',
	'cogenerator',
	TRUE,
	'The same proof as for $\mathbf{Met}$ shows that $\mathbb{R}$ with the usual metric is a cogenerator.'
),
(
	'Met_c',
	'countable products',
	TRUE,
	'For finite products, we take the cartesian product with, say, the sup-metric. The product of countably many metric spaces $(X_i,d_i)_{i \geq 0}$ is given by the cartesian product $\prod_{i \geq 0} X_i$ with the metric $d(x,y) := \sum_{i \geq 0} d_i(x_i,y_i)/(1 + d_i(x_i,y_i))$. See Engelking''s book <i>General Topology</i>.'
),
(
	'Met_c',
	'well-copowered',
	TRUE,
	'If $f : X \to Y$ is an epimorphism, then $f(X)$ is dense in $Y$ (see below). Hence, there is an injective map $Y \to X^{\mathbb{N}}$, which bounds the size of $Y$.'
),
(
	'Met_c',
	'strongly connected',
	TRUE,
	'Every nonempty metric space is weakly terminal (by using constant maps).'
),
(
	'Met_c',
	'powers',
	FALSE,
	'See <a href="https://math.stackexchange.com/questions/139168" target="_blank">MSE/139168</a> for a proof that uncountable powers do not exist.'
),
(
	'Met_c',
	'strict terminal object',
	FALSE,
	'This is trivial.'
),
(
	'Met_c',
	'balanced',
	FALSE,
	'The inclusion $\mathbb{Q} \hookrightarrow \mathbb{R}$ provides a counterexample.'
),
(
	'Met_c',
	'skeletal',
	FALSE,
	'This is trivial.'
),
(
	'Met_c',
	'Malcev',
	FALSE,
	'Consider the metric subspace $\{(a,b) \in \mathbb{R}^2 : a \leq b\}$ of $\mathbb{R}^2$.'
),
(
	'Met_c',
	'regular subobject classifier',
	FALSE,
	'We recycle the proof from the <a href="/category/Haus">category of Hausdorff spaces</a>: Assume that there is a regular subobject classifier $\Omega$. By the classification of regular monomorphisms, we would have an isomorphism between $\mathrm{Hom}(X,\Omega)$ and the set of closed subsets of $X$ for any metric space $X$. If we take $X = 1$ we see that $\Omega$ has two points. Since $\Omega$ is Hausdorff, $\Omega \cong 1 + 1$ must be discrete. But then $\mathrm{Hom}(X,\Omega)$ is isomorphic to the set of all clopen subsets of $X$, of which there are usually far fewer than closed subsets (consider $X = [0,1]$).'
);
