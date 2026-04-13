INSERT INTO properties (
	id,
	relation,
	description,
	nlab_link,
	dual_property_id,
	invariant_under_equivalences
)
VALUES
(
	'cartesian closed',
	'is',
	'A category is <i>cartesian closed</i> if all finite products and exponentials $[X,Y]$ exist, defined by the adjunction $\mathrm{Hom}(T,[X,Y]) \cong \mathrm{Hom}(T \times X,Y)$.',
	'https://ncatlab.org/nlab/show/cartesian+closed+category',
	'cocartesian coclosed',
	TRUE
),
(
	'cocartesian coclosed',
	'is',
	'A category is <i>cocartesian coclosed</i> if its dual category is cartesian closed, i.e. if all finite coproducts and coexponentials $\mathrm{Coexp}(X,Y)$ exist, defined by the adjunction $\mathrm{Hom}(\mathrm{Coexp}[X,Y],T) \cong \mathrm{Hom}(Y,T \sqcup X)$.',
	'https://ncatlab.org/nlab/show/cocartesian+coclosed+category',
	'cartesian closed',
	TRUE
),
(
	'locally cartesian closed',
	'is',
	'A category is <i>locally cartesian closed</i> if each of its slice categories is cartesian closed.',
	'https://ncatlab.org/nlab/show/locally+cartesian+closed+category',
	'locally cocartesian coclosed',
	TRUE
),
(
	'locally cocartesian coclosed',
	'is',
	'A category is <i>locally cocartesian coclosed</i> if its dual is locally cartesian closed, i.e. if each of its coslice categories is cocartesian coclosed.',
	'https://ncatlab.org/nlab/show/locally+cocartesian+coclosed+category',
	'locally cartesian closed',
	TRUE
),
(
	'subobject classifier',
	'has a',
	'A category $\mathcal{C}$ has a <i>subobject classifier</i> if it has finite limits and a monomorphism* $\top : 1 \to \Omega$ such that for every monomorphism $m : A \to B$ there is a unique morphism $\chi_m : B \to \Omega$ such that
	<p>$\begin{array}{ccc} A & \rightarrow & B \\ \downarrow && \downarrow \\ 1 & \rightarrow & \Omega \end{array}$</p>
	is a pullback diagram. Equivalently, the functor $\mathrm{Sub} : \mathcal{C}^{\mathrm{op}} \to \mathbf{Set}^+$ is representable.<br>
	*Every morphism $1 \to \Omega$ is a split monomorphism anyway.',
	'https://ncatlab.org/nlab/show/subobject+classifier',
	NULL,
	TRUE
),
(
	'regular subobject classifier',
	'has a',
	'A category $\mathcal{C}$ has a <i>regular subobject classifier</i> if it has finite limits and a regular monomorphism* $\top : 1 \to \Omega$ such that for every regular monomorphism $m : A \to B$ there is a unique morphism $\chi_m : B \to \Omega$ such that
	<p>$\begin{array}{ccc} A & \rightarrow & B \\ \downarrow && \downarrow \\ 1 & \rightarrow & \Omega \end{array}$</p>
	is a pullback diagram. Equivalently, the functor $\mathrm{Sub}_{\mathrm{reg}} : \mathcal{C}^{\mathrm{op}} \to \mathbf{Set}^+$ is representable.<br>
	*Every morphism $1 \to \Omega$ is a split monomorphism and hence regular anyway.',
	'https://ncatlab.org/nlab/show/subobject+classifier',
	NULL,
	TRUE
),
(
	'elementary topos',
	'is an',
	'An <i>elementary topos</i> is a cartesian closed category with finite limits and a subobject classifier.',
	'https://ncatlab.org/nlab/show/topos',
	NULL,
	TRUE
),
(
	'Grothendieck topos',
	'is a',
	'A <i>Grothendieck topos</i> is a category that is equivalent to the category of sheaves on a site.',
	'https://ncatlab.org/nlab/show/Grothendieck+topos',
	NULL,
	TRUE
);