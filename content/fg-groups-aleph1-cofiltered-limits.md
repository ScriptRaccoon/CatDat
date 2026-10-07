---
title: Finitely generated groups are not closed under ℵ₁-cofiltered limits
description: We construct an ℵ₁-cofiltered diagram of finitely generated groups whose limit in the category of groups is uncountable.
---

# Finitely generated groups are not closed under $\aleph_1$-cofiltered limits

We construct a diagram $\Delta : \omega_1^{\op} \to \Grp$ in which every group is isomorphic to a fixed finitely generated group $G$, but whose limit is uncountable, and hence not finitely generated. Here, $\omega_1$ denotes the poset of countable ordinals.

Throughout, we fix a non-trivial finitely generated group $G$ with $G \cong G \times G$. Such a group has been constructed by J. M. Tyrer Jones in [Direct products and the Hopf property](https://doi.org/10.1017/S144678870001675X) (1974), Theorem B.

**Definition.** A _good pair_ $(p,s) : A \rightleftarrows B$ consists of two homomorphisms $p : A \to B$ and $s : B \to A$ such that

- $B$ and $\ker(p)$ are isomorphic to $G$,
- $p \circ s = \id_B$,
- the subgroups $s(B)$ and $\ker(p)$ of $A$ commute elementwise.

In this case, $A$ is the internal direct product of $s(B)$ and $\ker(p)$, which we indicate by writing $A = s(B) \times \ker(p)$. In particular, $A \cong B \times \ker(p) \cong G \times G \cong G$.

::: Lemma 1
Let $B$ be a group with $B \cong G$. Let $p : B \times G \to B$ be the projection defined by $p(b,g) \coloneqq b$ and $s : B \to B \times G$ be the inclusion defined by $s(b) \coloneqq (b,1)$. Then $(p,s) : B \times G \rightleftarrows B$ is a good pair.
:::

::: Proof
We have $\ker(p) = 1 \times G \cong G$. Clearly, $p \circ s = \id_B$, and $s(B) = B \times 1$ commutes with $1 \times G$.
:::

::: Lemma 2
Good pairs compose: If $(p,s) : A \rightleftarrows B$ and $(q,t) : B \rightleftarrows C$ are good pairs, then $(q \circ p, s \circ t) : A \rightleftarrows C$ is a good pair.
:::

::: Proof
We have $q \circ p \circ s \circ t = q \circ t = \id_C$.

Next, we compute the kernel of $q \circ p$. By the internal direct product decomposition $A = s(B) \times \ker(p)$, every $a \in A$ can be written uniquely as $a = s(b) k$ with $b \in B$ and $k \in \ker(p)$, namely $b = p(a)$. Then $q(p(a)) = q(b)$, so $a \in \ker(q \circ p)$ if and only if $b \in \ker(q)$. This shows $\ker(q \circ p) = s(\ker(q)) \cdot \ker(p)$. Since $s(\ker(q)) \subseteq s(B)$, the two factors commute elementwise and intersect trivially. Therefore,
$$\ker(q \circ p) \cong s(\ker(q)) \times \ker(p) \cong \ker(q) \times \ker(p) \cong G \times G \cong G.$$

Finally, we show that $s(t(C))$ commutes elementwise with $\ker(q \circ p) = s(\ker(q)) \cdot \ker(p)$. Since $t(C)$ commutes elementwise with $\ker(q)$, applying $s$ shows that $s(t(C))$ commutes elementwise with $s(\ker(q))$. And since $s(t(C)) \subseteq s(B)$, it commutes elementwise with $\ker(p)$.
:::

::: Lemma 3
Good pairs lift: Let $(\pi,\iota) : X \rightleftarrows B$ and $(p,s) : A \rightleftarrows B$ be good pairs. Then there is a good pair $(\pi',\iota') : X \rightleftarrows A$ with
$$p \circ \pi' = \pi, \qquad \iota' \circ s = \iota.$$
:::

::: Proof
Let $C \coloneqq \ker(\pi)$ and $K \coloneqq \ker(p)$. Since $A \cong G$ and $C \cong G$, we may choose an isomorphism $c : A \to C$. We have the internal direct product decompositions $A = s(B) \times K$ and $X = \iota(B) \times C$. Applying $c$ to the former, we get $C = c(K) \times c(s(B))$, and therefore
$$X = \iota(B) \times c(K) \times c(s(B))$$
as an internal direct product of three subgroups. That is, every element of $X$ can be written uniquely as $\iota(b) \, c(k) \, c(s(b'))$ with $b,b' \in B$ and $k \in K$. We define the homomorphisms $\iota' : A \to X$ and $\pi' : X \to A$ by
$$\iota'(s(b) k) \coloneqq \iota(b) \, c(k), \qquad \pi'\bigl(\iota(b) \, c(k) \, c(s(b'))\bigr) \coloneqq s(b) k.$$
They are well-defined homomorphisms, since they are defined factor by factor on internal direct products. We now verify the required properties.

- We have $\pi' \circ \iota' = \id_A$ by construction.
- We have $p\bigl(\pi'(\iota(b) \, c(k) \, c(s(b')))\bigr) = p(s(b) k) = b$. This equals $\pi\bigl(\iota(b) \, c(k) \, c(s(b'))\bigr)$, since $\pi \circ \iota = \id_B$ and $c(A) = C = \ker(\pi)$. Hence, $p \circ \pi' = \pi$.
- We have $\iota'(s(b)) = \iota(b)$, i.e. $\iota' \circ s = \iota$.
- The kernel of $\pi'$ is $c(s(B)) \cong B \cong G$.
- The image $\iota'(A) = \iota(B) \cdot c(K)$ commutes elementwise with $\ker(\pi') = c(s(B))$. Indeed, $\iota(B)$ commutes elementwise with $C$, and $c(K)$ commutes elementwise with $c(s(B))$ because $K$ commutes elementwise with $s(B)$.

:::

Next, we construct the diagram $\Delta : \omega_1^{\op} \to \Grp$.

::: Proposition 4
There are groups $\Delta_\beta \cong G$ for $\beta < \omega_1$ and homomorphisms $\pi_{\alpha\beta} : \Delta_\beta \to \Delta_\alpha$ and $\iota_{\alpha\beta} : \Delta_\alpha \to \Delta_\beta$ for $\alpha \leq \beta < \omega_1$ with the following properties:

1. We have $\pi_{\alpha\alpha} = \iota_{\alpha\alpha} = \id$, and for $\alpha \leq \beta \leq \gamma$ we have $\pi_{\alpha\beta} \circ \pi_{\beta\gamma} = \pi_{\alpha\gamma}$ and $\iota_{\beta\gamma} \circ \iota_{\alpha\beta} = \iota_{\alpha\gamma}$.
2. For $\alpha < \beta$, the pair $(\pi_{\alpha\beta},\iota_{\alpha\beta}) : \Delta_\beta \rightleftarrows \Delta_\alpha$ is good.

:::

::: Proof
We construct $\Delta_\beta$ and the homomorphisms $\pi_{\alpha\beta},\iota_{\alpha\beta}$ for $\alpha \leq \beta$ by transfinite recursion on $\beta$.

We start with $\Delta_0 \coloneqq G$ and $\pi_{00} \coloneqq \iota_{00} \coloneqq \id_G$.

For the successor step, let $\Delta_{\beta+1} \coloneqq \Delta_\beta \times G$, and let $(\pi_{\beta,\beta+1},\iota_{\beta,\beta+1})$ be the good pair from Lemma 1. For $\alpha < \beta$ we define
$$\pi_{\alpha,\beta+1} \coloneqq \pi_{\alpha\beta} \circ \pi_{\beta,\beta+1}, \qquad \iota_{\alpha,\beta+1} \coloneqq \iota_{\beta,\beta+1} \circ \iota_{\alpha\beta}.$$
Then (1) clearly holds, and (2) follows from Lemma 2.

For the limit step, let $\lambda < \omega_1$ be a limit ordinal. Since $\lambda$ is countable, we may choose a cofinal sequence $\alpha_0 < \alpha_1 < \cdots$ in $\lambda$. First, we define good pairs $(\pi_{\alpha_n\lambda},\iota_{\alpha_n\lambda}) : \Delta_\lambda \rightleftarrows \Delta_{\alpha_n}$ by recursion on $n$. Let $\Delta_\lambda \coloneqq \Delta_{\alpha_0} \times G$, and let $(\pi_{\alpha_0\lambda},\iota_{\alpha_0\lambda})$ be the good pair from Lemma 1. If $(\pi_{\alpha_n\lambda},\iota_{\alpha_n\lambda})$ has been defined, we apply Lemma 3 to this good pair and to the good pair $(\pi_{\alpha_n\alpha_{n+1}},\iota_{\alpha_n\alpha_{n+1}}) : \Delta_{\alpha_{n+1}} \rightleftarrows \Delta_{\alpha_n}$. This gives a good pair $(\pi_{\alpha_{n+1}\lambda},\iota_{\alpha_{n+1}\lambda}) : \Delta_\lambda \rightleftarrows \Delta_{\alpha_{n+1}}$ with
$$\pi_{\alpha_n\alpha_{n+1}} \circ \pi_{\alpha_{n+1}\lambda} = \pi_{\alpha_n\lambda}, \qquad \iota_{\alpha_{n+1}\lambda} \circ \iota_{\alpha_n\alpha_{n+1}} = \iota_{\alpha_n\lambda}.$$
By induction, using (1) below $\lambda$, we get
$$\pi_{\alpha_n\alpha_m} \circ \pi_{\alpha_m\lambda} = \pi_{\alpha_n\lambda}, \qquad \iota_{\alpha_m\lambda} \circ \iota_{\alpha_n\alpha_m} = \iota_{\alpha_n\lambda}$$
for all $n \leq m$.

Now, for an arbitrary $\alpha < \lambda$, choose some $n$ with $\alpha < \alpha_n$ and define
$$\pi_{\alpha\lambda} \coloneqq \pi_{\alpha\alpha_n} \circ \pi_{\alpha_n\lambda}, \qquad \iota_{\alpha\lambda} \coloneqq \iota_{\alpha_n\lambda} \circ \iota_{\alpha\alpha_n}.$$
Also, let $\pi_{\lambda\lambda} \coloneqq \iota_{\lambda\lambda} \coloneqq \id$. By the previous equations and (1) below $\lambda$, this definition does not depend on the choice of $n$, and it agrees with the previous definition when $\alpha = \alpha_m$. For (1), let $\alpha \leq \beta < \lambda$ and choose $n$ with $\beta < \alpha_n$. Then
$$\pi_{\alpha\beta} \circ \pi_{\beta\lambda} = \pi_{\alpha\beta} \circ \pi_{\beta\alpha_n} \circ \pi_{\alpha_n\lambda} = \pi_{\alpha\alpha_n} \circ \pi_{\alpha_n\lambda} = \pi_{\alpha\lambda},$$
and similarly $\iota_{\beta\lambda} \circ \iota_{\alpha\beta} = \iota_{\alpha\lambda}$. For (2), the pair $(\pi_{\alpha\lambda},\iota_{\alpha\lambda})$ is the composite of the good pairs $(\pi_{\alpha_n\lambda},\iota_{\alpha_n\lambda})$ and $(\pi_{\alpha\alpha_n},\iota_{\alpha\alpha_n})$ in the sense of Lemma 2, hence it is good.
:::

By (1), we obtain a diagram $\Delta : \omega_1^{\op} \to \Grp$ with $\alpha \mapsto \Delta_\alpha$ and $(\alpha \leq \beta) \mapsto \pi_{\alpha\beta}$. The homomorphisms $\iota_{\alpha\beta}$ are not part of the diagram; they are only used to produce elements of its limit.

::: Proposition 5
The limit of $\Delta$ in $\Grp$ is uncountable.
:::

::: Proof
The limit is the subgroup
$$\textstyle L \coloneqq \bigl\{x \in \prod_{\beta < \omega_1} \Delta_\beta : \pi_{\beta\gamma}(x_\gamma) = x_\beta \text{ for all } \beta \leq \gamma\bigr\}.$$
For $\alpha < \omega_1$ we define a homomorphism $j_\alpha : \Delta_\alpha \to \prod_{\beta < \omega_1} \Delta_\beta$ by
$$j_\alpha(x)_\beta \coloneqq \begin{cases} \iota_{\alpha\beta}(x) & \beta \geq \alpha, \\ \pi_{\beta\alpha}(x) & \beta \leq \alpha. \end{cases}$$
For $\beta = \alpha$, both cases give $x$, so this is well-defined. We claim that $j_\alpha$ maps into $L$, i.e. that for all $x \in \Delta_\alpha$ and $\beta \leq \gamma$ we have
$$\pi_{\beta\gamma}(j_\alpha(x)_\gamma) = j_\alpha(x)_\beta.$$
This follows from (1) and $\pi_{\alpha\beta} \circ \iota_{\alpha\beta} = \id$, distinguishing three cases:

$$
\begin{align*}
\pi_{\beta\gamma}(j_\alpha(x)_\gamma) & = \pi_{\beta\gamma}(\iota_{\alpha\gamma}(x)) = \pi_{\beta\gamma}(\iota_{\beta\gamma}(\iota_{\alpha\beta}(x))) = \iota_{\alpha\beta}(x) = j_\alpha(x)_\beta && \text{if } \alpha \leq \beta, \\
\pi_{\beta\gamma}(j_\alpha(x)_\gamma) & = \pi_{\beta\gamma}(\iota_{\alpha\gamma}(x)) = \pi_{\beta\alpha}(\pi_{\alpha\gamma}(\iota_{\alpha\gamma}(x))) = \pi_{\beta\alpha}(x) = j_\alpha(x)_\beta && \text{if } \beta \leq \alpha \leq \gamma, \\
\pi_{\beta\gamma}(j_\alpha(x)_\gamma) & = \pi_{\beta\gamma}(\pi_{\gamma\alpha}(x)) = \pi_{\beta\alpha}(x) = j_\alpha(x)_\beta && \text{if } \gamma \leq \alpha.
\end{align*}
$$

So we get a homomorphism $j_\alpha : \Delta_\alpha \to L$. A coordinatewise check of the same kind shows $j_\beta \circ \iota_{\alpha\beta} = j_\alpha$ for $\alpha \leq \beta$. Hence, the subgroups $L_\alpha \coloneqq j_\alpha(\Delta_\alpha)$ of $L$ satisfy
$$L_\alpha \subseteq L_\beta$$
for $\alpha \leq \beta$. Next, we show that $L_\alpha \neq L_{\alpha+1}$. Since $G$ is non-trivial and $\ker(\pi_{\alpha,\alpha+1}) \cong G$ by (2), there is some element $1 \neq k \in \ker(\pi_{\alpha,\alpha+1})$. Assume that $j_{\alpha+1}(k) = j_\alpha(x)$ for some $x \in \Delta_\alpha$. Comparing the $(\alpha+1)$-coordinates gives $k = \iota_{\alpha,\alpha+1}(x)$. Applying $\pi_{\alpha,\alpha+1}$ gives $1 = x$, and hence $k = 1$, a contradiction. Thus, $j_{\alpha+1}(k) \in L_{\alpha+1} \setminus L_\alpha$.

Now choose an element $y_\alpha \in L_{\alpha+1} \setminus L_\alpha$ for every $\alpha < \omega_1$. These elements are pairwise distinct: if $\alpha < \beta$, then $y_\alpha \in L_{\alpha+1} \subseteq L_\beta$, but $y_\beta \notin L_\beta$. Therefore, $L$ has at least $\aleph_1$ elements.
:::

::: Corollary 6
The full subcategory of finitely generated groups $\Grp_\fg \subseteq \Grp$ is not closed under $\aleph_1$-cofiltered limits.
:::

::: Proof
The diagram $\Delta : \omega_1^{\op} \to \Grp$ is $\aleph_1$-cofiltered, and each $\Delta_\alpha \cong G$ is finitely generated. But its limit is uncountable by Proposition 5, whereas every finitely generated group is countable.
:::
