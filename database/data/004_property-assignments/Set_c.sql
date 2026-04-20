INSERT INTO category_property_assignments (
	category_id,
	property_id,
	is_satisfied,
	reason
)
VALUES
(
	'Set_c',
	'locally small',
	TRUE,
	'The collection of maps between two (countable) sets $X,Y$ is a subset of $X \times Y$ and therefore a set.'
),
(
	'Set_c',
	'essentially small',
	TRUE,
	'Every countable set is isomorphic to a subset of $\mathbb{N}$.'
),
(
	'Set_c',
	'generator',
	TRUE,
	'The one-point set is clearly a generator.'
),
(
	'Set_c',
	'cogenerator',
	TRUE,
	'The two-point set is a cogenerator in $\mathbf{Set}$, hence also in $\mathbf{Set}_\mathrm{c}$.'
),
(
	'Set_c',
	'equalizers',
	TRUE,
	'We can use the same construction as in $\mathbf{Set}$ since subsets of countable sets are again countable.'
),
(
	'Set_c',
	'semi-strongly connected',
	TRUE,
	'This is because the larger category $\mathbf{Set}$ has this property.'
),
(
	'Set_c',
	'extensive',
	TRUE,
	'The same proof as for $\mathbf{Set}$ applies. Actually, the category is "countably extensive".'
),
(
	'Set_c',
	'countably distributive',
	TRUE,
	'By elementary set theory, a countable (disjoint) union of countable sets is again countable, and a finite direct product of countable sets is countable. Hence, countable coproducts and finite products exists in $\mathbf{Set}_\mathrm{c}$. The distributivity morphism is an isomorphism since this is the case in $\mathbf{Set}$ and the forgetful functor $\mathbf{Set}_\mathrm{c} \to \mathbf{Set}$ preserves finite products and countable coproducts.'
),
(
	'Set_c',
	'mono-regular',
	TRUE,
	'If $f : X \to Y$ is a monomorphism, i.e. an injective map, it is an equalizer of the maps $\chi_Y, \chi_{f(X)} : Y \to \{0,1\}$ in $\mathbf{Set}$ and hence also in $\mathbf{Set}_\mathrm{c}$.'
),
(
	'Set_c',
	'epi-regular',
	TRUE,
	'If $X \to Y$ is an epimorphism in $\mathbf{Set}_\mathrm{c}$, i.e. a surjective map, it is coequalizer of the two maps $X \times_Y X \rightrightarrows X$ in $\mathbf{Set}$ and hence also in $\mathbf{Set}_\mathrm{c}$.'
),
(
	'Set_c',
	'co-Malcev',
	TRUE,
	'For finite colimits we can use the same construction as in $\mathbf{Set}$ since quotients and finite unions of countable sets are again countable. The co-Malcev property now can be easily deduced from the corresponding fact for $\mathbf{Set}$.'
),
(
	'Set_c',
	'subobject classifier',
	TRUE,
	'This is because $\{0,1\}$ is a subobject classifier in $\mathbf{Set}$, which is countable, and the monomorphisms coincide.'
),
(
	'Set_c',
	'small',
	FALSE,
	'Even the collection of all singletons is not a set.'
),
(
	'Set_c',
	'skeletal',
	FALSE,
	'This is trivial.'
),
(
	'Set_c',
	'Malcev',
	FALSE,
	'There are lots of non-symmetric reflexive relations, for example $\leq$ on $\mathbb{N}$.'
),
(
	'Set_c',
	'regular',
	TRUE,
	'From the other properties we know that the category is finitely complete and that it has coequalizers. The regular epimorphisms are stable under pullback since this holds in $\mathbf{Set}$ and both regular epimorphisms (they are surjective maps) and pullbacks coincide.'
),
(
	'Set_c',
	'coregular',
	TRUE,
	'From the other properties we know that the category is finitely cocomplete and that it has equalizers. The regular monomorphisms are stable under pushout since this holds in $\mathbf{Set}$ and both regular monomorphisms (they are injective maps) and pushouts coincide.'
),
(
	'Set_c',
	'countable powers',
	FALSE,
	'Since the forgetful functor $\mathbf{Set}_\mathrm{c} \to \mathbf{Set}$ is representable, it preserves (countable) products. Therefore, if the power $\{0,1\}^{\mathbb{N}}$ exists in $\mathbf{Set}_\mathrm{c}$, it must be the ordinary cartesian product, which however is uncountable.'
),
(
	'Set_c',
	'ℵ₁-accessible',
	FALSE,
	'In fact, $\mathbf{Set}_\mathrm{c}$ does not have $\aleph_1$-filtered colimits: Fix an uncountable set $X$, let $P_\mathrm{c}(X)$ be the poset of countable subsets of $X$, which is $\aleph_1$-filtered, and consider the functor $P_\mathrm{c}(X) \to \mathbf{Set}_\mathrm{c}$ taking a subset $Y \subseteq X$ to $Y$. The colimit of this diagram in $\mathbf{Set}$ is given by $X$ itself, so if $X_c$ were a colimit in $\mathbf{Set}_\mathrm{c}$, then $\mathrm{Hom}(X_c, \{0,1\}) \cong \mathrm{Hom}(X, \{0,1\})$. But the former has cardinality at most $2^{\aleph_0}$ and the latter has cardinality $2^{\mathrm{card}(X)}$, so we have obtained a contradiction if we pick $X$ large enough (e.g. $\mathrm{card}(X)=2^{\aleph_0}$).'
);

