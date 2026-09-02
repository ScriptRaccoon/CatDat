---
title: Natural numbers objects
description: We prove some results on natural numbers objects.
---

# Natural numbers objects

The definition of a [natural numbers object](/category-property/natural_numbers_object) a priori only allows for recursively defined morphisms in which the next value $\Phi(s(n))$ depends only on the previous value $\Phi(n)$. In many cases, however, we would also like to use $n$ itself to define $\Phi(s(n))$. This can be done in categories with finite products:

::: Lemma 1
Let $(N,z,s)$ be a natural numbers object in a category with finite products. Then for every $a : 1 \to X$ and every $g : N \times X \to X$ there exists a unique morphism $\Phi : N \to X$ such that $\Phi(z) = a$ and $\Phi(s(n)) = g(n, \Phi(n))$.
:::

Here, we use element notation to simplify the exposition. For example, the equation $\Phi(s(n)) = g(n,\Phi(n))$ means that the following diagram commutes:

$$
\begin{CD}
N @>{s}>> N \\
@V{(\id_N,\Phi)}VV @VV{\Phi}V \\
N \times X @>>{g}> X
\end{CD}
$$

::: Proof
Define the morphism $b : 1 \to N \times X$ by $b \coloneqq (z,a)$ and the morphism $h : N \times X \to N \times X$ by $h(n,x) \coloneqq (n,g(n,x))$. By the universal property of $(N,z,s)$, there is a unique morphism $\Psi : N \to N \times X$ such that:

- $\Psi(z) = b$
- $\Psi(s(n)) = h(\Psi(n))$

Write $\Psi(n) = (\Psi_0(n),\Psi_1(n))$, where $\Psi_0 : N \to N$ and $\Psi_1 : N \to X$. The two equations above then become:

- $\Psi_0(z) = z$
- $\Psi_0(s(n)) = \Psi_0(n)$
- $\Psi_1(z) = a$
- $\Psi_1(s(n)) = g(\Psi_0(n),\Psi_1(n))$

The uniqueness in the universal property of $(N,z,s)$ implies $\Psi_0 = \id_N$. Therefore, $\Phi \coloneqq \Psi_1$ is the unique morphism $\Phi : N \to X$ satisfying $\Phi(z)=a$ and $\Phi(s(n)) = g(n,\Phi(n))$.
:::

