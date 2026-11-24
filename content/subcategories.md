---
title: Results on subcategories
description: We prove that several properties of categories descend to suitable subcategories.
---

# Results on subcategories

This page collects several useful results of the following form: if $U : \C \to \D$ is a faithful functor (perhaps even fully faithful, or satisfying additional assumptions) and $\D$ has a certain property, then $\C$ has this property as well.

::: Lemma 1
Let $\D$ be a category with a (regular) subobject classifier $\Omega$. Assume that $U : \C \to \D$ is a fully faithful functor such that (1) $U$ is coreflective, i.e. there is a functor $R : \D \to \C$ right adjoint to $U$, and (2) every (regular) monomorphism $Y \to U(X)$ in $\D$ is the image of a (regular) monomorphism $X' \to X$ in $\C$. Then $R(\Omega)$ is a (regular) subobject classifier in $\C$.
:::

::: Proof
If $X \in \C$, then
$$\Hom(X,R(\Omega)) \cong \Hom(U(X),\Omega) \cong \Sub(U(X)) \cong \Sub(X).$$
The same proof works for regular subobjects.
:::

::: Lemma 3
Let $U : \C \to \D$ be a fully faithful functor with a left adjoint $L : \D \to \C$ (i.e. $\C$ is equivalent to a reflective subcategory of $\D$). Assume that $\D$ has exact filtered colimits, that $\C$ has finite limits, and that $L$ preserves finite limits. Then $\C$ also has exact filtered colimits.
:::

::: Proof
It is well known (and easy to prove) that the colimit of a diagram $(X_j)$ in $\C$ is given by $L(\colim_j U(X_j))$, provided that the colimit in $\D$ exists. In particular, $\C$ has filtered colimits. By assumption, it also has finite limits, and $U$ preserves them since it is a right adjoint. Now let $X : \I \times \J \to \C$ be a diagram, where $\I$ is finite and $\J$ is filtered. We compute:

$$
\begin{align*}
\colim_j {\lim}_i X(i,j) & \cong L(\colim_j U({\lim}_i X(i,j))) \\
& \cong L(\colim_j {\lim}_i U(X(i,j))) \\
& \cong L({\lim}_i \colim_j U(X(i,j))) \\
& \cong {\lim}_i L(\colim_j U(X(i,j))) \\
& \cong {\lim}_i \colim_j X(i,j)
\end{align*}
$$

It is routine to check that the composite is the natural morphism.
:::

::: Lemma 5
Let $U : \C \to \D$ be a fully faithful functor with a right adjoint $R : \D \to \C$ (i.e. $\C$ is equivalent to a coreflective subcategory of $\D$). Assume that $\C$ has binary products, and that $U$ preserves these binary products. If $\D$ is cartesian closed, then so is $\C$, with exponentials in $\C$ given by
$$[X, Y]_{\C} \cong R([UX, UY]_{\D}).$$
:::

::: Proof
For any objects $X, Y, Z$ of $\C$ we have natural isomorphisms

$$
\begin{align*}
\Hom_\C(Z\times X, Y) & \cong \Hom_\D(UZ \times UX, UY) \\
& \cong \Hom_\D(UZ, [UX,UY]) \\
& \cong \Hom_\C\bigl(Z, R([UX,UY])\bigr).
\end{align*}
$$

:::

