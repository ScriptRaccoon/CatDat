---
title: Regular epimorphisms are coequalizers of their kernel pairs
description: A regular epimorphism that has a kernel pair is the coequalizer of that kernel pair.
---

# Regular epimorphisms are coequalizers of their kernel pairs

A regular epimorphism is the coequalizer of _some_ pair of morphisms. It turns out that, in many cases, a canonical pair is available.

::: Lemma
Let $f : X \to Y$ be a regular epimorphism in a category $\C$ that has a kernel pair $p_1,p_2 : X \times_Y X \rightrightarrows X$. Then $f$ is the coequalizer of $p_1,p_2$, i.e. $f$ is an [effective epimorphism](/morphism-property/effective_epimorphism).
:::

::: Proof
Say $f$ is the coequalizer of $a,b : A \rightrightarrows X$. Since $f \circ a = f \circ b$, there is a morphism $c : A \to X \times_Y X$ with $p_1 \circ c = a$ and $p_2 \circ c = b$. Now let $g : X \to T$ be a morphism with $g \circ p_1 = g \circ p_2$. Then
$$g \circ a = g \circ p_1 \circ c = g \circ p_2 \circ c = g \circ b,$$
so $g$ factors uniquely through $f$. Since also $f \circ p_1 = f \circ p_2$, this shows that $f$ is the coequalizer of $p_1,p_2$.
:::

**Remark.** The dual statement is that any regular monomorphism that has a cokernel pair is the equalizer of this cokernel pair, and hence an effective monomorphism.
