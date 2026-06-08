---
title: Results on subcategories
description: We prove that several properties of categories descend to suitable subcategories.
author: Martin Brandenburg
---

## Results on subcategories

This page collects several useful results of the following form: if $U : \C \to \D$ is a faithful functor (perhaps even fully faithful, or satisfying additional assumptions) and $\D$ has a certain property, then $\C$ has this property as well.

::: Lemma 1
Let $\D$ be a category with a (regular) subobject classifier $\Omega$. Assume that $U : \C \to \D$ is a fully faithful functor such that (1) $U$ is coreflective, i.e. there is a functor $R : \D \to \C$ right adjoint to $U$, and (2) every (regular) monomorphism $Y \to U(X)$ in $\D$ is the image of a (regular) monomorphism $X' \to X$ in $\C$. Then $R(\Omega)$ is a (regular) subobject classifier in $\C$.
:::

_Proof._
If $X \in \C$, then
$$\Hom(X,R(\Omega)) \cong \Hom(U(X),\Omega) \cong \Sub(U(X)) \cong \Sub(X).$$
The same proof works for regular subobjects. <span class="qed">$\square$</span>

::: Lemma 2
Let $\C$ be a category with filtered colimits. Assume that $U : \C \to \D$ is a faithful functor that preserves monomorphisms and filtered colimits. If monomorphisms in $\D$ are stable under filtered colimits, then the same is true in $\C$.
:::

For the record, here is the dual statement: let $\C$ be a category with cofiltered limits. Assume that $U : \C \to \D$ is a faithful functor that preserves epimorphisms and cofiltered limits. If epimorphisms in $\D$ are stable under cofiltered limits, then the same is true in $\C$.

_Proof._
If $(f_i : X_i \to Y_i)$ is a filtered diagram of monomorphisms in $\C$, it induces a filtered diagram $(U(f_i) : U(X_i) \to U(Y_i))$ of monomorphisms in $\D$. Hence, its colimit
$\colim_i U(f_i) : \colim_i U(X_i) \to \colim_i U(Y_i)$
is a monomorphism in $\D$. This morphism is isomorphic to
$U(\colim_i f_i) : U(\colim_i X_i) \to U(\colim_i Y_i)$.
Since $U(\colim_i f_i)$ is a monomorphism in $\D$ and $U$ is faithful, it follows that $\colim_i f_i$ is a monomorphism in $\C$. <span class="qed">$\square$</span>

::: Lemma 3
Let $U : \C \to \D$ be a fully faithful functor with a left adjoint $L : \D \to \C$ (i.e. $\C$ is equivalent to a reflective subcategory of $\D$). Assume that $\D$ has exact filtered colimits, that $\C$ has finite limits, and that $L$ preserves finite limits. Then $\C$ also has exact filtered colimits.
:::

_Proof._
It is well known (and easy to prove) that the colimit of a diagram $(X_j)$ in $\C$ is given by $L(\colim_j U(X_j))$, provided that the colimit in $\D$ exists. In particular, $\C$ has filtered colimits. By assumption, it also has finite limits, and $U$ preserves them since it is a right adjoint. Now let $X : \I \times \J \to \C$ be a diagram, where $\I$ is finite and $\J$ is filtered. We compute:

$$
\begin{align*}
\colim_j {\lim}_i X(i,j) & \cong L(\colim_j U({\lim}_i X(i,j))) \\
& \cong L(\colim_j {\lim}_i U(X(i,j))) \\
& \cong L({\lim}_i \colim_j U(X(i,j))) \\
& \cong {\lim}_i L(\colim_j U(X(i,j))) \\
& \cong {\lim}_i \colim_j X(i,j)
\end{align*}
$$

<span class="qed">$\square$</span>
