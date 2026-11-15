---
title: Split epimorphisms in functor categories
description: If all epimorphisms in a category of set-valued functors split, then the domain category is essentially discrete.
---

# Split epimorphisms in functor categories

::: Lemma
Let $\C$ be a locally small category, and let $\D \subseteq [\C,\Set]$ be a full subcategory that contains the representable functors and is closed under finite colimits in $[\C,\Set]$. If every epimorphism in $\D$ is split, then $\C$ is [essentially discrete](/category-property/essentially_discrete).
:::

For example, $\D$ can be the whole functor category $[\C,\Set]$, or the [free cocompletion](/content/free-cocompletion) $\widehat{\C^{\op}}$ of $\C^{\op}$, which consists of the small functors $\C \to \Set$.

::: Proof
All colimits below are finite colimits of representable functors, hence lie in $\D$, and they are computed objectwise.

<strong>Claim 1.</strong> Every morphism $f : A \to B$ in $\C$ is a split monomorphism.

Let $P$ be the pushout of $\Hom(f,-) : \Hom(B,-) \to \Hom(A,-)$ along itself, and let $q_1,q_2 : \Hom(A,-) \rightrightarrows P$ be the two canonical morphisms. Let $\iota_1,\iota_2 : \Hom(A,-) \rightrightarrows \Hom(A,-) \sqcup \Hom(A,-)$ be the coproduct inclusions. The morphism $q : \Hom(A,-) \sqcup \Hom(A,-) \to P$ with $q \circ \iota_k = q_k$ for $k = 1,2$ is an epimorphism. By assumption, $q$ has a section $s : P \to \Hom(A,-) \sqcup \Hom(A,-)$.

Assume that $f$ has no left inverse, i.e. $\id_A$ is not in the image of $\Hom(f,A)$. Then for $k = 1,2$, the element $\iota_k(\id_A)$ is the only preimage of $q_k(\id_A)$ under $q$, so that $s(q_k(\id_A)) = \iota_k(\id_A)$. By the naturality of $s$, it follows that
$$s(q_k(f)) = s(P(f)(q_k(\id_A))) = \bigl(\Hom(A,f) \sqcup \Hom(A,f)\bigr)(\iota_k(\id_A)) = \iota_k(f).$$
Since $f = \Hom(f,B)(\id_B)$, we have $q_1(f) = q_2(f)$, hence $\iota_1(f) = \iota_2(f)$, which is a contradiction since the coproduct $\Hom(A,B) \sqcup \Hom(A,B)$ is disjoint. Therefore, $f$ has a left inverse.

<strong>Claim 2.</strong> Every morphism in $\C$ is an isomorphism.

Let $f : A \to B$ be a morphism. By Claim 1, there is a morphism $u : B \to A$ with $u \circ f = \id_A$. By Claim 1 again, $u$ is a split monomorphism. Since $u$ is also a split epimorphism, it is an isomorphism. Hence, $f = u^{-1}$ is an isomorphism.

<strong>Claim 3.</strong> Every endomorphism in $\C$ is the identity.

Let $\sigma : A \to A$ be an endomorphism. Let $p : \Hom(A,-) \to Q$ be the coequalizer of $\id, \Hom(\sigma,-) : \Hom(A,-) \rightrightarrows \Hom(A,-)$, so that $p(u \circ \sigma) = p(u)$ for all morphisms $u$ with domain $A$. As a coequalizer, $p$ is an epimorphism, so by assumption it has a section $t : Q \to \Hom(A,-)$. The morphism $\tau \coloneqq t(p(\id_A)) \in \Hom(A,A)$ is an isomorphism by Claim 2. Using $p(\sigma) = p(\id_A)$ and the naturality of $p$ and $t$, we compute $\tau = t(p(\sigma)) = \Hom(A,\sigma)(t(p(\id_A))) = \sigma \circ \tau$. Hence, $\sigma = \id_A$.

By Claims 2 and 3, $\C$ is a groupoid in which parallel morphisms coincide: if $f,g : A \rightrightarrows B$ are morphisms, then $g^{-1} \circ f$ is an endomorphism of $A$, hence the identity, so $f = g$. Thus, $\C$ is a thin groupoid, i.e. essentially discrete.
:::
