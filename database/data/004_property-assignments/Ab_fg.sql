INSERT INTO category_property_assignments (
	category_id,
	property_id,
	is_satisfied,
	reason
)
VALUES
(
	'Ab_fg',
	'locally small',
	TRUE,
	'There is a forgetful functor $\mathbf{FinAb} \to \mathbf{Set}$ and $\mathbf{Set}$ is locally small.'
),
(
	'Ab_fg',
	'essentially small',
	TRUE,
	'Every finitely generated abelian group is isomorphic to a group of the form $\mathbb{Z}^n / U$, where $n \in \mathbb{N}$ and $U$ is a subgroup of $\mathbb{Z}^n$. And these constitute a set.'
),
(
	'Ab_fg',
	'abelian',
	TRUE,
	'This follows from the fact for abelian groups and the fact that subgroups of finitely generated abelian groups are also finitely generated.'
),
(
	'Ab_fg',
	'generator',
	TRUE,
	'The group $\mathbb{Z}$ is a generator since it represents the forgetful functor to $\mathbf{Set}$.'
),
(
	'Ab_fg',
	'small',
	FALSE,
	'Even the collection of trivial groups is not small.'
),
(
	'Ab_fg',
	'cogenerator',
	FALSE,
	'Let $Q$ be a finitely generated abelian group. By their well-known classification, we have $Q = F \oplus T$ for a free abelian group $F$ and a finite abelian group $T$. Let $p$ be a prime number which does not divide the order of $T$. Then $\hom(\mathbb{Z}/p, Q) = 0$, but $\mathbb{Z}/p \neq 0$. Therefore, $Q$ is no cogenerator.'
),
(
	'Ab_fg',
	'split abelian',
	FALSE,
	'The short exact sequence $0 \xrightarrow{} \mathbb{Z} \xrightarrow{p} \mathbb{Z} \xrightarrow{} \mathbb{Z}/p \xrightarrow{} 0$ does not split.'
),
(
	'Ab_fg',
	'countable powers',
	FALSE,
	'If countable powers exist, then by <a href="/lemma/hilberts_hotel">Hilbert''s Hotel</a> there is some object $P$ with $P \cong \mathbb{Z} \times P$. Tensoring with $\mathbb{Q}$ yields an isomorphism of finite-dimensional vector spaces $P_{\mathbb{Q}} \cong \mathbb{Q} \times P_{\mathbb{Q}}$, which is impossible: the dimension $d$ of $P_{\mathbb{Q}}$ (i.e. the rank of $P$) would satisfy $d = 1+d$.'
),
(
	'Ab_fg',
	'countable copowers',
	FALSE,
	'If countable powers exist, then by <a href="/lemma/hilberts_hotel">Hilbert''s Hotel</a> there is some object $P$ with $P \cong \mathbb{Z} \oplus P$. Tensoring with $\mathbb{Q}$ yields an isomorphism of finite-dimensional vector spaces $C_{\mathbb{Q}} \cong \mathbb{Q} \oplus C_{\mathbb{Q}}$, which is impossible: the dimension $d$ of $C_{\mathbb{Q}}$ (i.e. the rank of $C$) would satisfy $d = 1+d$.'
),
(
	'Ab_fg',
	'skeletal',
	FALSE,
	'This is trivial.'
);
