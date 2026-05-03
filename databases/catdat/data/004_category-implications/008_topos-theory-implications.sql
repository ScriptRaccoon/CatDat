INSERT INTO category_implications_view (
	id,
	assumptions,
	conclusions,
	reason,
	is_equivalence
)
VALUES
(
	'ccc_condition',
	'["cartesian closed"]',
	'["finite products"]',
	'This holds by definition.',
	FALSE
),
(
	'subobject_classifier_well-powered',
	'["subobject classifier", "locally essentially small"]',
	'["well-powered"]',
	'See <a href="https://ncatlab.org/nlab/show/Sheaves+in+Geometry+and+Logic" target="_blank">Mac Lane & Moerdijk</a>, Prop. I.3.1.',
	FALSE
),
(
	'ccc_consequence',
	'["cartesian closed", "initial object"]',
	'["strict initial object"]',
	'See the <a href="https://ncatlab.org/nlab/show/strict+initial+object" target="_blank">nLab</a>.',
	FALSE
),
(
	'ccc_cartesian_filtered_colimits',
	'["cartesian closed", "filtered colimits"]',
	'["cartesian filtered colimits"]',
	'Each functor $X \times -$ is a left adjoint and therefore preserves (filtered) colimits.',
	FALSE
),
(
	'ccc_no_strict_terminal',
	'["cartesian closed", "strict terminal object"]',
	'["thin"]',
	'If a morphism $X \to Y$ exists, we get a morphism $1 \to [X,Y]$, which forces $[X,Y]$ to be a terminal object by assumption. But then any two morphisms $1 \rightrightarrows [X,Y]$ are equal, so that any two morphisms $X \rightrightarrows Y$ are equal.',
	FALSE
),
(
	'topos_definition',
	'["elementary topos"]',
	'["cartesian closed", "finitely complete", "subobject classifier"]',
	'This holds by definition.',
	TRUE
),
(
	'subobject_classifier_consequence',
	'["subobject classifier"]',
	'["finitely complete", "mono-regular"]',
	'The first part holds by convention, and the second part: any monomorphism $U \to X$ is the equalizer of $\chi_U,\chi_X : X \to \Omega$.',
	FALSE
),
(
	'subobject_classifier_pointed_case',
	'["subobject classifier", "pointed"]',
	'["normal"]',
	'The universal property of $\top : 0 \to \Omega$ precisely says that every monomorphism $A \to B$ is the kernel of a unique morphism $B \to \Omega$, so it is normal.',
	FALSE
),
(
	'additive_trivial_condition',
	'["regular subobject classifier", "additive"]',
	'["trivial"]',
	'See <a href="https://math.stackexchange.com/a/5132767/1650" target="_blank">MSE/4086192</a>.',
	FALSE
),
(
	'regular_subobjects_trivial',
	'["right cancellative", "finitely complete"]',
	'["regular subobject classifier"]',
	'In a right cancellative category, every regular monomorphism is an isomorphism, so that a terminal object is a regular subobject classifier.',
	FALSE
),
(
	'regular_subobject_weaker',
	'["subobject classifier"]',
	'["regular subobject classifier"]',
	'This is obvious.',
	FALSE
),
(
	'regular_subobject_assumption',
	'["regular subobject classifier"]',
	'["finitely complete"]',
	'This holds by definition.',
	FALSE
),
(
	'regular_subobjects_suffice',
	'["regular subobject classifier", "mono-regular"]',
	'["subobject classifier"]',
	'This is obvious.',
	FALSE
),
(
	'regular_subobject_classifier_strict',
	'["regular subobject classifier", "strict terminal object"]',
	'["thin"]',
	'Let $\Omega$ be a regular subobject classifier. Since $1$ is a strict terminal object, $\top : 1 \to \Omega$ is an isomorphism. This implies that every regular monomorphism is an isomorphism. Hence, by taking the equalizer of two parallel morphisms, we see that the category is thin.',
	FALSE
),
(
	'pullbacks_are_local_products',
	'["locally cartesian closed"]',
	'["pullbacks"]',
	'Pullbacks are binary products in slice categories.',
	FALSE
),
(
	'locally_cartesian_closed_with_terminal_is_closed',
	'["locally cartesian closed", "terminal object"]',
	'["cartesian closed"]',
	'The slice over the terminal object is the category itself.',
	FALSE
),
(
	'topos_consequence',
	'["elementary topos"]',
	'["finitely cocomplete", "disjoint finite coproducts", "epi-regular", "effective congruences"]',
	'See <a href="https://ncatlab.org/nlab/show/Sheaves+in+Geometry+and+Logic" target="_blank">Mac Lane & Moerdijk</a>, Cor. IV.5.4, Cor. IV.10.5, Thm. 4.7.8; and <a href="https://ncatlab.org/nlab/show/Sketches+of+an+Elephant" target="_blank">Johnstone</a>, Part A, Proposition 2.4.1.',
	FALSE
),
(
	'topos_well-copowered_criterion',
	'["elementary topos", "locally essentially small"]',
	'["well-copowered"]',
	'This follows from <a href="https://ncatlab.org/nlab/show/Sheaves+in+Geometry+and+Logic" target="_blank">Mac Lane & Moerdijk</a>, Theorem IV.7.8 (and Prop. I.3.1).',
	FALSE
),
(
	'grothendieck_topos_definition',
	'["Grothendieck topos"]',
	'["elementary topos", "coproducts", "generating set", "locally essentially small"]',
	'See <a href="https://ncatlab.org/nlab/show/Sheaves+in+Geometry+and+Logic" target="_blank">Mac Lane & Moerdijk</a>, Appendix, Prop. 4.4.',
	TRUE
),
(
	'grothendieck_topos_consequence',
	'["Grothendieck topos"]',
	'["locally presentable", "cogenerator", "infinitary extensive", "exact filtered colimits"]',
	'A Grothendieck topos is locally presentable by Prop. 3.4.16 in <a href="https://www.cambridge.org/core/books/handbook-of-categorical-algebra/5033A02442342401E7BCC26A042DAB94" target="_blank">Handbook of Categorical Algebra Vol. 3</a>, has a cogenerator (see <a href="https://ncatlab.org/nlab/show/cogenerator" target="_blank">nLab</a>) and is infinitary extensive by <a href="https://ncatlab.org/nlab/show/Giraud%27s+theorem" target="_blank">Giraud''s Theorem</a>. To show that it has exact filtered colimits, first observe that this is clearly true in every presheaf topos (since $\Set$ has the property). Every Grothendieck topos is a full reflective subcategory of a presheaf topos such that the reflector preserves finite limits (<a href="https://ncatlab.org/nlab/show/sheaf+toposes+are+equivalently+the+left+exact+reflective+subcategories+of+presheaf+toposes" target="_blank">nLab</a>), so we conclude with <a href="/lemma/exact_filtered_colimits_descend">this lemma</a>.',
	FALSE
),
(
	'topos_is_locally_cartesian_closed',
	'["elementary topos"]',
	'["locally cartesian closed"]',
	'See <a href="https://ncatlab.org/nlab/show/Sketches+of+an+Elephant" target="_blank">Johnstone</a>, Cor. A2.3.4.',
	FALSE
),
(
	'lcc_implies_regular',
	'["locally cartesian closed", "coequalizers", "finitely complete"]',
	'["regular"]',
	'See <a href="https://ncatlab.org/nlab/show/Sketches+of+an+Elephant" target="_blank">Johnstone</a>, Lemma A1.5.13. From this it follows also that every elementary topos is regular.',
	FALSE
),
(
	'topos_implies_coregular',
	'["elementary topos"]',
	'["coregular"]',
	'This is proven in <a href="https://ncatlab.org/nlab/show/Sketches+of+an+Elephant" target="_blank">Johnstone</a>, A2.6.3 (for every quasitopos).',
	FALSE
),
(
	'regular_effective_congruences_implies_quotients',
	'["regular", "effective congruences"]',
	'["quotients of congruences"]',
	'We assume that every congruence is effective, and the regularity condition implies that every effective congruence has a quotient.',
	FALSE
),
(
	'regular_epi-regular_extensive_consequences',
	'["regular", "epi-regular", "extensive"]',
	'["effective cocongruences", "co-Malcev"]',
	'Suppose we have a coreflexive corelation
	$$X+X'' \xtwoheadrightarrow{p} E \xtwoheadrightarrow{r} X$$
	on $X$, where we let $X''$ be an isomorphic copy of $X$ for clarity below. Let $Y$ be the equalizer of $p\circ i_1, p\circ i_2 : X \rightrightarrows E$. That means that for a generalized element $x \in X(T)$, $x \in Y(T)$ if and only if $p(x) = p(x'')$. Then by the assumptions $p$ is a regular epimorphism. By regularity, $p$ is the coequalizer of its kernel pair, which can be expressed as the equalizer $K$ of
	$$p \circ \pi_1,\, p\circ \pi_2 : (X+X'') \times (X+X'') \rightrightarrows E,$$
	where $\pi_1, \pi_2$ are the projections. By distributivity and extensivity, it is sufficient to calculate the equalizer on each "quadrant" of $(X+X'') \times (X+X'')$, i.e. the four copies of $X \times X$.<br>
	On the $X\times X$ quadrant, for generalized elements $x_1, x_2 \in X(T)$, we have $(x_1, x_2) \in K(T)$ if and only if $p(x_1) = p(x_2)$. Since $p\circ i_1$ is a split monomorphism, this is equivalent to $x_1 = x_2$. Thus, the $X\times X$ quadrant of $K$ is the diagonal of $X$. On the $X\times X''$ quadrant, we have $(x_1, x_2'')\in K(T)$ if and only if $p(x_1) = p(x_2'')$. Since $r(p(x_1)) = x_1$ and $r(p(x_2'')) = x_2$, this condition implies $x_1 = x_2$; and then by definition of $Y$, $x_1 = x_2 \in Y(T)$. The converse is straightforward. Thus, the $X\times X''$ quadrant of $K$ is the diagonal of $Y$. Similarly, the $X''\times X$ quadrant of $K$ is the diagonal of $Y$, and the $X''\times X''$ quadrant of $K$ is the diagonal of $X$.<br>

	Thus, we get that a morphism $h : X+X'' \to Z$ factors through $E$ if and only if $h(x) = h(x)$ for every generalized element $x \in X$; $h(y) = h(y'')$ for every $y \in Y$; $h(y'') = h(y)$ for every $y\in Y$; and $h(x'') = h(x'')$ for every $x \in X$. Clearly this is equivalent to $h(y) = h(y'')$ for every $y\in Y$, so in fact $E$ is the cokernel pair of $i_1 \circ \operatorname{inc}_Y$ and $i_2 \circ \operatorname{inc}_Y$. This means that $E$ is an effective cocongruence.<br><br>

	Remark: The assumptions are satisfied in particular for every elementary topos. Therefore, every elementary topos has effective cocongruences and is co-Malcev. This special case is Example 2.2.18 in <a href="https://ncatlab.org/nlab/show/Malcev,+protomodular,+homological+and+semi-abelian+categories" target="_blank">Malcev, protomodular, homological and semi-abelian categories</a>. An alternative proof of this special case is given later in A.5.17.',
	FALSE
),
(
	'pretopos_balanced',
	'["effective congruences", "extensive"]',
	'["mono-regular"]',
	'Let $\alpha : A \hookrightarrow B$ be a monomorphism. Let $B''$ be a copy of $B$, and likewise let $A''$ be a copy of $A$. Consider the congruence on $B + B''$ generated by $y \sim y''$ for $y \in A$. Formally, we define $E := B + B'' + A + A''$ and define the two morphisms $f, g : E \rightrightarrows B + B''$ by extending the identity on $B + B''$ and
	$$\begin{align*}
	f(y) & = \alpha(y), & f(y'') & = \alpha(y)'', \\
	g(y) & = \alpha(y)'', & g(y'') & = \alpha(y),
	\end{align*}$$
	on generalized elements. Extensivity can be used to show that $f, g$ are jointly monomorphic. Clearly, the pair $f, g$ is reflexive and symmetric. For transitivity, one once again uses extensivity. By assumption, there is a morphism $h : B + B'' \to C$ such that $f, g$ is the kernel pair of $h$, that is, two generalized elements $x, y \in B + B''$ satisfy $h(x) = h(y)$ if and only if $x = f(e)$, $y = g(e)$ for some $e \in E$. In particular, for $x \in B$, we have $h(x) = h(x'')$ if and only if $x = f(e)$, $x'' = g(e)$ for some $e \in E$. By disjointness of coproducts, we must necessarily have $e \in A$, and $x = \alpha(e)$. This shows that $\alpha$ is the equalizer of $h \circ i_1, h \circ i_2 : B \rightrightarrows C$.',
	FALSE
),
(
	'lcc_implies_extensive',
	'["locally cartesian closed", "disjoint finite coproducts"]',
	'["extensive"]',
	'The pullback functor preserves finite coproducts because it has a right adjoint. Remark: In combination with other implication, this result implies that every elementary topos is extensive.',
	FALSE
),
(
	'lcc_extensive_yields_infinitary',
	'["locally cartesian closed", "cocomplete", "extensive"]',
	'["infinitary extensive"]',
	'The pullback functor preserves coproducts because it has a right adjoint. See also Remark 2.6 at the <a href="https://ncatlab.org/nlab/show/extensive+category" target="_blank">nLab</a>.',
	FALSE
),
(
	'subobject_classifier_disallows_malcev',
	'["subobject classifier", "Malcev"]',
	'["subobject-trivial"]',
	'The subobject classifier $\Omega$ is an internal poset (cf. <a href="https://ncatlab.org/nlab/show/Sheaves+in+Geometry+and+Logic" target="_blank">Mac Lane & Moerdijk</a>, IV.8). Concretely, the intersection of subobjects yields a morphism $\wedge : \Omega \times \Omega \to \Omega$, and the internal relation ${\leq_{\Omega}} \subseteq \Omega \times \Omega$ is the equalizer of $\wedge, p_1 : \Omega \times \Omega \rightrightarrows \Omega$. The relation ${\leq_{\Omega}}$ is reflexive, hence symmetric by assumption. Since it also antisymmetric and has a largest element $\top$, every monomorphism must be an isomorphism. (From here, we can infer that the category is trivial.)',
	FALSE
),
(
	'nno_assumption',
	'["natural numbers object"]',
	'["finite products"]',
	'This holds by definition.',
	FALSE
),
(
	'nno_criterion',
	'["countably distributive"]',
	'["natural numbers object"]',
	'Consider the copower $N := \coprod_{n \in \IN} 1$ with inclusions $i_n : 1 \to N$ for $n \in \IN$. We define $z := i_1 : 1 \to N$ and $s : N \to N$ by $s \circ i_n = i_{n+1}$. Since the category is countably distributive, we have $A \times N \cong \coprod_{n \in \IN} A$ for every object $A$. Given morphisms $f : A \to X$, $g : X \to X$, a morphism $\Phi : A \times N \to X$ therefore corresponds to a family of morphisms $\phi_n : A \to X$ for $n \in \IN$. The condition $\Phi(a,z)=f(a)$ becomes $\phi_0 = f$. The condition $\Phi(a,s(n)) = g(\Phi(a,n))$ becomes $\phi_{n+1} = g \circ \phi_n$. This recursively defines the morphisms $\phi_n$. (We are basically using that $\IN$ is a natural numbers object in $\Set$.) Concretely, $\phi_n = g^n \circ f$.',
	FALSE
),
(
	'nno_pointed_case',	
	'["natural numbers object", "pointed"]',
	'["trivial"]',
	'Let $(N,z,s)$ be a natural numbers object in a category with a zero object, denoted $0$. The morphism $z : 0 \to N$ must be zero. The universal property applied to $A=1$ implies that $s : N \to N$ is an initial object in the category of endomorphisms. This exists, it is given by the identity $0 \to 0$. Therefore, $N = 0$. The general universal property now becomes: For all $f : A \to X$, $g : X \to X$ there is a unique $\Phi : A \to X$ such that $\Phi(a) = f(a)$ and $\Phi(a)=g(\Phi(a))$. Apply this to $g = 0$ to conclude $f = 0$.',
	FALSE
),
(
	'nno_terminal',
	'["natural numbers object", "strict terminal object"]',
	'["one-way"]',
	'By assumption, $z : 1 \to N$ is an isomorphism. Therefore, the terminal object $1$ is a NNO with $z = \id_1$ and $s = \id_1$. This precisely means that for all $f : A \to X$ and $g : X \to X$ there is a unique $\Phi : A \to X$ with $\Phi = f$ and $\Phi = g \circ \Phi$. In other words, we have $f = g \circ f$, and therefore $g = \id_X$ (take $f = \id_X$), which proves the claim. (From here one can further deduce that the category is thin.)',
	FALSE
),
(
	'nno_thin',
	'["finite products", "thin"]',
	'["natural numbers object"]',
	'The triple $(1, \id_1, \id_1)$ is clearly a NNO.',
	FALSE
),
(
	'topos_no_stable_epis',
	'["elementary topos", "countable coproducts", "cofiltered-limit-stable epimorphisms"]',
	'["trivial"]',
	'Let $N := \coprod_{m \in \IN} 1$ and consider for every $n \in \IN$ the subobject $N_{\geq n} = \coprod_{m \geq n} 1$ of $N$. For $n \leq n''$ we have $N_{\geq n''} \subseteq N_{\geq n}$. There is a (unique, split) epimorphism $N_{\geq n} \to 1$ for every $n$. By assumption, their limit $\lim_n N_{\geq n} \to 1$ is also an epimorphism. But $\lim_n N_{\geq n} = \bigcap_{n} N_{\geq n} = 0$. Thus, $0 \to 1$ is an epimorphism. It must be a regular epimorphism, but $0$ is strict initial, so that $0 \to 1$ is an isomorphism. Hence, $X \cong X \times 1 \cong X \times 0 \cong 0$ for all $X$.',
	FALSE
);
