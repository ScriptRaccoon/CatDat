---
title: Split epimorphisms in functor categories
description: If all epimorphisms in a functor category of set-valued functors split, then the domain category is essentially discrete.
---

# Split epimorphisms in functor categories

::: Lemma
Let $\C$ be a locally essentially small category such that every epimorphism in the functor category $[\C,\Set]$ is split. Then $\C$ is [essentially discrete](/category-property/essentially_discrete).
:::

::: Proof
Since $\C$ is equivalent to a locally small category, and both the assumption and the conclusion are invariant under equivalences, we may assume that $\C$ is locally small.

<strong>Claim 1.</strong> Every morphism $f : A \to B$ in $\C$ is a split monomorphism.

Let $J \subseteq \Hom(A,-)$ be the subfunctor of morphisms that factor through $f$, i.e.
$$J(X) \coloneqq \{u \circ f : u \in \Hom(B,X)\}.$$
Let $P$ be the pushout of two copies of $\Hom(A,-)$ along $J$, which is computed objectwise, so that $P(X) = \Hom(A,X) \sqcup_{J(X)} \Hom(A,X)$, and let $q_1,q_2 : \Hom(A,-) \rightrightarrows P$ be the two canonical morphisms. Let $\iota_1,\iota_2 : \Hom(A,-) \rightrightarrows \Hom(A,-) \sqcup \Hom(A,-)$ be the coproduct inclusions. The morphism $q : \Hom(A,-) \sqcup \Hom(A,-) \to P$ with $q \circ \iota_k = q_k$ for $k = 1,2$ has surjective components, hence is an epimorphism. By assumption, $q$ has a section $s : P \to \Hom(A,-) \sqcup \Hom(A,-)$.

Assume that $\id_A \notin J(A)$. Then for $k = 1,2$, the element $\iota_k(\id_A)$ is the only preimage of $q_k(\id_A)$ under $q$, so that $s(q_k(\id_A)) = \iota_k(\id_A)$. By the naturality of $s$, it follows that
$$s(q_k(f)) = s(P(f)(q_k(\id_A))) = \bigl(\Hom(A,f) \sqcup \Hom(A,f)\bigr)(\iota_k(\id_A)) = \iota_k(f).$$
Since $f \in J(B)$, we have $q_1(f) = q_2(f)$, hence $\iota_1(f) = \iota_2(f)$, which is a contradiction since the coproduct $\Hom(A,B) \sqcup \Hom(A,B)$ is disjoint. Therefore, $\id_A \in J(A)$, i.e. there is a morphism $u : B \to A$ with $u \circ f = \id_A$.

<strong>Claim 2.</strong> Every morphism in $\C$ is an isomorphism.

Let $f : A \to B$ be a morphism. By Claim 1, there is a morphism $u : B \to A$ with $u \circ f = \id_A$. By Claim 1 again, $u$ is a split monomorphism. Since $u$ is also a split epimorphism, it is an isomorphism. Hence, $f = u^{-1}$ is an isomorphism.

<strong>Claim 3.</strong> Every endomorphism in $\C$ is the identity.

Let $\sigma : A \to A$ be an endomorphism. Let $T$ be the subfunctor of the terminal functor with $T(X) = \{\ast\}$ if $\Hom(A,X) \neq \varnothing$ and $T(X) = \varnothing$ otherwise. The unique morphism $\Hom(A,-) \to T$ has surjective components, hence is an epimorphism. By assumption, it has a section $t : T \to \Hom(A,-)$. The morphism $\tau \coloneqq t(\ast) \in \Hom(A,A)$ is an isomorphism by Claim 2, and the naturality of $t$ with respect to $\sigma$ gives
$$\sigma \circ \tau = \Hom(A,\sigma)(t(\ast)) = t(T(\sigma)(\ast)) = t(\ast) = \tau.$$
Hence, $\sigma = \id_A$.

By Claims 2 and 3, $\C$ is a groupoid in which parallel morphisms coincide: if $f,g : A \rightrightarrows B$ are morphisms, then $g^{-1} \circ f$ is an endomorphism of $A$, hence the identity, so $f = g$. Thus, $\C$ is a thin groupoid, i.e. essentially discrete.
:::
