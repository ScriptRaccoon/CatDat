---
title: Construction of a pushout of monomorphisms as a quotient of a congruence
description: An extensive category with quotients of congruences has pushouts of monomorphisms.
author: Daniel Schepler
---

## Construction of a pushout of monomorphisms as a quotient of a congruence

::: Lemma
Let $\C$ be an extensive category with quotients of congruences. Then $\C$ has pushouts of monomorphisms.
:::

_Proof._
Let $f : S \hookrightarrow X$, $g : S \hookrightarrow Y$ be monomorphisms. We construct a congruence on $X+Y$ via the maps $p_1, p_2 : X + Y + S + S \rightrightarrows X+Y$ which act as the identity on $X+Y$, $i_1 \circ f, i_2 \circ g$ on the first copy of $S$, and $i_2 \circ g, i_1 \circ f$ on the second copy of $S$, respectively. To show that $p_1, p_2$ are jointly monomorphic, and again in proving transitivity of the congruence, we use extensivity to split the domain of the generalized elements of $X+Y+S+S$ so that without loss of generality we may assume each factors through one of the coproduct inclusions. Now a quotient of the congruence must be a pushout of $f$ and $g$. <span class="qed">$\square$</span>
