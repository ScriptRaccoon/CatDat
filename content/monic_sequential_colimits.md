---
title: The colimit of a sequence of monomorphisms
description: We find conditions under which a countably extensive category has colimits of sequences of monomorphisms.
---

# The colimit of a sequence of monomorphisms

::: Lemma 1
Let $\C$ be a countably extensive category with quotients of congruences. Then $\C$ has colimits of sequences of monomorphisms.
:::

::: Proof
Suppose we have a sequence $X_0 \hookrightarrow X_1 \hookrightarrow \cdots$ with corresponding monomorphisms $f_{m,n} : X_m \hookrightarrow X_n$ for $m \le n$. Let $Y \coloneqq \coprod_{n \geq 0} X_n$ with coproduct inclusions $i_n : X_n \hookrightarrow Y$. For $m,n \geq 0$, define $E_{m,n} \coloneqq X_{\min(m,n)}$. Let $R \coloneqq \coprod_{m,n \geq 0} E_{m,n}$ with coproduct inclusions $j_{m,n} : E_{m,n} \hookrightarrow R$, and let $q_1, q_2 : R \rightrightarrows Y$ be the morphisms defined by
$$q_1 \circ j_{m,n} = \begin{cases} i_m & \text{if } m \leq n, \\ i_m \circ f_{n,m} & \text{if } m \geq n, \end{cases} \qquad q_2 \circ j_{m,n} = \begin{cases} i_n \circ f_{m,n} & \text{if } m \leq n, \\ i_n & \text{if } m \geq n. \end{cases}$$
For $m = n$, both cases agree. In particular, $q_1 \circ j_{m,n}$ factors through $i_m$, and $q_2 \circ j_{m,n}$ factors through $i_n$.

A morphism $h : Y \to T$ corresponds to a family of morphisms $h_n : X_n \to T$, and $h \circ q_1 = h \circ q_2$ holds if and only if $h \circ q_1 \circ j_{m,n} = h \circ q_2 \circ j_{m,n}$ for all $m,n \geq 0$. For $m \leq n$, we have
$$h \circ q_1 \circ j_{m,n} = h \circ i_m = h_m, \qquad h \circ q_2 \circ j_{m,n} = h \circ i_n \circ f_{m,n} = h_n \circ f_{m,n},$$
so the condition means $h_m = h_n \circ f_{m,n}$; the case $m \geq n$ gives the same condition with $m$ and $n$ exchanged. This is precisely the cocone condition. Hence, it suffices to show that $q_1, q_2$ is a congruence on $Y$, since then its quotient is a colimit of the sequence.

We will repeatedly use the following consequence of extensivity: if $a : T \to \coprod_{k \in K} A_k$ is a morphism into a countable coproduct, then pulling back the coproduct inclusions along $a$ yields a decomposition $T \cong \coprod_{k \in K} T_k$ such that the restriction of $a$ to each $T_k$ factors through the inclusion $A_k \hookrightarrow \coprod_{k \in K} A_k$. Applying this successively to finitely many morphisms $a_1,\dotsc,a_p$ from $T$ into countable coproducts (and their restrictions to the pieces obtained so far), we obtain a decomposition $T \cong \coprod_{l \in L} T_l$ with $L$ countable such that each restriction of each of these morphisms to each $T_l$ factors through a coproduct inclusion. Morphisms out of $T$ agree if and only if their restrictions to all $T_l$ agree, and morphisms out of the $T_l$ glue to a morphism out of $T$.

Say that a morphism $x : T \to Y$ _lies in_ $X_m$ if $x = i_m \circ x'$ for some $x' : T \to X_m$, which is unique since coproduct inclusions in an extensive category are monomorphisms. If $x$ lies in $X_m$ and in $X_n$ for some $m \neq n$, then $x$ factors through $X_m \times_Y X_n$, which is initial since coproducts in an extensive category are disjoint. Hence, $T$ is initial since initial objects in an extensive category are strict. $(\ast)$

