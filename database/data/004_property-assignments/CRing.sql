INSERT INTO category_property_assignments (
	category_id,
	property_id,
	is_satisfied,
	reason
)
VALUES
(
	'CRing',
	'locally small',
	TRUE,
	'There is a forgetful functor $\mathbf{CRing} \to \mathbf{Set}$ and $\mathbf{Set}$ is locally small.'
),
(
	'CRing',
	'finitary algebraic',
	TRUE,
	'Take the algebraic theory of a commutative ring.'
),
(
	'CRing',
	'strict terminal object',
	TRUE,
	'If $f : 0 \to R$ is a homomorphism, then $R$ satisfies $1=f(1)=f(0)=0$, so that $R=0$.'
),
(
	'CRing',
	'Malcev',
	TRUE,
	'This follows in the same way as for groups, see also Example 2.2.5 in <a href="https://ncatlab.org/nlab/show/Malcev,+protomodular,+homological+and+semi-abelian+categories" target="_blank">Malcev, protomodular, homological and semi-abelian categories</a>.'
),
(
	'CRing',
	'coextensive',
	TRUE,
	'[Sketch] A ring homomorphism $f : A \times B \to R$ yields the idempotent element $e := f(1,0) \in R$, so that $R \cong eR \times (1-e)R$. Then $f$ decomposes into the ring homomorphisms $f_A : A \to eR$, $f_A(a) := f(a,0)$ and $f_B : B \to (1-e)R$, $f_B(b) := f(0,b)$.'
),
(
	'CRing',
	'strict initial object',
	FALSE,
	'The homomorphism $p_1 : \mathbb{Z} \times \mathbb{Z} \to \mathbb{Z}$ is not an isomorphism, and $\mathbb{Z}$ is initial.'
),
(
	'CRing',
	'balanced',
	FALSE,
	'The inclusion $\mathbb{Z} \hookrightarrow \mathbb{Q}$ is a counterexample.'
),
(
	'CRing',
	'cogenerating set',
	FALSE,
	'Assume that there is a cogenerating set $S$. We may assume $0 \notin S$. Take an infinite field $F$ which is larger than any ring in $S$ and admits a non-trivial automorphism (for example, a field of rational functions). Then there is no ring homomorphism $F \to Q$ for $Q \in S$. Since $S$ cogenerates, this implies that every two homomorphisms $F \rightrightarrows F$ are equal, a contradiction.'
),
(
	'CRing',
	'skeletal',
	FALSE,
	'This is trivial.'
),
(
	'CRing',
	'infinitary codistributive',
	FALSE,
	'The canonical homomorphism $\mathbb{Q} \otimes \mathbb{Z}^{\mathbb{N}} \to (\mathbb{Q} \otimes \mathbb{Z})^{\mathbb{N}} = \mathbb{Q}^{\mathbb{N}}$ is not an isomorphism: its image consists of those sequences of rational numbers whose denominators can be bounded.'
),
(
	'CRing',
	'semi-strongly connected',
	FALSE,
	'There is no homomorphism between $\mathbb{F}_2$ and $\mathbb{F}_3$.'
),
(
	'CRing',
	'coregular',
	FALSE,
	'See <a href="https://math.stackexchange.com/questions/3745302" target="_blank">MSE/3745302</a>.'
),
(
	'CRing',
	'co-Malcev',
	FALSE,
	'See <a href="https://mathoverflow.net/questions/509552">MO/509552</a>: Consider the forgetful functor $U : \mathbf{CRing} \to \mathbf{Set}$ and the relation $R \subseteq U^2$ defined by $R(A) := \{(a,b) \in U(A)^2 : ab = a^2\}$. Both are representable: $U$ by $\mathbb{Z}[X]$ and $R$ by $\mathbb{Z}[X,Y] / \langle XY-X^2 \rangle$. It is clear that $R$ is reflexive, but not symmetric.'
);
