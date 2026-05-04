INSERT INTO category_property_assignments (
	category_id,
	property_id,
	is_satisfied,
	reason
)
VALUES
(
	'walking_idempotent',
	'finite',
	TRUE,
	'This is trivial.'
),
(
	'walking_idempotent',
	'small',
	TRUE,
	'This is trivial.'
),
(
	'walking_idempotent',
	'generator',
	TRUE,
	'The unique object is a generator for trivial reasons.'
),
(
	'walking_idempotent',
	'gaunt',
	TRUE,
	'This is obvious.'
),
(
    'walking_idempotent',
    'self-dual',
    TRUE,
    'This is obvious.'
),
(
	'walking_idempotent',
	'subobject-trivial',
    TRUE,
	'This is because the identity is the only monomorphism.'
),
(
    'walking_idempotent',
    'preadditive',
    TRUE,
    'The monoid $\{1,e\}$ with $e^2=e$ is the underlying multiplicative monoid of the ring $\IZ/2$, where $e=0$. Thus, the (unique) preadditive structure is given by $1 + e = e + 1 = 1$, $e + e = e$ and $1 + 1 = e$.'
),
(
    'walking_idempotent',
    'reflexive coequalizers',
    TRUE,
    'The pair $e,\id_0$ is not reflexive, and the pairs $e,e$ and $\id_0,\id_0$ have a coequalizer for trivial reasons.'
),
(
    'walking_idempotent',
    'filtered',
    TRUE,
    'The pair $\id,e$ is coequalized by $e$ (non-universally).'
),
(
    'walking_idempotent',
    'terminal object',
    FALSE,
    'This is obvious.'
),
(
    'walking_idempotent',
    'Cauchy complete',
    FALSE,
    'The idempotent $e$ does not split.'
);