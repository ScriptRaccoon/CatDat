---
title: Results on subcategories
description: We prove that several properties of categories descend to suitable subcategories.
---

## Results on subcategories

This page collects several useful results of the following form: if $U : \C \to \D$ is a faithful functor (perhaps even fully faithful, or satisfying additional assumptions) and $\D$ has a certain property, then $\C$ has this property as well.

::: Lemma 1
Let $\D$ be a category with a (regular) subobject classifier $\Omega$. Assume that $U : \C \to \D$ is a fully faithful functor such that (1) $U$ is coreflective, i.e. there is a functor $R : \D \to \C$ right adjoint to $U$, and (2) every (regular) monomorphism $Y \to U(X)$ in $\D$ is the image of a (regular) monomorphism $X' \to X$ in $\C$. Then $R(\Omega)$ is a (regular) subobject classifier in $\C$.
:::

_Proof._
If $X \in \C$, then
$$\Hom(X,R(\Omega)) \cong \Hom(U(X),\Omega) \cong \Sub(U(X)) \cong \Sub(X).$$
The same proof works for regular subobjects. <span class="qed">$\square$</span>

::: Lemma 2
Let $\C$ be a category with filtered colimits. Assume that $U : \C \to \D$ is a faithful functor that preserves monomorphisms and filtered colimits. If monomorphisms in $\D$ are stable under filtered colimits, then the same is true in $\C$.
:::

For the record, here is the dual statement: let $\C$ be a category with cofiltered limits. Assume that $U : \C \to \D$ is a faithful functor that preserves epimorphisms and cofiltered limits. If epimorphisms in $\D$ are stable under cofiltered limits, then the same is true in $\C$.

_Proof._
If $(f_i : X_i \to Y_i)$ is a filtered diagram of monomorphisms in $\C$, it induces a filtered diagram $(U(f_i) : U(X_i) \to U(Y_i))$ of monomorphisms in $\D$. Hence, its colimit
$\colim_i U(f_i) : \colim_i U(X_i) \to \colim_i U(Y_i)$
is a monomorphism in $\D$. This morphism is isomorphic to
$U(\colim_i f_i) : U(\colim_i X_i) \to U(\colim_i Y_i)$.
Since $U(\colim_i f_i)$ is a monomorphism in $\D$ and $U$ is faithful, it follows that $\colim_i f_i$ is a monomorphism in $\C$. <span class="qed">$\square$</span>

::: Lemma 3
Let $U : \C \to \D$ be a fully faithful functor with a left adjoint $L : \D \to \C$ (i.e. $\C$ is equivalent to a reflective subcategory of $\D$). Assume that $\D$ has exact filtered colimits, that $\C$ has finite limits, and that $L$ preserves finite limits. Then $\C$ also has exact filtered colimits.
:::

_Proof._
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

<span class="qed">$\square$</span>

::: Lemma 4
Let $U : \C \to \D$ be a fully faithful functor. Assume that $\C$ has finite products and filtered colimits, and that $U$ preserves binary products and filtered colimits. If $\D$ has cartesian filtered colimits, then so does $\C$.
:::

_Proof._
Let $X$ be an object of $\C$ and $Y : \I \to \C$ a filtered diagram. Then we have the canonical comparison map $c : \colim_{i\in\I} (X \times Y_i) \to X \times \colim_{i\in\I} Y_i$. By the assumptions, $Uc$ is equivalent to the comparison map $\colim_{i\in\I} (UX \times UY_i) \to UX \times \colim_{i\in\I} UY_i$, which is an isomorphism. Since $U$ is fully faithful and therefore conservative, we conclude that $c$ is an isomorphism. <span class="qed">$\square$</span>

::: Lemma 5
Let $U : \C \to \D$ be a fully faithful functor with a right adjoint $R : \D \to \C$ (i.e. $\C$ is equivalent to a coreflective subcategory of $\D$). Assume that $\C$ has binary products, and that $U$ preserves these binary products. If $\D$ is cartesian closed, then so is $\C$, with exponentials in $\C$ given by
$$[X, Y]_{\C} \cong R([UX, UY]_{\D}).$$
:::

