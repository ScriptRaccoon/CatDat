INSERT INTO category_property_assignments (
	category_id,
	property_id,
	is_satisfied,
	reason
)
VALUES
(
	'Mon',
	'locally small',
	TRUE,
	'There is a forgetful functor $\mathbf{Mon} \to \mathbf{Set}$ and $\mathbf{Set}$ is locally small.'
),
(
	'Mon',
	'pointed',
	TRUE,
	'The trivial monoid is a zero object.'
),
(
	'Mon',
	'finitary algebraic',
	TRUE,
	'Take the algebraic of a monoid.'
),
(
	'Mon',
	'unital',
	TRUE,
	'If a submonoid of $X \times Y$ contains $X \times \{1\}$ and $\{1\} \times Y$, then for all $x \in X$ and $y \in Y$ it also contains $(x,1) \cdot (1,y) = (x,y)$.'
),
(
	'Mon',
	'balanced',
	FALSE,
	'The inclusion of additive monoids $\mathbb{N} \hookrightarrow \mathbb{Z}$ is a counterexample.'
),
(
	'Mon',
	'cogenerator',
	FALSE,
	'We apply <a href="/lemma/missing_cogenerator">this lemma</a> to the collection of simple groups: Any non-trivial homomorphism $G \to M$ from a simple group $G$ to a monoid $M$ must be injective (as it corestricts to a homomorphism of groups $G \to M^{\times}$), and for every infinite cardinal $\kappa$ there is a simple group of size $\geq \kappa$ (for example, the alternating group on $\kappa$ elements).'
),
(
	'Mon',
	'skeletal',
	FALSE,
	'This is trivial.'
),
(
	'Mon',
	'Malcev',
	FALSE,
	'Consider the submonoid $\{(a,b) : a \leq b \}$ of $\mathbb{N}^2$.'
),
(
	'Mon',
	'counital',
	FALSE,
	'The canonical morphism $\mathbb{N} \sqcup \mathbb{N} \to \mathbb{N} \times \mathbb{N}$ is not a monomorphism since $\mathbb{N} \sqcup \mathbb{N}$ is not commutative.'
),
(
	'Mon',
	'coregular',
	FALSE,
	'Consider the monoid $M := \langle x_0, x_1, s : x_0 s = x_1 s = 1 \rangle$. Notice that every element in $M$ has a unique expression as $s^k \cdot u$ with $k \in \mathbb{N}$ and $u \in \langle x_0,x_1 \rangle_M$. Moreover, the canonical homomorphism $\iota : \langle x_0, x_1 \rangle \to M$ (from the free monoid) is injective. We will prove that it is a regular monomorphism, which however is not pushout-stable. Consider $N := \langle x_0, x_1, s_0, s_1 : x_i s_j = 1 \rangle$ and define $f_i : M \to N$ for $i=0,1$ by $f_i(x_j) = x_j$ and $f_i(s) = s_i$. Then $\iota$ is the equalizer of $f_0,f_1$. Now consider $g : \langle x_0,x_1 \rangle \to \langle y_0 \rangle$ defined by $g(x_0) = y_0$, $g(x_1) = 1$. The pushout of $\iota$ with $g$ is given by $\langle x_0, x_1, s, y_0 : x_0 s = x_1 s = 1 , \, x_0 = y_0, \, x_1 = 1 \rangle$, which simplifies to $\langle x_0, s : x_0 s = s = 1 \rangle$, which is trivial.'
),
(
	'Mon',
	'regular subobject classifier',
	FALSE,
	'Assume that $\Omega$ is a regular subobject classifier. Since the trivial monoid is a zero object, every regular submonoid $U \subseteq M$ of any monoid $M$ would have the form $\{m \in M : h(m) = 1 \}$ for some homomorphism $M \to \Omega$. Now take any monoid $M$ with zero that has two different homomorphisms with zero $f,g : M \rightrightarrows N$ (for example, let $M = N = \{0\} \cup \{x^n : n \geq 0\}$ be the free monoid with zero on one generator, $f(x) = 0$,and $g(x) = x$). Take their equalizer $U \subseteq M$, and choose a homomorphism $h : M \to \Omega$ with $U = \{m \in M : h(m) = 1\}$. Since $0 \in U$, we have $h(0)=1$. But then for all $m \in M$ we have $h(m) = h(m) h(0) = h(m 0) = h(0) = 1$, i.e. $U = M$, which yields the contradiction $f = g$.'
),
(
	'Mon',
	'regular quotient object classifier',
	FALSE,
	'We can just copy the proof for the <a href="/category/CMon">category of commutative monoids</a>. Alternatively, we may use <a href="/lemma/subobject_classifiers_coreflection">this lemma</a> (dualized).'
);

