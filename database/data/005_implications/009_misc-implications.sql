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
	'semi-strongly_connected_consequence',
	'["semi-strongly connected"]',
	'["connected"]',
	'This holds by definition.',
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