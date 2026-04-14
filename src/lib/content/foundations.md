## Foundations

In _CatDat_, we work with the following convenient set-theoretic foundation for category theory.

We work with ZFC and two Grothendieck universes $U \in U^+$. So in principle everything is a set, but we will rename them as follows to introduce three levels of size: the sets in $U$ are renamed to _sets_ (sometimes for clarity: _small sets_), the sets in $U^+$ are renamed to _collections_ (sometimes also called _large sets_), and all sets are renamed to _hypercollections_ (which may or may not lie in $U^+$).

For example, $\mathbb{R}$ is a set, $U$ is a collection, and $U^+$ is a hypercollection. The collection $U$ consists of all sets, and the hypercollection $U^+$ consists of all collections. Every set is also a collection, and every collection is also a hypercollection.

Note that sets, collections, and hypercollections all satisfy the ZFC axioms. In this sense, (hyper-)collections behave in the same way as sets. This is crucial for category theory. For example, we can form the collection of all maps between two collections. Just imagine three levels of ZFC on top of each other. Grothendieck universes are just an implementation detail, which we can _and will_ drop from now on. Sets are on level 1, collections on level 2, and hypercollections on level 3. You can imagine concrete mathematical objects like numbers or functions as being on level 0 (even though they are usually modeled as sets in ZFC).

A _category_ $\mathcal{C}$ is defined as a pair of collections $O,M$, whose elements are called _objects_ resp. _morphisms_, together with maps $i : O \to M$ (_identity_), $s : M \to O$ (_source_), $t : M \to O$ (_target_) as well as $c : M \times_O M \to M$ (_composition_), and the usual category axioms need to be satisfied. The domain of $c$ consists of all pairs of morphisms $(f,g)$ with $s(f)=t(g)$, and we always write $f \circ g := c(f,g)$ for their composition. Instead of $i(X)$ one usually writes $\mathrm{id}_X$ for the identity morphism of $X$.

When $X \in O$ is an object, it is common to write $X \in \mathcal{C}$. When $f \in M$ is a morphism and $s(f) = X$, $t(f) = Y$, we write $f : X \to Y$. We write $\mathrm{Hom}(X,Y)$ for the collection of such morphisms with source $X$ and target $Y$. It is not necessarily a set. If this collection is a set for all $X,Y$, the category is called _locally small_.

A _small category_ is defined as above, just by using _sets_ $O$ and $M$ (instead of collections). A _hypercategory_ is also defined in the same way, but by using _hypercollections_ $O$ and $M$ (instead of collections). Every small category is also a category, and every category is also a hypercategory.

Functors $\mathcal{C} \to \mathcal{C}'$ between all types of categories are defined as in every textbook on category theory; they are given by two maps $O \to O'$, $M \to M'$, etc. Between two categories there is a collection of all functors, in the same way that between two small categories there is a set of all functors.

The category of sets $\mathbf{Set}$ is defined by using the collection of all sets as objects (aka small sets). The category of groups $\mathbf{Grp}$ uses the collection of all groups (aka small groups). We can also construct the category $\mathbf{Cat}$ of small categories, etc. All these are locally small.

If $\mathcal{C}, \mathcal{D}$ are two categories, we can construct the functor category $[\mathcal{C}, \mathcal{D}]$ as usual (there is simply no set-theoretic issue since collections behave just like sets). If $\mathcal{C}$ is small and $\mathcal{D}$ is locally small, then $[\mathcal{C}, \mathcal{D}]$ is locally small. This extra assumption on $\mathcal{C}$ is one of many indicators why categories should not be assumed to be locally small by default. We could not even talk about the category of endofunctors of a general locally small category, so there would certainly be no category of monads. It is better to explicitly say when we need the assumption of being locally small.

The collections form a hypercategory $\mathbf{Set}^+$. Likewise, we have a hypercategory $\mathbf{Cat}^+$ consisting of all categories. For instance, $\mathbf{Set}$ is an object of $\mathbf{Cat}^+$, but not of $\mathbf{Cat}$. In our framework, we have no way to group all hypercollections (or even all hypercategories) into a single mathematical object; for this we would need a third Grothendieck universe, but usually this grouping is not required anyway.

If $\mathcal{C}$ is any category and $A \in \mathcal{C}$ is an object, we have the Hom-functor $\mathrm{Hom}(A,-) : \mathcal{C} \to \mathbf{Set}^+$ defined as usual, but notice that it takes values in the hypercategory of all collections. The Yoneda Lemma and all of its corollaries can be proven as usual without ever assuming that $\mathcal{C}$ is locally small. But if that happens to be the case, we get $\mathrm{Hom}(A,-) : \mathcal{C} \to \mathbf{Set}$, the target being a category.

We may define _adjunctions_ as usual: we require natural isomorphisms $\mathrm{Hom}(F(A),B) \cong \mathrm{Hom}(A,G(B))$ of functors valued in $\mathbf{Set}^+$. We do not need to assume the categories to be locally small.

If $A$ is an object, the collection of all monomorphisms $B \to A$ does not need to be a set. But if (for every choice of $A$) there is a set of such monomorphisms such that every monomorphism $B \to A$ is isomorphic over $A$ to one in the set, then the category is called _well-powered_. The dual notion of being _well-copowered_ is defined in the same way by using epimorphisms $A \to B$. Every small category is well-powered, but there are many well-powered categories that are not small.

There is a lot more to say about the set-theoretic foundations of category theory (in fact, many papers have been written on the subject, and the approach developed above is just _one_ of [many](https://xkcd.com/927/) approaches), but this should be sufficient for the purposes of _CatDat_.
