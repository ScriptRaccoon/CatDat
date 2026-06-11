---
title: Quasitopoi of Separated Objects
description: Some results concerning the full subcategory of separated objects for a Lawvere-Tierney topology on a topos
author: Daniel Schepler
---

## Results Concerning Quasitopoi of Separated Objects

### Special Morphisms

::: Lemma 1
Let $\T$ be an elementary topos with a <a href="https://ncatlab.org/nlab/show/Lawvere-Tierney+topology" target="_blank">Lawvere-Tierney topology</a> $j$. Then in the full subcategory $\Sep(j)$ of $j$-separated objects:<br>
(a) The monomorphisms are the morphisms whose image in $\T$ are monomorphisms.<br>
(b) The epimorphisms are the morphisms whose image in $\T$ are $j$-dominant (i.e. the image calculated in $\T$ is a $j$-dense subobject of the codomain).<br>
(c) The regular monomorphisms are the morphisms whose image in $\T$ are $j$-closed monomorphisms.<br>
(d) The regular epimorphisms are the morphisms whose image in $\T$ are epimorphisms.
:::

_Proof._ Recall that $\Sep(j)$ is a reflective subcategory of $\T$, where the reflector takes an object $X$ to the quotient $X_{\sep}$ of $X$ by the congruence defined by the $j$-closure of the diagonal in $X\times X$. Also recall that the equalizer of $j, \id : \Omega_\T \rightrightarrows \Omega_\T$ is a $j$-separated object $\Omega_j$ which serves as the regular subobject classifier in $\Sep(j)$, and since $j$ is idempotent, this can also be described as the image (in $\T$) of $j$.<br>
(a) ($\Rightarrow$) This follows from the fact that $\Sep(j)$ is a reflective subcategory of $\T$. ($\Leftarrow$) This is trivial for any subcategory.<br>
(b) ($\Rightarrow$) Given a morphism $f : X \to Y$, form the image $\im(f)$ in $\T$, which corresponds to a morphism $\chi_{\im(f)} : Y \to \Omega_\T$. Then $j \circ \chi_{\im(f)} \circ f = j\circ \top_X = \top_X = \top_Y \circ f$ as morphisms $Y \to \Omega_j$, so if $f$ is an epimorphism in $\Sep(j)$, then we conclude $j \circ \chi_{\im(f)} = \top_Y$. However, $j \circ \chi_{\im(f)} : Y \to \Omega_j \hookrightarrow \Omega$ is the characteristic morphism of the $j$-closure of $\im(f)$, so we conclude that $j$-closure is all of $Y$. ($\Leftarrow$) Given a morphism $f : X \to Y$ of $j$-separated objects whose image in $\T$ is $j$-dense, suppose we have two morphisms $g, h : Y \rightrightarrows Z$ with $g \circ f = h \circ f$. Then since $Z$ is $j$-separated, the equalizer of $g$ and $h$ is $j$-closed; it also contains the image of $f$ and thus is $j$-dense. We conclude that the equalizer is all of $Y$.<br>
(c) ($\Rightarrow$) Any equalizer in $\T$ of $f, g : X \rightrightarrows Y$ with $Y$ $j$-separated is a $j$-closed subobject of $X$. If $X$ is $j$-separated as well, then that equalizer subobject is automatically separated, and agrees with the equalizer in $\Sep(j)$. ($\Leftarrow$) For a $j$-closed subobject $f : X \hookrightarrow Y$, we see that the characteristic morphism in $\T$, $\chi_X : Y \to \Omega_\T$, factors through $\Omega_j$. Now $X$ is the equalizer of $\chi_X, \top : Y \rightrightarrows \Omega_j$.<br>
(d) ($\Rightarrow$) We can calculate the coequalizer of $f, g : X \rightrightarrows Y$ in $\Sep(j)$ by taking the coequalizer $Z$ in $\T$ and then applying the reflector to get $Z_{sep}$. We see that both $Y \to Z$ and $Z \to Z_{sep}$ are epimorphisms in $\T$. ($\Leftarrow$) Suppose $f : X \to Y$ is an epimorphism in $\T$ of $j$-separated objects. Then the subcategory inclusion functor preserves the kernel pair $X \times_Y X \rightrightarrows X$, and since $f$ is a regular epimorphism in $\T$, this kernel pair has coequalizer $f : X \to Y$ in $\T$. Since $Y$ was already $j$-separated, the kernel pair also has coequalizer $f : X \to Y$ in $\Sep(j)$. <span class="qed">$\square$</span>
