---
title: Results on constant morphisms
description: We prove some results that help determine whether a morphism in a category is constant.
---

# Results on constant morphisms

::: Lemma 1
A [constant morphism](/morphism-property/constant) in $\Set$ is the same as a constant map in the usual sense.
:::

::: Proof
Let $X,Y$ be two sets and let $f : X \to Y$ be a map. If $f$ is a constant morphism, then, in particular, for all morphisms $x_1,x_2 : 1 \to X$, we have $f \circ x_1 = f \circ x_2$. Therefore, $f(x_1) = f(x_2)$ for all $x_1,x_2 \in X$, so $f$ is a constant map. Conversely, if $f$ is a constant map and $x_1,x_2 : T \rightrightarrows X$ are two maps, then $f \circ x_1 = f \circ x_2$, since for all $t \in T$ we have $f(x_1(t)) = f(x_2(t))$.
:::

::: Lemma 2
Let $\C$ be a locally small category. Any representable functor $U : \C \to \Set$ maps constant morphisms to constant maps.
:::

::: Proof
We may assume that $U = \Hom(G,-)$ for some $G \in \C$. If $f : X \to Y$ is a constant morphism in $\C$, then the induced map $f_* : \Hom(G,X) \to \Hom(G,Y)$ is constant by the definition of a constant morphism.
:::

::: Lemma 3
Any right adjoint functor preserves constant morphisms.
:::

::: Proof
Let $G : \C \to \D$ be a functor that is right adjoint to $F : \D \to \C$. Let $f : X \to Y$ be a constant morphism in $\C$. To show that $G(f) : G(X) \to G(Y)$ is constant, let $y_1,y_2 : T \rightrightarrows G(X)$ be two morphisms. Under the adjunction, these correspond to morphisms $x_1,x_2 : F(T) \rightrightarrows X$. Since $f$ is constant, we have $f \circ x_1 = f \circ x_2$ as morphisms $F(T) \rightrightarrows Y$. Hence, $G(f) \circ y_1 = G(f) \circ y_2$ as morphisms $T \rightrightarrows G(Y)$.
:::

::: Lemma 4
If $X$ is a subterminal object, then any morphism $X \to Y$ is constant. If $Y$ is a terminal object, then any morphism $X \to Y$ is constant.
:::

::: Proof
This is immediate from the definitions.
:::

::: Lemma 5
If $f : X \to Y$ is a monomorphism that is constant, then $X$ is subterminal.
:::

::: Proof
If $x_1,x_2 : T \rightrightarrows X$ are morphisms, then $f \circ x_1 = f \circ x_2$ since $f$ is constant. Since $f$ is also a monomorphism, we infer that $x_1 = x_2$.
:::

Of course, all results on constant morphisms dualize to results on coconstant morphisms (except for Lemma 2). For example, Lemma 5 implies that if an epimorphism $f : X \to Y$ is coconstant, then $Y$ is "co-subterminal", i.e. every two morphisms $Y \rightrightarrows T$ are equal.
