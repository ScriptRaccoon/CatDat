INSERT INTO category_property_assignments (
	category_id,
	property_id,
	is_satisfied,
	reason
)
VALUES
(
	'walking_composable_pair',
	'finite',
	TRUE,
	'This is trivial.'
),
(
	'walking_composable_pair',
	'semi-strongly connected',
	TRUE,
	'This is trivial.'
),
(
	'walking_composable_pair',
	'skeletal',
	TRUE,
	'This is trivial.'
),
(
	'walking_composable_pair',
	'self-dual',
	TRUE,
	'This is trivial.'
),
(
	'walking_composable_pair',
	'finitary algebraic',
	FALSE,
	'More generally, let $\mathcal{C}$ be a thin finitary algebraic category. Let $F : \mathbf{Set} \to \mathcal{C}$ denote the free algebra functor. Every object $A \in \mathcal{C}$ admits a regular epimorphism $F(X) \to A$ for some set $X$. But since $\mathcal{C}$ is left cancellative, every regular epimorphism must be an isomorphism. Also, $F(X)$ is a coproduct of copies of $F(1)$, which means it is either the initial object $0$ or $F(1)$ itself (since $\mathcal{C}$ is thin). This shows that $\mathcal{C}$ must have at most $2$ objects up to isomorphism. In fact, either $\mathcal{C}$ is trivial or equivalent to the <a href="/category/walking_morphism">interval category</a> $\{0 \to 1\}$ (which <i>is</i> finitary algebraic).'
),
(
	'walking_composable_pair',
	'locally strongly finitely presentable',
	TRUE,
	'Take the two-sorted (finitary) algebraic theory with exactly one unary operation between them and the equation $x=y$ for each sort. There are exactly three algebras for this theory up to isomorphism: the identities on the empty set and the singleton, the morphism from the empty set to the singleton.
	Hence we get the equivalence to $\{0 \to  1 \to 2\}$.'
)
;
