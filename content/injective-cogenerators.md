---
title: Injective cogenerators
description: We show that coproducts and pushouts of monomorphisms are monomorphisms in a category with a cogenerating collection of injective objects.
---

# Injective cogenerators

<!-- TODO: Once injective cogenerators are a property in the database, turn these lemmas into implications. -->

An object $Q$ of a category $\C$ is _injective_ if for every monomorphism $i : A \to B$ and every morphism $g : A \to Q$ there is a morphism $h : B \to Q$ with $h \circ i = g$.

::: Lemma 1
Let $\C$ be a category with coproducts and a [cogenerating collection](/category-property/cogenerating_collection) of injective objects. Then $\C$ has [coproduct-stable monomorphisms](/category-property/coproduct-stable_monomorphisms).
:::

::: Proof
Let $(f_i : X_i \to Y_i)_{i \in I}$ be a family of monomorphisms, and let $f \coloneqq \coprod_{i \in I} f_i : X \to Y$, where $X \coloneqq \coprod_{i \in I} X_i$ and $Y \coloneqq \coprod_{i \in I} Y_i$ have the coproduct inclusions $\kappa_i : X_i \to X$ and $\iota_i : Y_i \to Y$. Let $a,b : T \rightrightarrows X$ be morphisms with $f \circ a = f \circ b$. It suffices to show that $\varphi \circ a = \varphi \circ b$ for every morphism $\varphi : X \to Q$ to an injective object $Q$ of the cogenerating collection.

Since $Q$ is injective, for every $i \in I$ there is a morphism $\psi_i : Y_i \to Q$ with $\psi_i \circ f_i = \varphi \circ \kappa_i$. Let $\psi : Y \to Q$ be the morphism with $\psi \circ \iota_i = \psi_i$ for all $i \in I$. Then
$$\psi \circ f \circ \kappa_i = \psi \circ \iota_i \circ f_i = \psi_i \circ f_i = \varphi \circ \kappa_i$$
for all $i \in I$, so that $\psi \circ f = \varphi$. It follows that
$$\varphi \circ a = \psi \circ f \circ a = \psi \circ f \circ b = \varphi \circ b.$$
:::

::: Lemma 2
Let $\C$ be a category with a [cogenerating collection](/category-property/cogenerating_collection) of injective objects. Then every pushout of a monomorphism is a monomorphism.
:::

::: Proof
Consider a pushout square
$$\begin{CD} A @>{i}>> B \\ @V{f}VV @VV{g}V \\ C @>>{j}> D \end{CD}$$
in which $i$ is a monomorphism. Let $a,b : T \rightrightarrows C$ be morphisms with $j \circ a = j \circ b$. It suffices to show that $\varphi \circ a = \varphi \circ b$ for every morphism $\varphi : C \to Q$ to an injective object $Q$ of the cogenerating collection.

Since $Q$ is injective, there is a morphism $\beta : B \to Q$ with $\beta \circ i = \varphi \circ f$. By the universal property of the pushout, there is a morphism $\delta : D \to Q$ with $\delta \circ g = \beta$ and $\delta \circ j = \varphi$. Thus, we have the diagram
$$\begin{CD} @. A @>{i}>> B \\ @. @V{f}VV @VV{g}V \\ T @>{a,\,b}>> C @>>{j}> D \\ @. @V{\varphi}VV @VV{\delta}V \\ @. Q @= Q, \end{CD}$$
in which both squares commute and the right column composes to $\beta$. It follows that
$$\varphi \circ a = \delta \circ j \circ a = \delta \circ j \circ b = \varphi \circ b.$$
:::
