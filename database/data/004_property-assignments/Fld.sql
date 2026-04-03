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
	'directed colimits',
	TRUE,
	'Consider a directed diagram $(F_i)$ of fields and take the colimit $F$ in the category of commutative rings. Now one checks that $F$ is a field as well, and the universal property remains true for fields.'
),
(
	'Fld',
	'connected limits',
	TRUE,
	'Consider a connected diagram $(F_i)$ of fields and take the limit $F$ in the category of commutative rings. Now one checks that $F$ is a field as well, and the universal property remains true for fields. Namely, $1 = 0$ in $F$ would imply that $1 = 0$ in each $F_i$ and hence, since the diagram is connected, in some $F_i$, which is a contradiction. And if $x \in F$ is non-zero, then all components $x_i$ are non-zero and hence invertible: Choose some $j$ such that $x_j$ is non-zero. Since there is a zig zag path of morphisms between $i$ and $j$ in the index category, which get mapped to field homomorphisms which are injective, it follows that $x_i$ is non-zero.'
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
	'well-powered',
	TRUE,
	'The subfields of a given field form a set.'
),
(
	'Fld',
	'well-copowered',
	TRUE,
	'Epimorphisms are the purely inseparable field extensions. If $K \to L$ is purely inseparable, then for all $x \in L$ there is some $n \in \mathbb{N}$ with $x^n \in L$. An element of $K$ has at most $n$ $n$th-roots. So we can bound the size of $L$.'
),
(
	'Fld',
	'generating set',
	TRUE,
	'The fields $Q(\mathbb{Z}[X]/\mathfrak{p})$, where $\mathfrak{p}$ runs through all prime ideals of the polynomial ring, provide a generating set. This is because for every element $a \in K$ of a field $K$ there is a prime ideal $\mathfrak{p}$ with a homomorphism $Q(\mathbb{Z}[X]/\mathfrak{p}) \to K$ mapping $[X]$ to $a$: There is a homomorphism $\mathbb{Z}[X] \to K$ mapping $X \mapsto a$. Let $\mathfrak{p}$ be its kernel. Then it extends to a field homomorphism as desired.'
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
	'Assume that there is a cogenerating set $S$. Take a field $F$ which is larger than all the fields in $S$ and admits a non-trivial automorphism (for example, a field of rational functions). Then there is no field homomorphism $F \to Q$ for $Q \in S$. Since $S$ cogenerates, this means that all homomorphisms $F \to F$ are equal, a contradiction.'
),
(
	'Fld',
	'essentially small',
	FALSE,
	'Consider function fields in any number of variables.'
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
	'one-way',
	FALSE,
	'Consider the endomorphism $\mathbb{Q}(X) \to \mathbb{Q}(X)$, $X \mapsto X^2$.'
);
