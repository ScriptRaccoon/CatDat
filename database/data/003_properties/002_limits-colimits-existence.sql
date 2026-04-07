INSERT INTO properties (
	id,
	relation,
	description,
	nlab_link,
	dual_property_id,
	invariant_under_equivalences
)
VALUES
(
	'complete',
	'is',
	'A category is <i>complete</i> when every small diagram in the category has a limit.',
	'https://ncatlab.org/nlab/show/complete+category',
	'cocomplete',
	TRUE
),
(
	'cocomplete',
	'is',
	'A category is <i>cocomplete</i> when every small diagram in the category has a colimit.',
	'https://ncatlab.org/nlab/show/cocomplete+category',
	'complete',
	TRUE
),
(
	'pullbacks',
	'has',
	'A category $\mathcal{C}$ has <i>pullbacks</i> if every cospan of morphisms $X \rightarrow S \leftarrow Y$ has a pullback $X \times_S Y$. This is also known as a fiber product. Equivalently, the slice category $\mathcal{C}/S$ has binary products.',
	'https://ncatlab.org/nlab/show/pullback',
	'pushouts',
	TRUE
),
(
	'pushouts',
	'has',
	'A category $\mathcal{C}$ has <i>pushouts</i> if every span of morphisms $X \leftarrow S \rightarrow Y$ has a pushout $X \sqcup_S Y$. This is also known as a fiber coproduct. Equivalently, the coslice category $S/\mathcal{C}$ has binary coproducts.',
	'https://ncatlab.org/nlab/show/pushout',
	'pullbacks',
	TRUE
),
(
	'finitely complete',
	'is',
	'A category is <i>finitely complete</i> when every finite diagram has a limit.',
	'https://ncatlab.org/nlab/show/finitely+complete+category',
	'finitely cocomplete',
	TRUE
),
(
	'finitely cocomplete',
	'is',
	'A category is <i>finitely cocomplete</i> when every finite diagram has a colimit.',
	'https://ncatlab.org/nlab/show/finitely+cocomplete+category',
	'finitely complete',
	TRUE
),
(
	'initial object',
	'has an',
	'An <i>initial object</i> is an object that has a unique morphism to every object in the category. This property refers to the existence of an initial object.',
	'https://ncatlab.org/nlab/show/initial+object',
	'terminal object',
	TRUE
),
(
	'terminal object',
	'has a',
	'A <i>terminal object</i> (or <i>final object</i>) is an object that has a unique morphism from every object in the category. This property refers to the existence of a terminal object.',
	'https://ncatlab.org/nlab/show/terminal+object',
	'initial object',
	TRUE
),
(
	'products',
	'has',
	'Given a family of objects $(A_i)_{i \in I}$, a <i>product</i> $\prod_{i \in I} A_i$ is defined as an object with morphisms $p_i : \prod_{i \in I} A_i \to A_i$ satisfying the following universal property: For every object $T$ and every family of morphisms $(f_i : T \to A_i)_{i \in I}$ there is a unique morphism $f : T \to \prod_{i \in I} A_i$ such that $p_i \circ f = f_i$ for all $i \in I$. This property refers to the existence of <i>small products</i>, i.e., products of small families of objects.',
	'https://ncatlab.org/nlab/show/cartesian+product',
	'coproducts',
	TRUE
),
(
	'coproducts',
	'has',
	'Given a family of objects $(A_i)_{i \in I}$, a <i>coproduct</i> $\coprod_{i \in I} A_i$ is defined as an object with morphisms $i_i : A_i \to \coprod_{i \in I} A_i$ satisfying the following universal property: For every object $T$ and every family of morphisms $(f_i : A_i \to T)_{i \in I}$ there is a unique morphism $f : \coprod_{i \in I} A_i \to T$ such that $f \circ i_i = f_i$ for all $i \in I$. This property refers to the existence of <i>small coproducts</i>, i.e., coproducts of small families of objects.',
	'https://ncatlab.org/nlab/show/coproduct',
	'products',
	TRUE
),
(
	'finite products',
	'has',
	'A category has <i>finite products</i> if it has products for finite families of objects. Equivalently, it has a terminal object and binary products.',
	'https://ncatlab.org/nlab/show/finite+product',
	'finite coproducts',
	TRUE
),
(
	'finite coproducts',
	'has',
	'A category has <i>finite coproducts</i> if it has coproducts for finite families of objects. Equivalently, it has an initial object and binary coproducts.',
	'https://ncatlab.org/nlab/show/finite+coproduct',
	'finite products',
	TRUE
),
(
	'binary products',
	'has',
	'A category has <i>binary products</i> if every pair $A,B$ of objects has a product $A \times B$.',
	'https://ncatlab.org/nlab/show/binary+product',
	'binary coproducts',
	TRUE
),
(
	'binary coproducts',
	'has',
	'A category has <i>binary coproducts</i> if every pair $A,B$ of objects has a coproduct $A \sqcup B$.',
	'https://ncatlab.org/nlab/show/coproduct',
	'binary products',
	TRUE
),
(
	'countable products',
	'has',
	'A category has <i>countable products</i> if it has products for countable families of objects.',
	NULL,
	'countable coproducts',
	TRUE
),
(
	'countable coproducts',
	'has',
	'A category has <i>countable coproducts</i> if it has coproducts for countable families of objects.',
	NULL,
	'countable products',
	TRUE
),
(
	'powers',
	'has',
	'If $X$ is an object and $I$ is a set, the <i>power</i> is defined as the product $X^I := \prod_{i \in I} X$. This property refers to the existence of powers.',
	'https://ncatlab.org/nlab/show/powering',
	'copowers',
	TRUE
),
(
	'copowers',
	'has',
	'If $X$ is an object and $I$ is a set, the <i>copower</i> is defined as the coproduct $I \otimes X := \coprod_{i \in I} X$. This property refers to the existence of copowers.',
	'https://ncatlab.org/nlab/show/copower',
	'powers',
	TRUE
),
(
	'countable powers',
	'has',
	'A category has <i>countable powers</i> when for every object $X$ and every countable set $I$ the power $X^I$ exists.',
	'https://ncatlab.org/nlab/show/powering',
	'countable copowers',
	TRUE
),
(
	'countable copowers',
	'has',
	'A category has <i>countable copowers</i> when for every object $X$ and every countable set $I$ the copower $I \otimes X$ exists.',
	'https://ncatlab.org/nlab/show/copower',
	'countable powers',
	TRUE
),
(
	'finite powers',
	'has',
	'A category has <i>finite powers</i> when for every object $X$ and every finite set $I$ the power $X^I$ exists. Equivalently, for every $n \in \mathbb{N}$ the power $X^n$ exists.',
	'https://ncatlab.org/nlab/show/powering',
	'finite copowers',
	TRUE
),
(
	'finite copowers',
	'has',
	'A category has <i>finite copowers</i> when for every object $X$ and every finite set $I$ the copower $I \otimes X$ exists. Equivalently, for every $n \in \mathbb{N}$ the copower $n \otimes X$ exists.',
	'https://ncatlab.org/nlab/show/copower',
	'finite powers',
	TRUE
),
(
	'binary powers',
	'has',
	'A category has <i>binary powers</i> when for every object $X$ the product $X \times X$  exists. These objects might also be called <i>squares</i>.',
	'https://ncatlab.org/nlab/show/powering',
	'binary copowers',
	TRUE
),
(
	'binary copowers',
	'has',
	'A category has <i>binary copowers</i> when for every object $X$ and every binary set $I$ the coproduct $X \sqcup X$ exists. These objects might also be called <i>doubles</i>.',
	'https://ncatlab.org/nlab/show/copower',
	'binary powers',
	TRUE
),
(
	'equalizers',
	'has',
	'An <i>equalizer</i> of a pair of morphisms $f,g : A \to B$ is an object $E$ with a morphism $e : E \to A$ such that $f \circ e = g \circ e$ and which is universal with respect to this property. This property refers to the existence of equalizers.',
	'https://ncatlab.org/nlab/show/equalizer',
	'coequalizers',
	TRUE
),
(
	'coequalizers',
	'has',
	'A <i>coequalizer</i> of a pair of morphisms $f,g : A \to B$ is an object $C$ with a morphism $c : B \to C$ such that $c \circ f = c \circ g$ and which is universal with respect to this property. This property refers to the existence of coequalizers.',
	'https://ncatlab.org/nlab/show/coequalizer',
	'equalizers',
	TRUE
),
(
	'cofiltered limits',
	'has',
	'A category has <i>cofiltered limits</i> if it has limits of diagrams indexed by small <a href="/category-property/cofiltered">cofiltered</a> categories. This is actually equivalent to having directed limits.',
	'https://ncatlab.org/nlab/show/filtered+limit',
	'filtered colimits',
	TRUE
),
(
	'filtered colimits',
	'has',
	'A category has <i>filtered colimits</i> if it has colimits of diagrams indexed by small <a href="/category-property/filtered">filtered</a> categories. This is actually equivalent to having directed colimits.',
	'https://ncatlab.org/nlab/show/filtered+colimit',
	'cofiltered limits',
	TRUE
),
(
	'directed limits',
	'has',
	'A category has <i>directed limits</i> if it has limits of diagrams indexed by codirected (small) posets. This is actually equivalent to having cofiltered limits.',
	'https://ncatlab.org/nlab/show/directed+limit',
	'directed colimits',
	TRUE
),
(
	'directed colimits',
	'has',
	'A category has <i>directed colimits</i> if it has colimits of diagrams indexed by directed (small) posets. This is actually equivalent to having filtered colimits. Directed colimits are (somewhat confusingly) also known as <i>inverse limits</i>.',
	'https://ncatlab.org/nlab/show/directed+colimit',
	'directed limits',
	TRUE
),
(
	'sequential limits',
	'has',
	'A category has <i>sequential limits</i> if it has limits of diagrams of the form $\cdots \bullet \to \bullet \to \bullet$.',
	'https://ncatlab.org/nlab/show/sequential+limit',
	'sequential colimits',
	TRUE
),
(
	'sequential colimits',
	'has',
	'A category has <i>sequential colimits</i> if it has colimits of diagrams of the form: $\bullet \to \bullet \to \bullet \to \cdots$.',
	'https://ncatlab.org/nlab/show/sequential+colimit',
	'sequential limits',
	TRUE
),
(
	'connected limits',
	'has',
	'A category has <i>connected limits</i> if it has limits of diagrams indexed by connected small categories.',
	'https://ncatlab.org/nlab/show/connected+limit',
	'connected colimits',
	TRUE
),
(
	'connected colimits',
	'has',
	'A category has <i>connected colimits</i> if it has colimits of diagrams indexed by connected small categories.',
	'https://ncatlab.org/nlab/show/connected+colimit',
	'connected limits',
	TRUE
),
(
	'wide pullbacks',
	'has',
	'A category $\mathcal{C}$ has <i>wide pullbacks</i> if for every object $S$ the slice category $\mathcal{C}/S$ has arbitrary small products.',
	'https://ncatlab.org/nlab/show/wide+pullback',
	'wide pushouts',
	TRUE
),
(
	'wide pushouts',
	'has',
	'A category $\mathcal{C}$ has <i>wide pushouts</i> if for every object $S$ the coslice category $S/\mathcal{C}$ has arbitrary small coproducts.',
	'https://ncatlab.org/nlab/show/wide+pushout',
	'wide pullbacks',
	TRUE
),
(
	'coreflexive equalizers',
	'has',
	'A <i>coreflexive equalizer</i> is a limit of a diagram consisting of a parallel pair of morphisms with a common retraction, which is the same concept as an equalizer of such a parallel pair. This property refers to the existence of coreflexive equalizers.',
	'https://ncatlab.org/nlab/show/reflexive+coequalizer',
	'reflexive coequalizers',
	TRUE
),
(
	'reflexive coequalizers',
	'has',
	'A <i>reflexive coequalizer</i> is a colimit of a diagram consisting of a parallel pair of morphisms with a common section, which is the same concept as a coequalizer of such a parallel pair. This property refers to the existence of reflexive coequalizers.',
	'https://ncatlab.org/nlab/show/reflexive+coequalizer',
	'coreflexive equalizers',
	TRUE
),
(
	'cosifted limits',
	'has',
	'A category has <i>cosifted limits</i> if it has limits of diagrams indexed by cosifted small categories.',
	'https://ncatlab.org/nlab/show/sifted+colimit',
	'sifted colimits',
	TRUE
),
(
	'sifted colimits',
	'has',
	'A category has <i>sifted colimits</i> if it has colimits of diagrams indexed by sifted small categories.',
	'https://ncatlab.org/nlab/show/sifted+colimit',
	'cosifted limits',
	TRUE
);