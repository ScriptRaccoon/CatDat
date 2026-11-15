---
title: Decreasing chains in coaccessible categories
description: We prove a lemma that is used to show that certain categories are not coaccessible.
---

# Decreasing chains in coaccessible categories

We prove a lemma that is used to show that certain categories are not [coaccessible](/category-property/coaccessible).

For a regular cardinal $\kappa$, we write $(\kappa,\geq)$ for the poset of ordinals $\alpha < \kappa$ with the reversed order, regarded as a category. Since $\kappa$ is regular, every subset of $\kappa$ with fewer than $\kappa$ elements has an upper bound in $\kappa$, so that $(\kappa,\geq)$ is $\kappa$-cofiltered. A diagram $D : (\kappa,\geq) \to \C$ consists of objects $D(\alpha)$ and morphisms $D(\alpha') \to D(\alpha)$ for $\alpha \leq \alpha'$. We write $d_\alpha : D(\alpha) \to D(0)$ for the morphism to the first object.

::: Lemma
Let $\C$ be a $\kappa$-coaccessible category for a regular cardinal $\kappa$. Let $D : (\kappa,\geq) \to \C$ be a diagram whose limit is an initial object $0$, and let $p : D(0) \to T$ be a morphism such that for every $\alpha < \kappa$ the composite $p \circ d_\alpha : D(\alpha) \to T$ is an epimorphism. Then every object admits at most one morphism from $T$. If moreover every $p \circ d_\alpha$ is a split epimorphism, then $T$ is initial.
:::

::: Proof
We first prove both claims for a $\kappa$-copresentable object $X$. Since $X$ is $\kappa$-copresentable, we have
$$\textstyle \colim_{\alpha < \kappa} \Hom(D(\alpha),X) \cong \Hom(0,X) = \{\ast\}.$$
Let $t,t' : T \rightrightarrows X$ be two morphisms. Then $t \circ p$ and $t' \circ p$ are elements of $\Hom(D(0),X)$ with the same class in the colimit. Since the colimit is filtered, there is some $\alpha < \kappa$ with $t \circ p \circ d_\alpha = t' \circ p \circ d_\alpha$. Since $p \circ d_\alpha$ is an epimorphism, we get $t = t'$. If moreover every $p \circ d_\alpha$ has a section $s_\alpha : T \to D(\alpha)$, there is also a morphism $T \to X$: since the colimit is non-empty, there are some $\alpha < \kappa$ and a morphism $f : D(\alpha) \to X$, and then $f \circ s_\alpha : T \to X$ is a morphism.

Now let $Y$ be any object. Since $\C$ is $\kappa$-coaccessible, $Y$ is a limit of $\kappa$-copresentable objects $X_i$, so that
$$\textstyle \Hom(T,Y) \cong \lim_i \Hom(T,X_i).$$
By the first part, each $\Hom(T,X_i)$ has at most one element (exactly one element if every $p \circ d_\alpha$ is a split epimorphism), and hence so does their limit.
:::

In many applications, the diagram $D$ is the image of the tails of $\kappa$ under a functor defined on $\Set$. For a regular cardinal $\kappa$ and $\alpha < \kappa$, we write $\kappa_{\geq \alpha} \coloneqq \{\beta < \kappa : \beta \geq \alpha\}$.

::: Corollary
Let $\C$ be a coaccessible category, and let $F : \Set \to \C$ be a functor. Assume that for every regular cardinal $\kappa$, if the diagram $(\kappa,\geq) \to \C$, $\alpha \mapsto F(\kappa_{\geq \alpha})$ with the images of the inclusions has a limit, then this limit is an initial object. Then $F(\{\ast\})$ is initial.
:::

The assumption on the limits holds, for example, if $F$ preserves limits of this shape and $F(\varnothing)$ is initial, since the limit of the sets $\kappa_{\geq \alpha}$ in $\Set$ is $\bigcap_{\alpha < \kappa} \kappa_{\geq \alpha} = \varnothing$.

::: Proof
Let $\kappa$ be a regular cardinal such that $\C$ is $\kappa$-coaccessible, and let $D : (\kappa,\geq) \to \C$ be the diagram $\alpha \mapsto F(\kappa_{\geq \alpha})$. Since $\C$ has $\kappa$-cofiltered limits, $D$ has a limit, which is initial by assumption. Let $p : D(0) \to F(\{\ast\})$ be the image under $F$ of the unique map $\kappa \to \{\ast\}$. For $\alpha < \kappa$, the composite $p \circ d_\alpha$ is the image under $F$ of the unique map $\kappa_{\geq \alpha} \to \{\ast\}$. This map is a split epimorphism in $\Set$ since $\kappa_{\geq \alpha}$ is non-empty, and every functor preserves split epimorphisms. By the lemma, $F(\{\ast\})$ is initial.
:::
