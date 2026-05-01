INSERT INTO category_properties (
	id,
	relation,
	description,
	nlab_link,
	dual_property_id,
	invariant_under_equivalences
)
VALUES
(
	'locally finitely presentable',
	'is',
	'A category is <i>locally finitely presentable</i> if it satisfies one of the following equivalent conditions:
	<ol>
		<li>It is finitely accessible and cocomplete.</li>
		<li>It is finitely accessible and complete.</li>
		<li>It is equivalent to the category of finite-limit-preserving functors to $\mathbf{Set}$ from a small category with finite limits.</li>
		<li>It is equivalent to the category of models of a small finite-limit sketch.</li>
	</ol>
	For equivalence of conditions above, see Cor. 2.47, Thm. 1.46, and Cor. 1.52 in <a href="https://ncatlab.org/nlab/show/Locally+Presentable+and+Accessible+Categories" target="_blank">Adamek-Rosicky</a>. This is the same as being locally $\aleph_0$-presentable.',
	'https://ncatlab.org/nlab/show/locally+finitely+presentable+category',
	NULL,
	TRUE
),
(
	'locally presentable',
	'is',
	'Let $\kappa$ be a regular cardinal. A category is <i>locally $\kappa$-presentable</i> if it satisfies one of the following equivalent conditions:
	<ol>
		<li>It is $\kappa$-accessible and cocomplete.</li>
		<li>It is $\kappa$-accessible and complete.</li>
		<li>It is equivalent to the category of $\kappa$-limit-preserving functors to $\mathbf{Set}$ from a small category with $\kappa$-limits.</li>
		<li>It is equivalent to the category of models of a small $\kappa$-limit sketch.</li>
	</ol>
	For equivalence of conditions above, see Cor. 2.47, Thm. 1.46, and Cor. 1.52 in <a href="https://ncatlab.org/nlab/show/Locally+Presentable+and+Accessible+Categories" target="_blank">Adamek-Rosicky</a>.
	A category is <i>locally presentable</i> if it is locally $\kappa$-presentable for some regular cardinal $\kappa$.',
	'https://ncatlab.org/nlab/show/locally+presentable+category',
	'locally copresentable',
	TRUE
),
(
	'locally copresentable',
	'is',
	'A category is <i>locally copresentable</i> if its opposite category is locally presentable.',
	NULL,
	'locally presentable',
	TRUE
),
(
	'locally ℵ₁-presentable',
	'is',
	'This is the special case of the notion of locally $\kappa$-presentable categories, where $\kappa = \aleph_1$ is the first uncountable cardinal.',
	'https://ncatlab.org/nlab/show/locally+presentable+category',
	NULL,
	TRUE
),
(
	'locally strongly finitely presentable',
	'is',
	'A category is <i>locally strongly finitely presentable</i> if it is cocomplete and there is a set $G$ of strongly finitely presentable objects such that every object is a sifted colimit of objects from $G$.
	There are several equivalent conditions:
	<ol>
		<li>It is equivalent to the category of models of a many-sorted finitary algebraic theory.</li>
		<li>It is equivalent to the category of finite-product-preserving functors to $\mathbf{Set}$ from a small category with finite products (=Lawvere theory).</li>
		<li>It is equivalent to the category of models of a small finite-product sketch.</li>
		<li>It is equivalent to the Eilenberg&ndash;Moore category of a finitary (=filtered-colimit-preserving) monad on $\mathbf{Set}^S$ for some set $S$.</li>
		<li>It is equivalent to the Eilenberg&ndash;Moore category of a sifted-colimit-preserving monad on $\mathbf{Set}^S$ for some set $S$. (cf. [<a href="https://doi.org/10.2168/LMCS-8(3:14)2012" target="_blank">KR12</a>, Proposition 3.3])</li>
	</ol>
	A category satisfying this property is simply called a <i>variety</i> (of algebras) by some authors, although one should be aware that this term is sometimes used only for the one-sorted case.',
	'https://ncatlab.org/nlab/show/locally+strongly+finitely+presentable+category',
	NULL,
	TRUE
),
(
	'accessible',
	'is',
	'Let $\kappa$ be a regular cardinal. A category is <i>$\kappa$-accessible</i> if it has $\kappa$-filtered colimits and there is a (small) set $G$ of $\kappa$-presentable objects such that every object is a $\kappa$-filtered colimit of objects in $G$. A category is <i>accessible</i> if it is $\kappa$-accessible for some regular cardinal $\kappa$.',
	'https://ncatlab.org/nlab/show/accessible+category',
	'coaccessible',
	TRUE
),
(
	'coaccessible',
	'is',
	'A category is <i>coaccessible</i> if its opposite category is accessible.',
	NULL,
	'accessible',
	TRUE
),
(
	'finitely accessible',
	'is',
	'A category is <i>finitely accessible</i> if it has filtered colimits and there is a (small) set $G$ of finitely presentable objects such that every object is a filtered colimit of objects in $G$.',
	'https://ncatlab.org/nlab/show/accessible+category',
	NULL,
	TRUE
),
(
	'ℵ₁-accessible',
	'is',
	'This is the special case of the notion of $\kappa$-accessible categories, where $\kappa = \aleph_1$ is the first uncountable cardinal.',
	'https://ncatlab.org/nlab/show/accessible+category',
	NULL,
	TRUE
),
(
	'generalized variety',
	'is a',
	'A category is a <i>generalized variety</i> if it has sifted colimits and there is a (small) set $G$ of strongly finitely presentable objects such that every object is a sifted colimit of objects from $G$. Generalized varieties are like locally strongly finitely presentable categories but without colimits. The relation is similar as between finitely accessible and locally finitely presentable categories. This notion is defined in <a href="http://www.tac.mta.ca/tac/volumes/8/n3/8-03abs.html" target="_blank">[AR01, Def. 3.6]</a>.',
	NULL,
	NULL,
	TRUE
),
(
	'multi-algebraic',
	'is',
	'A category is <i>multi-algebraic</i> if it satisfies one of the following equivalent conditions:
	<ol>
		<li>It is a multi-cocomplete generalized variety, that is, it has multi-colimits and sifted colimits of all small diagrams, and there is a (small) set $G$ of strongly finitely presentable objects such that every object is a sifted colimit of objects from $G$.</li>
		<li>It is equivalent to the category of models of a small (finite product, coproduct)-sketch, shortly small <i>FPC-sketch</i>.</li>
		<li>It is equivalent to the category of multi-finite-product-preserving functors to $\mathbf{Set}$ from a small category with multi-finite-products (<i>multi-algebraic theory</i>). Here, multi-finite-products means multi-limits of finite discrete diagrams.</li>
		<li>It is equivalent to the category of models of a small multi-finite-product sketch.</li>
	</ol>
	Multi-algebraic categories are like locally strongly finitely presentable categories but only with multi-colimits. The relation is similar as between locally finitely multi-presentable and locally finitely presentable categories.
	For equivalence of conditions above, see [<a href="https://doi.org/10.1016/S0022-4049(01)00015-9" target="_blank">AR01a</a>, Lem. 1] and [<a href="http://www.tac.mta.ca/tac/volumes/8/n3/8-03abs.html" target="_blank">AR01b</a>, Thm. 4.4].
	This notion was originally introduced by <a href="https://doi.org/10.1007/BF01224953" target="_blank">Diers</a>.',
	NULL,
	NULL,
	TRUE
),
(
	'locally multi-presentable',
	'is',
	'Let $\kappa$ be a regular cardinal. A category is <i>locally $\kappa$-multi-presentable</i> if it satisfies one of the following equivalent conditions:
	<ol>
		<li>It is $\kappa$-accessible and multi-cocomplete.</li>
		<li>It is $\kappa$-accessible and has connected limits.</li>
		<li>It is equivalent to the category of models of a small ($\kappa$-limit, coproduct)-sketch.</li>
	</ol>
	For equivalence of conditions above, see Thm. 4.30, Thm. 4.32, and the remark below in <a href="https://ncatlab.org/nlab/show/Locally+Presentable+and+Accessible+Categories" target="_blank">Adamek-Rosicky</a>. A category is <i>locally multi-presentable</i> if it is locally $\kappa$-multi-presentable for some $\kappa$.',
	'https://ncatlab.org/nlab/show/locally+multipresentable+category',
	NULL,
	TRUE
),
(
	'locally finitely multi-presentable',
	'is',
	'A category is <i>locally finitely multi-presentable</i> if it satisfies one of the following equivalent conditions:
	<ol>
		<li>It is finitely accessible and multi-cocomplete.</li>
		<li>It is finitely accessible and has connected limits.</li>
		<li>It is equivalent to the category of models of a small (finite limit, coproduct)-sketch.</li>
	</ol>
	For equivalence of conditions above, see Thm. 4.30, Thm. 4.32, and the remark below in <a href="https://ncatlab.org/nlab/show/Locally+Presentable+and+Accessible+Categories" target="_blank">Adamek-Rosicky</a>.',
	'https://ncatlab.org/nlab/show/locally+multipresentable+category',
	NULL,
	TRUE
),
(
	'locally poly-presentable',
	'is',
	'A category is <i>locally poly-presentable</i> if it is accessible and has wide pullbacks.',
	'https://ncatlab.org/nlab/show/locally+polypresentable+category',
	NULL,
	TRUE
);