The next result appears in [Johnstone](https://ncatlab.org/nlab/show/Sketches+of+an+Elephant), Part A, Lemma 2.5.5. Our proof is slightly more concise because we have extracted Lemma 1.

::: Lemma 2
Let $(N,z,s)$ be a natural numbers object in a category with finite products. Then
$$1 \xrightarrow{z} N \xleftarrow{s} N$$
is a coproduct cocone. Thus, $N \cong 1 \sqcup N$.
:::

::: Proof
Let $a : 1 \to X$ and $b : N \to X$ be morphisms. We need to show that there is a unique morphism $c : N \to X$ satisfying $c(z) = a$ and $c(s(n)) = b(n)$. This follows by applying Lemma 1 to the morphism $g : N \times X \to X$ defined by $g(n,x) \coloneqq b(n)$.
:::

Next, we will check when the terminal object $1$ itself is a natural numbers object. In that case, $z : 1 \to 1$ and $s : 1 \to 1$ are necessarily equal to $\id_1$.

::: Lemma 3
Let $1$ be a terminal object in a category. Then $(1,\id_1,\id_1)$ is a natural numbers object if and only if for every endomorphism $g : X \to X$ and every morphism $a : 1 \to X$ we have $g \circ a = a$. If the category has finite products, $(1,\id_1,\id_1)$ is a parametrized natural numbers object if and only if $g = \id_X$ for every endomorphism $g : X \to X$, i.e. the category is [one-way](/category-property/one-way).
:::

::: Proof
The first statement is immediate from the definition of a natural numbers object. For the second, $(1,\id_1,\id_1)$ is a parametrized natural numbers object if and only if, for all morphisms $f : A \to X$ and all endomorphisms $g : X \to X$, there is a unique morphism $\Phi : A \to X$ such that $\Phi \circ \id_A = f$ and $\Phi \circ \id_A = g \circ \Phi$. These equations simplify to $\Phi = f$ and $f = g \circ f$. Since this must hold for every $f : A \to X$, we must have $g = \id_X$ (by the Yoneda Lemma or by a direct argument).
:::

Next, we prove a partial converse to the [result](/category-implication/parametrized_nno_criterion) that countably distributive categories have a parametrized natural numbers object.

::: Lemma 4
Let $\C$ be a category with finite products, countable copowers denoted $\otimes$, and a parametrized natural numbers object $1 \xrightarrow{z} N \xrightarrow{s} N$. Then there is an isomorphism $N \cong \IN \otimes 1$, and for every object $A$ the natural morphism
$$\alpha : \IN \otimes A \to A \times (\IN \otimes 1)$$
is an isomorphism.
:::

::: Proof
We will use element notation extensively. In particular, for every element $a \in A$ and $n \in \IN$, there is an element $n \otimes a \in \IN \otimes A$, formally defined by the $n$th coproduct inclusion. The morphism $\alpha$ is defined by
$$\alpha(n \otimes a) = (a,n \otimes 1).$$

In any category with a terminal object and countable copowers, we can construct the non-parametrized NNO $\IN \otimes 1$ with the element $0 \otimes 1 \in \IN \otimes 1$ and the map
$$s : \IN \otimes 1 \to \IN \otimes 1, \quad s(n \otimes 1) \coloneqq (n+1) \otimes 1.$$
See [here](/category-implication/nno_criterion) for a detailed proof. Since, by assumption, $1 \xrightarrow{z} N \xrightarrow{s} N$ is a parametrized NNO, it is also a non-parametrized NNO and is therefore isomorphic to the one just constructed. We may assume without loss of generality that they are equal and hence work with $N = \IN \otimes 1$.

Next, apply the parametrized universal property of the NNO to the diagram
$$A \xrightarrow{f} \IN \otimes A \xrightarrow{g} \IN \otimes A$$
defined by $f(a) \coloneqq 0 \otimes a$ and $g(n \otimes a) \coloneqq (n+1) \otimes a$. It gives a morphism
$$\Phi : A \times N \to \IN \otimes A$$
satisfying
$$\Phi(a,0 \otimes 1) = 0 \otimes a, \quad \Phi(a,s(m)) = g(\Phi(a,m)).$$
For $m \coloneqq n \otimes 1 \in N$, where $n \in \IN$, the second equation becomes
$$\Phi(a,(n+1) \otimes 1) = g(\Phi(a,n \otimes 1)).$$
By induction on $n \in \IN$, it follows that
$$\Phi(a,n \otimes 1) = n \otimes a,$$
which is exactly the statement that $\Phi \circ \alpha = \id_{\IN \otimes A}$.

It remains to prove $\alpha \circ \Phi = \id_{A \times N}$. We first observe that
$$\alpha \circ g = (\id_A \times s) \circ \alpha$$
as morphisms $\IN \otimes A \to A \times (\IN \otimes 1)$. Indeed, for every $n \otimes a \in \IN \otimes A$,
$$\alpha(g(n \otimes a)) = \alpha((n+1) \otimes a) = (a, (n+1) \otimes 1),$$
while
$$(\id_A \times s)(\alpha(n \otimes a)) = (\id_A \times s)(a, n \otimes 1) = (a, (n+1) \otimes 1).$$
The universal property applied to the diagram
$$A \xrightarrow{(\id_A,z)} A \times N \xrightarrow{\id_A \times s} A \times N$$
shows that there is a _unique_ morphism $\Psi : A \times N \to A \times N$ satisfying
$$\Psi \circ (\id_A,z) = (\id_A,z)$$
and
$$\Psi \circ (\id_A \times s) = (\id_A \times s) \circ \Psi,$$
namely $\id_{A \times N}$. Thus, it suffices to verify that $\alpha \circ \Phi : A \times N \to A \times N$ satisfies these two equations. We have
$$\alpha(\Phi(a,z)) = \alpha(0 \otimes a) = (a, 0 \otimes 1) = (a,z),$$
and hence $\alpha \circ \Phi \circ (\id_A,z) = (\id_A,z)$. Moreover,
$$\alpha \circ \Phi \circ (\id_A \times s) = \alpha \circ g \circ \Phi = (\id_A \times s) \circ \alpha \circ \Phi.$$
This finishes the proof.
:::

_Remark._ Actually, the mentioned [result](/category-implication/parametrized_nno_criterion) and Lemma 4 can be combined into an equivalent characterization as follows: In a category with finite products and countable copowers, the NNO (which exists, see [here](/category-implication/nno_criterion)) is a parametrized NNO if and only if for all objects $A$ the canonical morphism
$$\textstyle \coprod_{n \in \IN} A = \coprod_{n \in \IN} (A \times 1) \to A \times \coprod_{n \in \IN} 1$$
is an isomorphism. This is the precise connection to countable distributivity.
