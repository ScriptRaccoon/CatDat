INSERT INTO category_property_assignments (
	category_id,
	property_id,
	is_satisfied,
	reason
)
VALUES
(
	'SemiGrp',
	'locally small',
	TRUE,
	'There is a forgetful functor $\SemiGrp \to \Set$ and $\Set$ is locally small.'
),
(
	'SemiGrp',
	'finitary algebraic',
	TRUE,
	'Take the algebraic theory of a semigroup.'
),
(
    'SemiGrp',
    'strict initial object',
    TRUE,
    'This is because the initial object is the empty semigroup, and a non-empty set has no map to an empty set.'
),
(
    'SemiGrp',
    'disjoint coproducts',
    TRUE,
    'This follows easily from the concrete description of coproducts as (a variant of) free products.'
),
(
	'SemiGrp',
	'cocartesian cofiltered limits',
	TRUE,
	'We need to prove that for two cofiltered diagram of semigroups $(B_i)$, $(C_i)$ the canonical map
	$$\textstyle \alpha : \lim_i B_i + \lim_i C_i \to \lim_i (B_i + C_i)$$
	is an isomorphism, i.e. bijective. The underlying set of the coproduct $B_i + C_i$ is identified with the disjoint union of sets of the form
	$$B_i \times C_i \times B_i \times \cdots \times C_i$$
	with any positive product length, starting and ending either with $B_i$ or $C_i$. Moreover, $\lim_i$ commutes with arbitrary coproducts in $\Set$, and of course also with products. This shows that $\alpha$ is bijective.'
),
(
	'SemiGrp',
	'skeletal',
	FALSE,
	'This is trivial.'
),
(
	'SemiGrp',
	'balanced',
	FALSE,
	'The inclusion of additive semigroups $\IN \hookrightarrow \IZ$ is a counterexample. Indeed, if $f,g : \IZ \to G$ are semigroup homomorphisms which agree on $\IN$, the element $e := f(0) = g(0)$ provides a neutral element for $eGe$, which therefore becomes a monoid, and $f,g$ corestrict to monoid homomorphisms $f,g : \IZ \to eGe$ which agree on $\IN$. And we already know that $f = g$ in that case (inverses are uniquely determined).<br>
	Another example can be found in <a href="https://mathoverflow.net/a/510442/2841">MO/510431</a>.'
),
(
	'SemiGrp',
	'Malcev',
	FALSE,
	'Consider the subsemigroup $\{(a,b) : a \leq b \}$ of $\IN^2$ under addition.'
),
(
	'SemiGrp',
	'co-Malcev',
	FALSE,
	'See <a href="https://mathoverflow.net/questions/509552">MO/509552</a>: Consider the forgetful functor $U : \SemiGrp \to \Set$ and the relation $R \subseteq U^2$ defined by $R(A) := \{(a,b) \in U(A)^2 : ab = a^2\}$. Both are representable: $U$ by the free semigroup on a single generator and $R$ by the free semigroup on two generators $x,y$ subject to the relation $xy=x^2$. It is clear that $R$ is reflexive, but not symmetric.'
),
(
    'SemiGrp',
    'semi-strongly connected',
    FALSE,
    'Let us first remark that every non-empty finite semigroup $A$ has an idempotent element $e$, and then $B \to A$, $x \mapsto e$ does define a semigroup homomorphism for any $B$. Therefore, counterexamples need to be infinite and also without idempotent elements.<br>
    Let $A$ be the set of positive rational numbers of the form $m/2^n$ (with $m > 0$, $n \geq 0$), and let $B$ be the set of positive rational numbers of the form $m/3^n$ (with $m > 0$, $n \geq 0$). Both are semigroups under addition. The element $1 \in A$ is $2^\infty$-divisible, meaning that for every $n \geq 0$ there is some $a \in A$ with $1 = 2^n \cdot a$. But $B$ has no $2^\infty$-divisible element. Hence, there is no semigroup homomorphism $A \to B$. Likewise, there is no semigroup homomorphism $B \to A$.'
),
(
	-- TODO: find a variant of the lemma missing_cogenerating_sets (or missing_cogenerator) which handles this.
	'SemiGrp',
	'cogenerating set',
	FALSE,
	'The proof is similar to the proof for <a href="/category/Grp">$\Grp$</a>. Assume that there is a cogenerating set $S$. There is an infinite simple group $G$ larger than all the semigroups in $S$ (such as an alternating group). Since $\id_G, 1 : G \rightrightarrows G$ are different, there is a semigroup $H \in S$ and a homomorphism of semigroups $f : G \to H$ with $f \neq f \circ 1$. Then
	$$N := \{g \in G : f(g) = f(1)\}$$
	is a normal subgroup of $G$. It is proper, and hence trivial. But then $f$ is injective, which is a contradiction.'
),
(
	'SemiGrp',
	'cofiltered-limit-stable epimorphisms',
	FALSE,
	'We already know that <a href="/category/Set">$\Set$</a> does not have this property (by <a href="/category-implication/topos_no_stable_epis">this result</a>). Now apply the contrapositive of the dual of <a href="/lemma/filtered-monos">this lemma</a> to the functor $\Set \to \SemiGrp$ that equips a set with the multiplication $a \cdot b := a$.'
),
(
	'SemiGrp',
	'effective cocongruences',
	FALSE,
	'The proof is similar to <a href="/category/Mon">$\Mon$</a>, i.e. we adapt the counterexample from <a href="https://mathoverflow.net/a/510809" target="_blank">MO/510744</a>. Namely, consider the semigroups
	$$\begin{align*} X & := \langle p \mid p^2 = p \rangle,\\
	E & := \langle p, q \mid p^2 = p,\, q^2 = q,\, pq = q,\, qp = p \rangle,
	\end{align*}$$
	whose underlying sets are $\{p\}$ and $\{p,q\}$, respectively. Then $X$ represents the functor sending a semigroup $A$ to its idempotents, and $E$ represents the relation on idempotents $a, b$ of $A$ that $ab = b$, $ba = a$. It is easy to check that this defines an equivalence relation (see <a href="https://mathoverflow.net/a/510809" target="_blank">MO/510744</a> for details). Since $p \ne q$ in $E$, the equalizer of the two maps $X \rightrightarrows E$ is the empty semigroup. Therefore, if $E$ were effective, it would be isomorphic to the coproduct $X \sqcup X$, whose underlying set consists of non-empty words in $p,q$ with $p,q$ strictly alternating. In particular, in this coproduct, $pq \ne q$.'
),
(
	'SemiGrp',
	'natural numbers object',
	FALSE,
	'Assume that a natural numbers object exists. Then by <a href="/lemma/nno_distributive_criterion">this result</a>, for every semigroup $A$ the natural homomorphism
	$$\textstyle\alpha : \coprod_{n \geq 0} A \to A \times \coprod_{n \geq 0} 1$$
	is a split monomorphism. But this is not true: For each $n \geq 0$ let $A_n$ denote a copy of $A$. The elements of the coproduct in $\alpha$''s domain have a unique representation as
	$$x_{n_1} * \cdots * x_{n_s}$$
	with $x_i \in A_i$ and $n_i \neq n_{i+1}$, and we have
	$$\alpha(x_{n_1} * \cdots * x_{n_s}) = (x_{n_1} \cdots x_{n_s}, n_1 * \cdots * n_s).$$
	In particular, if $A$ has two non-equal commuting elements $x,y$ (for example, if $A$ is any non-trivial monoid), we have
	$$\alpha(y_0 x_0) = \alpha(x_0 y_0),$$
	showing that $\alpha$ is not injective.'
),
(
	'SemiGrp',
	'coregular',
	FALSE,
	'We will find a regular monomorphism $\iota : F \to M$ of semigroups and a homomorphism $F \to K$ such that $K \to K \sqcup_F M$ is not injective. It is similar to our example for <a href="/category/Mon">$\Mon$</a>. Consider these semigroups defined by generators and relations:
	$$\begin{align*}
	F & := \langle a,b,c,d \rangle \\
	M & := \langle a,b,c,d,s : as = c, \, bs = d \rangle \cong \langle a,b,s \rangle \\
	K & := \langle x,c,d \rangle \\
	N & := \langle a,b,c,d,s_0,s_1 : as_i = c, \, bs_i = d \rangle \\
	& \cong \langle a,b,s_0,s_1 : a s_0 = a s_1, \, b s_0 = b s_1 \rangle \\
	\end{align*}$$
	There is a canonical homomorphism $\iota : F \to M$, which is the equalizer of the two canonical homomorphisms $M \rightrightarrows N$ defined by $s \mapsto s_i$. We define $F \to K$ by $a \mapsto x$, $b \mapsto x$, $c \mapsto c$, $d \mapsto d$. Then
	$$K \sqcup_F M \cong \langle x,c,d,s : x s = c,\, x s = d \rangle$$
	shows that $c,d \in K$ have the same image in the pushout.'
),
(
	'SemiGrp',
	'regular subobject classifier',
	FALSE,
	'Assume that a regular subobject classifier $\Omega$ exists in $\SemiGrp$. The universal regular monomorphism $\top : 1 \to \Omega$ corresponds to an idempotent element $e \in \Omega$. It follows that $e \Omega e$ is a monoid with neutral element $e$. We claim that it is a regular subobject classifier in <a href="/category/Mon">$\Mon$</a>, which we know does not exist. Indeed, let $\iota : A \to B$ be a regular monomorphism of monoids. Since the forgetful functor $\Mon \to \SemiGrp$ preserves limits, we can also see $\iota$ as a regular monomorphism of semigroups. Hence, there is a unique homomorphism of semigroups $f : B \to \Omega$ with $\iota(A) = \{b \in B : f(b) = e\}$. Since $1 \in \iota(A)$, we have $f(1) = e$. Then $f$ corresponds to a homomorphism of monoids $f : B \to e \Omega e$ with kernel $\iota$, which proves our claim.'
);