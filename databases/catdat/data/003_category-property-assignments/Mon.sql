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
	'There is a forgetful functor $\Mon \to \Set$ and $\Set$ is locally small.'
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
	'The inclusion of additive monoids $\IN \hookrightarrow \IZ$ is a counterexample.'
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
	'Consider the submonoid $\{(a,b) : a \leq b \}$ of $\IN^2$.'
),
(
	'Mon',
	'counital',
	FALSE,
	'The canonical morphism $\IN \sqcup \IN \to \IN \times \IN$ is not a monomorphism since $\IN \sqcup \IN$ is not commutative.'
),
(
	'Mon',
	'CIP',  -- TODO: remove code duplication with "counital" proof
	FALSE,
	'The canonical morphism $\IN \sqcup \IN \to \IN \times \IN$ is not a monomorphism since $\IN \sqcup \IN$ is not commutative.'
),
(
	'Mon',
	'coregular',
	FALSE,
	'Consider the monoid $M := \langle x_0, x_1, s : x_0 s = x_1 s = 1 \rangle$. Notice that every element in $M$ has a unique expression as $s^k \cdot u$ with $k \in \IN$ and $u \in \langle x_0,x_1 \rangle_M$. Moreover, the canonical homomorphism $\iota : \langle x_0, x_1 \rangle \to M$ (from the free monoid) is injective. We will prove that it is a regular monomorphism, which however is not pushout-stable. Consider $N := \langle x_0, x_1, s_0, s_1 : x_i s_j = 1 \rangle$ and define $f_i : M \to N$ for $i=0,1$ by $f_i(x_j) = x_j$ and $f_i(s) = s_i$. Then $\iota$ is the equalizer of $f_0,f_1$. Now consider $g : \langle x_0,x_1 \rangle \to \langle y_0 \rangle$ defined by $g(x_0) = y_0$, $g(x_1) = 1$. The pushout of $\iota$ with $g$ is given by $\langle x_0, x_1, s, y_0 : x_0 s = x_1 s = 1 , \, x_0 = y_0, \, x_1 = 1 \rangle$, which simplifies to $\langle x_0, s : x_0 s = s = 1 \rangle$, which is trivial.'
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
),
(
	'Mon',
	'cofiltered-limit-stable epimorphisms',
	FALSE,
	'We already know that $\Grp$ does not have this property. Now apply the contrapositive of the dual of <a href="/lemma/filtered-monos">this lemma</a> to the forgetful functor $\Grp \to \Mon$. It preserves epimorphisms since it has a right adjoint, the unit group functor.'
),
(
	'Mon',
	'cocartesian cofiltered limits',
	FALSE,
	'We know that the <a href="/category/Grp">category of groups</a> fails to satisfy this property. The same counterexample works here since the inclusion $\Grp \hookrightarrow \Mon$ preserves limits and colimits (it has a left and a right adjoint) and is conservative. A similar counterexample is given by the free monoids $N_n = \langle x_1,\dotsc,x_n \rangle$ and the Boolean monoid $M = \langle e : e^2=e \rangle$ with the maps $N_{n+1} \to N_n$, $x_{n+1} \mapsto 1$. Then the element $(x_1 e \cdots x_n e) \in \lim_n (M \sqcup N_n)$ does not come from $M \sqcup \lim_n N_n$ because its components have unbounded free product length.'
),
(
	'Mon',
	'CSP',
	FALSE,
	'If $M \to N$ is an epimorphism in $\Mon$ and $M$ is infinite, then $\card(N) \leq \card(M)$ (see <a href="https://mathoverflow.net/questions/510431/" target="_blank">MO/510431</a>). This implies that in $\Mon$ the canonical homomorphism $\coprod_{n \geq 0} \IN \to \prod_{n \geq 0} \IN$ is not an epimorphism because its domain is countable and its codomain is uncountable.'
),
(
	'Mon',
	'effective cocongruences',
	FALSE,
	'We adapt the counterexample from <a href="https://mathoverflow.net/a/510809" target="_blank">MO/510744</a> for $\Ring$. Namely, consider the monoids
	$$\begin{align*} X & := \langle p \mid p^2 = p \rangle \cong (\{ 0, 1 \}, \cdot),\\
	E & := \langle p, q \mid p^2 = p,\, q^2 = q,\, pq = q,\, qp = p \rangle. \end{align*}$$
	Then $X$ represents the functor sending a monoid $M$ to its idempotents, and $E$ represents the relation on idempotents $a, b$ of $M$ that $ab = b$, $ba = a$. The equations are equivalent to $aM = bM$, showing that the relation is indeed an equivalence relation.<br>
	On the other hand, using the multiplicative map
	$$E \to M_{2\times 2}(\IZ), \quad p \mapsto \begin{pmatrix} 1 & 0 \\ 0 & 0 \end{pmatrix},\quad q \mapsto \begin{pmatrix} 1 & 1 \\ 0 & 0 \end{pmatrix},$$
	we can see that $p \ne q$ in $E$, so the equalizer of the two maps $X \rightrightarrows E$ is the trivial submonoid $\{ 1 \}$. Therefore, if $E$ were effective, it would be isomorphic to the coproduct $X \sqcup X$, whose underlying set consists of words in $p,q$ with $p,q$ strictly alternating. In particular, in this coproduct, $pq \ne q$.'
);
