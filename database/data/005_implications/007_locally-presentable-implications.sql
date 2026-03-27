INSERT INTO implication_input (
	id,
	assumptions,
	conclusions,
	reason,
	is_equivalence
)
VALUES
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
	'locally_presentable_consequence',
	'["locally presentable"]',
	'["locally essentially small", "well-powered", "well-copowered", "complete", "cocomplete", "generator"]',
	'For locally essential smallness, see the proof of Prop. 2.1.5 in <a href="https://bookstore.ams.org/conm-104" target="_blank">Makkai-Pare</a>. For the other non-trivial conclusions see <a href="https://ncatlab.org/nlab/show/Locally+Presentable+and+Accessible+Categories" target="_blank">Adamek-Rosicky</a>, Thm. 1.20, Cor. 1.28, Rem. 1.56, Thm. 1.58.',
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
);