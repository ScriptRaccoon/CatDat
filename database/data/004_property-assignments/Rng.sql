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
	'disjoint coproducts',
	TRUE,
	'The coproduct of two rngs $R,S$ has as underlying additive group $R \oplus S \oplus (R \otimes S) \oplus (S \otimes R) \oplus \cdots$ from which the claim easily follows.'
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
	'Assume that there is a rng $Q$ that cogenerates. Clearly, $Q$ is non-zero. Take an infinite field $F$ which is larger than $Q$ and admits a non-trivial automorphism (for example, a field of rational functions). Then every rng homomorphism $f : F \to Q$ is zero: If $e := f(1)$, then $e$ is idempotent and $f$ corestricts to a ring homomorphism $f : F \to eQ$. Since $F$ is a field but $f$ cannot be injective, we must have $eQ = 0$, so that $e = 0$ and $f = 0$. Since $Q$ cogenerates, this implies that every two homomorphisms $F \rightrightarrows F$ are equal, a contradiction.'
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
	'regular subobject classifier',
	FALSE,
	'Assume that $\mathbf{Rng}$ has a subobject classifier $\Omega$. Since $0$ is a zero object, every regular subobject $R \subseteq S$ would be the kernel of some homomorphism $S \to \Omega$. In particular, it would be an ideal. Now take any pair of homomorphisms $f,g : S \rightrightarrows T$ in $\mathbf{Ring}$. Their equalizer $R \subseteq S$ is also the equalizer in $\mathbf{Rng}$, and it contains $1 \in S$. If it was an ideal, then $R = S$, and hence $f = g$, which is absurd.'
),
(
	'Rng',
	'coregular',
	FALSE,
	'We can copy the proof for the <a href="/category/Ring">category of rings</a>. In short, the inclusion of diagonal matrices $\mathbb{Q}^2 \hookrightarrow M_2(\mathbb{Q})$ is a regular monomorphism, but becomes zero after taking the pushout with $p_1 : \mathbb{Q}^2 \twoheadrightarrow \mathbb{Q}$ because $M_2(\mathbb{Q})$ is simple.'
);