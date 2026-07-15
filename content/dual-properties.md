---
title: Dual properties
description: A short explanation of what we mean by dual properties in CatDat.
---

## Dual properties

### Categories

Given a property $P$ of categories, its dual property $P^{\op}$ is defined as follows: a category $\C$ satisfies $P^{\op}$ if and only if its dual category $\C^{\op}$ satisfies $P$.

For example, since a category has an [initial object](/category-property/initial_object) if and only if its dual category has a [terminal object](/category-property/terminal_object), the property "has an initial object" is dual to the property "has a terminal object". In practice, dual properties can be obtained by reversing all arrows.

Notice that $(P^{\op})^{\op} = P$, and that $\C$ satisfies $P$ if and only if $\C^{\op}$ satisfies $P^{\op}$.

### Functors

Given a property $P$ of functors, its dual property $P^{\op}$ is defined as follows: a functor $F : \C \to \D$ satisfies $P^{\op}$ if and only if its dual functor $F^{\op} : \C^{\op} \to \D^{\op}$ satisfies $P$. Notice that taking the dual does not reverse the direction of the functor.

For example, since a functor is [essentially injective](/functor-property/essentially_injective) if and only if its dual is essentially injective, the property "is essentially injective" is self-dual. In particular, it is _not_ dual to the property "is [essentially surjective](/functor-property/essentially_surjective)", which is itself also self-dual.

Again, notice that $(P^{\op})^{\op} = P$, and that $F : \C \to \D$ satisfies $P$ if and only if $F^{\op} : \C^{\op} \to \D^{\op}$ satisfies $P^{\op}$.

### Morphisms

Given a property $P$ of morphisms, its dual property $P^{\op}$ is defined as follows: a morphism $f : X \to Y$ in a category $\C$ satisfies $P^{\op}$ if and only if its dual morphism $f^{\op} : Y \to X$ in the dual category $\C^{\op}$ satisfies $P$.

For example, the property [monomorphism](/morphism-property/monomorphism) is dual to [epimorphism](/morphism-property/epimorphism) since $f$ is an epimorphism if and only if $f^{\op}$ is a monomorphism.

Notice that $(P^{\op})^{\op} = P$, and that $f$ satisfies $P$ if and only if $f^{\op}$ satisfies $P^{\op}$.
