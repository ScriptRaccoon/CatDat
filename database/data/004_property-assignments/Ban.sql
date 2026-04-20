INSERT INTO category_property_assignments (
	category_id,
	property_id,
	is_satisfied,
	reason
)
VALUES
(
	'Ban',
	'locally small',
	TRUE,
	'There is a forgetful functor $\mathbf{Ban} \to \mathbf{Set}$ and $\mathbf{Set}$ is locally small.' 
),
(
	'Ban',
	'pointed',
	TRUE,
	'The trivial Banach space $\{0\}$ is a zero object.'
),
(
	'Ban',
	'locally ℵ₁-presentable',
	TRUE,
	'Example 1.48 in <a href="https://ncatlab.org/nlab/show/Locally+Presentable+and+Accessible+Categories" target="_blank">Adamek-Rosicky</a>.'
),
(
	'Ban',
	'cartesian filtered colimits',
	TRUE,
	'If $X$ is a Banach space and $(Y_i)$ is a filtered diagram of Banach spaces, the canonical map $\mathrm{colim}_i (X \times Y_i) \to X \times \mathrm{colim}_i Y_i$ is the completion of the canonical map in the category of normed vector spaces with non-expansive linear maps. Now the claim follows directly from the <a href="/category/Met">category of metric spaces</a> with non-expansive maps.'
),
(
	'Ban',
	'cocartesian cofiltered limits',
	TRUE,
	'If $X$ is a Banach space and $(Y_i)$ is a cofiltered diagram of Banach spaces, the canonical map $X \oplus \lim_i Y_i \to \lim_i (X \oplus Y_i)$ is an isomorphism: Since the forgetful functor $\mathbf{Ban} \to \mathbf{Vect}$ preserves finite coproducts and all limits, and $\mathbf{Vect}$ has the claimed property (see <a href="/category-implication/biproducts_cartesian_filtered_colimits">here</a>), the canonical map is bijective. It remains to show that it is isometric. For $(x,y) \in X \oplus \lim_i Y_i$ the norm in the domain is $|x| + \sup_i |y_i|$, and the norm in the codomain is $\sup_i (|x| + |y_i|)$, and these clearly agree.'
),
(
	'Ban',
	'CIP',
	TRUE,
	'This is immediate from the concrete description of coproducts and products.'
),
(
	'Ban',
	'cogenerator',
	TRUE,
	'The Hahn-Banach theorem implies that $\mathbb{C}$ is a cogenerator.'
),
(
	'Ban',
	'balanced',
	FALSE,
	'The linear map $\mathbb{C} \to \mathbb{C}$, $x \mapsto x/2$ is a counterexample. It is bijective, hence a mono- and epimorphism, but not isometric and therefore no isomorphism.'
),
(
	'Ban',
	'filtered-colimit-stable monomorphisms',
	FALSE,
	'The proof is similar to <a href="/category/Met">$\mathbf{Met}$</a>. For $n \geq 1$ let $V_n$ be the Banach space with underlying vector space $\mathbb{C}$ and the norm $|x|_n := \frac{1}{n} |x|$. For $n \leq m$ the identity map provides a morphism $V_n \to V_m$, which is clearly a monomorphism (also an epimorphism by the way, but an isomorphism iff $n=m$). Let $V$ be the colimit of all $V_n$ in the category of semi-normed vector spaces. It is constructed as the colimit in the category of vector spaces with the semi-norm $|x| := \inf \{|x|_m : n \leq m \}$ for $x \in V_n$. So clearly, the semi-norm is zero. Hence, the colimit in the category of normed vector spaces is $0$. The colimit in the category of Banach spaces is its completion, also $0$. Thus, the monomorphisms $V_1 \to V_n$ become $V_1 \to 0$ in the colimit.'
),
(
	'Ban',
	'skeletal',
	FALSE,
	'This is trivial.'
),
(
	'Ban',
	'unital',
	FALSE,
	'See <a href="https://math.stackexchange.com/questions/5033161" target="_blank">MSE/5033161</a>.'
),
(
	'Ban',
	'co-Malcev',
	FALSE,
	'See the comments to <a href="https://mathoverflow.net/a/509555/2841" target="_blank">MO/509552</a>.'
),
(
	'Ban',
	'regular subobject classifier',
	FALSE,
	'If $\Omega$ is a regular subobject classifier, then by the classification of regular monomorphisms, $\mathrm{Hom}(X,\Omega)$ is isomorphic to the set of closed subspaces of $X$ for any Banach space $X$. For $X = \mathbb{C}$ this implies that there are exactly two vectors in $\Omega$ with norm $\leq 1$, which is absurd. (For $\Omega = 0$ there is just one, and for $\Omega \neq 0$ there are infinitely many.)'
),
(
	'Ban',
	'CSP',
	FALSE,
	'By using the concrete description of products and coproducts, for the constant family $X_n = \mathbb{C}$ the canonical morphism $\coprod_n X_n \to \prod_n X_n$ becomes the canonical inclusion map $\ell^1 \hookrightarrow \ell^\infty$. This is not an epimorphism (i.e., has no dense image) since the closure of the image is precisely $c_0$. So for example, $(1,1,\dotsc)$ is not contained in the closure of the image.'
),
(
	'Ban',
	'cofiltered-limit-stable epimorphisms',
	FALSE,
	'We show that epimorphisms are not stable under sequential limits. Let $X_n = Y_n = \mathbb{C}$ for all $n \geq 0$. The transition morphism $Y_{n+1} \to Y_n$ is the identity, and the transition morphism $X_{n+1} \to X_n$ is $x \mapsto x/2$. The morphisms $X_n \to Y_n$, $x \mapsto x/2^n$ are compatible with the transitions, and they are surjective, hence epimorphisms. Now we check $\lim_n X_n = 0$: An element $(x_n) \in \lim_n X_n$ is a family of complex numbers satisfying $x_n = x_{n+1}/2$ <i>and</i> $\sup_n |x_n| < \infty$. But then $x_n = 2^n x_0$ and this can only be bounded when $x_0=0$. Hence, $0 = \lim_n X_n \to \lim_n Y_n = \mathbb{C}$ is no epimorphism.'
);