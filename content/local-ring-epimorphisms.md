---
title: Epimorphisms of local commutative rings
description: The codomain of an epimorphism in the category of local commutative rings is not much larger than its domain. This is used to prove that the category of locally ringed spaces is well-powered.
---

# Epimorphisms of local commutative rings

We consider the category of local commutative rings and local homomorphisms.

::: Lemma
Let $\varphi : A \to B$ be a local homomorphism of local commutative rings which is an epimorphism in the category of local commutative rings and local homomorphisms. Then $|B| \leq \max(|A|,\aleph_0)$.
:::

::: Proof
The homomorphism $\varphi$ factors as a surjective homomorphism $A \to \varphi(A)$ followed by the inclusion $\varphi(A) \hookrightarrow B$. The ring $\varphi(A)$ is local since it is a non-zero quotient ring of $A$. The inclusion $\varphi(A) \hookrightarrow B$ is a local homomorphism and an epimorphism in the category of local commutative rings and local homomorphisms, and $|\varphi(A)| \leq |A|$. Hence, we may assume that $A$ is a subring of $B$ and that $\varphi$ is the inclusion.

A _system_ over $A$ in the variables $Y_1,\dotsc,Y_n$ consists of finitely many polynomials $p_1,\dotsc,p_k \in A[Y_1,\dotsc,Y_n]$ and a subset $J \subseteq \{1,\dotsc,n\}$. A _solution_ of the system is a tuple $(c_1,\dotsc,c_n) \in B^n$ with $p_i(c_1,\dotsc,c_n) = 0$ for all $i$ and $c_j \in \m_B$ for all $j \in J$. We say that the system _determines_ $b \in B$ if it has a solution and every solution $(c_1,\dotsc,c_n)$ satisfies $c_1 = b$. Every system determines at most one element, and there are at most $\max(|A|,\aleph_0)$ systems over $A$. Hence, it suffices to prove that every $b \in B$ is determined by some system over $A$.

Assume that $b \in B$ is not determined by any system over $A$. Let $\F$ be the set of finite subsets of $B$ containing $b$. For $F \in \F$ we consider the system $\Sigma_F$ over $A$ in the variables $Y_x$ for $x \in F$, enumerated such that $Y_b$ is the first variable, which consists of the polynomials

- $Y_x + Y_{x'} - Y_{x''}$ for $x,x',x'' \in F$ with $x + x' = x''$,
- $Y_x Y_{x'} - Y_{x''}$ for $x,x',x'' \in F$ with $x x' = x''$,
- $Y_a - a$ for $a \in F \cap A$,

and the subset $F \cap \m_B \subseteq F$. The tuple $(x)_{x \in F}$ is a solution of $\Sigma_F$. Since $\Sigma_F$ does not determine $b$, it has another solution $(g_F(x))_{x \in F}$ with $g_F(b) \neq b$. We extend $g_F$ to a map $g_F : B \to B$ by $g_F(x) \coloneqq 0$ for $x \notin F$.

For a finite subset $E \subseteq B$ let $\F_{\supseteq E} \coloneqq \{F \in \F : E \subseteq F\}$. These sets are non-empty since $E \cup \{b\} \in \F_{\supseteq E}$, and they satisfy $\F_{\supseteq E} \cap \F_{\supseteq E'} = \F_{\supseteq E \cup E'}$. Hence, they have the finite intersection property, so that there is an ultrafilter $\U$ on $\F$ containing all of them. Let $T \coloneqq B^\F / \U$ be the ultrapower, i.e. the quotient of the ring $B^\F$ by the ideal of all families $(t_F)_{F \in \F}$ with $\{F \in \F : t_F = 0\} \in \U$. We write $[t_F]$ for the class of $(t_F)_{F \in \F}$. Then $T$ is a local commutative ring whose maximal ideal $\m_T$ consists of the classes $[t_F]$ with $\{F \in \F : t_F \in \m_B\} \in \U$. Indeed, these classes form an ideal not containing $1$, and every other class $[t_F]$ has $t_F \in B^\times$ for all $F$ in a set $M \in \U$, so that it is invertible with inverse $[u_F]$, where $u_F \coloneqq t_F^{-1}$ for $F \in M$ and $u_F \coloneqq 0$ otherwise. (Alternatively, this follows from [Łoś's theorem](https://en.wikipedia.org/wiki/Ultraproduct#%C5%81o%C5%9B's_theorem).)

We define two maps $\delta, g : B \to T$ by $\delta(x) \coloneqq [x]$ and $g(x) \coloneqq [g_F(x)]$. The map $\delta$ is a local homomorphism since $x \in \m_B$ implies $[x] \in \m_T$. For $x,x' \in B$ and all $F \in \F_{\supseteq \{x,x',x+x',xx'\}}$ we have
$$g_F(x + x') = g_F(x) + g_F(x'), \quad g_F(x x') = g_F(x) \, g_F(x'),$$
and for $a \in A$ and all $F \in \F_{\supseteq \{a\}}$ we have $g_F(a) = a$. Since $1 \in A$, this shows that $g$ is a ring homomorphism with $g(a) = \delta(a)$ for all $a \in A$. Moreover, $g$ is local since $g_F(x) \in \m_B$ for $x \in \m_B$ and all $F \in \F_{\supseteq \{x\}}$. Since the inclusion $A \hookrightarrow B$ is an epimorphism, we get $\delta = g$. But $g_F(b) \neq b$ for all $F \in \F$, so that $g(b) \neq \delta(b)$, a contradiction.
:::
