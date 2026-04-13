INSERT INTO category_property_assignments (
	category_id,
	property_id,
	is_satisfied,
	reason
)
VALUES
(
	'Rel',
	'locally small',
	TRUE,
	'The set of morphisms $X \to Y$ is the set $P(X \times Y)$.'
),
(
	'Rel',
	'self-dual',
	TRUE,
	'There is an isomorphism $\mathbf{Rel} \to \mathbf{Rel}^{\mathrm{op}}$ that is the identity on objects (sets) and maps a relation $R \subseteq X \times Y$ to the opposite relation $R^o \subseteq Y \times X$ defined by $R^o := \{(y,x) : (x,y) \in R \}$.'
),
(
	'Rel',
	'pointed',
	TRUE,
	'The empty set is clearly both initial and terminal. The zero morphisms are the empty relations.'
),
(
	'Rel',
	'generator',
	TRUE,
	'One checks that the the one-point set is a generator.'
),
(
	'Rel',
	'coproducts',
	TRUE,
	'It is an easy exercise to deduce this from the corresponding fact for sets and that sets form a distributive category.'
),
(
	'Rel',
	'well-powered',
	TRUE,
	'Any relation $R : A \to B$ induces an injective map $P(A) \to P(B)$, so that in particular there is an injective map $A \to P(B)$.'
),
(
	'Rel',
	'balanced',
	TRUE,
	'See <a href="https://math.stackexchange.com/questions/5030393" target="_blank">MSE/5030393</a>.'
),
(
	'Rel',
	'biproducts',
	TRUE,
	'This is a consequence of the description of coproducts and products, both are disjoint unions (even for infinite families).'
),
(
	'Rel',
	'kernels',
	TRUE,
	'Let $R : A \to B$ be a relation. Define $K = \bigl\{a \in A : \neg \exists b \in B ((a,b) \in R) \bigr\}$. We have an inclusion map $I : K \to A$, which can also be regarded as relation, and $R \circ I = \empty$ is the empty relation, i.e. the zero morphism. It is easy to check the universal property.'
),
(
	'Rel',
	'preadditive',
	FALSE,
	'In categories with finite products and finite coproducts, the preadditive structure <a href="/lemma/preadditive_structure_unique">is unique</a> if it exists. In the case of $\mathbf{Rel}$, where both products and coproducts are just disjoint unions, this operation is just the set-theoretic union $f+g = f \cup g$ of relations. This clearly has no inverses.'
),
(
	'Rel',
	'Cauchy complete',
	FALSE,
	'See <a href="https://math.stackexchange.com/a/5030380/1650" target="_blank">MSE/1931577</a>.'
),
(
	'Rel',
	'skeletal',
	FALSE,
	'This is trivial.'
);
