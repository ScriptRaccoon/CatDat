---
title: Cocongruences in extensive categories
description: This gives some results on cocongruences in extensive categories with various extra hypotheses.
---

# Cocongruences in extensive categories

We start with a general fact which is easier to visualize for the dual case of congruences.

::: Lemma 1
Let $q_1, q_2 : E \rightrightarrows X$ be a congruence such that the pullback $E \times_X E$ of $q_2$ and $q_1$ exists, and let $t : E \times_X E \to E$ be the transitivity morphism. Then we have pushout diagrams
$$\begin{CD}
E \times_X E @> p_1 >> E @. \quad @. E \times_X E @> p_2 >> E \\
@V t VV @VV q_1 V @. @V t VV @VV q_2 V \\
E @> q_1 >> X @. \quad @. E @> q_2 >> X.
\end{CD}$$
:::

::: Proof
Suppose we have a commutative square
$$\begin{CD}
E \times_X E @> p_1 >> E \\
@V t VV @VV f V \\
E @> g >> T.
\end{CD}$$
Then for any generalized element $(x, y)$ of $E$, consider the generalized elements $((x, x), (x, y))$ and $((x, y), (y, y))$ of $E \times_X E$. From the commutativity of the square acting on these generalized elements, we have
$$f(x, x) = g(x, y)$$
and
$$f(x, y) = g(x, y).$$
Therefore, if we define $h : X \to T$ on generalized elements by $h(x) \coloneqq f(x, x)$, we must have $f = h \circ q_1$ and $g = h \circ q_1$. Conversely, if $h$ is a morphism with $f = h \circ q_1$, we have $h(x)=f(x,y)$ for all $(x,y) \in E$, which for $y=x$ yields $h(x)=f(x,x)$.

This concludes the proof that the first diagram is a pushout diagram; the proof for the second is similar.
:::

::: Lemma 2
Suppose we have two pullback diagrams
$$\begin{CD}
A_1 @> f_1 >> B @. \quad @. A_2 @> f_2 >> B \\
@V g_1 VV @VV h V @. @V g_2 VV @VV h V \\
C_1 @> k_1 >> D @. \quad @. C_2 @> k_2 >> D
\end{CD}$$
in an extensive category. Then we can combine these into a pullback diagram
$$\begin{CD}
A_1 + A_2 @> (f_1; f_2) >> B \\
@V g_1 + g_2 VV @VV h V \\
C_1 + C_2 @> (k_1; k_2) >> D.
\end{CD}$$
:::

::: Proof
Suppose we have compatible maps $T \to B$ and $T \to C_1 + C_2$. Then using extensivity, we can find a decomposition of the latter into morphisms $T_1 \to C_1$ and $T_2 \to C_2$ where $T \cong T_1 + T_2$.  Using the individual pullback diagrams, we can then construct morphisms $T_1 \to A_1$ and $T_2 \to A_2$ with the corresponding projections to $B, C_1, C_2$. The sum $T \cong T_1 + T_2 \to A_1 + A_2$ then gives the required morphism for the desired pullback diagram. On the other hand, the uniqueness of this morphism $T \to A_1 + A_2$ follows from the uniqueness conditions for $T_1 \to A_1$ and $T_2 \to A_2$ from the assumed pullback diagrams, along with the disjointness of the coproduct $C_1 + C_2$ (to be exact, the fact that the coprojections $C_1 \to C_1 + C_2$ and $C_2 \to C_1 + C_2$ are monomorphisms).
:::

::: Corollary 3
Let $j_1, j_2 : X \rightrightarrows E$ be a cocongruence in an extensive category such that the pushout $E +_X E$ of $j_2$ and $j_1$ exists, and let $t : E \to E +_X E$ be the corresponding cotransitivity morphism. Then we have a pullback diagram
$$\begin{CD}
X + X @> (j_1; j_2) >> E \\
@V j_1 + j_2 VV @VV t V \\
E + E @>>> E +_X E.
\end{CD}$$
In particular, if the category also has pullback-stable regular epimorphisms, then for any cocongruence $j_1, j_2 : X \rightrightarrows E$, the corresponding morphism $(j_1; j_2) : X + X \to E$ is a regular epimorphism.
:::

::: Proof
The pullback diagram comes from using Lemma 2 on the two pullback diagrams from the dual of Lemma 1. For the other conclusion, all we need to establish is that $E + E \to E +_X E$ is a regular epimorphism. This follows from the construction of the pushout $E +_X E$ of monomorphisms (in fact, split monomorphisms with the coreflexivity morphism being the left inverse) as a quotient of a congruence on $E + E$ <a href="/content/pushouts-of-monos-via-congruence-quotients">here</a>.
:::

