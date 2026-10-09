---
title: Quotients of effective congruences
description: If an effective congruence has a quotient, it is the kernel pair of this quotient.
---

# Quotients of effective congruences

Recall that a congruence $E \rightrightarrows X$ is called effective if it is the kernel pair of some morphism with domain $X$. The next result shows that, in many situations, this morphism can be chosen canonically, namely as the quotient of the congruence, provided that it exists.

::: Lemma
An effective congruence whose coequalizer exists is the kernel pair of its coequalizer. More precisely, let $f,g : E \rightrightarrows X$ be an effective congruence. If $f,g$ have a coequalizer $p : X \to X/E$, then $f,g$ is the kernel pair of $p$. That is, the square
$$\begin{CD} E @> f >> X \\ @V g VV @VV p V \\ X @>> p > X/E \end{CD}$$
is a pullback.
:::

::: Proof
Let $h : X \to Z$ be a morphism such that $f,g$ is the kernel pair of $h$. By the universal property of the coequalizer, there is a unique morphism
$$\bar h : X/E \to Z$$
such that $h = \bar h \circ p$. Now suppose we have morphisms $a, b : T \rightrightarrows X$ such that $p \circ a = p \circ b$. Then
$$h \circ a = \bar h \circ p \circ a = \bar h \circ p \circ b = h \circ b.$$
Since $f,g$ is the kernel pair of $h$, this means that the pair $a, b$ factors uniquely through the pair $f,g$.
:::

This result is similar to the [lemma](/content/regular-epis-kernel-pairs) that a regular monomorphism is the equalizer of its cokernel pair, provided that the cokernel pair exists.
<!-- TODO: Are these results deducible from one another? -->
