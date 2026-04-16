INSERT INTO implication_input (
	id,
	assumptions,
	conclusions,
	reason,
	is_equivalence
)
VALUES
(
	'small_consequence',
	'["small"]',
	'["locally small", "essentially small"]',
	'This is trivial.',
	FALSE
),
(
	'essentially_small_consequence',
	'["essentially small"]',
	'["well-powered", "well-copowered", "locally essentially small"]',
	'This is trivial.',
	FALSE
),
(
	'finite_consequence',
	'["finite"]',
	'["countable", "essentially finite"]',
	'This is trivial.',
	FALSE
),
(
	'essentially_finite_raise',
	'["essentially finite"]',
	'["essentially countable"]',
	'This is trivial.',
	FALSE
),
(
	'countable_consequence',
	'["countable"]',
	'["essentially countable"]',
	'This is trivial.',
	FALSE
),
(
	'essentially_countable_consequence',
	'["essentially countable"]',
	'["essentially small"]',
	'This is trivial.',
	FALSE
),
(
	'locally_small_consequence',
	'["locally small"]',
	'["locally essentially small"]',
	'This is trivial.',
	FALSE
),
(
	'generator_consequence',
	'["generator"]',
	'["inhabited", "generating set"]',
	'This is trivial.',
	FALSE
),
(
	'generator_via_coproduct',
	'["generating set", "coproducts", "zero morphisms"]',
	'["generator"]',
	'If $S$ is a generating set, we claim that $U := \coprod_{G \in S} G$ is a generator. Let $f,g : A \rightrightarrows B$ be two morphisms with $f h = g h$ for all $h : U \to A$. If $G \in S$, any morphism $G \to A$ extends to $U$ by using zero morphisms outside of $G$. Thus, $fh = gh$ holds for all $h : G \to A$ and $G \in S$. Since $S$ is a generating set, this implies $f = g$.',
	FALSE
),
(
	'generating_set_small_categories',
	'["essentially small"]',
	'["generating set"]',
	'In a small category, the set of all objects is clearly a generating set.',
	FALSE
),
(
	'free-algebra-generates',
	'["finitary algebraic"]',
	'["generator"]',
	'Pick an algebraic theory that represents the category. The free algebra $F(1)$ on one generator is a generator since morphisms $F(1) \to X$ correspond to the elements of (the underlying set of) the algebra $X$.',
	FALSE
);