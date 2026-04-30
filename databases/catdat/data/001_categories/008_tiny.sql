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
	'0',
	'empty category',
	'$\mathbf{0}$',
	'no objects',
	'no morphisms',
	'This is the category with no objects and no morphisms. It is the initial object in the category of small categories.',
	'https://ncatlab.org/nlab/show/empty+category',
	NULL
),
(
	'1',
	'trivial category',
	'$\mathbf{1}$',
	'a single object $0$',
	'only the identity morphism',
	'This is the simplest category, consisting of a single object $0$ and its identity morphism $0 \to 0$. A concrete representation is the full subcategory of $\mathbf{Set}$ consisting of the empty set. It is the terminal object in the category of small categories.',
	'https://ncatlab.org/nlab/show/terminal+category',
	NULL
),
(
	'2',
	'discrete category on two objects',
	'$\mathbf{2}$',
	'two objects $0$ and $1$',
	'only the two identity morphisms',
	'A concrete representation is the full subcategory of $\mathbf{CRing}$ consisting of the two fields $\mathbb{F}_2$ and $\mathbb{F}_3$.',
	NULL,
	NULL
),
(
	'walking_morphism',
	'walking morphism',
	'$\{0 \to 1\}$',
	'$0$, $1$',
	'the two identities and a single morphism from $0$ to $1$',
	'This is also known as the interval category. It has the property that functors $\{0 \to 1\} \to \mathcal{C}$ are the same as morphisms in $\mathcal{C}$.',
	'https://ncatlab.org/nlab/show/interval+category',
	NULL
),
(
	'walking_pair',
	'walking parallel pair',
	'$\{0 \rightrightarrows 1 \}$',
	'two objects $0$ and $1$',
	'the two identities and two parallel morphisms from $0$ to $1$',
	'The name of this category comes from the fact that it consists of two parallel morphisms, and a functor out of this category is the same as a parallel pair of morphisms in the target category.',
	'https://ncatlab.org/nlab/show/walking+structure',
	NULL
),
(
	'walking_isomorphism',
	'walking isomorphism',
	'$\{0 \rightleftarrows 1\}$',
	'two objects $0$ and $1$',
	'identities, and two morphisms $0 \to 1$ and $1 \to 0$ that are mutually inverse',
	'The name of this category comes from the fact that it consists of two objects and an isomorphism between them, and a functor out of this category is the same as an isomorphism in the target category. The walking isomorphism is actually equivalent to the trivial category.',
	'https://ncatlab.org/nlab/show/walking+isomorphism',
	NULL
),
(
	'walking_composable_pair',
	'walking composable pair',
	'$\{ 0 \to 1 \to 2 \}$',
	'three objects $0,1,2$',
	'a single morphism from each natural number to one greater than or equal to it',
	'The name of this category comes from the fact that a functor out of it is the same as a composable pair of morphisms.',
	'https://ncatlab.org/nlab/show/composable+pair',
	NULL
),
(
	'walking_fork',
	'walking fork',
	'$\{0 \to 1 \rightrightarrows 2\}$',
	'three objects $0,1,2$',
	'one morphism $i : 0 \to 1$, two morphisms $f,g : 1 \rightrightarrows 2$, one morphism $0 \to 2$ (namely, $f \circ i = g \circ i$), and the identities',
	'The name of this category comes from the fact that a functor out of it is the same as a <a href="https://ncatlab.org/nlab/show/fork" target="_blank">fork</a>.',
	NULL,
	NULL
),
(
	'walking_commutative_square',
	'walking commutative square',
	'$\{0 \to 1\}^2$',
	'four objects $a,b,c,d$',
	'morphisms $a \to b$, $b \to d$, $a \to c$, $c \to d$, identities, and one morphism $a \to d$',
	'This category consists of a commutative square:
	$$\begin{CD} a @>>> b \\ @VVV @VVV \\ c @>>> d \end{CD}$$
	Its name comes from the fact that a functor out of it is the same as a <a href="https://ncatlab.org/nlab/show/commutative+square" target="_blank">commutative square</a> in the target category. Notice that the category is isomorphic to the product category $\{0 \to 1\} \times \{0 \to 1\}$ of the <a href="/category/walking_morphism">walking morphism</a> with itself. Hence, most (but not all) properties are inherited from it. It is also isomorphic to the partial order of positive divisors of $6$.',
	'https://ncatlab.org/nlab/show/commutative+square',
	NULL
),
(
	'walking_span',
	'walking span',
	'$\{1 \leftarrow 0 \rightarrow 2\}$',
	'$0,1,2$',
	'$0 \to 1$, $0 \to 2$, and the identities',
	'The name of this category comes from the fact that a functor out of it is the same as a <a href="https://ncatlab.org/nlab/show/span" target="_blank">span</a> in the target category. It is isomorphic to the partial order of proper positive divisors of $6$.',
	'https://ncatlab.org/nlab/show/span#the_walking_span',
	NULL
),
(
	'walking_idempotent',
	'walking idempotent',
	'$\mathrm{Idem}$',
	'a single object $0$',
	'two morphisms $\mathrm{id}_0,e : 0 \to 0$ with $e^2=e$',
	'The name of this category comes from the fact that a functor out of it is the same as an <a href="https://ncatlab.org/nlab/show/idempotent" target="_blank">idempotent morphism</a> in the target category. It can also be seen as the delooping of the monoid $\{1,e\}$ in which $e^2=e$.',
	NULL,
	NULL
),
(
	'walking_splitting',
	'walking splitting',
	'$\mathrm{Split}$',
	'two objects $0$ and $1$',
	'the identities, morphisms $i : 0 \to 1$, $p : 1 \to 0$ satisfying $pi = \mathrm{id}_0$, and the idempotent $ip : 1 \to 1$.',
	'This category could also be called the "walking split idempotent" (or "walking section", "walking retraction"), but we chose a name that emphasizes that the splitting belongs to the data. Notice that the $5$ given morphisms are indeed closed under composition. For example, $p \circ ip = p$ and $ip \circ i = i$.<br>The walking splitting can be interpreted as a skeleton of the category of $\mathbb{F}_2$-vector spaces of dimension $\leq 1$.',
	NULL,
	NULL
),
(
	'walking_coreflexive_pair',
	'walking coreflexive pair',
	'$\Delta^{\leq 1}$',
	'two objects $[0]$ and $[1]$',
	'the identities, two morphisms $i,j : [0] \rightrightarrows [1]$, a morphism $p : [1] \to [0]$ with $p i = p j = \mathrm{id}_{[0]}$, and the two idempotent morphisms $ip, jp : [1] \to [1]$.',
	'This category is equal to the truncated simplex category $\Delta^{\leq 1}$, i.e. the full subcategory of $\Delta$ spanned by $[0] = \{0\}$ and $[1] = \{0 < 1\}$; this also explains our notation of the category and its objects.
	$$[0] \begin{array}{c} \xhookrightarrow{~~i~~} \\ \xtwoheadleftarrow{~~p~~} \\ \xhookrightarrow{~~j~~} \end{array} [1]$$
	The morphisms $i,j$ are the two inclusions, $p$ is their unique retraction, and $ip,jp : [1] \to [1]$ are the two constant maps. The name of this category comes from the fact that a functor out of it is the same as a <a href="https://ncatlab.org/nlab/show/reflexive+pair" target="_blank">coreflexive pair</a> in the target category. Its dual is therefore the walking reflexive pair.',
	NULL,
	NULL
);