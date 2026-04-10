INSERT INTO category_property_assignments (
	category_id,
	property_id,
	is_satisfied,
	reason
)
VALUES
(
	'Alg(R)',
	'locally small',
	TRUE,
	'There is a forgetful functor $\mathbf{Alg}(R) \to \mathbf{Set}$ and $\mathbf{Set}$ is locally small.'
),
(
	'Alg(R)',
	'finitary algebraic',
	TRUE,
	'Take the algebraic theory of an $R$-algebra.'
),
(
	'Alg(R)',
	'strict terminal object',
	TRUE,
	'If $f : 0 \to A$ is an algebra homomorphism, then $A$ satisfies $1=f(1)=f(0)=0$, so that $A=0$.'
),
(
	'Alg(R)',
	'Malcev',
	TRUE,
	'This follows in the same way as for groups, see also Example 2.2.5 in <a href="https://ncatlab.org/nlab/show/Malcev,+protomodular,+homological+and+semi-abelian+categories" target="_blank">Malcev, protomodular, homological and semi-abelian categories</a>.'
),
(
	'Alg(R)',
	'disjoint finite products',
	TRUE,
	'One can take the same proof as for $\mathbf{Ring}$.'
),
(
	'Alg(R)',
	'strict initial object',
	FALSE,
	'The homomorphism $p_1 : R \times R \to R$ is not an isomorphism, and $R$ is initial.'
),
(
	'Alg(R)',
	'balanced',
	FALSE,
	'Take a prime ideal $P \subseteq R$ and consider the $R$-algebra $A := R/P$ (which is an integral domain). Then the inclusion $A \hookrightarrow Q(A)$ is a counterexample.'
),
(
	'Alg(R)',
	'skeletal',
	FALSE,
	'This is trivial.'
),
(
	'Alg(R)',
	'cogenerating set',
	FALSE,
	'Assume that there is a cogenerating set $S$. We may assume $0 \notin S$. Take an infinite field $F$ which has an $R$-algebra structure, is larger than all the algebras in $S$ and admits a non-trivial automorphism (for example, a field of rational functions over some residue field of $R$). Then there is no algebra homomorphism $F \to Q$ for $Q \in S$. Since $S$ cogenerates, this implies that every two homomorphisms $F \rightrightarrows F$ are equal, a contradiction.'
),
(
	'Alg(R)',
	'codistributive',
	FALSE,
	'If $\sqcup$ denotes the coproduct of $R$-algebras (see <a href="https://math.stackexchange.com/questions/625874" target="_blank">MSE/625874</a> for their description) and $A$ is an $R$-algebra, the canonical morphism $A \sqcup R^2 \to (A \sqcup R)^2 = A^2$ is usually no isomorphism. For example, for $A = R[X]$ the coproduct on the LHS is not commutative, it has the algebra presentation $\langle X,E : E^2=E \rangle$.'	
),
(
	'Alg(R)',
	'strongly connected',
	FALSE,
	'This is because already the full subcategory $\mathrm{CAlg}(R)$ of commutative algebras is not strongly connected, see <a href="/category/CAlg(R)">its category page</a> for details.'
),
(
	'Alg(R)',
	'co-Malcev',
	FALSE,
	'See <a href="https://mathoverflow.net/questions/509552">MO/509552</a>: Consider the forgetful functor $U : \mathbf{Alg}(R) \to \mathbf{Set}$ and the relation $S \subseteq U^2$ defined by $S(A) := \{(a,b) \in U(A)^2 : ab = a^2\}$. Both are representable: $U$ by $R[X]$ and $S$ by $R \langle X,Y \rangle / \langle XY-X^2 \rangle$. It is clear that $S$ is reflexive, but not symmetric.'
),
(
	'Alg(R)',
	'coregular',
	FALSE,
	'We just need to tweak the proof for $\mathbf{Ring}$. Since $R \neq 0$, there is an infinite field $K$ with a homomorphism $R \to K$. Since $K$ is infinite, we may choose some $\lambda \in K \setminus \{0,1\}$. Let $B := M_2(K)$ and $A := K \times K$. Then $A \to B$, $(x,y) \mapsto \mathrm{diag}(x,y)$ is a regular monomorphism: A direct calculation shows that a matrix is diagonal iff it commutes with $M := \bigl(\begin{smallmatrix} 1 & 0 \\ 0 & \lambda \end{smallmatrix}\bigr)$, so that $A \to B$ is the equalizer of the identity $B \to B$ and the conjugation $B \to B$, $X \mapsto M X M^{-1}$. Consider the homomorphism $A \to K$, $(a,b) \mapsto a$. We claim that $K \to K \sqcup_A B$ is not a monomorphism, because in fact, the pushout $K \sqcup_A B$ is zero: Since $A \to K$ is surjective with kernel $0 \times K$, the pushout is $B/\langle 0 \times K \rangle$, which is $0$ because $B$ is simple (<a href="https://math.stackexchange.com/questions/22629" target="_blank">proof</a>) or via a direct calculation with elementary matrices.'
);