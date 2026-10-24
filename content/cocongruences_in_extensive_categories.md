---
title: Cocongruences in extensive categories
description: This gives some results on cocongruences in extensive categories with various extra hypotheses.
---

# Cocongruences in extensive categories

We start with a general fact which is easier to visualize for the dual case of congruences.

::: Lemma 1
Let $q_1, q_2 : E \rightrightarrows X$ be a congruence such that the pullback $E \times_X E$ of $q_2$ and $q_1$ exists, and let $t : E \times_X E \to E$ be the transitivity morphism. Then we have pushout diagrams

$$
\begin{CD}
E \times_X E @> p_1 >> E @. \quad @. E \times_X E @> p_2 >> E \\
@V t VV @VV q_1 V @. @V t VV @VV q_2 V \\
E @> q_1 >> X @. \quad @. E @> q_2 >> X.
\end{CD}
$$

:::

::: Proof
Suppose we have a commutative square

$$
\begin{CD}
E \times_X E @> p_1 >> E \\
@V t VV @VV f V \\
E @> g >> T.
\end{CD}
$$

Then for any generalized element $(x, y)$ of $E$, consider the generalized elements $((x, x), (x, y))$ and $((x, y), (y, y))$ of $E \times_X E$. From the commutativity of the square acting on these generalized elements, we have
$$f(x, x) = g(x, y)$$
and
$$f(x, y) = g(x, y).$$
Therefore, if we define $h : X \to T$ on generalized elements by $h(x) \coloneqq f(x, x)$, we must have $f = h \circ q_1$ and $g = h \circ q_1$. Conversely, if $h$ is a morphism with $f = h \circ q_1$, we have $h(x)=f(x,y)$ for all $(x,y) \in E$, which for $y=x$ yields $h(x)=f(x,x)$.

This concludes the proof that the first diagram is a pushout diagram; the proof for the second is similar.
:::

::: Lemma 2
Suppose we have two pullback diagrams

$$
\begin{CD}
A_1 @> f_1 >> B @. \quad @. A_2 @> f_2 >> B \\
@V g_1 VV @VV h V @. @V g_2 VV @VV h V \\
C_1 @> k_1 >> D @. \quad @. C_2 @> k_2 >> D
\end{CD}
$$

in an extensive category $\C$. Then we can combine these into a pullback diagram

$$
\begin{CD}
A_1 + A_2 @> (f_1; f_2) >> B \\
@V g_1 + g_2 VV @VV h V \\
C_1 + C_2 @> (k_1; k_2) >> D.
\end{CD}
$$

:::

::: Proof
Suppose we have compatible maps $T \to B$ and $T \to C_1 + C_2$. Then using extensivity, we can find a decomposition of the latter into morphisms $T_1 \to C_1$ and $T_2 \to C_2$ where $T \cong T_1 + T_2$. Using the individual pullback diagrams, we can then construct morphisms $T_1 \to A_1$ and $T_2 \to A_2$ with the corresponding projections to $B, C_1, C_2$. The sum $T \cong T_1 + T_2 \to A_1 + A_2$ then gives the required morphism for the desired pullback diagram.

For uniqueness, suppose we have two generalized elements $s, s' \in (A_1 + A_2)(T)$ such that
$$(f_1; f_2)(s) = (f_1; f_2)(s')$$
and
$$(g_1 + g_2)(s) = (g_1 + g_2)(s').$$
Then we can find a decomposition of $s$ into generalized elements $a_1 \in A_1(T_1)$ and $a_2 \in A_2(T_2)$ where $T \cong T_1 + T_2$, and similarly a decomposition of $s'$ into generalized elements $a_1' \in A_1(T_1')$ and $a_2' \in A_2(T_2')$ where $T \cong T_1' + T_2'$. From the condition $(g_1 + g_2)(s) = (g_1 + g_2)(s')$, we get that
$$T \cong T_1 + T_2 \xrightarrow{g_1(a_1) + g_2(a_2)} C_1 + C_2$$
and
$$T \cong T_1' + T_2' \xrightarrow{g_1(a_1') + g_2(a_2')} C_1 + C_2$$
are equal. From the equivalence of categories $\C / C_1 \times \C / C_2 \cong \C / (C_1 + C_2)$, we can conclude that the slices $T_1 \xrightarrow{g_1(a_1)} C_1$ and $T_1' \xrightarrow{g_1(a_1')} C_1$ are isomorphic, and similarly for the slices $T_2 \xrightarrow{g_2(a_2)} C_2$ and $T_2' \xrightarrow{g_2(a_2')} C_2$. Without loss of generality, then, we may assume that $T_1 = T_1'$ and $T_2 = T_2'$; the isomorphism $T_1 + T_2 \cong T \cong T_1' + T_2'$ is the identity; and $g_1(a_1) = g_1(a_1')$ and $g_2(a_2) = g_2(a_2')$.

