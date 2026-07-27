---
title: Thin Category with an Extremal Generator
description: A result restricting which thin categories can have an extremal generator
---

# Thin Category with an Extremal Generator

::: Lemma
Suppose $G$ is an object of a thin category. Then $G$ is an extremal generator if and only if for every object $X$, either $X \cong G$ or every morphism with codomain $X$ is an isomorphism.
:::

_Proof._ ($\Rightarrow$) Since the category is thin, $\Hom(G, X)$ is either a singleton or empty. In the first case, let $f \in \Hom(G, X)$. Then $f \circ {-} : \Hom(G, G) \to \Hom(G, X)$ is automatically a bijection since $\Hom(G, G) = \{ \id_G \}$ is also a singleton, implying that $f$ is an isomorphism.

In the second case, suppose we have a morphism $g : Y \to X$. Then $g \circ {-} : \Hom(G, Y) \to \Hom(G, X)$ is a function with empty codomain, so it is automatically a bijection, implying that $g$ is an isomorphism.

($\Leftarrow$) Since the category is thin, any object is automatically a generator. Now suppose we have a morphism $f : X \to Y$ such that $f \circ {-} : \Hom(G, X) \to \Hom(G, Y)$ is a bijection. Then by assumption, either $Y \cong G$ or every morphism with codomain $Y$ is an isomorphism. In the first case, $\Hom(G, Y)$ is non-empty, so $\Hom(G, X)$ is also non-empty. We also have $\Hom(Y, G)$ is non-empty. Therefore, $\Hom(Y, X)$ is non-empty, and the (necessarily unique) morphism $Y \to X$ is automatically an inverse to $f$. In the second case, $f$ is already a morphism with codomain $Y$ so it is an isomorphism. <span class="qed">$\square$</span>

::: Corollary
For a poset $P$, the corresponding thin category has an extremal generator if and only if $P$ is non-empty and it has at most one non-minimal element. In particular, if this is the case, then either the poset is discrete, in which case any element gives an extremal generator; or otherwise, there is exactly one non-minimal element which is the unique extremal generator.
:::

_Proof._ In a thin category coming from a poset, the condition in the previous lemma that every morphism with codomain $X$ is an isomorphism is equivalent to the corresponding element of the poset being minimal. <span class="qed">$\square$</span>
