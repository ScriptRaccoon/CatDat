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
	'self-dual',
	'is',
	'A category is <i>self-dual</i> if it is equivalent to its opposite (or dual) category.',
	'https://ncatlab.org/nlab/show/opposite+category',
	'self-dual',
	TRUE
),
(
	'connected',
	'is',
	'A category is <i>connected</i> if it is inhabited and every two objects can be joined via a zig-zag path of morphisms. Equivalently, $\mathcal{C}$ is connected if $\mathcal{C} \simeq \coprod_{i \in I} \mathcal{C}_i$ implies $\mathcal{C}_i \simeq 0$ for some $i$.',
	'https://ncatlab.org/nlab/show/connected+category',
	'connected',
	TRUE
),
(
	'semi-strongly connected',
	'is',
	'A category is <i>semi-strongly connected</i> if it is inhabited and for every two objects $A,B$ there is a morphism $A \to B$ or there is a morphism $B \to A$. Notice that this is stronger than being connected, and that posets with this property are precisely the inhabited totally ordered sets.',
	'https://ncatlab.org/nlab/show/strongly+connected+category',
	'semi-strongly connected',
	TRUE
),
(
	'strongly connected',
	'is',
	'A category is <i>strongly connected</i> if it is inhabited and for every two objects $A,B$ there is a morphism $A \to B$. In other words, each hom-set is inhabited. Notice that when a terminal object $1$ exists, this property means that every object $A$ admits a morphism $1 \to A$.',
	'https://ncatlab.org/nlab/show/strongly+connected+category',
	'strongly connected',
	TRUE
),
(
	'filtered',
	'is',
	'A category is <i>filtered</i> if every finite diagram admits a cocone. Equivalently, it is inhabited, for every two objects $x,y$ there is a cospan $x \rightarrow s \leftarrow y$ (not necessarily universal), and every parallel pair $x \rightrightarrows y$ is coequalized by some morphism $y \to c$ (not necessarily universal).',
	'https://ncatlab.org/nlab/show/filtered+category',
	'cofiltered',
	TRUE
),
(
	'cofiltered',
	'is',
	'A category is <i>cofiltered</i> if every finite diagram admits a cone. Equivalently, it is inhabited, for every two objects $x,y$ there is a span $x \leftarrow p \rightarrow y$ (not necessarily universal), and every parallel pair $x \rightrightarrows y$ is equalized by some morphism $e \to x$ (not necessarily universal).',
	'https://ncatlab.org/nlab/show/cofiltered+category',
	'filtered',
	TRUE
),
(
	'sifted',
	'is',
	'A category $\mathcal{C}$ is <i>sifted</i> if it is inhabited and the diagonal functor $\Delta : \mathcal{C} \to \mathcal{C} \times \mathcal{C}$ is final, i.e. if it is non-empty and for any two objects $X,Y \in \mathcal{C}$ the category of cospans
	<p>$X \rightarrow Z \leftarrow Y$</p>
	is connected. Equivalently, a small category $\mathcal{C}$ is sifted if $\mathrm{colim} : \mathbf{Set}^{\mathcal{C}} \to \mathbf{Set}$ preserves finite products. This property is a weaker notion than being filtered.',
	'https://ncatlab.org/nlab/show/sifted+category',
	'cosifted',
	TRUE
),
(
	'cosifted',
	'is',
	'A category $\mathcal{C}$ is <i>cosifted</i> if it is inhabited and the diagonal functor $\Delta : \mathcal{C} \to \mathcal{C} \times \mathcal{C}$ is initial, i.e. if it is non-empty and for any two objects $X,Y \in \mathcal{C}$ the category of spans
	<p>$X \leftarrow Z \rightarrow Y$</p>
	is connected. Equivalently, a small category $\mathcal{C}$ is cosifted if $\mathrm{colim} : \mathbf{Set}^{{\mathcal{C}}^\mathrm{op}} \to \mathbf{Set}$ preserves finite products. This property is a weaker notion than being cofiltered.',
	'https://ncatlab.org/nlab/show/sifted+category',
	'sifted',
	TRUE
),
(
	'Malcev',
	'is',
	'A category is <i>Malcev</i> when it has finite limits and every internal reflexive relation is an internal equivalence relation. That is, if $R \subseteq X^2$ is a subobject with $\Delta_X \subseteq R$, then $R$ is symmetric and transitive.',
	'https://ncatlab.org/nlab/show/Malcev+category',
	'co-Malcev',
	TRUE
),
(
	'co-Malcev',
	'is',
	'A category is <i>co-Malcev</i> when its dual is Malcev, i.e., it has finite colimits and if $X \sqcup X \twoheadrightarrow R$ is a coreflexive corelation, then it is cosymmetric and cotransitive.<br>
	This terminology is not standard, but we have added it to properly formulate the interesting theorem that the dual of an elementary topos is Malcev, i.e., that every elementary topos is co-Malcev.<br>
	To settle this property, we often use that $\mathcal{C}$ is co-Malcev if and only if the category of representable functors $\mathcal{C} \to \mathbf{Set}^+$ is Malcev.',
	NULL,
	'Malcev',
	TRUE
);