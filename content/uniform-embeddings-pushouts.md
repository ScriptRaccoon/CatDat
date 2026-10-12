---
title: Pushouts of uniform embeddings
description: In the category of uniform spaces, uniform embeddings are stable under pushouts.
---

# Pushouts of uniform embeddings

In this page, we prove that in the [category of uniform spaces](/category/Unif), regular monomorphisms are stable under pushouts. Recall that the regular monomorphisms in $\Unif$ are precisely the _uniform embeddings_, i.e. the injective uniform maps $i : A \hookrightarrow X$ such that every entourage of $A$ is the preimage of an entourage of $X$.

For topological spaces, the analogous result is rather easy, since the topology of a pushout is described directly by the preimages of open sets. For uniform spaces, the uniform structure of a pushout is more complicated, since the composition axiom of a uniform structure forces us to consider chains of entourages. The following lemma allows us to control such chains.

::: Lemma 1
Let $(V_n)_{n \geq 0}$ be a sequence of relations on a set $S$ such that each $V_n$ contains the diagonal $\Delta_S$ and
$$V_{n+1} \circ V_{n+1} \circ V_{n+1} \subseteq V_n$$
for all $n \geq 0$. Let $s_0,\dotsc,s_k \in S$ and $m_1,\dotsc,m_k \geq 0$ be such that $(s_{l-1},s_l) \in V_{m_l}$ for all $1 \leq l \leq k$. If $M \geq 0$ is an integer with
$$\sum_{l=1}^{k} 2^{-m_l} \leq 2^{-M},$$
then $(s_0,s_k) \in V_M$.
:::

We think of $2^{-m_l}$ as the "length" of the step from $s_{l-1}$ to $s_l$. The lemma says that a chain of total length at most $2^{-M}$ can be replaced by a single step in $V_M$. Note that the assumption $V_{n+1} \circ V_{n+1} \subseteq V_n$ would not be sufficient here: for $(m_1,m_2,m_3) = (2,1,2)$ and $M = 0$, we would only get $(s_0,s_3) \in V_2 \circ V_1 \circ V_2$, which does not have to be contained in $V_0$.

