INSERT INTO category_property_assignments (
	category_id,
	property_id,
	is_satisfied,
	reason
)
VALUES
(
	'sSet',
	'locally small',
	TRUE,
	'This follows from the general fact that $[\mathcal{C},\mathcal{D}]$ is locally small when $\mathcal{C}$ is small and $\mathcal{D}$ is locally small, here applied to $\mathcal{C} = \Delta^{\mathrm{op}}$ and $\mathcal{D} = \mathbf{Set}$.'
),
(
	'sSet',
	'Grothendieck topos',
	TRUE,
	'This is clear from the definitions.'
),
(
	'sSet',
	'generator',
	TRUE,
	'Let $\Delta^n := \mathrm{Hom}([n],-)$ be the standard $n$-simplex for $n \geq 0$. The set $\{\Delta^n : n \geq 0\}$ is a <a href="/category-property/generating_set">generating set</a> by the Yoneda Lemma. For all $n,m$ there is a morphism $[n] \to [m]$ in $\Delta$ and hence a morphism $\Delta^m \to \Delta^n$ in $\mathbf{sSet}$. Then by <a href="/lemma/generator_construction">this lemma</a> the coproduct $\coprod_{n \geq 0} \Delta^n$ is a generator in $\mathbf{sSet}$.'
),
(
	'sSet',
	'locally strongly finitely presentable',
	TRUE,
	'This follows from the fact that every category of presheaves over a small category is locally strongly finitely presentable.'
),
(
	'sSet',
	'semi-strongly connected',
	TRUE,
	'Let $X,Y$ be two simplicial sets. Assume that $X_0$ is empty. Then $X_n$ is empty for all $n$ since there is a morphism $[0] \to [n]$, hence a map $X_n \to X_0$. So there is a morphism $X \to Y$ for trivial reasons. If $X_0$ is non-empty, pick an element. By the Yoneda Lemma it corresponds to a morphism $\Delta^0 \to X$. Since $\Delta^0 = 1$ is terminal, there is a morphism $Y \to \Delta^0$, and these compose to a morphism $Y \to X$.'
),
(
	'sSet',
	'skeletal',
	FALSE,
	'This is trivial.'
),
(
	'sSet',
	'Malcev',
	FALSE,
	'Any counterexample for $\mathbf{Set}$ (i.e., any non-symmetric reflexive relation) yields one for this category by taking constant simplicial sets.'
),
(
	'sSet',
	'finitary algebraic',
	FALSE,
	'A one-sorted finitary algebraic category has an object $F$ (the free algebra on one generator) such that $F$ is finitely presentable and every object $X$ admits an epimorphism $\coprod_{s \in S} F \to X$ for some index set $S$. Assume that such a simplicial set $F$ exists.  By using the sequence of $n$-skeletons of $F$, we see that there is some $n$ such that every $n$-simplex in $F$ is degenerate. Now take $X = \Delta^n$, which has a non-degenerate $n$-simplex. Then there cannot be an epimorphism $\coprod_{s \in S} F \to X$.'
);
