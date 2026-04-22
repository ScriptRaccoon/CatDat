INSERT INTO category_property_assignments (
	category_id,
	property_id,
	is_satisfied,
	reason
)
VALUES
(
	'Fld',
	'locally small',
	TRUE,
	'There is a forgetful functor $\mathbf{Fld} \to \mathbf{Set}$ and $\mathbf{Set}$ is locally small.'
),
(
	'Fld',
	'inhabited',
	TRUE,
	'This is trivial.'
),
(
	'Fld',
	'left cancellative',
	TRUE,
	'It is well-known that every field homomorphism is injective and hence a monomorphism.'
),
(
	'Fld',
	'well-copowered',
	TRUE,
	'Epimorphisms are the purely inseparable field extensions. If $K \to L$ is purely inseparable, then for all $x \in L$ there is some $n \in \mathbb{N}$ with $x^n \in L$. An element of $K$ has at most $n$ $n$th-roots. So we can bound the size of $L$.'
),
(
	'Fld',
	'multi-algebraic',
	TRUE,
	'See Eg. 4.3(1) in <a href="http://www.tac.mta.ca/tac/volumes/8/n3/8-03abs.html" target="_blank">[AR01]</a>.'
),
(
	'Fld',
	'connected',
	FALSE,
	'A field of characteristic $0$ cannot be connected with a field of characteristic $p > 0$. in fact, the connected components of $\mathbf{Fld}$ are the subcategories $\mathbf{Fld}_p$ of fields of characteristic $p$, where $p$ is a prime or $0$.'
),
(
	'Fld',
	'pushouts',
	FALSE,
	'By <a href="https://math.stackexchange.com/questions/359352/" target="_blank">MSE/359352</a>, the pushout $E \sqcup_K F$ of two field homomorphisms $E \leftarrow K \rightarrow F$ exists if and only if the tensor product $E \otimes_K F$ has a "fieldification": this means that the nilradical is a prime ideal whose quotient ring is a field. This is quite rare: Consider $E = K(X)$, $F = K(Y)$. Then $E \otimes_K F$ is isomorphic to $K[X,Y] (K[X]-\{0\})^{-1} (K[Y]-\{0\})^{-1}$, which is an integral domain but not a field: for example, $X-Y$ has no inverse.'
),
(
	'Fld',
	'balanced',
	FALSE,
	'Every non-trivial purely inseparable field extension, such as $\mathbb{F}_p(X^p) \to \mathbb{F}_p(X)$, provides a counterexample by the descriptions of special morphisms below.'
),
(
	'Fld',
	'generator',
	FALSE,
	'Assume that $G$ is a generator, say of characteristic $p$. Then for all $q \neq p$ all homomorphisms between two fields of characteristic $q$ would be equal, which is absurd.'
),
(
	'Fld',
	'cogenerating set',
	FALSE,
	'We apply <a href="/lemma/missing_cogenerating_sets">this lemma</a> to the collection of fields: Any homomorphism of fields is injective. For every infinite cardinal $\kappa$ the field of rational functions in $\kappa$ variables has cardinality $\geq \kappa$ and a non-trivial automorphism (swap two variables).'
),
(
	'Fld',
	'skeletal',
	FALSE,
	'This is trivial.'
),
(
	'Fld',
	'locally cartesian closed',
	FALSE,
	'Assume that $K$ is a field such that $\mathbf{Fld} / K$ is cartesian closed. This slice category is equivalent to the poset of subfields of $K$. This poset is a lattice, and our assumption implies that it is distributive (see <a href="/category-implication/distributive_criterion">here</a>). But this is quite rare: Consider $K = \mathbb{Q}(\sqrt{2}, \sqrt{3})$. By Galois theory, the lattice of subfields is isomorphic to the diamond lattice $M_3$ which is not distributive. Specifically, $(\mathbb{Q}(\sqrt{2}) \wedge \mathbb{Q}(\sqrt{6})) \vee (\mathbb{Q}(\sqrt{3}) \wedge \mathbb{Q}(\sqrt{6})) = \mathbb{Q} \vee \mathbb{Q} = \mathbb{Q}$, while $(\mathbb{Q}(\sqrt{2}) \vee \mathbb{Q}(\sqrt{3})) \wedge \mathbb{Q}(\sqrt{6}) = \mathbb{Q}(\sqrt{2},\sqrt{3}) \wedge \mathbb{Q}(\sqrt{6}) = \mathbb{Q}(\sqrt{6})$.'
),
(
	'Fld',
	'core-thin',
	FALSE,
	'If this category was core-thin, Galois theory would not exist. Specifically, the conjugation $\mathbb{C} \to \mathbb{C}$, $z \mapsto \overline{z}$ is a non-trivial automorphism.'
),
(
	'Fld',
	'binary powers',
	FALSE,
	'Assume that the product $P := \mathbb{Q}(\sqrt{2}) \times \mathbb{Q}(\sqrt{2})$ exists. This field is isomorphic to a subfield of $\mathbb{Q}(\sqrt{2})$, hence $P \cong \mathbb{Q}$ or $P \cong \mathbb{Q}(\sqrt{2})$. In the first case, the two projections $P \rightrightarrows \mathbb{Q}(\sqrt{2})$ must be equal, which means that every two homomorphisms $K \rightrightarrows \mathbb{Q}(\sqrt{2})$ are equal, which is absurd (take $K = \mathbb{Q}(\sqrt{2})$ and its two automorphisms). In the second case, the projections induce for every field $K$ a bijection $\mathrm{Hom}(K,\mathbb{Q}(\sqrt{2})) \cong \mathrm{Hom}(K,\mathbb{Q}(\sqrt{2}))^2$, which however fails for $K = \mathbb{Q}(\sqrt{2})$: the left hand side has $2$ elements, the right hand side has $4$ elements. A more general result about products in $\mathbf{Fld}$ can be found at <a href="https://math.stackexchange.com/questions/359352" target="_blank">MSE/359352</a>.'
),
(
	'Fld',
	'multi-terminal object',
	FALSE,
	'Every field has a non-trivial extension, for instance, the rational function field over itself in one variable. Hence, a multi-terminal object never exists.'
),
(
	'Fld',
	'cofiltered-limit-stable epimorphisms',
	FALSE,
	'Inside of $\mathbb{F}_p(X)$ consider the descending sequence of subfields
	<p>$\mathbb{F}_p(X) \supseteq \mathbb{F}_p(X^p) \supseteq \mathbb{F}_p(X^{p^2}) \supseteq \cdots,$</p>
	whose intersection is $\mathbb{F}_p$. Each $\mathbb{F}_p(X^{p^n}) \hookrightarrow \mathbb{F}_p(X)$ is purely inseparable, hence an epimorphism, but in the limit we get $\mathbb{F}_p \hookrightarrow \mathbb{F}_p(X)$, which is not even algebraic.'
);
