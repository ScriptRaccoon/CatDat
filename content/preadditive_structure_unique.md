---
title: Uniqueness of preadditive structures
description: In the presence of finite products, a preadditive structure on a given category is uniquely determined.
---

# Uniqueness of preadditive structures

::: Lemma 1
Let $\C$ be a preadditive category (or more generally, a category enriched in commutative monoids) with finite products. Then finite coproducts exist as well.
:::

::: Proof
The terminal object $1$ is also an initial object, because for all objects $A$ there is the zero morphism $0_{1,A} : 1 \to A$, and it is uniquely determined because any morphism $f : 1 \to A$ satisfies
$$f = f \circ \id_1 = f \circ 0_{1,1} = 0_{1,A}.$$
It remains to construct binary coproducts. Actually, their underlying objects coincide with binary products. Let $A,B$ be objects. We define the morphism $i_1 : A \to A \times B$ by $p_1 \circ i_1 = \id_A$ and $p_2 \circ i_1 = 0_{A,B}$. Similarly, we define the morphism $i_2 : B \to A \times B$ by $p_1 \circ i_2 = 0_{B,A}$ and $p_2 \circ i_2 = \id_B$. We claim that
$$A \xrightarrow{i_1} A \times B \xleftarrow{i_2} B$$
is a binary coproduct. First, notice that
$$i_1 \circ p_1 + i_2 \circ p_2 = \id_{A \times B}$$
holds in $\End(A \times B)$. In fact, if we compose the left-hand side with $p_1$, we get
$$p_1 \circ i_1 \circ p_1 + p_1 \circ i_2 \circ p_2 = \id_A \circ p_1 + 0_{B,A} \circ p_2 = p_1,$$
and a similar calculation works for $p_2$. Now let $f : A \to T$ and $g : B \to T$ be morphisms. We want to show that there exists a unique $h : A \times B \to T$ with $h \circ i_1 = f$ and $h \circ i_2 = g$. To show uniqueness, notice that
$$h = h \circ (i_1 \circ p_1 + i_2 \circ p_2) = f \circ p_1 + g \circ p_2.$$
Conversely, if we define $h : A \times B \to T$ via $h \coloneqq f \circ p_1 + g \circ p_2$, then
$$h \circ i_1 = f \circ p_1 \circ i_1 + g \circ p_2 \circ i_1 = f \circ \id_A + g \circ 0_{A,B} = f,$$
and similarly $h \circ i_2 = g$.
:::

::: Lemma 2
Let $\C$ be a preadditive category (or more generally, a category enriched in commutative monoids) with finite products, hence with finite coproducts by Lemma 1. Then for all objects $X,Y$ the canonical morphism $\alpha : X \oplus Y \to X \times Y$ is an isomorphism. Moreover, the preadditive structure is <i>unique</i>: If $f,g : A \rightrightarrows B$ are morphisms, their sum
$$f+g : A \to B$$
is the composite of $(f,g) : A \to B \times B$, the inverse $\alpha^{-1} : B \times B \to B \oplus B$, and the codiagonal $\nabla : B \oplus B \to B$.
:::

::: Proof
In any category with zero morphisms, the morphism $\alpha : X \oplus Y \to X \times Y$ is defined by the equations
$$p_1 \circ \alpha \circ i_1 = \id_X, \quad p_2 \circ \alpha \circ i_2 = \id_Y,$$
$$p_2 \circ \alpha \circ i_1 = 0_{X,Y}, \quad p_1 \circ \alpha \circ i_2 = 0_{Y,X}.$$
It does not depend on the choice of preadditive structure since zero morphisms are unique. We now check that it is an isomorphism. (This is already contained in the proof of Lemma 1, since there we have constructed binary coproducts in such a way that $\alpha$ is even the identity, but we repeat the proof here, since we need the inverse morphism anyway.) Define
$$\beta \coloneqq i_1 \circ p_1 + i_2 \circ p_2 : X \times Y \to X \oplus Y.$$
Then $\alpha \circ \beta = \id_{X \times Y}$ because
$$p_1 \circ \alpha \circ \beta = p_1 \circ \alpha \circ i_1 \circ p_1 + p_1 \circ \alpha \circ i_2 \circ p_2 = \id_X \circ p_1 + 0_{Y,X} \circ p_2 = p_1$$
and likewise $p_2 \circ \alpha \circ \beta = p_2$. We also have $\beta \circ \alpha = \id_{X \oplus Y}$ with a very similar calculation that shows $\beta \circ \alpha \circ i_1 = i_1$ and $\beta \circ \alpha \circ i_2 = i_2$. Therefore, for morphisms $f,g : A \rightrightarrows B$ the composite $A \to B$ in the claim is equal to

$$
\begin{align*}
\nabla \circ \beta \circ (f,g) & = \nabla \circ (i_1 \circ p_1 + i_2 \circ p_2) \circ (f,g) \\
& = \nabla \circ i_1 \circ p_1 \circ (f,g) + \nabla \circ i_2 \circ p_2 \circ (f,g) \\
& = p_1 \circ (f,g) + p_2 \circ (f,g) \\
& = f + g.
\end{align*}
$$

:::
