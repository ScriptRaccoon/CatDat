---
title: Relationships between epimorphisms and monomorphisms
description: A graphical overview of the relationships between the various types of epimorphisms and monomorphisms
---

## Relationships between epimorphisms and monomorphisms

There are several [properties of morphisms](/morphism-properties), including various types of epimorphisms and monomorphisms. The [implications](/morphism-implications) establish various relationships between these types. Here we present a graphical overview of these relationships.

### The various types of epimorphisms

In the diagram, an arrow $X \Longrightarrow Y$ means that every morphism with property $X$ also has property $Y$. If it is labelled with a category property $P$, the implication does not hold in general, but it holds in categories satisfying $P$. For example, in a category with pullbacks, every strict epimorphism is effective.

![Diagram showing the types of epimorphisms](/img/epis.webp)

<!--
\begin{tikzcd}[column sep=35pt, row sep=50pt, nodes={inner sep=10pt}]
& \text{isomorphism} \ar[Rightarrow]{dr} \ar[Rightarrow]{d} \ar[Rightarrow]{dl}[swap]{\text{zero morphisms\;}} & \\
\text{normal epimorphism} \ar[Rightarrow, shift left=1.25ex]{dr} &\text{split epimorphism} \ar[Rightarrow]{d} &  \text{effective epimorphism} \ar[Rightarrow]{dl} \\
& \text{regular epimorphism} \ar[Rightarrow,shift left=1.25ex]{ul}{\text{preadditive\;}} \ar[Rightarrow]{r} & \text{strict epimorphism} \ar[Rightarrow]{u}[swap]{\text{\;pullbacks}} \ar[Rightarrow]{d} \\
& \text{extremal epimorphism} \ar[Rightarrow]{u}{\text{regular\;}} \ar[Rightarrow,shift left=1.5ex]{d} \ar[Rightarrow, shift left=1ex]{r}{\text{pullbacks}} & \text{strong epimorphism} \ar[Rightarrow,shift left=1ex]{l} \\
& \text{epimorphism} \ar[Rightarrow]{ur}[swap]{\text{mono-regular}} \ar[Rightarrow, shift left=1.5ex]{u}{\text{balanced\;}} \ar[Rightarrow, bend left=45, shift left=8ex]{uu}{\text{epi-regular\;}} &
\end{tikzcd}
-->

Fun fact: This describes a category in itself: We define the composition of $P : X \Rightarrow Y$ and $Q : Y \Rightarrow Z$ as $P \wedge Q : X \Rightarrow Z$.

### The various types of monomorphisms

This diagram is just the dual of the previous diagram. The same notation applies.

![Diagram showing the types of monomorphisms](/img/monos.webp)

<!--
\begin{tikzcd}[column sep=35pt, row sep=50pt, nodes={inner sep=10pt}]
& \text{isomorphism} \ar[Rightarrow]{dr} \ar[Rightarrow]{d} \ar[Rightarrow]{dl}[swap]{\text{zero morphisms\;}} & \\
\text{normal monomorphism} \ar[Rightarrow, shift left=1.25ex]{dr} &\text{split monomorphism} \ar[Rightarrow]{d} &  \text{effective monomorphism} \ar[Rightarrow]{dl} \\
& \text{regular monomorphism} \ar[Rightarrow,shift left=1.25ex]{ul}{\text{preadditive\;}} \ar[Rightarrow]{r} & \text{strict monomorphism} \ar[Rightarrow]{u}[swap]{\text{\;pushouts}} \ar[Rightarrow]{d} \\
& \text{extremal monomorphism} \ar[Rightarrow]{u}{\text{coregular\;}} \ar[Rightarrow,shift left=1.5ex]{d} \ar[Rightarrow, shift left=1ex]{r}{\text{pushouts}} & \text{strong monomorphism} \ar[Rightarrow,shift left=1ex]{l} \\
& \text{monomorphism} \ar[Rightarrow]{ur}[swap]{\text{epi-regular}} \ar[Rightarrow, shift left=1.5ex]{u}{\text{balanced\;}} \ar[Rightarrow, bend left=45, shift left=8ex]{uu}{\text{mono-regular\;}} &
\end{tikzcd}
-->
