INSERT INTO category_property_assignments (
	category_id,
	property_id,
	is_satisfied,
	reason
)
VALUES
(
	'walking_span',
	'finite',
	TRUE,
	'This is trivial.'
),
(
	'walking_span',
	'small',
	TRUE,
	'This is trivial.'
),
(
	'walking_span',
	'skeletal',
	TRUE,
	'The three objects are not isomorphic.'
),
(
	'walking_span',
	'initial object',
	TRUE,
	'$0$ is an initial object.'
),
(
	'walking_span',
	'thin',
	TRUE,
	'This is trivial.'
),
(
	'walking_span',
	'binary products',
	TRUE,
	'We have $0 \times x = 0$ for all $x$, $x \times x = x$, and $1 \times 2 = 0$.'
),
(
	'walking_span',
	'locally cartesian closed',
	TRUE,
	'The slice category over $0$ is the <a href="/category/1">trivial category</a>, and the slice category over $1$ is the <a href="/category/walking_morphism">interval category</a>, which is cartesian closed (see there). The same holds for $2$ by symmetry.'
),
(
	'walking_span',
	'multi-algebraic',
	TRUE,
	'We first remark that for a set $X$, the identity span $(\mathrm{id},\mathrm{id})\colon X \leftarrow X \rightarrow X$ exhibits a product if and only if $X$ is either a singleton or the empty set. Therefore, there is a (finite product, coproduct)-sketch whose $\mathbf{Set}$-model is precisely a pair $(X,Y)$ of sets such that each of $X$ and $Y$ is either a singleton or the empty set and the product $X \times Y$ is the empty set. Any $\mathbf{Set}$-model of such a sketch is isomorphic to either $(\varnothing, \varnothing)$, $(\varnothing, 1)$, or $(1, \varnothing)$; hence the category of models is equivalent to the walking span.'
),
(
	'walking_span',
	'sifted',
	FALSE,
	'There is no cospan between $1$ and $2$.'
),
(
	'walking_span',
	'semi-strongly connected',
	FALSE,
	'There is no morphism between $1$ and $2$.'
);
