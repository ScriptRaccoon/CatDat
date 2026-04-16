INSERT INTO category_property_assignments (
	category_id,
	property_id,
	is_satisfied,
	reason
)
VALUES
(
	'Man',
	'locally small',
	TRUE,
	'There is a forgetful functor $\mathbf{Man} \to \mathbf{Set}$ and $\mathbf{Set}$ is locally small.'
),
(
	'Man',
	'finite products',
	TRUE,
	'In short, this follows from the corresponding statement for topological spaces and $\mathbb{R}^n \times \mathbb{R}^m \cong \mathbb{R}^{n+m}$.'
),
(
	'Man',
	'well-powered',
	TRUE,
	'This follows from the fact that monomorphisms are injective here.'
),
(
	'Man',
	'well-copowered',
	TRUE,
	'This follows from the fact that epimorphisms have dense image (see below), which bounds the size of the codomain.'
),
(
	'Man',
	'generator',
	TRUE,
	'The $0$-dimensional one-point manifold is a generator since it represents the forgetful functor $\mathbf{Top} \to \mathbf{Set}$.'
),
(
	'Man',
	'cogenerator',
	TRUE,
	'The manifold $\mathbb{R}$ is a cogenerator, since for every smooth manifold $M$ and points $p \neq q$ in $M$ there is a smooth function $f : M \to \mathbb{R}$ with $f(p) = 1$ and $f(q) = 0$ (John Lee, Introduction to Smooth Manifolds, Prop. 2.25).'
),
(
	'Man',
	'extensive',
	TRUE,
	'[Sketch] Since $\mathbf{Top}$ is infinitary extensive, a continuous map $f : M \to \coprod_i N_i$ corresponds to a decomposition $M = \coprod_i M_i$ (as topological spaces) with continuous maps $f_i : M_i \to N_i$. Endow the open subset $M_i \subseteq M$ with the smooth structure inherited from $M$. Now remark that $f$ is smooth iff each $f_i$ is smooth.'
),
(
	'Man',
	'countable coproducts',
	TRUE,
	'Take the usual disjoint union, which is clearly locally Euclidean and Hausdorff, and it is second countable since we are using only countable many spaces. (Without that condition, all coproducts would exist.)'
),
(
	'Man',
	'Cauchy complete',
	TRUE,
	'See Theorem 2.1 at the <a href="https://ncatlab.org/nlab/show/smooth+manifold" target="_blank">nLab</a>.'
),
(
	'Man',
	'semi-strongly connected',
	TRUE,
	'Every non-empty manifold is weakly terminal (by using constant maps).'
),
(
	'Man',
	'essentially small',
	TRUE,
	'This is a consequence of the <a href="https://en.wikipedia.org/wiki/Whitney_embedding_theorem" target="_blank">Whitney embedding theorem</a>. But there is also a more direct proof: Since a manifold is second-countable, it is Lindelöf (<a href="https://topospaces.subwiki.org/wiki/Second-countable_implies_Lindelof" target="_blank">proof</a>). In particular, there is a countable atlas. It is then completely determined by countable many open subsets of Euclidean spaces and the transition maps.'
),
(
	'Man',
	'small',
	FALSE,
	'Even the collection of all singletons is not a set.'
),
(
	'Man',
	'countable powers',
	FALSE,
	'The power $\mathbb{R}^{\mathbb{N}}$ does not exist. More generally, let $(M_n)_{n \geq 0}$ be a sequence of smooth manifolds of positive dimension whose product $(\pi_n : P \to M_n)_{n \geq 0}$ exists. This product cone in $\mathbf{Man}$ yields a product cone in $\mathbf{Set}$ since the forgetful functor $\mathbf{Man} \to \mathbf{Set}$ is representable, hence preserves all limits. Choose points $x_n \in M_n$ with $T_{x_n}(M_n) \neq 0$. Choose the point $x \in P$ with $\pi_n(x) = x_n$. Consider the linear map $T_x(P) \to \prod_{n \geq 0} T_{x_n}(M_n)$ induced by the derivatives $d_x(\pi_n) : T_x(P) \to T_{x_n}(M_n)$. Since $T_x(P)$ is finite-dimensional and $\prod_{n \geq 0} T_{x_n}(M_n)$ is not, it cannot be surjective. But actually, it is: Choose tangent vectors $v_n \in T_{x_n}(M_n)$. Choose smooth curves $\gamma_n : \mathbb{R} \to M_n$ with $\gamma_n(0)=x_n$ and ${\gamma_n}''(0) = v_n$. By the universal property there is a unique smooth curve $\gamma : \mathbb{R} \to P$ with $\pi_n \gamma = \gamma_n$. In particular, $\gamma(0) = x$. The chain rule now implies that $\gamma''(0) \in T_x(P)$ is a preimage of $(v_n)$ – a contradiction.'
),
(
	'Man',
	'copowers',
	FALSE,
	'If $I$ is uncountable, then the copower $I \otimes \mathbb{R}$ does not exist. More generally, if $(X_i)_{i \in I}$ is a family of non-empty manifolds whose coproduct $M$ exists, then using maps $M \to \{0,1\}$ we find that the $M_i$ map to disjoint connected components of $M$. Since $M$ only has countably many components, $I$ must be countable.
	See also the answer at <a href="https://math.stackexchange.com/questions/5083641">MSE/5083641</a>.'
),
(
	'Man',
	'pushouts',
	FALSE,
	'The pushout of $\mathbb{R} \leftarrow \{0\} \rightarrow \mathbb{R}$ does not exist, see <a href="https://mathoverflow.net/questions/19116">MO/19116</a>.'
),
(
	'Man',
	'pullbacks',
	FALSE,
	'See <a href="https://math.stackexchange.com/questions/5129579/" target="_blank">MSE/5129579</a> or <a href="https://math.stackexchange.com/questions/322485" target="_blank">MSE/322485</a>.'
),
(
	'Man',
	'balanced',
	FALSE,
	'The irrational winding of a torus $\mathbb{R} \to S^1 \times S^1$, $t \mapsto (e^{i t}, \, e^{i \alpha t})$, where $\alpha \in \mathbb{R} \setminus \mathbb{Q}$, provides a counterexample. It is injective and has a dense image. Hence, it is a mono- and an epimorphism. But it is not surjective, hence no isomorphism.'
),
(
	'Man',
	'skeletal',
	FALSE,
	'This is trivial.'
),
(
	'Man',
	'sequential colimits',
	FALSE,
	'If $\mathbf{Man}$ had sequential colimits, then by <a href="/lemma/special_sequential_colimits">this lemma</a> there would be a manifold $M$ that admits a split epimorphism $M \to \mathbb{R}^n$ for every $n$. But then $M$ will have an infinite-dimensional tangent space, which is a contradiction.'
),
(
	'Man',
	'countable',
	FALSE,
	'This is trivial.'
);
