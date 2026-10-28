---
title: Tail coproducts in extensive categories
description: We show that in an extensive category the tail coproducts of a coproduct of copies of an object have the initial object as their limit.
---

# Tail coproducts in extensive categories

In $\Set$, the tails $\{ \beta \mid \alpha \leq \beta < \kappa \}$ of a cardinal $\kappa$ have empty intersection. We show that the analogous statement holds in every [infinitary extensive](/category-property/infinitary_extensive) category, and for $\kappa = \aleph_0$ in every [countably extensive](/category-property/countably_extensive) category.

::: Lemma
Let $\kappa$ be an infinite cardinal, and let $\C$ be an infinitary extensive category, or a countably extensive category if $\kappa = \aleph_0$. Let $T$ be an object, and let $T_\beta$ be the summand with index $\beta$ of the coproduct $\coprod_{\beta < \kappa} T$. For $\alpha < \kappa$, let
$$\textstyle D(\alpha) \coloneqq \coprod_{\alpha \leq \beta < \kappa} T_\beta.$$
Then the canonical morphisms $D(\alpha') \to D(\alpha)$ for $\alpha \leq \alpha'$ form a diagram $D : (\kappa,\geq) \to \C$. If $D$ has a limit, then it is an initial object.
:::

::: Proof
Recall that the initial object $0$ is [strict](/category-property/strict_initial_object) (see [here](/category-implication/extensive_consequences)), i.e. every morphism $A \to 0$ is an isomorphism. Since coproducts are disjoint, coproduct inclusions are monomorphisms, so that we may treat them as inclusions of subobjects. In particular, $D(\alpha)$ is a subobject of $D(0)$, which is a coproduct of $D(\alpha)$ and $\coprod_{\beta < \alpha} T_\beta$. Moreover, the limit $L$ of $D$ is the intersection $\bigcap_{\alpha < \kappa} D(\alpha)$ of subobjects of $D(0)$.

Since coproducts are stable under pullbacks, we have $L \cong \coprod_{\beta < \kappa} (L \cap T_\beta)$. Since a coproduct of initial objects is initial, it suffices to show that $L \cap T_\beta \cong 0$ for every $\beta < \kappa$. Since $D(0)$ is a coproduct of $D(\beta + 1)$ and $\coprod_{\gamma \leq \beta} T_\gamma$, and coproducts are disjoint, the intersection of these two subobjects is $0$. Since $L \subseteq D(\beta + 1)$ and $T_\beta \subseteq \coprod_{\gamma \leq \beta} T_\gamma$, it follows that $L \cap T_\beta$ admits a morphism to $0$, so that $L \cap T_\beta \cong 0$ by strictness.
:::