::: Corollary 6
If $\C$ is a cartesian closed category and $P$ is a [subterminal object](https://ncatlab.org/nlab/show/subterminal+object) of $\C$, then the slice category $\C / P$ is also cartesian closed, with exponentials in $\C / P$ given by
$$[X, Y]_{\C / P} \cong [X, Y]_{\C} \times P.$$
:::

::: Proof
The forgetful functor $\C / P \to \C$ is fully faithful; it has right adjoint ${-} \times P$; and it preserves binary products (in fact all inhabited limits). Hence, [Lemma 5](#lemma_5) applies.
:::

::: Lemma 7
Let $U : \C \to \D$ be a functor preserving pullbacks. Assume that $\D$ is regular and that $\C$ has finite limits and coequalizers of kernel pairs. If $U$ preserves and reflects regular epimorphisms, then $\C$ is regular. Moreover, this condition is satisfied when $U$ is conservative and preserves coequalizers.
:::

::: Proof
Since $\C$ has finite limits and coequalizers of kernel pairs, it remains to prove that regular epimorphisms are stable under pullbacks in $\C$. Assume first that $U$ preserves and reflects regular epimorphisms. If $X \to Y$ is a regular epimorphism and $Z \to Y$ is any morphism in $\C$, then $U(X) \to U(Y)$ is a regular epimorphism, and therefore also $U(X) \times_{U(Y)} U(Z) \to U(Z)$ is a regular epimorphism. Since $U$ preserves pullbacks, this identifies with $U(X \times_Y Z) \to U(Z)$, the image under $U$ of $X \times_Y Z \to Z$. Since $U$ reflects regular epimorphisms, it follows that $X \times_Y Z \to Z$ is a regular epimorphism, finishing the proof.

Now assume that $U$ is conservative and preserves coequalizers. Then it clearly preserves regular epimorphisms. Conversely, suppose that $f : X \to Y$ is a morphism in $\C$ such that $U(f)$ is a regular epimorphism. Then in $\C$ we have the diagram
$$X \times_Y X \rightrightarrows X \xrightarrow{p} \im(f) \xrightarrow{i} Y$$
where $X \times_Y X \rightrightarrows X$ is the kernel pair of $f$, and $\im(f)$ is the coequalizer. By the assumptions on $U$, its image is equivalent to the diagram in $\D$:
$$U(X) \times_{U(Y)} U(X) \rightrightarrows U(X) \xrightarrow{U(p)} U(\im(f)) \xrightarrow{U(i)} U(Y)$$
where $U(X) \times_{U(Y)} U(X)$ is the kernel pair of $U(f)$, and $U(\im(f))$ is the coequalizer. Since $U(f)$ is a regular epimorphism and $\D$ is regular, we must have that $U(i)$ is an isomorphism. Since $U$ is conservative, $i$ is an isomorphism as well, so $f$ is a regular epimorphism.
:::

::: Lemma 8
Let $U : \C \to \D$ be a fully faithful functor. Assume that $\C$ has pullbacks and coequalizers, that $U$ preserves pullbacks and coequalizers, and that $U$ preserves jointly monomorphic parallel pairs (which holds, for example, if $\C$ has binary products and $U$ preserves them). If $\D$ has effective congruences, then so does $\C$.
:::

::: Proof
Suppose we have a congruence $E \rightrightarrows X$ in $\C$. We first observe that its image $U(E) \rightrightarrows U(X)$ is a congruence in $\D$, and therefore effective. It is jointly monomorphic by assumption on $U$; the reflexivity and symmetry morphisms for $E$ are easily seen to transform under $U$ into reflexivity and symmetry morphisms for $U(E)$; and similarly, since $U$ preserves pullbacks, the transitivity morphism for $E$ transforms under $U$ into a transitivity morphism for $U(E)$.

Now let $X/E$ be the quotient of $E \rightrightarrows X$, i.e. its coequalizer. We will show that the canonical morphism
$$E \to X \times_{X/E} X$$
is an isomorphism. Since $U$ is fully faithful and preserves pullbacks, it suffices to prove that the canonical morphism
$$U(E) \to U(X) \times_{U(X/E)} U(X)$$
is an isomorphism, where $U(X/E)$ is the coequalizer of $U(E) \rightrightarrows U(X)$ since $U$ preserves coequalizers. Since the congruence $U(E) \rightrightarrows U(X)$ is effective by the first part of the proof, this follows from [this lemma](/content/effective-congruence-quotients).

Finally, to prove the parenthetical remark, assume that $\C$ has binary products and that $U$ preserves them. Then $U$ preserves jointly monomorphic parallel pairs, because it preserves monomorphisms (as it preserves pullbacks), and a pair $A \rightrightarrows B$ is jointly monomorphic if and only if the induced morphism $A \to B \times B$ is a monomorphism.
:::

::: Lemma 9
Let $U : \C \to \D$ be a faithful functor with a left adjoint $L : \D \to \C$. Then $L$ preserves generating collections. If $U$ is also conservative, then $L$ preserves extremal generating collections. (Thus in particular, any reflective subcategory of a category with a generating collection also has a generating collection; and similarly for a single generator.)
:::

::: Proof
Let $S$ be a collection of objects of $\D$. By the adjunction, the functor
$$(\Hom(L(G),-))_{G \in S} : \C \to (\Set^+)^S$$
is isomorphic to the composition of $U : \C \to \D$ followed by
$$(\Hom(G,-))_{G \in S} : \D \to (\Set^+)^S.$$

If $S$ is a generating collection, this is a composition of faithful functors, hence faithful. If $S$ is an extremal generating collection and $U$ is conservative, this is a composition of faithful conservative functors, hence faithful and conservative.
:::

::: Lemma 12
Let $U : \C \to \D$ be a fully faithful functor that preserves kernel pairs. Let $f : X \to Y$ be a morphism in $\C$ that has a kernel pair in $\C$. If $U(f)$ is a regular epimorphism in $\D$, then $f$ is a regular epimorphism in $\C$. In particular, if $U$ maps epimorphisms to regular epimorphisms and $\C$ is not epi-regular, then $\C$ does not have kernel pairs.
:::

::: Proof
Let $p_1,p_2 : E \rightrightarrows X$ be the kernel pair of $f$ in $\C$. Then $U(p_1),U(p_2)$ is the kernel pair of $U(f)$ in $\D$. Since $U(f)$ is a regular epimorphism, it is the coequalizer of $U(p_1),U(p_2)$ by [this lemma](/content/regular-epis-kernel-pairs). Since $U$ is fully faithful, it reflects colimits, so $f$ is the coequalizer of $p_1,p_2$ in $\C$, i.e. a regular epimorphism.

For the second statement, assume that $\C$ has kernel pairs and that $U$ maps epimorphisms to regular epimorphisms. By the first statement, every epimorphism of $\C$ is regular, i.e. $\C$ is epi-regular.
:::

::: Lemma 14
Let $U : \C \to \D$ be a fully faithful functor between categories with pushouts. Assume that $U$ preserves pushouts and regular monomorphisms. If $\D$ has pushout-stable regular monomorphisms, then so does $\C$.
:::

::: Proof
Let $m : X \to Y$ be a regular monomorphism and $X \to Z$ a morphism in $\C$, and let $m' : Z \to Z \sqcup_X Y$ be the induced morphism. Since $U$ preserves pushouts, $U(m')$ is the pushout of the regular monomorphism $U(m)$ along $U(X) \to U(Z)$, hence a regular monomorphism. Since $U$ preserves pushouts, it preserves cokernel pairs. By the dual of [Lemma 12](#lemma_12), $m'$ is a regular monomorphism.
:::

::: Lemma 16
Let $U : \C \to \D$ be a fully faithful functor with a left adjoint $L : \D \to \C$ (i.e. $\C$ is equivalent to a reflective subcategory of $\D$). Assume that $\C$ has finite products and filtered colimits, and that $L$ preserves binary products. If $\D$ has cartesian filtered colimits, then so does $\C$.
:::

::: Proof
Let $X$ be an object of $\C$ and $Y : \I \to \C$ a filtered diagram. Since $U$ is fully faithful, the counit $L \circ U \to \id_\C$ is an isomorphism. Since $L$ preserves colimits and $U$ preserves binary products, we get isomorphisms

$$ \begin{align*}
\textstyle \colim_{i \in \I} (X \times Y_i) & \cong \textstyle L\bigl(\colim_{i \in \I} (U(X) \times U(Y_i))\bigr), \\
\textstyle X \times \colim_{i \in \I} Y_i & \cong \textstyle L\bigl(U(X) \times \colim_{i \in \I} U(Y_i)\bigr),
\end{align*}$$
using in the second line that $L$ preserves binary products. Under these isomorphisms, the canonical comparison map $\colim_{i \in \I} (X \times Y_i) \to X \times \colim_{i \in \I} Y_i$ corresponds to $L$ applied to the canonical comparison map $\colim_{i \in \I} (U(X) \times U(Y_i)) \to U(X) \times \colim_{i \in \I} U(Y_i)$, which is an isomorphism since $\D$ has cartesian filtered colimits. Hence, the comparison map in $\C$ is an isomorphism.
:::
$$
