---
title: Cogenerators in product categories
description: How to construct a cogenerator in a product category
---

## Cogenerators in product categories

::: Lemma
For a family of categories $(\C_i)_{i \in I}$, each having a cogenerator $Q_i$ which is weakly terminal, the object $(Q_i)_{i \in I}$ is a cogenerator in the product category $\prod_{i \in I} \C_i$.
:::

_Proof._
Let $(f_i: A_i \to B_i)_{i \in I}$ and $(g_i: A_i \to B_i)_{i \in I}$ be two parallel morphisms in the product category which are coequalized by any morphism $(B_i \to Q_i)_{i \in I}$. Let $i_0 \in I$. We claim that $f_{i_0},g_{i_0} : A_{i_0} \rightrightarrows B_{i_0}$ are coequalized by all morphisms $B_{i_0} \to Q_{i_0}$, and hence are equal: Indeed, for all $i \neq i_0$ we may choose some morphism $B_i \to Q_i$ since $Q_i$ is weakly terminal. Thus, the morphism $B_{i_0} \to Q_{i_0}$ extends to a morphism $(B_i \to Q_i)_{i \in I}$ in the product category. By assumption, it coequalizes $(f_i)_{i \in I}$ and $(g_i)_{i \in I}$. By looking at the $i_0$-component, we are done. <span class="qed">$\square$</span>
