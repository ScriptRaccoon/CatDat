---
title: Exact filtered colimits descend to nice subcategories
description: Exact filtered colimits are inherited by reflective subcategories with a finite-limit preserving reflector.
author: Martin Brandenburg
---

## Exact filtered colimits descend to nice subcategories

::: Lemma
Let $G : \C \to \D$ be a fully faithful functor with a left adjoint $F : \D \to \C$ that preserves finite limits. Assume that $\D$ has exact filtered colimits and that $\C$ has finite limits. Then $\C$ has exact filtered colimits as well.
:::

_Proof._
It is well-known (and easy to prove) that the colimit of a diagram $(X_j)$ in $\C$ is constructed as $F(\colim_j G(X_j))$, provided that colimit in $\D$ exists. In particular, $\C$ has filtered colimits. By assumption, it also has finite limits, and $G$ preserves these since it is a right adjoint. Now let $X : \I \times \J \to \C$ be a diagram, where $\I$ is finite and $\J$ is filtered. We compute:

$$
\begin{align*}
\colim_j {\lim}_i X(i,j) & \cong F(\colim_j G({\lim}_i X(i,j))) \\
& \cong F(\colim_j {\lim}_i G(X(i,j))) \\
& \cong F({\lim}_i \colim_j G(X(i,j))) \\
& \cong {\lim}_i F(\colim_j G(X(i,j))) \\
& \cong {\lim}_i \colim_j X(i,j)
\end{align*}
$$

<span class="qed">$\square$</span>
