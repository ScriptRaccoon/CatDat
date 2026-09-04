---
title: Missing cogenerator
description: A generalization of the proof that the category of groups has no cogenerator.
---

# Missing cogenerator

::: Lemma

Let $\C$ be a pointed category with a faithful functor $U: \C \to \Set$. Assume there exists a collection of non-zero objects $\F \subseteq \Ob(\C)$ satisfying the following conditions:

1. For any $X \in \F$ and any $Y \in \C$, every non-zero morphism $f: X \to Y$ is injective on underlying sets.
2. For every $Y \in \C$ there is some object $X \in \F$ such that $\card(U(X)) > \card(U(Y))$.

Then $\C$ does not have a cogenerator. Moreover, $\C$ is not cototal.
:::

::: Proof
Assume that there is a cogenerator $Y$. By assumption (2) there is an object $X \in \F$ such that $U(X)$ is larger than $U(Y)$ (w.r.t. cardinalities). Since $0,\id_X : X \rightrightarrows X$ are distinct, there is a morphism $f : X \to Y$ with $f \neq 0$. But then $U(f) : U(X) \to U(Y)$ is injective by assumption (1), which contradicts our choice of $X$.

Now assume that $\C$ is cototal. Using the axiom of choice, we may assume that for each small cardinal $\kappa$, there is at most one element $X \in \F$ such that $\card(U(X)) = \kappa$. Treating $\F$ as a discrete diagram in $\C$, assumption (1) implies that for any object $Y$ of $\C$, the collection of cocones $\F \to Y$ is bijective with a set, since the maps $X \to Y$ with $\card(U(X)) > \card(U(Y))$ must all be zero in such a cocone. Therefore, by G. M. Kelly, <a href="https://www.numdam.org/item/?id=CTGDC_1986__27_2_109_0" target="_blank">A survey of totality for enriched and ordinary categories</a>, Thm. 5.6 (namely the implication (i) $\Rightarrow$ (iii)), $\C$ must have a coproduct $Y$ of all elements of $\F$. But then by assumption (2), there exists $X \in \F$ such that $\card(U(X)) > \card(U(Y))$; and since $\C$ is pointed, the coprojection $X \to Y$ must be split monic and therefore non-zero. Using assumption (1), we get a contradiction.
:::
