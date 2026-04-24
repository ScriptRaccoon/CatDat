INSERT INTO categories (
	id,
	name,
	notation,
	objects,
	morphisms,
	description,
	nlab_link,
	dual_category_id
)
VALUES
(
	'Set',
	'category of sets',
	'$\mathbf{Set}$',
	'sets',
	'maps',
	'The category of sets plays a fundamental role in category theory. Due to the Yoneda embedding, many results about general categories can be reduced to the category of sets. It is also usually the first example of a category that one encounters.',
	'https://ncatlab.org/nlab/show/Set',
	'Set_op'
),
(
	'SetxSet',
	'category of pairs of sets',
	'$\mathbf{Set} \times \mathbf{Set}$',
	'pairs $(A,B)$ of sets $A$ and $B$',
	'A morphism $(A,B) \to (C,D)$ consists of a map $A \to C$ and a map $B \to D$.',
	'This is an example of the <a href="https://ncatlab.org/nlab/show/product+category" target="_blank">product of categories</a>. It inherits most (but not all) properties from $\mathbf{Set}$. It can also be seen as the category $\mathbf{Sh}(1+1)$ of sheaves on a discrete space with two points, and also as the slice category $\mathbf{Set}/(1+1)$.',
	NULL,
	NULL
),
(
	'Set_op',
	'dual of the category of sets',
	'$\mathbf{Set}^{\mathrm{op}}$',
	'sets',
	'A morphism $f : X \to Y$ is a map of sets $Y \to X$.',
	'By definition, this category is the dual (or opposite) of <a href="/category/Set">the category of sets</a>.',
	'https://ncatlab.org/nlab/show/opposite+category',
	'Set'
),
(
	'Set*',
	'category of pointed sets',
	'$\mathbf{Set}_*$',
	'pointed sets',
	'pointed maps',
	'This is the category of sets with a distinguished element, often called the base point. A map is called pointed when it preserves the base point.',
	'https://ncatlab.org/nlab/show/pointed+set',
	NULL
),
(
	'Setne',
	'category of non-empty sets',
	'$\mathbf{Set}_{\neq \varnothing}$',
	'non-empty sets',
	'maps',
	'This entry demonstrates that removing an object (the empty set) can drastically change the properties of a category. In particular, this category is neither complete nor cocomplete.',
	'https://ncatlab.org/nlab/show/inhabited+set',
	NULL
),
(
	'Rel',
	'category of sets and relations',
	'$\mathbf{Rel}$',
	'sets',
	'A morphism from $A$ to $B$ is a relation, i.e. a subset of $A \times B$.',
	'This category is self-dual as it can be: There is an isomorphism $\mathbf{Rel} \cong \mathbf{Rel}^{\mathrm{op}}$ that is the identity on objects and maps a relation to its opposite relation. It is the prototype of a dagger-category.',
	'https://ncatlab.org/nlab/show/Rel',
	NULL
),
(
	'Set_c',
	'category of countable sets',
	'$\mathbf{Set}_\mathrm{c}$',
	'countable sets',
	'maps',
	'A set is countable if it admits a surjection from $\mathbb{N}$. In particular, every finite set is countable.',
	NULL,
	NULL
),
(
	'Set_f',
	'category of sets with finite-to-one maps',
	'$\mathbf{Set}_\mathrm{f}$',
	'sets',
	'maps $f : X \to Y$ with the property that for every $y \in Y$ the fiber $f^*(\{y\})$ is a finite set',
	'In this variant of $\mathbf{Set}$ we only consider maps with finite fibers, which are commonly called <i>finite-to-one</i>. Equivalently, every preimage of a finite set is again finite, and this description makes it obvious that composition is well-defined.',
	NULL,
	NULL
);