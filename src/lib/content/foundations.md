## Foundations

In _CatDat_, we work with the following convenient set-theoretic foundation for category theory.

### Sets, collections, and hypercollections

We work with [ZFC](https://en.wikipedia.org/wiki/Zermelo%E2%80%93Fraenkel_set_theory) and two [Grothendieck universes](https://en.wikipedia.org/wiki/Grothendieck_universe), which we denote by
$$\mathrm{Set} \in \mathrm{Set}^+.$$
Thus, in principle everything is a set, but we rename them as follows to introduce three "levels of size":

- The sets in $\mathrm{Set}$ are renamed to _sets_ (sometimes also _small sets_).
- The sets in $\mathrm{Set}^+$ are renamed to _collections_ (sometimes also _large sets_).
- All available sets are renamed to _hypercollections_ (which may or may not lie in $\mathrm{Set}^+$).

For example, $\mathbb{R}$ is a set, $\mathrm{Set}$ is a collection, and $\mathrm{Set}^+$ is a hypercollection. The collection $\mathrm{Set}$ consists of all sets, and the hypercollection $\mathrm{Set}^+$ consists of all collections. Every set is also a collection, and every collection is also a hypercollection. There is a collection $\mathrm{Grp}$ that consists of all groups, a collection $\mathrm{Top}$ of all topological spaces, etc.

Note that sets, collections, and hypercollections all satisfy the ZFC axioms. In this sense, (hyper)collections behave in the same way as sets. This is crucial for category theory. For example, we can form the collection of all maps between two collections. This basic property is not satisfied by [classes](<https://en.wikipedia.org/wiki/Class_(set_theory)>), which are not adequate for category theory.

For example, there is a collection $[\mathrm{Set},\mathrm{Set}]$ that consists of all maps $\mathrm{Set} \to \mathrm{Set}$.

Just imagine three copies of ZFC embedded into each other, each representing a "level of size". Grothendieck universes are merely an implementation detail, which we can _and will_ drop from now on. Sets are on level 1, collections on level 2, and hypercollections on level 3. Concrete mathematical objects such as numbers or functions can be thought of as living on level 0 (even though they are usually modeled as sets in ZFC).

![visualization of three levels of size](/img/three-levels-of-size.webp)

The levels are not defined by cardinality alone. For example, $\\{ \mathrm{Set} \\}$ is a collection with just one element, but it is not a set (since otherwise $\mathrm{Set}$ would be a set). In particular, not every finite collection is a set. However, every finite collection is isomorphic to a set.

In our framework, there is no way to group all hypercollections into a single mathematical object; for this, one would need a third Grothendieck universe $\mathrm{Set}^{++}$, but such a grouping is usually not required.

A family $(X_i)_{i \in I}$ of collections is called _small_ when its index collection is a set.

A collection is called _countable_ if it admits a surjective map from $\mathbb{N}$. In particular, every finite collection is countable.

### Categories

A _category_ $\mathcal{C}$ consists of a pair of collections $O, M$, whose elements are called _objects_ and _morphisms_, respectively, together with maps

- $i : O \to M$ (_identity_),
- $s : M \to O$ (_source_),
- $t : M \to O$ (_target_),
- $c : M \times_O M \to M$ (_composition_),

such that the usual [axioms of a category](<https://en.wikipedia.org/wiki/Category_(mathematics)>) are satisfied. The domain of $c$ consists of all pairs of morphisms $(f,g)$ with $s(f) = t(g)$, and we write $f \circ g := c(f,g)$ for their composition. Instead of $i(X)$ one usually writes $\mathrm{id}_X$ for the identity morphism of $X$. Formally, a category is a tuple

$$\mathcal{C} = (O,M,i,s,t,c)$$

of collections (and hence a collection itself). We write $\mathrm{Ob}(\mathcal{C}) := O$ and $\mathrm{Mor}(\mathcal{C}) := M$. Instead of $X \in \mathrm{Ob}(\mathcal{C})$, we often write $X \in \mathcal{C}$.

When $f \in \mathrm{Mor}(\mathcal{C})$ is a morphism with $s(f) = X$ and $t(f) = Y$, we write
$$f : X \to Y.$$
We write $\mathrm{Hom}(X,Y)$ or $\mathrm{Mor}(X,Y)$ for the collection of such morphisms. This collection need not be a set. If it is a set for all $X,Y$, the category is called _locally small_.

A _small category_ is defined as above, but using _sets_ $O$ and $M$ (instead of collections). A _hypercategory_ is defined similarly using _hypercollections_ $O$ and $M$. Every small category is a category, and every category is a hypercategory. Notice that there is a collection of all small categories $\mathrm{Cat}$, and likewise a hypercollection of all categories $\mathrm{Cat}^+$.

For example, the category of sets $\mathbf{Set}$ has $\mathrm{Ob}(\mathbf{Set}) = \mathrm{Set}$, the collection of all sets. The category of groups $\mathbf{Grp}$ has $\mathrm{Ob}(\mathbf{Grp}) = \mathrm{Grp}$, the collection of all groups. Other typical categories (topological spaces, graphs, metric spaces, etc.) are constructed as usual. All these examples are locally small.

Collections are the objects of a hypercategory $\mathbf{Set}^+$.

### Functors

A _functor_ $F : \mathcal{C} \to \mathcal{D}$ between two categories (or small categories, or hypercategories) is defined as usual; it consists of maps
$$\mathrm{Ob}(F) : \mathrm{Ob}(\mathcal{C}) \to \mathrm{Ob}(\mathcal{D}),$$
$$\mathrm{Mor}(F) : \mathrm{Mor}(\mathcal{C}) \to \mathrm{Mor}(\mathcal{D})$$
satisfying the [functor axioms](https://en.wikipedia.org/wiki/Functor). Between two categories there is a collection of all functors, just as between two small categories there is a set of all functors.

Small categories and functors form the category $\mathbf{Cat}$ of small categories, which is locally small. There is also a hypercategory $\mathbf{Cat}^+$ consisting of all categories. For instance, $\mathbf{Set}$ is an object of $\mathbf{Cat}^+$, but not of $\mathbf{Cat}$.

If $F,G : \mathcal{C} \rightrightarrows \mathcal{D}$ are two functors, a morphism $F \to G$ (a _natural transformation_) is defined as a map $\mathrm{Ob}(\mathcal{C}) \to \mathrm{Mor}(\mathcal{D})$ satisfying the usual naturality condition. These morphisms form a collection $\mathrm{Hom}(F,G)$.

If $\mathcal{C}, \mathcal{D}$ are categories, we can construct the functor category $[\mathcal{C}, \mathcal{D}]$ as usual. There is no set-theoretic issue, since collections behave like sets. If $\mathcal{C}$ is small and $\mathcal{D}$ is locally small, then $[\mathcal{C}, \mathcal{D}]$ is locally small. This extra assumption on $\mathcal{C}$ is one of many indications that categories should not be assumed locally small by default. For example, one could not even form the category of endofunctors of a general category under such a restriction, and hence no category of monads.

It is better to state explicitly when the assumption of being locally small is needed.

### Representable Functors

If $\mathcal{C}$ is any category and $A \in \mathcal{C}$, we have the Hom-functor

$$\mathrm{Hom}(A,-) : \mathcal{C} \to \mathbf{Set}^+$$

defined as usual, but taking values in the hypercategory of all collections. The Yoneda lemma and its corollaries can be proved without assuming that $\mathcal{C}$ is locally small. If $\mathcal{C}$ is locally small, then $\mathrm{Hom}(A,-)$ takes values in $\mathbf{Set}$.

Adjunctions are defined as usual via natural isomorphisms
$$\mathrm{Hom}(F(A),B) \cong \mathrm{Hom}(A,G(B))$$
of functors valued in $\mathbf{Set}^+$. No local smallness assumption is required. Equivalently, they can be defined via morphisms of functors $\mathrm{id} \to G \circ F$ and $F \circ G \to \mathrm{id}$ satisfying the triangle identities.

### Limits and Colimits

Let $\mathcal{C}$ be a category. If $D : \mathcal{I} \to \mathcal{C}$ is a functor (in this context called a _diagram_), a _cone_ over $D$ is an object $X \in \mathcal{C}$ equipped with morphisms $p_i : X \to D(i)$ for all $i \in \mathcal{I}$ such that for every morphism $i \to j$ the evident triangle commutes. Cones form a category, and a terminal object in this category is called a _limit_ of $D$. The dual notion is a _colimit_.

Unless stated otherwise, we consider only small diagrams and hence small limits and colimits, i.e. those where $\mathcal{I}$ is a small (or essentially small) category. This is because large limits rarely exist and it is cumbersome to specify "small" each time.

There are special types of limits, such as equalizers, products, and cofiltered limits, and their duals, such as coequalizers, coproducts, and filtered colimits. By convention, products and coproducts are indexed by a set, not a collection (unless stated otherwise). Filtered colimits are indexed by a small filtered category (unless stated otherwise).

### Well-powered categories

If $A$ is an object of a category, the collection of all monomorphisms $B \to A$ need not be a set. If, for every $A$, there exists a small family of such monomorphisms such that every monomorphism $B \to A$ is isomorphic over $A$ to one in the family, then the category is called _well-powered_. The dual notion of being _well-copowered_ is defined using epimorphisms $A \to B$. Every small category is well-powered, but there are many well-powered categories that are not small and not even equivalent to a small category.

### Conclusion

There is much more to say about set-theoretic foundations for category theory (in fact, many papers have been written on the subject, and the approach developed above is just _one_ of [many](https://xkcd.com/927/) approaches), but this suffices for the purposes of _CatDat_.