In the following results, define a <i>regular corelation</i> to be a corelation $j_1, j_2 : X \rightrightarrows E$ such that the binary copower of $X$ exists, and $(j_1; j_2) : X + X \to E$ is a regular epimorphism.

::: Lemma 4
In an extensive category, every regular coreflexive corelation $j_1, j_2 : X \rightrightarrows E$ such that the equalizer of $j_1$ and $j_2$ exists is an effective cocongruence.
:::

::: Proof
Let $e : Y \hookrightarrow X$ be the equalizer of $j_1$ and $j_2$. We will prove that the parallel pair
$$\begin{align*}
(i_1; i_1 \circ e; i_2 \circ e; i_2), & \\
(i_1; i_2 \circ e; i_1 \circ e; i_2) & : X + Y + Y + X \rightrightarrows X + X.
\end{align*}$$
is a kernel pair of $(j_1; j_2) : X + X \to E$.
Informally, we can think of this as the subobject of $(X + X)^2 \cong \sum_{i,j=1}^2 X$ which is the diagonal of $X$ in the first and fourth quadrants, and the diagonal of $Y$ in the second and third quadrants. In particular, if we have two morphisms $s, s' : T \to X + X$ such that $(j_1; j_2) \circ s = (j_1; j_2) \circ s'$, then we can use extensivity to decompose $s$ into a sum of morphisms $s_1 : T_1 \to X$ and $s_2 : T_2 \to X$ where $T \cong T_1 + T_2$. Then, we can decompose $s' |_{T_1}$ into a sum of morphisms $s_{11}' : T_{11} \to X$ and $s_{12}' : T_{12} \to X$ where $T_1 \cong T_{11} + T_{12}$, and similarly for $s' |_{T_2}$. In parallel, define $s_{11} \coloneqq s_1 |_{T_{11}}$, $s_{12} \coloneqq s_1 |_{T_{12}}$, $s_{21} \coloneqq s_2 |_{T_{21}}$, and $s_{22} \coloneqq s_2 |_{T_{22}}$. We thus get a decomposition
$$T \cong T_{11} + T_{12} + T_{21} + T_{22}$$
where
$$s = (i_1 \circ s_{11}; i_1 \circ s_{12}; i_2 \circ s_{21}; i_2 \circ s_{22})$$
and
$$s' = (i_1 \circ s_{11}'; i_2 \circ s_{12}'; i_1 \circ s_{21}'; i_2 \circ s_{22}').$$
From the condition that $(j_1, j_2) \circ s = (j_1, j_2) \circ s'$ as generalized elements of $E$, we see that
$$\begin{align*}
j_1(s_{11}) & = j_1(s_{11}'), \\
j_1(s_{12}) & = j_2(s_{12}'), \\
j_2(s_{21}) & = j_1(s_{21}'), \\
j_2(s_{22}) & = j_2(s_{22}').
\end{align*}$$
Applying the coreflexivity morphism $r : E \to X$ to both sides of each equation, we have $s_{11} = s_{11}'$, and similarly for the other pairs. Furthermore, since $j_1(s_{12}) = j_2(s_{12}') = j_2(s_{12})$, we have that $s_{12}$ factors through $e$, and similarly for $s_{21}$. Therefore, we get a generalized element
$$s_{11} + s_{12} + s_{21} + s_{22} = s_{11}' + s_{12}' + s_{21}' + s_{22}'\\
\in \Hom(T_{11} + T_{12} + T_{21} + T_{22}, X + Y + Y + X)\\
\cong \Hom(T, X + Y + Y + X)$$
with the required images in $X + X$.

Therefore, since $(j_1; j_2) : X + X \to E$ is a regular epimorphism, it is a coequalizer of this kernel pair. However, this coequalizer is exactly the congruence quotient in the construction <a href="/content/pushouts-of-monos-via-congruence-quotients">here</a> of $X +_Y X$. Thus, we see that the original corelation is equivalent to the cokernel pair of $e$.
:::

::: Corollary 5
In an extensive and regular category with quotients of congruences, every cocongruence is effective.
:::

::: Proof
This follows by combining Corollary 3 and Lemma 4, using the existence of quotients of congruences so that $E +_X E$ always exists by <a href="/content/pushouts-of-monos-via-congruence-quotients">this result</a>.
:::
