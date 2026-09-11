---
title: Foundations
description: How to make sense of categories in set theory
---

# Foundations

In _CatDat_, we work with the following convenient set-theoretic foundation for category theory.

## Sets, collections, and hypercollections

We work with [ZFC](https://en.wikipedia.org/wiki/Zermelo%E2%80%93Fraenkel_set_theory) and two [Grothendieck universes](https://en.wikipedia.org/wiki/Grothendieck_universe), which we denote by
$$\SetColl \in \SetColl^+.$$
Thus, in principle everything is a set, but we rename them as follows to introduce three "levels of size":

- The sets in $\SetColl$ are renamed to _sets_ (sometimes also _small sets_).
- The sets in $\SetColl^+$ are renamed to _collections_ (sometimes also _large sets_).
- All available sets are renamed to _hypercollections_ (which may or may not lie in $\SetColl^+$).

For example, $\IR$ is a set, $\SetColl$ is a collection, and $\SetColl^+$ is a hypercollection. The collection $\SetColl$ consists of all sets, and the hypercollection $\SetColl^+$ consists of all collections. Every set is also a collection, and every collection is also a hypercollection. There is a collection $\GrpColl$ that consists of all groups, a collection $\TopColl$ of all topological spaces, etc.

Note that sets, collections, and hypercollections all satisfy the ZFC axioms. In this sense, (hyper)collections behave in the same way as sets. This is crucial for category theory. For example, we can form the collection of all maps between two collections. This basic property is not satisfied by [classes](<https://en.wikipedia.org/wiki/Class_(set_theory)>), which are not adequate for category theory.

For example, there is a collection $[\SetColl,\SetColl]$ that consists of all maps $\SetColl \to \SetColl$.

Just imagine three copies of ZFC embedded into each other, each representing a "level of size". Grothendieck universes are merely an implementation detail, which we can _and will_ drop from now on. Sets are on level 1, collections on level 2, and hypercollections on level 3. Concrete mathematical objects such as numbers or functions can be thought of as living on level 0 (even though they are usually modeled as sets in ZFC).

<img class="small" alt="visualization of three levels of size" src="/img/three-levels-of-size.webp" />

In our framework, there is no way to group all hypercollections into a single mathematical object; for this, one would need a third Grothendieck universe $\SetColl^{++}$, but such a grouping is usually not required.

## Essentially small, finite, and countable collections

Let us call a collection $X$ _essentially small_ if it is isomorphic to a set $S$, i.e., if there is a bijection between $X$ and $S$. (An alternative terminology suggested [here](https://ncatlab.org/nlab/show/small+category) is _structurally small_.) For most parts of category theory, $X$ can then simply be replaced with $S$ and assumed to be small itself, i.e., a set.

For example, the collection $\{\SetColl\}$ is not small, but essentially small, since it is isomorphic to the set $\{0\}$. This example shows that the three levels are not defined by cardinality alone. It also shows that the elements of a collection are not necessarily sets, which is yet another fundamental difference to classes.

If a collection $X$ admits a surjective map from a set $S$, then it is also essentially small, since by the axiom of choice $X$ is isomorphic to a subset of $S$.

A family of collections $(X_i)_{i \in I}$ is called _small_ when $I$ is a set. In this case, the collection of its elements $\{X_i : i \in I\}$ is essentially small. Every essentially small collection has this form.

A collection is called _finite_ if it is isomorphic to $\{1,\dotsc,n\}$ for some $n \in \IN$. In particular, every finite collection is essentially small. However, a finite collection is not necessarily small, as the example $\{\SetColl\}$ shows.

A collection is called _countable_ if it admits a surjective map from the set of natural numbers $\IN$. In particular, every finite collection is countable, and every countable collection is essentially small.

## Categories

A _category_ $\C$ consists of a pair of collections $O, M$, whose elements are called _objects_ and _morphisms_, respectively, together with maps

- $i : O \to M$ (_identity_),
- $s : M \to O$ (_source_ or _domain_),
- $t : M \to O$ (_target_ or _codomain_),
- $c : M \times_O M \to M$ (_composition_),

such that the usual [axioms of a category](<https://en.wikipedia.org/wiki/Category_(mathematics)>) are satisfied. The domain of $c$ consists of all pairs of morphisms $(f,g)$ with $s(f) = t(g)$, and we write $f \circ g \coloneqq c(f,g)$ for their composition. Instead of $i(X)$ one usually writes $\id_X$ for the identity morphism of $X$. Formally, a category is a tuple

$$\C = (O,M,i,s,t,c)$$

of collections (and hence a collection itself). We write $\Ob(\C) \coloneqq O$ and $\Mor(\C) \coloneqq M$. Instead of $X \in \Ob(\C)$, we often write $X \in \C$.

When $f \in \Mor(\C)$ is a morphism with $s(f) = X$ and $t(f) = Y$, we write
$$f : X \to Y.$$
We write $\Hom(X,Y)$ or $\Mor(X,Y)$ for the collection of such morphisms.

The collection $\Hom(X,Y)$ need not be a set. If it is a set for all $X,Y$, the category is called _locally small_. If $\Hom(X,Y)$ is essentially small (isomorphic to a set) for all $X,Y$, the category is called _locally essentially small_.

When a morphism $f : X \to Y$ happens to be uniquely determined, it will be written as $!_{X,Y}$ or even just $!$.

A _small category_ is defined as above, but using _sets_ $O$ and $M$ (instead of collections). A _hypercategory_ is defined similarly using _hypercollections_ $O$ and $M$. Every small category is a category, and every category is a hypercategory. Notice that there is a collection of all small categories $\CatColl$, and likewise a hypercollection of all categories $\CatColl^+$.

For example, the category of sets $\Set$ has $\Ob(\Set) = \SetColl$, the collection of all sets. The category of groups $\Grp$ has $\Ob(\Grp) = \GrpColl$, the collection of all groups. Other typical categories (topological spaces, graphs, metric spaces, etc.) are constructed as usual. All these examples are locally small.

Collections are the objects of a hypercategory $\Set^+$.

## Functors

A _functor_ $F : \C \to \D$ between two categories (or small categories, or hypercategories) is defined as usual; it consists of maps
$$\Ob(F) : \Ob(\C) \to \Ob(\D),$$
$$\Mor(F) : \Mor(\C) \to \Mor(\D)$$
satisfying the [functor axioms](https://en.wikipedia.org/wiki/Functor). Between two categories there is a collection of all functors, just as between two small categories there is a set of all functors.

Small categories and functors form the category $\Cat$ of small categories, which is locally small. There is also a hypercategory $\Cat^+$ consisting of all categories. For instance, $\Set$ is an object of $\Cat^+$, but not of $\Cat$.

If $F,G : \C \rightrightarrows \D$ are two functors, a morphism $F \to G$ (a _natural transformation_) is defined as a map $\Ob(\C) \to \Mor(\D)$ satisfying the usual naturality condition. These morphisms form a collection $\Hom(F,G)$.

If $\C, \D$ are categories, we can construct the functor category $[\C, \D]$ as usual. There is no set-theoretic issue, since collections behave like sets. If $\C$ is small and $\D$ is locally small, then $[\C, \D]$ is locally small. This extra assumption on $\C$ is one of many indications that categories should not be assumed locally small by default. For example, one could not even form the category of endofunctors of a general category under such a restriction, and hence no category of monads.

It is better to state explicitly when the assumption of being locally small is needed.

Equivalences of categories are defined [as usual](https://en.wikipedia.org/wiki/Equivalence_of_categories). A category is _essentially small_ if it is equivalent to a small category. A collection $X$ is essentially small if and only if the associated discrete category $X_{\disc}$ (which has only identity morphisms) is essentially small. In this sense, the two notions are compatible.

## Representable Functors

If $\C$ is any category and $A \in \C$, we have the Hom-functor

$$\Hom(A,-) : \C \to \Set^+$$

defined as usual, but taking values in the hypercategory of all collections. The Yoneda lemma and its corollaries can be proved without assuming that $\C$ is locally small. If $\C$ is locally small, then $\Hom(A,-)$ takes values in $\Set$.

Adjunctions are defined as usual via natural isomorphisms
$$\Hom(F(A),B) \cong \Hom(A,G(B))$$
of functors valued in $\Set^+$. No local smallness assumption is required. Equivalently, they can be defined via morphisms of functors $\id \to G \circ F$ and $F \circ G \to \id$ satisfying the triangle identities.

## Limits and Colimits

Let $\C$ be a category. If $D : \I \to \C$ is a functor (in this context called a _diagram_), a _cone_ over $D$ is an object $X \in \C$ equipped with morphisms $p_i : X \to D(i)$ for all $i \in \I$ such that for every morphism $i \to j$ the evident triangle commutes. Cones form a category, and a terminal object in this category is called a _limit_ of $D$. The dual notion is a _colimit_.

Unless stated otherwise, we consider only small diagrams and hence small limits and colimits, i.e. those where $\I$ is a small (or essentially small) category. This is because large limits rarely exist and it is cumbersome to specify "small" each time.

There are special types of limits, such as equalizers, products, and cofiltered limits, and their duals, such as coequalizers, coproducts, and filtered colimits. By convention, products and coproducts are indexed by a set, not a collection (unless stated otherwise). Filtered colimits are indexed by a small filtered category (unless stated otherwise).

## Conclusion

There is much more to say about set-theoretic foundations for category theory (in fact, many papers have been written on the subject, and the approach developed above is just _one_ of [many](https://xkcd.com/927/) approaches), but this suffices for the purposes of _CatDat_.