::: Proof
Since each $V_{n+1}$ contains the diagonal, we have $V_{n+1} \subseteq V_{n+1} \circ V_{n+1} \circ V_{n+1} \subseteq V_n$. Thus, the sequence is decreasing, i.e. $V_{n'} \subseteq V_n$ for $n' \geq n$.

We prove the claim by strong induction on $k$, simultaneously for all $M$. If $k = 0$, then $(s_0,s_k) = (s_0,s_0) \in \Delta_S \subseteq V_M$. If $k = 1$, then $2^{-m_1} \leq 2^{-M}$ means $m_1 \geq M$, and hence $(s_0,s_1) \in V_{m_1} \subseteq V_M$.

Now let $k \geq 2$, and let $\sigma \coloneqq \sum_{l=1}^{k} 2^{-m_l}$. Since $0 < \sigma \leq 2^{-M}$, there is a largest integer $N$ with $\sigma \leq 2^{-N}$, and we have $N \geq M$. Since $V_N \subseteq V_M$, it suffices to show that $(s_0,s_k) \in V_N$. By the maximality of $N$, we have $\sigma > 2^{-(N+1)}$. Since $k \geq 2$ and all summands are positive, each summand is strictly smaller than $\sigma$, so $2^{-m_l} < 2^{-N}$, i.e. $m_l \geq N+1$ for all $l$.

Let $p \in \{0,\dotsc,k\}$ be the largest index with $\sum_{l=1}^{p} 2^{-m_l} \leq 2^{-(N+1)}$. Since $\sigma > 2^{-(N+1)}$, we have $p < k$. We split the chain into three parts:

- The chain $s_0,\dotsc,s_p$ has $p < k$ steps and total length at most $2^{-(N+1)}$. By the induction hypothesis, $(s_0,s_p) \in V_{N+1}$.
- The single step satisfies $(s_p,s_{p+1}) \in V_{m_{p+1}} \subseteq V_{N+1}$, since $m_{p+1} \geq N+1$.
- The chain $s_{p+1},\dotsc,s_k$ has $k-p-1 < k$ steps. By the maximality of $p$, we have $\sum_{l=1}^{p+1} 2^{-m_l} > 2^{-(N+1)}$, and therefore its total length satisfies
  $$\sum_{l=p+2}^{k} 2^{-m_l} = \sigma - \sum_{l=1}^{p+1} 2^{-m_l} < 2^{-N} - 2^{-(N+1)} = 2^{-(N+1)}.$$
  By the induction hypothesis, $(s_{p+1},s_k) \in V_{N+1}$.

It follows that $(s_0,s_k) \in V_{N+1} \circ V_{N+1} \circ V_{N+1} \subseteq V_N$.
:::

## Setup

For the rest of this page, we fix a uniform embedding $i : A \hookrightarrow X$ and a uniform map $f : A \to Y$. Let $P \coloneqq Y \sqcup_A X$ be their pushout in $\Unif$, with canonical maps $j : Y \to P$ and $u : X \to P$, so that $u \circ i = j \circ f$. Our goal is to show that $j$ is a uniform embedding.

As explained in the proof of cocompleteness on the page of [$\Unif$](/category/Unif), the underlying set of $P$ is the pushout of the underlying sets, and $P$ carries the finest uniform structure that makes $j$ and $u$ uniform. Since $i$ is injective, we may identify the underlying set of $P$ with $Y \sqcup (X \setminus i(A))$, where $j$ is the inclusion of $Y$, $u(x) = x$ for $x \in X \setminus i(A)$, and $u(i(a)) = f(a)$ for $a \in A$. From this description, we read off the following facts, which we will use below:

1. The map $j$ is injective.
2. For $x \in X$, we have $u(x) \in j(Y)$ if and only if $x \in i(A)$.
3. Every point $z \in P \setminus j(Y)$ has exactly one preimage under $u$, namely $z$ itself, regarded as an element of $X \setminus i(A)$.

The following claim tells us how to construct entourages of $P$.

::: Claim 1
Let $W_0 \supseteq W_1 \supseteq \dotsc$ be symmetric relations on $P$ that contain $\Delta_P$ and satisfy $W_{n+1} \circ W_{n+1} \subseteq W_n$ for all $n \geq 0$. If $(j \times j)^*(W_n)$ is an entourage of $Y$ and $(u \times u)^*(W_n)$ is an entourage of $X$ for all $n \geq 0$, then every $W_n$ is an entourage of $P$.
:::

::: Proof
Let $\Phi$ be the set of all subsets of $P \times P$ that contain some $W_n$. Since the sequence is decreasing, $\Phi$ is closed under finite intersections, and it is clearly closed under taking larger subsets. Every element of $\Phi$ contains $\Delta_P$. If $S \in \Phi$ contains $W_n$, then $S^{\op}$ contains $W_n^{\op} = W_n$, and $W_{n+1} \in \Phi$ satisfies $W_{n+1} \circ W_{n+1} \subseteq S$. Thus, $\Phi$ is a uniform structure on $P$. By assumption, $j$ and $u$ are uniform with respect to $\Phi$. Since $P$ carries the finest such uniform structure, $\Phi$ is contained in the uniform structure of $P$. In particular, every $W_n$ is an entourage of $P$.
:::

The next claim is where we use that $i$ is a uniform embedding.

::: Claim 2
Let $U$ be an entourage of $Y$. Then there are symmetric entourages $U_n$ of $Y$ and $V_n$ of $X$ for $n \geq 0$ such that $U_0 \subseteq U$ and
$$U_{n+1} \circ U_{n+1} \circ U_{n+1} \subseteq U_n, \quad V_{n+1} \circ V_{n+1} \circ V_{n+1} \subseteq V_n$$
for all $n \geq 0$. Moreover, for all $n \geq 0$ and all $a,a' \in A$ with $(i(a),i(a')) \in V_n$, we have $(f(a),f(a')) \in U_n$.
:::

::: Proof
Recall that every entourage of a uniform space contains a symmetric entourage $E$ with $E \circ E \circ E$ contained in the given entourage. Thus, we can choose symmetric entourages $U_n$ of $Y$ with $U_0 \subseteq U$ and $U_{n+1} \circ U_{n+1} \circ U_{n+1} \subseteq U_n$ for all $n \geq 0$.

Since $f$ is uniform, $(f \times f)^*(U_n)$ is an entourage of $A$. Since $i$ is a uniform embedding, there is an entourage $V'_n$ of $X$ with $(i \times i)^*(V'_n) = (f \times f)^*(U_n)$. We now choose symmetric entourages $V_n$ of $X$ recursively: let $V_0$ be a symmetric entourage contained in $V'_0$, and let $V_{n+1}$ be a symmetric entourage with $V_{n+1} \circ V_{n+1} \circ V_{n+1} \subseteq V_n \cap V'_{n+1}$. Since $V_{n+1}$ contains the diagonal, we have $V_{n+1} \subseteq V'_{n+1}$. Thus, for all $n \geq 0$, we have $V_{n+1} \circ V_{n+1} \circ V_{n+1} \subseteq V_n$ and $V_n \subseteq V'_n$. The latter implies $(i \times i)^*(V_n) \subseteq (i \times i)^*(V'_n) = (f \times f)^*(U_n)$, which is precisely the last statement of the claim.
:::

In what follows, we fix an entourage $U$ of $Y$ and sequences $(U_n)$ and $(V_n)$ as in Claim 2. Both sequences are decreasing, since for example $U_{n+1} \subseteq U_{n+1} \circ U_{n+1} \circ U_{n+1} \subseteq U_n$. For $n \geq 0$, consider the relation
$$Q_n \coloneqq (j \times j)_*(U_n) \cup (u \times u)_*(V_n)$$
on $P$. It is symmetric, and it contains $\Delta_P$, since $U_n$ and $V_n$ contain the diagonals and $j,u$ are jointly surjective. As in Lemma 1, we consider chains: a _chain_ from $z \in P$ to $z' \in P$ consists of points $z = z_0,z_1,\dotsc,z_k = z'$ of $P$ and integers $m_1,\dotsc,m_k \geq 0$ with $(z_{l-1},z_l) \in Q_{m_l}$ for all $1 \leq l \leq k$. Its _length_ is $\sum_{l=1}^{k} 2^{-m_l}$. Let $W_n$ be the set of all pairs $(z,z') \in P \times P$ such that there is a chain from $z$ to $z'$ of length at most $2^{-n}$.

::: Claim 3
Every $W_n$ is an entourage of $P$.
:::

::: Proof
We verify the assumptions of Claim 1:

- $W_n$ contains $\Delta_P$, using chains with $k = 0$.
- $W_n$ is symmetric, since each $Q_m$ is symmetric, so that we can reverse chains.
- $W_{n+1} \subseteq W_n$, since $2^{-(n+1)} \leq 2^{-n}$.
- $W_{n+1} \circ W_{n+1} \subseteq W_n$, since the concatenation of two chains of length at most $2^{-(n+1)}$ is a chain of length at most $2^{-n}$.
- We have $Q_n \subseteq W_n$, using chains with $k = 1$ and $m_1 = n$. Therefore, $(j \times j)^*(W_n)$ contains $U_n$ and is an entourage of $Y$. Likewise, $(u \times u)^*(W_n)$ contains $V_n$ and is an entourage of $X$.

Hence, Claim 1 shows that every $W_n$ is an entourage of $P$.
:::

A chain in $P$ between two points of $j(Y)$ may leave $j(Y)$ in between. The next claim shows that such an excursion can be replaced by a single step in $Y$.

::: Claim 4
Let $y,y' \in Y$, and let $z_0,\dotsc,z_k$ with $m_1,\dotsc,m_k$ be a chain from $j(y)$ to $j(y')$ with $k \geq 1$ such that $z_l \notin j(Y)$ for all $0 < l < k$. If $M \geq 0$ is an integer with
$$\sum_{l=1}^{k} 2^{-m_l} \leq 2^{-M},$$
then $(y,y') \in U_M$.
:::

::: Proof
Each step $(z_{l-1},z_l)$ of the chain lies in $Q_{m_l} = (j \times j)_*(U_{m_l}) \cup (u \times u)_*(V_{m_l})$, i.e. it comes from a pair in $U_{m_l}$ or from a pair in $V_{m_l}$ (or both). We distinguish two cases.

_Case 1:_ Every step comes from a pair in $V_{m_l}$, i.e. $(z_{l-1},z_l) \in (u \times u)_*(V_{m_l})$ for all $1 \leq l \leq k$. Then for each $1 \leq l \leq k$, we can choose $(x'_l,x''_l) \in V_{m_l}$ with $u(x'_l) = z_{l-1}$ and $u(x''_l) = z_l$. For $0 < l < k$, the point $z_l \notin j(Y)$ has exactly one preimage $x_l$ under $u$ by fact 3, so that $x''_l = x_l = x'_{l+1}$. Let $x_0 \coloneqq x'_1$ and $x_k \coloneqq x''_k$. Then $x_0,\dotsc,x_k$ are points of $X$ with
$$(x_{l-1},x_l) \in V_{m_l} \quad \text{for } 1 \leq l \leq k.$$
By Lemma 1 applied to the sequence $(V_n)$, we get $(x_0,x_k) \in V_M$. Since $u(x_0) = z_0 = j(y) \in j(Y)$, we have $x_0 = i(a)$ for some $a \in A$ by fact 2. Then $j(f(a)) = u(i(a)) = z_0 = j(y)$, so $f(a) = y$ by fact 1. Likewise, $x_k = i(a')$ for some $a' \in A$ with $f(a') = y'$. Since $(i(a),i(a')) \in V_M$, Claim 2 shows that
$$(y,y') = (f(a),f(a')) \in U_M.$$

_Case 2:_ Some step comes from a pair in $U_{m_l}$, i.e. $(z_{l-1},z_l) \in (j \times j)_*(U_{m_l})$ for some $1 \leq l \leq k$. Then both $z_{l-1}$ and $z_l$ lie in $j(Y)$. Since $z_0$ and $z_k$ are the only points of the chain in $j(Y)$, this means $l = 1$ and $k = 1$. So the chain consists of the single step $(z_0,z_1) \in (j \times j)_*(U_{m_1})$. Since $z_0 = j(y)$, $z_1 = j(y')$, and $j$ is injective (fact 1), this means $(y,y') \in U_{m_1}$. Since $2^{-m_1} \leq 2^{-M}$, we have $m_1 \geq M$, and hence $(y,y') \in U_{m_1} \subseteq U_M$.
:::

## The main result

::: Proposition 2
Let $i : A \hookrightarrow X$ be a uniform embedding and $f : A \to Y$ be a uniform map. Then the canonical map $j : Y \to Y \sqcup_A X$ into the pushout is a uniform embedding. In particular, $\Unif$ has [pushout-stable regular monomorphisms](/category-property/pushout-stable_regular_monomorphisms).
:::

::: Proof
We use the notation from the previous section. Let $U$ be an entourage of $Y$, and let $U_n$, $V_n$, $W_n$ be as above. We need to show that $U = (j \times j)^*(W')$ for some entourage $W'$ of $P$. It suffices to show that
$$(j \times j)^*(W_1) \subseteq U,$$
since $W_1$ is an entourage of $P$ by Claim 3. Indeed, then $W' \coloneqq W_1 \cup (j \times j)_*(U)$ is an entourage of $P$, and since $j$ is injective, we have $(j \times j)^*((j \times j)_*(U)) = U$ and therefore $(j \times j)^*(W') = (j \times j)^*(W_1) \cup U = U$.

So let $y,y' \in Y$ with $(j(y),j(y')) \in W_1$, and choose a chain from $j(y)$ to $j(y')$ of length at most $1/2$. That is, we choose points $z_0,\dotsc,z_k \in P$ with $z_0 = j(y)$ and $z_k = j(y')$, and integers $m_1,\dotsc,m_k \geq 0$, such that
$$(z_{l-1},z_l) \in Q_{m_l} \quad \text{for all } 1 \leq l \leq k, \qquad \sum_{l=1}^{k} 2^{-m_l} \leq \frac{1}{2}.$$
Let $0 = l_0 < l_1 < \dotsc < l_r = k$ be the indices $l$ with $z_l \in j(Y)$. By fact 1, there are unique $y_s \in Y$ with $j(y_s) = z_{l_s}$ for $0 \leq s \leq r$, and we have $y_0 = y$ and $y_r = y'$.

For $0 \leq s < r$, the points $z_{l_s},\dotsc,z_{l_{s+1}}$ with the integers $m_{l_s+1},\dotsc,m_{l_{s+1}}$ form a chain from $j(y_s)$ to $j(y_{s+1})$ whose intermediate points do not lie in $j(Y)$. Let
$$\sigma_s \coloneqq \sum_{l=l_s+1}^{l_{s+1}} 2^{-m_l}$$
be its length. Since $0 < \sigma_s \leq 1/2$, there is a largest integer $M_s$ with $\sigma_s \leq 2^{-M_s}$, and we have $M_s \geq 1$. By Claim 4, we have $(y_s,y_{s+1}) \in U_{M_s}$. By the maximality of $M_s$, we have $2^{-(M_s+1)} < \sigma_s$, i.e. $2^{-M_s} < 2\sigma_s$.

Thus, $y_0,\dotsc,y_r$ are points of $Y$ with $(y_s,y_{s+1}) \in U_{M_s}$ for $0 \leq s < r$. Since the parts of the chain do not overlap, we have
$$\sum_{s=0}^{r-1} 2^{-M_s} \leq 2 \sum_{s=0}^{r-1} \sigma_s = 2 \sum_{l=1}^{k} 2^{-m_l} \leq 2 \cdot \frac{1}{2} = 1 = 2^{0}.$$
By Lemma 1 applied to the sequence $(U_n)$, we conclude that $(y,y') = (y_0,y_r) \in U_0 \subseteq U$.
:::

## Relation to the literature

The result is related to the literature on descent theory. In a category with pushouts and equalizers, the _codescent morphisms_ (i.e. the descent morphisms in the opposite category) are precisely the pushout-stable regular monomorphisms. This is dual to the result of Janelidze and Tholen that, in a category with pullbacks and coequalizers, the descent morphisms are precisely the pullback-stable regular epimorphisms (see Section 2 of [Zangurashvili](https://doi.org/10.1016/j.jpaa.2006.06.007), or the theorem in the section "Properties" at the [nLab](https://ncatlab.org/nlab/show/effective+descent+morphism)). Zangurashvili states that every uniform embedding is even an _effective_ codescent morphism ([Zangurashvili](https://doi.org/10.1016/j.jpaa.2006.06.007), Example 3.8). The idea is to transfer the effectiveness of codescent morphisms along the forgetful functor $\Unif \to \Set$, which is a topological functor: Theorem 3.6 in that paper, applied to the opposite of this functor, shows that a codescent morphism of $\Unif$ is effective whenever its underlying map is an effective codescent morphism of $\Set$.

We have nevertheless given a direct proof on this page, for two reasons. First, Theorem 3.6 only concerns the _effectiveness_ of codescent morphisms. The conclusion of Example 3.8 about all regular monomorphisms relies on the last sentence of Theorem 3.6, which assumes that the category in question is regular, i.e. here that $\Unif$ is coregular. For $\Unif$, this means precisely that uniform embeddings are stable under pushouts, which is exactly the statement we need, and the paper does not prove it. Second, our proof is elementary and self-contained, it does not require any descent theory, and it shows explicitly how the entourages of the pushout are constructed.
