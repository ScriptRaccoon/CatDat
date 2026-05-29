---
title: Algebraic categories are "never" thin
description: A proof that the only thin algebraic categories are the terminal and the interval category.
author: Martin Brandenburg
---

## Algebraic categories are "never" thin

::: Lemma
Let $\C$ be a [thin](/category-property/thin) and [finitary algebraic](/category-property/finitary_algebraic) category. Then $\C \simeq 1$ or $\C \simeq I$, where $I$ is the walking morphism.
:::

_Proof._
Let $F : \Set \to \C$ denote the free algebra functor. Every object $A \in \C$ admits a regular epimorphism $F(X) \twoheadrightarrow A$ for some set $X$. But since $\C$ is thin, every regular epimorphism must be an isomorphism. Thus, $A \cong F(X)$. Also, $F(X)$ is a coproduct of copies of $F(1)$, which means it is either the initial object $0$ or $F(1)$ itself (since $\C$ is thin). If $F(1) \cong 0$, then every object is isomorphic to the initial object $0$, and hence $\C$ is trivial. If not, then $\C$ has exactly two objects up to isomorphism, $0$ and $F(1)$, there is a morphism $0 \to F(1)$, but no morphism $F(1) \to 0$. Since $\C$ is thin, we conclude $\C \simeq I$. <span class="qed">$\square$</span>
