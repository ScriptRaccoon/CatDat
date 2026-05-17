---
title: Coreflection of subobject classifiers
description: How to construct subobject classifiers in a coreflective subcategory.
author: Martin Brandenburg
---

## Coreflection of subobject classifiers

::: Lemma
Let $\D$ be a category with a (regular) subobject classifier $\Omega$. Assume that $\C \to \D$ is a full subcategory such that (1) any (regular) $\D$-subobject of an object in $\C$ already lies in $\C$, (2) it is coreflective, i.e. there is a functor $R : \D \to \C$ right adjoint to the inclusion. Then $R(\Omega)$ is a (regular) subobject classifier in $\C$.
:::

_Proof._
If $X \in \C$, then $\Hom(X,R(\Omega)) \cong \Hom(X,\Omega)$ is isomorphic to the collection of $\D$-subobjects of $X$, which by assumption coincide with the $\C$-subobjects of $X$. <span class="qed">$\square$</span>
