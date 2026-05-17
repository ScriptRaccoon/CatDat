---
title: Missing cogenerator
description: A generalization of the proof that the category of groups has no cogenerator.
author: Martin Brandenburg
---

## Missing cogenerator

::: Lemma

Let $\C$ be a pointed category with a faithful functor $U: \C \to \Set$. Assume there exists a collection of non-zero objects $\F \subseteq \Ob(\C)$ satisfying the following conditions:

1. For any $X \in \F$ and any $Y \in \C$, every non-zero morphism $f: X \to Y$ is injective on underlying sets.
2. For every $Y \in \C$ there is some object $X \in \F$ such that $\card(U(X)) > \card(U(Y))$.

Then $\C$ does not have a cogenerator.
:::

_Proof._
Assume that there is a cogenerator $Y$. By assumption (2) there is an object $X \in \F$ such that $U(X)$ is larger than $U(Y)$ (w.r.t. cardinalities). Since $0,\id_X : X \rightrightarrows X$ are distinct, there is a morphism $f : X \to Y$ with $f \neq 0$. But then $U(f) : U(X) \to U(Y)$ is injective by assumption (1), which contradicts our choice of $X$. <span class="qed">$\square$</span>
