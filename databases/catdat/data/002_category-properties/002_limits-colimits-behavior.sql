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
	'biproducts',
	'has',
	'A category has <i>biproducts</i> when it has zero morphisms, finite products (denoted $\times$), finite coproducts (denoted $\oplus$), and for every finite family of objects $A_1,\dotsc,A_n$ the canonical morphism
	$$\mu : A_1 \oplus \cdots \oplus A_n \to A_1 \times \cdots \times A_n$$
	is an isomorphism. Such a category is also called <i>semi-additive</i>, and it is automatically enriched over commutative monoids: the sum of $f,g : A \rightrightarrows B$ is defined as:
	$$A \xrightarrow{(f,g)} B \times B \xrightarrow{\mu^{-1}} B \oplus B \xrightarrow{\nabla} B$$',
	'https://ncatlab.org/nlab/show/biproduct',
	'biproducts',
	TRUE
),
(
	'pointed',
	'is',
	'A category is <i>pointed</i> when it has a zero object, i.e. an object which is both initial and terminal.',
	'https://ncatlab.org/nlab/show/pointed+category',
	'pointed',
	TRUE
),
(
	'strict initial object',
	'has a',
	'A <i>strict initial object</i> is an initial object $0$ such that every morphism $A \to 0$ is an isomorphism. This property refers to the existence of a strict initial object.',
	'https://ncatlab.org/nlab/show/strict+initial+object',
	'strict terminal object',
	TRUE
),
(
	'strict terminal object',
	'has a',
	'A <i>strict terminal object</i> is a terminal object $1$ such that every morphism $1 \to A$ is an isomorphism. This property refers to the existence of a strict terminal object.',
	'https://ncatlab.org/nlab/show/strict+terminal+object',
	'strict initial object',
	TRUE
),
(
	'distributive',
	'is',
	'A category is <i>distributive</i> if it has finite products, finite coproducts, and for every object $A$ the functor $A \times -$ preserves finite coproducts. Concretely, for every finite family of objects $(B_i)$ the canonical morphism $\coprod_i (A \times B_i) \to A \times \coprod_i B_i$ must be an isomorphism.',
	'https://ncatlab.org/nlab/show/distributive+category',
	'codistributive',
	TRUE
),
(
	'infinitary distributive',
	'is',
	'A category is <i>infinitary distributive</i> if it has finite products, all coproducts, and for every object $A$ the functor $A \times -$ preserves all coproducts. Concretely, for every family of objects $(B_i)$ the canonical morphism $\coprod_i (A \times B_i) \to A \times \coprod_i B_i$ must be an isomorphism.',
	'https://ncatlab.org/nlab/show/distributive+category',
	'infinitary codistributive',
	TRUE
),
(
	'countably distributive',
	'is',
	'A category is <i>countably distributive</i> if it has finite products, countable coproducts, and for every object $A$ the functor $A \times -$ preserves countable coproducts. Concretely, for every countable family of objects $(B_i)$ the canonical morphism $\coprod_i (A \times B_i) \to A \times \coprod_i B_i$ must be an isomorphism.',
	NULL,
	'countably codistributive',
	TRUE
),
(
	'countably codistributive',
	'is',
	'A category is <i>countably codistributive</i> if it has finite coproducts, countable products, and for every object $A$ the functor $A \sqcup -$ preserves countable products. Concretely, for every countable family of objects $(B_i)$ the canonical morphism $A \sqcup \prod_i B_i \to \prod_i (A \sqcup B_i)$ must be an isomorphism.',
	NUll,
	'countably distributive',
	TRUE
),
(
	'codistributive',
	'is',
	'A category is <i>codistributive</i> if it has finite coproducts, finite products, and for every object $A$ the functor $- \sqcup A$ preserves finite products. Concretely, for every finite family of objects $(B_i)$ the canonical morphism $A \sqcup \prod_i B_i \to \prod_i (A \sqcup B_i)$ must be an isomorphism.',
	NULL,
	'distributive',
	TRUE
),
(
	'infinitary codistributive',
	'is',
	'A category is <i>infinitary codistributive</i> if it has finite coproducts, all products, and for every object $A$ the functor $A \sqcup -$ preserves all products. Concretely, for every family of objects $(B_i)$ the canonical morphism $A \sqcup \prod_i B_i \to \prod_i (A \sqcup B_i)$ must be an isomorphism.' ,
	NULL,
	'infinitary distributive',
	TRUE
),
(
	'exact filtered colimits',
	'has',
	'In a category $\mathcal{C}$, which we assume to have filtered colimits and finite limits, we say that <i>filtered colimits are exact</i> if the following equivalent conditions are satisfied:
	<ol>
		<li>For every finite category $\mathcal{I}$ the functor $\lim : [\mathcal{I}, \mathcal{C}] \to \mathcal{C}$ preserves filtered colimits.</li>
		<li>For every small filtered category $\mathcal{J}$ the functor $\mathrm{colim} : [\mathcal{J},\mathcal{C}] \to \mathcal{C}$ preserves finite limits.</li>
		<li>For every diagram $X : \mathcal{I} \times \mathcal{J} \to \mathcal{C}$, where $\mathcal{I}$ is finite and $\mathcal{J}$ is small filtered, the canonical morphism $\mathrm{colim}_j \lim_i X(i,j) \to \lim_i \mathrm{colim}_j X(i,j)$ is an isomorphism.</li>
	</ol>',
	'https://ncatlab.org/nlab/show/commutativity+of+limits+and+colimits',
	'exact cofiltered limits',
	TRUE
),
(
	'exact cofiltered limits',
	'has',
	'In a category $\mathcal{C}$, which we assume to have cofiltered limits and finite colimits, we say that <i>cofiltered limits are exact</i> if the following equivalent conditions are satisfied:
	<ol>
		<li>For every finite category $\mathcal{I}$ the functor $\mathrm{colim} : [\mathcal{I}, \mathcal{C}] \to \mathcal{C}$ preserves cofiltered limits.</li>
		<li>For every small cofiltered category $\mathcal{J}$ the functor $\lim : [\mathcal{J},\mathcal{C}] \to \mathcal{C}$ preserves finite colimits.</li>
		<li>For every diagram $X : \mathcal{I} \times \mathcal{J} \to \mathcal{C}$, where $\mathcal{I}$ is finite and $\mathcal{J}$ is small cofiltered, the canonical morphism $\mathrm{colim}_i \lim_j X(i,j) \to \lim_j \mathrm{colim}_i X(i,j)$ is an isomorphism.</li>
	</ol>',
	'https://ncatlab.org/nlab/show/commutativity+of+limits+and+colimits',
	'exact filtered colimits',
	TRUE
),
(
	'cartesian filtered colimits',
	'has',
	'In a category $\mathcal{C}$, which we assume to have filtered colimits and finite products, we say that <i>filtered colimits are cartesian</i> if for every finite set $I$ the product functor $\prod : \mathcal{C}^I \to \mathcal{C}$ preserves filtered colimits. Equivalently, for every $X \in \mathcal{C}$ the functor $X \times - : \mathcal{C} \to \mathcal{C}$ preserves filtered colimits.<br>
	This is no standard terminology, it has been suggested in <a href="https://mathoverflow.net/questions/510240" target="_blank">MO/510240</a>. We have added it to the database since it clarifies the relationship between many related properties.',
	NULL,
	'cocartesian cofiltered limits',
	TRUE
),
(
	'cocartesian cofiltered limits',
	'has',
	'In a category $\mathcal{C}$, which we assume to have cofiltered limits and finite coproducts, we say that <i>cofiltered limits are cocartesian</i> if for every finite set $I$ the coproduct functor $\coprod : \mathcal{C}^I \to \mathcal{C}$ preserves cofiltered limits. Equivalently, for every $X \in \mathcal{C}$ the functor $X \sqcup - : \mathcal{C} \to \mathcal{C}$ preserves cofiltered limits.<br>
	This is no standard terminology, its dual has been suggested in <a href="https://mathoverflow.net/questions/510240" target="_blank">MO/510240</a>. We have added it to the database since it clarifies the relationship between many related properties.',
	NULL,
	'cartesian filtered colimits',
	TRUE
),
(
	'disjoint finite coproducts',
	'has',
	'A category has <i>disjoint finite coproducts</i> if it has finite coproducts, for every pair of objects $A,B$ the coproduct inclusions $A \rightarrow A+B \leftarrow B$ are monomorphisms, and the pullback $A \times_{A + B} B$ exists and is given by the initial object $0$.',
	'https://ncatlab.org/nlab/show/disjoint+coproduct',
	'disjoint finite products',
	TRUE
),
(
	'disjoint coproducts',
	'has',
	'A category has <i>disjoint coproducts</i> if it has coproducts, the coproduct inclusions $A_i \to \coprod_{i \in I} A_i$ are monomorphisms, and the pullback of the inclusions $A_i \to \coprod_{i \in I} A_i$ and $A_j \to \coprod_{i \in I} A_i$ for $i \neq j$ exists and is given by the initial object $0$.',
	'https://ncatlab.org/nlab/show/disjoint+coproduct',
	'disjoint products',
	TRUE
),
(
	'disjoint finite products',
	'has',
	'A category has <i>disjoint finite products</i> if it has finite products, for every pair of objects $A,B$ the product projections $A \leftarrow A \times B \rightarrow B$ are epimorphisms, and the pushout $A \sqcup_{A \times B} B$ exists and is given by the terminal object $1$.<br>
	This terminology does not seem to be common, but we have added it as a dual for the more commonly known property of having disjoint finite coproducts.',
	NULL,
	'disjoint finite coproducts',
	TRUE
),
(
	'disjoint products',
	'has',
	'A category has <i>disjoint products</i> if it has products, the product projections $\prod_{i \in I} A_i \to A_i$ are epimorphisms, and the pushout of the projections $\prod_{i \in I} A_i \to A_i$ and $\prod_{i \in I} A_i \to A_j$ for $i \neq j$ exists and is given by the terminal object $1$.<br>
	This terminology does not seem to be common, but we have added it as a dual for the more commonly known property of having disjoint coproducts.',
	NULL,
	'disjoint coproducts',
	TRUE
),
(
	'regular',
	'is',
	'A category is <i>regular</i> when it is finitely complete, for every morphism $X \to Y$ its kernel pair $X \times_Y X \rightrightarrows X$ has a coequalizer, and regular epimorphisms are stable under pullbacks.',
	'https://ncatlab.org/nlab/show/regular+category',
	'coregular',
	TRUE
),
(
	'coregular',
	'is',
	'A category is <i>coregular</i> when its dual is regular, i.e. it is finitely cocomplete, for every morphism $Y \to X$ its cokernel pair $X \rightrightarrows X \sqcup_Y X$ has an equalizer, and regular monomorphisms are stable under pushouts.',
	NULL,
	'regular',
	TRUE
),
(
	'extensive',
	'is',
	'A category $\mathcal{C}$ is <i>extensive</i> when it has finite coproducts and for all objects $A,B \in \mathcal{C}$ the coproduct functor $\mathcal{C}/A \times \mathcal{C}/B \to \mathcal{C}/(A+B)$ is an equivalence of categories. Equivalently, pullbacks of finite coproduct inclusions along arbitrary morphisms exist and finite coproducts are disjoint and stable under pullback.',
	'https://ncatlab.org/nlab/show/extensive+category',
	'coextensive',
	TRUE
),
(
	'coextensive',
	'is',
	'A category $\mathcal{C}$ is <i>coextensive</i> when it has finite products and for all objects $A,B \in \mathcal{C}$ the product functor $A/\mathcal{C} \times B/\mathcal{C} \to (A \times B)/\mathcal{C}$ is an equivalence of categories. The prototypical example is the category of commutative rings.',
	NULL,
	'extensive',
	TRUE
),
(
	'infinitary extensive',
	'is',
	'A category $\mathcal{C}$ is <i>infinitary extensive</i> when it has coproducts and for all families of objects $(A_i)_{i \in I}$ the coproduct functor $\prod_{i \in I} \mathcal{C}/A_i \to \mathcal{C}/(\coprod_{i \in I} A_i)$ is an equivalence of categories. Equivalently, pullbacks of coproduct inclusions along arbitrary morphisms exist and coproducts are disjoint and stable under pullback.',
	'https://ncatlab.org/nlab/show/extensive+category',
	'infinitary coextensive',
	TRUE
),
(
	'infinitary coextensive',
	'is',
	'A category $\mathcal{C}$ is <i>infinitary coextensive</i> when it has products and for all families of objects $(A_i)_{i \in I}$ the product functor $\prod_{i \in I} A_i / \mathcal{C}/A_i \to \prod_{i \in I} A_i / \mathcal{C}$ is an equivalence of categories. <br>
	This terminology does not seem to be common, but we have added it as a dual for the more commonly known property of being infinitary extensive.',
	NULL,
	'infinitary extensive',
	TRUE
),
(
	'unital',
	'is',
	'A category is <i>unital</i> if it has a zero object, finite limits, and for all objects $X,Y$ the two morphisms $(\mathrm{id}_X,0) : X \hookrightarrow X \times Y$ and $(0,\mathrm{id}_Y) : Y \hookrightarrow X \times Y$ are jointly strongly epimorphic. This means: there is no proper subobject of $X \times Y$ that contains $X$ and $Y$. When coproducts exist, the canonical morphism $X \sqcup Y \to X \times Y$ therefore must be a strong epimorphism.',
	'https://ncatlab.org/nlab/show/unital+category',
	'counital',
	TRUE
),
(
	'counital',
	'is',
	'A category is <i>counital</i> if its dual is unital, i.e., it has a zero object, finite colimits, and for all objects $X,Y$ the two morphisms $(\mathrm{id}_X;0) : X \sqcup Y \twoheadrightarrow X$ and $(0;\mathrm{id}_Y) : X \sqcup Y \twoheadrightarrow Y$ are jointly strongly monomorphic. When products exist, the canonical morphism $X \sqcup Y \to X \times Y$ therefore must be a strong monomorphism.',
	NULL,
	'unital',
	TRUE
),
(
	'CIP',
	'satisfies',
	'A category satisfies <i>CIP</i> ("coproducts inject into products") if it has zero morphisms, products, coproducts, and for every family of objects $(X_i)_{i \in I}$ the canonical morphism
	$$\textstyle \alpha : \coprod_i X_i \to \prod_{i \in I} X_i$$
	defined by $p_j \circ \alpha \circ \iota_i = \delta_{i,j}$ is a monomorphism. This is no standard terminology. This property has been added to clarify relationships between other properties, in particular those concerning the commutation between limits and colimits.',
	NULL,
	'CSP',
	TRUE
),
(
	'CSP',
	'satisfies',
	'A category satisfies <i>CSP</i> ("coproducts surject onto products") if it has zero morphisms, products, coproducts, and for every family of objects $(X_i)_{i \in I}$ the canonical morphism
	$$\textstyle \alpha : \coprod_i X_i \to \prod_{i \in I} X_i$$
	defined by $p_j \circ \alpha \circ \iota_i = \delta_{i,j}$ is an epimorphism. This is no standard terminology. This property has been added to clarify relationships between other properties, in particular those concerning the commutation between limits and colimits.',
	NULL,
	'CIP',
	TRUE
);