INSERT INTO category_property_assignments (
	category_id,
	property_id,
	is_satisfied,
	reason
)
VALUES
(
	'Top*',
	'locally small',
	TRUE,
	'There is a forgetful functor $\mathbf{Top}_* \to \mathbf{Set}_*$ and $\mathbf{Set}_*$ is locally small.'
),
(
	'Top*',
	'complete',
	TRUE,
	'This follows from $\mathbf{Top}_* \cong 1 / \mathbf{Top}$ and the fact that $\mathbf{Top}$ is complete.'
),
(
	'Top*',
	'coequalizers',
	TRUE,
	'This follows immediately from the fact that $\mathbf{Top}$ has coequalizers.'
),
(
	'Top*',
	'coproducts',
	TRUE,
	'This follows from $\mathbf{Top}_* \cong 1 / \mathbf{Top}$ and the fact that $\mathbf{Top}$ has wide pushouts.'
),
(
	'Top*',
	'well-powered',
	TRUE,
	'This is clear from the classification of monomorphisms as injective pointed continuous maps.'
),
(
	'Top*',
	'well-copowered',
	TRUE,
	'This is clear from the classification of epimorphisms as surjective pointed continuous maps.'
),
(
	'Top*',
	'pointed',
	TRUE,
	'The singleton space $\{0\}$ with base point $0$ is a zero object.'
),
(
	'Top*',
	'generator',
	TRUE,
	'The discrete space $\{0,1\}$ with base point $0$ is a generator since it represents the forgetful functor $\mathbf{Top}_* \to \mathbf{Set}$.'
),
(
	'Top*',
	'disjoint finite coproducts',
	TRUE,
	'This follows from the corresponding fact for $\mathbf{Set}_*$.'
),
(
	'Top*',
	'cogenerator',
	TRUE,
	'It is easily checked that the indiscrete two-point space $\{0,1\}$ with base point $1$ is a cogenerator.'
),
(
	'Top*',
	'regular subobject classifier',
	TRUE,
	'The indiscrete two-point space $\{0,1\}$ with base point $1$ is a regular subobject classifier since pointed continuous maps $X \to \{0,1\}$ correspond to pointed subsets of $X$ (by taking the fiber of $1$ as usual).'
),
(
	'Top*',
	'counital',
	TRUE,
	'Since embeddings are regular monomorphisms in this category (see below) and hence strong monomorphisms, it suffices to prove that the canonical morphism $X \vee Y \hookrightarrow X \times Y$ is an embedding. For a proof, see <a href="https://math.stackexchange.com/questions/4055988" target="_blank">MSE/4055988</a>.'
),
(
	'Top*',
	'cocartesian cofiltered limits',
	TRUE,
	'We continue the proof for <a href="/category/Set*">$\mathbf{Set}_*$</a> by showing that the natural bijective map <br>$\alpha : X \vee \lim_i Y_i \to \lim_i (X \vee Y_i)$<br>
	is open. It suffices to consider open sets of two types: (1) If $U \subseteq X$ is open, the $\alpha$-image of $U \vee \lim_i Y_i$ is $p_{i_0}^{-1}(U \vee Y_{i_0})$ for any chosen index $i_0$, hence open. (2) If $i$ is an index and $V_i \subseteq Y_i$ is open, then the $\alpha$-image of $X \vee (p_i^{-1}(V_i) \cap \lim_i Y_i)$ is $p_i^{-1}(X \vee V_i)$, hence open.'
),
(
	'Top*',
	'coregular',
	TRUE,
	'Regular monomorphisms coincide with the embeddings (see below). Since $\mathbf{Top}$ is coregular, they are stable under pushouts, and pushouts in $\mathbf{Top}_*$ are the same.'
),
(
	'Top*',
	'regular',
	FALSE,
	'See Example 3.14 at the <a href="https://ncatlab.org/nlab/show/regular+category" target="_blank">nLab</a>. The proof also works for pointed spaces (resp. posets) by using the base points $a$ and $0$.'
),
(
	'Top*',
	'locally presentable',
	FALSE,
	'In fact, it does not have any small dense subcategory by <a href="https://math.stackexchange.com/questions/4097315/" target="_blank">MSE/4097315</a>. The proof easily adapts to pointed spaces.'
),
(
	'Top*',
	'balanced',
	FALSE,
	'If $X$ is a set with a base point $x_0$, consider the discrete space $X_d$ on $X$ and the indiscrete space $X_i$ on $X$. The identity map $X \to X$ lifts to a continuous map $X_d \to X_i$ preserving $x_0$, which is bijective and therefore both a mono- and an epimorphism, but it is not an isomorphism unless $X = \{x_0\}$.'
),
(
	'Top*',
	'cartesian filtered colimits',
	FALSE,
	'The functor $\mathbb{Q} \times - : \mathbf{Top}_* \to \mathbf{Top}_*$ does not preserve colimits, see <a href="https://math.stackexchange.com/questions/2969372" target="_blank">MSE/2969372</a>. The counterexample also works for pointed spaces.'
),
(
	'Top*',
	'skeletal',
	FALSE,
	'This is trivial.'
),
(
	'Top*',
	'co-Malcev',
	FALSE,
	'We can adjust the proof for $\mathbf{Top}$ as follows: Consider the forgetful functor $U : \mathbf{Top}_* \to \mathbf{Set}$ and the relation $R \subseteq U^2$ defined by $R(X) := \{(x,y) \in U(X)^2 : x \in \overline{\{y\}} \}$. Both are representable: $U$ by the discrete space $\{0,1\}$ with base point $0$ and $R$ by the Sierpinski space with an isolated base point added. It is clear that $R$ is reflexive, but not symmetric.'
),
(
	'Top*',
	'unital',
	FALSE,
	'The joint image of $X \to X \times Y \leftarrow Y$ is just $\{(x,0) : x \in X\} \cup \{(0,y) : y \in Y\}$ (where $0$ denotes the base point), which is clearly a proper subset of $X \times Y$ when both $X,Y$ are non-trivial.'
),
(
	'Top*',
	'regular quotient object classifier',
	FALSE,
	'We can recycle the proof for the <a href="/category/Set*">category of pointed sets</a> using discrete topological spaces.'
);



