INSERT INTO category_implications_view (
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
	'filtered_is_sifted',
	'["filtered"]',
	'["sifted"]',
	'Every filtered category $\mathcal C$ is inhabited and has final diagonal functors $\Delta:\mathcal C\to\mathcal C^J$ for all finite index categories $J$; in particular, it is inhabited and its diagonal $\Delta:\mathcal C\to\mathcal C\times\mathcal C$ is final.',
	FALSE
),
(
	'sifted_is_connected',
	'["sifted"]',
	'["connected"]',
	'Sifted categories are inhabited, and any two objects in a sifted category are joined by a cospan.',
	FALSE
),
(
	'coproducts_implies_sifted',
	'["inhabited", "binary coproducts"]',
	'["sifted"]',
	'The category is inhabited by assumption, and the coproduct of two objects is initial in the corresponding category of cospans.',
	FALSE
),
(
	'sifted_left_cancellative_implies_thin',
	'["sifted", "left cancellative"]',
	'["thin"]',
	'For any object $X$ in a left-cancellative category, the connected component containing
	$$X \xrightarrow{\mathrm{id}} X \xleftarrow{\mathrm{id}} X$$
	in the category of cospans from $X$ to $X$ consists only of cospans
	$$X \xrightarrow{f} Y \xleftarrow{g} X$$
	where $f=g$; hence when the category is also sifted, all cospans must be of this form, and so any two parallel morphisms are equal.',
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
	'filtered_via_equalizers',
	'["semi-strongly connected", "coequalizers"]',
	'["filtered"]',
	'This is obvious.',
	FALSE
);