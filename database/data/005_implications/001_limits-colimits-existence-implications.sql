INSERT INTO implication_input (
	id,
	assumptions,
	conclusions,
	reason,
	is_equivalence
)
VALUES
(
	'complete_consequence',
	'["complete"]',
	'["finitely complete", "connected limits"]',
	'This is trivial.',
	FALSE
),
(
	'sifted_categories_are_connected',
	'["connected colimits"]',
	'["sifted colimits"]',
	'This is because every sifted category is connected.',
	FALSE
),
(
	'sifted_colimits_consequence',
	'["sifted colimits"]',
	'["filtered colimits", "reflexive coequalizers"]',
	'This is because filtered categories are sifted and because the index category for a reflexive coequalizer is sifted.',
	FALSE
),
(
	'sifted_colimits_criterion',
	'["pullbacks", "reflexive coequalizers", "filtered colimits"]',
	'["sifted colimits"]',
	'See Cor. 5.2 in <a href="http://www.tac.mta.ca/tac/volumes/37/35/37-35abs.html" target="_blank">Chen''s paper</a>.',
	FALSE
),
(
	'coreflexive_equalizers_are_equalizers',
	'["equalizers"]',
	'["coreflexive equalizers"]',
	'This is trivial.',
	FALSE
),
(
	'equalizers_via_coreflexive_equalizers',
	'["coreflexive equalizers", "binary products"]',
	'["equalizers"]',
	'If $f,g : X \rightrightarrows Y$ are two morphisms, we have a coreflexive pair $(\mathrm{id}_X,f), (\mathrm{id}_X,g) : X \rightrightarrows X \times Y$. A morphism with codomain $X$ equalizes $f$ and $g$ if and only if it equalizes $(\mathrm{id}_X,f)$ and $(\mathrm{id}_X,g)$. Thus, their equalizers agree.',
	FALSE
),
(
	'congruence_quotients_precondition',
	'["quotients of congruences"]',
	'["finitely complete"]',
	'This is part of the definition.',
	FALSE
),
(
	'congruence_quotients_are_coequalizers',
	'["coequalizers", "finitely complete"]',
	'["quotients of congruences"]',
	'This is trivial.',
	FALSE
),
(
	'products_consequences',
	'["products"]',
	'["finite products", "countable products", "powers"]',
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
	'["finite products", "cofiltered limits"]',
	'["products"]',
	'The product $\prod_{i \in I} X_i$ is the cofiltered limit of the finite partial products $\prod_{i \in E} X_i$ where $E$ ranges over the finite subsets of $I$.',
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
	'countable_products_consequence',
	'["countable products"]',
	'["finite products", "countable powers"]',
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
	'complete_characterization',
	'["complete"]',
	'["products", "equalizers"]',
	'See <a href="https://ncatlab.org/nlab/show/Categories+for+the+Working+Mathematician" target="_blank">Mac Lane</a>, V.2, Thm. 2.',
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
	'equalizers_consequence',
	'["equalizers"]',
	'["Cauchy complete"]',
	'If $e : X \to X$ is an idempotent, then the equalizer of $e, \mathrm{id}_X : X \rightrightarrows X$ provides a splitting of $e$.',
	FALSE
),
(
	'kernels_condition',
	'["kernels"]',
	'["zero morphisms"]',
	'This is part of our definition of having kernels.',
	FALSE
),
(
	'kernels_criterion',
	'["zero morphisms", "equalizers"]',
	'["kernels"]',
	'This is trivial.',
	FALSE
),
(
	'equalizers_via_kernels',
	'["preadditive", "kernels"]',
	'["equalizers"]',
	'The equalizer of $f,g$ is the kernel of $f-g$.',
	FALSE
),
(
	'sequential_colimits_consequence',
	'["sequential colimits"]',
	'["Cauchy complete"]',
	'Assume that $e : X \to X$ is an idempotent morphism. Consider the sequence $X \xrightarrow{e} X \xrightarrow{e} X \to \cdots$. A cocone under this sequence is a family of morphisms $f_n : X \to Y$ satisfying $f_n = f_{n+1} e$. Then $f_n = f_{n+1} e = f_{n+2} e^2 = f_{n+2} e = f_{n+1}$ shows that all the morphisms are equal. Thus, a cocone is the same as a morphism $f_0 : X \to Y$ with $f_0 = f_0 e$, meaning it coequalizes $\mathrm{id}_X,e : X \rightrightarrows X$. Hence, if a colimit exists, $e$ splits.',
	FALSE
),
(
	'finite_filtered_colimits',
	'["essentially finite", "Cauchy complete"]',
	'["finitely accessible"]',
	'See <a href="https://mathoverflow.net/questions/509853" target="_blank">MO/509853</a>, where it is in fact shown that the ind-completion of any finite Cauchy-complete category becomes itself.',
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
	'["pullbacks", "cofiltered limits"]',
	'To prove $\Leftarrow$, a wide pullback can be constructed as a cofiltered limit of finite pullbacks, and finite pullbacks can be reduced to binary pullbacks (the empty-indexed pullback always exists). Conversely, assume that wide pullbacks exist in $\mathcal{C}$. For every object $A$ then the slice category $\mathcal{C} / A$ has wide pullbacks and a terminal object, hence is complete. Since a cofiltered limit can be finally reduced to such a slice, we are done.',
	TRUE
),
(
	'wide_pullbacks_finite',
	'["pullbacks", "essentially finite"]',
	'["wide pullbacks"]',
	'Each slice category has finite products and is essentially finite, hence has all products by <a href="/category-implication/freyd_finite">this result</a> followed by <a href="/category-implication/thin_finite_product_reduction">this result</a>.',
	FALSE
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
	'finite_products_include_finite_powers',
	'["finite products"]',
	'["finite powers"]',
	'This is trivial.',
	FALSE
),
(
	'binary_products_include_binary_powers',
	'["binary products"]',
	'["binary powers"]',
	'This is trivial.',
	FALSE
),
(
	'powers_include_countable_powers',
	'["powers"]',
	'["countable powers"]',
	'This is trivial.',
	FALSE
),
(
	'countable_powers_include_finite_powers',
	'["countable powers"]',
	'["finite powers"]',
	'This is trivial.',
	FALSE
),
(
	'finite_powers_consequences',
	'["finite powers"]',
	'["binary powers", "terminal object"]',
	'This is trivial.',
	FALSE
),
(
	'countable_powers_criterion',
	'["finite powers", "sequential limits"]',
	'["countable powers"]',
	'We can write $X^{\mathbb{N}}$ as the limit of the sequence $\cdots \to X^3 \to X^2 \to X \to 1$ with transition morphisms $f_n : X^{n+1} \to X^n$, $(x_1,\dotsc,x_{n+1}) \mapsto (x_1,\dotsc,x_n)$, i.e., $p_i f_n = p_i$ for $1 \leq i \leq n$.',
	FALSE
),
(
	'powers_criterion',
	'["finite powers", "cofiltered limits"]',
	'["powers"]',
	'The product $X^I$ is the cofiltered limit of the finite powers $X^E$, where $E$ ranges over the finite subsets of $I$.',
	FALSE
),
(
	'multi-complete_generalize_limits',
	'["complete"]',
	'["multi-complete"]',
	'Limits are precisely multi-limits such that the set of cones is singleton.',
	FALSE
),
(
	'multi-terminal_special_case',
	'["multi-complete"]',
	'["multi-terminal object"]',
	'This is trivial.',
	FALSE
),
(
	'multi-terminal_with_connected',
	'["connected","multi-terminal object"]',
	'["terminal object"]',
	'Let $(T_i)_{i\in I}$ be a multi-terminal object in a connected category $\mathcal{C}$. By definition of multi-terminal objects, for each object $C$, there are a unique index $i_C\in I$ and a unique morphism $C \to T_{i_C}$. Since the index $i_C$ is invariant under connected components, $I$ must be a singleton. The converse is trivial.',
	TRUE
),
(
	'multi-complete_with_finite_coproducts',
	'["multi-complete", "finite coproducts"]',
	'["complete"]',
	'Let $D\colon \mathcal{S} \to \mathcal{C}$ be a small diagram in a category $\mathcal{C}$. Since $\mathcal{C}$ has finite coproducts, the category $\mathbf{Cone}(D)$ of cones over $D$ has finite coproducts. In particular, $\mathbf{Cone}(D)$ is connected, hence a multi-terminal object in it automatically becomes a terminal object.',
	FALSE
);
