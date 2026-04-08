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
	'We can use constant maps.'
),
(
	'Setne',
	'disjoint finite products',
	TRUE,
	'Let $A,B$ be non-empty sets. The set $P := A \sqcup_{A \times B} B$ has elements $i_1(a)$, $i_2(b)$ with $i_1(a)=i_2(b)$ for all $(a,b) \in A \times B$. It clearly follows that all elements are equal, and there is at least one since $A$ is non-empty. Thus, $P \cong 1$.'
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
