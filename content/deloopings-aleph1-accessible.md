---
title: ℵ₁-accessibility of deloopings of monoids
description: We show that the delooping of a left cancellative or countable monoid is ℵ₁-accessible when its idempotents split and its principal right ideals satisfy the ascending chain condition.
---

# $\aleph_1$-accessibility of deloopings of monoids

Every monoid $M$ induces a category $BM$ with a single object $*$, morphisms given by the elements of $M$, and composition given by $a \circ b \coloneqq ab$. Since $BM$ is small, [this result](/category-implication/small_accessible_characterization) shows that $BM$ is accessible when it is [Cauchy complete](/category-property/Cauchy_complete), and the converse holds by [this result](/category-implication/accessible_require_Cauchy_complete). Explicitly, $BM$ is Cauchy complete if and only if every idempotent $e \in M$ can be written as $e = sr$ with $s,r \in M$ and $rs = 1$. However, this does not tell us for which regular cardinals $\kappa$ the category $BM$ is $\kappa$-accessible. We show that $BM$ is [$\aleph_1$-accessible](/category-property/ℵ₁-accessible) when, in addition, $M$ is [left cancellative](/category-property/left_cancellative) (i.e. $ab = ac$ implies $b = c$ for all $a,b,c \in M$) or countable, and $M$ satisfies the following finiteness condition.

A _principal right ideal_ of $M$ is a subset of the form $aM = \{am : m \in M\}$ for some $a \in M$. We say that $M$ satisfies the _ascending chain condition on principal right ideals_ if every ascending chain
$$a_0 M \subseteq a_1 M \subseteq a_2 M \subseteq \cdots$$
of principal right ideals of $M$ becomes stationary. For example, this holds when $M$ is finite or a group, and also when $M$ is a free monoid, such as $\IN$, since then $aM \subseteq bM$ means that $b$ is a prefix of $a$.

We identify presheaves on $BM$ with right $M$-sets, i.e. sets $X$ with a map $X \times M \to X$, $(x,a) \mapsto xa$, satisfying $x1 = x$ and $(xa)b = x(ab)$. The representable presheaf $\Hom(-,*)$ corresponds to $M$ with the action given by multiplication from the right. By the Yoneda lemma, the $M$-equivariant maps $M \to X$ correspond to the elements $x \in X$ via $a \mapsto xa$, and a morphism $a : * \to *$ of $BM$ corresponds to the left multiplication $M \to M$, $b \mapsto ab$.

## Idea

Let $D : \I \to BM$ be a diagram indexed by a small $\aleph_1$-filtered category $\I$. Its colimit $W$ in the category of right $M$-sets is the union of the cyclic sub-$M$-sets $e_i M$, where $e_i \in W$ is the image of $1 \in M$ under the colimit map at $i \in \I$. The diagram $D$ has a colimit in $BM$ which is preserved by $\Hom(*,-)$ if and only if $W$ is isomorphic to $M$.

Each $e_i M$ is a quotient of $M$. Along the diagram, more and more elements of $e_i M$ get identified, and the sub-$M$-sets $e_i M$ grow. We show that both processes stop at some stage. Since $\I$ is $\aleph_1$-filtered, any countably many stages are dominated by a single one, and this is where the hypotheses come in. When $M$ is left cancellative, no identifications are made at all. When $M$ is countable, only countably many identifications have to be made in $e_i M$, so they are all made at a single stage. In both cases, $e_i M$ is isomorphic to a principal right ideal of $M$ (Lemma 1). Then the ascending chain condition implies that the sub-$M$-sets $e_i M$ stop growing, i.e. that $W = e_k M$ for some $k \in \I$ (Lemma 2). Once both processes have stopped, the next stage provides a section of the projection $M \to W$, $a \mapsto e_k a$, so that $W$ is a retract of $M$ (Proposition 3). Finally, since $BM$ is Cauchy complete, $W$ is isomorphic to $M$ (Theorem 4).

## Proofs

