INSERT INTO category_property_assignments (
	category_id,
	property_id,
	is_satisfied,
	reason
)
VALUES
(
	'walking_fork',
	'finite',
	TRUE,
	'This is trivial.'
),
(
	'walking_fork',
	'strongly connected',
	TRUE,
	'This is obvious.'
),
(
	'walking_fork',
	'skeletal',
	TRUE,
	'The three objects are clearly not isomorphic.'
),
(
	'walking_fork',
	'initial object',
	TRUE,
	'$0$ is an initial object by construction.'
),
(
	'walking_fork',
	'directed colimits',
	TRUE,
	'Every directed diagram can be reduced to one of very few trivial diagrams, for example $0 \xrightarrow{i} 1 \xrightarrow{f} 2$ has colimit $2$.'
),
(
	'walking_fork',
	'generator',
	TRUE,
	'It is easy to check that $1$ is a generator.'
),
(
	'walking_fork',
	'cogenerator',
	TRUE,
	'It is easy to check that $2$ is a cogenerator.'
),
(
	'walking_fork',
	'left cancellative',
	TRUE,
	'It is easy to check that $i,f,g$ are monomorphisms.'
),
(
	'walking_fork',
	'equalizers',
	TRUE,
	'The only pair of distinct parallel morphisms is $f,g$, and their equalizer is $i$.'
),
(
	'walking_fork',
	'locally cartesian closed',
	TRUE,
	'We need to check that every slice category is cartesian closed. The slice category over $0$ is the <a href="/category/1">trivial category</a>. The slice category over $1$ is the <a href="/category/walking_morphism">walking morphism</a>. Finally, the slice category over $2$ ist the <a href="/category/walking_commutative_square">walking commutative square</a>. All of these are cartesian closed, see their pages for details.'
),
(
	'walking_fork',
	'one-way',
	TRUE,
	'This is trivial.'
),
(
	'walking_fork',
	'terminal object',
	FALSE,
	'$0$ and $1$ are not terminal since there is no morphism from $2$, and $2$ is not terminal since there are two different morphisms $1 \rightrightarrows 2$.'
),
(
	'walking_fork',
	'right cancellative',
	FALSE,
	'By construction, $i$ is not an epimorphism: $f \circ i = g \circ i$ and $f \neq g$.'
),
(
	'walking_fork',
	'balanced',
	FALSE,
	'Both $f$ and $g$ are monomorphisms and epimorphisms.'
),
(
	'walking_fork',
	'binary products',
	FALSE,
	'Assume that $X := 1 \times 2$ exists. Then $\mathrm{Hom}(1,X) \cong \mathrm{Hom}(1,1) \times \mathrm{Hom}(1,2)$ shows that there are two morphisms $1 \rightrightarrows X$. Hence, $X = 2$. But we also have $\mathrm{Hom}(2,X) \cong \mathrm{Hom}(2,1) \times \mathrm{Hom}(2,2) = \emptyset$, a contradiction.'
);