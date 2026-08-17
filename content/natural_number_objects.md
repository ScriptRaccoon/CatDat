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

Next, we prove a partial converse of the [result](/category-implication/parametrized_nno_criterion) that countably distributive categories have a parametrized natural numbers object.

::: Lemma 3
Let $\C$ be a category with finite products, countable copowers denoted $\otimes$, and a parametrized natural numbers object $1 \xrightarrow{z} N \xrightarrow{s} N$. Then there is an isomorphism $N \cong \IN \otimes 1$, and for every object $A$ the natural morphism
$$\alpha : \IN \otimes A \to A \times (\IN \otimes 1)$$
is a split monomorphism.
:::

_Proof._
We will use element notation extensively. In particular, for every element $a \in A$ and $n \in \IN$ there is an element $n \otimes a \in \IN \otimes A$, formally defined by the $n$th coproduct inclusion. The morphism $\alpha$ is defined by
$$\alpha(n \otimes a) = (a , n \otimes 1).$$
In any category with a terminal object and countable copowers, we can construct the non-parametrized NNO $\IN \otimes 1$ with the element $0 \otimes 1 \in \IN \otimes 1$ and the map
$$s : \IN \otimes 1 \to \IN \otimes 1, \quad s(n \otimes 1) \coloneqq (n+1) \otimes 1.$$
See [here](/category-implication/nno_criterion) for a detailed proof. Since by assumption $1 \xrightarrow{z} N \xrightarrow{s} N$ is a parametrized NNO, it is also a non-parametrized NNO and therefore isomorphic to the one described. We will assume w.l.o.g. that it is equal to it and continue to work with $N = \IN \otimes 1$.

Next, we apply the parametrized universal property of the NNO to the diagram
$$A \xrightarrow{f} \IN \otimes A \xrightarrow{g} \IN \otimes A$$
defined by $f(a) \coloneqq 0 \otimes a$ and $g(n \otimes a) \coloneqq (n+1) \otimes a$. It tells us that there is a map
$$\Phi : A \times N \to \IN \otimes A$$
with
$$\Phi(a,0 \otimes 1) = 0 \otimes a, \quad \Phi(a, s(m)) = g(\Phi(a,m)).$$
For $m \coloneqq n \otimes 1 \in N$, where $n \in \IN$, the second equation reads
$$\Phi(a, (n+1) \otimes 1) = g(\Phi(a, n \otimes 1)).$$
By classical induction on $n \in \IN$ it follows that
$$\Phi(a, n \otimes 1) = n \otimes a,$$
which exactly means $\Phi \circ \alpha = \id_{\IN \otimes A}$.
<span class="qed">$\square$</span>
