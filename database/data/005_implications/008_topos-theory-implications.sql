INSERT INTO implication_input (
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
	'["elementary topos", "coproducts", "generating set", "locally essentially small"]',
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
	'Grothendieck_extensive',
	'["Grothendieck topos"]',
	'["infinitary extensive"]',
	'This is a part of <a href="https://ncatlab.org/nlab/show/Giraud%27s+theorem" target="_blank">Giraud''s Theorem</a>.',
	FALSE
),
(
	'topos_is_malcev',
	'["elementary topos"]',
	'["co-Malcev"]',
	'This is Example 2.2.18 in <a href="https://ncatlab.org/nlab/show/Malcev,+protomodular,+homological+and+semi-abelian+categories" target="_blank">Malcev, protomodular, homological and semi-abelian categories</a>. An alternative proof is given later in A.5.17.',
	FALSE
);