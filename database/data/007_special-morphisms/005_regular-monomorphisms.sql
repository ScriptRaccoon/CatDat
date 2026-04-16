CREATE TEMP TABLE regular_monomorphisms (
    category_id TEXT NOT NULL,
    description TEXT NOT NULL,
	reason TEXT NOT NULL
);

INSERT INTO regular_monomorphisms (
	category_id,
	description,
	reason
)
VALUES
(
    '0',
    'same as monomorphisms',
    'This is because the category is mono-regular.'
),
(
    '1',
    'same as monomorphisms',
    'This is because the category is mono-regular.'
),
(
    '2',
    'same as monomorphisms',
    'This is because the category is mono-regular.'
),
(
    'Ab',
    'same as monomorphisms',
    'This is because the category is mono-regular.'
),
(
    'Ab_fg',
    'same as monomorphisms',
    'This is because the category is mono-regular.'
),
(
    'B',
    'same as monomorphisms',
    'This is because the category is mono-regular.'
),
(
    'BG_c',
    'same as monomorphisms',
    'This is because the category is mono-regular.'
),
(
    'BG_f',
    'same as monomorphisms',
    'This is because the category is mono-regular.'
),
(
    'BN',
    'same as isomorphisms',
    'This is because the category is right cancellative.'
),
(
    'BOn',
    'ordinals of the form $\alpha \cdot \omega$, where $\alpha$ is any ordinal',
    'This results from the proof that equalizers exist, see <a href="https://math.stackexchange.com/questions/5029668" target="_blank">MSE/5029668</a>.'
),
(
    'Ban',
    'closed embeddings',
    'The non-trivial direction follows from the <a href="https://math.stackexchange.com/questions/319867" target="_blank">well-known fact</a> that for every closed subspace of a Banach space its quotient space is again a Banach space.'
),
(
    'Delta',
    'same as monomorphisms',
    'This is because the category is mono-regular.'
),
(
    'FI',
    'same as monomorphisms',
    'This is because the category is mono-regular.'
),
(
    'FS',
    'same as monomorphisms',
    'This is because the category is mono-regular.'
),
(
    'FinAb',
    'same as monomorphisms',
    'This is because the category is mono-regular.'
),
(
    'FinGrp',
    'same as monomorphisms',
    'This is because the category is mono-regular.'
),
(
    'FinOrd',
    'same as monomorphisms',
    'This is because the category is mono-regular.'
),
(
    'FinSet',
    'same as monomorphisms',
    'This is because the category is mono-regular.'
),
(
    'Fld',
    'A Galois extension is a regular monomorphism iff it is procyclic, and the general case can be reduced to this situation; see the reference for details.',
    'See <a href="https://math.stackexchange.com/questions/5129895" target="_blank">MSE/5129895</a>.'
),
(
    'Grp',
    'same as monomorphisms',
    'This is because the category is mono-regular.'
),
(
    'Haus',
    'embeddings with closed image',
    'The explicit construction of equalizers shows that they are embeddings, and they have a closed image because of the well-known lemma that for a Hausdorff space the diagonal $X \to X \times X$ has closed image. For the other non-trivial direction, see <a href="https://math.stackexchange.com/questions/214045/" target="_blank">MSE/214045</a>.'
),
(
    'M-Set',
    'same as monomorphisms',
    'This is because the category is mono-regular.'
),
(
    'Meas',
    'embeddings',
    '(This is the same proof as for $\mathbf{Top}$.) Equalizers are embeddings by their construction. Conversely, if $f : X \to Y$ is an embedding, then $f$ is the equalizer of the two characteristic maps $\chi_Y, \chi_{f(X)} : Y \rightrightarrows \{0,1\}$, where $\{0,1\}$ carries the trivial $\sigma$-algebra.'
),
(
    'Met_c',
    'embeddings of closed subspaces',
    'A reference is Example 7.58 (3) in <a href="https://ncatlab.org/nlab/show/Abstract+and+Concrete+Categories" target="_blank">Joy of Cats</a>, but a proof is missing there.'
),
(
    'N',
    'same as isomorphisms',
    'This is because the category is right cancellative.'
),
(
    'N_oo',
    'same as isomorphisms',
    'This is because the category is right cancellative.'
),
(
    'On',
    'same as isomorphisms',
    'This is because the category is right cancellative.'
),
(
    'Pos',
    'embeddings',
    'Every regular monomorphism is an embedding by the explicit construction of equalizers. For the converse, let $i : P \to Q$ be an embedding, which we may assume to be an inclusion. Consider the cokernel pair $C := Q \cup_P Q$. It exists because the category has pushouts, but we can (and need to) describe it more concretely: As a set, $C$ is a disjoint union of $P$ and two copies of $Q \setminus P$. The elements will be denoted by $p,q_1,q_2$. The $i$th inclusion map $Q \to C$ maps $p \in P$ to itself and $q \in Q \setminus P$ to $q_i$. The ordering is directly induced by $Q$: We have $p \leq p''$ in $C$ iff $p \leq p''$ in $P$, we have $p \leq q_i$ iff $p \leq q$ in $Q$, etc. One verifies that this indeed defines a partial order, and by construction the two maps $Q \rightrightarrows C$ are order-preserving and have equalizer $P$.'
),
(
    'Prost',
    'embeddings',
    'Every regular monomorphism is an embedding by the explicit construction of equalizers. For the converse, let $i : P \to Q$ be an embedding, which we may assume to be an inclusion. Consider the cokernel pair $C := Q \cup_P Q$. It exists because the category has pushouts, but we can (and need to) describe it more concretely: As a set, $C$ is a disjoint union of $P$ and two copies of $Q \setminus P$. The elements will be denoted by $p,q_1,q_2$. The $i$th inclusion map $Q \to C$ maps $p \in P$ to itself and $q \in Q \setminus P$ to $q_i$. The ordering is directly induced by $Q$: We have $p \leq p''$ in $C$ iff $p \leq p''$ in $P$, we have $p \leq q_i$ iff $p \leq q$ in $Q$, etc. One verifies that this indeed defines a preorder, and by construction the two maps $Q \rightrightarrows C$ are order-preserving and have equalizer $P$.'
),
(
    'R-Mod',
    'same as monomorphisms',
    'This is because the category is mono-regular.'
),
(
    'R-Mod_div',
    'same as monomorphisms',
    'This is because the category is mono-regular.'
),
(
    'Set',
    'same as monomorphisms',
    'This is because the category is mono-regular.'
),
(
    'Set*',
    'same as monomorphisms',
    'This is because the category is mono-regular.'
),
(
    'Setne',
    'same as monomorphisms',
    'This is because the category is mono-regular.'
),
(
    'SetxSet',
    'same as monomorphisms',
    'This is because the category is mono-regular.'
),
(
    'Sh(X)',
    'same as monomorphisms',
    'This is because the category is mono-regular.'
),
(
    'Sh(X,Ab)',
    'same as monomorphisms',
    'This is because the category is mono-regular.'
),
(
    'Sp',
    'same as monomorphisms',
    'This is because the category is mono-regular.'
),
(
    'Top',
    'embeddings',
    'Equalizers are embeddings by their construction. Conversely, if $f : X \to Y$ is an embedding, then $f$ is the equalizer of the two characteristic maps $\chi_Y, \chi_{f(X)} : Y \to \{0,1\}$, where $\{0,1\}$ carries the indiscrete topology.'
),
(
    'Top*',
    'embeddings',
    'Equalizers are embeddings by their construction. Conversely, if $f : X \to Y$ is an embedding, then $f$ is the equalizer of the two characteristic maps $\chi_Y, \chi_{f(X)} : Y \to \{0,1\}$, where $\{0,1\}$ carries the indiscrete topology and $1$ is the base point.'
),
(
    'Vect',
    'same as monomorphisms',
    'This is because the category is mono-regular.'
),
(
    'Z',
    'same as monomorphisms',
    'This is because the category is mono-regular.'
),
(
    'Z_div',
    'same as isomorphisms',
    'This is because the category is right cancellative.'
),
(
    'real_interval',
    'same as isomorphisms',
    'This is because the category is right cancellative.'
),
(
    'sSet',
    'same as monomorphisms',
    'This is because the category is mono-regular.'
),
(
    'walking_composable_pair',
    'same as isomorphisms',
    'This is because the category is right cancellative.'
),
(
    'walking_fork',
    'the identities and $i$',
    'First, $i$ is the equalizer of $f,g$. The morphism $f$ is an epimorphism (and a monomorphism), but no isomorphism, hence cannot be a regular monomorphism. The same holds for $g$.'
),
(
	'walking_commutative_square',
	'same as isomorphisms',
    'This is because the category is right cancellative.'
),
(
	'walking_idempotent',
	'the identity',
	'This is trivial.'
),
(
    'walking_isomorphism',
    'same as isomorphisms',
    'This is because the category is right cancellative.'
),
(
    'walking_morphism',
    'same as isomorphisms',
    'This is because the category is right cancellative.'
),
(
    'walking_pair',
    'same as isomorphisms',
    'This is because the category is right cancellative.'
),
(
    'walking_span',
    'same as isomorphisms',
    'This is because the category is right cancellative.'
);

INSERT INTO special_morphisms
	(category_id, description, reason, type)
SELECT
	category_id, description, reason, 'regular monomorphisms'
FROM regular_monomorphisms;

DROP TABLE regular_monomorphisms;