_Proof._ For any objects $X, Y, Z$ of $\C$ we have natural isomorphisms

$$
\begin{align*}
\Hom_\C(Z\times X, Y) & \cong \Hom_\D(UZ \times UX, UY) \\
& \cong \Hom_\D(UZ, [UX,UY]) \\
& \cong \Hom_\C\bigl(Z, R([UX,UY])\bigr).
\end{align*}
$$

<span class="qed">$\square$</span>

::: Corollary 6
If $\C$ is a cartesian closed category and $P$ is a [subterminal object](https://ncatlab.org/nlab/show/subterminal+object) of $\C$, then the slice category $\C / P$ is also cartesian closed, with exponentials in $\C / P$ given by
$$[X, Y]_{\C / P} \cong [X, Y]_{\C} \times P.$$
:::

_Proof._ The forgetful functor $\C / P \to \C$ is fully faithful; it has right adjoint ${-} \times P$; and it preserves binary products (in fact all inhabited limits). Hence, Lemma 5 applies. <span class="qed">$\square$</span>

::: Lemma 7
Let $U : \C \to \D$ be a fully faithful functor. Assume that $\C$ has finite limits and coequalizers, and that $U$ preserves pullbacks and coequalizers. If $\D$ is regular, then so is $\C$.
:::

_Proof._ Since $\C$ has finite limits and coequalizers, the only nontrivial part of proving $\C$ is regular is to check that regular epimorphisms are stable under pullbacks in $\C$. Since $U$ preserves pullbacks and regular epimorphisms, it suffices to show that $U$ reflects regular epimorphisms. Thus, suppose $f : X \to Y$ is a morphism in $\C$ with $Uf$ a regular epimorphism. Then in $\C$ we have the diagram
$$X \times_Y X \rightrightarrows X \to \im(f) \xrightarrow{i} Y$$
where $X \times_Y X$ is the kernel pair of $f$, and $\im(f)$ is the coequalizer. By the assumptions, the image under $U$ is equivalent to the diagram in $\D$:
$$UX \times_{UY} UX \rightrightarrows UX \to \im(Uf) \xrightarrow{Ui} UY$$
where $UX \times_{UY} UX$ is the kernel pair of $Uf$, and $\im(Uf)$ is the coequalizer. Since $Uf$ is a regular epimorphism, we must have $Ui$ is an isomorphism. Since $U$ is fully faithful and therefore conservative, we get $i$ is an isomorphism as well, so $f$ is a regular epimorphism. <span class="qed">$\square$</span>

::: Lemma 8
Let $U : \C \to \D$ be a fully faithful functor. Assume that $\C$ has finite limits and coequalizers, and that $U$ preserves inhabited finite limits and coequalizers. If $\D$ has effective congruences, then so does $\C$.
:::

_Proof._ Suppose we have a congruence $E \hookrightarrow X\times X$ in $\C$. We can then form the quotient $X \to X/E$ as a coequalizer, along with the kernel pair $X \times_{X/E} X$ and the comparison map $i$ in the diagram below:
$$E \xrightarrow{i} X \times_{X/E} X \rightrightarrows X \to X/E.$$
By the assumptions, the image under $U$ is equivalent to the diagram in $\D$:
$$UE \xrightarrow{Ui} UX \times_{U(X/E)} UX \rightrightarrows UX \to U(X/E).$$
Here, $UE \rightrightarrows UX$ is a congruence: the map $UE \to UX \times UX$ is a monomorphism since $U$ preserves pullbacks and therefore preserves monomorphisms; the reflexivity and symmetry morphisms for $E$ are easily seen to transform under $U$ to reflexivity and symmetry morphisms for $UE$; and similarly, since $U$ preserves pullbacks, the transitivity morphism for $E$ transforms under $U$ to a transitivity morphism for $UE$. This congruence $UE$ of $\D$ is effective, so we must have $Ui$ is an isomorphism. Since $U$ is fully faithful and therefore conservative, we get $i$ is an isomorphism as well, so $E$ is effective. <span class="qed">$\square$</span>

::: Lemma 9
Let $L$ be a functor which is left adjoint to a faithful functor $U$. Then $L$ preserves generating sets. (Thus in particular, any reflective subcategory of a category with a generating set also has a generating set; and similarly for a single generator.)
:::

_Proof._ If $S$ is a generating set,

$$
\begin{align*}
\prod_{G\in S} \Hom(L(G),-) & \cong \prod_{G\in S} \Hom(G,U(-)) \\
& \cong \left( \prod_{G\in S} \Hom(G,-) \right) \circ U
\end{align*}
$$

is a composition of faithful functors, hence faithful. <span class="qed">$\square$</span>

::: Lemma 10
Any fully faithful functor reflects extremal generating sets (and therefore, by duality, it also reflects extremal cogenerating sets). In other words, if $U : \C \to \D$ is a fully faithful functor, and $S$ is a set of objects such that $U(S)$ is an extremal generating set of $\D$, then $S$ is an extremal generating set of $\C$.
:::

_Proof:_ Under the given assumptions, we can factor $\C \to (\Set^+)^S$, $X \mapsto (\Hom_\C(G, X))_{G\in S}$, as being isomorphic to the composition of $U : \C \to D$ followed by $Y \mapsto (\Hom_\D(UG, Y))_{G\in S}$, using the assumption on $U$ to identify $\Hom_\D(UG, UX)$ with $\Hom_C(G, X)$ naturally in $X$. In this composition, the first is fully faithful and therefore also conservative; and the second is assumed to be faithful and conservative. Therefore, the composition is also faithful and conservative. <span class="qed">$\square$</span>

::: Lemma 11
Let $U : \C \to \D$ be a faithful conservative functor (for example, a fully faithful functor). Assume that $\D$ is extensive, that $\C$ has finite coproducts and pullbacks along coproduct inclusions, and that $U$ preserves both. Then $\C$ is extensive. A similar statement holds for infinitary extensive (and countably extensive) categories, in which case we assume that $\C$ has all coproducts (resp. all countable coproducts) and that $U$ preserves these.
:::

_Proof._ This is straight forward. We need to prove that finite coproducts are disjoint and stable under pullbacks in $\C$. If $A,B \in \C$, the coproduct inclusion $A \to A + B$ is a monomorphism: Since $U$ is faithful, it suffices to prove that its image under $U$ is a monomorphism. Since $U$ preserves finite coproducts, the image identifies with the coproduct inclusion $U(A) \to U(A) + U(B)$, which is a monomorphism since $\D$ is extensive. Moreover, the unique morphism $0 \to A \times_{A + B} B$ is an isomorphism: Since $U$ is conservative, it suffices to prove that its image under $U$ is an isomorphism. Since $U$ preserves finite coproducts and pullbacks along coproduct inclusions, the image identifies with the unique morphism $0 \to U(A) \times_{U(A) + U(B)} U(B)$, which is an isomorphism since $\D$ is extensive. This proves that finite coproducts are disjoint in $\C$. To prove that they are stable under pullbacks, let $T \to A + B$ be any morphism in $\C$, and consider the pullbacks $T_A := T \times_{A + B} A$ and $T_B := T \times_{A + B} B$. We need to show that the canonical morphism $T_A + T_B \to T$ is an isomorphism. Since $U$ is conservative, it suffices to prove that its image under $U$ is an isomorphism. Since $U$ preserves finite coproducts and pullbacks along coproduct inclusions, the image identifies with the canonical morphism $U(T)_{U(A)} + U(T)_{U(B)} \to U(T)$ induced by the morphism $U(T) \to U(A) + U(B)$ in $\D$, which is an isomorphism since $\D$ is extensive. <span class="qed">$\square$</span>
