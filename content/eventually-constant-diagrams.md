---
title: Eventually constant diagrams
description: We describe the colimit of an eventually constant sifted diagram and characterize the categories in which every sifted diagram is eventually constant.
---

# Eventually constant diagrams

We describe the colimits of certain [sifted](/category-property/sifted) diagrams explicitly. This applies to all sifted diagrams in groupoids and, more generally, in [generalized inverse](/category-property/generalized_inverse) categories. For groupoids, the existence of sifted colimits also follows from [this criterion](/category-implication/sifted_colimits_criterion), since groupoids have filtered colimits, pullbacks, and reflexive coequalizers. However, the criterion is a non-trivial theorem, whereas our proof is elementary.

Let $D : \I \to \C$ be a diagram in a category and $i_0 \in \I$. We call $D$ _constant after_ $i_0$ when for all morphisms $i_0 \to i$ the morphism $D(i_0) \to D(i)$ is an isomorphism. Of course, in a groupoid, this is satisfied for every $i_0 \in \I$. If such an object $i_0$ exists, we call $D$ _eventually constant_.

::: Lemma 1
Let $\C$ be a category. Let $D : \I \to \C$ be a sifted diagram which is constant after $i_0$. Then $D(i_0)$ is a colimit object of $D$, where the colimit morphism $D(i_0) \to D(i_0)$ is the identity. Moreover, this colimit is preserved by every functor $F : \C \to \C'$.
:::

In particular, every groupoid has sifted colimits.

::: Proof
For every $i \in \I$, define a morphism $u_i : D(i) \to D(i_0)$ as follows. Choose a cospan

$$i \xrightarrow{a} k \xleftarrow{b} i_0,$$

and set

$$u_i \coloneqq D(b)^{-1} D(a) : D(i) \to D(k) \to D(i_0).$$

This does not depend on the chosen cospan: since the category of cospans is connected, it suffices to check this for any morphism of cospans

$$
\begin{CD}
i @>a>> k @<b<< i_0 \\
@V{=}VV @VV{f}V @VV{=}V \\
i @>>{a'}> k' @<<{b'}< i_0
\end{CD}
$$

Since $D(b)$ and $D(f) D(b) = D(b')$ are isomorphisms, also $D(f)$ is an isomorphism. We compute:

$$D(b)^{-1} D(a) = D(b)^{-1} D(f)^{-1} D(f) D(a) = D(fb)^{-1} D(fa) = D(b')^{-1} D(a').$$

Thus, $u_i : D(i) \to D(i_0)$ is well defined. Note that $u_{i_0}$ is the identity of $D(i_0)$.

To show that this defines a cocone, let $f : j \to i$ be a morphism in $\I$, and choose a cospan $i \xrightarrow{a} k \xleftarrow{b} i_0$ as above to compute $u_i$. We use the cospan $j \xrightarrow{af} k \xleftarrow{b} i_0$ to compute $u_j$. Hence,

$$u_j = D(b)^{-1} D(af) = D(b)^{-1} D(a) D(f) = u_i D(f),$$

which proves the claim.

Finally, we verify the universal property. Let $(v_i : D(i) \to T)$ be another cocone, and set $h \coloneqq v_{i_0} : D(i_0) \to T$. (Since $\C$ is not assumed to be a groupoid, the morphisms $v_i$ need not be isomorphisms; the argument does not use this.)

We check that $v_i = h u_i$ for every $i \in \I$. Choose a cospan $i \xrightarrow{a} k \xleftarrow{b} i_0$ as above. Then

$$h u_i = v_{i_0} D(b)^{-1} D(a) = v_k D(a) = v_i.$$

Moreover, $h$ is uniquely determined: if $v_i = h u_i$ for all $i \in \I$, then for $i = i_0$ we obtain $v_{i_0} = h$.

Now let $F : \C \to \C'$ be a functor. Then the diagram $F \circ D : \I \to \C'$ is constant after $i_0$ as well. The construction above, applied to $F \circ D$ and the same cospans, yields the colimit morphisms
$$F(D(b))^{-1} F(D(a)) = F(D(b)^{-1} D(a)) = F(u_i).$$
Hence, $F$ preserves the colimit of $D$.
:::

::: Lemma 2
For a category $\C$, the following are equivalent:

1. $\C$ is [generalized inverse](/category-property/generalized_inverse).
2. Every diagram $D : \I \to \C$ with $\I$ non-empty is eventually constant.
3. Every sifted diagram in $\C$ is eventually constant.
4. Every sequential diagram in $\C$ is eventually constant.

:::

::: Proof
(1) $\implies$ (2): Assume that $D : \I \to \C$ is a diagram with $\I$ non-empty which is not eventually constant. Using dependent choice, we recursively construct a sequence of morphisms $i_0 \to i_1 \to i_2 \to \cdots$ in $\I$. Since $\I$ is non-empty, we may choose some $i_0 \in \I$. If $i_n$ has been constructed, then, since $D$ is not constant after $i_n$, there is a morphism $i_n \to i_{n+1}$ in $\I$ such that $D(i_n) \to D(i_{n+1})$ is not an isomorphism. This yields an infinite sequence of non-isomorphisms
$$D(i_0) \to D(i_1) \to D(i_2) \to \cdots,$$
a contradiction.

(2) $\implies$ (3): Sifted categories are non-empty.

(3) $\implies$ (4): The ordered set $(\IN,\leq)$ is a filtered and hence sifted category.

(4) $\implies$ (1): Assume that there is an infinite sequence of non-isomorphisms
$$A_0 \to A_1 \to A_2 \to \cdots.$$
By assumption, this sequential diagram is constant after some $n \in \IN$. In particular, $A_n \to A_{n+1}$ is an isomorphism, a contradiction.
:::
