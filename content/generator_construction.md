---
title: Construction of Generators
description: How to construct a generator from a generating set
author: Martin Brandenburg
---

## Construction of Generators

::: Lemma
In a category let $S$ be a generating set which is [strongly connected](/category-property/strongly_connected) (between any two objects in $S$ there is a morphism). If the coproduct $U \coloneqq \coprod_{G \in S} G$ exists, then it is a generator.
:::

_Proof._ This is a straight forward generalization of [this result](/category-implication/generator_via_coproduct). We remark that the assumption about $S$ implies that each inclusion $G \to U$ has a left inverse. Now let $f,g : A \rightrightarrows B$ be two morphisms with $f h = g h$ for all $h : U \to A$. If $G \in S$, any morphism $G \to A$ extends to $U$ by our preliminary remark. Thus, $fh = gh$ holds for all $h : G \to A$ and $G \in S$. Since $S$ is a generating set, this implies $f = g$. <span class="qed">$\square$</span>
