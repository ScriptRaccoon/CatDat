CREATE TEMP TABLE category_non_properties (
    category_id TEXT NOT NULL,
    property_id TEXT NOT NULL,
    reason TEXT
);

INSERT INTO category_non_properties (
	category_id,
	property_id,
	reason
)
VALUES
	-- basic categories
	(
		'Set',
		'strict terminal object',
		'trivial'
	),
	(
		'Set',
		'skeletal',
		'trivial'
	),
	(
		'Set',
		'Malcev',
		'There are lots of non-symmetric reflexive relations.'
	),
	(
		'Ab',
		'split abelian',
		'The short exact sequence $0 \xrightarrow{} \mathbb{Z} \xrightarrow{p} \mathbb{Z} \xrightarrow{} \mathbb{Z}/p \xrightarrow{} 0$ does not split. '
	),
	(
		'Ab',
		'skeletal',
		'trivial'
	),
	(
		'Top',
		'cartesian closed',
		'The functor $\mathbb{Q} \times - : \mathbf{Top} \to \mathbf{Top}$ does not preserve colimits, hence has no right adjoint. See <a href="https://math.stackexchange.com/questions/2969372" target="_blank">MSE/2969372</a> for a proof.'
	),
	(
		'Top',
		'locally presentable',
		'In fact, it does not have any small dense subcategory by <a href="https://math.stackexchange.com/questions/4097315/" target="_blank">MSE/4097315</a>. For a related result, see <a href="https://mathoverflow.net/questions/288648" target="_blank">MO/288648</a>.'
	),
	(
		'Top',
		'strict terminal object',
		'trivial'
	),
	(
		'Top',
		'balanced',
		'If $X$ is a set, consider the discrete space $X_d$ on $X$ and the indiscrete space $X_i$ on $X$. The identity map $X \to X$ lifts to a continuous map $X_d \to X_i$, which is bijective and therefore both a mono- and an epimorphism, but it is not an isomorphism unless $X$ has at most one element.'
	),
	(
		'Top',
		'exact filtered colimits',
		NULL
	),
	(
		'Top',
		'skeletal',
		'trivial'
	),
	(
		'Top',
		'Malcev',
		'This is clear since $\mathbf{Set}$ is not Malcev and can be interpreted as the subcategory of discrete spaces.'
	),
	(
		'Grp',
		'subobject classifier',
		'If there was a subgroup classifier $\Omega$, every subgroup of any group would be the kernel of a homomorphism to $\Omega$. But not every subgroup is normal.'
	),
	(
		'Grp',
		'cogenerator',
		'Assume there is a group $Q$ that cogenerates. Take an infinite simple group $G$ larger than $Q$ (w.r.t. cardinalities), for example an infinite alternating group. Then every homomorphism $G \to Q$ is trivial. Since $Q$ cogenerates, $G$ is trivial, a contradiction.'
	),
	(
		'Grp',
		'biproducts',
		'If $\sqcup$ denotes the coproduct, the canonical homomorphism $\mathbb{Z} \sqcup \mathbb{Z} \to \mathbb{Z} \times \mathbb{Z}$ is not an isomorphism, since $\mathbb{Z} \sqcup \mathbb{Z}$ is the free group on two generators and therefore not commutative.'
	),
	(
		'Grp',
		'skeletal',
		'trivial'
	),
	(
		'Vect',
		'trivial',
		'trivial'
	),
	(
		'Vect',
		'skeletal',
		'trivial'
	),
	(
		'Ring',
		'strict initial object',
		'The homomorphism $p_1 : \mathbb{Z} \times \mathbb{Z} \to \mathbb{Z}$ is not an isomorphism, and $\mathbb{Z}$ is initial.'
	),
	(
		'Ring',
		'balanced',
		'The inclusion $\mathbb{Z} \hookrightarrow \mathbb{Q}$ is a counterexample.'
	),
	(
		'Ring',
		'cogenerator',
		'Assume that there is a ring $Q$ that cogenerates. Clearly, $Q$ is non-zero. Take an infinite field $F$ which is larger than $Q$ and admits a non-trivial automorphism (for example, a field of rational functions). Then there is no ring homomorphism $F \to Q$. Since $Q$ cogenerates, this implies that all homomorphisms $F \to F$ are equal, a contradiction.'
	),
	(
		'Ring',
		'skeletal',
		'trivial'
	),
	(
		'Ring',
		'codistributive',
		'If $\sqcup$ denotes the coproduct of rings (see <a href="https://math.stackexchange.com/questions/625874" target="_blank">MSE/625874</a> for their description) and $R$ is a ring, the canonical morphism $R \sqcup \mathbb{Z}^2 \to (R \sqcup \mathbb{Z})^2 = R^2$ is usually no isomorphism. For example, for $R = \mathbb{Z}[X]$ the coproduct on the LHS is not commutative, it has the ring presentation $\langle X,E : E^2=E \rangle$.'
	),
	(
		'Alg(R)',
		'strict initial object',
		'The homomorphism $p_1 : R \times R \to R$ is not an isomorphism, and $R$ is initial.'
	),
	(
		'Alg(R)',
		'balanced',
		'Take a prime ideal $P \subseteq R$ and consider the $R$-algebra $A := R/P$ (which is an integral domain). Then the inclusion $A \hookrightarrow Q(A)$ is a counterexample.'
	),
	(
		'Alg(R)',
		'skeletal',
		'trivial'
	),
	(
		'Alg(R)',
		'cogenerator',
		'Assume that there is a $R$-algebra $Q$ that cogenerates. Clearly, $Q$ is non-zero. Take an infinite field $F$ which has a $R$-algebra structure, is larger than $Q$ and admits a non-trivial automorphism (for example, a field of rational functions over some residue field of $R$). Then there is no algebra homomorphism $F \to Q$. Since $Q$ cogenerates, this implies that all homomorphisms $F \to F$ are equal, a contradiction.'
	),
	(
		'Alg(R)',
		'codistributive',
		'If $\sqcup$ denotes the coproduct of $R$-algebras (see <a href="https://math.stackexchange.com/questions/625874" target="_blank">MSE/625874</a> for their description) and $A$ is an $R$-algebra, the canonical morphism $A \sqcup R^2 \to (A \sqcup R)^2 = A^2$ is usually no isomorphism. For example, for $A = R[X]$ the coproduct on the LHS is not commutative, it has the algebra presentation $\langle X,E : E^2=E \rangle$.'	
	),
	(
		'CRing',
		'strict initial object',
		'The homomorphism $p_1 : \mathbb{Z} \times \mathbb{Z} \to \mathbb{Z}$ is not an isomorphism, and $\mathbb{Z}$ is initial.'
	),
	(
		'CRing',
		'balanced',
		'The inclusion $\mathbb{Z} \hookrightarrow \mathbb{Q}$ is a counterexample.'
	),
	(
		'CRing',
		'cogenerator',
		'Assume that there is a commutative ring $Q$ that cogenerates. Clearly, $Q$ is non-zero. Take an infinite field $F$ which is larger than $Q$ and admits a non-trivial automorphism (for example, a field of rational functions). Then there is no ring homomorphism $F \to Q$. Since $Q$ cogenerates, this implies that all homomorphisms $F \to F$ are equal, a contradiction.'
	),
	(
		'CRing',
		'skeletal',
		'trivial'
	),
	(
		'CRing',
		'infinitary codistributive',
		'The canonical homomorphism $\mathbb{Q} \otimes \mathbb{Z}^{\mathbb{N}} \to (\mathbb{Q} \otimes \mathbb{Z})^{\mathbb{N}} = \mathbb{Q}^{\mathbb{N}}$ is not an isomorphism: its image consists of those sequences of rational numbers whose denominators can be bounded.'
	),
	(
		'CAlg(R)',
		'strict initial object',
		'The homomorphism $p_1 : R \times R \to R$ is not an isomorphism, and $R$ is initial.'
	),
	(
		'CAlg(R)',
		'balanced',
		'Take a prime ideal $P \subseteq R$ and consider the commutative $R$-algebra $A := R/P$ (which is an integral domain). Then the inclusion $A \hookrightarrow Q(A)$ is a counterexample.'
	),
	(
		'CAlg(R)',
		'cogenerator',
		'Assume that there is a commutative $R$-algebra $Q$ that cogenerates. Clearly, $Q$ is non-zero. Take an infinite field $F$ which admits an $R$-algebra structure, is larger than $Q$ and admits a non-trivial automorphism (for example, a field of rational functions over some residue field of $R$). Then there is no homomorphism $F \to Q$. Since $Q$ cogenerates, this implies that all homomorphisms $F \to F$ are equal, a contradiction.'
	),
	(
		'CAlg(R)',
		'skeletal',
		'trivial'
	),
	(
		'CAlg(R)',
		'infinitary codistributive',
		'The canonical homomorphism $A \otimes_R R^{\mathbb{N}} \to A^{\mathbb{N}}$ is given by $a \otimes (r_n)_n \mapsto (r_n a)_n$ and does not have to be surjective: Since $R \neq 0$, there is a commutative $R$-algebra $K$ which is a field. Now take $A := K[X]$ and consider the sequence $(X^n)_{n} \in A^{\mathbb{N}}$.'
	),
	(
		'Rng',
		'balanced',
		'The inclusion $\mathbb{Z} \hookrightarrow \mathbb{Q}$ is a counterexample. (The proof can be reduced to the unital case.)'
	),
	(
		'Rng',
		'cogenerator',
		'Assume that there is a rng $Q$ that cogenerates. Clearly, $Q$ is non-zero. Take an infinite field $F$ which is larger than $Q$ and admits a non-trivial automorphism (for example, a field of rational functions). Then every rng homomorphism $f : F \to Q$ is zero: If $e := f(1)$, then $e$ is idempotent and $f$ corestricts to a ring homomorphism $f : F \to eQ$. Since $F$ is a field but $f$ cannot be injective, we must have $eQ = 0$, so that $e = 0$ and $f = 0$. Since $Q$ cogenerates, this implies that all homomorphisms $F \to F$ are equal, a contradiction.'
	),
	(
		'Rng',
		'skeletal',
		'trivial'
	),
	(
		'Rng',
		'biproducts',
		'If $\sqcup$ denotes the coproduct and $(X)$ the free rng on one generator (integer polynomials without constant term), the canonical homomorphism $(X) \sqcup (Y) \to (X) \times (Y)$ is not an isomorphism, since $(X) \sqcup (Y)$ is the free rng on two generators and therefore not commutative.'
	),
	(
		'Set*',
		'skeletal',
		'trivial'
	),
	(
		'Set*',
		'Malcev',
		'There are lots of pointed reflexive relations that are not symmetric, for example $\{(a,b) \in \mathbb{N} : a \leq b\}$ on $(\mathbb{N},0)$.'
	),
	(
		'Set*',
		'biproducts',
		'Binary coproducts are wedge sums $\vee$, so the canonical map $X \vee Y \to X \times Y$ is injective, but in most cases not surjective.'
	),
	(
		'Mon',
		'balanced',
		'The inclusion of additive monoids $\mathbb{N} \hookrightarrow \mathbb{Z}$ is a counterexample.'
	),
	(
		'Mon',
		'cogenerator',
		'Assume there is a monoid $Q$ that cogenerates. Take an infinite simple group $G$ larger than $Q$ (w.r.t. cardinalities), for example an infinite alternating group. Then every monoid homomorphism $G \to Q$ is trivial: it corestricts to a group homomorphism $G \to Q^{\times}$, so its kernel must be all of $G$. Since $Q$ cogenerates, $G$ is trivial, a contradiction.'
	),
	(
		'Mon',
		'skeletal',
		'trivial'
	),
	(
		'Mon',
		'Malcev',
		'Consider the submonoid $\{(a,b) : a \leq b \}$ of $\mathbb{N}^2$.'
	),
	(
		'Mon',
		'biproducts',
		'If $\sqcup$ denotes the coproduct, the canonical homomorphism $\mathbb{N} \sqcup \mathbb{N} \to \mathbb{N} \times \mathbb{N}$ is not an isomorphism, since $\mathbb{N} \sqcup \mathbb{N}$ is the free monoid on two generators and therefore not commutative.'
	),
	(
		'CMon',
		'preadditive',
		'In categories with finite products and coproducts, the preadditive structure is <i>unique</i>: If $f,g : A \to B$ are morphisms, their sum $f+g : A \to B$ is the composite of $(f,g) : A \to B \times B$, the inverse of the canonical morphism $B \oplus B \to B \times B$ (which indeed must be an isomorphism), and the codiagonal $B \oplus B \to B$. In the case of $\mathbf{CMon}$, this is just the pointwise addition of maps, and this is indeed an enrichment of $\mathbf{CMon}$ over itself. But not over $\mathbf{Ab}$, since for example $\mathrm{Hom}(\mathbb{N},\mathbb{N}) \cong \mathbb{N}$ (with respect to addition) is not a group.'
	),
	(
		'CMon',
		'balanced',
		'The inclusion of additive monoids $\mathbb{N} \hookrightarrow \mathbb{Z}$ is a counterexample.'
	),
	(
		'CMon',
		'skeletal',
		'trivial'
	),
	(
		'CMon',
		'Malcev',
		'Consider the submonoid $\{(a,b) : a \leq b \}$ of $\mathbb{N}^2$.'
	),
	(
		'CMon',
		'cogenerator',
		'See <a href="https://mathoverflow.net/questions/509232" target="_blank">MO/509232</a>.'
	),
	(
		'Pos',
		'strict terminal object',
		'trivial'
	),
	(
		'Pos',
		'finitary algebraic',
		NULL
	),
	(
		'Pos',
		'balanced',
		'Consider any set $X$ with $ \geq 2$ elements and the identity map $(X,\Delta_X) \to (X, X \times X)$. It is is bijective but no isomorphism.'
	),
	(
		'Pos',
		'skeletal',
		'trivial'
	),
	(
		'Pos',
		'Malcev',
		'Consider the subposet $\{(a,b) : a \leq b \}$ of $\mathbb{N}^2$.'
	),
	(
		'Pos',
		'locally cartesian closed',
		'See §2 of <a href="http://www.tac.mta.ca/tac/volumes/8/n2/8-02abs.html" target="_blank">Niefield 2001</a>.'
	),
	(
		'M-Set',
		'strict terminal object',
		'Take any set $X$ with an element $x \in X$, endow $X$ with the trivial $M$-action. Then the morphism $x : 1 \to X$ is only an isomorphism when $X = \{x\}$.'
	),
	(
		'M-Set',
		'skeletal',
		'trivial'
	),
	(
		'M-Set',
		'Malcev',
		'Endow the set $\mathbb{N}$ with the trivial $M$-action, and consider the subset $\{(a,b) : a \leq b \}$ of $\mathbb{N}^2$.'
	),
	(
		'R-Mod',
		'split abelian',
		'By assumption, $R$ is not semisimple, so that there is a non-projective $R$-module, which yields a non-split sequence.'
	),
	(
		'R-Mod',
		'skeletal',
		'trivial'
	),
	(
		'R-Mod_div',
		'skeletal',
		'trivial'
	),
	(
		'R-Mod_div',
		'trivial',
		'trivial'
	),
	(
		'Rel',
		'preadditive',
		'In categories with finite products and coproducts, the preadditive structure is <i>unique</i>: If $f,g : A \to B$ are morphisms, their sum $f+g : A \to B$ is the composite of $(f,g) : A \to B \times B$, the inverse of the canonical morphism $B \oplus B \to B \times B$ (which indeed must be an isomorphism), and the codiagonal $B \oplus B \to B$. In the case of $\mathbf{Rel}$, where both products and coproducts are just disjoint unions, this operation is just the set-theoretic union $f+g = f \cup g$ of relations. This clearly has no inverses.'
	),
	(
		'Rel',
		'Cauchy complete',
		'See <a href="https://math.stackexchange.com/a/5030380/1650" target="_blank">MSE/1931577</a>.'
	),
	(
		'Rel',
		'skeletal',
		'trivial'
	),

	-- categories of "finite" objects
	(
		'FinSet',
		'small',
		'Even the collection of all singletons is not a set.'
	),
	(
		'FinSet',
		'strict terminal object',
		'trivial'
	),
	(
		'FinSet',
		'sequential colimits',
		'Let $[n] := \{1,\dotsc,n\}$. Assume the sequence of inclusion maps $[1] \to [2] \to \cdots$ has a colimit $X$ in $\mathbf{FinSet}$ with maps $f_n : [n] \to X$. Let $n_0 \geq 1$ be fixed. I claim that $f_{n_0}$ is injective, which will then yield a contradiction by taking $n_0 > \mathrm{card}(X)$. For $n \geq 1$ define $g_n : [n] \to [n_0]$ as follows. For $n \leq n_0$ it is the inclusion, and for $n \geq n_0$ it is the projection which keeps all elements of $[n_0]$ and maps all other elements to $n_0$. Observe that $g_{n+1} |_{[n]} = g_n$. Hence, there is a unique map $g : X \to [n_0]$ with $g \circ f_n = g_n$ for all $n$. For $n = n_0$ this shows $g \circ f_{n_0} = \mathrm{id}_{[n_0]}$, and $f_{n_0}$ is injective.'
	),
	(
		'FinSet',
		'sequential limits',
		'Let $[n] := \{1,\dotsc,n\}$. We define the projection $p_n : [n+1] \to [n]$ by extending the identity of $[n]$ with $p_n(n+1) := n$. Assume the sequence of projections $\cdots \to [2] \to [1]$ has a limit $X$ in $\mathbf{FinSet}$ with maps $f_n : X \to [n]$. Let $n_0 \geq 1$ be fixed. I claim that $f_{n_0}$ is surjective, which will then yield a contradiction by taking $n_0 > \mathrm{card}(X)$. For $n \geq 1$ define $g_n : [n_0] \to [n]$ as follows. For $n \leq n_0$ it is the projection, and for $n \geq n_0$ it is the inclusion. Observe that $p_n \circ g_{n+1} = g_n$. Hence, there is a unique map $g : [n_0] \to X$ with $f_n \circ g = g_n$ for all $n$. For $n = n_0$ this shows $f_{n_0} \circ g = \mathrm{id}_{[n_0]}$, and $f_{n_0}$ is surjective.'
	),
	(
		'FinSet',
		'skeletal',
		'trivial'
	),
	(
		'FinSet',
		'Malcev',
		'There are lots of non-symmetric reflexive relations.'
	),
	(
		'FinAb',
		'small',
		'Even the collection of trivial groups is not small.'
	),
	(
		'FinAb',
		'generator',
		'If $A,B$ are finite abelian groups whose orders are coprime, then we know that $\hom(A,B)$ is trivial. But a generator would admit a non-trivial homomorphism to any other non-trivial finite abelian group.'
	),
	(
		'FinAb',
		'split abelian',
		'The sequence $0 \to \mathbb{Z}/2 \to \mathbb{Z}/4 \to \mathbb{Z}/2 \to 0$ does not split.'
	),
	(
		'FinAb',
		'countable products',
		'Assume that the product $P := \mathbb{Z}/2 \times \mathbb{Z}/2 \times \cdots$ exists. Since products are associative, we conclude $P \cong \mathbb{Z}/2 \times P$. By induction, we get $P \cong (\mathbb{Z}/2)^n \times P$ for all $n$. But then $P$ has at least $2^n$ elements, which contradicts finiteness of $P$.'
	),
	(
		'FinAb',
		'skeletal',
		'There are many trivial and hence isomorphic groups which are not equal.'
	),
	(
		'Abfg',
		'small',
		'Even the collection of trivial groups is not small.'
	),
	(
		'Abfg',
		'cogenerator',
		'Let $Q$ be a finitely generated abelian group. By their well-known classification, we have $Q = F \oplus T$ for a free abelian group $F$ and a finite abelian group $T$. Let $p$ be a prime number which does not divide the order of $T$. Then $\hom(\mathbb{Z}/p, Q) = 0$, but $\mathbb{Z}/p \neq 0$. Therefore, $Q$ is no cogenerator.'
	),
	(
		'Abfg',
		'split abelian',
		'The short exact sequence $0 \xrightarrow{} \mathbb{Z} \xrightarrow{p} \mathbb{Z} \xrightarrow{} \mathbb{Z}/p \xrightarrow{} 0$ does not split.'
	),
	(
		'Abfg',
		'countable products',
		'For $n \geq 1$ set $A_n = \mathbb{Z}$. Assume that these groups have a product $P$ in this category. Since products are associative, we have $P \cong \mathbb{Z} \times P$. Induction yields $P \cong \mathbb{Z}^n \times P$ for all $n$. But then the rank of $P$ cannot be finite.'
	),
	(
		'Abfg',
		'countable coproducts',
		'For $n \geq 1$ set $A_n = \mathbb{Z}$. Assume that these groups have a coproduct $C$ in this category. Since coproducts are associative, we have $C \cong \mathbb{Z} \oplus C$. Induction yields $C \cong \mathbb{Z}^{\oplus n} \oplus C$ for all $n$. But then the rank of $C$ cannot be finite.'
	),
	(
		'Abfg',
		'skeletal',
		'trivial'
	),
	(
		'B',
		'small',
		'Even the collection of singletons is not small.'
	),
	(
		'B',
		'connected',
		'For every $n \geq 0$ there is a connected component of sets of size $n$.'
	),
	(
		'B',
		'generator',
		'trivial'
	),
	(
		'B',
		'essentially finite',
		'trivial'
	),
	(
		'B',
		'skeletal',
		'trivial'
	),
	(
		'FI',
		'small',
		'Even the collection of all singletons is not small.'
	),
	(
		'FI',
		'cogenerator',
		'Let $Q$ be finite set. When $Q$ is empty, it is clearly no cogenerator. Otherwise, $Q + 1$ has at least two elements, so that there are two different morphisms $1 \to Q + 1$. But there is no morphism $Q + 1 \to Q$ at all. Hence, $Q$ is no cogenerator.'
	),
	(
		'FI',
		'binary products',
		'Assume that two finite sets $X,Y$ have a product $P$ in this category. Elements of $P$ are the same as maps $1 \to P$, and they are automatically injective. Therefore, $P \cong \hom(1,P) \times \hom(1,X) \times \hom(1,Y) \cong X \times Y$, and the projections must agree as well. But they are usually not injective.' 
	),
	(
		'FI',
		'sequential colimits',
		'Let $[n] := \{1,\dotsc,n\}$. Assume the sequence of inclusion maps $[1] \to [2] \to \cdots$ has a colimit $X$ in this category with maps $f_n : [n] \to X$. But $f_n$ must be an injective map, so that $\mathrm{card}(X) \geq n$ for all $n$. Since $X$ is finite, this is a contradiction.'
	),
	(
		'FI',
		'essentially finite',
		'trivial'
	),
	(
		'FI',
		'skeletal',
		'trivial'
	),
	(
		'FS',
		'small',
		'Even the collection of all singletons is not small.'
	),
	(
		'FS',
		'connected',
		'If $f : \emptyset \to X$ is surjective, then $X = \emptyset$, and if $f : X \to \emptyset$ is any map, then also $X = \emptyset$. This shows that $\{ \emptyset \}$ is a connected component in this category.'
	),
	(
		'FS',
		'generator',
		'Let $G$ be a finite set. There are at least two morphisms $G + 2 \to 2$, but there is no morphism $G \to G + 2$ at all. Hence, $G$ is not a generator.'
	),
	(
		'FS',
		'sequential limits',
		'Let $[n] := \{1,\dotsc,n\}$. We define the projection $p_n : [n+1] \to [n]$ by extending the identity of $[n]$ with $p_n(n+1) := n$. Assume the sequence of projections $\cdots \to [2] \to [1]$ has a limit $X$ in this category with maps $f_n : X \to [n]$. But $f_n$ is surjective, so that $\mathrm{card}(X) \geq n$ for all $n$. Since $X$ is finite, this is a contradiction.'
	),
	(
		'FS',
		'pullbacks',
		'The connected component of non-empty sets has a terminal object, $1$, and it suffices to prove that it has no products. Let $X$ be a finite set with more than $1$ element. Assume that the product $P$ of $X$ with itself exists. The diagonal $X \to P$ is a split monomorphism, hence injective, but also surjective, i.e. an isomorphism. In other words, the two projections $P \to X$ are equal. The universal property of $P$ now implies that all morphisms $Y \to X$ are equal, which is absurd.'
	),
	(
		'FS',
		'essentially finite',
		'trivial'
	),
	(
		'FS',
		'skeletal',
		'trivial'
	),

	(
		'FinOrd',
		'small',
		'Even the collection of all singleton orders is not small.'
	),
	(
		'FinOrd',
		'binary coproducts',
		NULL
	),
	(
		'FinOrd',
		'strict terminal object',
		'trivial'
	),
	(
		'FinOrd',
		'subobject classifier',
		NULL
	),
	(
		'FinOrd',
		'cartesian closed',
		NULL
	),
	(
		'FinOrd',
		'sequential colimits',
		NULL
	),
	(
		'FinOrd',
		'countable products',
		NULL
	),
	(
		'FinOrd',
		'skeletal',
		'trivial'
	),
	(
		'FinOrd',
		'Malcev',
		NULL
	),

	-- tiny categories
	(
		'0',
		'inhabited',
		'trivial'
	),
	(
		'2',
		'connected',
		'The objects $0$, $1$ have no zig-zag path between them.'
	),
	(
		'walking_morphism',
		'subobject classifier',
		NULL
	),

	(
		'walking_pair',
		'initial object',
		'$0$ is not initial since it has two morphisms to $1$, and $1$ has not initial since it has no morphism to $0$.'
	),
	(
		'walking_pair',
		'zero morphisms',
		'Assume that $a : 0 \to 1$ is the zero morphism from $0$ to $1$, and the other morphism is $b$. The identity of $0$ must be the zero morphism from $0$ to $0$. But then $b = b \circ \mathrm{id}_0 = b \circ 0_{0,0} = 0_{0,1} = a$, a contradiction.'
	),
	(
		'walking_pair',
		'binary products',
		'We cannot have $0 \times 1 = 1$ since there is no morphism $1 \to 0$. So assume $0 \times 1 = 0$, say with projections $\mathrm{id}_0 : 0 \to 0$ and $a : 0 \to 1$. By applying the universal property to  $\mathrm{id}_0 : 0 \to 0$ and the other morphism $b : 0 \to 1$, it immediately follows $a=b$, which is a contradiction.'
	),
	(
		'walking_pair',
		'equalizers',
		'The two morphisms $a,b : 0 \rightrightarrows 1$ have no equalizer, since it would have to be the identity of $0$, but $a \neq b$.'
	),
	(
		'walking_pair',
		'pullbacks',
		'The two morphisms $a,b : 0 \rightrightarrows 1$ have no pullback, since it would to consist of identities $0 \leftarrow 0 \rightarrow 0$, but $a \neq b$.'
	),
	(
		'walking_isomorphism',
		'skeletal',
		'The two objects are isomorphic, but different.'
	),

	-- geometric categories
	(
		'Sh(X)',
		'strict terminal object',
		'Take any set $A$ with $ > 1$ elements. Consider the constant sheaf $\underline{A}$. Morphisms $1 \to \underline{A}$ corresponds to global sections of $\underline{A}$, i.e. locally constant functions $X \to A$. There is such a function since $A$ is non-empty. If $1$ was strict, $1 \to \underline{A}$ would be an isomorphism, so that there is a unique locally constant function $X \to A$, and hence a unique constant function, which is absurd.'
	),
	(
		'Sh(X)',
		'Malcev',
		'Consider the subsheaf of $\underline{\mathbb{Z}} \times \underline{\mathbb{Z}}$ consisting of locally constant functions $(f,g) : X \to \mathbb{Z} \times \mathbb{Z}$ with $f \leq g$ pointwise. This is reflexive, but not symmetric.'
	),
	(
		'Sh(X)',
		'skeletal',
		'Consider constant sheaves for isomorphic but non-equal sets.'
	),
	(
		'Sh(X,Ab)',
		'trivial',
		'Consider constant sheaves for non-isomorphic abelian groups.'
	),
	(
		'Sh(X,Ab)',
		'skeletal',
		'Consider constant sheaves for isomorphic but non-equal abelian groups.'
	),
	(
		'sSet',
		'strict terminal object',
		NULL
	),
	(
		'sSet',
		'skeletal',
		'trivial'
	),
	(
		'sSet',
		'Malcev',
		NULL
	),
