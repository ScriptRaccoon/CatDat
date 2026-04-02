INSERT INTO implication_input (
	id,
	assumptions,
	conclusions,
	reason,
	is_equivalence
)
VALUES
(
	'cancellative_consequence',
	'["left cancellative", "coequalizers"]',
	'["thin"]',
	'If $f,g$ are two parallel morphisms, then their coequalizer is a regular epimorphism, but also a monomorphism by assumption, so it must be an isomorphism. But this means that $f = g$.',
	FALSE
),
(
	'zero-no-mono',
	'["left cancellative", "zero morphisms"]',
	'["thin"]',
	'If $f,g : A \to B$ are two morphisms, then $0_{B,B} \circ f = 0_{A,B} = 0_{B,B} \circ g$, so that $f = g$.',
	FALSE
),
(
	'codiagonal-no-mono',
	'["left cancellative", "binary coproducts"]',
	'["thin"]',
	'For every object $A$ the codiagonal $A + A \to A$ is a split epimorphism, and by assumption a monomorphism, hence an isomorphism. Hence, the two inclusions $i_1,i_2 : A \to A + A$ coincide. Now, if $f, g : A \to B$ are two morphisms, consider the induced morphism $h : A + A \to B$ and compute $f = h \circ i_1 = h \circ i_2 = g$.',
	FALSE
),
(
	'cauchy_complete_criterion',
	'["left cancellative"]',
	'["Cauchy complete"]',
	'Any idempotent monomorphism must be the identity and therefore splits.',
	FALSE
),
(
	'reflexive_pair_trivial',
	'["left cancellative"]',
	'["reflexive coequalizers", "coreflexive equalizers"]',
	'Any parallel pair of morphisms with a common section (or retraction) must be a pair of the identities.',
	FALSE
),
(
	'groupoid_consequence',
	'["groupoid"]',
	'["self-dual", "mono-regular", "pullbacks", "directed limits", "left cancellative", "well-powered"]',
	'This is easy.',
	FALSE
),
(
	'groupoid_criterion',
	'["left cancellative", "right cancellative", "balanced"]',
	'["groupoid"]',
	'This is trivial.',
	FALSE
),
(
	'groupoid_thin',
	'["groupoid", "equalizers"]',
	'["thin"]',
	'The equalizer of any parallel pair $f,g$ must be an isomorphism, so $f=g$.',
	FALSE
),
(
	'groupoid_products',
	'["groupoid", "binary products", "inhabited"]',
	'["trivial"]',
	'Let $\mathcal{C}$ be an inhabited groupoid with binary products. Then it is connected, so we may assume $\mathcal{C}=BG$ for a group $G$ with unique object $*$. But then $* \times * = *$, so there are $p,q \in G$ such that $G \to G \times G$, $x \mapsto (px,qx)$ is bijective. From here it is an easy exercise to deduce $G=1$.',
	FALSE
),
(
	'groupoid_initial',
	'["groupoid", "initial object"]',
	'["trivial"]',
	'This is easy.',
	FALSE
),
(
	'groupoid_zero',
	'["groupoid", "zero morphisms", "inhabited"]',
	'["trivial"]',
	'This is easy.',
	FALSE
),
(
	'groupoid_connected',
	'["groupoid", "connected"]',
	'["strongly connected"]',
	'This is trivial.',
	FALSE
),
(
	'groupoid_lcc',
	'["groupoid"]',
	'["locally cartesian closed"]',
	'Every slice category is a trivial category.',
	FALSE
),
(
	'mono_regular_consequence',
	'["mono-regular"]',
	'["balanced"]',
	'Any regular monomorphism that is an epimorphism must be an isomorphism.',
	FALSE
);