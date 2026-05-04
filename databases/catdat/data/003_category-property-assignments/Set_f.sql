INSERT INTO category_property_assignments (
	category_id,
	property_id,
	is_satisfied,
	reason
)
VALUES
(
	'Set_f',
	'locally small',
	TRUE,
	'There is a forgetful functor $\Set_\f \to \Set$ and $\Set$ is locally small.'
),
(
	'Set_f',
	'generator',
	TRUE,
	'The singleton set (which is <i>not</i> terminal) is a generator as it represents the forgetful functor $\Set_\f \to \Set$.'
),
(
	'Set_f',
	'cogenerator',
	TRUE,
	'The set $\{0,1\}$ is a cogenerator in $\Set_\f$: Assume that $f,g : X \rightrightarrows Y$ are two finite-to-one maps such that $h \circ f = h \circ g$ for all finite-to-one maps $h : Y \to \{0,1\}$. This exactly means $f^*(A)=g^*(A)$ for all finite subsets $A \subseteq Y$. Applying this to $A = \{f(x)\}$ for $x \in X$ we get $x \in f^*(\{f(x)\}) = g^*(\{f(x)\})$, so that $g(x) = f(x)$.'
),
(
	'Set_f',
	'extensive',
	TRUE,
	'We first show that finite coproducts exist. The empty set is clearly initial. The disjoint union $X+Y$ of two sets $X,Y$ with the inclusion maps $X \rightarrow X+Y \leftarrow Y$ is a coproduct: The inclusions are injective, hence finite-to-one. If $f : X \to T$, $g : Y \to T$ are finite-to-one maps, the induced map $(f;g) : X + Y \to T$ is finite-to-one since the fiber of $t \in T$ is $f^*(\{t\}) + g^*(\{t\})$, which is finite. Hence, finite coproducts exist. A map $A \to X + Y$ yields a decomposition $A = A_X + A_Y$ with maps $A_X \to X$, $A_Y \to Y$ (since $\Set$ is extensive). Here, $A \to X + Y$ is finite-to-one iff $A_X \to X$ and $A_Y \to Y$ are finite-to-one.'
),
(
	'Set_f',
	'equalizers',
	TRUE,
	'Equalizers can be constructed as in $\Set$ because of the following trivial observation: if $f : X \to Y$ is a finite-to-one map and $E \subseteq Y$ is a subset with $f(X) \subseteq E$, then the induced map $f^E : X \to E$ is also finite-to-one.'
),
(
	'Set_f',
	'quotients of congruences',
	TRUE,
	'A congruence on a set $X$ in $\Set_\f$ is the same as an equivalence relation $R$ on $X$ whose equivalence classes are finite. In that case, the usual quotient map $p : X \to X/R$ is finite-to-one. Moreover, if $h : X/R \to Y$ is a map such that $h \circ p : X \to Y$ is finite-to-one, then $h$ is finite-to-one as well because $h^*(\{y\}) \subseteq p^*((h \circ p)^*(\{y\}))$ for all $y \in Y$. Therefore, $p$ is also the quotient in $\Set_\f$.'
),
(
	'Set_f',
	'effective congruences',
	TRUE,
	'Let $f, g : E \rightrightarrows X$ be a congruence in $\Set_\f$. From the proof on quotients of congruences in $\Set_\f$, we have a quotient map $p : X \to X/E$ in $\Set_\f$, and $E$ is the kernel pair of $p$ in $\Set$. It remains to see that $E$ is also the kernel pair of $p$ in $\Set_f$. Thus, suppose we have $x_1, x_2 : T \rightrightarrows X$ with $p \circ x_1 = p \circ x_2$. Then there is a unique $e : T \to E$ in $\Set$ with $x_1 = f\circ e$ and $x_2 = g\circ e$. Since $f\circ e$ is finite-to-one, we must have $e$ is finite-to-one as well.'
),
(
	'Set_f',
	'effective cocongruences',
	TRUE,
	'Suppose we have a cocongruence $f, g : X \rightrightarrows E$ in $\Set_f$. Then it is a coreflexive corelation in $\Set$. Since $\Set$ is co-Malcev and has effective cocongruences, that implies $E$ is the cokernel pair of some function $h : Z \to X$ in $\Set$. By the dual of <a href="/lemma/effective-congruence-quotients">this result</a>, if $\inc_Y : Y \hookrightarrow X$ is the equalizer of $f$ and $g$, then $E$ is also the cokernel pair of $\inc_Y$ in $\Set$. It remains to see that $E$ is the cokernel pair of $\inc_Y$ in $\Set_\f$ as well. Thus, suppose $a, b : X \rightrightarrows T$ are such that $a |_Y = b |_Y$. Then there is a unique $c : E\to T$ in $\Set$ with $a = c\circ f$ and $b = c\circ g$. Since $(f;g) : X + X \to E$ is surjective and $c \circ (f;g) = (a;b)$ is finite-to-one, we see $c$ is finite-to-one as well.'
),
(
	'Set_f',
	'locally cartesian closed',
	TRUE,
	'If $X$ is a set, the equivalence $\Set/X \simeq \Set^X$, $f \mapsto (f^*(\{x\}))_{x \in X}$ restricts to an equivalence $\Set_\f / X \simeq \FinSet^X$. This category is cartesian closed since <a href="/category/FinSet">the category $\FinSet$</a> is cartesian closed and products of cartesian closed categories are cartesian closed.'
),
(
	'Set_f',
	'mono-regular',
	TRUE,
	'If $f : X \to Y$ is a monomorphism, i.e. an injective map, it is an equalizer of the two maps $i_1, i_2 : Y \rightrightarrows Y \sqcup_X Y$ in $\Set$. But $i_1,i_2$ are injective, hence finite-to-one, so that $f$ is also an equalizer in $\Set_\f$.'
),
(
	'Set_f',
	'epi-regular',
	TRUE,
	'If $f : X \to Y$ is an epimorphism in $\Set_\f$, i.e. a surjective finite-to-one map, it is a coequalizer of the two maps $p_1, p_2 : X \times_Y Y \rightrightarrows Y$ in $\Set$. These maps are finite-to-one since $p_i^*(\{y\}) \cong f^*(\{y\})$ for $i=1,2$, and their coequalizer is also $f$ in $\Set_\f$: It suffices to observe that if $h : Y \to T$ is a map such that $h \circ f$ is finite-to-one, then $h$ is finite-to-one as well. In fact, surjectivity of $f$ implies $h^*(\{t\}) = f_*((h \circ f)^*(\{t\}))$ for $t \in T$.' 
),
(
	'Set_f',
	'semi-strongly connected',
	TRUE,
	'From set theory it is known that for all sets $X,Y$ there is an injective map $X \to Y$ or an injective map $Y \to X$, and injective maps are finite-to-one.'
),
(
	'Set_f',
	'well-powered',
	TRUE,
	'This is clear since the monomorphisms are injective.'
),
(
	'Set_f',
	'well-copowered',
	TRUE,
	'This is clear since the epimorphisms are injective.'
),
(
	'Set_f',
	'ℵ₁-accessible',
	TRUE,
	'We first show that $\aleph_1$-directed colimits exist and are preserved by the forgetful functor to $\Set$. Let $(X_i)_{i \in I}$ be a diagram in $\Set_\f$ indexed by a $\aleph_1$-directed poset $I$. Let $(u_i : X_i \to X)$ be the colimit in $\Set$. Each map $u_i$ is finite-to-one: Otherwise, some fiber $u_i^*(\{x\}) \subseteq X_i$ contains infinitely many elements $a_1,a_2,\dotsc$. For every $n \geq 1$ we find $i_n \geq i$ such that $a_1,a_n$ have the same image in $X_{i_n}$. Let $i_\infty \in I$ be an upper bound of all $i_n$. Then all $a_n$ have the same image in $X_{i_\infty}$. This is a contradiction since $X_i \to X_{i_\infty}$ is finite-to-one. Now if $f : X \to Y$ is a map such that each $f \circ u_i$ is finite-to-one, then $f$ is finite-to-one as well: If a fiber $f^*(\{y\})$ contains infinitely many distinct elements $x_1,x_2,\dotsc$, there is some index $i$ such that all have a preimage in $X_i$, but then $(f \circ u_i)^*(\{y\})$ would be infinite. This concludes the proof that $\aleph_1$-directed colimits exist.<br>
	In $\Set$, every set $X$ is the $\aleph_1$-directed colimit of its countable subsets. This remains true in $\Set_\f$ because a map $X \to Y$ is finite-to-one as long as each restriction to a countable subset of $X$ is finite-to-one. Moreover, every countable set is $\aleph_1$-presentable in $\Set$, but also in $\Set_\f$.'
),
(
	'Set_f',
	'skeletal',
	FALSE,
	'This is trivial.'
),
(
	'Set_f',
	'binary powers',
	FALSE,
	'More generally, if $X,Y$ are two non-empty sets such that $X \times Y$ exists in $\Set_\f$, then both $X$ and $Y$ must be finite. In fact, the forgetful functor to $\Set$ is representable, so it must preserve products. This means we can assume $X \times Y$ is the usual cartesian product with the usual projections. Since $p_1 : X \times Y \to X$ is finite-to-one and $X$ is non-empty, $Y$ is finite. By symmetric, also $X$ is finite. (Conversely, if $X$ and $Y$ are finite, or one of them is empty, then indeed $X \times Y$ exists.)'
),
(
	'Set_f',
	'countable copowers',
	FALSE,
	'Assume that the copower $X := \IN \otimes 1$ exists, where $1$ is the singleton set. This is a set with a map $i : \IN \to X$ (not necessarily finite-to-one) such that for every other such map $j : \IN \to Y$ there is a unique finite-to-one map $f : X \to Y$ with $f \circ i = j$. Applying this to $j : \IN \to 1$, we see that $X$ is finite. Applying the universal property to maps $j : \IN \to \{0,1\}$, we see that for every subset $E \subseteq \IN$ there is a unique finite subset $F \subseteq X$ with $i^*(F) = E$. But finiteness of $F$ is automatic, so $i^* : P(X) \to P(\IN)$ is bijective. But then $P(\IN)$ is finite, which is absurd.'
),
(
	'Set_f',
	'essentially small',
	FALSE,
	'This is obvious.'
),
(
	'Set_f',
	'strongly connected',
	FALSE,
	'Already $\Set$ is not strongly connected.'
),
(
	'Set_f',
	'filtered',
	FALSE,
	'Consider the maps $f,g : \IN \rightrightarrows \IN$ defined by $f(x)=x$ and $g(x)=2x$. They are injective, hence finite-to-one. If a map $h : \IN \to X$ coequalizes them, we have $h(x)=h(2x)$, in particular $h(1)=h(2^n)$ for all $n \in \IN$. Thus, $h$ is not finite-to-one.'
),
(
	'Set_f',
	'sequential limits',
	FALSE,
	'Consider the set $[n] := \{0,\dotsc,n\}$ for $n \in \IN$. The forgetful functor to $\Set$ is representable (by the singleton set), hence preserves all limits. Thus, if the diagram of truncation maps $\cdots \twoheadrightarrow [2] \twoheadrightarrow [1] \twoheadrightarrow [0]$ has a limit in $\Set_\f$, its underlying set is isomorphic to the limit taken in $\Set$, which is $\IN \cup \{\infty\}$. But there is no finite-to-one map $\IN \cup \{\infty\} \to [0]$.'
),
(
	'Set_f',
	'multi-cocomplete',
	FALSE,
	'We will prove that the family of singleton sets $(1)_{n \in \IN}$ has no multi-coproduct, generalizing the proof that the family does not have a coproduct given above. A cocone is just a map of sets $f : \IN \to X$. A morphism from $f : \IN \to X$ to $g : \IN \to Y$ is a finite-to-one map $h : X \to Y$ with $g = h \circ f$. This describes the category of cocones, and we need to show that it has no multi-initial object. To this end, we claim that the connected component of the unique map $! : \IN \to 1$ consists precisely of the maps $f : \IN \to X$ with finite image. Once that is established, we can recycle the proof for missing coproducts since there we have only used finite codomains.<br>
	Let $g = h \circ f$ be as above. If $\im(f)$ is finite, then $\im(g) = h_*(\im(f))$ is finite as well. Conversely, if $\im(g)$ is finite, then $\im(f) \subseteq \bigcup_{y \in \im(g)} h^*(\{y\})$ is finite as well. This shows that the connected component of $!$ is contained in the collection of maps with finite image. Conversely, if $f$ has finite image, then there is a morphism from the corestriction $f'' : \IN \to \im(f)$ to $f$, and also a morphism from $f''$ to $!$. This proves the remaining inclusion.'
);
