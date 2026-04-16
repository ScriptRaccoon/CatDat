CREATE TEMP TABLE isomorphisms (
    category_id TEXT NOT NULL,
    description TEXT NOT NULL,
	reason TEXT NOT NULL
);

INSERT INTO isomorphisms (
	category_id,
	description,
	reason
)
VALUES
(
	'0',
	'none',
	'This is trivial.'
),
(
	'1',
	'every morphism',
	'This is trivial.'
),
(
	'2',
	'every morphism',
	'This is trivial.'
),
(
	'Ab',
	'bijective homomorphisms',
	'This characterization holds in every algebraic category.'
),
(
	'Ab_fg',
	'bijective homomorphisms',
	'This follows exactly as for abelian groups.'
),
(
	'Alg(R)',
	'bijective ring homomorphisms',
	'This characterization holds in every algebraic category.'
),
(
	'B',
	'every morphism',
	'It is a groupoid by construction.'
),
(
	'Ban',
	'bijective linear isometries',
	'This is easy.'
),
(
	'BG_c',
	'every morphism',
	'It is a groupoid.'
),
(
	'BG_f',
	'every morphism',
	'It is a groupoid.'
),
(
	'BN',
	'only the number $0$',
	'The $0$ is the only natural number which has an additive inverse, since for $n > 0$ we have $n + m > 0$ for all $m$.'
),
(
	'BOn',
	'only the ordinal $0$',
	'The $0$ is the only ordinal which has an additive inverse, since for $\alpha > 0$ we have $\alpha + \beta > 0$ for all $\beta$.'
),
(
	'Cat',
	'functors that are bijective on objects and morphisms',
	'This is easy.'
),
(
	'CAlg(R)',
	'bijective homomorphisms',
	'This characterization holds in every algebraic category.'
),
(
	'CMon',
	'bijective homomorphisms',
	'This characterization holds in every algebraic category.'
),
(
	'CRing',
	'bijective ring homomorphisms',
	'This characterization holds in every algebraic category.'
),
(
	'Delta',
	'bijective order-preserving maps',
	'This is easy. Notice that bijective order-preserving maps automatically also reflect the order (because we work with totally ordered sets).'
),
(
	'FI',
	'bijective maps',
	'This follows exactly as for sets.'
),
(
	'FinAb',
	'bijective homomorphisms',
	'This follows exactly as for abelian groups.'
),
(
	'FinGrp',
	'bijective homomorphisms',
	'This follows exactly as for groups.'
),
(
	'FinOrd',
	'bijective order-preserving maps',
	'This works as for posets, using that injective order-preserving maps must be order-reflecting.'
),
(
	'FinSet',
	'bijective maps',
	'This follows exactly as for sets.'
),
(
	'Fld',
	'bijective field homomorphisms',
	'This is easy.'
),
(
	'FreeAb',
	'bijective homomorphisms',
	'This follows exactly as for abelian groups.'
),
(
	'FS',
	'bijective maps',
	'This follows exactly as for sets.'
),
(
	'Grp',
	'bijective homomorphisms',
	'This characterization holds in every algebraic category.'
),
(
	'Haus',
	'homeomorphisms',
	'This is easy.'
),
(
	'LRS',
	'pairs $(f,f^{\sharp})$ consisting of a homeomorphism $f$ and an isomorphism of sheaves $f^{\sharp}$',
	'This is easy.'
),
(
	'M-Set',
	'bijective $M$-maps',
	'This characterization holds in every algebraic category.'
),
(
	'Man',
	'diffeomorphisms',
	'This holds by definition.'
),
(
	'Meas',
	'bijective measurable maps that map measurable sets to measurable sets',
	'This is easy.'
),
(
	'Met',
	'bijective isometries',
	'This is easy.'
),
(
	'Met_c',
	'homeomorphisms',
	'This works as for topological spaces.'
),
(
	'Met_oo',
	'bijective isometries',
	'This is easy.'
),
(
	'Mon',
	'bijective homomorphisms',
	'This characterization holds in every algebraic category.'
),
(
	'N',
	'only the identity morphisms',
	'This is true for every poset (regarded as a category).'
),
(
	'N_oo',
	'only the identity morphisms',
	'This is true for every poset (regarded as a category).'
),
(
	'On',
	'only the identities',
	'This is true for every poset (regarded as a category).'
),
(
	'Pos',
	'bijective functions that are order-preserving and order-reflecting',
	'This is easy.'
),
(
	'Prost',
	'bijective functions that are order-preserving and order-reflecting',
	'This is easy.'
),
(
	'R-Mod',
	'bijective $R$-linear maps',
	'This characterization holds in every algebraic category.'
),
(
	'R-Mod_div',
	'bijective $R$-linear maps',
	'This characterization holds in every algebraic category.'
),
(
	'real_interval',
	'only the identity morphisms',
	'This is true for every poset (regarded as a category).'
),
(
	'Rel',
	'bijective functions',
	'For the non-trivial direction, assume that $R : A \to B$ is a relation which has an inverse relation $S : B \to A$. For every $a \in A$ we have $(a,a) \in \mathrm{id}_A = S \circ R$, so there is some $b \in B$ with $(a,b) \in R$ (and $(b,a) \in S$). This shows that $R$ is left-total, and for right-total the argument is similar. By symmetry, this also holds for $S$. To show that $R$ is a function, assume $(a,b_1), (a,b_2) \in R$. Choose some $b_3 \in B$ with $(b_3,a) \in S$. It follows $(b_3,b_1) \in S \circ R = \mathrm{id}_A$, so $b_3 = b_1$. Similarly, $(b_3,b_2) \in S \circ R = \mathrm{id}_A$, so $b_3 = b_2$. This shows that $R$ is a function, i.e. left-unique. That $R$ is injective, i.e. right-unique, follows by symmetry. Finally, $R$ is surjective since it is right-total.'
),
(
	'Ring',
	'bijective ring homomorphisms',
	'This characterization holds in every algebraic category.'
),
(
	'Rng',
	'bijective rng homomorphisms',
	'This characterization holds in every algebraic category.'
),
(
	'Sch',
	'pairs $(f,f^{\sharp})$ consisting of a homeomorphism $f$ and an isomorphism of sheaves $f^{\sharp}$',
	'This is easy.'
),
(
	'Set',
	'bijective maps',
	'This is easy.'
),
(
	'Set*',
	'bijective pointed maps',
	'This characterization holds in every algebraic category.'
),
(
	'Setne',
	'bijective maps',
	'This follows exactly as for sets.'
),
(
	'SetxSet',
	'pairs of bijective maps',
	'This is easy.'
),
(
	'Sh(X)',
	'morphisms of sheaves that are bijective on every open set',
	'This is easy.'
),
(
	'Sh(X,Ab)',
	'morphisms of abelian sheaves that are bijective on every open set',
	'This is easy.'
),
(
	'Sp',
	'natural isomorphisms',
	'This is the for every functor category.'
),
(
	'sSet',
	'natural isomorphisms',
	'This is true for all functor categories.'
),
(
	'Top',
	'homeomorphisms',
	'This is easy.'
),
(
	'Top*',
	'pointed homeomorphisms',
	'This is easy.'
),
(
	'Vect',
	'bijective linear maps',
	'This characterization holds in every algebraic category.'
),
(
	'walking_composable_pair',
	'the three identities',
	'This is trivial.'
),
(
	'walking_commutative_square',
	'the four identities',
	'This is trivial.'
),
(
	'walking_fork',
	'the three identities',
	'This is trivial.'
),
(
	'walking_idempotent',
	'the identity',
	'This is trivial.'
),
(
	'walking_isomorphism',
	'every morphism',
	'This is trivial.'
),
(
	'walking_morphism',
	'the two identities',
	'This is trivial.'
),
(
	'walking_pair',
	'the two identities',
	'This is trivial.'
),
(
	'walking_span',
	'the three identities',
	'This is trivial.'
),
(
	'Z',
	'natural isomorphisms',
	'This is true for all functor categories.'
),
(
	'Z_div',
	'the identities $(a,a) : a \to a$ and the isomorphisms $(a,-a) : a \to -a$ for $a \in \mathbb{Z}$',
	'This is trivial.'
);

INSERT INTO special_morphisms
	(category_id, description, reason, type)
SELECT
	category_id, description, reason, 'isomorphisms'
FROM isomorphisms;

DROP TABLE isomorphisms;
