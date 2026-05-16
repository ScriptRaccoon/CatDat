---
title: Local ℵ₁-copresentability of the category of compact Hausdorff spaces
description: We gather several relevant results about the category of compact Hausdorff spaces, and provide accessible proofs of these facts leading up to a proof that it is locally ℵ₁-copresentable.
author: Daniel Schepler
---

## Local ℵ₁-copresentability of the category of compact Hausdorff spaces

Our purpose here is to gather several relevant results about $\CompHaus$, the [category of compact Hausdorff spaces](/category/CompHaus), and provide accessible (sic) proofs of these facts leading up to a proof that it is locally $\aleph_1$-copresentable.

A good overview of some of these results is contained in the introduction of [HNN13](#references).

We first prove a couple preliminary results.

::: Lemma 1
Let $\I$ be a cofiltered category, and let $X : \I \to \CompHaus$ be a cofiltered diagram in which $X_i$ is non-empty for each $i\in \I$. Then $\lim_i X_i$ is also non-empty.
:::

_Proof._
Consider the product space $\prod_{i\in \I} X_i$. Now for each morphism $f : i \to j$ in $\I$, define the subset

$$\textstyle E_f := \bigl\{ x \in \prod_{i \in \I} X_i \mid X_f(x_i) = x_j \bigr\}.$$

Then each $E_f$ is a closed subset.
Next, we prove that the collection $\{ E_f : f \in \Mor(\I) \}$ has the finite intersection property, i.e. that $\bigcap_{f\in F} E_f$ is non-empty for every finite set $F \subseteq \Mor(\I)$. For $f\in F$ we write $f : i_f \to j_f$. Then the diagram with objects $J := \{ i_f \mid f \in F \} \cup \{ j_f \mid f \in F \}$ and morphisms $\{ f \mid f \in F \}$ has a cone with vertex $k \in \I$ and morphisms $g_i : k \to i$ for each $i \in J$. Now choose $y \in X_k$, and define $x \in \prod_{i \in \I} X_i$ such that $x_i = X_{g_i}(y)$ if $i \in J$, with arbitrary choices of $x_i \in X_i$ for all other $i$. We then see that $x \in \bigcap_{f\in F} E_f$, which finishes the proof of the claim.
Since $\prod_{i \in \I} X_i$ is compact, that implies that the intersection of all $E_f$ is non-empty. But that intersection is precisely $\lim_{i \in \I} X_i$. $\square$

::: Lemma 2
Suppose we have a cofiltered limit $X = \lim_{i\in \I} X_i$ in $\Top$. Note the topology on $X$ is the weak topology for the projections $p_i : X \to X_i$. Then the canonical subbasis of this topology on $X$ is closed under finite intersections. Thus, it agrees with the canonical basis of the topology on $X$.
:::

_Proof._
Suppose we have a finite collection of subbasic open sets of the form $U_n = p_{i_n}^{-1}(V_n)$, $n \in \{ 1, \ldots, N \}$, where each $V_n$ is an open subset of $X_{i_n}$. Take a cone $(j, f_n : j \to i_n)$ of the objects $i_1, \ldots, i_N$. We then have

$$\bigcap_{n=1}^N U_n = p_j^{-1} \left( \bigcap_{n=1}^N X_{f_n}^{-1}(V_n) \right),$$

where the right hand side is again in the canonical subbasis. $\square$

::: Proposition 3
The functor $\Hom({-}, [0, 1]) : \CompHaus^{\op} \to \Set$ is monadic. (Originally proved in [Dus69](#references))
:::

_Proof._
We use the crude monadicity theorem (see e.g. [SGL92](#references), Thm. IV.4.2). First, the functor has a left adjoint $S \mapsto [0, 1]^S$ with the evident isomorphism

$$\Hom_{\CompHaus}(X, [0, 1]^S) \simeq \Hom_{\Set}(S, \Hom_{\CompHaus}(X, [0, 1])).$$

To see the functor is conservative, suppose we have a continuous function $f : X \to Y$ such that $f^* : \Hom(Y, [0, 1]) \to \Hom(X, [0, 1])$ is a bijection. Then for any $x_1, x_2 \in X$ with $x_1 \ne x_2$, there exists $\varphi : X \to [0, 1]$ with $\varphi(x_1) = 0$ and $\varphi(x_2) = 1$ by Urysohn's lemma. Since $f^*$ is surjective, there exists $\psi : Y \to [0, 1]$ with $\varphi = \psi \circ f$; thus, we must have $f(x_1) \ne f(x_2)$. Likewise, we know the image of $f$ is closed. If this image is not all of $Y$, then by Urysohn's lemma there exists nonzero $\varphi : Y \to [0, 1]$ which is zero on the image. But then $\varphi \circ f = 0 \circ f$, contradicting the injectivity of $f^*$. Thus, $f$ is a bijective continuous function, and therefore a homeomorphism.

Finally, suppose we have a coreflexive equalizer pair

$$E \xhookrightarrow{i} A ~\overset{f}{\underset{g}{\rightrightarrows}}~ B$$

with $r : B \to A$. We may assume that $i$ is a subspace inclusion map. We may use $r$ to think of $B$ as a bundle of compact spaces over $A$, with two sections $f, g$. We then need to show that

$$\Hom(B, [0,1]) ~\overset{f^*}{\underset{g^*}{\rightrightarrows}}~ \Hom(A, [0, 1]) \xrightarrow{i^*} \Hom(E, [0, 1])$$

is a coequalizer diagram. We first define $s : \Hom(E,[0,1]) \to \Hom(A,[0,1])$ by choosing a Tietze extension of each continuous function $E \to [0,1]$. Now, for each $\varphi \in \Hom(A,[0,1])$, we can define a continuous function on $\im(f) \cup \im(g) \subseteq B$ to be $\varphi \circ r$ on $\im(f)$, and $s(i^*(\varphi))\circ r$ on $\im(g)$. Note that on the overlap $\im(f)\cap \im(g) = f(E) = g(E)$, the first expression gives $f(e) \mapsto \varphi(e)$, and the second expression gives $g(e) \mapsto s(i^*(\varphi))(e) = \varphi(e)$, so we have indeed given a well-defined function on $\im(f)\cup\im(g)$. Choosing a Tietze extension of this function to a function $B\to [0,1]$ for each $\varphi$, we get a map $t : \Hom(A,[0,1]) \to \Hom(B,[0,1])$. By construction, we have $i^* s = \id$, $f^* t = \id$, and $g^* t = s i^*$, so we have shown that the diagram above is a split coequalizer. $\square$

This shows that $\CompHaus^{\op}$ is equivalent to the category of algebras over the monad $S \mapsto \Hom_{\CompHaus}([0, 1]^S, [0, 1])$. We may view such algebras as being models of the infinitary algebraic theory of all continuous functions $[0,1]^S \to [0,1]$. In fact, we can show that any such function only depends on countably many coordinates in the domain, so that operations of this theory will be generated by the continuous functions $[0,1]^\omega \to [0,1]$. Indeed, we get the following somewhat stronger result:

::: Proposition 4
The object $[0,1]$ of $\CompHaus$ is $\aleph_1$-copresentable. (Originally proved in [GU71](#references), 6.5(c))
:::

_Proof._
Suppose we have an $\aleph_1$-cofiltered limit $X = \lim_{i\in \I} X_i$ with projections $p_i : X \to X_i$, and a continuous function $\varphi : X \to [0,1]$. For the time being, fix $n\in \IN_{>0}$. Then for any $x\in X$, there exists an interval neighborhood $N_x$ of $\varphi(x)$ of diameter at most $1/n$ &mdash; for example, we can take $N_x := (\varphi(x) - 1/(2n), \varphi(x) + 1/(2n)) \cap [0,1]$. We can also take a basic open neighborhood whose image is contained in $N_x$; by lemma 2, we can write that basic open neighborhood in the form $p_i^{-1}(V)$ where $V$ is an open subset of $X_i$.
By compactness of $X$, we may take finitely many such basic open neighborhoods of the form $p_i^{-1}(V)$ which cover $X$. Again using the assumption that $\I$ is cofiltered, we may assume that $i$ is the same for each neighborhood. In particular, we see that whenever we have $x, y\in X$ with $p_i(x) = p_i(y)$, then $|\varphi(x) - \varphi(y)| < 1/n$.

To summarize, we have shown that for each $n \in \IN_{>0}$, there exists $i \in \I$ and a finite cover $\{ V_\lambda \mid \lambda \in \Lambda \}$ of $\im(p_i)$ such that whenever $p_i(x), p_i(y) \in V_\lambda$ for some $\lambda$, we have $|\varphi(x) - \varphi(y)| < 1/n$. Now choose such a $i_n$ and associated finite cover of $\im(p_{i_n})$ for each $n$. Then use the fact that $\I$ is $\aleph_1$-cofiltered to take a cone $(j, f_n : j \to i_n)$ of the objects $i_n$. We then see that whenever we have $x, y\in X$ with $p_j(x) = p_j(y)$, then $\varphi(x) = \varphi(y)$. Thus, $\varphi$ induces a well-defined function on the image of $p_j$. This function is continuous, since by construction for any $n\in \IN_{>0}$ and $x \in X$, there is a neighborhood $V$ of $p_j(x)$ such that whenever $p_j(y)\in V$ as well, $|\varphi(y) - \varphi(x)| < 1/n$. By the Tietze extension theorem, this induced function can then be extended to a continuous function $\psi : X_j \to [0,1]$. Then $\varphi = \psi \circ p_j$.

This shows the canonical map
$$\textstyle \colim_{i\in \I^{\op}} \Hom(X_i, [0,1]) \to \Hom(\lim_{i\in \I} X_i, [0,1])$$
is surjective.

Likewise, suppose we have $\alpha, \beta : X_i \rightrightarrows [0,1]$ such that $\alpha \circ p_i = \beta \circ p_i$. For each $n\in \IN_{>0}$, consider the set $D_n := \{ x \in X_i \mid |\alpha(x) - \beta(x)| \ge 1/n \}$. Note that $D_n$ is a closed subset of $X_i$, so it is compact. For any $x \in D_n$, we must have $x \notin \im(p_i)$. Using the contrapositive of lemma 1, we can conclude that there exists $f : j \to i$ such that $x \not\in \im(X_f)$. Indeed, suppose not: then the slice category $\I / i$ is cofiltered, with the limit over this slice category being the same as the limit over $\I$. Also, by the contrary assumption, we have that $x \in \im(X_f)$ for any $f : j \to i$, so $X_f^{-1}(\{ x \})$ is non-empty. Therefore, by lemma 1, the limit $p_i^{-1}(\{ x \})$ would be non-empty, contradicting the assumption.
Now each $D_n \setminus \im(X_f)$ is open and we have just shown such sets cover $D_n$; taking a finite subcover and then using the cofiltering assumption again, we conclude that there is a single $f_n : j_n \to i$ such that $\im(X_{f_n})$ is disjoint from $D_n$. Using the $\aleph_1$-cofiltering assumption to take a cone of the $f_n$, we get that there is $f : k \to i$ such that $\im(X_f)$ is disjoint from all $D_n$. This implies that $\alpha \circ X_f = \beta \circ X_f$.

This shows the canonical map
$$\textstyle \colim_{i\in \I^{\op}} \Hom(X_i, [0,1]) \to \Hom(\lim_{i\in I} X_i, [0,1])$$
is injective. $\square$

::: Corollary 5
The category $\CompHaus$ is locally $\aleph_1$-copresentable.
:::

_Proof._
It suffices to show that the monad
$$S \mapsto \Hom_{\CompHaus}([0, 1]^S, [0, 1])$$
is $\aleph_1$-accessible. This monad is the composition of
$$[0, 1]^{-} : \Set \to \CompHaus^{\op}$$
followed by
$$\Hom_{\CompHaus}({-}, [0,1]) : \CompHaus^{\op} \to \Set.$$
The first automatically preserves $\aleph_1$-filtered colimits (and in fact all colimits) since it has a right adjoint. The second one preserves $\aleph_1$-filtered colimits by the previous lemma.

Alternately, applying the general framework of Lawvere theories shows that $\CompHaus^{\op}$ is equivalent to the category of functors $\T \to \Set$ preserving countable products, where $\T$ is the full subcategory of $\CompHaus$ of all spaces $[0,1]^A$ where $A$ is countable. Note that $\T$ is essentially small. We thus reproduce a result from [Isb82](#references) which also provides a nice description of a small set of generators of the operations of the $\aleph_0$-ary algebraic theory. A more recent treatment in [MR17](#references) refines this by providing a nice axiomatization of the relations of that theory. $\square$

### References

[Dus69]&nbsp; J. Duskin, _Variations on Beck’s tripleability criterion_. Reports of the Midwest Category Seminar III, pages 74–129. Springer Berlin Heidelberg, 1969

[GU71]&nbsp; P. Gabriel and F. Ulmer, _Lokal präsentierbare Kategorien_. Lecture Notes in Mathematics, 221, 1971.

[Isb82]&nbsp; J.R. Isbell, _Generating the algebraic theory of C(X)_, Algebra Universalis, 15 (2):153–155, 1982

[SGL92]&nbsp; Saunders Mac Lane and Ieke Moerdijk. _Sheaves in Geometry and Logic: A First Introduction to Topos Theory._ Universitext. Springer-Verlag New York, Inc., 1992.

[HNN13]&nbsp; Dirk Hoffman, Renato Neves, and Pedro Nora. _Generating the algebraic theory of C(X): The case of partially ordered compact spaces._ Theory and Applications of Categories, 33 (12):276–295, 2018. <http://www.tac.mta.ca/tac/volumes/33/12/33-12.pdf>

[MR17]&nbsp; Vincenzo Marra and Luca Reggio, _Stone duality above dimension zero: Axiomatising the algebraic theory of C(X)_, Advances in Mathematics, 307:253–287, 2017

[HR19]&nbsp; M. Hušek and J. Rosický, _Factorization and local presentability in topological and uniform spaces_, Topology and its Applications, 259:251–266, 2019

[MR20]&nbsp; Vincenzo Marra and Luca Reggio, _A characterisation of the category of compact Hausdorff spaces_, 2020, <https://arxiv.org/abs/1808.09738>
