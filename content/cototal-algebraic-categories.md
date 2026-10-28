---
title: Cototal algebraic categories
description: A characterization of cototal finitary algebraic categories, for example via residual smallness, and a proof that categories of actions of large groups are cototal.
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

## Actions of large groups

The implication (1) $\implies$ (4) of Proposition 1 does not extend to algebraic theories with a large collection of operations. For example, let $I$ be a collection that is not essentially small and $F(I)$ the free group on $I$, constructed in the universe of collections. The category $F(I){-}\Set$ is algebraic with a large collection of unary operations, namely the elements of $I$ and their inverses. It has no cogenerating collection, as shown on its [detail page](</category/F(I)-Set>), but it is cototal by the following result.

::: Proposition 3
Let $G$ be a possibly large group, i.e., a group whose underlying collection is not necessarily essentially small. Then the category $G{-}\Set$ of sets with an action of $G$ is [cototal](/category-property/cototal).
:::

::: Proof
Let $U : G{-}\Set \to \Set$ be the forgetful functor and $F : G{-}\Set \to \Set$ be an arbitrary functor. We need to find a $G$-set $L$ with bijections
$$\Hom(B,L) \cong \Hom(F,\Hom(B,-))$$
that are natural in $B \in G{-}\Set$.

Let $N \coloneqq \Hom(F,U)$ be the collection of natural transformations $F \to U$. Thus, an element $\alpha \in N$ is a family of maps $\alpha_X : F(X) \to X$, indexed by the $G$-sets $X$, such that $f(\alpha_X(t)) = \alpha_Y(F(f)(t))$ for every equivariant map $f : X \to Y$ and every $t \in F(X)$. The group $G$ acts on $N$ by
$$(g \cdot \alpha)_X(t) \coloneqq g \cdot \alpha_X(t)$$
for $g \in G$, $\alpha \in N$, $X \in G{-}\Set$, and $t \in F(X)$. Let $N' \subseteq N$ be the subcollection of all $\alpha \in N$ whose orbit $G \cdot \alpha$ is essentially small. It is $G$-stable since $G \cdot (g \cdot \alpha) = G \cdot \alpha$.

**Claim 1.** For every $G$-set $B$, the natural transformations $F \to \Hom(B,-)$ correspond to the equivariant maps $B \to N$, naturally in $B$. Moreover, every equivariant map $B \to N$ takes values in $N'$.

To see this, let $\eta : F \to \Hom(B,-)$ be a natural transformation, and define $k : B \to N$ by $k(b)_X(t) \coloneqq \eta_X(t)(b)$. Each $k(b)$ is natural: for a morphism $f : X \to Y$ we have
$$f(k(b)_X(t)) = (f \circ \eta_X(t))(b) = \eta_Y(F(f)(t))(b) = k(b)_Y(F(f)(t)).$$
The map $k$ is equivariant since each $\eta_X(t)$ is equivariant:
$$k(g \cdot b)_X(t) = \eta_X(t)(g \cdot b) = g \cdot \eta_X(t)(b) = (g \cdot k(b))_X(t).$$
Conversely, if $k : B \to N$ is an equivariant map, then the maps $\eta_X(t) : B \to X$, $b \mapsto k(b)_X(t)$ are equivariant by the same calculation, and they are natural in $X$ since each $k(b)$ is natural. Both constructions are inverse to each other and compatible with precomposition by morphisms $B' \to B$. Finally, for an equivariant map $k : B \to N$ and $b \in B$, the orbit $G \cdot k(b) = k(G \cdot b)$ is the image of a subset of $B$, hence essentially small, so that $k(b) \in N'$.

**Claim 2.** The collection $N'$ is essentially small.

Assuming this claim, we can transport the action of $G$ on $N'$ along a bijection to a set and obtain a $G$-set $L$ with an equivariant bijection $L \to N'$. By Claim 1, the equivariant maps $B \to L$ correspond to the natural transformations $F \to \Hom(B,-)$, naturally in $B$, which finishes the proof.