(
		'Met',
		'sequential limits',
		NULL
	),
	(
		'Met',
		'finite coproducts',
		'See <a href="https://math.stackexchange.com/questions/1778408" target="_blank">MSE/1778408</a>. We only get coproducts when allowing $\infty$ as a distance, as in $\mathbf{Met}_{\infty}$.'
	),
	(
		'Met',
		'strict terminal object',
		'trivial'
	),
	(
		'Met',
		'balanced',
		'The inclusion $\mathbb{Q} \hookrightarrow \mathbb{R}$ is a counterexample; it is an epimorphism since $\mathbb{Q}$ is dense in $\mathbb{R}$.'
	),
	(
		'Met',
		'cartesian closed',
		NULL
	),
	(
		'Met',
		'essentially small',
		'trivial'
	),
	(
		'Met',
		'exact filtered colimits',
		'Remark 2.7 in <a href="https://arxiv.org/abs/2006.01399" target="_blank">this paper</a>'
	),
	(
		'Met',
		'skeletal',
		'trivial'
	),
	(
		'Met',
		'Malcev',
		'Consider the metric subspace $\{(a,b) \in \mathbb{R}^2 : a \leq b\}$ of $\mathbb{R}^2$.'
	),
	(
		'Met_oo',
		'strict terminal object',
		'trivial'
	),
	(
		'Met_oo',
		'balanced',
		'The inclusion $\mathbb{Q} \hookrightarrow \mathbb{R}$ provides a counterexample.'
	),
	(
		'Met_oo',
		'cartesian closed',
		NULL
	),
	(
		'Met_oo',
		'exact filtered colimits',
		'2.7 in <a href="https://arxiv.org/abs/2006.01399" target="_blank">this paper</a>'
	),
	(
		'Met_oo',
		'skeletal',
		'trivial'
	),
	(
		'Met_oo',
		'Malcev',
		NULL
	),
	(
		'Met_c',
		'products',
		'See <a href="https://math.stackexchange.com/questions/139168" target="_blank">MSE/139168</a> for a proof that uncountable products do not exist.'
	),
	(
		'Met_c',
		'strict terminal object',
		'trivial'
	),
	(
		'Met_c',
		'balanced',
		'The inclusion $\mathbb{Q} \hookrightarrow \mathbb{R}$ provides a counterexample.'
	),
	(
		'Met_c',
		'cartesian closed',
		NULL
	),
	(
		'Met_c',
		'skeletal',
		'trivial'
	),
	(
		'Met_c',
		'Malcev',
		'Consider the metric subspace $\{(a,b) \in \mathbb{R}^2 : a \leq b\}$ of $\mathbb{R}^2$.'
	),

	(
		'LRS',
		'cartesian closed',
		NULL
	),
	(
		'LRS',
		'strict terminal object',
		'This is because $\mathbf{CRing}$ does not have a strict initial object.'
	),
	(
		'LRS',
		'balanced',
		'The canonical morphism $\mathrm{Spec}(\mathbb{Z}/2 \times \mathbb{Z}[1/2]) \longrightarrow \mathrm{Spec}(\mathbb{Z})$ is a mono- and an epimorphism, but no isomorphism.'
	),
	(
		'LRS',
		'skeletal',
		'trivial'
	),
	(
		'LRS',
		'Malcev',
		'This is because the category of schemes already is not Malcev.'
	),
	(
		'Sch',
		'pushouts',
		'The span $\mathbb{A}^1 \leftarrow \mathrm{Spec}(k(t)) \rightarrow \mathbb{A}^1$ has no pushout, see <a href="https://mathoverflow.net/questions/9961" target="_blank">MO/9961</a>.'
	),
	(
		'Sch',
		'countable products',
		'While all diagrams of affine schemes have a limit in the category of schemes, one can show that an infinite product of quasi-compact non-empty schemes only exists when almost all of them are affine, see <a href="https://mathoverflow.net/questions/65506" target="_blank">MO/65506</a>. Thus, for example the infinite power $(\mathbb{P}^1)^{\mathbb{N}}$ does not exist in $\mathbf{Sch}$.'
	),
	(
		'Sch',
		'cartesian closed',
		NULL
	),
	(
		'Sch',
		'strict terminal object',
		'This is because $\mathbf{CRing}$ does not have a strict initial object.'
	),
	(
		'Sch',
		'balanced',
		'The canonical morphism $\mathrm{Spec}(\mathbb{Z}/2 \times \mathbb{Z}[1/2]) \longrightarrow \mathrm{Spec}(\mathbb{Z})$ is a mono- and an epimorphism, but no isomorphism.'
	),
	(
		'Sch',
		'skeletal',
		'trivial'
	),
	(
		'Sch',
		'Malcev',
		'Consider the subscheme $V(x-y) \cup V(y) \subseteq \mathbb{A}^2$. It contains the diagonal but it is not symmetric.'
	),
	(
		'Z',
		'locally essentially small',
		NULL
	),
	(
		'Z',
		'strict terminal object',
		'This is because $\mathbf{CRing}$ does not have a strict initial object.'
	),
	(
		'Z',
		'skeletal',
		'trivial'
	),
	(
		'Z',
		'Malcev',
		NULL
	),

	-- thin categories
	(
		'N',
		'countable coproducts',
		'The numbers $0,1,2,\dotsc$ have no supremum, i.e. no coproduct.'
	),
	(
		'N',
		'essentially finite',
		'trivial'
	),
	(
		'On',
		'terminal object',
		'There is no largest ordinal $\alpha$ since $\alpha + 1$ will always be larger.'
	),
	(
		'On',
		'well-copowered',
		'The "quotients" of $0$ are all ordinals.'
	),
	(
		'real_interval',
		'essentially finite',
		'trivial'
	),
	(
		'real_interval',
		'locally finitely presentable',
		'It suffices to prove that $0$ (the initial object) is the only finitely presentable object. If $s > 0$, then $s = \sup_{n \in \mathbb{N}, \, s \geq 1/n } (s - 1/n)$, but there is no $n$ with $s \leq s - 1/n$.'
	),
	(
		'Zdiv',
		'essentially finite',
		'The non-negative integers are pairwise non-isomorphic in this category.'
	),
	(
		'Zdiv',
		'skeletal',
		'The integers $+1$ and $-1$ are isomorphic, but not equal.'
	),
	(
		'Zdiv',
		'self-dual',
		'The only integer with infinitely many divisors (up to isomorphism) is $0$. But many integers have infinitely many multiples (up to isomorphism).'
	),
	(
		'Zdiv',
		'infinitary distributive',
		'We have $2 \times \coprod_n 3^n = \gcd(2,\mathrm{lcm}_n(3^n)) = \gcd(2,0) = 2$, but $\coprod_n (2 \times 3^n) = \mathrm{lcm}_n \gcd(2,3^n) = \mathrm{lcm}_n 1  = 1$.'
	),
	(
		'Zdiv',
		'infinitary codistributive',
		'If $p$ runs through all odd primes, we have $2 \sqcup \prod_p p = \mathrm{lcm}(2,\mathrm{gcd}_p p) = \mathrm{lcm}(2,0) = 0$, but $\prod_p (2 \sqcup p) = \gcd_p (\mathrm{lcm}(2,p)) = \gcd_p (2 \cdot p) = 2$.'
	),
	(
		'Noo',
		'essentially finite',
		'trivial'
	),
	(
		'Noo',
		'self-dual',
		'every upper set is infinite, but every lower set is finite'
	),

	-- deloopings
	(
		'BG',
		'trivial',
		'trivial'
	),
	(
		'BG',
		'essentially finite',
		'This is because we choose $G$ to be infinite.'
	),
	(
		'BGf',
		'trivial',
		'trivial'
	),
	(
		'BN',
		'essentially finite',
		'trivial'
	),
	(
		'BN',
		'thin',
		'trivial'
	),
	(
		'BN',
		'sequential limits',
		'Assume that the sequence $\cdots \xrightarrow{1}  \bullet \xrightarrow{1} \bullet \xrightarrow{1} \bullet$ has a limit. This is a (universal) sequence of natural numbers $n_0,n_1,\dotsc$ satisfying $n_i = n_{i+1} + 1$. But then $n_i = n_0 - i$, and in particular $n_{n_0 + 1} = - 1$, a contradiction.'
	),
	(
		'BOn',
		'locally essentially small',
		'This is because $\mathbf{On}$ is large.'
	),
	(
		'BOn',
		'initial object',
		'trivial'
	),
	(
		'BOn',
		'terminal object',
		'trivial'
	),
	(
		'BOn',
		'right cancellative',
		'Since $1 + \omega = 0 + \omega$, the ordinal $\omega$ is not an epimorphism. In fact, the epimorphisms are exactly the finite ordinals (see below).'
	),
	(
		'BOn',
		'balanced',
		'Every finite ordinal is both a mono- and an epimorphism (see below), but only $0$ is an isomorphism.'
	),
	(
		'BOn',
		'binary products',
		'Assume that the unique object has a product with itself. This amounts to a pair of ordinals $\pi_1,\pi_2$ such that for every pair of ordinals $\alpha_1,\alpha_2$ there is a unique ordinal $\tau$ with $\pi_i + \tau = \alpha_i$ for $i = 1,2$. Applying this to $\alpha_i = 0$ we get $\pi_i = 0$. Now we get a contradiction for any distinct $\alpha_1,\alpha_2$.'
	),
	(
		'BOn',
		'well-powered',
		'This is because all ordinals are monomorphisms (see below) and they do not form a set.'
	),
	(
		'BOn',
		'sequential colimits',
		'Assume that the sequence $\bullet \xrightarrow{1} \bullet \xrightarrow{1} \cdots$ has a colimit. This mounts to a (universal) sequence of ordinals $\alpha_n$ with $\alpha_n = \alpha_{n+1} + 1$. But then $\alpha_{n+1} < \alpha_n$, contradicting the fact that $\alpha_0$ is well-ordered.'
	),
	(
		'BOn',
		'pushouts',
		'Assume that $1,\omega$ have a pushout. This is a (universal) pair of ordinals $\alpha,\beta$ with $\alpha + 1 = \beta + \omega$. But $\beta + \omega$ is a limit ordinal, while $\alpha + 1$ is not.'
	),

	-- various categories
	(
		'Ban',
		'biproducts',
		'If $\sqcup$ denotes the coproduct, the canonical morphism $\mathbb{C} \sqcup \mathbb{C} \to \mathbb{C} \times \mathbb{C}$ is bijective, but not an isomorphism in this category since the coproduct carries the $1$-norm, while the product carries the $\sup$-norm.'
	),
	(
		'Ban',
		'balanced',
		NULL
	),
	(
		'Ban',
		'exact filtered colimits',
		NULL
	),
	(
		'Ban',
		'skeletal',
		'trivial'
	),
	(
		'Ban',
		'Malcev',
		'See <a href="https://math.stackexchange.com/questions/5033161" target="_blank">MSE/5033161</a>.'
	),
	(
		'Man',
		'essentially small',
		NULL
	),
	(
		'Man',
		'countable products',
		NULL
	),
	(
		'Man',
		'coproducts',
		NULL
	),
	(
		'Man',
		'cartesian closed',
		NULL
	),
	(
		'Man',
		'coequalizers',
		NULL
	),
	(
		'Man',
		'pullbacks',
		'See <a href="https://math.stackexchange.com/questions/5129579/" target="_blank">MSE/5129579</a>.'
	),
	(
		'Man',
		'strict terminal object',
		'trivial'
	),
	(
		'Man',
		'balanced',
		'The irrational winding of a torus $\mathbb{R} \to S^1 \times S^1$, $t \mapsto (e^{i t}, \, e^{i \alpha t})$, where $\alpha \in \mathbb{R} \setminus \mathbb{Q}$, provides a counterexample. It is injective and has a dense image. Hence, it is a mono- and an epimorphism. But it is not surjective, hence no isomorphism.'
	),
	(
		'Man',
		'skeletal',
		'trivial'
	),
	(
		'Meas',
		'cartesian closed',
		NULL
	),
	(
		'Meas',
		'strict terminal object',
		'trivial'
	),
	(
		'Meas',
		'balanced',
		'Take a set $X$ with two different $\sigma$-algebras $\mathcal{A} \subset \mathcal{B}$ (for example, $\mathcal{A} = \{\emptyset,X\}$ and $\mathcal{B} = P(X)$ when $X$ has at least $2$ elements), then the identity map $(X,\mathcal{B}) \to (X,\mathcal{A})$ provides a counterexample.'
	),
	(
		'Meas',
		'skeletal',
		'trivial'
	),
	(
		'Meas',
		'Malcev',
		NULL
	),
	(
		'Cat',
		'strict terminal object',
		'A functor $1 \to \mathcal{C}$ is just the choice of an object of $\mathcal{C}$, it does not force $\mathcal{C}$ to be trivial.'
	),
	(
		'Cat',
		'finitary algebraic',
		NULL
	),
	(
		'Cat',
		'balanced',
		NULL
	),
	(
		'Cat',
		'cogenerator',
		NULL
	),
	(
		'Cat',
		'skeletal',
		'trivial'
	),
	(
		'Cat',
		'Malcev',
		NULL
	),
	(
		'Cat',
		'locally cartesian closed',
		'See Theorem 4.4 of <a href="https://www.numdam.org/item/MSMF_1964__2__R3_0/" target="_blank">Giraud 1964</a>.'
	),
	(
		'Fld',
		'connected',
		'A field of characteristic $0$ cannot be connected with a field of characteristic $p > 0$. in fact, the connected components of $\mathbf{Fld}$ are the subcategories $\mathbf{Fld}_p$ of fields of characteristic $p$, where $p$ is a prime or $0$.'
	),
	(
		'Fld',
		'pushouts',
		'By <a href="https://math.stackexchange.com/questions/359352/" target="_blank">MSE/359352</a>, the pushout $E \sqcup_K F$ of two field homomorphisms $E \leftarrow K \rightarrow F$ exists if and only if the tensor product $E \otimes_K F$ has a "fieldification": this means that the nilradical is a prime ideal whose quotient ring is a field. This is quite rare: Consider $E = K(X)$, $F = K(Y)$. Then $E \otimes_K F$ is isomorphic to $K[X,Y] (K[X]-\{0\})^{-1} (K[Y]-\{0\})^{-1}$, which is an integral domain but not a field: for example, $X-Y$ has no inverse.'
	),
	(
		'Fld',
		'balanced',
		'Every non-trivial purely inseparable field extension, such as $\mathbb{F}_p(X^p) \to \mathbb{F}_p(X)$, provides a counterexample by the descriptions of special morphisms below.'
	),
	(
		'Fld',
		'generator',
		'Assume that $G$ is a generator, say of characteristic $p$. Then for all $q \neq p$ all homomorphisms between two fields of characteristic $q$ would be equal, which is absurd.'
	),
	(
		'Fld',
		'cogenerator',
		'Assume that there is a field $Q$ that cogenerates. Take a field $F$ which is larger than $R$ and admits a non-trivial automorphism (for example, a field of rational functions). Then there is no field homomorphism $F \to Q$ (as it would be injective). Since $Q$ cogenerates, this means that all homomorphisms $F \to F$ are equal, a contradiction.'
	),
	(
		'Fld',
		'essentially small',
		'Consider function fields in any number of variables.'
	),
	(
		'Fld',
		'skeletal',
		'trivial'
	),
	(
		'Sp',
		'locally small',
		NULL
	),
	(
		'Sp',
		'strict terminal object',
		'trivial'
	),
	(
		'Sp',
		'countable products',
		NULL
	),
	(
		'Sp',
		'countable coproducts',
		NULL
	),
	(
		'Sp',
		'skeletal',
		'trivial'
	),
	(
		'Sp',
		'Malcev',
		NULL
	),

	-- artificial categories
	(
		'FreeAb',
		'countable products',
		NULL
	),
	(
		'FreeAb',
		'balanced',
		'The homomorphism $2 : \mathbb{Z} \to \mathbb{Z}$ is a counterexample.'
	),
	(
		'FreeAb',
		'directed colimits',
		'See <a href="https://math.stackexchange.com/questions/5025660" target="_blank">this post</a>'
	),
	(
		'FreeAb',
		'skeletal',
		'trivial'
	),
	(
		'Setne',
		'initial object',
		'Assume that there is an initial object $X$. In particular, there must be a unique map of sets $X \to \{0,1\}$, so $X$ has a unique subset, which means $X$ is empty; a contradiction.'
	),
	(
		'Setne',
		'strict terminal object',
		'trivial'
	),
	(
		'Setne',
		'sequential limits',
		'Assume that the sequence of inclusions $\cdots \to \mathbb{N}_{\geq 2} \to \mathbb{N}_{\geq 1} \to \mathbb{N}_{\geq 0} = \mathbb{N}$ as a limit $X$, consisting of maps $X \to \mathbb{N}_{\geq n}$. Since $X$ is non-empty, there is a map $1 \to X$. This corresponds to a family of compatible maps $ 1 \to \mathbb{N}_{\geq n}$, i.e. to compatible elements in $\mathbb{N}_{\geq n}$. But the set $\bigcap_{n \geq 0} \mathbb{N}_{\geq n}$ is empty.'
	),
	(
		'Setne',
		'skeletal',
		'trivial'
	);

INSERT INTO category_property_assignments
	(category_id, property_id, reason, is_satisfied)
SELECT
	category_id, property_id, reason, FALSE
FROM category_non_properties;

DROP TABLE category_non_properties;