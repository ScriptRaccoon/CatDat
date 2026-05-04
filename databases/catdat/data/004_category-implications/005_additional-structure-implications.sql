INSERT INTO category_implications_view (
	id,
	assumptions,
	conclusions,
	reason,
	is_equivalence
)
VALUES
(
	'finitary_algebraic_consequence',
	'["finitary algebraic"]',
	'["locally strongly finitely presentable"]',
	'This is trivial because a locally strongly finitely presentable category is a variety of many-sorted finitary algebras.',
	FALSE
),
(
	'zero_morphisms_mean_strongly_connected',
	'["zero morphisms", "inhabited"]',
	'["strongly connected"]',
	'This holds by definition.',
	FALSE
),
(
	'preadditive_consequence',
	'["preadditive"]',
	'["locally essentially small", "zero morphisms"]',
	'This is trivial.',
	FALSE
),
(
	'preadditive_kernels_normal_imply_effective_congruences',
	'["preadditive", "kernels", "normal"]',
	'["effective congruences"]',
	'Let $f, g : E \rightrightarrows X$ be a congruence. Then let $E_0$ be the kernel of $g$. We see that $f|_{E_0} : E_0 \to X$ is a monomorphism. Let $f|_{E_0}$ be the kernel of a morphism $h : X \to Y$. We claim that $E$ is also the kernel pair of $h$.<br>
	To see this, suppose we have a pair of generalized elements $x_1, x_2 \in X(T)$. Then we have
	$$\begin{align*}
	(x_1,x_2) \in E & \iff (x_1 - x_2,0) \in E \\
	& \iff x_1 - x_2 \in E_0 \\
	& \iff h(x_1 - x_2) = 0 \\
	& \iff h(x_1) = h(x_2).
	\end{align*}$$
	In particular, applying the forward implications in the case $T := E$, $x_1 := f$, $x_2 := g$, we conclude that $h \circ f = h \circ g$, so we get the required commutative diagram. From there, the reverse implications show this diagram is a cartesian square.',
	FALSE
),
(
	'additive_effective_congruences_imply_normal',
	'["additive", "finitely complete", "effective congruences"]',
	'["normal"]',
	'Let $i : Y \hookrightarrow X$ be a monomorphism. Then the pullback $E$ of
	$$X \times X \xrightarrow{p_1 - p_2} X \xhookleftarrow{~~~i~~~} Y$$
	is a congruence on $X$. This is because for generalized elements $x_1, x_2 \in X(T)$, $(x_1, x_2)$ factors through $E$ if and only if $x_1 - x_2$ factors through $Y$. In other words, the relation on $X(T)$ is exactly $x_1 \equiv x_2 \pmod{Y(T)}$, which is an equivalence relation on $X(T)$ (and in fact a congruence in $\Ab$). Now by assumption, $E$ is the kernel pair of some morphism $h : X \to Z$; in other words, $(x_1, x_2)$ factors through $E$ if and only if $h(x_1) = h(x_2)$. In particular, for $x \in X(T)$, $x$ factors through $Y$ if and only if $(x, 0)$ factors through $E$, which is equivalent to $h(x) = h(0) = 0$. We have thus shown that $Y$ is the kernel of $h$.',
	FALSE
),
(
	'additive_definition',
	'["additive"]',
	'["preadditive", "finite products"]',
	'This holds by definition.',
	TRUE
),
(
	'additive_biproducts',
	'["additive"]',
	'["biproducts"]',
	'This is standard, see e.g. Prop. 2.1 on the <a href="https://ncatlab.org/nlab/show/additive+category" target="_blank">nLab</a>.',
	FALSE
),
(
	'abelian_definition',
	'["abelian"]',
	'["additive", "kernels", "cokernels", "normal", "conormal"]',
	'This holds by definition.',
	TRUE
),
(
	'abelian_implies_regular',
	'["abelian"]',
	'["regular"]',
	'In an abelian category, every epimorphism is regular, and epimorphisms are pullback-stable, see <a href="https://ncatlab.org/nlab/show/Categories+for+the+Working+Mathematician" target="_blank">Mac Lane</a>, Ch. VIII.',
	FALSE
),
(
	'grothendieck_abelian_definition',
	'["Grothendieck abelian"]',
	'["abelian", "coproducts", "generator", "exact filtered colimits"]',
	'This holds by definition.',
	TRUE
),
(
	'split_abelian_condition',
	'["split abelian"]',
	'["abelian"]',
	'This holds by definition.',
	FALSE
),
(
	'preadditive_products_criterion',
	'["preadditive", "finite coproducts"]',
	'["finite products"]',
	'See <a href="https://ncatlab.org/nlab/show/Categories+for+the+Working+Mathematician" target="_blank">Mac Lane</a>, VIII.2., Theorem 2.',
	FALSE
),
(
	'algebraic_well-copowered',
	'["finitary algebraic"]',
	'["well-copowered"]',
	'See <a href="https://mathoverflow.net/questions/486607" target="_blank">MSE/486607</a>. Alternatively, one may combine the facts that finitary algebraic categories are locally (finitely) presentable and that locally presentable categories are well-copowered, both of which are saved in the database. But we include the direct proof here as well, since it makes it easier to deduce the property for finitary algebraic categories appearing in practice.',
	FALSE
),
(
	'many_sorted_algebraic_implies_regular',
	'["locally strongly finitely presentable"]',
	'["regular"]',
	'The regular epimorphisms are precisely the sort-wise surjective homomorphisms, which are clearly stable under pullbacks.',
	FALSE
),
(
	'algebras_with_0_disjoint_products',
	'["finitary algebraic", "pointed"]',
	'["disjoint products"]',
	'We have a constant in every algebra, let us denoted it by $0$. Then the projection $A \times B \to A$ is clearly surjective, hence an epimorphism. To show that $A \sqcup_{A \times B} B$ is trivial, let $R$ be an algebra which admits homomorphisms $f : A \to R$, $g : B \to R$ such that $f(p_1(a,b)) = g(p_2(a,b))$ for all $(a,b) \times A \times B$. This means $f(a) = g(b)$. In particular, $f(a) = g(0) = 0$. Likewise, $g(b) = 0$, and we are done.',
	FALSE
),
(
	'grothendieck_abelian_cogenerator',
	'["Grothendieck abelian"]',
	'["cogenerator"]',
	'See <a href="https://ncatlab.org/nlab/show/Categories+and+Sheaves" target="_blank">Kashiwara-Schapira</a>, Thm. 9.6.3.',
	FALSE
),
(
	'grothendieck_abelian_self-dual',
	'["Grothendieck abelian", "self-dual"]',
	'["trivial"]',
	'This follows since the dual of a non-trivial Grothendieck abelian category cannot be Grothendieck abelian. See Peter Freyd, <i>Abelian categories</i>, p. 116.',
	FALSE
);
