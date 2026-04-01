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
	'There is a forgetful functor $\mathbf{CMon} \to \mathbf{Set}$ and $\mathbf{Set}$ is locally small.'
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
	'disjoint coproducts',
	TRUE,
	'This follows from the description of the coproduct as a form of direct sum (very similar to $\mathbf{Ab}$).'
),
(
	'CMon',
	'biproducts',
	TRUE,
	'This follows from the explicit construction of coproducts and products.'
),
(
	'CMon',
	'preadditive',
	FALSE,
	'In categories with finite products and coproducts, the preadditive structure is <i>unique</i>: If $f,g : A \to B$ are morphisms, their sum $f+g : A \to B$ is the composite of $(f,g) : A \to B \times B$, the inverse of the canonical morphism $B \oplus B \to B \times B$ (which indeed must be an isomorphism), and the codiagonal $B \oplus B \to B$. In the case of $\mathbf{CMon}$, this is just the pointwise addition of maps, and this is indeed an enrichment of $\mathbf{CMon}$ over itself. But not over $\mathbf{Ab}$, since for example $\mathrm{Hom}(\mathbb{N},\mathbb{N}) \cong \mathbb{N}$ (with respect to addition) is not a group.'
),
(
	'CMon',
	'balanced',
	FALSE,
	'The inclusion of additive monoids $\mathbb{N} \hookrightarrow \mathbb{Z}$ is a counterexample.'
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
	'Consider the submonoid $\{(a,b) : a \leq b \}$ of $\mathbb{N}^2$.'
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
	'See <a href="https://mathoverflow.net/questions/509552">MO/509552</a>: Consider the forgetful functor $U : \mathbf{CMon} \to \mathbf{Set}$ and the relation $R \subseteq U^2$ defined by $R(A) := \{(a,b) \in U(A)^2 : ab = a^2\}$. Both are representable: $U$ by the free monoid on a single generator and $R$ by the free commutative monoid on two generators $x,y$ subject to the relation $xy=x^2$. It is clear that $R$ is reflexive, but not symmetric.'
),
(
	'CMon',
	'regular subobject classifier',
	FALSE,
	'Assume that $\Omega$ is a regular subobject classifier. Since the trivial monoid is a zero object, every regular submonoid $U \subseteq M$ of any commutative monoid $M$ would have the form $\{m \in M : h(m) = 1 \}$ for some homomorphism $M \to \Omega$. Now take any commutative monoid $M$ with zero that has two different homomorphisms with zero $f,g : M \rightrightarrows N$ (for example, let $M = N = \{0\} \cup \{x^n : n \geq 0\}$ be the free monoid with zero on one generator, $f(x) = 0$,and $g(x) = x$). Take their equalizer $U \subseteq M$, and choose a homomorphism $h : M \to \Omega$ with $U = \{m \in M : h(m) = 1\}$. Since $0 \in U$, we have $h(0)=1$. But then for all $m \in M$ we have $h(m) = h(m) h(0) = h(m 0) = h(0) = 1$, i.e. $U = M$, which yields the contradiction $f = g$.'
),
(
	'CMon',
	'coregular',
	FALSE,
	'We can show this analogously to the case of commutative rings <a href="https://math.stackexchange.com/a/3746890" target="_blank">MSE/3746890</a>. Consider the commutative monoid $\mathbb{N}^2$ and its submonoid $U\coloneqq\{(m,n)\mid m\ge n\}$ with the inclusion $i\colon U\hookrightarrow\mathbb{N}^2$. Then, the pushout of $i$ along itself is $\langle x,y,z : x+y=x+z \rangle$, and the equalizer of the cokernel pair of $i$ is $D\coloneqq\{(m,n)\mid m=0 \implies n=0 \}$. If the category $\mathbf{CMon}$ were coregular, the canonical inclusion $j\colon U\hookrightarrow D$ would have to be an epimorphism. However, it is not: let $I\coloneqq\{0,1\}$ be the two-element commutative monoid with $1+1=1$, and let $u,v\colon D\to I$ be the morphisms defined by $u^{-1}(0)=\{(0,0)\}$ and $v^{-1}(0)=\{(0,0),(1,2)\}$; then we have $u\circ j = v\circ j$.'
);
