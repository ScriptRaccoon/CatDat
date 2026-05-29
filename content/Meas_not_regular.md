---
title: The category of measurable spaces is not regular
description: An example of a quotient measurable map is given whose product with itself is not a quotient map anymore.
author: Nekoma
---

## $\Meas$ is not regular

::: Claim
The category $\Meas$ of measurable spaces and measurable maps is not regular.
:::

_Proof._
In a regular category, regular epimorphisms are stable under pullbacks and compositions (see Prop. 3.7 at the [nLab](https://ncatlab.org/nlab/show/regular+epimorphism)), which implies that for every regular epimorphism $f : X \to Y$ also $f \times f : X \times X \to Y \times Y$ is a regular epimorphism. We will show that this fails in $\Meas$.

Let $X \coloneqq [0, 1)$ equipped with the standard Borel $\sigma$-algebra $\B$. Consider the equivalence relation $x \sim y \iff x-y \in \IQ$, let $Y \coloneqq X /{\sim}$ be the set of equivalence classes, and $f: X \to Y$ be the natural projection map. Equip $Y$ with the quotient $\sigma$-algebra $\Sigma_Y$, so that $f$ is a regular epimorphism.

Now consider the diagonal in the quotient space $\Delta_Y \coloneqq \{(y, y) \mid y \in Y\}$. Then
$$\textstyle (f \times f)^{-1}(\Delta_Y) = \{(x_1, x_2) \in [0, 1)^2 \mid x_1 - x_2  \in \IQ\} \eqqcolon \bigcup_{q \in \IQ} L_q$$
where each $L_q$ is the intersection of the diagonal level sets of $x_1 - x_2$ with $[0, 1)^2$. Because each line is closed in $\IR^2$, its intersection with $[0, 1)^2$ is a Borel set in $X \times X$. Since a countable union of Borel sets is Borel, $(f \times f)^{-1}(\Delta_Y) \in \B \otimes \B$.

Now take any set $B \in \Sigma_Y$. Its preimage $f^{-1}(B)$ is a Borel set in $[0, 1)$ that is invariant under rational translations modulo 1. Because the action of $\IQ / \IZ$ on $[0, 1)$ is ergodic, the Lebesgue measure $\lambda(f^{-1}(B))$ must be exactly $0$ or $1$. Assume for contradiction that $\Sigma_Y$ is countably separated, i.e. there exists a countable sequence of measurable sets $(B_n)_{n \geq 1}$ in $\Sigma_Y$ that separates the points of $Y$. Let $A_n \coloneqq f^{-1}(B_n)$. Every $A_n$ has $\lambda(A_n) = 0$ or $\lambda(A_n) = 1$.

Define a "bad set" $N \subseteq [0, 1)$ as
$$\textstyle N \coloneqq \left( \bigcup_{\lambda(A_n)=0} A_n \right) \cup \left( \bigcup_{\lambda(A_n)=1} A_n^c \right)$$
Because $N$ is a countable union of sets with measure $0$, we have $\lambda(N) = 0$, and thus $\lambda([0, 1) \setminus N)=1$. For any two points $x, y \in [0, 1) \setminus N$, clearly $x \in A_n \iff y \in A_n$ for every $n$. Consequently, the sequence $(B_n)$ fails to separate $f(x)$ and $f(y)$. Hence, $x \sim y$. Since $[0, 1) \setminus N$ has measure $1$, it is uncountable. Because each equivalence class is only countable, these uncountably many points must belong to uncountably many different equivalence classes. Thus, we can easily pick $x, y \in [0, 1) \setminus N$ where $x \not\sim y$. Thus $\Sigma_Y$ is not countably separated.

Hence by Theorem 6.5.7 in Bogachev's [Measure theory](https://link.springer.com/book/10.1007/978-3-540-34514-5) $\Delta_Y \notin \Sigma_Y \otimes \Sigma_Y$. We have identified a non-measurable subset of $Y \times Y$ whose preimage under $f \times f$ is measurable. Therefore, $f \times f$ is not a regular epimorphism. <span class="qed">$\square$</span>
