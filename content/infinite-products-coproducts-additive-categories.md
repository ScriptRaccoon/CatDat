---
title: Infinite products and coproducts in additive categories
description: We prove that in an additive category, an infinite coproduct of copies of a non-zero object cannot be isomorphic to the corresponding infinite product.
---

# Infinite products and coproducts in additive categories

In a category with zero morphisms, there is a canonical morphism $\bigoplus_{i \in I} X_i \to \prod_{i \in I} X_i$ whenever the coproduct and product exist. In most categories, if $I$ is infinite and the objects $X_i$ are non-zero, this morphism is not an isomorphism. The following result generalizes this observation.

::: Proposition
Let $\C$ be an additive category with countable powers and countable copowers. Let $A \in \C$ be an object such that the canonical morphism
$$\textstyle \alpha : \bigoplus_{n \geq 1} A \to \prod_{n \geq 1} A$$
is an isomorphism. Then $A = 0$.
:::

::: Proof
Define the diagonal morphism
$$\textstyle \Delta : A \to \prod_{n \geq 1} A$$
by $p_n \circ \Delta = \id_A$, and the codiagonal morphism
$$\textstyle \nabla : \bigoplus_{n \geq 1} A \to A$$
by $\nabla \circ i_n = \id_A$ for all $n \geq 1$. Define the endomorphism $x \in \End(A)$ by
$$x \coloneqq \nabla \circ \alpha^{-1} \circ \Delta.$$

Using the decompositions
$$\textstyle \bigoplus_{n \geq 1} A \cong A \oplus \bigoplus_{n \geq 2} A,$$
$$\textstyle \prod_{n \geq 1} A \cong A \oplus \prod_{n \geq 2} A,$$
the morphisms $\alpha$, $\Delta$, and $\nabla$ have the following block matrix forms:

- $\alpha = \begin{pmatrix} \id_A & 0 \\ 0 & \alpha' \end{pmatrix}$, where $\alpha' : \bigoplus_{n \geq 2} A \to \prod_{n \geq 2} A$ is the canonical morphism.
- $\Delta = \begin{pmatrix} \id_A \\ \Delta' \end{pmatrix}$, where $\Delta' : A \to \prod_{n \geq 2} A$ is the diagonal morphism.
- $\nabla = \begin{pmatrix} \id_A & \nabla' \end{pmatrix}$, where $\nabla' : \bigoplus_{n \geq 2} A \to A$ is the codiagonal morphism.

Since $\alpha$ is an isomorphism, $\alpha'$ is an isomorphism as well. We compute:

$$
\begin{align*}
x & = \nabla \circ \alpha^{-1} \circ \Delta \\
& = \begin{pmatrix} \id_A & \nabla' \end{pmatrix} \circ \begin{pmatrix} \id_A & 0 \\ 0 & \alpha'^{-1} \end{pmatrix} \circ \begin{pmatrix} \id_A \\ \Delta' \end{pmatrix} \\
& = \begin{pmatrix} \id_A & \nabla' \end{pmatrix} \circ \begin{pmatrix} \id_A \\ \alpha'^{-1} \circ \Delta' \end{pmatrix} \\
& = {\id_A} \,+\, \nabla' \circ \alpha'^{-1} \circ \Delta'.
\end{align*}
$$

Now define the isomorphism
$$\textstyle \sigma : \bigoplus_{n \geq 1} A \to \bigoplus_{n \geq 2} A$$
by $\sigma \circ i_n = i_{n+1}$ for $n \geq 1$. Likewise, define the isomorphism
$$\textstyle \tau : \prod_{n \geq 1} A \to \prod_{n \geq 2} A$$
by $p_n \circ \tau = p_{n-1}$ for $n \geq 2$.

By the definitions of $\alpha'$, $\Delta'$, and $\nabla'$, we have

$$
\begin{align*}
\alpha' & = \tau \circ \alpha \circ \sigma^{-1}, \\
\Delta' & = \tau \circ \Delta, \\
\nabla' & = \nabla \circ \sigma^{-1}.
\end{align*}
$$

Therefore,

$$
\begin{align*}
\nabla' \circ \alpha'^{-1} \circ \Delta' & = \nabla \circ \sigma^{-1} \circ (\tau \circ \alpha \circ \sigma^{-1})^{-1} \circ \tau \circ \Delta \\
& = \nabla \circ \sigma^{-1} \circ \sigma \circ \alpha^{-1} \circ \tau^{-1} \circ \tau \circ \Delta \\
& = \nabla \circ \alpha^{-1} \circ \Delta \\
& = x.
\end{align*}
$$

Thus $x = \id_A + x$, and hence $\id_A = 0$. Therefore $A = 0$.
:::
