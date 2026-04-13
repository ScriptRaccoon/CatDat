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
	'Assume that $\mathbf{Rng}$ has a regular quotient object classifier $P$. Consider the functor $N : \mathbf{Ab} \to \mathbf{Rng}$ that equips an abelian group with zero multiplication. It is fully faithful and has a left adjoint mapping a rng $R$ to the abelian group $R/R^2$, the quotient by the ideal $R^2 = \{\sum_i x_i y_i : x_i,y_i \in R\}$. If $R$ is a rng with zero multiplication and $R \to S$ is a surjective homomorphism, then $S$ has zero multiplication. Therefore, the assumptions of <a href="/lemma/subobject_classifiers_coreflection">this lemma</a> (dualized) apply and we conclude that $P/P^2$ is a regular quotient object classifier of $\mathbf{Ab}$. But we already know that <a href="/category/Ab">this category</a> has no such object (in fact, the only additive categories with such an object are trivial by <a href="https://math.stackexchange.com/questions/4086192" target="_blank">MSE/4086192</a>).'
);