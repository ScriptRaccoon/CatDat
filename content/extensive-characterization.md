---
title: Characterization of extensive categories
description: We characterize extensive categories as categories with pullback-stable and disjoint coproducts, for finite, countable, and arbitrary families.
---

# Characterization of extensive categories

[Carboni–Lack–Walters](<https://doi.org/10.1016/0022-4049(93)90035-R>) call a category $\C$ with finite coproducts _extensive_ if for all objects $A,B$ the coproduct functor $\C/A \times \C/B \to \C/(A + B)$ is an equivalence of categories. In Prop. 2.14, they prove that this holds if and only if binary coproducts are disjoint and stable under pullbacks.

In CatDat, the definition of [extensive](/category-property/extensive) categories uses finite families of objects instead of pairs of objects, to match the definitions of [countably extensive](/category-property/countably_extensive) and [infinitary extensive](/category-property/infinitary_extensive) categories. We generalize the characterization to families of arbitrary size, following the argument of Carboni–Lack–Walters. In particular, a category is extensive if and only if it has [pullback-stable finite coproducts](/category-property/pullback-stable_finite_coproducts) and [disjoint finite coproducts](/category-property/disjoint_finite_coproducts), and likewise for countably and infinitary extensive categories. In the corollary at the end, we show that both definitions of extensive categories agree.

To treat these cases at once, we fix an infinite cardinal $\kappa$, and call a family of objects $(A_i)_{i \in I}$ _$\kappa$-small_ if $\card(I) < \kappa$. For $\kappa = \aleph_0$, these are the finite families, and for $\kappa = \aleph_1$, these are the countable families. The infinitary case follows by applying the proposition below to all infinite cardinals $\kappa$, or by removing the cardinality restriction in its proof. For a $\kappa$-small family of objects $(A_i)_{i \in I}$ with coproduct $A \coloneqq \coprod_{i \in I} A_i$ and inclusions $u_i : A_i \to A$, we consider the coproduct functor

$$
\textstyle \Sigma : \prod_{i \in I} (\C/A_i) \to \C/A,
$$

which maps a family of morphisms $(X_i \to A_i)_{i \in I}$ to their coproduct $\coprod_{i \in I} X_i \to A$.

::: Proposition
Let $\C$ be a category with coproducts of $\kappa$-small families. Then the following are equivalent:

1. For every $\kappa$-small family of objects $(A_i)_{i \in I}$, the coproduct functor $\Sigma$ is an equivalence of categories.
2. For every $\kappa$-small family of objects $(A_i)_{i \in I}$, the following conditions hold:
    - For every morphism $T \to A$ and every $i \in I$, the pullback $T_i \coloneqq T \times_A A_i$ exists, and the canonical morphism $\coprod_{i \in I} T_i \to T$ is an isomorphism.
    - Each inclusion $u_i : A_i \to A$ is a monomorphism, and $A_i \times_A A_j \cong 0$ for $i \neq j$.

:::

::: Proof
(1) $\implies$ (2): Let $(A_i)_{i \in I}$ be a $\kappa$-small family and $f : T \to A$ a morphism. Since $\Sigma$ is essentially surjective, there are a family of morphisms $(p_i : Y_i \to A_i)_{i \in I}$ and an isomorphism $T \cong \coprod_{i \in I} Y_i$ over $A$. Let $v_i : Y_i \to T$ be the composite of the coproduct inclusion with this isomorphism. We claim that the commutative square

$$
\begin{CD}
Y_i @> v_i >> T \\
@V p_i VV @VV f V \\
A_i @>> u_i > A
\end{CD}
$$

is a pullback.

To see this, let $g : Z \to T$ and $h : Z \to A_i$ be morphisms with $f \circ g = u_i \circ h$. We define a family $(Z_k \to A_k)_{k \in I}$ by $Z_i \coloneqq Z$ with the morphism $h$, and $Z_k \coloneqq 0$ with the unique morphism $0 \to A_k$ for $k \neq i$. Since a coproduct of an object with initial objects is the object itself, $\Sigma$ maps this family to $u_i \circ h : Z \to A$. So $g$ is a morphism $\Sigma((Z_k)_k) \to \Sigma((Y_k)_k)$ in $\C/A$. A morphism of families $(Z_k)_k \to (Y_k)_k$ consists of a morphism $\varphi : Z \to Y_i$ over $A_i$ together with the unique morphisms $0 \to Y_k$ for $k \neq i$, and $\Sigma$ maps it to $v_i \circ \varphi$. Since $\Sigma$ is fully faithful, there is a unique morphism $\varphi : Z \to Y_i$ over $A_i$ with $v_i \circ \varphi = g$. This proves the claim.

Thus, the pullback $T_i$ exists and is given by $Y_i$, and the canonical morphism $\coprod_{i \in I} T_i \to T$ corresponds to the isomorphism $\coprod_{i \in I} Y_i \cong T$. This proves the first condition. For the second one, let $j \in I$, and apply the claim to $u_j : A_j \to A$, which is the image under $\Sigma$ of the family given by $\id_{A_j}$ at the index $j$ and by $0 \to A_k$ at the indices $k \neq j$. It follows that $A_j \times_A A_j$ is given by $A_j$ with the projections $\id_{A_j}, \id_{A_j}$, so that $u_j$ is a monomorphism, and that $A_j \times_A A_k \cong 0$ for $k \neq j$.

(2) $\implies$ (1): First, the initial object $0$ is [strict](/category-property/strict_initial_object): for a morphism $T \to 0$, the first condition for the empty family states that $0 \to T$ is an isomorphism. Now let $(A_i)_{i \in I}$ be a $\kappa$-small family. By the first condition, every morphism $T \to A$ is isomorphic over $A$ to the coproduct $\coprod_{i \in I} T_i \to A$, which lies in the image of $\Sigma$. Thus, $\Sigma$ is essentially surjective.

To show that $\Sigma$ is fully faithful, we first prove a claim.

**Claim.** Let $(p_i : X_i \to A_i)_{i \in I}$ be a family of morphisms, let $X \coloneqq \coprod_{i \in I} X_i$ with inclusions $w_i : X_i \to X$, and let $p : X \to A$ be the induced morphism. Then for every $i \in I$, the commutative square

$$
\begin{CD}
X_i @> w_i >> X \\
@V p_i VV @VV p V \\
A_i @>> u_i > A
\end{CD}
$$

is a pullback.

To see this, let $P \coloneqq X \times_A A_i$, which exists by the first condition, with projection $r : P \to X$. By the first condition, applied to the family $(X_k)_{k \in I}$ and the morphism $r$, we have $P \cong \coprod_{k \in I} P \times_X X_k$. By the pasting law, $P \times_X X_k$ is the pullback $X_k \times_A A_i$ of $u_i$ along $p \circ w_k$. Since $p \circ w_k$ factors through $u_k$, there is a morphism
$$X_k \times_A A_i \to A_k \times_A A_i.$$
For $k \neq i$, the target is $0$, so that $X_k \times_A A_i \cong 0$ by strictness. For $k = i$, since $u_i$ is a monomorphism, we have
$$X_i \times_A A_i \cong X_i \times_{A_i} A_i \cong X_i.$$
Under these isomorphisms, the inclusion of the summand with index $i$ into $P$ is the canonical morphism $X_i \to P$ induced by $w_i$ and $p_i$. Since all other summands are initial, this canonical morphism is an isomorphism. This proves the claim.

Now let $(p_i : X_i \to A_i)_{i \in I}$ and $(q_i : Y_i \to A_i)_{i \in I}$ be two families of morphisms. Let $X$, $w_i$, $p$ be as in the claim, and likewise let $Y \coloneqq \coprod_{i \in I} Y_i$ with inclusions $v_i : Y_i \to Y$ and induced morphism $q : Y \to A$. Let $g : X \to Y$ be a morphism over $A$, i.e. $q \circ g = p$. For every $i \in I$, we get a commutative square

$$
\begin{CD}
X_i @> g \,\circ\, w_i >> Y \\
@V p_i VV @VV q V \\
A_i @>> u_i > A
\end{CD}
$$

since $q \circ g \circ w_i = p \circ w_i = u_i \circ p_i$. By the claim for the family $(q_i : Y_i \to A_i)_{i \in I}$, there is a unique morphism $\varphi_i : X_i \to Y_i$ over $A_i$ with $v_i \circ \varphi_i = g \circ w_i$. The family $(\varphi_i)_{i \in I}$ satisfies $\Sigma((\varphi_i)_i) = g$, since both morphisms agree after composing with each $w_i$. Conversely, every family $(\psi_i)_{i \in I}$ with $\Sigma((\psi_i)_i) = g$ satisfies $v_i \circ \psi_i = g \circ w_i$, so that $\psi_i = \varphi_i$. Thus, $\Sigma$ is fully faithful.
:::

We show that the definition of extensive categories by Carboni–Lack–Walters, recalled in the introduction, agrees with ours:

::: Corollary
A category $\C$ with finite coproducts is extensive if and only if, for all objects $A,B$, the coproduct functor $\C/A \times \C/B \to \C/(A + B)$ is an equivalence of categories.
:::

::: Proof
For the non-trivial direction, assume the condition for families of two objects. The proof of (1) $\implies$ (2) in the proposition only uses the family at hand. Hence, binary coproducts are [pullback-stable](/category-property/pullback-stable_binary_coproducts) and disjoint. Thus, $\C$ has [disjoint finite coproducts](/category-property/disjoint_finite_coproducts), and the initial object is strict by [this result](/category-implication/pullback-stable_binary_coproducts_strict), so that $\C$ has [pullback-stable finite coproducts](/category-property/pullback-stable_finite_coproducts) by [this result](/category-implication/pullback-stable_finite_coproducts_binary). By the proposition, $\C$ is extensive.
:::
