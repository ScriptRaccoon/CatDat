INSERT INTO category_property_assignments (
	category_id,
	property_id,
	is_satisfied,
	reason
)
VALUES
(
	'CMon',
	'locally small',
	TRUE,
	'There is a forgetful functor $\CMon \to \Set$ and $\Set$ is locally small.'
),
(
	'CMon',
	'pointed',
	TRUE,
	'The trivial monoid is a zero object.'
),
(
	'CMon',
	'finitary algebraic',
	TRUE,
	'Take the algebraic of a commutative monoid.'
),
(
	'CMon',
	'biproducts',
	TRUE,
	'This follows from the explicit construction of coproducts and products.'
),
(
	'CMon',
	'balanced',
	FALSE,
	'The inclusion of additive monoids $\IN \hookrightarrow \IZ$ is a counterexample.'
),
(
	'CMon',
	'skeletal',
	FALSE,
	'This is trivial.'
),
(
	'CMon',
	'Malcev',
	FALSE,
	'Consider the submonoid $\{(a,b) : a \leq b \}$ of $\IN^2$.'
),
(
	'CMon',
	'cogenerator',
	FALSE,
	'See <a href="https://mathoverflow.net/questions/509232" target="_blank">MO/509232</a>.'
),
(
	'CMon',
	'co-Malcev',
	FALSE,
	'See <a href="https://mathoverflow.net/questions/509552">MO/509552</a>: Consider the forgetful functor $U : \CMon \to \Set$ and the relation $R \subseteq U^2$ defined by $R(A) := \{(a,b) \in U(A)^2 : ab = a^2\}$. Both are representable: $U$ by the free monoid on a single generator and $R$ by the free commutative monoid on two generators $x,y$ subject to the relation $xy=x^2$. It is clear that $R$ is reflexive, but not symmetric.'
),
(
	'CMon',
	'regular subobject classifier',
	FALSE,
	'We can use exactly the same proof as for the <a href="/category/Mon">category of monoids</a>.'
),
(
	'CMon',
	'coregular',
	FALSE,
	'We can show this analogously to the case of commutative rings <a href="https://math.stackexchange.com/a/3746890" target="_blank">MSE/3746890</a>. Consider the commutative monoid $\IN^2$ and its submonoid $U\coloneqq\{(m,n)\mid m\ge n\}$ with the inclusion $i\colon U\hookrightarrow\IN^2$. Then, the pushout of $i$ along itself is $\langle x,y,z : x+y=x+z \rangle$, and the equalizer of the cokernel pair of $i$ is $D\coloneqq\{(m,n)\mid m=0 \implies n=0 \}$. If the category $\CMon$ were coregular, the canonical inclusion $j\colon U\hookrightarrow D$ would have to be an epimorphism. However, it is not: let $I\coloneqq\{0,1\}$ be the two-element commutative monoid with $1+1=1$, and let $u,v\colon D \rightrightarrows I$ be the morphisms defined by $u^{-1}(0)=\{(0,0)\}$ and $v^{-1}(0)=\{(0,0),(1,2)\}$; then we have $u\circ j = v\circ j$.'
),
(
	'CMon',
	'regular quotient object classifier',
	FALSE,
	'If $P \in \CMon$ is a regular quotient object classifier, this means that every surjective homomorphism of commutative monoids $A \to B$ is the cokernel of a unique homomorphism $P \to A$. But there are many surjective homomorphisms which are no cokernels at all: Consider the Boolean monoid $(\{0,1\},\vee)$ with $1 \vee 1 = 1$ and the surjective homomorphism $f : (\IN,+) \to (\{0,1\},\vee)$ defined by $f(0)=0$ and $f(n)=1$ for $n \geq 1$. It has trivial kernel, but is no isomorphism, so it cannot be a cokernel.'
),
(
	'CMon',
	'CSP',
	FALSE,
	'First of all, epimorphisms in $\CMon$ are preserved and reflected by the forgetful functor to $\Mon$ (see below). Furthermore, if $M \to N$ is an epimorphism in $\Mon$ and $M$ is infinite, then $\card(N) \leq \card(M)$ (see <a href="https://mathoverflow.net/questions/510431/" target="_blank">MO/510431</a>). This implies that in $\CMon$ the canonical homomorphism $\bigoplus_{n \geq 0} \IN \to \prod_{n \geq 0} \IN$ is not an epimorphism because its domain is countable and its codomain is uncountable.'
);

-- properties that should be ignored by the redundancy check script
UPDATE category_property_assignments
SET check_redundancy = FALSE
WHERE category_id = 'CMon'
AND property_id IN ('pointed');