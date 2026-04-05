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
	'strongly connected',
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
	'skeletal',
	TRUE,
	'There is just one object.'
),
(
    'walking_idempotent',
    'self-dual',
    TRUE,
    'This is obvious.'
),
(
	'walking_idempotent',
	'mono-regular',
    TRUE,
	'This is because the identity is the only monomorphism.'
),
(
    'walking_idempotent',
    'preadditive',
    TRUE,
    'The monoid $\{1,e\}$ with $e^2=e$ is the underlying multiplicative monoid of the ring $\mathbb{Z}/2$, where $e=0$. Thus, the (unique) preadditive structure is given by $1 + e = e + 1 = 1$, $e + e = e$ and $1 + 1 = e$.'
),
(
    'walking_idempotent',
    'reflexive coequalizers',
    TRUE,
    'The pair $e,\mathrm{id}_0$ is not reflexive, and the pairs $e,e$ and $\mathrm{id}_0,\mathrm{id}_0$ have a coequalizer for trivial reasons.'
),
(
    'walking_idempotent',
    'terminal object',
    FALSE,
    'This is obvious.'
),
(
    'walking_idempotent',
    'binary powers',
    FALSE,
    'If $0 \times 0 = 0$, then $\mathrm{Hom}(0,0) \cong \mathrm{Hom}(0,0)^2$. But the left hand side has $2$ elements, whereas the right hand has $4$ elements. This is a contradiction.'
),
(
    'walking_idempotent',
    'one-way',
    FALSE,
    'This is obvious.'
),
(
    'walking_idempotent',
    'Cauchy complete',
    FALSE,
    'The idempotent $e$ does not split.'
);