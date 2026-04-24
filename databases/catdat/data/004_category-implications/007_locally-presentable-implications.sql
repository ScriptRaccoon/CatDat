INSERT INTO category_implications_view (
	id,
	assumptions,
	conclusions,
	reason,
	is_equivalence
)
VALUES
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
	'accessible_trivial_consequence',
	'["accessible"]',
	'["generating set"]',
	'For a $\kappa$-accessible category, the set $G$ appearing in the definition gives a small dense full subcategory, which is in particular a generating set.',
	FALSE
),
(
	'accessible_well-powered',
	'["accessible"]',
	'["well-powered"]',
	'See <a href="https://ncatlab.org/nlab/show/accessible+category#wellpoweredness_and_wellcopoweredness" target="_blank">nLab</a>.',
	FALSE
),
(
	'accessible_locally_small',
	'["accessible"]',
	'["locally essentially small"]',
	'See the proof of Prop. 2.1.5 in <a href="https://bookstore.ams.org/conm-104" target="_blank">Makkai-Pare</a>.',
	FALSE
),
(
	'accessible_well-copowered',
	'["accessible", "pushouts"]',
	'["well-copowered"]',
	'See Thm. 2.49 in <a href="https://ncatlab.org/nlab/show/Locally+Presentable+and+Accessible+Categories" target="_blank">Adamek-Rosicky</a> or Prop. 6.1.3 in <a href="https://bookstore.ams.org/conm-104" target="_blank">Makkai-Pare</a>.',
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
	'locally_presentable_essentially_small',
	'["locally presentable", "locally copresentable"]',
	'["essentially small"]',
	'This follows from <a href="https://ncatlab.org/nlab/show/Locally+Presentable+and+Accessible+Categories" target="_blank">Adamek-Rosicky</a>, Thm. 1.64.',
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
	'locally_strongly_finitely_presentable_raise',
	'["locally strongly finitely presentable"]',
	'["locally finitely presentable"]',
	'See <a href="https://ncatlab.org/nlab/show/Locally+Presentable+and+Accessible+Categories" target="_blank">Adamek-Rosicky</a>, Cor. 3.7.',
	FALSE
),
(
	'locally_presentable_definition_finite',
	'["locally finitely presentable"]',
	'["finitely accessible", "cocomplete"]',
	'This follows from one of equivalent formulations of locally finitely presentable categories.',
	TRUE
),
(
	'locally_presentable_definition_countable',
	'["locally ℵ₁-presentable"]',
	'["ℵ₁-accessible", "cocomplete"]',
	'This follows from one of equivalent formulations of locally ℵ₁-presentable categories.',
	TRUE
),
(
	'locally_presentable_definition',
	'["locally presentable"]',
	'["accessible", "cocomplete"]',
	'This follows from one of equivalent formulations of locally presentable categories.',
	TRUE
),
(
	'finitely_accessible_raise',
	'["finitely accessible"]',
	'["ℵ₁-accessible"]',
	'This is because any regular cardinal is strictly smaller than its successor cardinal. See <a href="https://ncatlab.org/nlab/show/sharply+smaller+cardinal" target="_blank">nLab</a>.',
	FALSE
),
(
	'countably_accessible_special_case',
	'["ℵ₁-accessible"]',
	'["accessible"]',
	'This is trivial.',
	FALSE
),
(
	'accessible_require_filtered_colimit',
	'["finitely accessible"]',
	'["filtered colimits"]',
	'This holds by definition.',
	FALSE
),
(
	'accessible_require_Cauchy_complete',
	'["accessible"]',
	'["Cauchy complete"]',
	'This is because the walking idempotent is $\kappa$-filtered for any regular cardinal $\kappa$.',
	FALSE
),
(
	'small_accessible_characterization',
	'["essentially small", "Cauchy complete"]',
	'["accessible"]',
	'See <a href="https://bookstore.ams.org/conm-104" target="_blank">Makkai-Pare</a>, Thm. 2.2.2.',
	FALSE
),
(
	'countably_accessible_thin',
	'["essentially countable", "thin"]',
	'["ℵ₁-accessible"]',
	'In general, every $\kappa$-filtered diagram in a poset whose elements are less than $\kappa$ admits the greatest element. Therefore, all the elements are $\kappa$-presentable, and the poset is $\kappa$-accessible.',
	FALSE
),
(
	'locally_presentable_another_definition',
	'["accessible", "complete"]',
	'["locally presentable"]',
	'This follows from one of equivalent formulations of locally presentable categories.',
	FALSE
),
(
	'locally_strongly_finitely_presentable_definition',
	'["locally strongly finitely presentable"]',
	'["generalized variety", "cocomplete"]',
	'This is trivial.',
	TRUE
),
(
	'generalized_variety_require_sifted_colimit',
	'["generalized variety"]',
	'["sifted colimits"]',
	'This holds by definition.',
	FALSE
),
(
	'generalized_variety_implies_accessible',
	'["generalized variety"]',
	'["ℵ₁-accessible"]',
	'See <a href="http://www.tac.mta.ca/tac/volumes/8/n3/8-03abs.html" target="_blank">[AR01, Remark 4.8(2)]</a>.',
	FALSE
),
(
	'locally_multi-presentable_definition',
	'["locally multi-presentable"]',
	'["accessible", "connected limits"]',
	'This follows from one of equivalent formulations of locally multi-presentable categories.',
	TRUE
),
(
	'locally_multi-presentable_another_definition',
	'["locally multi-presentable"]',
	'["accessible", "multi-cocomplete"]',
	'This follows from one of equivalent formulations of locally multi-presentable categories.',
	TRUE
),
(
	'locally_finitely_multi-presentable_definition',
	'["locally finitely multi-presentable"]',
	'["finitely accessible", "connected limits"]',
	'This follows from one of equivalent formulations of locally finitely multi-presentable categories.',
	TRUE
),
(
	'locally_finitely_multi-presentable_another_definition',
	'["locally finitely multi-presentable"]',
	'["finitely accessible", "multi-cocomplete"]',
	'This follows from one of equivalent formulations of locally finitely multi-presentable categories.',
	TRUE
),
(
	'locally_poly-presentable_definition',
	'["locally poly-presentable"]',
	'["accessible", "wide pullbacks"]',
	'This holds by definition.',
	TRUE
),
(
	'multi-algebraic_implies_locally_finitely_multi-presentable',
	'["multi-algebraic"]',
	'["locally finitely multi-presentable"]',
	'This is because that every (finite product, coproduct)-sketch is clearly a (finite limit, coproduct)-sketch.',
	FALSE
),
(
	'varieties_are_multi-algebraic',
	'["locally strongly finitely presentable"]',
	'["multi-algebraic"]',
	'This is because that every finite-product-sketch is clearly a (finite product, coproduct)-sketch.',
	FALSE
),
(
	'multi-algebraic_another_definition',
	'["multi-algebraic"]',
	'["generalized variety", "multi-cocomplete"]',
	'This follows from one of equivalent formulations of multi-algebraic categories.',
	TRUE
),
(
	'locally-finitely-multi-presentable_stable-monos',
	'["locally finitely multi-presentable"]',
	'["filtered-colimit-stable monomorphisms"]',
	'Every locally finitely multi-presentable category is a multi-reflective full subcategory of a presheaf category closed under filtered colimits (<a href="https://ncatlab.org/nlab/show/Locally+Presentable+and+Accessible+Categories" target="_blank">Adamek-Rosicky</a>, 4.30). Since multi-reflective full subcategories are in general closed under connected limits (<a href="https://ncatlab.org/nlab/show/Locally+Presentable+and+Accessible+Categories" target="_blank">Adamek-Rosicky</a>, Thm. 4.26), in particular, we can calculate not only filtered colimits but also kernel pairs as well as in a presheaf category.',
	FALSE
);