---
title: An embedding of the category of topological spaces in the category of locally ringed spaces
description: Describes a functor which makes the category of topological spaces a coreflective and "almost reflective" subcategory of the category of locally ringed spaces. From the properties of this embedding, we can rule out several properties for the category of locally ringed spaces, using the corresponding failures of these properties for the category of topological spaces.
---

# An embedding of the category of topological spaces in the category of locally ringed spaces

For much of this development, we will be dealing with the case of $\LRS_k$ where $k$ is a field. We begin by describing $\Top$ as a reflective subcategory of $\LRS_k$.

::: Lemma 1
The forgetful functor $|{-}| : \LRS_k \to \Top$ has a right adjoint $K : \Top \to \LRS_k$ given by equipping a topological space $T$ with the constant sheaf $\underline{k}$. Furthermore, the functor $K$ is fully faithful, thus making $\Top$ into a reflective subcategory of $\LRS_k$.
:::

::: Proof
In this adjunction, the counit $|K({-})| \to \id$ is just the identity, since $|K(T)| = T$ for every topological space $T$. To describe the unit $\id \to K(|{-}|)$, we need to define a morphism $\eta_X : X \to K(|X|)$ for any locally ringed space $X$ over $k$. Its underlying continuous map $|\eta_X|$ will be the identity of $|X|$, and its sheaf map $\eta_X^\sharp : \underline{k} \to \O_X$ will be the unique morphism of sheaves induced by the given structure of $\O_X$ as a sheaf of $k$-algebras. It is now straightforward to check that this indeed defines an adjunction; and since the counit is an isomorphism, that implies that $K$ is fully faithful.
:::

We now show that this reflective subcategory is in fact also a coreflective subcategory. Recall that for a locally ringed space $X$, an open subset $U \subseteq |X|$, and a section $s \in \O_X(U)$ we have its vanishing set $V(s) \coloneqq \{x\in U : s_x \in \m_{X,x}\} = \{x \in U : s(x) = 0\}$, where $s(x) \in \kappa(x)$ is the image of $s_x \in \O_{X,x}$ in the residue field.

::: Lemma 2
For each object $X$ of $\LRS_k$, let $X_0$ be the set of points $x \in |X|$ such that the induced morphism from $k$ to the residue field $\kappa(x)$ is an isomorphism. We give $X_0$ the following strengthening of the subspace topology: it will be the topology where a neighborhood subbasis at $x \in X_0$ is the collection of sets of the form $X_0 \cap V(s)$ where $s \in \O_X(U)$ for some neighborhood $U$ of $x$ in $|X|$, and $x \in V(s)$. Then $X \mapsto X_0$ defines a functor $S : \LRS_k \to \Top$ that is right adjoint to $K$.
:::

::: Proof
First, to see that $S$ is a functor, suppose we have a morphism $f : X \to Y$. Then for $x \in X_0$, we have a sequence $k \to \kappa(|f|(x)) \to \kappa(x)$ where the composition is an isomorphism. Thus, $\kappa(|f|(x)) \to \kappa(x)$ is a surjective morphism of fields, and therefore an isomorphism. It follows that $k \to \kappa(|f|(x))$ is also an isomorphism of fields, so $|f|(x) \in Y_0$. To see that the restriction $X_0 \to Y_0$ of $|f|$ is continuous, suppose $s \in \O_Y(V)$ is such that $|f|(x) \in V(s)$. Then $x \in V(f^\sharp(s))$, and
$$X_0 \cap |f|^*(Y_0 \cap V(s)) = X_0 \cap V(f^\sharp(s))$$
where $f^\sharp(s) \in \O_X(|f|^*(V))$. In other words, we have shown that the inverse image in $X_0$ of any subbasic neighborhood of $|f|(x)$ is a neighborhood of $x$.

Now if we apply the functor $S$ to $K(T)$ for a topological space $T$, then since by definition any section of the constant sheaf $\underline{k}$ is locally constant, we see that we recover exactly $T$ with its original topology. Thus, we can define the unit $\id \to SK$ of the adjunction to be the identity.

As for the counit $KS \to \id$, for any locally ringed space $X$ over $k$ we need to define a morphism $\varepsilon_X : K(X_0) \to X$. Its underlying continuous map $|\varepsilon_X|$ will be the inclusion map $X_0 \hookrightarrow |X|$, which is continuous since in particular for $U$ an open neighborhood of $x \in X_0$ we have $X_0 \cap U = X_0 \cap V(0_U)$, where $0_U \in \O_X(U)$ is the zero element. The sheaf map $\varepsilon_X^\sharp : \O_X \to |\varepsilon_X|_* \underline{k}$ takes $s \in \O_X(U)$ to the function $X_0 \cap U \to k$ where $x \in X_0 \cap U$ maps to the inverse image of $s(x) \in \kappa(x)$ under the isomorphism $k \to \kappa(x)$. An alternative description of this sheaf map is that $x \in X_0 \cap U$ maps to the unique $a\in k$ such that $x \in V(s-a)$. Since $X_0 \cap V(s-a)$ is a neighborhood of $x$ in $X_0$ by definition, this shows that we get a locally constant function to $k$ as required.

From here, it is straightforward to show that this does in fact define an adjunction.
:::

_Remark._ In the special case where $k$ is a finite field, we have
$$\textstyle X_0 \cap V(s) = \bigcap_{a \in k^\times} (X_0 \cap D(s-a)),$$
which is already open in the subspace topology. Therefore, in this case, $X_0$ is given exactly the subspace topology.

::: Corollary 3
For any non-trivial commutative ring $R$, fix a quotient field $k$ of $R$. Then the functor $K_R : \Top \to \LRS_R$ given by equipping a topological space with the constant sheaf $\underline{k}$ is fully faithful; has a right adjoint; and preserves all inhabited limits.
:::

::: Proof
The functor $K_R$ is the composition of $K : \Top \to \LRS_k$ and the forgetful functor $\LRS_k \to \LRS_R$. Since $\LRS_k$ is equivalent to the slice category of $\LRS_R$ over the subterminal object $\Spec k$, the forgetful functor is fully faithful; has right adjoint ${-} \times \Spec k$; and preserves all inhabited limits. Therefore, from the previously established results on $K$, the result follows.
:::

::: Corollary 4
Let $R$ be any non-trivial commutative ring. Then:<br>
(a) $\LRS_R$ is not cartesian closed.<br>
(b) $\LRS_R$ does not have cartesian filtered colimits.<br>
(c) $\LRS_R$ is not regular.<br>
(d) $\LRS_R$ does not have cofiltered-limit-stable epimorphisms.<br>
(e) $\LRS_R$ does not have effective cocongruences.
:::

::: Proof
We already know that $\Top$ does not satisfy any of these properties. In order to conclude that $\LRS_R$ does not satisfy any of them either, we fix a quotient field of $R$ as above and consider the functor $K_R$. In each case, this is an easy application of the contrapositive of a result from [here](/content/subcategories) to the functor $K_R$. Namely, (a) follows from Lemma 5; (b) from Lemma 4; (c) from Lemma 7; (d) from the dual of Lemma 2 with the observation that $K_R$ preserves epimorphisms since it has a right adjoint; and (e) from the dual of Lemma 8.
:::
