---
title: Inclusion functors
description: We gather results about inclusion functors
---

# Inclusion functors

::: Lemma 1
Let $\D$ be category that has an extremal cogenerator $Q$. Let $\C \subseteq \D$ be a full subcategory that contains $Q$. Then the inclusion functor $U : \C \hookrightarrow \D$ preserves all colimits that exist in $\C$ and in $\D$. In particular, if $\D$ is cocomplete, $U$ is cocontinuous.
:::

_Proof._ Let $D : \I \to \C$ be a diagram such that $D$ has a colimit $(u_i : D(i) \to X)$ in $\C$ and $U \circ D$ has a colimit $(v_i : D(i) \to Y)$ in $\D$. There is a unique morphism $f : Y \to X$ such that $f \circ v_i = u_i$ for every $i \in \I$. Moreover, for every object $T \in \C$ the map of sets

$$f^* : \Hom(X,T) \to \Hom(Y,T)$$

is a bijection; both sides identify with cones $D \to T$. Now apply this to $T \coloneqq Q$ to conclude that $f$ is an isomorphism. <span class="qed">$\square$</span>
