---
title: Natural number objects
description: We prove some results on natural number objects.
---

## Natural number objects

The definition of a [natural number object](/category-property/natural_numbers_object) a priori only allows for recursively defined morphisms for which the next value $\Phi(s(n))$ depends only on the previous value $\Phi(n)$. But in many cases, we would like to also use $n$ to recursively define $\Phi(s(n))$. This can be done in categories with finite products:

::: Lemma 1
Let $(N,z,s)$ be a natural numbers object in a category with finite products. Then for every $a : 1 \to X$ and every $g : N \times X \to X$ there exists a unique morphism $\Phi : N \to X$ such that $\Phi(z) = a$ and $\Phi(s(n)) = g(n, \Phi(n))$.
:::

Here, we are using element notation to simplify the exposition. For example, the equation $\Phi(s(n)) = g(n,\Phi(n))$ says that the diagram

$$
\begin{CD}
N @>{s}>> N \\
@V{(\id_N,\Phi)}VV @VV{\Phi}V \\
N \times X @>>{g}> X
\end{CD}
$$

commutes.

_Proof._ We define the morphism $b : 1 \to N \times X$ by $b \coloneqq (z,a)$ and the morphism $h : N \times X \to N \times X$ by $h(n,x) \coloneqq (n,g(n,x))$. Using the universal property of $(N,z,s)$, there exist a unique morphism $\Psi : N \to N \times X$ such that

- $\Psi(z) = b$
- $\Psi(s(n)) = h(\Psi(n))$

holds. We may write $\Psi(n) = (\Psi_0(n),\Psi_1(n))$ with two morphisms $\Psi_0 : N \to N$ and $\Psi_1 : N \to X$. The two equations above become:

- $\Psi_0(z) = z$
- $\Psi_0(s(n)) = \Psi_0(n)$
- $\Psi_1(z) = a$
- $\Psi_1(s(n)) = g( \Psi_0(n), \Psi_1(n))$

The uniqueness in the universal property of $(N,z,s)$ implies $\Psi_0 = \id_N$. Therefore, $\Phi := \Psi_1$ is the unique morphism $\Phi : N \to X$ satisfying $\Phi(z)=a$ and $\Phi(s(n)) = g(n,\Phi(n))$. <span class="qed">$\square$</span>

The next result appears in [Johnstone](https://ncatlab.org/nlab/show/Sketches+of+an+Elephant), Part A, Lemma 2.5.5. Our proof is a bit more concise because we have extracted Lemma 1 before.

::: Lemma 2
Let $(N,z,s)$ be a natural numbers object in a category with finite products. Then
$$1 \xrightarrow{z} N \xleftarrow{s} N$$
is a coproduct cocone. Thus, $N \cong 1 \sqcup N$.
:::

_Proof._ Let $a : 1 \to X$ and $b : N \to X$ be morphisms. We need to show that there is a unique morphism $c : N \to X$ satisfying $c(z) = a$ and $c(s(n)) = b(n)$. This follows by applying Lemma 1 to the morphism $g : N \times X \to X$ defined by $g(n,x) \coloneqq b(n)$. <span class="qed">$\square$</span>
