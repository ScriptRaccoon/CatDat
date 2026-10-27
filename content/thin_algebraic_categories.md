---
title: Algebraic categories are "never" thin
description: A proof that the only thin algebraic categories are the terminal and the interval category.
---

# Algebraic categories are "never" thin

<!--
TODO: Currently, this lemma is not used anymore
(because of the results on extremal generators).
Evaluate later if we want to remove it.
-->

::: Lemma
Let $\C$ be a [thin](/category-property/thin) and [one-sorted finitary algebraic](/category-property/one-sorted_finitary_algebraic) category. Then $\C \simeq \1$ or $\C \simeq I$, where $I$ is the walking morphism.
:::

::: Proof
Let $F : \Set \to \C$ denote the free algebra functor. Every object $A \in \C$ admits a regular epimorphism $F(X) \twoheadrightarrow A$ for some set $X$. But since $\C$ is thin, every regular epimorphism must be an isomorphism. Thus, $A \cong F(X)$. Also, $F(X)$ is a coproduct of copies of $F(\{\ast\})$, which means it is either the initial object $0$ or $F(\{\ast\})$ itself (since $\C$ is thin). If $F(\{\ast\}) \cong 0$, then every object is isomorphic to the initial object $0$, and hence $\C$ is trivial. If not, then $\C$ has exactly two objects up to isomorphism, $0$ and $F(\{\ast\})$; there is a morphism $0 \to F(\{\ast\})$ but no morphism $F(\{\ast\}) \to 0$. Since $\C$ is thin, we conclude $\C \simeq I$.
:::

Remark: Another proof is possible by using the Lemma [here](/content/thin_extremal_generator).
