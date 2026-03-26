INSERT INTO properties (
	id,
	prefix,
	description,
	nlab_link,
	dual_property_id,
	invariant_under_equivalences
)
VALUES
(
	'locally finitely presentable',
	'is',
	'A category is <i>locally finitely presentable</i> if it is cocomplete and there is a set $S$ of finitely presentable objects such that every object is a filtered colimit of objects in $S$. This is the same as being locally $\aleph_0$-presentable.',
	'https://ncatlab.org/nlab/show/locally+finitely+presentable+category',
	NULL,
	TRUE
),
(
	'locally presentable',
	'is',
	'Let $\kappa$ be a regular cardinal. A category is <i>locally $\kappa$-presentable</i> if it is cocomplete and there is a set of $\kappa$-presentable objects $S$ such that every object is a $\kappa$-filtered colimit of objects in $S$. A category is <i>locally presentable</i> if it is locally $\kappa$-presentable for some regular cardinal $\kappa$.',
	'https://ncatlab.org/nlab/show/locally+presentable+category',
	NULL,
	TRUE
),
(
	'locally ℵ₁-presentable',
	'is',
	'This is the special case of the notion of a locally $\kappa$-presentable, where $\kappa = \aleph_1$ is the first uncountable cardinal.',
	'https://ncatlab.org/nlab/show/locally+presentable+category',
	NULL,
	TRUE
),
(
	'locally strongly finitely presentable',
	'is',
	'A category is a <i>locally strongly finitely presentable</i> if it is cocomplete and there is a set $G$ of strongly finitely presentable objects such that every object is a sifted colimit of objects from $G$.
	There are several equivalent conditions:
	<ul style="list-style-type: circle;">
		<li>It is equivalent to the category of models of a many-sorted finitary algebraic theory.</li>
		<li>It is equivalent to the category of finite-product-preserving functors to $\mathbf{Set}$ from a small category with finite products (=Lawvere theory).</li>
		<li>It is equivalent to the Eilenberg&ndash;Moore category of a finitary (=filtered-colimit-preserving) monad on $\mathbf{Set}^S$ for some set $S$.</li>
		<li>It is equivalent to the Eilenberg&ndash;Moore category of a sifted-colimit-preserving monad on $\mathbf{Set}^S$ for some set $S$. (cf. [<a href="https://doi.org/10.2168/LMCS-8(3:14)2012" target="_blank">KR12</a>, Proposition 3.3])</li>
	</ul>
	A category satisfying this property is simply called a <i>variety</i> (of algebras) by some authors, although one should be aware that this term is sometimes used only for the one-sorted case.',
	'https://ncatlab.org/nlab/show/locally+strongly+finitely+presentable+category',
	NULL,
	TRUE
);