On the other hand, from $(f_1; f_2)(s) = (f_1; f_2)(s')$, we conclude $f_1(a_1) = f_1(a_1')$ and $f_2(a_2) = f_2(a_2')$. Therefore, from the uniqueness conditions on the given pullback diagrams, we get $a_1 = a_2$ and $a_1' = a_2'$. Hence, $s = (a_1; a_2) = (a_1'; a_2') = s'$.
:::

::: Corollary 3
Let $j_1, j_2 : X \rightrightarrows E$ be a cocongruence in an extensive category such that the pushout $E +_X E$ of $j_2$ and $j_1$ exists, and let $t : E \to E +_X E$ be the corresponding cotransitivity morphism. Then we have a pullback diagram

$$
\begin{CD}
X + X @> (j_1; j_2) >> E \\
@V j_1 + j_2 VV @VV t V \\
E + E @>>> E +_X E.
\end{CD}
$$

In particular, if the category also has pullback-stable regular epimorphisms, then for any cocongruence $j_1, j_2 : X \rightrightarrows E$ such that the pushout of $j_2$ and $j_1$ exists, the corresponding morphism $(j_1; j_2) : X + X \to E$ is a regular epimorphism.
:::

::: Proof
The pullback diagram comes from using Lemma 2 on the two pullback diagrams from the dual of Lemma 1. For the other conclusion, all we need to establish is that $E + E \to E +_X E$ is a regular epimorphism. However, this is immediate from the fact that the pushout $E +_X E$ is also a coequalizer of $i_1 \circ j_2, i_2 \circ j_1 : X \rightrightarrows E + E$. (This last fact is probably easier to see in its dual form, using generalized elements: if $q_1, q_2 : E \rightrightarrows X$ is a relation, and the binary product $E\times E$ and the pullback $E \times_X E$ of $q_2$ and $q_1$ exist, then $E \times_X E$ is also an equalizer of $q_2 \circ p_1, q_1 \circ p_2 : E\times E \rightrightarrows X$.)
:::

In the following results, define a <i>regular corelation</i> to be a corelation $j_1, j_2 : X \rightrightarrows E$ such that the binary copower of $X$ exists, and $(j_1; j_2) : X + X \to E$ is a regular epimorphism.

::: Lemma 4
In an extensive category, every regular coreflexive corelation $j_1, j_2 : X \rightrightarrows E$ such that the equalizer of $j_1$ and $j_2$ exists is an effective cocongruence.
:::

::: Proof
Let $e : Y \hookrightarrow X$ be the equalizer of $j_1$ and $j_2$. We will prove that the parallel pair

$$
\begin{align*}
(i_1; i_1 \circ e; i_2 \circ e; i_2) & ,\\
(i_1; i_2 \circ e; i_1 \circ e; i_2) & : X + Y + Y + X \rightrightarrows X + X
\end{align*}
$$

is a kernel pair of $(j_1; j_2) : X + X \to E$.
Informally, we can think of this as the subobject of $(X + X)^2 \cong \sum_{i,j=1}^2 X^2$ which is the diagonal of $X$ in the first and fourth quadrants, and the diagonal of $Y$ in the second and third quadrants.

To see this, note that since $j_1$ is a (split) monomorphism, we have a pullback diagram

$$
\begin{CD}
X @> \id >> X \\
@V \id VV @VV j_1 V \\
X @>> j_1 > E.
\end{CD}
$$

Similarly, since $e$ is formed as a coreflexive equalizer, we have a pullback diagram

$$
\begin{CD}
Y @> e >> X \\
@V e VV @VV j_1 V \\
X @>> j_2 > E.
\end{CD}
$$

To see this, suppose we have two generalized elements $x_1, x_2 \in X(T)$ such that $j_1(x_1) = j_2(x_2)$. Then letting $r : E \to X$ be the coreflexivity morphism, we see
$$x_1 = r(j_1(x_1)) = r(j_2(x_2)) = x_2$$
and
$$j_1(x_1) = j_2(x_2) = j_1(x_1),$$
so $x_1 = x_2$ factors uniquely through $e$. (See also <a href="/category-implication/pullbacks_imply_coreflexive_equalizers">here</a>; in particular, that result, along with the uniqueness of equalizers and pullbacks, would give an alternate proof with an additional hypothesis that the pullback exists.)

Combining these using Lemma 2, we get a pullback diagram

$$
\begin{CD}
X+Y @> (\id; e) >> X \\
@V \id + e VV @VV j_1 V \\
X+X @>> (j_1; j_2) > E.
\end{CD}
$$

Similarly, we get a pullback diagram

$$
\begin{CD}
Y+X @> (e; \id) >> X \\
@V e + \id VV @VV j_2 V \\
X+X @>> (j_1; j_2) > E.
\end{CD}
$$

Now, combining those two using Lemma 2 (transposed), we get a pullback diagram

$$
\begin{CD}
(X+Y)+(Y+X) @> (\id; e) + (e; \id) >> X+X \\
@V (\id+e; e+\id) VV @VV (j_1; j_2) V \\
X+X @>> (j_1; j_2) > E.
\end{CD}
$$

However, under the canonical isomorphism $(X+Y)+(Y+X) \cong X+Y+Y+X$, we see that $(\id; e) + (e; \id)$ corresponds to
$$(i_1; i_1\circ e; i_2\circ e; i_2) : X+Y+Y+X \to X+X,$$
whereas $(\id+e; e+\id)$ corresponds to
$$(i_1; i_2\circ e; i_1\circ e; i_2) : X+Y+Y+X \to X+X.$$
This completes the proof that these two morphisms form a kernel pair of $(j_1; j_2) : X + X \to E$.

Therefore, since $(j_1; j_2) : X + X \to E$ is a regular epimorphism, by <a href="/content/regular-epis-kernel-pairs">this result</a>, it is a coequalizer of this kernel pair. However, this coequalizer is exactly the congruence quotient in the construction of $X +_Y X$ <a href="/content/pushouts-of-monos-via-congruence-quotients">here</a>. Thus, we see that the original corelation is equivalent to the cokernel pair of $e$.
:::

::: Corollary 5
In an extensive and regular category with quotients of congruences, every cocongruence is effective.
:::

::: Proof
This follows by combining Corollary 3 and Lemma 4, using the existence of quotients of congruences so that $E +_X E$ always exists by <a href="/content/pushouts-of-monos-via-congruence-quotients">this result</a>.
:::
