---
title: Missing cogenerating sets
description: A generalization of the proof that the category of commutative rings has no cogenerating set.
author: Martin Brandenburg
---

## Missing cogenerating sets

::: Lemma
Let $\C$ be a category with a faithful functor $U: \C \to \Set$. Assume there exists a collection of objects $\F \subseteq \Ob(\C)$ satisfying the following conditions:

1. For any $X \in \F$ and any non-terminal $Y \in \C$, for every morphism $f: X \to Y$ its underlying map $U(f) : U(X) \to U(Y)$ is injective.
2. For every infinite cardinal number $\kappa$, there exists an object $X \in \F$ such that $\card(U(X)) \geq \kappa$ and such that $X$ has a non-identity endomorphism.

Then $\C$ does not have a cogenerating set.
:::

_Proof._
Assume that there is a cogenerating set $S$. By assumption (2) there is an object $X \in \F$ such that $U(X)$ is larger than all the $U(Y)$ with $Y \in S$ (w.r.t. cardinalities) and which has a non-identity endomorphism $\sigma : X \to X$. Since $S$ cogenerates, there is a morphism $f : X \to Y$ with $Y \in S$ and $f \sigma \neq f$. For this, $Y$ must be non-terminal. By (1) the map $U(f) : U(X) \to U(Y)$ is injective. This is a contradiction. <span class="qed">$\square$</span>
