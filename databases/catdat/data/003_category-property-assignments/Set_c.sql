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
	'Every countable set is isomorphic to a subset of $\IN$.'
),
(
	'Set_c',
	'finitely complete',
	TRUE,
	'The embedding $\Set_\c \hookrightarrow \Set$ is closed under finite products and equalizers, hence under finite limits.'
),
(
	'Set_c',
	'finitely cocomplete',
	TRUE,
	'The embedding $\Set_\c \hookrightarrow \Set$ is closed under finite coproducts and coequalizers, hence under finite colimits.'
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
	'The two-point set is a cogenerator in $\Set$, hence also in $\Set_\c$.'
),
(
	'Set_c',
	'semi-strongly connected',
	TRUE,
	'This is because the larger category $\Set$ has this property.'
),
(
	'Set_c',
	'extensive',
	TRUE,
	'The same proof as for $\Set$ applies. Actually, the category is "countably extensive".'
),
(
	'Set_c',
	'countably distributive',
	TRUE,
	'By elementary set theory, a countable (disjoint) union of countable sets is again countable. Hence, countable coproducts exist in $\Set_\c$, and we already saw that finite products exist. The distributivity morphism is an isomorphism since this is the case in $\Set$ and the forgetful functor $\Set_\c \to \Set$ preserves finite products and countable coproducts.'
),
(
	'Set_c',
	'epi-regular',
	TRUE,
	'If $X \to Y$ is an epimorphism in $\Set_\c$, i.e. a surjective map, it is coequalizer of the two maps $X \times_Y X \rightrightarrows X$ in $\Set$ and hence also in $\Set_\c$.'
),
(
	'Set_c',
	'subobject classifier',
	TRUE,
	'This is because $\{0,1\}$ is a subobject classifier in $\Set$, which is countable, and the monomorphisms coincide.'
),
(
	'Set_c',
	'effective congruences',
	TRUE,
	'Let $f, g : E \rightrightarrows X$ be a congruence in $\Set_\c$. Then using $1$ as a test object, we see that this induces an equivalence relation on $X$. We already know that $\Set$ has effective congruences (as does every topos). Using <a href="/lemma/effective-congruence-quotients">this result</a>, we see that $E$ is the kernel pair of $X \to (X/E)_{\Set}$ in $\Set$. Also, the quotient $(X/E)_{\Set}$ is countable; and the forgetful functor $\Set_\c \to \Set$ is fully faithful <a href="https://ncatlab.org/nlab/show/reflected+limit#FullSubcategoryInclusionReflectCoLimits" target="_blank">and therefore reflects limits</a>. Thus, we conclude that $E$ is the kernel pair of $X \to (X/E)_{\Set}$ in $\Set_\c$ as well.'
),
(
	'Set_c',
	'regular',
	TRUE,
	'From the other properties we know that the category is finitely complete and that it has coequalizers. The regular epimorphisms are stable under pullback since this holds in $\Set$ and both regular epimorphisms (they are surjective maps) and pullbacks coincide.'
),
(
	'Set_c',
	'coregular',
	TRUE,
	'From the other properties we know that the category is finitely cocomplete and that it has equalizers. The regular monomorphisms are stable under pushout since this holds in $\Set$ and both regular monomorphisms (they are injective maps) and pushouts coincide.'
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
	'countable powers',
	FALSE,
	'Since the forgetful functor $\Set_\c \to \Set$ is representable, it preserves (countable) products. Therefore, if the power $\{0,1\}^{\IN}$ exists in $\Set_\c$, it must be the ordinary cartesian product, which however is uncountable.'
),
(
	'Set_c',
	'ℵ₁-accessible',
	FALSE,
	'In fact, $\Set_\c$ does not have $\aleph_1$-filtered colimits: Fix an uncountable set $X$, let $P_\c(X)$ be the poset of countable subsets of $X$, which is $\aleph_1$-filtered, and consider the functor $P_\c(X) \to \Set_\c$ taking a subset $Y \subseteq X$ to $Y$. The colimit of this diagram in $\Set$ is given by $X$ itself, so if $X_c$ were a colimit in $\Set_\c$, then $\Hom(X_c, \{0,1\}) \cong \Hom(X, \{0,1\})$. But the former has cardinality at most $2^{\aleph_0}$ and the latter has cardinality $2^{\card(X)}$, so we have obtained a contradiction if we pick $X$ large enough (e.g. $\card(X)=2^{\aleph_0}$).'
);

-- properties that should be ignored by the redundancy check script
UPDATE category_property_assignments
SET check_redundancy = FALSE
WHERE category_id = 'Set_c'
AND property_id IN ('finitely complete', 'finitely cocomplete');