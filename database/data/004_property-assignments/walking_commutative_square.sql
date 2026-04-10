INSERT INTO category_property_assignments (
	category_id,
	property_id,
	is_satisfied,
	reason
)
VALUES
(
	'walking_commutative_square',
	'self-dual',
	TRUE,
	'This is trivial.'
),
(
	'walking_commutative_square',
	'finite',
	TRUE,
	'This is trivial.'
),
(
	'walking_commutative_square',
	'infinitary distributive',
	TRUE,
	'This is because the <a href="/category/walking_morphism">walking morphism</a> has this property.'
),
(
	'walking_commutative_square',
	'skeletal',
	TRUE,
	'The four objects are not isomorphic.'
),
(
	'walking_commutative_square',
	'locally cartesian closed',
	TRUE,
	'This is because the <a href="/category/walking_morphism">walking morphism</a> has this property.'
),
(
	'walking_commutative_square',
	'locally strongly finitely presentable',
	TRUE,
	'This is because the <a href="/category/walking_morphism">walking morphism</a> has this property. Alternatively, we may represent this category as the category of algebras for the finitary algebraic theory with two sorts $S_1,S_2$, the equation $x=y$ for $x,y \in S_1$, and the equation $x=y$ for $x,y \in S_2$.'
),
(
	'walking_commutative_square',
	'semi-strongly connected',
	FALSE,
	'There is no morphism between $b$ and $c$ (resp., between $(0,1)$ and $(1,0)$).'
),
(
	'walking_commutative_square',
	'trivial',
	FALSE,
	'This is trivial.'
),
(
	'walking_commutative_square',
	'finitary algebraic',
	FALSE,
	'More generally, let $\mathcal{C}$ be a thin finitary algebraic category. Let $F : \mathbf{Set} \to \mathcal{C}$ denote the free algebra functor. Every object $A \in \mathcal{C}$ admits a regular epimorphism $F(X) \to A$ for some set $X$. But since $\mathcal{C}$ is left cancellative, every regular epimorphism must be an isomorphism. Also, $F(X)$ is a coproduct of copies of $F(1)$, which means it is either the initial object $0$ or $F(1)$ itself (since $\mathcal{C}$ is thin). This shows that $\mathcal{C}$ must have at most $2$ objects up to isomorphism. In fact, either $\mathcal{C}$ is trivial or equivalent to the <a href="/category/walking_morphism">interval category</a> $\{0 \to 1\}$ (which <i>is</i> finitary algebraic).'
);
