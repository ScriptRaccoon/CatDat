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
	'essentially countable',
	TRUE,
	'Every finitely generated abelian group is isomorphic to a group of the form $\IZ^n / U$, where $n \in \IN$ and $U$ is a subgroup of $\IZ^n$. Since $\IZ^n$ is Noetherian as a $\IZ$-module, $U$ is finitely generated, hence the category $\mathbf{Ab}_\fg$ has only countably many objects up to isomorphism. Furthermore, for any objects $A \cong \IZ^n / U$ and $B \cong \IZ^m / T$, the hom-set $\Hom(A,B)$ is countable. Indeed, precomposition with the quotient map yields an injection $\Hom(A,B) \hookrightarrow \Hom(\IZ^n, B) \cong B^n$, and $B^n$ is countable.'
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
	'The group $\IZ$ is a generator since it represents the forgetful functor to $\mathbf{Set}$.'
),
(
	'Ab_fg',
	'ℵ₁-accessible',
	TRUE,
	'The inclusion $\mathbf{Ab}_{\fg} \hookrightarrow \mathbf{Ab}$ is closed under $\aleph_1$-filtered colimits by <a href="https://mathoverflow.net/questions/400763/">MO/400763</a>. In particular, $\mathbf{Ab}_{\fg}$ has $\aleph_1$-filtered colimits. Since $\mathbf{Ab}_{\fg}$ is essentially small, there is a set $G$ such that every f.g. abelian group is isomorphic to one in $G$. So trivially it is also a $\aleph_1$-filtered colimit of such objects (take the constant diagram). Finally, every object is $\mathbf{Ab}_{\fg} = \mathbf{Ab}_{\mathrm{fp}}$ is finitely presentable in $\mathbf{Ab}$ and hence also in $\mathbf{Ab}_{\fg}$, a fortiori $\aleph_1$-presentable.'
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
	'Let $Q$ be a finitely generated abelian group. By their well-known classification, we have $Q = F \oplus T$ for a free abelian group $F$ and a finite abelian group $T$. Let $p$ be a prime number which does not divide the order of $T$. Then $\Hom(\IZ/p, Q) = 0$, but $\IZ/p \neq 0$. Therefore, $Q$ is no cogenerator.'
),
(
	'Ab_fg',
	'split abelian',
	FALSE,
	'The short exact sequence $0 \xrightarrow{} \IZ \xrightarrow{p} \IZ \xrightarrow{} \IZ/p \xrightarrow{} 0$ does not split.'
),
(
	'Ab_fg',
	'countable powers',
	FALSE,
	'If countable powers exist, then by <a href="/lemma/hilberts_hotel">Hilbert''s Hotel</a> there is some object $P$ with $P \cong \IZ \times P$. Tensoring with $\IQ$ yields an isomorphism of finite-dimensional vector spaces $P_{\IQ} \cong \IQ \times P_{\IQ}$, which is impossible: the dimension $d$ of $P_{\IQ}$ (i.e. the rank of $P$) would satisfy $d = 1+d$.'
),
(
	'Ab_fg',
	'countable copowers',
	FALSE,
	'If countable powers exist, then by <a href="/lemma/hilberts_hotel">Hilbert''s Hotel</a> there is some object $P$ with $P \cong \IZ \oplus P$. Tensoring with $\IQ$ yields an isomorphism of finite-dimensional vector spaces $C_{\IQ} \cong \IQ \oplus C_{\IQ}$, which is impossible: the dimension $d$ of $C_{\IQ}$ (i.e. the rank of $C$) would satisfy $d = 1+d$.'
),
(
	'Ab_fg',
	'skeletal',
	FALSE,
	'This is trivial.'
),
(
	'Ab_fg',
	'countable',
	FALSE,
	'This is trivial.'
);
