---
title: Sifted colimits in groupoids
description: A description of sifted colimits in groupoids, yielding a proof that every essentially small groupoid is a generalized variety.
author: Martin Brandenburg
---

## Sifted colimits in groupoids

While the combination of [this result](http://localhost:5173/category-implication/groupoid_consequence) and [this result](http://localhost:5173/category-implication/sifted_colimits_criterion) already implies that groupoids have sifted colimits, we can make these colimits more explicit and also prove their existence without using any non-trivial theorem. We also do this in a more general setting.

Let $D : \I \to \C$ be a [sifted](/category-property/sifted) diagram in a category and $i_0 \in \I$. We call $D$ _constant after_ $i_0$ when for all morphisms $i_0 \to i$ the morphism $D(i_0) \to D(i)$ is an isomorphism. Of course, in a groupoid, this is satisfied for every $i_0 \in \I$. If such an object $i_0$ exists, we call $D$ _eventually constant_.

::: Lemma 1
Let $\C$ be a category. Let $D : \I \to \C$ be a sifted diagram which is constant after $i_0$. Then $D(i_0)$ is a colimit object of $D$.
:::

In particular, every groupoid has sifted colimits.

_Proof._
For every $i \in \I$, define a morphism $u_i : D(i) \to D(i_0)$ as follows. Choose a cospan

$$i \xrightarrow{a} k \xleftarrow{b} i_0,$$

and set

$$u_i \coloneqq D(b)^{-1} D(a) : D(i) \to D(k) \to D(i_0).$$

This does not depend on the chosen cospan: since the category of cospans is connected, it suffices to check this for any morphism of cospans

$$
\begin{CD}
i @>a>> k @<b<< i_0 \\
@V{=}VV @VV{f}V @VV{=}V \\
i @>>{a'}> k' @<<{b'}< i_0
\end{CD}
$$

Since $D(b)$ and $D(f) D(b) = D(b')$ are isomorphisms, also $D(f)$ is an isomorphism. We compute:

$$D(b)^{-1} D(a) = D(b)^{-1} D(f)^{-1} D(f) D(a) = D(fb)^{-1} D(fa) = D(b')^{-1} D(a').$$

Thus, $u_i : D(i) \to D(i_0)$ is well defined. Note that $u_{i_0}$ is the identity of $D(i_0)$.

To show that this defines a cocone, let $f : j \to i$ be a morphism in $\I$, and choose a cospan $i \xrightarrow{a} k \xleftarrow{b} i_0$ as above to compute $u_i$. We use the cospan $j \xrightarrow{af} k \xleftarrow{b} i_0$ to compute $u_j$. Hence,

$$u_j = D(b)^{-1} D(af) = D(b)^{-1} D(a) D(f) = u_i D(f),$$

which proves the claim.

Finally, we verify the universal property. Let $(v_i : D(i) \to T)$ be another cocone, and set $h \coloneqq v_{i_0} : D(i_0) \to T$. (Since $\C$ is not assumed to be a groupoid, the morphisms $v_i$ need not be isomorphisms; the argument does not use this.)

We check that $v_i = h u_i$ for every $i \in \I$. Choose a cospan $i \xrightarrow{a} k \xleftarrow{b} i_0$ as above. Then

$$h u_i = v_{i_0} D(b)^{-1} D(a) = v_k D(a) = v_i.$$

Moreover, $h$ is uniquely determined: if $v_i = h u_i$ for all $i \in \I$, then for $i = i_0$ we obtain $v_{i_0} = h$. <span class="qed">$\square$</span>

::: Corollary 2
Let $\C$ be a category with the property that every sifted diagram is eventually constant (for example, a groupoid). Then every object $X \in \C$ is strongly finitely presentable, i.e. the functor $\Hom(X,-) : \C \to \Set$ preserves sifted colimits.
:::

_Proof._
Let $D : \I \to \C$ be a diagram and choose $i_0 \in \I$ such that $D$ is constant after $i_0$. We obtain a commutative diagram:

$$
\begin{CD}
\Hom(X,D(i_0)) @>{=}>> \Hom(X,D(i_0)) \\
@VVV @VVV \\
\colim_{i \in \I} \Hom(X,D(i)) @>>> \Hom(X,\colim_{i \in \I} D(i))
\end{CD}
$$

The top horizontal map is the identity. By Lemma 1 applied to $D$, the right vertical map is an isomorphism. By Lemma 2 applied to the diagram $\Hom(X,D(-))$ in $\Set$, the left vertical map is an isomorphism. Hence the bottom horizontal map is an isomorphism. <span class="qed">$\square$</span>

::: Corollary 3
Let $\C$ be an essentially small category in which every sifted diagram is eventually constant. Then $\C$ is a [generalized variety](/category-property/generalized_variety).
:::

_Proof._
This follows directly from Lemma 1 and Corollary 2. <span class="qed">$\square$</span>

::: Corollary 4
Let $\C$ be an essentially small category in which every sifted diagram is eventually constant.
Then $\C$ is [finitely accessible](/category-property/finitely_accessible).
:::

_Proof._
Since sifted colimits exist, filtered colimits also exist. Moreover, every object is strongly finitely presentable and therefore also finitely presentable. <span class="qed">$\square$</span>
