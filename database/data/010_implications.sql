INSERT INTO implication_input (
	id,
	assumptions,
	conclusions,
	reason,
	is_equivalence
)
VALUES
	-- easy implications
	(
		'small_consequence',
		'["small"]',
		'["locally small", "essentially small"]',
		'This is trivial.',
		FALSE
	),
	(
		'essentially_small_consequence',
		'["essentially small"]',
		'["well-powered", "well-copowered", "locally essentially small"]',
		'This is trivial.',
		FALSE
	),
	(
		'finite_consequence',
		'["finite"]',
		'["small", "essentially finite"]',
		'This is trivial.',
		FALSE
	),
	(
		'essentially_finite_consequence',
		'["essentially finite"]',
		'["essentially small"]',
		'This is trivial.',
		FALSE
	),
	(
		'locally_small_consequence',
		'["locally small"]',
		'["locally essentially small"]',
		'This is trivial.',
		FALSE
	),
	(
		'discrete_consequence',
		'["discrete"]',
		'["essentially discrete", "locally small", "skeletal"]',
		'This is trivial.',
		FALSE
	),
	(
		'essentially_discrete_characterization',
		'["essentially discrete"]',
		'["thin", "groupoid"]',
		'This is trivial.',
		TRUE
	),
	(
		'essentially_discrete_consequence',
		'["essentially discrete"]',
		'["locally essentially small", "connected limits"]',
		'This is trivial.',
		FALSE
	),
	(
		'essentially_discrete_trivial',
		'["essentially discrete", "connected"]',
		'["trivial"]',
		'This is trivial.',
		FALSE
	),
	(
		'trivial_consequence',
		'["trivial"]',
		'["finitary algebraic", "Grothendieck topos", "split abelian", "self-dual", "essentially discrete", "essentially finite"]',
		'This is trivial.',
		FALSE
	),

	(
		'thin_consequence',
		'["thin"]',
		'["equalizers", "left cancellative"]',
		'Any two parallel morphisms are equal, so their equalizer is the identity, and every morphism is a monomorphism as well.',
		FALSE
	),
	(
		'thin_inhabited_consequence',
		'["thin", "inhabited"]',
		'["generator"]',
		'Any object will be a generator for trivial reasons.',
		FALSE
	),
	(
		'cancellative_consequence',
		'["left cancellative", "coequalizers"]',
		'["thin"]',
		'If $f,g$ are two parallel morphisms, then their coequalizer is a regular epimorphism, but also a monomorphism by assumption, so it must be an isomorphism. But this means that $f = g$.',
		FALSE
	),
	(
		'complete_consequence',
		'["complete"]',
		'["finitely complete", "filtered limits", "wide pullbacks", "connected limits"]',
		'This is trivial.',
		FALSE
	),

	(
		'products_consequence',
		'["products"]',
		'["finite products", "countable products"]',
		'This is trivial.',
		FALSE
	),
	(
		'finite_products_characterization',
		'["finite products"]',
		'["terminal object", "binary products"]',
		'The non-trivial direction follows since finite products can be constructed recursively via $X_1 \times \cdots \times X_{n+1} = (X_1 \times \cdots \times X_n) \times X_{n+1}$.',
		TRUE
	),
	(
		'products_criterion',
		'["finite products", "filtered limits"]',
		'["products"]',
		'The product $\prod_{i \in I} X_i$ is the filtered limit of the finite partial products $\prod_{i \in E} X_i$ where $E$ ranges over the finite subsets of $I$.',
		FALSE
	),

	(
		'binary_products_criterion',
		'["pullbacks", "terminal object"]',
		'["binary products"]',
		'If $1$ is a terminal object, then $X \times_1 Y = X \times Y$.',
		FALSE
	),
	(
		'terminal_consequence',
		'["terminal object"]',
		'["connected"]',
		'If $1$ denotes the terminal object, then for any two objects $A,B$ we have the zig-zag $A \to 1 \leftarrow B$.',
		FALSE
	),
	(
		'pointed_characterization',
		'["pointed"]',
		'["zero morphisms", "initial object"]',
		'This is easy.',
		TRUE
	),

	(
		'pointed_ccc_trivial',
		'["pointed", "cartesian closed"]',
		'["trivial"]',
		'We have $X \cong X \times 1 \cong X \times 0 \cong 0$ for every object $X$.',
		FALSE
	),
	(
		'disjoint_coproducts_equivalence',
		'["disjoint coproducts"]',
		'["coproducts", "disjoint finite coproducts"]',
		'This is easy.',
		TRUE
	),
	(
		'disjoint_coproducts_consequence',
		'["disjoint finite coproducts"]',
		'["finite coproducts"]',
		'This holds by definition.',
		FALSE
	),
	(
		'disjoint_coproducts_thin_trivial',
		'["disjoint finite coproducts", "thin"]',
		'["trivial"]',
		'For every object $A$ the two inclusions $A \rightrightarrows A + A$ must be equal, so their equalizer is $A$, but also $0$ since the coproduct is disjoint. Hence $A = 0$.',
		FALSE
	),
	(
		'disjoint_coproducts_strict',
		'["disjoint finite coproducts", "strict terminal object"]',
		'["thin"]',
		'Let $1$ be the strict terminal object, and let $A$ be any object. Then $1 \to A + 1$ is an isomorphism, since $1$ is strict. Also, $A \to A + 1$ is a monomorphism by assumption. It follows that the unique morphism $u : A \to 1$ is a monomorphism. For all $f,g : B \to A$ we have $uf = ug$ (since $1$ is terminal), hence $f = g$.',
		FALSE
	),
	(
		'binary_products_consequence',
		'["binary products", "inhabited"]',
		'["connected"]',
		'For any two objects $A,B$ we have the zig-zag $A \to A \times B \to B$.',
		FALSE
	),
	(
		'strict_initial_consequence',
		'["strict initial object"]',
		'["initial object"]',
		'This holds by definition.',
		FALSE
	),
	(
		'strict_initial_trivial',
		'["strict initial object", "pointed"]',
		'["trivial"]',
		'If $0$ is the zero object, then for every object $A$ the unique morphism $A \to 0$ is an isomorphism by assumption.',
		FALSE
	),
	(
		'strict_initial_left_criterion',
		'["left cancellative", "initial object"]',
		'["strict initial object"]',
		'It suffices to prove that in general any monomorphism $f : A \to 0$ into an initial object is an isomorphism. If $g : 0 \to A$ is the unique morphism, then $f \circ g = \mathrm{id}_0$ since $0$ is initial. But then $f$ is a split epimorphism and a monomorphism, hence an isomorphism.',
		FALSE
	),
	(
		'strict_initial_right_criterion',
		'["right cancellative", "initial object"]',
		'["strict initial object"]',
		'Let $f : A \to 0$ be a morphism. Let $g : 0 \to A$ be the unique morphism. It is an epimorphism by assumption. Also, $f \circ g = \mathrm{id}_0$ since $0$ is initial. But then $g$ is a split monomorphism and an epimorphism, hence an isomorphism.',
		FALSE
	),
	(
		'equalizers_consequence',
		'["equalizers"]',
		'["Cauchy complete"]',
		'If $e : X \to X$ is an idempotent, then the equalizer of $e, \mathrm{id}_X : X \rightrightarrows X$ provides a splitting of $e$.',
		FALSE
	),
	(
		'cauchy_complete_criterion',
		'["left cancellative"]',
		'["Cauchy complete"]',
		'Any idempotent monomorphism must be the identity and therefore splits.',
		FALSE
	),
	(
		'countable_products_consequence',
		'["countable products"]',
		'["finite products"]',
		'This is trivial.',
		FALSE
	),
	(
		'directed_limits_consequence',
		'["directed limits"]',
		'["sequential limits"]',
		'This is trivial.',
		FALSE
	),
	(
		'exact_filtered_colimits_condition',
		'["exact filtered colimits"]',
		'["filtered colimits", "finitely complete"]',
		'This holds by definition.',
		FALSE
	),
	(
		'infinitary_distributive_consequence',
		'["infinitary distributive"]',
		'["finite products", "coproducts"]',
		'This holds by definition.',
		FALSE
	),
	(
		'infinitary_distributive_condition',
		'["infinitary distributive"]',
		'["distributive"]',
		'This is trivial.',
		FALSE
	),
	(
		'distributive_condition',
		'["distributive"]',
		'["finite products", "finite coproducts"]',
		'This holds by definition.',
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
		'locally_finitely_presentable_condition',
		'["locally finitely presentable"]',
		'["locally presentable"]',
		'Locally finitely presentable categories are by definition the locally $\aleph_0$-presentable categories.',
		FALSE
	),
	(
		'locally_finitely_presentable_raise',
		'["locally finitely presentable"]',
		'["locally ℵ₁-presentable"]',
		'This is trivial.',
		FALSE
	),
	(
		'locally_countably_presentable_raise',
		'["locally ℵ₁-presentable"]',
		'["locally presentable"]',
		'This is trivial.',
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
		'ccc_condition',
		'["cartesian closed"]',
		'["finite products"]',
		'This holds by definition.',
		FALSE
	),
	(
		'subobject_classifier_consequence',
		'["subobject classifier"]',
		'["finitely complete", "mono-regular"]',
		'The first part holds by convention, and the second part: any monomorphism $U \to X$ is the equalizer of $\chi_U,\chi_X : X \to \Omega$.',
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
		'additive_definition',
		'["additive"]',
		'["preadditive", "finite products"]',
		'This holds by definition.',
		TRUE
	),
	(
		'additive_consequence',
		'["additive"]',
		'["disjoint finite coproducts"]',
		'If $f : T \to A + B$ is a morphism that factors through $A$ and $B$, then $p_B f = 0$ and $p_A f = 0$, so $f = 0$.',
		FALSE
	),
	(
		'abelian_definition',
		'["abelian"]',
		'["additive", "equalizers", "coequalizers", "mono-regular", "epi-regular"]',
		'This holds by definition.',
		TRUE
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
		'groupoid_criterion',
		'["left cancellative", "right cancellative", "balanced"]',
		'["groupoid"]',
		'This is trivial.',
		FALSE
	),
	(
		'groupoid_thin',
		'["groupoid", "equalizers"]',
		'["thin"]',
		'The equalizer of any parallel pair $f,g$ must be an isomorphism, so $f=g$.',
		FALSE
	),
	(
		'groupoid_products',
		'["groupoid", "binary products", "inhabited"]',
		'["trivial"]',
		'Let $\mathcal{C}$ be an inhabited groupoid with binary products. Then it is connected, so we may assume $\mathcal{C}=BG$ for a group $G$ with unique object $*$. But then $* \times * = *$, so there are $p,q \in G$ such that $G \to G \times G$, $x \mapsto (px,qx)$ is bijective. From here it is an easy exercise to deduce $G=1$.',
		FALSE
	),
	(
		'groupoid_initial',
		'["groupoid", "initial object"]',
		'["trivial"]',
		'This is easy.',
		FALSE
	),
	(
		'groupoid_zero',
		'["groupoid", "zero morphisms", "inhabited"]',
		'["trivial"]',
		'This is easy.',
		FALSE
	),
	(
		'groupoid_connected',
		'["groupoid", "connected"]',
		'["strongly connected"]',
		'trivial',
		FALSE
	),
	(
		'connected_consequence',
		'["connected"]',
		'["inhabited"]',
		'This holds by definition.',
		FALSE
	),
	(
		'strongly_connected_consequence',
		'["strongly connected"]',
		'["connected"]',
		'This holds by definition.',
		FALSE
	),
	(
		'generator_consequence',
		'["generator"]',
		'["inhabited"]',
		'This is trivial.',
		FALSE
	),
	(
		'groupoid_consequence',
		'["groupoid"]',
		'["self-dual", "mono-regular", "pullbacks", "directed limits", "left cancellative", "well-powered"]',
		'This is easy.',
		FALSE
	),
	(
		'mono_regular_consequence',
		'["mono-regular"]',
		'["balanced"]',
		'Any regular monomorphism that is an epimorphism must be an isomorphism.',
		FALSE
	),
	(
		'malcev_condition',
		'["Malcev"]',
		'["finitely complete"]',
		'This holds by definition.',
		FALSE
	),
	(
		'malcev_thin_condition',
		'["thin", "finitely complete"]',
		'["Malcev"]',
		'In a thin category, every subobject of $X^2 = X$ containing $X$ is already $X$.',
		FALSE
	),
	(
		'zero-no-mono',
		'["left cancellative", "zero morphisms"]',
		'["thin"]',
		'If $f,g : A \to B$ are two morphisms, then $0_{B,B} \circ f = 0_{A,B} = 0_{B,B} \circ g$, so that $f = g$.',
		FALSE
	),
	(
		'codiagonal-no-mono',
		'["left cancellative", "binary coproducts"]',
		'["thin"]',
		'For every object $A$ the codiagonal $A + A \to A$ is a split epimorphism, and by assumption a monomorphism, hence an isomorphism. Hence, the two inclusions $i_1,i_2 : A \to A + A$ coincide. Now, if $f, g : A \to B$ are two morphisms, consider the induced morphism $h : A + A \to B$ and compute $f = h \circ i_1 = h \circ i_2 = g$.',
		FALSE
	),
	(
		'biproducts_definition_consequences',
		'["biproducts"]',
		'["zero morphisms", "finite products", "finite coproducts"]',
		'This holds by definition of biproducts.',
		FALSE
	),
	(
		'additive_biproducts',
		'["additive"]',
		'["biproducts"]',
		'This is standard, see e.g. Prop. 2.1 on the <a href="https://ncatlab.org/nlab/show/additive+category" target="_blank">nLab</a>.',
		FALSE
	),

	-- standard implications
	(
		'freyd_small',
		'["essentially small", "products"]',
		'["thin"]',
		'See <a href="https://ncatlab.org/nlab/show/Categories+for+the+Working+Mathematician" target="_blank">Mac Lane</a>, V.2, Prop. 3. The proof works for any category with products.',
		FALSE
	),
	(
		'freyd_finite',
		'["essentially finite", "finite products"]',
		'["thin"]',
		'See <a href="https://ncatlab.org/nlab/show/Categories+for+the+Working+Mathematician" target="_blank">Mac Lane</a>, V.2, Prop. 3. The proof can easily be adapted to this case.',
		FALSE
	),
	(
		'complete_characterization',
		'["complete"]',
		'["products", "equalizers"]',
		'See <a href="https://ncatlab.org/nlab/show/Categories+for+the+Working+Mathematician" target="_blank">Mac Lane</a>, V.2, Cor. 2.',
		TRUE
	),
	(
		'finitely_complete_characterization',
		'["finitely complete"]',
		'["finite products", "equalizers"]',
		'See <a href="https://ncatlab.org/nlab/show/Categories+for+the+Working+Mathematician" target="_blank">Mac Lane</a>, V.2, Cor. 1.',
		TRUE
	),
	(
		'pullbacks_criterion',
		'["binary products", "equalizers"]',
		'["pullbacks"]',
		'The pullback of $f : X \to S$ and $g : Y \to S$ is the equalizer of $p_1 \circ f, \, p_2 \circ g : X \times Y \rightrightarrows S$.',
		FALSE
	),
	(
		'equalizers_criterion',
		'["binary products", "pullbacks"]',
		'["equalizers"]',
		'The equalizer of $f,g : X \rightrightarrows Y$ is the pullback of $(f,g) : X \to Y \times Y$ with the diagonal $Y \to Y \times Y$.',
		FALSE
	),
	(
		'directed_colimits_suffice',
		'["directed colimits"]',
		'["filtered colimits"]',
		'This is Theorem 1.5. in <a href="https://ncatlab.org/nlab/show/Locally+Presentable+and+Accessible+Categories" target="_blank">Adamek-Rosicky</a>.',
		TRUE
	),
	(
		'connected_limits_characterization',
		'["connected limits"]',
		'["wide pullbacks", "equalizers"]',
		'The direction $\Rightarrow$ is trivial. The direction $\Leftarrow$ can be found at the <a href="https://ncatlab.org/nlab/show/connected+limit" target="_blank">nLab</a>.',
		TRUE
	),
	(
		'complete_criterion',
		'["wide pullbacks", "terminal object"]',
		'["complete"]',
		'See the <a href="https://ncatlab.org/nlab/show/wide+pullback" target="_blank">nLab</a>.',
		FALSE
	),
	(
		'wide_pullbacks_criterion',
		'["wide pullbacks"]',
		'["pullbacks", "filtered limits"]',
		'To prove $\Leftarrow$, a wide pullback can be constructed as a filtered limit of finite pullbacks, and finite pullbacks can be reduced to binary pullbacks (the empty-indexed pullback always exists). Conversely, assume that wide pullbacks exist in $\mathcal{C}$. For every object $A$ then the slice category $\mathcal{C} / A$ has wide pullbacks and a terminal object, hence is complete. Since a filtered limit can be finally reduced to such a slice, we are done.',
		TRUE
	),
	(
		'sequential_limits_criterion',
		'["equalizers", "countable products"]',
		'["sequential limits"]',
		'See <a href="https://ncatlab.org/nlab/show/Categories+for+the+Working+Mathematician" target="_blank">Mac Lane</a>, V.2, Prop. 3. The proof can easily be adapted to this case. Namely, the limit of $\cdots \to X_2 \to X_1 \to X_0$ is the equalizer of two suitable endomorphisms of $\prod_{n \geq 0} X_n$.',
		FALSE
	),
	(
		'countable_products_criterion',
		'["finite products", "sequential limits"]',
		'["countable products"]',
		'If $X_1,X_2,\dotsc$ is an infinite sequence of objects, then their product is the limit of the sequence $\cdots \to X_2 \times X_1 \to X_1$.',
		FALSE
	),
	(
		'distributive_consequence',
		'["distributive"]',
		'["strict initial object"]',
		'See the <a href="https://ncatlab.org/nlab/show/distributive+category" target="_blank">nLab</a>.',
		FALSE
	),
	(
		'distributive_criterion',
		'["cartesian closed", "finite coproducts"]',
		'["distributive"]',
		'Each functor $A \times -$ is left adjoint and hence preserves finite coproducts (in fact, all colimits).',
		FALSE
	),
	(
		'infinitary_distributive_criterion',
		'["cartesian closed", "coproducts"]',
		'["infinitary distributive"]',
		'Each functor $A \times -$ is left adjoint and hence preserves coproducts (in fact, all colimits).',
		FALSE
	),
	(
		'infinite_distributive_filtered_criterion',
		'["distributive", "exact filtered colimits", "coproducts"]',
		'["infinitary distributive"]',
		'Each functor $A \times -$ preserves finite coproducts and filtered colimits, hence all coproducts.',
		FALSE
	),
	(
		'cocomplete_thin_criterion',
		'["essentially small", "thin", "complete"]',
		'["cocomplete"]',
		'The supremum of a subset in a (small) partial order is the infimum of the set of upper bounds.',
		FALSE
	),
	(
		'cartesian_closed_thin_criterion',
		'["essentially small", "thin", "complete", "infinitary distributive"]',
		'["cartesian closed"]',
		'This is an application of the adjoint functor theorem. Specifically, if $P$ is a complete lattice in which $\sup_i \inf(t,x_i) = \inf(t, \sup_i y_i)$ always holds, then the functor $\int(t,-)$ is a left adjoint because it preserves all suprema.',
		FALSE
	),
	(
		'finitary_algebraic_consequence',
		'["finitary algebraic"]',
		'["locally finitely presentable"]',
		'See <a href="https://ncatlab.org/nlab/show/Locally+Presentable+and+Accessible+Categories" target="_blank">Adamek-Rosicky</a>, Cor. 3.7.',
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
		'preadditive_products_criterion',
		'["preadditive", "finite coproducts"]',
		'["finite products"]',
		'See <a href="https://ncatlab.org/nlab/show/Categories+for+the+Working+Mathematician" target="_blank">Mac Lane</a>, VIII.2., Theorem 2.',
		FALSE
	),
	(
		'additive_trivial_condition',
		'["additive", "pullbacks", "subobject classifier"]',
		'["trivial"]',
		'See <a href="https://math.stackexchange.com/questions/4086192" target="_blank">MSE/4086192</a>.',
		FALSE
	),
	(
		'malcev_additive_criterion',
		'["finitely complete", "additive"]',
		'["Malcev"]',
		'See Prop. 2.2.13. in <a href="https://ncatlab.org/nlab/show/Malcev,+protomodular,+homological+and+semi-abelian+categories" target="_blank">Malcev, protomodular, homological and semi-abelian categories</a>.',
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
		'discrete_is_locally_cartesian_closed',
		'["discrete"]',
		'["locally cartesian closed"]',
		'Each slice of a discrete category is terminal.',
		FALSE
	),
	(
		'sequential_implies_lcc',
		'["thin", "strongly connected"]',
		'["locally cartesian closed"]',
		'Each slice is thin, strongly connected, and has a terminal object. Every such category is cartesian closed, where the exponential $a \Rightarrow b$ (Heyting implication) is $1$ when $a \leq b$ and otherwise $b$.',
		FALSE
	),

	-- non-trivial implications
	(
		'locally_presentable_consequence',
		'["locally presentable"]',
		'["locally essentially small", "well-powered", "well-copowered", "complete", "cocomplete", "generator"]',
		'For the non-trivial conclusions see <a href="https://ncatlab.org/nlab/show/Locally+Presentable+and+Accessible+Categories" target="_blank">Adamek-Rosicky</a>, Thm. 1.20, Cor. 1.28, Rem. 1.56, Thm. 1.58.',
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
		'locally_finitely_presentable_consequence',
		'["locally finitely presentable"]',
		'["exact filtered colimits"]',
		'Special case of <a href="https://ncatlab.org/nlab/show/Locally+Presentable+and+Accessible+Categories" target="_blank">Adamek-Rosicky</a>, Prop. 1.59 with $\lambda = \aleph_0$.',
		FALSE
	),
	(
		'locally_presentable_thin',
		'["locally presentable", "self-dual"]',
		'["thin"]',
		'This follows from <a href="https://ncatlab.org/nlab/show/Locally+Presentable+and+Accessible+Categories" target="_blank">Adamek-Rosicky</a>, Thm. 1.64.',
		FALSE
	),
	(
		'topos_consequence',
		'["elementary topos"]',
		'["finitely cocomplete", "disjoint finite coproducts", "epi-regular"]',
		'See <a href="https://ncatlab.org/nlab/show/Sheaves+in+Geometry+and+Logic" target="_blank">Mac Lane & Moerdijk</a>, Cor. IV.5.4, Cor. IV.10.5, Thm. 4.7.8.',
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
		'["elementary topos", "coproducts", "generator", "locally essentially small"]',
		'See <a href="https://ncatlab.org/nlab/show/Sheaves+in+Geometry+and+Logic" target="_blank">Mac Lane & Moerdijk</a>, Appendix, Prop. 4.4.',
		TRUE
	),
	(
		'grothendieck_topos_consequence',
		'["Grothendieck topos"]',
		'["locally presentable", "cogenerator"]',
		'For "locally presentable" see Prop. 3.4.16 in <a href="https://www.cambridge.org/core/books/handbook-of-categorical-algebra/5033A02442342401E7BCC26A042DAB94" target="_blank">Handbook of Categorical Algebra Vol. 3</a>. For "cogenerator" see the <a href="https://ncatlab.org/nlab/show/cogenerator" target="_blank">nLab</a>.',
		FALSE
	),
	(
		'grothendieck_abelian_presentable',
		'["Grothendieck abelian"]',
		'["locally presentable"]',
		'See <a href="https://arxiv.org/abs/1409.7051" target="_blank">Deriving Auslander''s formula</a>, Cor. 5.2, or <a href="https://arxiv.org/abs/math/0102087" target="_blank">Sheafifiable homotopy model categories</a>, Prop. 3.10.',
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
	),
	(
		'topos_is_locally_cartesian_closed',
		'["elementary topos"]',
		'["locally cartesian closed"]',
		'See <a href="https://ncatlab.org/nlab/show/Sketches+of+an+Elephant" target="_blank">Johnstone</a>, Cor. A2.3.4.',
		FALSE
	);

