INSERT INTO category_property_assignments (
	category_id,
	property_id,
	is_satisfied,
	reason
)
VALUES
(
	'Sp',
	'essentially small',
	TRUE,
	'This holds because $\mathbf{FinSet}$ and $\mathbb{B}$ are essentially small.'
),
(
	'Sp',
	'elementary topos',
	TRUE,
	'The category is equivalent to $\prod_{n \geq 0} \Sigma_n{-}\mathbf{FinSet}$ (where $\Sigma_n$ denotes the symmetric group of order $n$), and each $\Sigma_n{-}\mathbf{FinSet}$ is an elementary topos since $\mathbf{FinSet}$ is and $\Sigma_n$ is a finite group, cf. <a href="https://ncatlab.org/nlab/show/Sketches+of+an+Elephant" target="_blank">Johnstone</a>, Part B, Corollary 2.3.18.'
),
(
	'Sp',
	'cogenerator',
	TRUE,
	'This follows from $\mathbf{Sp} \simeq \prod_{n \geq 0} \Sigma_n{-}\mathbf{FinSet}$, <a href="/lemma/cogenerators_in_product_categories">this lemma</a>, and the fact that if $G$ is a (finite) group, the power set $P(G)$ with the evident $G$-action is a weakly terminal cogenerator in $G{-}\mathbf{Set}$ (resp. $G{-}\mathbf{FinSet}$). For the proof, notice that $\varnothing,G \in P(G)$ are fixed points, yielding two $G$-maps $1 \rightrightarrows P(G)$. In particular, $P(G)$ is weakly terminal. If $X$ is a $G$-set with distinct points $x,y$, we construct a $G$-map $f : X \to P(G)$ that separates $x,y$: First, $X$ is a coproduct of orbits. If $x,y$ lie in different orbits, let $f|_{Gx}$ be constant $\varnothing$, $f|_{Gy}$ be constant $G$, and, say, $f$ be constant $\varnothing$ on all other orbits. If $x,y$ lie in the same orbit, say $y = g_0 x$, define $f|_{Gx} : Gx \to P(G)$ by $f(x) = G_x$ (stabilizer), which is well-defined, and choose $f$ to be $\varnothing$ on all other orbits. Then $f(y) = g_0 G_x \neq G_x = f(x)$.'
),
(
	'Sp',
	'locally small',
	FALSE,
	'Disclaimer: This result and its proof are not relevant for category theory and are also depending on the concrete model of set theory. That this category is locally essentially small is only what matters. Now, consider the terminal species $F=G=1$. Then $\mathrm{Hom}(F,G)$ has just a single element, namely the natural transformation $\alpha$ that sends every finite set $X$ to the unique map $\alpha_X : 1 \to 1$. Formally, $\alpha$ is a map, modelled as a set of ordered pairs $(X,\mathrm{id}_1)$, where $X$ is a finite set. Hence, $\alpha$ is not a set (since finite sets do not form a set), and therefore $\mathrm{Hom}(F,G) = \{\alpha\}$ is also not a set.'
),
(
	'Sp',
	'countable powers',
	FALSE,
	'If $\mathbf{Sp} \simeq \mathbf{FinSet} \times \prod_{n > 0} \Sigma_n{-}\mathbf{FinSet}$ has countable powers, then $\mathbf{FinSet}$ has countable powers as well by <a href="/lemma/limits_in_factor_categories">this lemma</a>, which we already know is false (see <a href="/category/FinSet">here</a>).'
),
(
	'Sp',
	'countable copowers',
	FALSE,
	'If $\mathbf{Sp} \simeq \mathbf{FinSet} \times \prod_{n > 0} \Sigma_n{-}\mathbf{FinSet}$ has countable copowers, then $\mathbf{FinSet}$ has countable copowers as well by <a href="/lemma/limits_in_factor_categories">this lemma</a> (dualized), which we already know is false (see <a href="/category/FinSet">here</a>).'
),	
(
	'Sp',
	'skeletal',
	FALSE,
	'This is trivial.'
),
(
	'Sp',
	'Malcev',
	FALSE,
	'Since $\mathbf{FinSet}$ is not Malcev, there is some finite set $X$ with a non-symmetric reflexive relation $R \subseteq X^2$. Now consider these as constant functors $\mathbb{B} \to \mathbf{FinSet}$.'
),
(
	'Sp',
	'semi-strongly connected',
	FALSE,
	'For $n \geq 0$ let $E_n$ be the combinatorial species of $n$-sets: $E_n(A) = \{A\}$ when $A$ has cardinality $n$, otherwise $E_n(A) = \varnothing$. Then there is no morphism between $E_n$ and $E_m$ unless $n = m$.'
),
(
	'Sp',
	'generator',
	FALSE,
	'Assume that a generator $G$ exists. For $n \geq 0$ let $F_n$ be the combinatorial species of sets of cardinality $\neq n$: $F_n(A) = \varnothing$ when $A$ has cardinality $n$, otherwise $F_n(A) = \{A\}$. There are two different morphisms $F_n \rightrightarrows F_n \sqcup F_n$. Hence, there must be at least one morphism $G \to F_n$. If $A$ has cardinality $n$, this implies $G(A) = \varnothing$. Since this holds for all $n$, $G$ is the initial object. But this is clearly no generator (it would mean that the category is thin).'
),
(
	'Sp',
	'essentially countable',
	FALSE,
	'Any function $f\colon\mathbb{N} \to \mathbb{N}$ can be regarded as a combinatorial species with trivial actions, and distinct functions yield non-isomorphic species.'
);