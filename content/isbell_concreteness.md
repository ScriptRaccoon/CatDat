---
title: Isbell's condition for concretizability
description: We present a direct proof that concretizable categories satisfy the Isbell condition, which restricts the size of certain spans.
---

# Isbell's condition for concretizability

Here we reproduce a sufficient condition for [concretizability](/category-property/concretizable) due to Isbell [[I63]](#references). It was further investigated by Freyd [[F73]](#references).

Let $A,B$ be fixed objects of a category. We say that a span $A \leftarrow X \rightarrow B$ over $(A,B)$ _commutes_ with a cospan $A \rightarrow Y \leftarrow B$ if the diagram

$$
\begin{CD}
X @>>> A \\
@VVV @VVV \\
B @>>> Y
\end{CD}
$$

commutes. We say that two spans over $(A,B)$ are _equivalent_ if they commute with exactly the same cospans.

The _Isbell condition_ says that, for each pair of objects $A,B$, the collection of equivalence classes of spans over $(A,B)$ is isomorphic to a set. Equivalently, there must be a set of selected spans over $(A,B)$ such that every span over $(A,B)$ is equivalent to one of the selected spans.

::: Lemma
Every concretizable category satisfies the Isbell condition.
:::

::: Proof
Let $U : \C \to \Set$ be a faithful functor. A span
$$A \xleftarrow{a} X \xrightarrow{b} B$$
commutes with a cospan
$$A \xrightarrow{a'} Y \xleftarrow{b'} B$$
if and only if $a' \circ a = b' \circ b$. Since $U$ is faithful, this is equivalent to
$$U(a') \circ U(a) = U(b') \circ U(b).$$
Define $P_{a,b} \subseteq U(A) \times U(B)$ to be the set of pairs
$$(U(a)(x),U(b)(x))$$
for $x \in U(X)$. Then the span commutes with the cospan if and only if
$$U(a')(u) = U(b')(v)$$
for every $(u,v) \in P_{a,b}$. Thus, whether a span commutes with a given cospan depends only on the subset $P_{a,b}$.

Call a subset of $U(A) \times U(B)$ _realizable_ if it is of the form $P_{a,b}$ for some span $(a,b)$. Since $U(A) \times U(B)$ is a set, there is a set of realizable subsets. As we have just seen, the map that sends a realizable subset $P_{a,b}$ to the equivalence class of $(a,b)$ is well-defined, and it is clearly surjective. Hence, the collection of equivalence classes of spans over $(A,B)$ is isomorphic to a set.
:::

## References

[F73] P. J. Freyd, _Concreteness_, J. Pure Appl. Algebra **3** (1973), 171–191  
[I63] J. Isbell, _Two set-theoretical theorems in categories_, Fund. Math. **53** (1963), 43–49
