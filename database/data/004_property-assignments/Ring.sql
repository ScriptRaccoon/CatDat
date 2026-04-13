INSERT INTO category_property_assignments (
	category_id,
	property_id,
	is_satisfied,
	reason
)
VALUES
(
	'Ring',
	'locally small',
	TRUE,
	'There is a forgetful functor $\mathbf{Ring} \to \mathbf{Set}$ and $\mathbf{Set}$ is locally small.'
),
(
	'Ring',
	'finitary algebraic',
	TRUE,
	'Take the algebraic theory of a ring.'
),
(
	'Ring',
	'strict terminal object',
	TRUE,
	'If $f : 0 \to R$ is a homomorphism, then $R$ satisfies $1=f(1)=f(0)=0$, so that $R=0$.'
),
(
	'Ring',
	'Malcev',
	TRUE,
	'This follows in the same way as for groups, see also Example 2.2.5 in <a href="https://ncatlab.org/nlab/show/Malcev,+protomodular,+homological+and+semi-abelian+categories" target="_blank">Malcev, protomodular, homological and semi-abelian categories</a>.'
),
(
	'Ring',
	'disjoint finite products',
	TRUE,
	'To show that $A \sqcup_{A \times B} B$ is trivial, let $R$ be a ring which admits homomorphisms $f : A \to R$, $g : B \to R$ with $f(p_1(a,b))=g(p_2(a,b))$ for all $(a,b) \in A \times B$, i.e. $f(a)=g(b)$. Applying this to $a=0$, $b=1$ yields $1=0$ in $R$.'
),
(
	'Ring',
	'balanced',
	FALSE,
	'The inclusion $\mathbb{Z} \hookrightarrow \mathbb{Q}$ is a counterexample.'
),
(
	'Ring',
	'cogenerating set',
	FALSE,
	'We apply <a href="/lemma/missing_cogenerating_sets">this lemma</a> to the collection of fields: If $F$ is a field and $R$ is a non-trivial ring, any ring homomorphism $F \to R$ is injective. For every infinite cardinal $\kappa$ the field of rational functions in $\kappa$ variables has cardinality $\geq \kappa$ and a non-trivial automorphism (swap two variables).'
),
(
	'Ring',
	'skeletal',
	FALSE,
	'This is trivial.'
),
(
	'Ring',
	'codistributive',
	FALSE,
	'If $\sqcup$ denotes the coproduct of rings (see <a href="https://math.stackexchange.com/questions/625874" target="_blank">MSE/625874</a> for their description) and $R$ is a ring, the canonical morphism $R \sqcup \mathbb{Z}^2 \to (R \sqcup \mathbb{Z})^2 = R^2$ is usually no isomorphism. For example, for $R = \mathbb{Z}[X]$ the coproduct on the LHS is not commutative, it has the ring presentation $\langle X,E : E^2=E \rangle$.'
),
(
	'Ring',
	'semi-strongly connected',
	FALSE,
	'There is no homomorphism between $\mathbb{F}_2$ and $\mathbb{F}_3$.'
),
(
	'Ring',
	'co-Malcev',
	FALSE,
	'See <a href="https://mathoverflow.net/questions/509552">MO/509552</a>: Consider the forgetful functor $U : \mathbf{Ring} \to \mathbf{Set}$ and the relation $R \subseteq U^2$ defined by $R(A) := \{(a,b) \in U(A)^2 : ab = a^2\}$. Both are representable: $U$ by $\mathbb{Z}[X]$ and $S$ by $\mathbb{Z} \langle X,Y \rangle / \langle XY-X^2 \rangle$. It is clear that $R$ is reflexive, but not symmetric.'
),
(
	'Ring',
	'coregular',
	FALSE,
	'Let $B := M_2(\mathbb{Q})$ and $A := \mathbb{Q}^2$. Then $A \to B$, $(x,y) \mapsto \mathrm{diag}(x,y)$ is a regular monomorphism: A direct calculation shows that a matrix is diagonal iff it commutes with $M := \bigl(\begin{smallmatrix} 1 & 0 \\ 0 & 2 \end{smallmatrix}\bigr)$, so that $A \to B$ is the equalizer of the identity $B \to B$ and the conjugation $B \to B$, $X \mapsto M X M^{-1}$. Consider the homomorphism $A \to K$, $(a,b) \mapsto a$. We claim that $K \to K \sqcup_A B$ is not a monomorphism, because in fact, the pushout $K \sqcup_A B$ is zero: Since $A \to K$ is surjective with kernel $0 \times K$, the pushout is $B/\langle 0 \times K \rangle$, which is $0$ because $B$ is simple (<a href="https://math.stackexchange.com/questions/22629" target="_blank">proof</a>) or via a direct calculation with elementary matrices.'
),
(
	'Ring',
	'regular quotient object classifier',
	FALSE,
	'We may copy the proof for the <a href="/category/CRing">category of commutative rings</a> (since the proof there did not use that $P$ is commutative).'
);