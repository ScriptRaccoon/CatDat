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
	'reflexive_coequalizers_are_coequalizers',
	'["coequalizers"]',
	'["reflexive coequalizers"]',
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
	'terminal_consequence',
	'["terminal object"]',
	'["connected"]',
	'If $1$ denotes the terminal object, then for any two objects $A,B$ we have the zig-zag $A \to 1 \leftarrow B$.',
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
	'complete_characterization',
	'["complete"]',
	'["products", "coreflexive equalizers"]',
	'See <a href="https://ncatlab.org/nlab/show/Categories+for+the+Working+Mathematician" target="_blank">Mac Lane</a>, V.2, Thm. 2. Note that the equalizer appearing the theorem is in fact coreflexive.',
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
	'filtered_colimits_consequence',
	'["filtered colimits"]',
	'["Cauchy complete"]',
	'This follows from the fact that the walking idempotent is filtered (cf. <a href="https://ncatlab.org/nlab/show/filtered+category#examples" target="_blank">nLab</a>).',
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
	'Each slice category has finite products and is essentially finite, <a href="/category-implication/freyd_finite">hence</a> has all products.',
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
);