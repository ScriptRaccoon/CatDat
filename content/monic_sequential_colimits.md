---
title: The colimit of a sequence of monomorphisms
description: We find conditions under which a countably extensive category has colimits of sequences of monomorphisms.
---

# The colimit of a sequence of monomorphisms

::: Lemma 1
Let $\C$ be a countably extensive category with quotients of congruences. Then $\C$ has colimits of sequences of monomorphisms.
:::

::: Proof
Suppose we have a sequence $X_0 \hookrightarrow X_1 \hookrightarrow \cdots$ with corresponding monomorphisms $f_{m,n} : X_m \hookrightarrow X_n$ for $m \le n$. Define $Y$ to be the coproduct of all $X_n$. Now for each $m\le n$, define $E_{m,n} \coloneqq X_m$ with two maps $i_m, i_n \circ f_{m,n} : E_{m,n} \rightrightarrows Y$, and similarly for $m \ge n$ define $E_{m,n} \coloneqq X_n$ with two maps $i_m \circ f_{n,m}, i_n : E_{m,n} \rightrightarrows Y$. Then the coproduct of all $E_{m,n}$, with the induced morphisms to $Y$, forms a congruence. Here, to prove that the maps are jointly monomorphic, and again when proving transitivity, we use extensivity to split the domain of the generalized elements of $\coprod_{m,n \geq 0}^\infty E_{m,n}$ so that, without loss of generality, we may assume that each factors through one of the coproduct inclusions. Now a quotient of this congruence must be a colimit of the sequence.
:::

::: Lemma 2
Let $\C$ be a countably extensive category with coequalizers of kernel pairs. Assume that $X_0 \hookrightarrow X_1 \hookrightarrow \cdots$ is a sequence of monomorphisms that has a cocone $(X_n \hookrightarrow Y)$ consisting of monomorphisms. Then this sequence has a colimit.
:::

::: Proof
We consider the morphism $\coprod_{n \geq 0} X_n \to Y$ induced by the monomorphisms $X_n \hookrightarrow Y$. By assumption, its kernel pair $\coprod_{n \geq 0} X_n \times_Y \coprod_{n \geq 0} X_n$ exists, and the two projections to $\coprod_{n \geq 0} X_n$ have a coequalizer. We will prove that this coequalizer is a colimit of the sequence $X_1 \hookrightarrow X_2 \hookrightarrow \cdots$. For this, it suffices to find a natural bijection between cocones $(h_n : X_n \to T)_{n \geq 0}$ and morphisms $h : \coprod_{n \geq 0} X_n \to T$ that coequalize the two projections, where $T \in \C$ is any object.

A morphism $h : \coprod_{n \geq 0} X_n \to Y$ is equivalent to a family of morphisms $(h_n : X_n \to T)_{n \geq 0}$. Since $\C$ is countably extensive, the canonical morphism
$$\textstyle \coprod_{n,m \geq 0} X_n \times_Y X_m \to \coprod_{n \geq 0} X_n \times_Y \coprod_{m \geq 0} X_m$$
is an isomorphism. Hence, $h$ coequalizes the two projections if and only if for all $n,m \geq 0$ the diagram

$$
\begin{CD}
X_n \times_Y X_m @>>> X_n \\
@VVV @VVV \\
X_m @>>> T
\end{CD}
$$

commutes. Without loss of generality, we may assume $n \leq m$. But then $X_n \times_Y X_m \cong X_n$, and the diagram simplifies to

$$
\begin{CD}
X_n @>{=}>> X_n \\
@VVV @VVV \\
X_m @>>> T,
\end{CD}
$$

which is precisely the cocone condition for $(h_n : X_n \to T)_{n \geq 0}$.
:::