For the proof of Claim 2, let $\{0,1\}$ carry the trivial action of $G$. For $\alpha \in N$ consider the collection
$$N_\alpha \coloneqq \{\beta \in N : \beta_{\{0,1\}} = \alpha_{\{0,1\}}\}.$$
For every map $\varphi : F(\{0,1\}) \to \{0,1\}$ of the form $\varphi = \alpha_{\{0,1\}}$ with $\alpha \in N'$, we choose such an $\alpha$. Then every $\beta \in N'$ lies in $N_\alpha$ for the $\alpha$ chosen for $\varphi = \beta_{\{0,1\}}$. Since the maps $F(\{0,1\}) \to \{0,1\}$ form a set, $N'$ is thus contained in the union of a small family of collections $N_\alpha$ with $\alpha \in N'$. Therefore, it suffices to prove that $N_\alpha$ is essentially small for every $\alpha \in N'$.

So let $\alpha \in N'$. The orbit $A \coloneqq G \cdot \alpha$ is an essentially small collection with an action of $G$. Since $G{-}\Set$ is equivalent to the hypercategory of essentially small collections with an action of $G$, every functor $G{-}\Set \to \Set$ and every natural transformation $F \to U$ extend to this hypercategory, and we may treat $A$ as an object of $G{-}\Set$. (Alternatively, the following argument can be written down with a $G$-set and an equivariant bijection to $A$, which is then carried through all steps.) The power set $P(A)$ has the action $g \cdot T \coloneqq \{g \cdot \delta : \delta \in T\}$. We claim that the map
$$N_\alpha \to \Hom\bigl(F(P(A)),P(A)\bigr), \quad \beta \mapsto \beta_{P(A)}$$
is injective. Since its target is essentially small, this shows that $N_\alpha$ is essentially small.

Let $\beta,\gamma \in N_\alpha$ with $\beta_{P(A)} = \gamma_{P(A)}$. Let $X$ be a $G$-set and $t \in F(X)$. We need to show $\beta_X(t) = \gamma_X(t)$. Let $S \coloneqq G \cdot \alpha_X(t) \subseteq X$ be the orbit of $\alpha_X(t)$. Since $S$ is $G$-stable, its characteristic map $\chi_S : X \to \{0,1\}$ is equivariant. By naturality of $\beta$, we get
$$\chi_S(\beta_X(t)) = \beta_{\{0,1\}}(F(\chi_S)(t)) = \alpha_{\{0,1\}}(F(\chi_S)(t)) = \chi_S(\alpha_X(t)) = 1,$$
so that $\beta_X(t) \in S$. Likewise, $\gamma_X(t) \in S$. Next, define
$$h : X \to P(A), \quad h(x) \coloneqq \{\delta \in A : \delta_X(t) = x\}.$$
It is equivariant:

$$
\begin{align*}
h(g \cdot x) & = \{\delta \in A : g^{-1} \cdot \delta_X(t) = x\} \\
& = \{\delta \in A : (g^{-1} \cdot \delta)_X(t) = x\} \\
& = g \cdot \{\delta' \in A : \delta'_X(t) = x\} = g \cdot h(x).
\end{align*}
$$

The sets $h(x)$ for distinct $x \in X$ are disjoint. For $x \in S$, write $x = g \cdot \alpha_X(t) = (g \cdot \alpha)_X(t)$; then $g \cdot \alpha \in h(x)$, so $h(x)$ is non-empty. Hence, $h$ is injective on $S$. By naturality of $\beta$ and $\gamma$, we get
$$h(\beta_X(t)) = \beta_{P(A)}(F(h)(t)) = \gamma_{P(A)}(F(h)(t)) = h(\gamma_X(t)).$$
Since $\beta_X(t)$ and $\gamma_X(t)$ lie in $S$, this implies $\beta_X(t) = \gamma_X(t)$.
:::
