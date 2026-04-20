INSERT INTO category_property_assignments (
	category_id,
	property_id,
	is_satisfied,
	reason
)
VALUES
(
	'Rng',
	'locally small',
	TRUE,
	'There is a forgetful functor $\mathbf{Rng} \to \mathbf{Set}$ and $\mathbf{Set}$ is locally small.'
),
(
	'Rng',
	'finitary algebraic',
	TRUE,
	'Take the algebraic theory of a rng.'
),
(
	'Rng',
	'pointed',
	TRUE,
	'The zero ring is a zero object.'
),
(
	'Rng',
	'Malcev',
	TRUE,
	'This follows in the same way as for groups, see also Example 2.2.5 in <a href="https://ncatlab.org/nlab/show/Malcev,+protomodular,+homological+and+semi-abelian+categories" target="_blank">Malcev, protomodular, homological and semi-abelian categories</a>.'
),
(
	'Rng',
	'balanced',
	FALSE,
	'The inclusion $\mathbb{Z} \hookrightarrow \mathbb{Q}$ is a counterexample. (The proof can be reduced to the unital case.)'
),
(
	'Rng',
	'cogenerator',
	FALSE,
	'We apply <a href="/lemma/missing_cogenerator">this lemma</a> to the collection of fields: Any non-zero rng homomorphism from a field to a rng must be injective, and for every infinite cardinal $\kappa$ the field of rational functions in $\kappa$ variables has cardinality $\geq \kappa$.'
),
(
	'Rng',
	'skeletal',
	FALSE,
	'This is trivial.'
),
(
	'Rng',
	'counital',
	FALSE,
	'If $\mathbb{Z}\langle X_1,\dotsc,X_n \rangle_0$ denotes the free rng on $n$ generators (non-commutative polynomials without constant term), then the canonical homomorphism $\mathbb{Z}\langle X,Y \rangle_0 = \mathbb{Z}\langle X \rangle_0 \sqcup \mathbb{Z}\langle Y \rangle_0 \to \mathbb{Z}\langle X \rangle_0 \times \mathbb{Z}\langle Y \rangle_0$ is not a monomorphism since $\mathbb{Z}\langle X,Y \rangle_0$ is not commutative.'
),
(
	'Rng',
	'CIP', -- TODO: remove code duplication with "counital" proof
	FALSE,
	'If $\mathbb{Z}\langle X_1,\dotsc,X_n \rangle_0$ denotes the free rng on $n$ generators (non-commutative polynomials without constant term), then the canonical homomorphism $\mathbb{Z}\langle X,Y \rangle_0 = \mathbb{Z}\langle X \rangle_0 \sqcup \mathbb{Z}\langle Y \rangle_0 \to \mathbb{Z}\langle X \rangle_0 \times \mathbb{Z}\langle Y \rangle_0$ is not a monomorphism since $\mathbb{Z}\langle X,Y \rangle_0$ is not commutative.'
),
(
	'Rng',
	'regular subobject classifier',
	FALSE,
	'Assume that $\mathbf{Rng}$ has a subobject classifier $\Omega$. Since $0$ is a zero object, every regular subobject $R \subseteq S$ would be the kernel of some homomorphism $S \to \Omega$. In particular, it would be an ideal. Now take any pair of homomorphisms $f,g : S \rightrightarrows T$ in $\mathbf{Ring}$. Their equalizer $R \subseteq S$ is also the equalizer in $\mathbf{Rng}$, and it contains $1 \in S$. If it was an ideal, then $R = S$, and hence $f = g$, which is absurd.'
),
(
	'Rng',
	'coregular',
	FALSE,
	'We can copy the proof for the <a href="/category/Ring">category of rings</a>. In short, the inclusion of diagonal matrices $\mathbb{Q}^2 \hookrightarrow M_2(\mathbb{Q})$ is a regular monomorphism, but becomes zero after taking the pushout with $p_1 : \mathbb{Q}^2 \twoheadrightarrow \mathbb{Q}$ because $M_2(\mathbb{Q})$ is simple.'
),
(
	'Rng',
	'regular quotient object classifier',
	FALSE,
	'Assume that $\mathbf{Rng}$ has a regular quotient object classifier $P$. Consider the functor $N : \mathbf{Ab} \to \mathbf{Rng}$ that equips an abelian group with zero multiplication. It is fully faithful and has a left adjoint mapping a rng $R$ to the abelian group $R/R^2$. If $R$ is a rng with zero multiplication and $R \to S$ is a surjective homomorphism, then $S$ has zero multiplication. Therefore, the assumptions of <a href="/lemma/subobject_classifiers_coreflection">this lemma</a> (dualized) apply and we conclude that $P/P^2$ is a regular quotient object classifier of $\mathbf{Ab}$. But we already know that <a href="/category/Ab">this category</a> has no such object (in fact, the only additive categories with such an object are trivial by <a href="https://math.stackexchange.com/questions/4086192" target="_blank">MSE/4086192</a>).'
),
(
	'Rng',
	'cocartesian cofiltered limits',
	FALSE,
	'Consider the ring $A = \mathbb{Z}[X]$ and the sequence of rings $B_n = \mathbb{Z}[Y]/(Y^{n+1})$ with projections $B_{n+1} \to B_n$, whose limit is $\mathbb{Z}[[Y]]$ (both in $\mathbf{Ring}$ and $\mathbf{Rng}$). Every element in the coproduct of rngs $\mathbb{Z}[X] \sqcup \mathbb{Z}[[Y]]$ has a finite "free product" length. Now consider the elements
	<br>$w_n = (1 + XY) (1+XY^2) \cdots (1+X Y^n) - 1 \in A \sqcup B_n$.</br>
	Because of $w_n \equiv w_{n-1} \bmod Y^n$ these form an element $w \in \lim_n (A \sqcup B_n)$. Expanding $w_n$, the longest term is $XY XY^2 \cdots X Y^n$ of "free product" length $2n$, which is unbounded.'
),
(
	'Rng',
	'CSP',
	FALSE,
	'Assume that $\coprod_n \mathbb{Z} \to \prod_n \mathbb{Z}$ is an epimorphism in $\mathbf{Rng}$. Then $((\coprod_n \mathbb{Z})^+)^{\mathrm{ab}} \to \prod_n \mathbb{Z}$ would be an epimorphism in $\mathbf{CRing}$, where $(-)^+$ denotes the unitalization and $(-)^{\mathrm{ab}}$ the abelianization. But if $R \to S$ is an epimorphism of commutative rings, then $\mathrm{card}(S) \leq \mathrm{card}(R)$ by <a href="https://stacks.math.columbia.edu/tag/04W0" target="_blank">SP/04W0</a>. Since $((\coprod_n \mathbb{Z})^+)^{\mathrm{ab}}$ is countable and $\prod_n \mathbb{Z}$ is not, we get a contradiction.'
);
