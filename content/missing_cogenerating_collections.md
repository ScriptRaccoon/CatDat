---
title: Missing cogenerating collections
description: A generalization of the proof that the category of commutative rings has no cogenerating collection.
---

# Missing cogenerating collections

::: Lemma
Let $\C$ be a category and $U: \C \to \Set$ be a functor. Assume there exists a collection of objects $\F \subseteq \Ob(\C)$ satisfying the following conditions:

1. For any $X \in \F$ and any non-terminal $Y \in \C$, for every morphism $f: X \to Y$ its underlying map $U(f) : U(X) \to U(Y)$ is injective.
2. For every infinite cardinal number $\kappa$, there exists an object $X \in \F$ such that $\card(U(X)) \geq \kappa$ and such that $X$ has a non-identity endomorphism.

Then $\C$ does not have a cogenerating collection.
:::

::: Proof
Assume that there is a cogenerating collection $S$. In particular, $S$ is essentially small. By assumption (2) applied to a cardinal $\kappa > \sup \{\card(U(Y)) : Y \in S\}$, there is an object $X \in \F$ such that $\card(U(X)) > \card(U(Y))$ for all $Y \in S$ and which has a non-identity endomorphism $\sigma : X \to X$. Since $S$ cogenerates, there is a morphism $f : X \to Y$ with $Y \in S$ and $f \sigma \neq f$. For this, $Y$ must be non-terminal. By (1) the map $U(f) : U(X) \to U(Y)$ is injective. This is a contradiction.
:::
