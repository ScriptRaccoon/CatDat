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
	'There is a forgetful functor $\mathbf{Set}_\mathrm{f} \to \mathbf{Set}$ and $\mathbf{Set}$ is locally small.'
),
(
	'Set_f',
	'generator',
	TRUE,
	'The singleton set (which is <i>not</i> terminal) is a generator as it represents the forgetful functor $\mathbf{Set}_\mathrm{f} \to \mathbf{Set}$.'
),
(
	'Set_f',
	'cogenerator',
	TRUE,
	'The set $\{0,1\}$ is a cogenerator in $\mathbf{Set}_\mathrm{f}$: Assume that $f,g : X \rightrightarrows Y$ are two finite-to-one maps such that $h \circ f = h \circ g$ for all finite-to-one maps $h : Y \to \{0,1\}$. This exactly means $f^*(A)=g^*(A)$ for all finite subsets $A \subseteq Y$. Applying this to $A = \{f(x)\}$ for $x \in X$ we get $x \in f^*(\{f(x)\}) = g^*(\{f(x)\})$, so that $g(x) = f(x)$.'
),
(
	'Set_f',
	'extensive',
	TRUE,
	'We first show that finite coproducts exist. The empty set is clearly initial. The disjoint union $X+Y$ of two sets $X,Y$ with the inclusion maps $X \rightarrow X+Y \leftarrow Y$ is a coproduct: The inclusions are injective, hence finite-to-one. If $f : X \to T$, $g : Y \to T$ are finite-to-one maps, the induced map $(f;g) : X + Y \to T$ is finite-to-one since the fiber of $t \in T$ is $f^*(\{t\}) + g^*(\{t\})$, which is finite. Hence, finite coproducts exist. A map $A \to X + Y$ yields a decomposition $A = A_X + A_Y$ with maps $A_X \to X$, $A_Y \to Y$ (since $\mathbf{Set}$ is extensive). Here, $A \to X + Y$ is finite-to-one iff $A_X \to X$ and $A_Y \to Y$ are finite-to-one.'
),
(
	'Set_f',
	'equalizers',
	TRUE,
	'Equalizers can be constructed as in $\mathbf{Set}$ because of the following trivial observation: if $f : X \to Y$ is a finite-to-one map and $E \subseteq Y$ is a subset with $f(X) \subseteq E$, then the induced map $f^E : X \to E$ is also finite-to-one.'
),
(
	'Set_f',
	'locally cartesian closed',
	TRUE,
	'If $X$ is a set, the equivalence $\mathbf{Set}/X \simeq \mathbf{Set}^X$, $f \mapsto (f^*(\{x\}))_{x \in X}$ restricts to an equivalence $\mathbf{Set}_\mathrm{f} / X \simeq \mathbf{FinSet}^X$. This category is cartesian closed since <a href="/category/FinSet">the category $\mathbf{FinSet}$</a> is cartesian closed and products of cartesian closed categories are cartesian closed.'
),
(
	'Set_f',
	'mono-regular',
	TRUE,
	'If $f : X \to Y$ is a monomorphism, i.e. an injective map, it is an equalizer of the two maps $i_1, i_2 : Y \rightrightarrows Y \sqcup_X Y$ in $\mathbf{Set}$. But $i_1,i_2$ are injective, hence finite-to-one, so that $f$ is also an equalizer in $\mathbf{Set}_\mathrm{f}$.'
),
(
	'Set_f',
	'epi-regular',
	TRUE,
	'If $f : X \to Y$ is an epimorphism in $\mathbf{Set}_\mathrm{f}$, i.e. a surjective finite-to-one map, it is a coequalizer of the two maps $p_1, p_2 : X \times_Y Y \rightrightarrows Y$ in $\mathbf{Set}$. These maps are finite-to-one since $p_i^*(\{y\}) \cong f^*(\{y\})$ for $i=1,2$, and their coequalizer is also $f$ in $\mathbf{Set}_\mathrm{f}$: It suffices to observe that if $h : Y \to T$ is a map such that $h \circ f$ is finite-to-one, then $h$ is finite-to-one as well. In fact, surjectivity of $f$ implies $h^*(\{t\}) = f_*((h \circ f)^*(\{t\}))$ for $t \in T$.' 
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
	'skeletal',
	FALSE,
	'This is trivial.'
),
(
	'Set_f',
	'binary powers',
	FALSE,
	'More generally, if $X,Y$ are two non-empty sets such that $X \times Y$ exists in $\mathbf{Set}_\mathrm{f}$, then both $X$ and $Y$ must be finite. In fact, the forgetful functor to $\mathbf{Set}$ is representable, so it must preserve products. This means we can assume $X \times Y$ is the usual cartesian product with the usual projections. Since $p_1 : X \times Y \to X$ is finite-to-one and $X$ is non-empty, $Y$ is finite. By symmetric, also $X$ is finite. (Conversely, if $X$ and $Y$ are finite, or one of them is empty, then indeed $X \times Y$ exists.)'
),
(
	'Set_f',
	'countable copowers',
	FALSE,
	'Assume that the copower $X := \mathbb{N} \otimes 1$ exists, where $1$ is the singleton set. This is a set with a map $i : \mathbb{N} \to X$ (not necessarily finite-to-one) such that for every other such map $j : \mathbb{N} \to Y$ there is a unique finite-to-one map $f : X \to Y$ with $f \circ i = j$. Applying this to $j : \mathbb{N} \to 1$, we see that $X$ is finite. Applying the universal property to maps $j : \mathbb{N} \to \{0,1\}$, we see that for every subset $E \subseteq \mathbb{N}$ there is a unique finite subset $F \subseteq X$ with $i^*(F) = E$. But finiteness of $F$ is automatic, so $i^* : P(X) \to P(\mathbb{N})$ is bijective. But then $P(\mathbb{N})$ is finite, which is absurd.'
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
	'Already $\mathbf{Set}$ is not strongly connected.'
),
(
	'Set_f',
	'filtered',
	FALSE,
	'Consider the maps $f,g : \mathbb{N} \rightrightarrows \mathbb{N}$ defined by $f(x)=x$ and $g(x)=2x$. They are injective, hence finite-to-one. If a map $h : \mathbb{N} \to X$ coequalizes them, we have $h(x)=h(2x)$, in particular $h(1)=h(2^n)$ for all $n \in \mathbb{N}$. Thus, $h$ is not finite-to-one.'
),
(
	'Set_f',
	'sequential limits',
	FALSE,
	'Consider the set $[n] := \{0,\dotsc,n\}$ for $n \in \mathbb{N}$. The forgetful functor to $\mathbf{Set}$ is representable (by the singleton set), hence preserves all limits. Thus, if the diagram of truncation maps $\cdots \twoheadrightarrow [2] \twoheadrightarrow [1] \twoheadrightarrow [0]$ has a limit in $\mathbf{Set}_\mathrm{f}$, its underlying set is isomorphic to the limit taken in $\mathbf{Set}$, which is $\mathbb{N} \cup \{\infty\}$. But there is no finite-to-one map $\mathbb{N} \cup \{\infty\} \to [0]$.'
),
(
	'Set_f',
	'multi-cocomplete',
	FALSE,
	'We will prove that the family of singleton sets $(1)_{n \in \mathbb{N}}$ has no multi-coproduct, generalizing the proof that the family does not have a coproduct given above. A cocone is just a map of sets $f : \mathbb{N} \to X$. A morphism from $f : \mathbb{N} \to X$ to $g : \mathbb{N} \to Y$ is a finite-to-one map $h : X \to Y$ with $g = h \circ f$. This describes the category of cocones, and we need to show that it has no multi-initial object. To this end, we claim that the connected component of the unique map $! : \mathbb{N} \to 1$ consists precisely of the maps $f : \mathbb{N} \to X$ with finite image. Once that is established, we can recycle the proof for missing coproducts since there we have only used finite codomains.<br>
	Let $g = h \circ f$ be as above. If $\mathrm{im}(f)$ is finite, then $\mathrm{im}(g) = h_*(\mathrm{im}(f))$ is finite as well. Conversely, if $\mathrm{im}(g)$ is finite, then $\mathrm{im}(f) \subseteq \bigcup_{y \in \mathrm{im}(g)} h^*(\{y\})$ is finite as well. This shows that the connected component of $!$ is contained in the collection of maps with finite image. Conversely, if $f$ has finite image, then there is a morphism from the corestriction $f'' : \mathbb{N} \to \mathrm{im}(f)$ to $f$, and also a morphism from $f''$ to $!$. This proves the remaining inclusion.'
);