First, $q_1, q_2$ are jointly monomorphic. Let $e, e' : T \rightrightarrows R$ with $q_1 \circ e = q_1 \circ e'$ and $q_2 \circ e = q_2 \circ e'$. Decompose $T$ such that on each piece $S$ we have $e|_S = j_{m,n} \circ a$ and $e'|_S = j_{m',n'} \circ a'$ for some $m,n,m',n'$ and some $a : S \to E_{m,n}$, $a' : S \to E_{m',n'}$. Then $q_1 \circ e|_S = q_1 \circ j_{m,n} \circ a$ lies in $X_m$, and
$$q_1 \circ e|_S = q_1 \circ e'|_S = q_1 \circ j_{m',n'} \circ a'$$
lies in $X_{m'}$, so that $S$ is initial by $(\ast)$ if $m \neq m'$; likewise, using $q_2$, if $n \neq n'$. On initial pieces, $e$ and $e'$ trivially agree. If $(m,n) = (m',n')$ and $m \leq n$, then
$$i_m \circ a = q_1 \circ j_{m,n} \circ a = q_1 \circ e|_S = q_1 \circ e'|_S = q_1 \circ j_{m,n} \circ a' = i_m \circ a',$$
hence $a = a'$ since $i_m$ is a monomorphism; if $m \geq n$, use $q_2$ and $i_n$ instead. Thus, $e|_S = e'|_S$ for all pieces $S$, and therefore $e = e'$.

It remains to show that for every object $T$, the image of $\Hom(T,R) \to \Hom(T,Y)^2$, $e \mapsto (q_1 \circ e, q_2 \circ e)$ is an equivalence relation. We call a pair of morphisms $x,y : T \rightrightarrows Y$ _related_ if it lies in this image, that is, if there is a morphism $e : T \to R$ with $q_1 \circ e = x$ and $q_2 \circ e = y$.

For reflexivity, let $\delta : Y \to R$ be the morphism with $\delta \circ i_n = j_{n,n}$ for all $n$. Since $q_1 \circ j_{n,n} = i_n = q_2 \circ j_{n,n}$, we have $q_1 \circ \delta = \id_Y = q_2 \circ \delta$. Hence, for every $x : T \to Y$, the morphism $\delta \circ x$ witnesses that $(x,x)$ is related. For symmetry, let $\sigma : R \to R$ be the morphism with $\sigma \circ j_{m,n} = j_{n,m}$, which makes sense since $E_{m,n} = E_{n,m}$. The formulas for $q_1$ and $q_2$ above show that $q_1 \circ j_{n,m} = q_2 \circ j_{m,n}$ for all $m,n$. Hence, we have $q_1 \circ \sigma = q_2$, and likewise $q_2 \circ \sigma = q_1$. Thus, if $e$ witnesses that $(x,y)$ is related, then $\sigma \circ e$ witnesses that $(y,x)$ is related.

For transitivity, we use the following auxiliary relation. For morphisms $x' : T \to X_m$ and $y' : T \to X_n$, write $x' \sim y'$ if $f_{m,k} \circ x' = f_{n,k} \circ y'$ for all $k \geq m,n$. Since the equation for $k = \max(m,n)$ implies the equation for all larger $k$, we have $x' \sim y'$ if and only if $y' = f_{m,n} \circ x'$ in case $m \leq n$, and if and only if $x' = f_{n,m} \circ y'$ in case $m \geq n$. Clearly, $\sim$ is symmetric. It is also transitive: if $x' \sim y'$ and $y' \sim z'$ with $z' : T \to X_p$, then the equation $f_{m,k} \circ x' = f_{p,k} \circ z'$ holds for all $k \geq m,n,p$, and hence for all $k \geq m,p$ by cancelling the monomorphisms $f_{k,k'}$.

We claim that if $x' : T \to X_m$ and $y' : T \to X_n$, then $(i_m \circ x', i_n \circ y')$ is related if and only if $x' \sim y'$. Since $\sim$ and relatedness are symmetric, we may assume $m \leq n$. If $x' \sim y'$, then $y' = f_{m,n} \circ x'$, and we may regard $x'$ as a morphism $T \to E_{m,n} = X_m$. Then $e \coloneqq j_{m,n} \circ x' : T \to R$ satisfies
$$q_1 \circ e = i_m \circ x', \qquad q_2 \circ e = i_n \circ f_{m,n} \circ x' = i_n \circ y'.$$
Conversely, let $e : T \to R$ with $q_1 \circ e = i_m \circ x'$ and $q_2 \circ e = i_n \circ y'$. Decompose $T \cong \coprod_{k,l \geq 0} T_{k,l}$ such that $e|_{T_{k,l}} = j_{k,l} \circ e_{k,l}$ for some $e_{k,l} : T_{k,l} \to E_{k,l}$. Then
$$i_m \circ x'|_{T_{k,l}} = q_1 \circ e|_{T_{k,l}} = q_1 \circ j_{k,l} \circ e_{k,l},$$
and this morphism also lies in $X_k$ since $q_1 \circ j_{k,l}$ factors through $i_k$. So $T_{k,l}$ is initial by $(\ast)$ when $k \neq m$. Likewise,
$$i_n \circ y'|_{T_{k,l}} = q_2 \circ e|_{T_{k,l}} = q_2 \circ j_{k,l} \circ e_{k,l}$$
also lies in $X_l$, so that $T_{k,l}$ is initial when $l \neq n$. On initial pieces, the equation $y' = f_{m,n} \circ x'$ holds trivially. On $T_{m,n}$, since $m \leq n$, we have

$$
\begin{align*}
i_m \circ x'|_{T_{m,n}} & = q_1 \circ j_{m,n} \circ e_{m,n} = i_m \circ e_{m,n}, \\
i_n \circ y'|_{T_{m,n}} & = q_2 \circ j_{m,n} \circ e_{m,n} = i_n \circ f_{m,n} \circ e_{m,n}.
\end{align*}
$$

