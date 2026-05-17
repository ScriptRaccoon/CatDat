---
title: Detection of filtered-colimit-stable monomorphisms
description: A useful result to prove (and disprove) filtered-colimit-stable monomorphisms for several categories based on other categories
author: Martin Brandenburg
---

## Detection of filtered-colimit-stable monomorphisms

::: Lemma
Let $\C$ be a category with filtered colimits. Assume that $U : \C \to \D$ is a faithful functor which preserves monomorphisms and filtered colimits. If monomorphisms in $\D$ are stable under filtered colimits, then the same is true for $\C$.
:::

For the record, here is the dual statement: Let $\C$ be a category with cofiltered limits. Assume that $U : \C \to \D$ is faithful functor which preserves epimorphisms and cofiltered limits. If epimorphisms in $\D$ are stable under cofiltered limits, then the same is true for $\C$.

_Proof._
Since $U$ is faithful, it reflects monomorphisms. From here the proof is straight forward. <span class="qed">$\square$</span>
