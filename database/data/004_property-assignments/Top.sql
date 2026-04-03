INSERT INTO category_property_assignments (
	category_id,
	property_id,
	is_satisfied,
	reason
)
VALUES
(
	'Top',
	'locally small',
	TRUE,
	'There is a forgetful functor $\mathbf{Top} \to \mathbf{Set}$ and $\mathbf{Set}$ is locally small.'
),
(
	'Top',
	'complete',
	TRUE,
	'Take the limit of the underlying sets and endow it with the coarsest topology making all projections continuous.'
),
(
	'Top',
	'cocomplete',
	TRUE,
	'Take the colimit of the underlying sets and endow it with the finest topology making all inclusions continuous.'
),
(
	'Top',
	'well-powered',
	TRUE,
	'This is clear from the classification of monomorphisms as injective continuous maps.'
),
(
	'Top',
	'well-copowered',
	TRUE,
	'This is clear from the classification of epimorphisms as surjective continuous maps.'
),
(
	'Top',
	'infinitary extensive',
	TRUE,
	'[Sketch] Since $\mathbf{Set}$ is infinitary extensive, a map $f : Y \to \coprod_i X_i$ corresponds to a decomposition $Y = \coprod_i Y_i$ (as sets) with maps $f_i : Y_i \to X_i$. Endow $Y_i$ with the subspace topology. If $f$ is continuous, each $Y_i = f^{-1}(X_i)$ is open in $Y$, so that $Y = \coprod_i Y_i$ holds as topological spaces, and each $f_i$ is continuous.'
),
(
	'Top',
	'generator',
	TRUE,
	'The one-point space is a generator since it represents the forgetful functor $\mathbf{Top} \to \mathbf{Set}$.'
),
(
	'Top',
	'cogenerator',
	TRUE,
	'It is easily checked that the indiscrete two-point space is a cogenerator.'
),
(
	'Top',
	'strongly connected',
	TRUE,
	'Every nonempty space is weakly terminal (by using constant maps).'
),
(
	'Top',
	'regular subobject classifier',
	TRUE,
	'The indiscrete two-point space $\{0,1\}$ is a regular subobject classifier since continuous maps $X \to \{0,1\}$ correspond to subsets of $X$.'
),
(
	'Top',
	'coregular',
	TRUE,
	'The category has all limits and colimits, and the regular monomorphisms are the subspace inclusions. Thus, it suffices to prove that subspace inclusions are stable under pushouts. For a proof see e.g. Lemma 3.6 at the <a href="https://ncatlab.org/nlab/show/subspace+topology#pushout" target="_blank">nLab</a>.'
),
(
	'Top',
	'cartesian closed',
	FALSE,
	'The functor $\mathbb{Q} \times - : \mathbf{Top} \to \mathbf{Top}$ does not preserve colimits, hence has no right adjoint. See <a href="https://math.stackexchange.com/questions/2969372" target="_blank">MSE/2969372</a> for a proof.'
),
(
	'Top',
	'regular',
	FALSE,
	'See Example 3.14 at the <a href="https://ncatlab.org/nlab/show/regular+category" target="_blank">nLab</a>.'
),
(
	'Top',
	'locally presentable',
	FALSE,
	'In fact, it does not have any small dense subcategory by <a href="https://math.stackexchange.com/questions/4097315/" target="_blank">MSE/4097315</a>. For a related result, see <a href="https://mathoverflow.net/questions/288648" target="_blank">MO/288648</a>.'
),
(
	'Top',
	'strict terminal object',
	FALSE,
	'This is trivial.'
),
(
	'Top',
	'balanced',
	FALSE,
	'If $X$ is a set, consider the discrete space $X_d$ on $X$ and the indiscrete space $X_i$ on $X$. The identity map $X \to X$ lifts to a continuous map $X_d \to X_i$, which is bijective and therefore both a mono- and an epimorphism, but it is not an isomorphism unless $X$ has at most one element.'
),
(
	'Top',
	'exact filtered colimits',
	FALSE,
	'See <a href="https://math.stackexchange.com/questions/1255678" target="_blank">MSE/1255678</a>.'
),
(
	'Top',
	'skeletal',
	FALSE,
	'This is trivial.'
),
(
	'Top',
	'Malcev',
	FALSE,
	'This is clear since $\mathbf{Set}$ is not Malcev and can be interpreted as the subcategory of discrete spaces.'
),
(
	'Top',
	'co-Malcev',
	FALSE,
	'See <a href="https://mathoverflow.net/questions/509548" target="_blank">MO/509548</a>. We can also phrase the proof as follows: Consider the forgetful functor $U : \mathbf{Top} \to \mathbf{Set}$ and the relation $R \subseteq U^2$ defined by $R(X) := \{(x,y) \in U(X)^2 : x \in \overline{\{y\}} \}$. Both are representable: $U$ by the singleton and $R$ by the Sierpinski space. It is clear that $R$ is reflexive, but not symmetric.'
);
