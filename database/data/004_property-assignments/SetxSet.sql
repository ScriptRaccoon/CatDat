INSERT INTO category_property_assignments (
	category_id,
	property_id,
	is_satisfied,
	reason
)
VALUES
(
	'SetxSet',
	'locally small',
	TRUE,
	'This is obvious.'
),
(
	'SetxSet',
	'Grothendieck topos',
	TRUE,
	'It is equivalent to the category of sheaves on a discrete space with two points.'
),
(
    'SetxSet',
    'locally strongly finitely presentable',
    TRUE,
    'Take the two-sorted algebraic theory with no operations and no equations.'
),
(
	'SetxSet',
	'strict terminal object',
	FALSE,
	'This is trivial.'
),
(
	'SetxSet',
	'skeletal',
	FALSE,
	'This is trivial.'
),
(
	'SetxSet',
	'Malcev',
	FALSE,
	'There are lots of pairs of non-symmetric reflexive relations.'
),
(
	'SetxSet',
	'strongly connected',
	FALSE,
	'When $X$ is non-empty, there is no morphism between $(\varnothing,X)$ and $(X,\varnothing)$.'
),
(
	'SetxSet',
	'generator',
	FALSE,
	'Assume that $(A,B)$ is a generator. Of course, $A$ and $B$ cannot be both empty. Assume w.l.o.g. that $A$ is non-empty. Then there is no morphism $(A,B) \to (0,1)$, but there are two different morphisms $(0,1) \rightrightarrows (0,2)$.'
);
