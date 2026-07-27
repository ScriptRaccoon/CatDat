---
title: Functors on discrete categories
description: We describe which functors on discrete categories are continuous or cocontinuous.
---

## Functors on discrete categories

Let $\S$ be a discrete category. Thus, a functor $F : \S \to \C$ is the same as a family of objects $F(s) \in \C$ indexed by the objects $s \in \S$. Here, we want to determine under which conditions $F$ is continuous (or cocontinuous). The case $\S = \varnothing$ is rather boring, which is why we assume from now on that $\S \neq \varnothing$, i.e. that $\S$ is inhabited.

First, we consider the trivial case $\S = 1$.

::: Lemma 1
Consider the trivial category $1 = \{0\}$ with a unique object $0$. Let $F : 1 \to \C$ be a functor corresponding to an object $F(0) \in \C$. Then $F$ is continuous if and only if $F(0)$ is a terminal object in $\C$.
:::

_Proof._ If $F$ is continuous, it preserves terminal objects. Since $0 \in 1$ is terminal, it follows that $F(0) \in \C$ is terminal. Conversely, suppose that $F(0) \in \C$ is terminal. Then $F$ is continuous: for every index category $\I$, there is a unique diagram $D : \I \to 1$, namely $D(i) = 0$ and $D(i \to j) = \id_0$. Its limit is $0$, with the universal cone $(\id_0 : 0 \to D(i))_{i \in \I}$. We need to show that $(\id_{F(0)} : F(0) \to F(0))_{i \in \I}$ is a universal cone in $\C$. This is easy to see using that $F(0)$ is terminal. <span class="qed">$\square$</span>

::: Lemma 2
Let $\S$ be a non-trivial inhabited discrete category. Then a functor $F : \S \to \C$ is continuous if and only if, for every $s \in \S$, the object $F(s) \in \C$ is [subterminal](https://ncatlab.org/nlab/show/subterminal+object), i.e. every two morphisms with codomain $F(s)$ are equal.
:::

_Proof._ Assume first that $F$ is continuous. An object $X$ is subterminal if and only if $X \times X$ exists and the diagonal $X \to X \times X$ is an isomorphism. Thus, every functor preserving binary products preserves subterminal objects. Since every object in a discrete category is subterminal, it follows that each $F(s) \in \C$ is subterminal.

Conversely, assume that each $F(s) \in \C$ is subterminal. To show that $F$ is continuous, let $D : \I \to \S$ be a (small) diagram admitting a universal cone $(s \to D(i))_{i \in \I}$. Then $D(i) = s$ for all $i \in \I$, and each morphism $s \to D(i)$ is the identity. Since $\S$ has no terminal object (otherwise, $\S$ would be trivial), $\I$ is inhabited. We need to show that $(\id_{F(s)} : F(s) \to F(s))_{i \in \I}$ is a universal cone in $\C$. This follows immediately from $F(s)$ being subterminal: for a family of morphisms $X \to F(s)$ indexed by $\I$, all morphisms must be equal, and there is one such morphism since $\I$ is inhabited. <span class="qed">$\square$</span>

Remark that in a thin category, every object is subterminal. Of course, Lemma 2 can also be dualized: A functor on a non-trivial inhabited discrete category is cocontinuous if and only if each object in its image is "co-subterminal". Here, an object $X$ is co-subterminal if any two morphisms with domain $X$ are equal (see [MSE/1092122](https://math.stackexchange.com/questions/1092122) for a discussion of the terminology).

Next, let us determine which of the continuous functors are right adjoints.

::: Lemma 3
Let $\S$ be a discrete category. Then a functor $F : \S \to \C$ is a right adjoint if and only if there is a decomposition $\C = \coprod_{s \in \S} \C_s$ into full subcategories such that $F(s) \in \C_s$ is a terminal object for every $s \in \S$.
:::

_Proof._ A functor $G : \C \to \S$ corresponds to a decomposition $\C = \coprod_{s \in \S} \C_s$ via
$$G(X) = s \iff X \in \C_s.$$
It is left adjoint to $F$ if and only if there are natural bijections
$$\Hom(G(X),s) \cong \Hom(X,F(s))$$
for $X \in \C$ and $s \in \S$. For $X \in \C_s$, this means that there is a unique morphism $X \to F(s)$. For $X \in \C_t$ with $t \neq s$, it means that there is no morphism $X \to F(s)$. In other words, $F(s) \in \C_s$. Naturality in $s$ is automatic since $\S$ is discrete. Naturality in $X$, say for $X \in \C_s$, is also automatic. <span class="qed">$\square$</span>

::: Corollary 4
Let $\S$ be a discrete category, and let $\C$ be a connected category. If there is a right adjoint functor $\S \to \C$, then $\S$ is trivial.
:::

_Proof._ By Lemma 3, such a right adjoint yields a decomposition $\C = \coprod_{s \in \S} \C_s$ into full subcategories, each having a terminal object. In particular, each $\C_s$ is inhabited. Since $\C$ is connected, it follows that $\S$ has exactly one object. <span class="qed">$\square$</span>
