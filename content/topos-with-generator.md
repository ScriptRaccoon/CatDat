---
title: Topos with a Generator
description: An elementary topos with a generator has at most two subterminal objects
author: Daniel Schepler
---

# Topos with a Generator

::: Lemma
Suppose a category is coregular, and it has disjoint finite coproducts, a terminal object, and a generator. Then every regular subterminal object (i.e. an object $X$ such that the unique morphism $X \to 1$ is a regular monomorphism) is either initial or terminal.
:::

_Proof._ Suppose $G$ is a generator, and let $P$ be a regular subterminal object. If the two inclusion morphisms $P \rightrightarrows P + P$ are equal, then by disjointness of finite coproducts, $P$ must be initial. Otherwise, in order for $G$ to distinguish these two morphisms, there must be a morphism  $G \to P$, which implies that the unique morphism $G \to 1$ factors through $P$.

Now, if we consider the two morphisms $i_1, i_2 : 1 \rightrightarrows 1 +_P 1$, we see that for every morphism $f : G \to 1$ (of which there is exactly one), we have $i_1 \circ f = i_2 \circ f$. Since $G$ is a generator, that implies $i_1 = i_2$. On the other hand, by coregularity, we see that the equalizer of $i_1, i_2 : 1 \rightrightarrows 1 +_P 1$ is $P$. Therefore, we conclude that $P \simeq 1$. <span class="qed">$\square$</span>

::: Corollary
In an elementary topos with a generator, every subterminal object is either initial or terminal.
:::

_Proof._ An elementary topos satisfies all the conditions of the lemma; and it is also mono-regular so that every subterminal object is automatically regular subterminal. <span class="qed">$\square$</span>
