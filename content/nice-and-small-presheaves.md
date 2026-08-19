---
title: Nice and small presheaves
description: We give a concrete description of small presheaves on a specific locally small category.
---

# Nice and small presheaves

Let $\C$ be the locally small category defined in [this entry](/category/cocompletion-discrete-pair-join). Its objects are $A$, $B$, and every set $X$. The non-identity morphisms are $f,g : A \rightrightarrows B$, $u_X : X \to A$ and $v_X : X \to B$ for every set $X$, and they satisfy the relation $f \circ u_X = g \circ u_X = v_X$. We will give a concrete description of the [small presheaves](https://ncatlab.org/nlab/show/small+presheaf) on $\C$.

Let $F$ be a presheaf on $\C$. Concretely, this means that we are given sets $F(A)$, $F(B)$, and $F(X)$ for every set $X$, two maps $f^*,g^* : F(B) \rightrightarrows F(A)$ and, for every set $X$, a map $u_X^* : F(A) \to F(X)$ satisfying
$$u_X^* \circ f^* = u_X^* \circ g^* = v_X^*,$$
where $v_X^* : F(B) \to F(X)$. Thus, we have a commutative diagram
$$F(B) ~\overset{f^*}{\underset{g^*}{\rightrightarrows}}~ F(A) \xrightarrow{u_X^*} F(X).$$
If this is a coequalizer diagram, we say that $F$ is _nice at_ $X$. In particular, $u_X^*$ must be surjective. We say that $F$ is _nice_ if there is a set $S_F$ of sets such that $F$ is nice at every set $X \notin S_F$. We then call $S_F$ an _exceptional set_ for $F$. Intuitively, this means that $F$ is nice "almost everywhere".

Let us check that representable presheaves are nice.

1. When $F = \Hom(-,A)$, the diagram evaluates to
   $$\varnothing ~\overset{f^*}{\underset{g^*}{\rightrightarrows}}~ \{\id_A\} \xrightarrow{u_X^*} \{u_X\},$$
   which is clearly a coequalizer diagram. Thus, this presheaf is nice everywhere.

2. When $F = \Hom(-,B)$, the diagram evaluates to
   $$\{\id_B\} ~\overset{f^*}{\underset{g^*}{\rightrightarrows}}~ \{f,g\} \xrightarrow{u_X^*} \{v_X\},$$
   which is again clearly a coequalizer diagram. Thus, this presheaf is nice everywhere.

3. When $F = \Hom(-,X)$ for a set $X$, the diagram at $X$ evaluates to
   $$\varnothing ~\overset{f^*}{\underset{g^*}{\rightrightarrows}}~ \varnothing \xrightarrow{u_X^*} \{\id_X\},$$
   which is not a coequalizer diagram. At $Y \neq X$, however, the diagram evaluates to
   $$\varnothing ~\overset{f^*}{\underset{g^*}{\rightrightarrows}}~ \varnothing \xrightarrow{u_Y^*} \varnothing,$$
   which is a coequalizer diagram. Hence, the set $\{X\}$ is an exceptional set for $\Hom(-,X)$.

::: Lemma 1
A presheaf $F$ on $\C$ is small if and only if it is nice.
:::

::: Proof
The collection of nice presheaves is clearly closed under small colimits of presheaves, since colimits commute with colimits and colimits of presheaves are computed objectwise. Furthermore, we have seen above that representable presheaves are nice. It follows that every small presheaf is nice.

Conversely, assume that $F$ is a nice presheaf and choose an exceptional set $S_F$. To show that $F$ is small, we will show that its category of elements $\int F$ has a small final subcategory. Let $\D$ be the full subcategory of $\int F$ consisting of the objects

- $(A,a)$ for $a \in F(A)$,
- $(B,b)$ for $b \in F(B)$,
- $(X,x)$ for $x \in F(X)$ and $X \in S_F$.

This is a small category since $S_F$ is a set.

We need to show that, for every object $T \in \int F$, the comma category $T \downarrow \D$ is connected. This is trivial for objects $T$ of $\D$. It remains to check this for $T = (X,x)$, where $x \in F(X)$ and $X \notin S_F$. By the definition of $S_F$, the diagram
$$F(B) ~\overset{f^*}{\underset{g^*}{\rightrightarrows}}~ F(A) \xrightarrow{u_X^*} F(X) \tag{1}$$
is a coequalizer diagram. In particular, $u_X^*$ is surjective, so there is some $a \in F(A)$ with $u_X^*(a) = x$. Then $u_X : (X,x) \to (A,a)$ is a morphism in $\int F$, showing that $(X,x) \downarrow \D$ is non-empty.

There are two types of objects in $(X,x) \downarrow \D$. The first type consists of morphisms
$$u_X : (X,x) \to (A,a),$$
where $a \in F(A)$ satisfies $u_X^*(a)=x$. The second type consists of morphisms
$$v_X : (X,x) \to (B,b),$$
where $b \in F(B)$ satisfies $v_X^*(b)=x$. Every object of the second type is connected to an object of the first type, since $f : (A,f^*(b)) \to (B,b)$ is a morphism with $f \circ u_X = v_X$.

It remains to show that every two objects
$$(X,x) \to (A,a), \quad (X,x) \to (A,a')$$
are connected, where $a,a' \in F(A)$ satisfy $u_X^*(a)=u_X^*(a')=x$. Since the diagram $(1)$ is a coequalizer diagram, there is a finite sequence of elements $a_0,\dotsc,a_n$ in $F(A)$, where $a_0=a$ and $a_n=a'$, and a finite sequence of elements $b_0,\dotsc,b_{n-1} \in F(B)$ such that, for every $0 \leq i < n$, either
$$a_i=f^*(b_i), \quad a_{i+1}=g^*(b_i),$$
or
$$a_i=g^*(b_i), \quad a_{i+1}=f^*(b_i).$$
It suffices to show that $(X,x) \to (A,a_i)$ and $(X,x) \to (A,a_{i+1})$ are connected. We may assume without loss of generality that
$$a_i=f^*(b_i), \quad a_{i+1}=g^*(b_i).$$
But then both are connected to $(X,x) \to (B,b_i)$ via the morphisms

$$f : (A,a_i) \to (B,b_i), \quad g : (A,a_{i+1}) \to (B,b_i),$$

respectively.
:::

We can also characterize the presheaves $G$ that are quotients of small presheaves (called _petty presheaves_ in the literature). By Lemma 1, a necessary condition is that $u_X^* : G(A) \to G(X)$ is surjective for "almost all" sets $X$. It turns out that this condition is sufficient as well.

::: Lemma 2
Let $G$ be a presheaf on $\C$ such that there is a set of sets $S$ with the property that $u_X^* : G(A) \to G(X)$ is surjective for all sets $X \notin S$. Then there is a small presheaf $F$ with an epimorphism of presheaves $F \to G$.
:::

::: Proof
We define the presheaf
$$F \coloneqq \coprod_{a \in G(A)} \Hom(-,A) \sqcup \coprod_{b \in G(B)} \Hom(-,B) \sqcup \coprod_{X \in S, \, x \in G(X)} \Hom(-,X).$$
As a coproduct of representable functors, $F$ is a small presheaf. By the Yoneda Lemma, there is a morphism $\alpha : F \to G$ characterized by

- $\alpha_A(i_a(\id_A)) = a$ for $a \in G(A)$
- $\alpha_B(i_b(\id_B)) = b$ for $b \in G(B)$
- $\alpha_X(i_x(\id_X)) = x$ for $X \in S$, $x \in G(X)$

In particular, by construction, $\alpha$ hits all elements of $G$ except possibly those $x \in G(X)$ where $X \notin S$. But in this case, $u_X^* : G(A) \to G(X)$ is surjective, and since $\alpha$ hits all elements of $G(A)$, it also hits $x$. Thus, $\alpha$ is an epimorphism.
:::
