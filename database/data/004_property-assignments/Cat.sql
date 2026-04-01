INSERT INTO category_property_assignments (
	category_id,
	property_id,
	is_satisfied,
	reason
)
VALUES
(
	'Cat',
	'locally small',
	TRUE,
	'There is a forgetful functor $\mathbf{Cat} \to \mathbf{Set} \times \mathbf{Set}$, $\mathcal{C} \mapsto (\mathrm{Ob}(\mathcal{C}),\mathrm{Mor}(\mathcal{C}))$, and $\mathbf{Set} \times \mathbf{Set}$ is locally small.'
),
(
	'Cat',
	'cartesian closed',
	TRUE,
	'See p. 98 in <a href="https://ncatlab.org/nlab/show/Categories+for+the+Working+Mathematician" target="_blank">Mac Lane</a>.'
),
(
	'Cat',
	'locally finitely presentable',
	TRUE,
	'See <a href="https://mathoverflow.net/questions/84460" target="_blank">MO/84460</a>.'
),
(
	'Cat',
	'infinitary extensive',
	TRUE,
	'[Sketch] This is straight forward from the fact that $\mathbf{Set}$ is infinitary extensive: A functor $\mathcal{C} \to \coprod_i \mathcal{D}_i$ yields full subcategories $\mathcal{C}_i \subseteq \mathcal{C}$ (the preimages of $\mathcal{D}_i)$ with $\mathcal{C} = \coprod_i \mathcal{C}_i$.'
),
(
	'Cat',
	'strongly connected',
	TRUE,
	'Every nonempty category is weakly terminal (by using constant functors).'
),
(
	'Cat',
	'strict terminal object',
	FALSE,
	'A functor $1 \to \mathcal{C}$ is just the choice of an object of $\mathcal{C}$, it does not force $\mathcal{C}$ to be trivial.'
),
(
	'Cat',
	'balanced',
	FALSE,
	'Since we know that the <a href="/category/Mon">category of monoids</a> is not balanced, there is a monoid map $M \to N$ which is a monomorphism and an epimorphism which is not an isomorphism. Then $B(M) \to B(N)$ has the corresponding properties.'
),
(
	'Cat',
	'cogenerator',
	FALSE,
	'If $\mathcal{C}$ was a cogenerator in $\mathbf{Cat}$, one can easily deduce that the coproduct of monoids (aka free product) $\coprod_{X \in \mathcal{C}} \mathrm{End}(X)$ would be a cogenerator in the <a href="/category/Mon">the category of monoids</a>, which we know does not exist.'
),
(
	'Cat',
	'skeletal',
	FALSE,
	'This is trivial.'
),
(
	'Cat',
	'Malcev',
	FALSE,
	'Use that $\mathbf{Set}$ is not Malcev and consider sets as discrete categories.'
),
(
	'Cat',
	'regular',
	FALSE,
	'See Example 3.14 at the <a href="https://ncatlab.org/nlab/show/regular+category" target="_blank">nLab</a>.'
),
(
	'Cat',
	'co-Malcev',
	FALSE,
	'We can adapt the proof from <a href="/category/Mon">$\mathbf{Mon}$</a> as follows: Consider the functor $U : \mathbf{Cat} \to \mathbf{Set}^+$ sending a category $\mathcal{C}$ to the (large) set $\{(x,u) : x \in \mathrm{Ob}(\mathcal{C}) ,\, u \in \mathrm{End}(x) \}$. It is represented by $B \mathbb{N}$, the one-object category associated to the free monoid in one generator. Consider the relation $R \subseteq U^2$ consisting of those pairs $((x,u),(y,v))$ where $x = y$ and $uv = u^2$. This also representable, namely be the one-object category associated to the monoid with the presentation $\langle u,v : uv = u^2 \rangle$. Clearly, $R$ is reflexive, but not symmetric.'
),
(
	'Cat',
	'coregular',
	FALSE,
	'We already know that the <a href="/category/Mon">category of monoids</a> is not coregular, in fact there is a regular monomorphism $M \to N$ of monoids and a morphism $M \to K$ such that $K \to K \sqcup_M N$ is not a monomorphism. The delooping functor $B : \mathbf{Mon} \to \mathbf{Cat}$ has a left adjoint (<a href="https://math.stackexchange.com/questions/574745" target="_blank">MSE/574745</a>), hence it preserves regular monomorphisms. It also preserves pushouts (<a href="https://math.stackexchange.com/questions/5130854" target="_blank">MSE/5130854</a>), and it reflects monomorphisms since it is faithful. Therefore, $B(M) \to B(N)$ provides the desired counterexample of a non-stable regular monomorphism of categories.'
);
