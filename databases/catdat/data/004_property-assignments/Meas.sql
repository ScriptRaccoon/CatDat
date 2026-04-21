INSERT INTO category_property_assignments (
	category_id,
	property_id,
	is_satisfied,
	reason
)
VALUES
(
	'Meas',
	'locally small',
	TRUE,
	'There is a forgetful functor $\mathbf{Meas} \to \mathbf{Set}$ and $\mathbf{Set}$ is locally small.'
),
(
	'Meas',
	'well-powered',
	TRUE,
	'This follows from the fact that monomorphisms are injective in this category.'
),
(
	'Meas',
	'well-copowered',
	TRUE,
	'This follows from the fact that epimorphisms are surjective in this category.'
),
(
	'Meas',
	'complete',
	TRUE,
	'Take the limit of the underlying sets and take the smallest $\sigma$-algebra making all projections measurable.'
),
(
	'Meas',
	'cocomplete',
	TRUE,
	'Take the colimit of the underlying sets and take the largest $\sigma$-algebra making all inclusions measurable. That is, a set is measurable iff its preimage under each inclusion is measurable.'
),
(
	'Meas',
	'infinitary extensive',
	TRUE,
	'[Sketch] Since $\mathbf{Set}$ is infinitary extensive, a map $f : Y \to \coprod_i X_i =: X$ corresponds to a decomposition $Y = \coprod_i Y_i$ (as sets) with maps $f_i : Y_i \to X_i$. Endow the measurable subset $Y_i \subseteq Y$ with the restricted $\sigma$-algebra. If $f$ is measurable, each $f_i$ is measurable, and $Y = \coprod_i Y_i$ holds as measurable spaces.'
),
(
	'Meas',
	'generator',
	TRUE,
	'The one-point measurable space (with the unique $\sigma$-algebra) is a generator since it represents the forgetful functor $\mathbf{Meas} \to \mathbf{Set}$.'
),
(
	'Meas',
	'cogenerator',
	TRUE,
	'Take the two-element set $2$ endowed with the trivial $\sigma$-algebra (where only $\varnothing$ and $2$ are measurable), and use that $2$ is a cogenerator for $\mathbf{Set}$.'
),
(
	'Meas',
	'filtered-colimit-stable monomorphisms',
	TRUE,
	'This follows from <a href="/lemma/filtered-monos">this lemma</a> applied to the forgetful functor to $\mathbf{Set}$.'
),
(
	'Meas',
	'semi-strongly connected',
	TRUE,
	'Every non-empty measurable space is weakly terminal (by using constant maps).'
),
(
	'Meas',
	'regular subobject classifier',
	TRUE,
	'The set $\{0,1\}$ with the trivial $\sigma$-algebra is a regular subobject classifier since measurable maps $X \to \{0,1\}$ correspond to subsets of $X$.'
),
(
	'Meas',
	'cartesian filtered colimits',
	FALSE,
	'See <a href="https://math.stackexchange.com/questions/5027218" target="_blank">MSE/5027218</a>.'
),
(
	'Meas',
	'balanced',
	FALSE,
	'Take a set $X$ with two different $\sigma$-algebras $\mathcal{A} \subset \mathcal{B}$ (for example, $\mathcal{A} = \{\varnothing,X\}$ and $\mathcal{B} = P(X)$ when $X$ has at least $2$ elements), then the identity map $(X,\mathcal{B}) \to (X,\mathcal{A})$ provides a counterexample.'
),
(
	'Meas',
	'skeletal',
	FALSE,
	'This is trivial.'
),
(
	'Meas',
	'Malcev',
	FALSE,
	'Use that $\mathbf{Set}$ is not Malcev and endow sets with the trivial $\sigma$-algebra.'
),
(
	'Meas',
	'cofiltered-limit-stable epimorphisms',
	FALSE,
	'We already know that $\mathbf{Set}$ does not have this property. Now apply the contrapositive of the dual of <a href="/lemma/filtered-monos">this lemma</a> to the functor $\mathbf{Set} \to \mathbf{Meas}$ which equips a set with the trivial $\sigma$-algebra.'
);
