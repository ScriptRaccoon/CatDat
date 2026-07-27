---
title: Construction of Generators
description: How to construct a generator from a generating set
---

## Construction of Generators

::: Lemma
In a category let $S$ be a generating set which is [strongly connected](/category-property/strongly_connected), i.e. between any two objects $G,G' \in S$ there is a morphism $G \to G'$. If the coproduct $U \coloneqq \coprod_{G \in S} G$ exists, then it is a generator. Moreover, if $S$ is an extremal generating set, then $U$ is an extremal generator.
:::

_Proof._ We remark that the assumption on $S$ implies that each coprojection $i_G : G \to U$ has a left inverse. Now let $f,g : A \rightrightarrows B$ be two morphisms with $f \circ \bar a = g \circ \bar a$ for all $\bar a : U \to A$. If $G \in S$, any morphism $G \to A$ extends to $U$ by our preliminary remark. Thus, $f \circ a = g \circ a$ holds for all morphisms $a : G \to A$ with $G \in S$. Since $S$ is a generating set, this implies $f = g$.

Similarly, for the case where $S$ is an extremal generating set, suppose we have a morphism $f : A \to B$ such that $f \circ {-} : \Hom(U, A) \to \Hom(U, B)$ is a bijection. In particular, because it is injective and $U$ is a generator, we can conclude that $f$ is a monomorphism, so $f \circ {-} : \Hom(G, A) \to \Hom(G, B)$ is injective for each $G \in S$. Now suppose $b \in \Hom(G, B)$ for $G \in S$. Then $b$ extends to a morphism $\bar b : U \to B$. By assumption, there exists $\bar a : U \to A$ such that $f \circ \bar a = \bar b$. Composing with the coprojection $i_G : G \to U$, we see
$$f \circ \bar a \circ i_G = \bar b \circ i_G = b.$$
This shows that $f \circ {-} : \Hom(G, A) \to \Hom(G, B)$ is also surjective for each $G \in S$. Since $S$ is an extremal generating set, this implies $f$ is an isomorphism. <span class="qed">$\square$</span>
