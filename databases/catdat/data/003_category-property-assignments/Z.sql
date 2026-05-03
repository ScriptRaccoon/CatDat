INSERT INTO category_property_assignments (
	category_id,
	property_id,
	is_satisfied,
	reason
)
VALUES
(
	'Z',
	'complete',
	TRUE,
	'This follows immediately from the fact for $\mathbf{Set}$.'
),
(
	'Z',
	'cocomplete',
	TRUE,
	'This follows immediately from the fact for $\mathbf{Set}$.'
),
(
	'Z',
	'infinitary extensive',
	TRUE,
	'This follows immediately from the fact for $\mathbf{Set}$.'
),
(
	'Z',
	'exact filtered colimits',
	TRUE,
	'This follows immediately from the fact for $\mathbf{Set}$.'
),
(
	'Z',
	'mono-regular',
	TRUE,
	'This follows immediately from the fact for $\mathbf{Set}$.'
),
(
	'Z',
	'epi-regular',
	TRUE,
	'This follows immediately from the fact for $\mathbf{Set}$.'
),
(
	'Z',
	'regular',
	TRUE,
	'This follows immediately from the fact for $\mathbf{Set}$.'
),
(
	'Z',
	'coregular',
	TRUE,
	'This follows immediately from the fact for $\mathbf{Set}$.'
),
(
	'Z',
	'locally essentially small',
	FALSE,
	'See <a href="https://mathoverflow.net/questions/390611" target="_blank">MO/390611</a> for example.'
),
(
	'Z',
	'skeletal',
	FALSE,
	'This is trivial.'
),
(
	'Z',
	'Malcev',
	FALSE,
	'Any counterexample for $\mathbf{Set}$ (i.e., any non-symmetric reflexive relation) yields one for this category by taking constant functors.'
),
(
	'Z',
	'co-Malcev',
	TRUE,
	'This is true because <a href="/category/Set">the category of sets</a> is co-Malcev.'
),
(
	'Z',
	'semi-strongly connected',
	FALSE,
	'This is because already the full subcategory of representable functors is not semi-strongly connected, see <a href="/category/CRing">the entry for $\mathbf{CRing}$</a>. Specifically, there is no morphism between $\Hom(\IF_2,-)$ and $\Hom(\IF_3,-)$.'
),
(
	'Z',
	'cartesian closed',
	FALSE,
	'There are functors $F,G : \mathbf{CRing} \to \mathbf{Set}$ such that $\Hom(F,G)$ is not essentially small, see <a href="https://mathoverflow.net/questions/390611" target="_blank">MO/390611</a> for example. Now if the exponential $[F,G] : \mathbf{CRing} \to \mathbf{Set}$ exists, we get $[F,G](\IZ) \cong \Hom(\Hom(\IZ,-),[F,G])$ by Yoneda, which simplifies to $\Hom(1,[F,G]) \cong \Hom(1 \times F,G) \cong \Hom(F,G)$, a contradiction.'
),
(
	'Z',
	'well-powered',
	FALSE,
	'Consider the functor $F$ from <a href="https://mathoverflow.net/questions/390611" target="_blank">MO/390611</a> for example. The collection of subobjects of $F$ is not isomorphic to a set: for each infinite cardinal $\kappa$, simply cut off the construction of $F$ at $\kappa$. This yields a different subobject for each $\kappa$.'
),
(
	'Z',
	'cofiltered-limit-stable epimorphisms',
	FALSE,
	'We already know that $\mathbf{Set}$ does not have this property. Now apply the contrapositive of the dual of <a href="/lemma/filtered-monos">this lemma</a> to the functor $\mathbf{Set} \to [\mathbf{CRing}, \mathbf{Set}]$ that maps a set to its constant functor.'
);