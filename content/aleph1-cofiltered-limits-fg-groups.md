---
title: ℵ₁-cofiltered limits of finitely generated abelian groups
description: The existence of these limits follows from a couple of reduction arguments.
author: Martin Brandenburg
---

## ℵ₁-cofiltered limits of finitely generated abelian groups

While the category $\Ab_\fg$ of finitely generated abelian groups has neither filtered colimits nor cofiltered limits, it does have $\aleph_1$-filtered colimits and $\aleph_1$-cofiltered limits. The first claim is proved in [MO/400763](https://mathoverflow.net/questions/400763). The second claim is proved here. In fact, we will show that the embedding $\Ab_\fg \hookrightarrow \Ab$ is closed under $\aleph_1$-cofiltered limits.

Let $D : \I \to \Ab$ be an $\aleph_1$-cofiltered diagram such that each $D(i)$ is finitely generated. We will show that its limit is finitely generated as well. The proof proceeds in three steps:

1. Reduce to the case where every morphism $D(i \to j) : D(i) \to D(j)$ is surjective.
2. Reduce further to the case where the groups $D(i)$ all have the same rank.
3. Reduce further to the case where the torsion subgroups $T(i)$ all have the same cardinality.

In case (3), we will see that all morphisms $D(i \to j)$ are bijective, from which the claim follows immediately.

For $i \in \I$ let
$$S_i \coloneqq \{\im(D(j \to i)) : j \to i\}.$$
This is a set of subgroups of $D(i)$. Since every subgroup of $D(i)$ is finitely generated, $D(i)$ has only countably many subgroups. Hence $S_i$ is countable as well. For every $H \in S_i$, choose a morphism $i_H \to i$ such that $H = \im(D(i_H \to i))$. Since $\I$ is $\aleph_1$-cofiltered, the diagram consisting of the morphisms $i_H \to i$ admits a cone. That is, there exists a morphism $i_\infty \to i$ together with morphisms $i_\infty \to i_H$ over $i$ for every $H \in S_i$. Now consider the subgroup
$$M(i) \coloneqq \im(D(i_\infty \to i)) \subseteq D(i).$$
It belongs to $S_i$, but it is also contained in every $H \in S_i$, since $i_\infty \to i$ factors through $i_H \to i$. Hence $M(i)$ is the minimal element of $S_i$ with respect to inclusion.

For every morphism $k \to i_\infty$ we have
$$M(i) = \im(D(k \to i)),$$
since the inclusion $\supseteq$ is obvious, while $\subseteq$ follows from the minimality just established.

Now let $i \to j$ be a morphism. We claim that $D(i) \to D(j)$ maps $M(i)$ onto $M(j)$. Since $\I$ is cofiltered, we can find a commutative diagram

$$
\begin{CD}
k @>>> i_\infty @>>> i \\
@V{=}VV @. @VVV \\
k @>>> j_\infty @>>> j.
\end{CD}
$$

Hence

$$M(j) = \im(D(k \to j)) = D(i \to j)(\im(D(k \to i))) = D(i \to j)(M(i)).$$

The canonical injective homomorphism
$$\textstyle \lim_{i \in \I} M(i) \hookrightarrow \lim_{i \in \I} D(i)$$
is an isomorphism. Indeed, for every $x \in \lim_{i \in \I} D(i)$, we have $x_j = D(i \to j)(x_i)$ for all $i \to j$, showing that $x_j \in M_j$. Thus, we may replace $D$ by the diagram $M$.

In other words, we may assume from now on that for every morphism $i \to j$ the induced morphism $D(i) \to D(j)$ is surjective. Then
$$\rank(D(i)) \geq \rank(D(j))$$
for every morphism $i \to j$. It follows that the set
$$\{\rank(D(i)) : i \in \I\}$$
is bounded. Indeed, otherwise for every $n \in \IN$ we could choose an object $i_n \in \I$ such that $D(i_n)$ has rank at least $n$. Choosing a cone $(j \to i_n)_{n \in \IN}$, we would obtain a group $D(j)$ of infinite rank, a contradiction.

Therefore the natural number
$$R \coloneqq \max\{\rank(D(i)) : i \in \I\}$$
is well-defined. Let $\J \subseteq \I$ be the full subcategory consisting of those objects $i \in \I$ for which $D(i)$ has rank $R$. If $i \to j$ is a morphism and $j \in \J$, then necessarily $i \in \J$ as well. Since $\I$ is cofiltered, it follows from this property that $\J$ is an initial subcategory of $\I$, i.e. that $\J/i$ is connected for every $i \in \I$. Hence the limit of $D$ coincides with the limit of $D|_{\J}$.

Thus, we may assume from now on that all groups $D(i)$ have the same rank $R$. Let $T(i) \subseteq D(i)$ denote the torsion subgroup, which is finite, and let $F(i) \coloneqq D(i)/T(i)$, which is a finitely generated free abelian group. For a morphism $i \to j$ consider the commutative diagram with exact rows:

$$
\begin{CD}
0 @>>> T(i) @>>> D(i) @>>> F(i) @>>> 0 \\
@. @VVV @VVV @VVV @. \\
0 @>>> T(j) @>>> D(j) @>>> F(j) @>>> 0
\end{CD}
$$

The homomorphism $F(i) \to F(j)$ is surjective, since $D(i) \to D(j)$ is surjective. Since it is a surjective homomorphism between finitely generated free abelian groups of the same rank, it is an isomorphism. Applying the snake lemma to the diagram above, we conclude that $T(i) \to T(j)$ is surjective.

As before, it follows that the natural number
$$N \coloneqq \max\{\card(T(i)) : i \in \I\}$$
is well-defined, and that the full subcategory consisting of those objects $i \in \I$ for which $\card(T(i)) = N$ is initial. Hence we may assume that all groups $T(i)$ have the same cardinality.

Now for every morphism $i \to j$ the induced homomorphism $T(i) \to T(j)$ is a surjective map between finite sets of the same cardinality, and is therefore bijective. Applying the snake lemma once more to the diagram above, we conclude that $D(i) \to D(j)$ is an isomorphism.

In this case, the limit of $D$ is simply given by any of the groups $D(i)$, and is therefore finitely generated.
