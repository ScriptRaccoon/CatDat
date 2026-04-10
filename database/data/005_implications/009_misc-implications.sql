INSERT INTO implication_input (
	id,
	assumptions,
	conclusions,
	reason,
	is_equivalence
)
VALUES
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
	'["semi-strongly connected"]',
	'This is immediate from the definition.',
	FALSE
),
(
	'semi-strongly_connected_consequence',
	'["semi-strongly connected"]',
	'["connected"]',
	'This is immediate from the definition.',
	FALSE
),
(
	'thin_not_strongly_connected',
	'["strongly connected", "thin"]',
	'["trivial"]',
	'This is obvious.',
	FALSE
),
(
	'strongly_connected_pointed_criterion',
	'["strongly connected", "terminal object", "initial object"]',
	'["pointed"]',
	'By assumption there is a morphism $1 \to 0$. There is also a unique morphism $0 \to 1$. They are necessarily inverse to each other.',
	FALSE
),
(
	'strongly_connected_disjoint_products',
	'["strongly connected", "finite products"]',
	'["disjoint finite products"]',
	'See <a href="https://math.stackexchange.com/a/5132300/1650" target="_blank">MSE/5130190</a> for a proof.',
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
	'malcev_additive_criterion',
	'["finitely complete", "additive"]',
	'["Malcev"]',
	'See Prop. 2.2.13. in <a href="https://ncatlab.org/nlab/show/Malcev,+protomodular,+homological+and+semi-abelian+categories" target="_blank">Malcev, protomodular, homological and semi-abelian categories</a>.',
	FALSE
),
(
	'unital_assumptions',
	'["unital"]',
	'["pointed", "finitely complete"]',
	'This holds by definition.',
	FALSE
),
(
	'malcev_implies_unital',
	'["Malcev", "pointed"]',
	'["unital"]',
	'This follows from Corollary 2.2.10 in <a href="https://ncatlab.org/nlab/show/Malcev,+protomodular,+homological+and+semi-abelian+categories" target="_blank">Malcev, protomodular, homological and semi-abelian categories</a>. The proof is also written down in <a href="https://math.stackexchange.com/a/5034834/1650" target="_blank">MSE/5033161</a>.',
	FALSE
),
(
	'filtered_is_connected',
	'["filtered"]',
	'["connected"]',
	'This is obvious.',
	FALSE
),
(
	'terminal_object_yields_filtered',
	'["terminal object"]',
	'["filtered"]',
	'This is obvious.',
	FALSE
),
(
	'filtered_criterion',
	'["finitely cocomplete"]',
	'["filtered"]',
	'Every finite diagram even admits a <i>universal</i> cocone.',
	FALSE
),
(
	'filtered_left_cancellative_implies_thin',
	'["filtered", "left cancellative"]',
	'["thin"]',
	'If $f,g : x \rightrightarrows y$ are coequalized by $h : y \to c$, then we immediately get $f = g$ since $h$ is a monomorphism.',
	FALSE
),
(
	'filtered_via_equalizers',
	'["semi-strongly connected", "coequalizers"]',
	'["filtered"]',
	'This is obvious.',
	FALSE
);