INSERT INTO category_property_assignments (
	category_id,
	property_id,
	is_satisfied,
	reason
)
VALUES
(
	'Set*',
	'locally small',
	TRUE,
	'There is a forgetful functor $\mathbf{Set}_* \to \mathbf{Set}$ and $\mathbf{Set}$ is locally small.'
),
(
	'Set*',
	'pointed',
	TRUE,
	'The singleton set is a zero object.'
),
(
	'Set*',
	'finitary algebraic',
	TRUE,
	'Take the algebraic theory with just one constant.'
),
(
	'Set*',
	'subobject classifier',
	TRUE,
	'The pointed set $(\{0,1\},1)$ is a subobject classifier.'
),
(
	'Set*',
	'cogenerator',
	TRUE,
	'The pointed set $(\{0,1\},1)$ is a cogenerator.'
),
(
	'Set*',
	'epi-regular',
	TRUE,
	'Every epimorphism is surjective for this category, and in an algebraic category every surjective homomorphism is a regular epimorphism.'
),
(
	'Set*',
	'coregular',
	TRUE,
	'From the other properties we know that (co-)limits exist and that monomorphisms coincide with injective pointed maps. So it suffices to prove that these maps are stable under pushouts. This follows from the corresponding fact for the <a href="/category/Set">category of sets</a> and the observation that the forgetful functor $\mathbf{Set}_* \to \mathbf{Set}$ preserves pushouts.'
),
(
	'Set*',
	'co-Malcev',
	TRUE,
	'Malcev categories are closed under slice categories by Prop. 2.2.14 in <a href="https://ncatlab.org/nlab/show/Malcev,+protomodular,+homological+and+semi-abelian+categories" target="_blank">Malcev, protomodular, homological and semi-abelian categories</a>. It follows that co-Malcev categories are closed under coslice categories, and $\mathbf{Set}_*$ is a coslice category of $\mathbf{Set}$, which is co-Malcev since every elementary topos is co-Malcev.'
),
(
	'Set*',
	'cocartesian cofiltered limits',
	TRUE,
	'Let $X$ be a pointed set and $(Y_i)$ be a filtered diagram of pointed sets. Base points will be denoted by $0$. The canonical map $X \vee \lim_i Y_i \to \lim_i (X \vee Y_i)$ is injective since the wedge sum naturally embeds into the product and the natural map $X \vee \prod_i Y_i \to \prod_i (X \times Y_i)$ is injective. Now let $z = (z_i) \in \lim_i (X \vee Y_i)$.
	<br>Case 1: There is some index $i$ with $z_i \in X \setminus \{0\}$. We claim $z_j \in X$ for any index $j$ and $z_j = z_i$ in $X$, so that $z$ has a preimage in $X$. To see this, choose an index $k \geq i,j$. Since $X \vee Y_i \to X \vee Y_k$ maps $z_i \mapsto z_k$ and is the identity on $X$, we see that $z_k \in X$ and $z_k = z_i$ in $X$. Since $X \vee Y_j \to X \vee Y_k$ maps $z_j \mapsto z_k$, we see that $z_j \notin Y_j$, since otherwise $z_k \in Y_k \cap X = \{0\}$. Hence, $z_j \in X \setminus \{0\}$, and then $z_j = z_k = z_i$.
	<br>Case 2: We have $z_i \in Y_i$ for all $i$. Then clearly $(z_i) \in \lim_i Y_i$ is a preimage.'
),
(
	'Set*',
	'CIP',
	TRUE,
	'The coproduct (wedge sum) of a family of pointed sets $(X_i)_{i \in I}$ can be realized as the subset of $\prod_{i \in I} X_i$ consisting of those tuples $x$ such that $x_i = 0$ for all but (at most) one index.'
),
(
	'Set*',
	'skeletal',
	FALSE,
	'This is trivial.'
),
(
	'Set*',
	'unital',
	FALSE,
	'The joint image of $X \to X \times Y \leftarrow Y$ is just $\{(x,0) : x \in X\} \cup \{(0,y) : y \in Y\}$ (where $0$ denotes the base point), which is clearly a proper subset of $X \times Y$ when both $X,Y$ are non-trivial.'
),
(
	'Set*',
	'CSP', -- TODO: remove duplication with unital proof
	FALSE,
	'The image of $X \vee Y$ in $X \times Y$ is just $\{(x,0) : x \in X\} \cup \{(0,y) : y \in Y\}$ (where $0$ denotes the base point), which is clearly a proper subset when both $X,Y$ are non-trivial.'
),
(
	'Set*',
	'conormal',
	FALSE,
	'Every cokernel is "injective away from the base point". Formally, if $p : A \to B$ is a cokernel in $\mathbf{Set}_*$, it has the property that $p(x)=p(y) \neq 0$ implies $x=y$ (where $0$ denotes the base point). Clearly this is not satisfied for every surjective pointed map, consider $(\mathbb{N},0) \to (\{0,1\},0)$ defined by $0 \mapsto 0$ and $x \mapsto 1$ for $x > 0$.'
),
(
	'Set*',
	'cofiltered-limit-stable epimorphisms',
	FALSE,
	'We already know that $\mathbf{Set}$ does not have this property. Now apply the contrapositive of the dual of <a href="/lemma/filtered-monos">this lemma</a> to the functor $\mathbf{Set} \to \mathbf{Set}_*$ that freely adds a base point.'
);
