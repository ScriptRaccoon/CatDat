---
title: Cocongruences on groups are effective
description: This result will be proved more generally for categories in which pushouts and monomorphisms interact in a suitable way.
author: Martin Brandenburg
---

## Cocongruences on groups are effective

Our goal is to prove that every cocongruence in $\Grp$ is effective. We will establish a more general result for categories in which pushouts and monomorphisms interact in a suitable way.

We shall say that a category $\C$ has _good pushouts of monomorphisms_ if it has pushouts of monomorphisms and if, for every diagram of monomorphisms

$$
\begin{CD}
B @>>> B' \\
@AAA @AAA \\
A @>>> A' \\
@VVV @VVV \\
C @>>> C'
\end{CD}
$$

in which each square is a pullback, the induced morphism
$$B \sqcup_A C \to B' \sqcup_{A'} C'$$
is also a monomorphism.

::: Proposition 1
The category $\Grp$ has good pushouts of monomorphisms.
:::

_Proof._ Consider a diagram as above. We regard every monomorphism in it as an inclusion. Choose a system of representatives $S \subseteq B$ for the right $A$-cosets in $B$, meaning that the multiplication map $\cdot : A \times S \to B$ is bijective. Likewise, choose $T \subseteq C$ such that the multiplication map $\cdot : A \times T \to C$ is bijective. We may assume that $1 \in S$ and $1 \in T$.

It is well known (see, for example, Serre's book _Trees_, Ch. I, §1, Thm. 1) that every element of the amalgamated free product $B \sqcup_A C$ has a unique representation of the form
$$w = a \cdot x_1 \cdots x_n,$$
where $a \in A$, each $x_i$ lies either in $S \setminus \{1\}$ or in $T \setminus \{1\}$, and these choices alternate.

The map

$$A \backslash B \to A' \backslash B', \, Ab \mapsto A'b$$

is injective. Indeed, if $b_1,b_2 \in B$ satisfy $A' b_1 = A' b_2$, then $b_1 b_2^{-1} \in A'$. Since $B \cap A' = A$, it follows that $b_1 b_2^{-1} \in A$, and hence $A b_1 = A b_2$.

Therefore, we may extend $S$ to a system of representatives $S' \subseteq B'$ for the right $A'$-cosets in $B'$. Likewise, we may extend $T$ to a system of representatives $T' \subseteq C'$ for the right $A'$-cosets in $C'$.

With respect to these systems, an element $w \in B \sqcup_A C$ written in normal form as above remains in normal form after being mapped to $B' \sqcup_{A'} C'$. This shows that the induced map is injective. <span class="qed">$\square$</span>

::: Proposition 2
Let $\C$ be a balanced category with good pushouts of monomorphisms and equalizers of monomorphisms. Then every cocongruence in $\C$ is effective.
:::

_Proof._ Let $X \in \C$ be an object, and let $i_1,i_2 : X \rightrightarrows Y$ be a cocongruence. Since it is coreflexive, there exists a morphism $r : Y \to X$ satisfying

$$r \circ i_1 = \id_X, \quad r \circ i_2 = \id_X.$$

In particular, $i_1$ and $i_2$ are monomorphisms. Since the cocongruence is cotransitive, there exists a morphism

$$c : Y \to Y \sqcup_{i_2,X,i_1} Y$$

satisfying

$$c \circ i_1 = u_1 \circ i_1, \quad c \circ i_2 = u_2 \circ i_2,$$

where $u_1,u_2 : Y \rightrightarrows Y \sqcup_{i_2,X,i_1} Y$ are the pushout inclusions satisfying $u_1 i_2 = u_2 i_1$. We will not use the fact that the cocongruence is cosymmetric; this will follow automatically. Define the monomorphism

$$E \coloneqq \eq(i_1,i_2) \hookrightarrow X.$$

Since $i_1$ and $i_2$ agree on $E$, there exists a unique morphism

$$\varphi : X \sqcup_E X \to Y$$

defined by $\varphi \circ j_1 = i_1$ and $\varphi \circ j_2 = i_2$, where $j_1,j_2 : X \rightrightarrows X \sqcup_E X$ are the two inclusions.

We must show that $\varphi$ is an isomorphism. It is clearly an epimorphism, since $i_1$ and $i_2$ are jointly epimorphic by assumption. Since $\C$ is balanced, it therefore suffices to prove that $\varphi$ is a monomorphism.

We will show that even the morphism

$$\gamma \coloneqq c \circ \varphi : X \sqcup_E X \to Y \sqcup_{i_2,X,i_1} Y$$

is a monomorphism. It is characterized by

$$\gamma \circ j_1 = c \circ \varphi \circ j_1 = c \circ i_1 = u_1 \circ i_1,$$
$$\gamma \circ j_2 = c \circ \varphi \circ j_2 = c \circ i_2 = u_2 \circ i_2.$$

In other words, $\gamma$ is induced by the diagram of monomorphisms

$$
\begin{CD}
X @>{i_1}>> Y \\
@AAA @AA{i_2}A \\
E @>>> X \\
@VVV @VV{i_2}V \\
X @>>{i_2}> Y
\end{CD}
$$

Since $\C$ has good pushouts of monomorphisms, it suffices to verify that both squares are pullbacks. Observe that the two squares are symmetric, so it is enough to consider one of them. To verify the universal property, let $a : T \to X$ and $b : T \to X$ be morphisms satisfying $i_1 \circ a = i_2 \circ b$. Applying $r : Y \to X$, we obtain

$$a = r \circ i_1 \circ a = r \circ i_2 \circ b = b.$$

Thus, $a$ is simply a morphism equalizing $i_1$ and $i_2$, so it factors uniquely through $E \hookrightarrow X$. <span class="qed">$\square$</span>

::: Corollary 3
Every cocongruence in the category $\Grp$ is effective.
:::
