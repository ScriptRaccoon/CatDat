---
title: A classification of congruences in the category of sets and relations
description: The classification will prove in particular that the category of sets and relations has quotients of congruences and that congruences are effective.
author: Daniel Schepler
---

## A classification of congruences in the category of sets and relations

We will give a classification of congruences in $\Rel$, the [category of sets and relations](/category/Rel). This classification will prove in particular that $\Rel$ has quotients of congruences and that congruences are effective.

Let $i : E \hookrightarrow X \times X$ be a congruence in $\Rel$. Recall that products in $\Rel$ are actually given by disjoint unions at the level of underlying sets. Also, recall that a morphism $R : X \to Y$ in $\Rel$ is a monomorphism if and only if
$$R_* : P(X) \to P(Y),\, S \mapsto \bigl\{ y\in Y \mid \exists x\in S, (x, y) \in R \bigr\}$$
is injective, and it is an isomorphism if and only if $R$ is the graph of a bijection $X \to Y$ in $\Set$.
In particular, we get
$$i_* : P(E) \to P(X + X) \simeq P(X) \times P(X)$$
which must be injective. It must also preserve arbitrary unions and in particular be inclusion-preserving. From the assumption that $i$ is a congruence, since the functor $(P, {-}_*) : \Rel \to \Set$ is representable by the object 1, we see that $i_*$ must have image given by an equivalence relation $\sim$ on $P(X)$. Note also that since $i_*$ preserves arbitrary unions, we must have that $\sim$ respects arbitrary unions.

Since the symmetry morphism $s : E \to E$ satisfies $s^2 = \id$, it must be the graph of an involution $s_0$ on $E$, where $s_0$ is a morphism in $\Set$.

::: Claim 1
Consider the reflexivity morphism $r : X \to E$. For each $x \in X$, $r_*(\{ x \})$ must be either a singleton or a pair.
:::

To see this, $r_*(\{ x \})$ certainly cannot be empty, or we would have
$$i_*(r_*(\{ x \})) = (\varnothing, \varnothing) \ne (\{ x \}, \{ x \}).$$
On the other hand, if we had at least three distinct elements $a,b,c \in r_*(\{ x \})$, then
$$i_*(\varnothing), i_*(\{ a \}), i_*(\{ a, b \}), i_*(\{ a, b, c \})$$
would have to be a chain of four distinct subsets of $i_*(r_*(\{ x \})) = (\{ x \}, \{ x \})$, which is impossible.

::: Claim 2
For each $x \in X$, if $r_*(\{ x \}) = \{ e, f \}$ with $e \ne f$, then $s_0(e) = f$ and $s_0(f) = e$; and we have either that $i_*(\{e\}) = (\varnothing, \{ x \})$ and $i_*(\{f\}) = (\{ x \}, \varnothing)$, or vice versa. Otherwise, if $r_*(\{ x \}) = \{ e \}$, then $s_0(e) = e$; and $i_*(\{ e \}) = (\{ x \}, \{ x \})$.
:::

To see this, if $r_*(\{ x \}) = \{ e, f \}$ with $e\ne f$, then we must have
$$\varnothing = i_*(\varnothing) \subsetneqq i_*(\{ e \}) \subsetneqq i_*(\{ e, f \}) = (\{ x \}, \{ x \}),$$
which means that $i_*(\{ e \})$ is equal to either $(\{ x \}, \varnothing)$ or $(\varnothing, \{ x \})$. By the same token, $i_*(\{ f \})$ is also one of those choices, and $i_*(\{ e \}) \ne i_*(\{ f \})$. Since
$$i_*(\{ s_0(e) \}) = i_*(s_*(\{ e \})) = i_*(\{ f \})$$
in either choice of order, by injectivity of $i_*$ we must have that $s_0(e) = f$. Similarly, $s_0(f) = e$. Otherwise, if $r_*(\{ x \}) = \{ e \}$ is a singleton,
$$i_*(\{ s_0(e) \}) = i_*(s_*(\{ e \})) = i_*(\{ e \}),$$
so injectivity of $i_*$ gives $s_0(e) = e$.

::: Claim 3
For $x\in X$, suppose that $r_*(\{ x \}) = \{ e \}$. Then $\{ x \} \not\sim \varnothing$.
:::

If we did have $\{ x \} \sim \varnothing$, then there would have to be some subset of $E$ which maps to $(\varnothing, \{ x \})$. Similarly to previous steps, injectivity of $i_*$ implies the subset is non-empty, and if the subset had two distinct elements $a,b$, then we would have
$$i_*(\varnothing) \subsetneqq i_*(\{a\}) \subsetneqq i_*(\{a,b\}) \subseteq (\varnothing, \{ x \}),$$
giving a contradiction. Therefore, this subset of $E$ would have to be a singleton $\{ f_1 \}$. Similarly, $(\{ x \}, \varnothing)$ would have to be the image of a singleton $\{ f_2 \}$ with $f_1 \ne f_2$. But then $i_*(\{ f_1, f_2 \}) = (\{ x \}, \{ x \}) = i_*(\{ e \})$, contradicting the injectivity of $i_*$.

