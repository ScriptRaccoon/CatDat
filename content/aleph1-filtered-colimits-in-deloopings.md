---
title: ℵ₁-filtered colimits in deloopings
description: We give a detailed proof that the delooping of the monoid of natural numbers, and likewise the delooping of the large monoid of ordinal numbers, has colimits indexed by ℵ₁-filtered categories.
author: Martin Brandenburg
---

# $\aleph_1$-filtered colimits in deloopings

Every (possibly large) monoid $M$ induces a category $BM$ with just one object. We will show that this category has $\aleph_1$-filtered colimits in the cases $M = \IN$ and $M = \On$ (both respect to addition).

::: Proposition 1
The category $B\IN$ has $\aleph_1$-filtered colimits.
:::

_Proof._
Let $D : \I \to B\IN$ be an $\aleph_1$-filtered diagram. Every two parallel morphisms $i \rightrightarrows j$ are mapped to the same morphism in $B \IN$, because they are coequalized by some morphism and $(\IN,+)$ is cancellative. Hence, $D$ factors through the preorder reflection of $\I$, and we may therefore assume that $\I$ itself is a preordered set. Thus, the diagram consists of numbers $D(i,j) \in \IN$ for all $i \leq j$ satisfying

$$D(j,k) + D(i,j) = D(i,k)$$

for all $i \leq j \leq k$. In particular, $D(i,j) \leq D(i,k)$.

Let $i \in \I$. The set of natural numbers $\{D(i,k) : k \geq i\}$ is bounded above. Otherwise, for every $n \in \IN$ we could find $k_n \in \I$ with $k_n \geq i$ and $D(i,k_n) \geq n$. Since $\I$ is $\aleph_1$-filtered, the family $(k_n)_{n \in \IN}$ has an upper bound $k_\infty \in \I$. But then

$$D(i, k_\infty) = D(k_n,k_\infty) + D(i, k_n) \geq D(i, k_n) \geq n$$

for all $n \in \IN$, contradicting the fact that $D(i,k_\infty) \in \IN$.

Therefore, the maximum

$$u_i \coloneqq \max \{D(i,k) : k \geq i\} \in \IN$$

is well-defined, which we regard as a morphism in $B\IN$. For $i \leq j$ we compute

$$
\begin{align*}
u_i & = \max \{D(i,k) : k \geq i\} \\
& = \max \{D(i,k) : k \geq j\} \\
& = \max \{ D(j,k) + D(i,j) : k \geq j\} \\
& = \max \{D(j,k) : k \geq j\}  + D(i,j)\\
& = u_j + D(i,j),
\end{align*}
$$

showing that $(u_i)$ defines a cocone. It is universal: let $(v_i)$ be another cocone, i.e. $v_i \in \IN$ and $v_i = v_j + D(i,j)$ for all $i \leq j$. Then $v_i \geq D(i,j)$ for all $i \leq j$, hence $v_i \geq u_i$. Write $v_i = w_i + u_i$ for some uniquely determined $w_i \in \IN$. For $i \leq j$ we compute

$$w_j + u_j + D(i,j) = v_j + D(i,j) = v_i = w_i + u_i = w_i + u_j + D(i,j),$$

hence $w_j = w_i$. Therefore, the $w_i$ are constant, and the required factorization follows. <span class="qed">$\square$</span>

::: Proposition 2
The category $B\IN$ is $\aleph_1$-accessible.
:::

_Proof._
Based on Proposition 1, it remains to show that the unique object $*$ is $\aleph_1$-presentable, i.e. that for every diagram $D : \I \to B\IN$ as above, the canonical map

$$\alpha : \colim_{i \in \I} \Hom(*,D(i)) \to \Hom(*,\colim_{i \in \I} D(i))$$

is bijective. On objects, we necessarily have $D(i)=*$ and $\colim_{i \in \I} D(i)=*$. Hence, the codomain of $\alpha$ is simply $\IN$, while the domain consists of equivalence classes $[i,n]$ of pairs $(i,n) \in \I \times \IN$, where $(i,n) \sim (j,m)$ iff there exists some $k \geq i,j$ such that

$$D(i,k) + n = D(j,k) + m.$$

By the construction of the colimit cocone, we have

$$\alpha([i,n]) = u_i + n = \max \{D(i,j) : j \geq i\} + n.$$

(1) **The map $\alpha$ is surjective:** Pick some $i \in \I$. Choose $j \geq i$ such that $u_i = D(i,j)$. For all $k \geq j$ we then have

$$u_i \geq D(i,k) = D(j,k) + D(i,j) = D(j,k) + u_i,$$

hence $D(j,k)=0$. Therefore, $u_j=0$, and thus $\alpha([j,n]) = n$ for all $n \in \IN$.

(2) **The map $\alpha$ is injective:** Assume that $[i,n]$ and $[j,m]$ have the same image. Since $\I$ is filtered, we may assume $i=j$. The condition then becomes $u_i + n = u_i + m$, and therefore $n=m$. This completes the proof. <span class="qed">$\square$</span>

::: Proposition 3
The category $B\On$ has $\aleph_1$-filtered colimits.
:::

