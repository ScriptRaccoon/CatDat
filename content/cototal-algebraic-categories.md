---
title: Cototal algebraic categories
description: A characterization of cototal finitary algebraic categories, for example via residual smallness.
---

# Cototal algebraic categories

The following result and its proof are based on the question [MO/515539](https://mathoverflow.net/questions/515539) and the answer by Colin McQuillan there. We work with a many-sorted finitary algebraic theory $\T$ with a set of sorts $S$. For a sort $s \in S$, let $U_s : \Alg(\T) \to \Set$ be the forgetful functor to the underlying set of sort $s$.

We recall some notions from universal algebra, which carry over verbatim from the one-sorted case. A _congruence_ $\theta$ on a $\T$-algebra $A$ is a family of equivalence relations $\theta_s$ on $A_s$, $s \in S$, which is compatible with the operations of $\T$. It is called _non-identity_ if $\theta_s$ is not the identity relation for at least one sort $s$. A $\T$-algebra $A$ is called _subdirectly irreducible_ if it has a least non-identity congruence, i.e., if the intersection $\mu_A$ of all non-identity congruences on $A$ is a non-identity congruence. The category $\Alg(\T)$ is called _residually small_ if the collection of isomorphism classes of subdirectly irreducible $\T$-algebras is essentially small.

::: Proposition 1
For a many-sorted finitary algebraic theory $\T$, the following are equivalent:

1. $\Alg(\T)$ is [cototal](/category-property/cototal).
2. For every functor $F : \Alg(\T) \to \Set$ and every sort $s$, the collection $\Hom(F,U_s)$ of natural transformations $F \to U_s$ is essentially small.
3. $\Alg(\T)$ is residually small.
4. $\Alg(\T)$ has a [cogenerating collection](/category-property/cogenerating_collection).

:::

::: Proof
(1) $\implies$ (2): Let $P_s$ be the free $\T$-algebra on one generator of sort $s$, so that
$$U_s \cong \Hom(P_s,-).$$
Let $L : [\Alg(\T),\Set] \to \Alg(\T)^{\op}$ be a left adjoint of the contravariant Yoneda embedding $y : \Alg(\T)^{\op} \to [\Alg(\T),\Set]$. For every functor $F : \Alg(\T) \to \Set$, we get

$$
\begin{align*}
\Hom(F,U_s) & \cong \Hom(F,y(P_s)) \\
& \cong \Hom_{\Alg(\T)^{\op}}(L(F),P_s) \\
& = \Hom_{\Alg(\T)}(P_s,L(F)) \\
& \cong U_s(L(F)),
\end{align*}
$$

which is a set.

(2) $\implies$ (3): Fix a sort $s \in S$. For a $\T$-algebra $M$, let $F(M)$ be the set of triples $(N,a,b)$, where $N$ is a subalgebra of $M$ and $a,b \in N_s$ are elements such that $(a,b) \in \theta_s$ for every non-identity congruence $\theta$ on $N$. We allow $a = b$. For a homomorphism $f : M \to M'$, we define
$$F(f)(N,a,b) \coloneqq (f(N),f(a),f(b)).$$
This is well-defined: Let $\theta$ be a non-identity congruence on the subalgebra $f(N) \subseteq M'$. Since the homomorphism $f|_N : N \to f(N)$ is surjective, the preimage of $\theta$ under $f|_N$ is a non-identity congruence on $N$. Hence, it contains $(a,b)$, which means that $(f(a),f(b)) \in \theta_s$. It is clear that $F$ is a functor $\Alg(\T) \to \Set$.

Now let $A$ be a subdirectly irreducible $\T$-algebra. We define $\alpha^A : F \to U_s$ by
$$\alpha^A_M(N,a,b) \coloneqq \begin{cases} a & \text{if } N \cong A, \\ b & \text{otherwise}. \end{cases}$$
We claim that $\alpha^A$ is natural. Let $f : M \to M'$ be a homomorphism and pick an element $(N,a,b) \in F(M)$. We need to prove
$$f(\alpha^A_M(N,a,b)) = \alpha^A_{M'}(f(N),f(a),f(b)),$$
that is,
$$\begin{cases} f(a) & \text{if } N \cong A, \\ f(b) & \text{otherwise} \end{cases} = \begin{cases} f(a) & \text{if } f(N) \cong A, \\ f(b) & \text{otherwise}. \end{cases}$$
If $f|_N : N \to f(N)$ is injective in every sort, it is an isomorphism, so that $N \cong A$ holds if and only if $f(N) \cong A$ holds, proving the equation. If $f|_N$ is not injective in some sort, then its kernel is a non-identity congruence on $N$, which therefore contains $(a,b)$. This means $f(a) = f(b)$, in which case the equation is trivial.

Let $\S_s$ be the collection of subdirectly irreducible $\T$-algebras $A$ such that $(\mu_A)_s$ is not the identity relation. If $A,B \in \S_s$ are non-isomorphic, we choose $a \neq b$ in $A_s$ with $(a,b) \in (\mu_A)_s$. Then $(A,a,b) \in F(A)$, and
$$\alpha^A_A(A,a,b) = a \neq b = \alpha^B_A(A,a,b).$$
Thus, $A \mapsto \alpha^A$ induces an injective map from the collection of isomorphism classes in $\S_s$ to $\Hom(F,U_s)$, which is essentially small by assumption. Hence, the isomorphism classes in $\S_s$ form an essentially small collection. Since every subdirectly irreducible $\T$-algebra $A$ lies in some $\S_s$ (because $\mu_A$ is non-identity) and $S$ is a set, $\Alg(\T)$ is residually small.

(3) $\implies$ (4): By Proposition 2 below, representatives of the isomorphism classes of subdirectly irreducible $\T$-algebras form a cogenerating collection.

(4) $\implies$ (1): The category $\Alg(\T)$ is complete, locally small, and well-powered (since monomorphisms are injective, subobjects correspond to subalgebras). Therefore, the claim follows from the dual of [this result](/category-implication/cocomplete_well-copowered_generator_implies_total).
:::

The following result is the many-sorted version of Birkhoff's subdirect representation theorem.

::: Proposition 2
Let $\T$ be a many-sorted finitary algebraic theory and $A$ a $\T$-algebra. Then there is a family of surjective homomorphisms $(h_i : A \to Q_i)_{i \in I}$, where each $Q_i$ is subdirectly irreducible, such that the induced homomorphism
$$\textstyle h : A \to \prod_{i \in I} Q_i$$
is injective in every sort. In other words, $A$ is a subdirect product of subdirectly irreducible $\T$-algebras.
:::

::: Proof
Let $I$ be the set of triples $(s,a,b)$, where $s$ is a sort and $a,b \in A_s$ with $a \neq b$. It suffices to construct, for each $i = (s,a,b) \in I$, a surjective homomorphism $h_i : A \to Q_i$ with $Q_i$ subdirectly irreducible and $h_i(a) \neq h_i(b)$, since then $h$ is injective in every sort.

The union of a chain of congruences on $A$ is again a congruence since all operations of $\T$ are finitary. Hence, by Zorn's lemma, there is a congruence $\theta$ on $A$ which is maximal with respect to $(a,b) \notin \theta_s$. Let $Q_i \coloneqq A/\theta$ and $h_i : A \to Q_i$ be the projection, so that $h_i(a) \neq h_i(b)$. Every congruence on $A$ strictly containing $\theta$ contains $(a,b)$ by maximality. Since the non-identity congruences on $Q_i$ correspond to the congruences on $A$ strictly containing $\theta$, every non-identity congruence on $Q_i$ contains $(h_i(a),h_i(b))$. This means that the congruence on $Q_i$ generated by $(h_i(a),h_i(b))$, which is non-identity, is the least non-identity congruence. Hence, $Q_i$ is subdirectly irreducible.
:::