Throughout, let $D : \I \to BM$ be a diagram, where $\I$ is a small $\aleph_1$-filtered category. For a morphism $u : i \to j$ in $\I$, we write $D(u) \in M$ for the corresponding element. Let $W$ be the colimit of the composite of $D$ with the Yoneda embedding, i.e. of the diagram of right $M$-sets which maps every $i \in \I$ to $M$ and every morphism $u : i \to j$ to the left multiplication $M \to M$, $a \mapsto D(u) a$. Since colimits of presheaves are computed pointwise, the underlying set of $W$ is the colimit of the underlying diagram of sets. Since $\I$ is filtered, the elements of $W$ are classes $[i,a]$ with $i \in \I$ and $a \in M$, where $[i,a] = [i',a']$ if and only if there are morphisms $u : i \to j$ and $u' : i' \to j$ with $D(u) a = D(u') a'$. The action of $M$ on $W$ is given by $[i,a] c = [i,ac]$, and the colimit maps are $M \to W$, $a \mapsto [i,a]$.

Let $e_i \coloneqq [i,1]$, so that $[i,a] = e_i a$. For every morphism $u : i \to j$ we have $e_i = [j,D(u)] = e_j D(u)$, so that $e_i M \subseteq e_j M$. Moreover, the sub-$M$-sets $e_i M$ cover $W$. For $a,b \in M$ we have $e_i a = e_i b$ if and only if there is a morphism $u : i \to j$ with $D(u) a = D(u) b$. For the non-trivial direction, assume that $D(u) a = D(u') b$ for morphisms $u,u' : i \rightrightarrows j$. Since $\I$ is filtered, there is a morphism $v : j \to k$ with $v u = v u'$. Then $D(vu) a = D(v) D(u) a = D(v) D(u') b = D(vu') b = D(vu) b$.

::: Lemma 1
Assume that $M$ is left cancellative or countable. Then for every $i \in \I$ there is a morphism $u : i \to j$ such that for all $a,b \in M$ we have
$$e_i a = e_i b \iff D(u) a = D(u) b.$$
In particular, the map $e_i M \to D(u) M$, $e_i a \mapsto D(u) a$ is a well-defined isomorphism of right $M$-sets.
:::

::: Proof
If $M$ is left cancellative, let $u \coloneqq \id_i$, so that $D(u) = 1$. By the description of $W$ above, $e_i a = e_i b$ holds if and only if $D(v) a = D(v) b$ for some morphism $v : i \to j$, which is equivalent to $a = b$ since $M$ is left cancellative.

If $M$ is countable, for every pair $(a,b) \in M \times M$ with $e_i a = e_i b$ we choose a morphism $u_{a,b} : i \to j_{a,b}$ with $D(u_{a,b}) a = D(u_{a,b}) b$. Since $M$ is countable, these are countably many morphisms. Since $\I$ is $\aleph_1$-filtered, the diagram consisting of them has a cocone, that is, there are an object $j$ and morphisms $u : i \to j$ and $v_{a,b} : j_{a,b} \to j$ with $v_{a,b} u_{a,b} = u$. Then
$$D(u) a = D(v_{a,b}) D(u_{a,b}) a = D(v_{a,b}) D(u_{a,b}) b = D(u) b.$$
Conversely, if $D(u) a = D(u) b$, then $e_i a = e_i b$ by the description of $W$ above.

In both cases, it follows that the map $e_i M \to D(u) M$, $e_i a \mapsto D(u) a$ is well-defined and injective. It is surjective and $M$-equivariant by construction.
:::

::: Lemma 2
Assume that $M$ is left cancellative or countable, and that $M$ satisfies the ascending chain condition on principal right ideals. Then there is some $k \in \I$ with $W = e_k M$.
:::

::: Proof
Let $P$ be the set of all sub-$M$-sets $e_i M$ of $W$ with $i \in \I$, partially ordered by inclusion. First, we show that every ascending chain
$$e_{i_0} M \subseteq e_{i_1} M \subseteq e_{i_2} M \subseteq \cdots$$
in $P$ becomes stationary. Since $\I$ is $\aleph_1$-filtered, there are an object $j$ and morphisms $i_n \to j$ for all $n \in \IN$. Then $e_{i_n} \in e_j M$, so that $e_{i_n} = e_j a_n$ for some $a_n \in M$. Choose a morphism $u : j \to j'$ as in Lemma 1, and let $\varphi : e_j M \to D(u) M$ be the isomorphism $e_j a \mapsto D(u) a$. Then
$$\varphi(e_{i_n} M) = \varphi(e_j a_n M) = D(u) a_n M.$$
These sets form an ascending chain of principal right ideals of $M$, which becomes stationary by assumption. Since $\varphi$ is injective, the chain $(e_{i_n} M)_{n \in \IN}$ becomes stationary as well.

Since $\I$ is non-empty, so is $P$. Therefore, $P$ has a maximal element $e_k M$, since otherwise we could choose a strictly ascending chain in $P$. Let $i \in \I$. Since $\I$ is filtered, there are an object $l$ and morphisms $i \to l$, $k \to l$. Then $e_i M \subseteq e_l M$ and $e_k M \subseteq e_l M$. By maximality, we have $e_l M = e_k M$, and hence $e_i M \subseteq e_k M$. Since the sub-$M$-sets $e_i M$ cover $W$, we conclude that $W = e_k M$.
:::

::: Proposition 3
Assume that $M$ is left cancellative or countable, and that $M$ satisfies the ascending chain condition on principal right ideals. Then $W$ is a retract of $M$ as a right $M$-set. More precisely, there are an idempotent $e \in M$ and $M$-equivariant maps $\pi : M \to W$ and $\iota : W \to M$ with $\pi \circ \iota = \id_W$ and $\iota(\pi(a)) = ea$ for all $a \in M$.
:::

::: Proof
Choose $k \in \I$ with $W = e_k M$ as in Lemma 2, and then a morphism $u : k \to l$ as in Lemma 1. Since $e_l \in W = e_k M$, there is some $x \in M$ with $e_l = e_k x$. Let $e \coloneqq x D(u)$. We define $\pi : M \to W$ by $\pi(a) \coloneqq e_k a$ and $\iota : W \to M$ by
$$\iota(e_k a) \coloneqq e a = x D(u) a.$$
This is well-defined: if $e_k a = e_k b$, then $D(u) a = D(u) b$ by the choice of $u$, and hence $x D(u) a = x D(u) b$. Both maps are $M$-equivariant, and $\iota(\pi(a)) = ea$ holds by definition. We compute
$$\pi(\iota(e_k a)) = e_k x D(u) a = e_l D(u) a = e_k a.$$
Hence, $\pi \circ \iota = \id_W$. Finally, $e$ is idempotent, since
$$ee = \iota(\pi(e)) = \iota(\pi(\iota(\pi(1)))) = \iota(\pi(1)) = e,$$
where the first two equations use that $\iota \circ \pi$ is the left multiplication with $e$.
:::

::: Theorem 4
Let $M$ be a monoid such that $M$ is left cancellative or countable, $M$ satisfies the ascending chain condition on principal right ideals, and $BM$ is Cauchy complete. Then every $\aleph_1$-filtered colimit of representable presheaves on $BM$ is representable. Hence, $BM$ is $\aleph_1$-accessible.
:::

::: Proof
Let $D : \I \to BM$ and $W$ be as above. Choose $e$, $\pi$, $\iota$ as in Proposition 3. Since $BM$ is Cauchy complete, there are $s,r \in M$ with $e = sr$ and $rs = 1$. We claim that the $M$-equivariant maps

$$
\begin{align*}
\theta & : W \to M, \quad w \mapsto r \iota(w), \\
\theta' & : M \to W, \quad a \mapsto \pi(sa)
\end{align*}
$$

are inverse to each other. For $a \in M$ we have
$$\theta(\theta'(a)) = r \iota(\pi(sa)) = r e s a = (rs)(rs) a = a.$$
For $w \in W$ we have $e \iota(w) = \iota(\pi(\iota(w))) = \iota(w)$, and hence
$$\theta'(\theta(w)) = \pi(s r \iota(w)) = \pi(e \iota(w)) = \pi(\iota(w)) = w.$$
Thus, $W$ is representable. By Lemma 5 below, $BM$ is $\aleph_1$-accessible.
:::

::: Lemma 5
Let $\kappa$ be a regular cardinal and $\C$ be an essentially small category such that every $\kappa$-filtered colimit of representable presheaves on $\C$ is representable. Then $\C$ is $\kappa$-accessible.
:::

::: Proof
Let $y : \C \to [\C^\op,\Set]$ be the Yoneda embedding, let $D : \I \to \C$ be a diagram, where $\I$ is a small $\kappa$-filtered category, and choose $X \in \C$ with $\colim_{i \in \I} y(D(i)) \cong y(X)$. Since $y$ is fully faithful, it reflects colimits. Therefore, $X$ is a colimit of $D$, and $y$ preserves this colimit, i.e. the canonical morphism
$$\textstyle \colim_{i \in \I} \Hom(-,D(i)) \to \Hom(-,\colim_{i \in \I} D(i))$$
is an isomorphism. Evaluating it at an object $A \in \C$ shows that $\Hom(A,-)$ preserves the colimit of $D$. Hence, $\C$ has $\kappa$-filtered colimits, and every object of $\C$ is $\kappa$-presentable. Since $\C$ is essentially small, it follows that $\C$ is $\kappa$-accessible.
:::

When $M$ is left cancellative, the assumption in Theorem 4 that $BM$ is Cauchy complete is automatic by [this result](/category-implication/cauchy_complete_criterion). In this case, the results above extend to large monoids.

::: Proposition 6
Let $M$ be a large monoid, i.e. a monoid whose underlying collection is not necessarily a set (see [here](/content/foundations)). Assume that $M$ is left cancellative and satisfies the ascending chain condition on principal right ideals. Then $BM$ has $\aleph_1$-filtered colimits.
:::

::: Proof
In general, $BM$ is not locally small. However, the proofs of Lemma 1 (in the left cancellative case), Lemma 2, Proposition 3 and Theorem 4 work verbatim when we replace sets by collections, i.e. right $M$-sets by right $M$-collections. They show that every $\aleph_1$-filtered colimit of representable presheaves with values in collections is representable, and hence, as in the proof of Lemma 5, that $BM$ has $\aleph_1$-filtered colimits. Here, $BM$ is Cauchy complete by [this result](/category-implication/cauchy_complete_criterion).
:::
