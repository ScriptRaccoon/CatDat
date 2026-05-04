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
	'This follows immediately from the fact for $\Set$.'
),
(
	'Z',
	'cocomplete',
	TRUE,
	'This follows immediately from the fact for $\Set$.'
),
(
	'Z',
	'infinitary extensive',
	TRUE,
	'This follows immediately from the fact for $\Set$.'
),
(
	'Z',
	'exact filtered colimits',
	TRUE,
	'This follows immediately from the fact for $\Set$.'
),
(
	'Z',
	'mono-regular',
	TRUE,
	'This follows immediately from the fact for $\Set$.'
),
(
	'Z',
	'epi-regular',
	TRUE,
	'This follows immediately from the fact for $\Set$.'
),
(
	'Z',
	'regular',
	TRUE,
	'This follows immediately from the fact for $\Set$.'
),
(
	'Z',
	'coregular',
	TRUE,
	'This follows immediately from the fact for $\Set$.'
),
(
	'Z',
	'effective congruences',
	TRUE,
	'If we have a congruence $E \rightrightarrows X$ in $[\CRing, \Set]$, then evaluating at any commutative ring gives a congruence in $\Set$. Defining $Y$ pointwise to be the quotient of this congruence, we get a morphism of functors $h : X \to Y$, and by <a href="/lemma/effective-congruence-quotients">this result</a> applied pointwise, the kernel pair of $h$ is $E$.'
),
(
	'Z',
	'effective cocongruences',
	TRUE,
	'If we have a cocongruence $X\rightrightarrows E$ in $[\CRing, \Set]$, then evaluating at any commutative gives a cocongruence in $\Set$. Defining $Y$ pointwise to be the equalizer of the pair, we get a morphism of functors $h : Y \to X$, and by the dual of <a href="/lemma/effective-congruence-quotients">this result</a> applied pointwise, the cokernel pair of $h$ is $E$.'
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
	'Any counterexample for $\Set$ (i.e., any non-symmetric reflexive relation) yields one for this category by taking constant functors.'
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
	'This is because already the full subcategory of representable functors is not semi-strongly connected, see <a href="/category/CRing">the entry for $\CRing$</a>. Specifically, there is no morphism between $\Hom(\IF_2,-)$ and $\Hom(\IF_3,-)$.'
),
(
	'Z',
	'cartesian closed',
	FALSE,
	'There are functors $F,G : \CRing \to \Set$ such that $\Hom(F,G)$ is not essentially small, see <a href="https://mathoverflow.net/questions/390611" target="_blank">MO/390611</a> for example. Now if the exponential $[F,G] : \CRing \to \Set$ exists, we get $[F,G](\IZ) \cong \Hom(\Hom(\IZ,-),[F,G])$ by Yoneda, which simplifies to $\Hom(1,[F,G]) \cong \Hom(1 \times F,G) \cong \Hom(F,G)$, a contradiction.'
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
	'We already know that $\Set$ does not have this property. Now apply the contrapositive of the dual of <a href="/lemma/filtered-monos">this lemma</a> to the functor $\Set \to [\CRing, \Set]$ that maps a set to its constant functor.'
);
