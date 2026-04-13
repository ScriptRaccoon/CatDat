INSERT INTO category_property_assignments (
	category_id,
	property_id,
	is_satisfied,
	reason
)
VALUES
(
	'Set*',
	'locally small',
	TRUE,
	'There is a forgetful functor $\mathbf{Set}_* \to \mathbf{Set}$ and $\mathbf{Set}$ is locally small.'
),
(
	'Set*',
	'pointed',
	TRUE,
	'The singleton set is a zero object.'
),
(
	'Set*',
	'finitary algebraic',
	TRUE,
	'Take the algebraic theory with just one constant.'
),
(
	'Set*',
	'subobject classifier',
	TRUE,
	'The pointed set $(\{0,1\},1)$ is a subobject classifier.'
),
(
	'Set*',
	'cogenerator',
	TRUE,
	'The pointed set $(\{0,1\},1)$ is a cogenerator.'
),
(
	'Set*',
	'epi-regular',
	TRUE,
	'Every epimorphism is surjective for this category, and in an algebraic category every surjective homomorphism is a regular epimorphism.'
),
(
	'Set*',
	'coregular',
	TRUE,
	'From the other properties we know that (co-)limits exist and that monomorphisms coincide with injective pointed maps. So it suffices to prove that these maps are stable under pushouts. This follows from the corresponding fact for the <a href="/category/Set">category of sets</a> and the observation that the forgetful functor $\mathbf{Set}_* \to \mathbf{Set}$ preserves pushouts.'
),
(
	'Set*',
	'co-Malcev',
	TRUE,
	'Malcev categories are closed under slice categories by Prop. 2.2.14 in <a href="https://ncatlab.org/nlab/show/Malcev,+protomodular,+homological+and+semi-abelian+categories" target="_blank">Malcev, protomodular, homological and semi-abelian categories</a>. It follows that co-Malcev categories are closed under coslice categories, and $\mathbf{Set}_*$ is a coslice category of $\mathbf{Set}$, which is co-Malcev since every elementary topos is co-Malcev.'
),
(
	'Set*',
	'skeletal',
	FALSE,
	'This is trivial.'
),
(
	'Set*',
	'unital',
	FALSE,
	'The joint image of $X \to X \times Y \leftarrow Y$ is just $\{(x,0) : x \in X\} \cup \{(0,y) : y \in Y\}$ (where $0$ denotes the base point), which is clearly a proper subset of $X \times Y$ when both $X,Y$ are non-trivial.'
),
(
	'Set*',
	'quotient object classifier',
	FALSE,
	'If there was a quotient object classifier, every surjective pointed map would be a cokernel. However, every cokernel is "injective away from the base point". Formally, if $p : A \to B$ is a cokernel in $\mathbf{Set}_*$, it has the property that $p(x)=p(y) \neq 0$ implies $x=y$ (where $0$ denotes the base point). Clearly this is not satisfied for every surjective pointed map, consider $(\mathbb{N},0) \to (\{0,1\},0)$ defined by $0 \mapsto 0$ and $x \mapsto 1$ for $x > 0$.'
);
