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
	'If $f,g : A \rightrightarrows B$ are two morphisms, then $0_{B,B} \circ f = 0_{A,B} = 0_{B,B} \circ g$, so that $f = g$.',
	FALSE
),
(
	'codiagonal-no-mono',
	'["left cancellative", "binary copowers"]',
	'["thin"]',
	'For every object $A$ the codiagonal $A + A \to A$ is a split epimorphism, and by assumption a monomorphism, hence an isomorphism. Hence, the two inclusions $i_1,i_2 : A \rightrightarrows A + A$ coincide. Now, if $f, g : A \rightrightarrows B$ are two morphisms, consider the induced morphism $h : A + A \to B$ and compute $f = h \circ i_1 = h \circ i_2 = g$.',
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
	'Any parallel pair of morphisms with a common section (or retraction) must be a pair of equal isomorphisms.',
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
	'["semi-strongly connected"]',
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
),
(
	'direct_implies_one-way',
	'["direct"]',
	'["one-way", "skeletal"]',
	'The category is one-way since any non-identity endomorphism yields an infinite sequence of equal non-identity morphisms. The category is skeletal since any non-identity isomorphism $f : A \to B$ yields the infinite sequence $\dotsc,f^{-1},f,f^{-1},f$.',
	FALSE
),
(
	'thin_implies_one-way',
	'["thin"]',
	'["one-way"]',
	'This is trivial.',
	FALSE
),
(
	'one-way_zero',
	'["zero morphisms", "one-way"]',
	'["thin"]',
	'If $f,g : A \rightrightarrows B$ are two morphisms, then since $0_{B,B} = \mathrm{id}_B$ we have $f = 0_{B,B} \circ f = 0_{A,B} = 0_{B,B} \circ g = g$.',
	FALSE
),
(
	'direct_criterion',
	'["skeletal", "one-way", "finite"]',
	'["direct"]',
	'See the <a href="https://ncatlab.org/nlab/show/direct+category#direct_versus_oneway_categories" target="_blank">nLab</a> for a proof.',
	FALSE
),
(
	'one-way_products_thin',
	'["one-way", "binary products"]',
	'["thin"]',
	'Let $X$ be any object. The swap $\tau : X \times X \to X \times X$ is equal to the identity. It follows that the projections $p_1,p_2 : X \times X \rightrightarrows X$ are the same. And this means that every two morphisms $Y \rightrightarrows X$ are the same.',
	FALSE
),
(
	'one-way_groupoids',
	'["one-way", "groupoid"]',
	'["thin"]',
	'If $f,g : A \rightrightarrows B$ are two morphisms, then $f^{-1} \circ g : A \to A$ must be the identity, so that $f = g$.',
	FALSE
),
(
	'discrete_implies_direct',
	'["discrete"]',
	'["direct"]',
	'This is trivial.',
	FALSE
),
(
	'direct_implies_sequential_limits',
	'["direct"]',
	'["sequential limits"]',
	'Assume that $\cdots \to A_2 \to A_1 \to A_0$ is a sequence of morphisms. We will prove that almost all of them are identities, so that the sequence is eventually constant and the limit exists. Assume the opposite, i.e. that there are infinitely many $A_k \to A_{k-1}$ which are not the identity. Pick some $n_1$ such that $A_{n_1} \to A_{n_1 - 1}$ is not the identity, and let $n_0 := n_1 - 1$. If $A_{n_i} \to A_{n_{i-1}}$ has been constructed, there is some $n_{i+1} > n_i$ such that the composite $A_{n_{i+1}} \to A_{n_i}$ is not the identity, because otherwise it would follow inductively that all $A_{k+1} \to A_k$, $k \geq n_i$ would be identities, which would contradict our infiniteness assumption. This way we construct an infinite sequence of non-identity morphisms $A_{n_{i+1}} \to A_{n_i}$, a contradiction.',
	FALSE
),
(
	'one-way_reflexive',
	'["one-way"]',
	'["reflexive coequalizers"]',
	'Every reflexive pair is equal: If $f s = g s = \mathrm{id}$, then since $s f  = \mathrm{id}$ (one-way), we must have $f = s^{-1}$, and likewise $g = s^{-1}$.',
	FALSE
);