::: Claim 4
For any $e \in E$, $i_*(\{ e \})$ is of one of the forms $(\{ x \}, \varnothing)$, $(\varnothing, \{ x \})$, or $(\{ x \}, \{ x \})$. In the first two cases, $s_0(e) \ne e$ and $\{ x \} \sim \varnothing$; and in the third case, $s_0(e) = e$ and $\{ x \} \not\sim \varnothing$.
:::

To show this, let $e\in E$, and suppose that $i_*(\{ e \}) = (S, T)$. Then $i_*(\{ s_0(e) \}) = (T, S)$, so
$$\textstyle i_*(\{ e, s_0(e) \}) = (S \cup T, S\cup T) = i_*\bigl(\bigcup_{x\in S\cup T} r_*(\{ x \})\bigr).$$
It follows that
$$\textstyle\bigcup_{x\in S\cup T} r_*(\{ x \}) = \{ e, s_0(e) \}.$$
Therefore, $e \in r_*(\{ x \})$ for some $x \in X$, and by claims 2 and 3, we get the desired conclusion.

::: Claim 5
For any $S, T \in P(X)$, $S \sim T$ if and only if $S\cap A = T\cap A$, where $A$ is the set of $x\in X$ such that $\{ x \} \not\sim \varnothing$.
:::

For the forward direction, suppose $(S, T) = i_*(U)$ for $U \subseteq E$. Then
$$\textstyle (S, T) = \bigcup_{e\in U} i_*(\{ e \}).$$
The set $i_*(\{ e \})$ satisfies the relation of having equal intersections with $A$ for each $e\in E$ in any case from claim 4; and this relation respects unions. For the reverse implication, whenever $x\notin A$, we have $\{ x \} \sim \varnothing$. Therefore, since
$$\textstyle S = (S \cap A) \cup \bigcup_{x\in S \setminus A} \{ x \},$$
we must have
$$\textstyle S \sim (S \cap A) \cup \bigcup_{x\in S \setminus A} \varnothing = S \cap A.$$
Similarly, $T \sim T \cap A$, so if $S\cap A = T\cap A$, then $S \sim T$.

::: Claim 6
Let $E'$ be the set pushout $X +_A X$ with inclusion maps $i_1, i_2 : X \to E'$. Define a morphism $E' \to X \times X$ in $\Rel$ given by the inverse relation of the graph $i_1 + i_2 : X + X \to E'$. Then the congruences $E$ and $E'$ are equivalent.
:::

We can define a bijection $E \to E'$ as follows: let $e \in E$. If $i_*(\{ e \}) = (\{ x \}, \varnothing)$ with $x\notin A$, then send $e \mapsto i_1(x)$; if $i_*(\{ e \}) = (\varnothing, \{ x \})$ with $x\notin A$, then send $e \mapsto i_2(x)$; and if $i_*(\{ e \}) = (\{ x \}, \{ x \})$ with $x \in A$, then send $e \mapsto i_1(x) = i_2(x)$. Transferring the congruence to $E'$, we see that it is exactly of the given form.

Now, without loss of generality we will assume from now on that the congruence is of exactly this form.

With this classification, we can show that $A$ is a quotient for the congruence, with quotient morphism $\Delta_A \subseteq A \times A \subseteq X \times A$. In fact, we can define a morphism $\Delta_A^\circ : A \to X$ as the inverse relation to $\Delta_A$, and a morphism $X \to E$ as the graph of $i_1$. It is then straightforward to verify that these maps together make $A$ a split coequalizer of $p_1 \circ i$ and $p_2 \circ i$.

We can also conclude that $E$ is the kernel pair of this quotient, by the general result below.

::: Lemma
Suppose we have a congruence $f, g : E \rightrightarrows X$ with a contractible coequalizer
$$ E \, \overset{f}{\underset{g}{\rightrightarrows}} \, X \overset{e}{\rightarrow} Q $$
with maps in the reverse direction $s : Q \to X$ and $t : X \to E$. Then $E$ is the kernel pair of this quotient, i.e. we have a cartesian square

$$
\begin{CD}
E @> f >> X \\
@V g VV @V e VV \\
X @> e >> A.
\end{CD}
$$

:::

_Proof._ Suppose we have generalized elements $x_1, x_2 : U \to X$ with $e x_1 = e x_2$. Then $f t x_1 = x_1$ and $g t x_1 = s e x_1$, so the pair $x_1, s e x_1$ factors through $E$. Similarly, the pair $x_2, s e x_2$ factors through $E$. However, by the assumption, we also have $s e x_1 = s e x_2$. Therefore, since $E$ is a congruence, we conclude $x_1, x_2$ factors through $E$. <span class="qed">$\square$</span>
