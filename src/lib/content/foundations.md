## Foundations

In _CatDat_, we work with the following convenient set-theoretic foundation for category theory.

### Sets, collections, and hypercollections

We work with [ZFC](https://en.wikipedia.org/wiki/Zermelo%E2%80%93Fraenkel_set_theory) and two [Grothendieck universes](https://en.wikipedia.org/wiki/Grothendieck_universe) which we name $\mathrm{Set} \in \mathrm{Set}^+$. So in principle everything is a set, but we will rename them as follows to introduce three "levels of size":

- The sets in $\mathrm{Set}$ are renamed to _sets_ (sometimes also _small sets_).
- The sets in $\mathrm{Set}^+$ are renamed to _collections_ (sometimes also called _large sets_).
- All available sets are renamed to _hypercollections_ (which may or may not lie in $\mathrm{Set}^+$).

For example, $\mathbb{R}$ is a set, $\mathrm{Set}$ is a collection, and $\mathrm{Set}^+$ is a hypercollection. The collection $\mathrm{Set}$ consists of all sets, and the hypercollection $\mathrm{Set}^+$ consists of all collections. Every set is also a collection, and every collection is also a hypercollection.

Note that sets, collections, and hypercollections all satisfy the ZFC axioms. In this sense, (hyper-)collections behave in the same way as sets. This is crucial for category theory. For example, we can form the collection of all maps between two collections. This basic property is not satisfied by [classes](<https://en.wikipedia.org/wiki/Class_(set_theory)>), which are not adequate for category theory.

Just imagine three copies of ZFC included into each other, each representing a "level of size". Grothendieck universes are just an implementation detail, which we can _and will_ drop from now on. Sets are on level 1, collections on level 2, and hypercollections on level 3. You can imagine concrete mathematical objects like numbers or functions as being on level 0 (even though they are usually modeled as sets in ZFC).

The levels are not defined by cardinality alone, though. For example, $\\{ \mathrm{Set} \\}$ is a collection which has just one element, but it is not a set (since otherwise $\mathrm{Set}$ would be a set). In particular, not every finite collection is a set. But of course, every finite collection is isomorphic to (has a bijection to) a set.

In our framework, we have no way to group all hypercollections into a single mathematical object; for this we would need a third Grothendieck universe $\mathrm{Set}^{++}$, but usually this grouping is not required anyway.

### Categories

A _category_ $\mathcal{C}$ has a pair of collections $O,M$, whose elements are called _objects_ resp. _morphisms_, as well as maps

- $i : O \to M$ (_identity_),
- $s : M \to O$ (_source_),
- $t : M \to O$ (_target_),
- $c : M \times_O M \to M$ (_composition_),

such that the usual [axioms of a category](<https://en.wikipedia.org/wiki/Category_(mathematics)>) are satisfied. The domain of $c$ consists of all pairs of morphisms $(f,g)$ with $s(f)=t(g)$, and we always write $f \circ g := c(f,g)$ for their composition. Instead of $i(X)$ one usually writes $\mathrm{id}_X$ for the identity morphism of $X$. Formally, a category is a tuple

$\mathcal{C} = (O,M,i,s,t,c)$

of collections (and hence a collection itself). We write $\mathrm{Ob}(\mathcal{C}) := O$ and $\mathrm{Mor}(\mathcal{C}) := M$. Instead of $X \in \mathrm{Ob}(\mathcal{C})$ we often write $X \in \mathcal{C}$.

When $f \in \mathrm{Mor}(\mathcal{C})$ is a morphism and $s(f) = X$, $t(f) = Y$, we write $f : X \to Y$. We write $\mathrm{Hom}(X,Y)$ or $\mathrm{Mor}(X,Y)$ for the collection of such morphisms with source $X$ and target $Y$. It is not necessarily a set. If this collection is a set for all $X,Y$, the category is called _locally small_.

A _small category_ is defined as above, just by using _sets_ $O$ and $M$ (instead of collections). A _hypercategory_ is also defined in the same way, but by using _hypercollections_ $O$ and $M$ (instead of collections). Every small category is also a category, and every category is also a hypercategory.

For example, the category of sets $\mathbf{Set}$ has the collection of objects $\mathrm{Ob}(\mathbf{Set}) = \mathrm{Set}$, containing all sets. The category of groups $\mathbf{Grp}$ uses the collection of all groups (aka small groups). Other typical categories (topological spaces, graphs, metric spaces, etc.) can be constructed as usual. All these examples are locally small. Collections are the objects of a hypercategory $\mathbf{Set}^+$.

### Functors

A _functor_ $F : \mathcal{C} \to \mathcal{D}$ between between two categories (or small categories, or hypercategories) is defined as in every textbook on category theory; it consists of two maps $\mathrm{Ob}(F) : \mathrm{Ob}(\mathcal{C}) \to \mathrm{Ob}(\mathcal{D})$ and $\mathrm{Mor}(F) : \mathrm{Mor}(\mathcal{C}) \to \mathrm{Mor}(\mathcal{D})$ satisfying the [functor axioms](https://en.wikipedia.org/wiki/Functor). Between two categories there is a collection of all functors, in the same way that between two small categories there is a set of all functors.

Small categories and functors form the category $\mathbf{Cat}$ of small categories, which is locally small. There is also a hypercategory $\mathbf{Cat}^+$ consisting of all categories. For instance, $\mathbf{Set}$ is an object of $\mathbf{Cat}^+$, but not of $\mathbf{Cat}$.

If $F,G : \mathcal{C} \rightrightarrows \mathcal{D}$ are two functors, a morphism $F \to G$ (or _natural transformation_) is defined as a map $\mathrm{Ob}(\mathcal{C}) \to \mathrm{Mor}(\mathcal{D})$ as usual satisfying the naturality condition. These morphisms form a collection $\mathrm{Hom}(F,G)$.

If $\mathcal{C}, \mathcal{D}$ are two categories, we can now construct the functor category $[\mathcal{C}, \mathcal{D}]$ as usual. There is simply no set-theoretic issue since collections behave just like sets. If $\mathcal{C}$ is small and $\mathcal{D}$ is locally small, then $[\mathcal{C}, \mathcal{D}]$ is locally small. This extra assumption on $\mathcal{C}$ is one of many indicators why categories should not be assumed to be locally small by default. We could not even talk about the category of endofunctors of a general category if everything needs to be locally small, so there would certainly be no category of monads.

It is better to explicitly say when we need the assumption of being locally small.

### Representable Functors

If $\mathcal{C}$ is any category and $A \in \mathcal{C}$ is an object, we have the Hom-functor

$\mathrm{Hom}(A,-) : \mathcal{C} \to \mathbf{Set}^+$

defined as usual, but notice that it takes values in the hypercategory of all collections. The Yoneda Lemma and all of its corollaries can be proven as usual without ever assuming that $\mathcal{C}$ is locally small. But if that happens to be the case, we get $\mathrm{Hom}(A,-) : \mathcal{C} \to \mathbf{Set}$, the target being a category.

We may define _adjunctions_ as usual: we require natural isomorphisms $\mathrm{Hom}(F(A),B) \cong \mathrm{Hom}(A,G(B))$ of functors valued in $\mathbf{Set}^+$. We do not need to assume the categories to be locally small. They can also be defined by morphisms of functors $\mathrm{id} \to G \circ F$ and $F \circ G \to \mathrm{id}$ satisfying the triangle identities.

### Limits and Colimits

Let $\mathcal{C}$ be a category. If $D : \mathcal{I} \to \mathcal{C}$ is a functor, also called a _diagram_ in this context, a _cone_ over $D$ is an object $X \in \mathcal{C}$ equipped with morphisms $p_i : X \to D(i)$ for all $i \in \mathcal{I}$ such that for every morphism $i \to j$ the evident triangle commutes. Cones form a category, and a terminal object in the category of cones is called a _limit_ of $D$. The dual notion is called a _colimit_.

Unless otherwise specified, we only consider small diagrams and hence also only small limits (and small colimits), i.e. where $\mathcal{I}$ is a small category (or merely essentially small, that does not make any difference). (This is because large limits almost never exist and it is tedious to write "small" everywhere.)

There are special types of limits, such as equalizers, products, cofiltered limits, and their dual notions, such as coequalizers, coproducts, and filtered colimits. By our convention, products and coproducts in a category are indexed by a set, not a collection (unless we say otherwise). Filtered colimits are indexed by a small filtered category (unless we say otherwise).

### Well-powered categories

If $A$ is an object of a category, the collection of all monomorphisms $B \to A$ does not need to be a set. But if (for every choice of $A$) there is a set of such monomorphisms such that every monomorphism $B \to A$ is isomorphic over $A$ to one in the set, then the category is called _well-powered_. The dual notion of being _well-copowered_ is defined in the same way by using epimorphisms $A \to B$. Every small category is well-powered, but there are many well-powered categories that are not small, not even equivalent to a small category.

### Conclusion

There is a lot more to say about the set-theoretic foundations of category theory (in fact, many papers have been written on the subject, and the approach developed above is just _one_ of [many](https://xkcd.com/927/) approaches), but this should be sufficient for the purposes of _CatDat_.
