---
title: The free cocompletion of a locally small category
description: We investigate the properties of the free cocompletion of a locally small category.
---

# The free cocompletion of a locally small category

Let $\C$ be a locally small category. All results here can easily be adapted to the case that $\C$ is locally essentially small, and we do not assume that $\C$ is small. Then $\widehat{\C}$ denotes its _free cocompletion_ (often called $P\C$ in the literature when $\C$ is not assumed to be small), which is the full subcategory of $[\C^{\op},\Set]$ consisting presheaves
$$F : \C^{\op} \to \Set$$
that are _small_. This condition can be described in many equivalent ways:

1. $F$ is a small colimit of representable functors.
2. There is a small category $\I$ such that $F$ is the left Kan extension of a presheaf on $\I$ along a functor $\I \to \C$.
3. There is small subcategory $\I \subseteq \C$ such that $F$ is the left Kan extension of its restriction to $\I$.
4. The category of elements $\int F$ is [finally small](https://ncatlab.org/nlab/show/finally+small).

Here, the objects of $\int F$ are pairs $(X,a)$, where $X \in \C$ and $a \in F(X)$, and a morphism $(X,a) \to (Y,b)$ is a morphism $f : X \to Y$ with $F(f)(b) = a$. The equivalence of the conditions (1), (2), (3) is proven as Proposition 4.83 in Kelly's book [Basic Concepts of Enriched Category Theory](http://www.tac.mta.ca/tac/reprints/articles/10/tr10.html). The implication (1) $\implies$ (4) is proven as Proposition 3.7 in <a href="https://doi.org/10.1007/s10485-021-09671-9">Kan Extensions are Partial Colimits</a> by Perrone-Tholen (but there must be earlier references). The implication (4) $\implies$ (1) follows from the [co-Yoneda Lemma](https://ncatlab.org/nlab/show/co-Yoneda+lemma)
$$F \cong \colim_{(X,a) \in \int F} \Hom(-,X)$$
and the fact that final functors do not "change" colimits; see Proposition 2.5.2 in <a href="https://ncatlab.org/nlab/show/Categories+and+Sheaves" target="_blank">Kashiwara-Schapira</a>.

In contrast to the full presheaf category $[\C^{\op},\Set]$, its subcategory $\widehat{\C}$ of small presheaves is always locally essentially small:

::: Lemma 1
If $\C$ is a locally small category, then $\widehat{\C}$ is locally essentially small.
:::

::: Proof
Let $F : \C^{\op} \to \Set$ be a small presheaf, so that $F \cong \colim_i \Hom(-,X_i)$ for a small diagram $X : \I \to \C$. For every other (small) presheaf $G : \C^{\op} \to \Set$ we compute, using the Yoneda Lemma,
$$\textstyle \Hom(F,G) \cong \lim_i \Hom(\Hom(-,X_i),G) \cong \lim_i G(X_i),$$
and the latter is a set.
:::

But it is usually not locally small:

::: Lemma 2
If $\widehat{\C}$ is locally small, then $\C$ is small.
:::

Disclaimer: This result and its proof are not relevant for category theory and are also depending on implementation details of set theory. That $\widehat{\C}$ is locally essentially small is only what matters.

::: Proof
If $\C$ is empty, there is nothing to prove. Otherwise, choose an object $X \in \C$. Consider the collection of morphisms $\Hom(-,X) \to \Hom(-,X)$, which is surely isomorphic to the set $\Hom(X,X)$. By assumption, it actually _is_ a set. It follows that $\{\id_{\Hom(-,X)}\}$ is a set, and therefore also that $\id_{\Hom(-,X)}$ is a set. This natural transformation is a map that associates to every object $Y \in \Ob(\C)$ the map $\id_{\Hom(Y,X)}$. If we model a map as a set of ordered pairs and ordered pairs as Kuratowski pairs, we get

$$
\begin{align*}
\id_{\Hom(-,X)} & = \bigl\{(Y,\id_{\Hom(Y,X)}) : Y \in \Ob(\C)\bigr\} \\
& = \bigl\{\{\{Y\},\{Y,\id_{\Hom(Y,X)}\}\} : Y \in \Ob(\C)\bigr\}
\end{align*}
$$

This construction shows $\Ob(\C) \subseteq \bigcup \bigcup \id_{\Hom(-,X)}$, so that $\Ob(\C)$ is indeed a set.
:::

::: Lemma 3
If $\C$ is a locally small category, then $\widehat{\C}$ is cocomplete. Colimits can be constructed objectwise.
:::

::: Proof
This follows from cocompleteness of $[\C^{\op},\Set]$ with objectwise constructed colimits and the third characterization of small presheaves above. Details can be found as Proposition 5.34 in Kelly's book.
:::

The existence of limits in $\widehat{\C}$ is a much more complicated issue, see the paper [_Limits of small functors_](https://arxiv.org/pdf/math/0610439) by Day-Lack. The following result is useful in this regard. Namely, it shows that $\widehat{\C}$ has limits of a given type if and only if small functors are closed under these limits taken in the category of all presheaves.

::: Lemma 4
For every $X \in \C$ the evaluation functor $\ev_X : \widehat{\C} \to \Set$, $F \mapsto F(X)$ is continuous. In particular, the inclusion functor $\widehat{\C} \hookrightarrow [\C^{\op},\Set]$ is continuous, and every limit that exists in $\widehat{\C}$ is an objectwise limit.
:::

::: Proof
By the Yoneda Lemma, the evaluation functor is represented by $\Hom(-,X)$. Thus, it is continuous.
:::

::: Lemma 5
A morphism $\alpha : F \to G$ in $\widehat{\C}$ is a monomorphism (resp. epimorphism) if and only if for every $X \in \C$ the map $\alpha(X) : F(X) \to G(X)$ injective (resp. surjective).
:::

::: Proof
The direction $\impliedby$ is trivial in each case. For the direction $\implies$, the evaluation functor $\ev_X : \widehat{\C} \to \Set$ is continuous by Lemma 4 and therefore preserves monomorphisms. Furthermore, it is also cocontinuous by Lemma 3 and therefore preserves epimorphisms.
:::

::: Lemma 6
If $\C$ is a locally small category, then $\widehat{\C}$ is mono-regular. Actually, every monomorphism is an effective monomorphism. Moreover, monomorphisms are stable under filtered colimits.
:::

::: Proof
The first statement is a formal consequence of the fact that every monomorphism in $\Set$ is effective and the already established facts that monomorphisms and pushouts can be understood objectwise. For similar reasons, the second statement is a formal consequence of the corresponding fact for $\Set$.
:::

::: Lemma 7
If $\C$ is a locally small category, then $\widehat{\C}$ is infinitary extensive.
:::

::: Proof
We need to prove that for a family of small presheaves $(P_i)_{i \in I}$ the coproduct functor
$$\textstyle \prod_{i \in I} \widehat{\C} / P_i \to \widehat{\C}/\coprod_{i \in I} P_i$$
is an equivalence of categories. Since $\Set$ is infinitary extensive, also $[\C^{\op},\Set]$ is infinitary extensive, so that the coproduct functor
$$\textstyle \prod_{i \in I} [\C^{\op},\Set] / P_i \to [\C^{\op},\Set]/\coprod_{i \in I} P_i$$
is an equivalence of categories. Since $\widehat{\C}$ is a full subcategory of $[\C^{\op},\Set]$ that is closed under coproducts, it remains to prove that if a coproduct of presheaves $\coprod_{i \in I} F_i$ is small, then each $F_i$ is small. For this, it suffices to prove for two presheaves $F,G$ for which $F+G$ is small, that $F$ is small. The category of elements $\int (F+G)$ identifies with $\int F + \int G$. Thus, the claim follows from the next lemma.
:::

::: Lemma 8
Let $\C,\D$ be two categories. Assume that the coproduct $\C + \D$ is finally small. Then $\C$ is finally small.
:::

::: Proof
Assume that $\I \to \C + \D$ is a final functor, where $\I$ is small. Since $\Cat$ is extensive, we get a decomposition $\I = \I_\C + \I_\D$ with two functors $\I_\C \to \C$ and $\I_\D \to \D$. For every $X \in \C$ the comma category $X \downarrow I_\C$ identifies with the comma category $X \downarrow I$, which is connected. Therefore, $I_\C \to \C$ is final.
:::

::: Lemma 9
Let $\C$ be a locally small category. Then $\widehat{\C}$ is co-Malcev.
:::

::: Proof
This follows since $\Set$ is co-Malcev and since finite colimits are objectwise.
:::

::: Proposition 10
Let $\C$ be a locally small category. Then $\widehat{\C}$ is epi-regular.
:::

Notice that this would be easy if $\widehat{\C}$ has pullbacks. In that case, every epimorphism would even be effective since this is the case for $\Set$. But in general, $\widehat{\C}$ may fail to have pullbacks. This is why the proof is more complicated.

::: Proof
First, notice that the Yoneda Lemma and the description of epimorphisms (see Lemma 5) implies that representable functors are [projective objects](https://ncatlab.org/nlab/show/projective+object). Therefore, also coproducts of representable functors are projective.

Now let $\eta : F \to G$ be an epimorphism of small presheaves. Since $F$ is small, there is an epimorphism
$$F_0 \xrightarrow{~ \pi ~} F,$$
where $F_0$ is a coproduct of representable functors. Since $G$ is small, there is a coequalizer diagram

$$
G_1
\begin{array}{c}
\xrightarrow{~ \alpha ~ }\\[-1.25ex] \xrightarrow[~ \beta ~ ]{}
\end{array}
G_0 \xrightarrow{~ \psi ~} G,
$$

where $G_0$ and $G_1$ are coproducts of representable functors. Since $G_0$ is projective, there is a morphism $\lambda : G_0 \to F$ such that $\eta \circ \lambda = \psi$. Since $F_0$ is projective, there is a morphism $\mu : F_0 \to G_0$ such that $\psi \circ \mu = \eta \circ \pi$. We get the following diagram, where the outer square and the lower triangle commutes, but not necessarily the upper triangle.

$$
\begin{CD}
F_0 @>{\pi}>> F \\
@V{\mu}VV \,  \, \nearrow{\scriptsize \, \lambda}  @VV{\eta}V \\
G_0 @>>{\psi}> G
\end{CD}
$$

Define the morphisms $\gamma,\delta : G_1 \sqcup F_0 \rightrightarrows F$ by
$$\gamma|_{G_1} = \lambda \circ \alpha, \quad \delta|_{G_1} = \lambda \circ \beta,$$
$$\gamma|_{F_0} = \lambda \circ \mu, \quad \delta|_{F_0} = \pi.$$
We will prove that $\eta : F \to G$ is a coequalizer of $\gamma$ and $\delta$. First, $\eta$ coequalizes these because
$$\eta \circ \gamma|_{G_1} = \eta \circ \lambda \circ \alpha = \psi \circ \alpha = \psi \circ \beta = \eta \circ \lambda \circ \beta = \eta \circ \delta|_{G_1}$$
and
$$\eta \circ \gamma|_{F_0} = \eta \circ \lambda \circ \mu = \psi \circ \mu = \eta \circ \pi = \eta \circ \delta|_{F_0}.$$
Conversely, suppose that $\vartheta : F \to H$ is a morphism that coequalizes these morphisms, meaning that $\vartheta \circ \lambda \circ \alpha = \vartheta \circ \lambda \circ \beta$ and $\vartheta \circ \lambda \circ \mu = \vartheta \circ \pi$. The first equation means that there is a morphism $\vartheta' : G \to H$ such that $\vartheta' \circ \psi = \vartheta \circ \lambda$. The second equation then becomes
$$\vartheta \circ \pi = \vartheta' \circ \psi \circ \mu = \vartheta' \circ \eta \circ \pi,$$
which is equivalent to $\vartheta = \vartheta' \circ \eta$. We have thus shown that every morphism that coequalizes $\alpha$ and $\beta$ factors through $\eta$, and uniqueness is clear since $\eta$ is an epimorphism.
:::

::: Lemma 11
Let $\C$ be a locally small category. Then $\widehat{\C}$ has effective congruences.
:::

::: Proof
Let $f,g : F \rightrightarrows G$ be a congruence in $\widehat{\C}$. Let $p : G \twoheadrightarrow Q$ be its quotient (i.e. coequalizer) in $\widehat{\C}$, which is constructed objectwise. Applying the functorial definition of a congruence to representable functors in $\widehat{\C}$, we see that for every object $X \in \C$ that $f(X),g(X) : F(X) \rightrightarrows G(X)$ is a congruence in $\Set$. Since congruences in $\Set$ are effective, $f(X),g(X)$ is the kernel pair of $p(X)$; we are also using [this result](/content/effective-congruence-quotients). Therefore, $f,g$ is the kernel pair of $p$ in the category of all presheaves, _a fortiori_ in the category of small presheaves.
:::

::: Proposition 12
Let $\C$ be a locally small category. Then $\widehat{\C}$ has effective cocongruences.
:::

::: Proof
Let $F \rightrightarrows G$ be a cocongruence in $\widehat{\C}$. Since the inclusion functor $\widehat{\C} \hookrightarrow [\C^{\op},\Set]$ preserves finite colimits by Lemma 3, this is the same as a cocongruence of presheaves where $F,G$ happen to be small. Since cocongruences in $\Set$ are effective (by [this result](/category-implication/regular_epi-regular_extensive_consequences)), and in fact cokernel pairs of their equalizer (see [here](/content/effective-congruence-quotients)), the cocongruence is isomorphic to
$$F \rightrightarrows F \sqcup_E F,$$
where $E \coloneqq \eq(F \rightrightarrows G)$ is the objectwise defined equalizer in $[\C^{\op},\Set]$. We would be done if $E$ were small, which however is not the case in general. But we can prove that $E$ is a quotient of a small presheaf, or equivalently, a quotient of a coproduct of representable presheaves, which is sufficient, since any epimorphism $E' \to E$ satisfies $F \sqcup_E F = F \sqcup_{E'} F$. (Such presheaves are also called _petty_ in the literature.)

We view the pushout $P := F \sqcup_E F$ as the union of two copies $F_1,F_2$ of $F$ with $F_1 \cap F_2 = E$. In particular, we regard $E,F_1,F_2$ as sub-presheaves of $P$. For a morphism $f$ in $\C$, we write $f^*$ instead of $P(f)$.

Since $P \cong G$ is small, its category of elements $\int P$ has a finally small subcategory $\K$. Let $K \subseteq \Ob(\C)$ be the set of objects that appear in $\K$. We claim that
$$\{(A,a) : A \in K, \, a \in E(A)\}$$
is a weakly terminal set in $\int E$, which is equivalent to saying that the canonical morphism
$$\textstyle \coprod_{A \in K,\, a \in E(A)} \Hom(-,A) \to E$$
is an epimorphism of presheaves, as required.

Let $(X,x)$ be an object of $\int E$, i.e. $X \in \Ob(\C)$ and $x \in E(X)$. In particular, $x \in P(X)$. Thus the comma category $(X,x) \downarrow \K$ is connected, and therefore non-empty. Choose an object $f : (X,x) \to (A,a)$. Thus, $A \in K$, $a \in P(A)$, and $f : X \to A$ satisfies $f^*(a)=x$. If $a \in E(A)$, we are done. Assume otherwise and, without loss of generality, $a \in F_1(A)$. Let $b \in F_2(A) \subseteq P(A)$ be the corresponding element in the other copy of $F$. Using the flip automorphism of $P$ that fixes $E$ and exchanges $F_1$ and $F_2$, we see that $f^*(b)=x$. Thus, we also have a morphism $f' : (X,x) \to (A,b)$ with the same underlying morphism $f : X \to A$.

Since $(X,x) \downarrow \K$ is connected, the two morphisms $f$ and $f'$ are connected to each other. Thus, there are morphisms $(X,x) \to (A_i,a_i)$ with $A_i \in K$, $a_i \in P(A_i)$, starting with $f$ and ending with $f'$, such that for each pair of adjacent indices $i,i+1$, there is a morphism $(A_i,a_i) \to (A_{i+1},a_{i+1})$ or a morphism $(A_{i+1},a_{i+1}) \to (A_i,a_i)$. If any $a_i$ is contained in $E(A_i)$, we would be done. Assume, for a contradiction, that this is not the case.

In this case, we can prove inductively that $a_i \in F_1(A_i)$ as follows. The base case follows from $a \in F_1(A)$. If $a_i \in F_1(A_i)$ and there is a morphism $(A_{i+1},a_{i+1}) \to (A_i,a_i)$, we immediately get $a_{i+1} \in F_1(A_{i+1})$ since $F_1$ is a sub-presheaf of $P$. If, on the other hand, there is a morphism $(A_i,a_i) \to (A_{i+1},a_{i+1})$ and $a_{i+1} \notin F_1(A_{i+1})$, we would get $a_{i+1} \in F_2(A_{i+1})$, hence $a_i \in F_1(A_i) \cap F_2(A_i) = E(A_i)$, contradicting our assumption.

Therefore, every $a_i$ lies in $F_1(A_i)$. But the last element in this chain is $b \in F_2(A)$, so we would have $b \in E(A)$, contradicting our assumption.
:::