_Proof._
The proof is similar to $B\IN$. Let $\I$ be an $\aleph_1$-filtered small category and $D : \I \to B\On$ a diagram. A cocone $\lambda = (\lambda_i)_{i \in \I}$ for $D$ is a family of ordinals satisfying $\lambda_i = \lambda_j + D(f)$ for every morphism $f: i \to j$ in $\I$.

We first observe that $D$ factors uniquely through the preorder reflection of $\I$. Indeed, any two parallel morphisms in $\I$ are coequalized by some morphism, and $B\On$ is left cancellative. Thus, we may assume that $\I$ is a preordered set. Each inequality $i \leq j$ in $\I$ is mapped to an ordinal number $\alpha_{i,j} \coloneqq D(i \to j)$, and these numbers satisfy
$$\alpha_{i,k} = \alpha_{j,k} + \alpha_{i,j}$$
for all $i \leq j \leq k$. In particular, $\alpha_{i,j} \leq \alpha_{i,k}$.

For fixed $i \in \I$, the collection $\{\alpha_{i,j} : j \geq i\}$ is a set of ordinals because $\I$ is small, hence bounded above in $\On$. We claim that it has a maximum element. Otherwise, we can find a countable chain $i = j_0 \leq j_1 \leq j_2 \leq \dotsc$ in $\I$ such that $\alpha_{i,j_n} < \alpha_{i,j_{n+1}}$ for all $n \in \IN$. Since $\I$ is $\aleph_1$-filtered, there is an upper bound $j_\infty \in \I$ of $(j_n)_{n \in \IN}$. For each $n \in \IN$, the equation
$$\alpha_{i,j_{n+1}} = \alpha_{j_n,j_{n+1}} + \alpha_{i,j_n}$$
implies that $\alpha_{j_n,j_{n+1}} > 0$. Hence,
$$\alpha_{j_n,j_\infty} = \alpha_{j_{n+1},j_\infty} + \alpha_{j_n,j_{n+1}} > \alpha_{j_{n+1},j_\infty},$$
so $(\alpha_{j_n,j_\infty})_{n \in \IN}$ is a strictly decreasing infinite sequence of ordinals, contradicting the well-foundedness of $\On$. Thus, the maximum
$$u_i \coloneqq \max \{ \alpha_{i,j} : j \geq i \}$$
is a well-defined ordinal number, which we regard as a morphism in $B\On$. The family $(u_i)_{i \in \I}$ forms a cocone for $D$, since for all $i \leq j$ we have

$$
\begin{align*}
u_i & = \max \{ \alpha_{i,k} : k \geq i \} \\
& = \max \{ \alpha_{i,k} : k \geq j \} \\
& = \max \{ \alpha_{j,k} + \alpha_{i,j} : k \geq j \} \\
& = \max \{ \alpha_{j,k} : k \geq j \} + \alpha_{i,j} \\
& = u_j + \alpha_{i,j}.
\end{align*}
$$

To establish the universal property, let $(\lambda_i)_{i \in \I}$ be any cocone for $D$, so that $\lambda_i = \lambda_j + \alpha_{i,j}$ for all $i \leq j$. The cocone relation $u_i = u_j + \alpha_{i,j}$ implies that $u_i \geq u_j$ whenever $i \leq j$. By the well-foundedness of $\On$, there exists $i_0 \in \I$ such that $u_j = u_{i_0}$ for all $j \geq i_0$. For such $j$, the relation
$$u_{i_0} = u_j + \alpha_{i_0,j} = u_{i_0} + \alpha_{i_0,j}$$
forces $\alpha_{i_0,j} = 0$. Consequently,
$$u_{i_0} = \max \{ \alpha_{i_0,j} : j \geq i_0 \} = 0.$$
Define the mediating morphism to be the ordinal $\kappa \coloneqq \lambda_{i_0}$. We must show that $\lambda_i = \kappa + u_i$ for all $i \in \I$. Choose $j \in \I$ with $j \geq i$ and $j \geq i_0$. Since $j \geq i_0$, we have $u_j = 0$ and $\alpha_{i_0,j} = 0$. The cocone condition for $\lambda$ gives
$$\kappa = \lambda_{i_0} = \lambda_j + \alpha_{i_0,j} = \lambda_j.$$
Applying the cocone conditions for $u$ and $\lambda$ to $i \leq j$, we obtain
$$u_i = u_j + \alpha_{i,j} = 0 + \alpha_{i,j} = \alpha_{i,j}$$
and
$$\lambda_i = \lambda_j + \alpha_{i,j} = \kappa + \alpha_{i,j} = \kappa + u_i.$$
This proves the existence of the mediating morphism.

For uniqueness, suppose $\kappa'$ is any ordinal satisfying $\lambda_i = \kappa' + u_i$ for all $i \in \I$. Evaluating at $i_0$ yields
$$\lambda_{i_0} = \kappa' + u_{i_0} = \kappa' + 0 = \kappa',$$
hence $\kappa' = \kappa$. Therefore, the cocone $(u_i)_{i \in \I}$ is the colimit of $D$ in $B\On$.
<span class="qed">$\square$</span>
