INSERT INTO category_property_assignments (
	category_id,
	property_id,
	is_satisfied,
	reason
)
VALUES
(
	'Setne',
	'locally small',
	TRUE,
	'There is a forgetful functor $\mathbf{Set}_{\neq \varnothing} \to \mathbf{Set}$ and $\mathbf{Set}$ is locally small.'
),
(
	'Setne',
	'generator',
	TRUE,
	'The one-point set is clearly a generator.'
),
(
	'Setne',
	'cogenerator',
	TRUE,
	'The two-point set is a cogenerator, this follows as for $\mathbf{Set}$.'
),
(
	'Setne',
	'well-powered',
	TRUE,
	'This follows from the description of monomorphisms as injective functions.'
),
(
	'Setne',
	'well-copowered',
	TRUE,
	'This follows from the description of epimorphisms as surjective functions.'
),
(
	'Setne',
	'products',
	TRUE,
	'Take the product of non-empty sets inside of $\mathbf{Set}$ and observe that it is non-empty by the axiom of choice.'
),
(
	'Setne',
	'binary coproducts',
	TRUE,
	'The disjoint union of two non-empty sets is non-empty.'
),
(
	'Setne',
	'wide pushouts',
	TRUE,
	'The wide pushout taken in $\mathbf{Set}$ is clearly non-empty, and it still satisfies the universal property.'
),
(
	'Setne',
	'coequalizers',
	TRUE,
	'The coequalizer taken in $\mathbf{Set}$ is clearly non-empty, and it still satisfies the universal property.'
),
(
	'Setne',
	'cartesian closed',
	TRUE,
	'This follows as for $\mathbf{Set}$, since for non-empty sets $X,Y$ there is at least one function $X \to Y$.'
),
(
	'Setne',
	'mono-regular',
	TRUE,
	'This follows as for $\mathbf{Set}$.'
),
(
	'Setne',
	'epi-regular',
	TRUE,
	'This follows as for $\mathbf{Set}$.'
),
(
	'Setne',
	'strongly connected',
	TRUE,
	'Use constant maps.'
),
(
	'Setne',
	'finitely accessible',
	TRUE,
	'Since the inclusion $\mathbf{Set}_{\neq \varnothing} \hookrightarrow \mathbf{Set}$ is closed under non-empty colimits, it is also closed under filtered colimits. Therefore, non-empty finite sets are still finitely presentable in $\mathbf{Set}_{\neq \varnothing}$, and every non-empty set is written as a filtered colimit of them.'
),
(
	'Setne',
	'generalized variety',
	TRUE,
	'Since the inclusion $\mathbf{Set}_{\neq \varnothing} \hookrightarrow \mathbf{Set}$ is closed under non-empty colimits, it is also closed under sifted colimits. Therefore, non-empty finite sets are still strongly finitely presentable in $\mathbf{Set}_{\neq \varnothing}$, and every non-empty set is written as a sifted colimit of them.'
),

(
	'Setne',
	'multi-complete',
	TRUE,
	'Let $D$ be a diagram in $\mathbf{Set}_{\neq \varnothing}$, and let $L$ be a limit of $D$ in $\mathbf{Set}$. If $L$ is non-empty, it gives a limit in $\mathbf{Set}_{\neq \varnothing}$ as well. If $L$ is the empty set, there is no cone over $D$ in $\mathbf{Set}_{\neq \varnothing}$; hence the empty set of cones gives a multi-limit of $D$ in $\mathbf{Set}_{\neq \varnothing}$.'
),
(
	'Setne',
	'natural numbers object',
	TRUE,
	'Any natural numbers object in $\mathbf{Set}$, such as $(\mathbb{N},0,n \mapsto n+1)$, is clearly also one in $\mathbf{Set}_{\neq \varnothing}$.'
),
(
	'Setne',
	'filtered-colimit-stable monomorphisms',
	TRUE,
	'This follows from <a href="/lemma/filtered-monos">this lemma</a> applied to the forgetful functor to $\mathbf{Set}$.'
),
(
	'Setne',
	'sequential limits',
	FALSE,
	'Assume that the sequence of inclusions $\cdots \to \mathbb{N}_{\geq 2} \to \mathbb{N}_{\geq 1} \to \mathbb{N}_{\geq 0} = \mathbb{N}$ as a limit $X$, consisting of maps $X \to \mathbb{N}_{\geq n}$. Since $X$ is non-empty, there is a map $1 \to X$. This corresponds to a family of compatible maps $ 1 \to \mathbb{N}_{\geq n}$, i.e. to compatible elements in $\mathbb{N}_{\geq n}$. But the set $\bigcap_{n \geq 0} \mathbb{N}_{\geq n}$ is empty.'
),
(
	'Setne',
	'skeletal',
	FALSE,
	'This is trivial.'
),
(
	'Setne',
	'cofiltered',
	FALSE,
	'The two maps $\{0\} \rightrightarrows \{0,1\}$ are equalized by no map $X \to \{0\}$ in this category.'
);