Cancelling the monomorphisms $i_m$ and $i_n$ gives $y'|_{T_{m,n}} = f_{m,n} \circ x'|_{T_{m,n}}$. Therefore, $y' = f_{m,n} \circ x'$.

Now let $x,y,z : T \to Y$ such that $(x,y)$ and $(y,z)$ are related. Decompose $T$ such that on each piece $S$, the restrictions of $x,y,z$ lie in some $X_m, X_n, X_p$, respectively, say $x|_S = i_m \circ x'$, $y|_S = i_n \circ y'$, $z|_S = i_p \circ z'$. Restricting the witnesses to $S$ shows that $(x|_S, y|_S)$ and $(y|_S, z|_S)$ are related, so the claim gives $x' \sim y'$ and $y' \sim z'$, hence $x' \sim z'$ by transitivity of $\sim$, and therefore $(x|_S, z|_S)$ is related by the claim again. Gluing the morphisms $S \to R$ witnessing this, we obtain a morphism $T \to R$ witnessing that $(x,z)$ is related. This finishes the proof that $q_1, q_2$ is a congruence.
:::

::: Lemma 2
Let $\C$ be a countably extensive category with coequalizers of kernel pairs. Assume that $X_0 \hookrightarrow X_1 \hookrightarrow \cdots$ is a sequence of monomorphisms that has a cocone $(X_n \hookrightarrow Y)$ consisting of monomorphisms. Then this sequence has a colimit.
:::

::: Proof
We consider the morphism $u : \coprod_{n \geq 0} X_n \to Y$ induced by the monomorphisms $u_n : X_n \hookrightarrow Y$, and denote the coproduct inclusions by $i_n : X_n \hookrightarrow \coprod_{n \geq 0} X_n$. By assumption, the pullback $K \coloneqq \coprod_{n \geq 0} X_n \times_Y \coprod_{m \geq 0} X_m$ exists, and the two projections $p_1, p_2 : K \rightrightarrows \coprod_{n \geq 0} X_n$ have a coequalizer. We will prove that this coequalizer is a colimit of the sequence $X_0 \hookrightarrow X_1 \hookrightarrow \cdots$. For this, it suffices to find a natural bijection between cocones $(h_n : X_n \to T)_{n \geq 0}$ and morphisms $h : \coprod_{n \geq 0} X_n \to T$ that coequalize the two projections, where $T \in \C$ is any object.

For $n \leq m$, the pullback $X_n \times_Y X_m$ exists and is given by $X_n$ with the projections $\id_{X_n}$ and $X_n \hookrightarrow X_m$, since $X_n \hookrightarrow Y$ factors through the monomorphism $X_m \hookrightarrow Y$. By symmetry, all pullbacks $X_n \times_Y X_m$ exist. Since $\C$ is countably extensive, the canonical morphism
$$\textstyle \coprod_{n,m \geq 0} X_n \times_Y X_m \to \coprod_{n \geq 0} X_n \times_Y \coprod_{m \geq 0} X_m$$
is an isomorphism. To see this, let $K_n \hookrightarrow K$ be the pullback of $i_n$ along $p_1$, and let $K_{n,m} \hookrightarrow K_n$ be the pullback of $i_m$ along the restriction of $p_2$ to $K_n$. Since $\C$ is countably extensive, we have $K \cong \coprod_{n \geq 0} K_n$ and $K_n \cong \coprod_{m \geq 0} K_{n,m}$, hence $K \cong \coprod_{n,m \geq 0} K_{n,m}$. By construction, a morphism $S \to K_{n,m}$ corresponds to a morphism $e : S \to K$ such that $p_1 \circ e$ factors through $i_n$ and $p_2 \circ e$ factors through $i_m$. Since $i_n$ and $i_m$ are monomorphisms, this corresponds to a pair of morphisms $a : S \to X_n$, $b : S \to X_m$ with $u \circ i_n \circ a = u \circ i_m \circ b$, that is, $u_n \circ a = u_m \circ b$. Hence, $K_{n,m}$ is a pullback $X_n \times_Y X_m$, and the isomorphism $\coprod_{n,m \geq 0} K_{n,m} \cong K$ is the canonical morphism above.

A morphism $h : \coprod_{n \geq 0} X_n \to T$ is equivalent to a family of morphisms $(h_n : X_n \to T)_{n \geq 0}$. By the isomorphism above, $h$ coequalizes the two projections if and only if for all $n,m \geq 0$ the diagram

$$
\begin{CD}
X_n \times_Y X_m @>>> X_n \\
@VVV @VVV \\
X_m @>>> T
\end{CD}
$$

commutes. Without loss of generality, we may assume $n \leq m$. Then the diagram simplifies to

$$
\begin{CD}
X_n @>{=}>> X_n \\
@VVV @VVV \\
X_m @>>> T,
\end{CD}
$$

which is precisely the cocone condition for $(h_n : X_n \to T)_{n \geq 0}$.
:::
