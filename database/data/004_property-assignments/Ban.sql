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
	'cogenerator',
	TRUE,
	'The Hahn-Banach theorem implies that $\mathbb{C}$ is a cogenerator.'
),
(
	'Ban',
	'balanced',
	FALSE,
	'The canonical morphism $\mathbb{C} \oplus \mathbb{C} \to \mathbb{C} \times \mathbb{C}$ is a counterexample; here the direct sum (coproduct) carries the $1$-norm and the direct product the $\sup$-norm.'
),
(
	'Ban',
	'exact filtered colimits',
	FALSE,
	'We will exhibit a directed colimit of monomorphisms which is not a monomorphism. For $n \geq 1$ let $V_n$ be the Banach space with underlying vector space $\mathbb{C}$ and the norm $|x|_n := \frac{1}{n} |x|$. For $n \leq m$ the identity map provides a morphism $V_n \to V_m$, which is clearly a monomorphism (also an epimorphism by the way, but an isomorphism iff $n=m$). Let $V$ be the colimit of all $V_n$ in the category of semi-normed vector spaces. It is constructed as the colimit in the category of vector spaces with the semi-norm $|x| := \inf \{|x|_m : n \leq m \}$ for $x \in V_n$. So clearly, the semi-norm is zero. Hence, the colimit in the category of normed vector spaces is $0$. The colimit in the category of Banach spaces is its completion, also $0$. Thus, the monomorphisms $V_1 \to V_n$ become $V_1 \to 0$ in the colimit.'
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
);