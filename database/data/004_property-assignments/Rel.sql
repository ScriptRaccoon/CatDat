INSERT INTO category_property_assignments (
	category_id,
	property_id,
	is_satisfied,
	reason
)
VALUES
(
	'Rel',
	'locally small',
	TRUE,
	'The set of morphisms $X \to Y$ is the set $P(X \times Y)$.'
),
(
	'Rel',
	'self-dual',
	TRUE,
	'There is an isomorphism $\mathbf{Rel} \to \mathbf{Rel}^{\mathrm{op}}$ that is the identity on objects (sets) and maps a relation $R \subseteq X \times Y$ to the opposite relation $R^o \subseteq Y \times X$ defined by $R^o := \{(y,x) : (x,y) \in R \}$.'
),
(
	'Rel',
	'pointed',
	TRUE,
	'The empty set is clearly both initial and terminal. The zero morphisms are the empty relations.'
),
(
	'Rel',
	'generator',
	TRUE,
	'One checks that the the one-point set is a generator.'
),
(
	'Rel',
	'coproducts',
	TRUE,
	'It is an easy exercise to deduce this from the corresponding fact for sets and that sets form a distributive category.'
),
(
	'Rel',
	'well-powered',
	TRUE,
	'Any relation $R : A \to B$ induces an injective map $P(A) \to P(B)$, so that in particular there is an injective map $A \to P(B)$.'
),
(
	'Rel',
	'balanced',
	TRUE,
	'See <a href="https://math.stackexchange.com/questions/5030393" target="_blank">MSE/5030393</a>.'
),
(
	'Rel',
	'biproducts',
	TRUE,
	'This is a consequence of the description of coproducts and products, both are disjoint unions (even for infinite families).'
),
(
	'Rel',
	'CIP',
	TRUE,
	'The canonical morphism from the coproduct to the product is the identity.'
),
(
	'Rel',
	'kernels',
	TRUE,
	'Let $R : A \to B$ be a relation. Define $K = \bigl\{a \in A : \neg \exists b \in B ((a,b) \in R) \bigr\}$. We have an inclusion map $I : K \to A$, which can also be regarded as relation, and $R \circ I = \empty$ is the empty relation, i.e. the zero morphism. It is easy to check the universal property.'
),
(
	'Rel',
	'quotients of congruences',
	TRUE,
	'Let $i : E \to X \times X$ be (a subobject corresponding to) a congruence.  Then:<br>
(a) The corresponding function $i_* : P(E) \to P(X) \times P(X)$ must be injective, preserve arbitrary unions, and have image equal to an equivalence relation on $P(X)$.<br>
(b) Since the symmetry morphism $s : E \to E$ satisfies $s^2 = \operatorname{id}$, it must be the graph of an involution on $E$.<br>
(c) For the reflexivity morphism $r : X \to E$, we must have $r_*$ of each singleton must be either a singleton or a pair.  To see this, it certainly cannot be empty, or its image under $i_*$ would be $(\emptyset, \emptyset)$.  If $r_*$ had more than two elements, then choose a chain of subsets with four elements.  That must map under $i_*$ to a chain of subsets of $(\{x\}, \{x\})$ with each image distinct, giving a contradiction.<br>
(d) Similarly, if $r_*$ of a singleton $\{ x \}$ is a pair, then one element of the pair must map under $i_*$ to $(\emptyset, \{ x \})$ and the other must map under $i_*$ to $(\{ x \}, \emptyset)$.  Since $s \circ r = r$ and $i \circ s = (p_2, p_1) \circ i$, we must have that $s$ maps each element to the other.  Otherwise, if $r_*$ of a singleton is a singleton, then the element of that singleton is a fixed point of $s$.<br>
(e) Suppose that under the equivalence relation on $P(X)$, we have $S \sim \emptyset$.  Then for any $x \in S$, we have $\{ x \} \sim \{ x \} \cup S = S \sim \emptyset$.  Using the fact that $i_*$ preserves unions for the inverse direction, this shows that $S \sim \emptyset$ if and only if $\{ x \} \sim \emptyset$ for every $x \in S$.<br>
(f) Suppose that $r_*(\{ x \}) = \{ e \}$.  We then claim that $\{ x \} \not\sim \emptyset$.  If so, then there would have to be some subset of $E$ which maps to $(\emptyset, \{ x \})$, and similarly to previous steps, this implies that subset of $E$ would have to be a singleton $\{ f_1 \}$.  Similarly, $(\{ x \}, \emptyset)$ would have to be the image of a singleton $\{ f_2 \}$.  But then $i_*(\{ f_1, f_2 \}) = (\{ x \}, \{ x \}) = i_*(\{ e \})$, contradicting the injectivity of $i_*$.<br>
(g) Now suppose that $i_*(\{ e \}) = (S, T)$ for $e \in E$.  Then $i_*(\{ s(e) \}) = (T, S)$, so $i_*(\{ e, s(e) \}) = (S\cup T, S\cup T) = i_*(\bigcup_{x\in S\cup T} r_*(\{ x \})$.  It follows that $\bigcup_{x\in S\cup T} r_*(\{ x \}) = \{ e, s(e) \}$.  Therefore, $E$ is covered by all the sets $r_*(\{ x \})$.<br>
(h) In summary, we can conclude that the equivalence relation on $P(X)$ is that $S \sim T$ if and only if $S \cap A = T \cap A$ where $A$ is the set of $x\in X$ such that $r_*(\{ x \})$ is a singleton. This implies that $A$ is a quotient for the congruence, with quotient morphism $X \to A$ given by the relation $\Delta_A \subseteq A\times A \subseteq X\times A$.'
),
(
	'Rel',
	'preadditive',
	FALSE,
	'In categories with finite products and finite coproducts, the preadditive structure <a href="/lemma/preadditive_structure_unique">is unique</a> if it exists. In the case of $\mathbf{Rel}$, where both products and coproducts are just disjoint unions, this operation is just the set-theoretic union $f+g = f \cup g$ of relations. This clearly has no inverses.'
),
(
	'Rel',
	'Cauchy complete',
	FALSE,
	'See <a href="https://math.stackexchange.com/a/5030380/1650" target="_blank">MSE/1931577</a>.'
),
(
	'Rel',
	'skeletal',
	FALSE,
	'This is trivial.'
),
(
	'Rel',
	'normal',
	FALSE,
	'The construction of equalizers in $\mathbf{Rel}$ shows that they are injective functions, but <a href="https://math.stackexchange.com/questions/350716" target="_blank">MSE/350716</a> shows that monomorphisms in $\mathbf{Rel}$ don''t have to be functions.'
);
