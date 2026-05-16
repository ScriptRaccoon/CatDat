---
title: The walking parallel pair has sifted colimits
description: A proof of this fact is presented.
author: Yuto Kawase
---

## The walking parallel pair has sifted colimits

We will prove that the [walking parallel pair](/category/walking_pair) $\{u,v \colon 0 \rightrightarrows 1\}$ has [sifted colimits](/category-property/sifted_colimits).

Let $D \colon \C \to \{u,v \colon 0 \rightrightarrows 1\}$ be a functor from a sifted category. If the object $1$ is not contained in the image under $D$, the object $0$ gives a colimit of $D$ because the sifted category $\C$ is connected.
In what follows, we suppose that there is an object $c_0 \in \C$ such that $D(c_0)=1$.

We first claim that for every object $c \in \C$ such that $D(c)=0$, there is a morphism $f \colon c \to x$ with $D(x)=1$; moreover, which of $u$ and $v$ such a morphism is sent to by $D$ is independent of the choice of $f$.
The existence of $f$ is easy.
Indeed, since $\C$ is sifted, there is a cospan $c \rightarrow x \leftarrow c_0$, and $D(x)=1$ follows from $D(c_0)=1$.

To show the independence of the value of $D(f)$, suppose that there are morphisms $f \colon c \to x$ and $g \colon c \to y$ such that $D(f)=u$ and $D(g)=v$.
Since $\C$ is sifted, there is a cospan consisting of $p\colon x \rightarrow z$ and $q \colon z \leftarrow y$.
Since $\C$ is sifted again, two cospans $(p \circ f, q \circ g)$ and $(\id_c, \id_c)$ are connected to each other, that is, there are a zigzag consisting of

- $s_i \colon d_{i-1} \rightarrow e_i$,
- $t_i \colon e_i \leftarrow d_i$ $(1 \le i \le n)$, and
- parallel pairs $(l_i,r_i) \colon c \rightrightarrows d_i$ $(0 \le i \le n)$

such that

- $d_0=z$,
- $l_0=p \circ f$,
- $r_0=q \circ g$,
- $d_n=c$,
- $l_n=r_n=\id_c$,
- $s_i \circ l_{i-1} = t_i \circ l_i$, and
- $s_i \circ r_{i-1} = t_i \circ r_i$ $(1 \le i \le n)$.

@@@SVG:/img/diagram-sifted-colimit.svg@@@

Then, the equality $D(t_1) \circ D(l_1) = D(s_1) \circ D(l_0) = u$ implies that either $D(l_1)=u$ or $D(t_1)=u$ holds, while $D(t_1) \circ D(r_1) = D(s_1)\circ D(r_0) = v$ implies that either $D(r_1)=v$ or $D(t_1)=v$ holds.
However, the only possible combination is $D(l_1)=u$ together with $D(r_1)=v$, and by repeating this argument, we have $D(l_n)=u$ and $D(r_n)=v$, which is a contradiction.

By the claim, each object $c \in \C$ can be classified exclusively into the following three cases:

1. $D(c)=1$;
2. $D(c)=0$ and there is a morphism from itself sent to $u$ by $D$;
3. $D(c)=0$ and there is a morphism from itself sent to $v$ by $D$.

Now, we have a cocone $(\alpha_c \colon D(c) \to 1)_{c \in \C}$ under $D$ by letting $\alpha_c \coloneqq \id_1$ if $c$ is classified into the first case, $\alpha_c \coloneqq u$ for the second case, and $\alpha_c \coloneqq v$ for the third case.
Moreover, this is a unique cocone under $D$:
If $\beta$ is another cocone, its vertex should be $1$ by the existence of $c_0$.
If $c \in \C$ is classified into the first case, $\beta_c$ should be the identity.
For the second case, taking a morphism $f \colon c \to x$ such that $D(f)=u$, we can obtain $\beta_c = \beta_x \circ D(f) = D(f) = u$.
Similarly, we have $\beta_c = v$ for the third case.
This concludes $\beta = \alpha$, and since there is no non-trivial endomorphism on the vertex $1$, $\alpha$ gives a colimit.
