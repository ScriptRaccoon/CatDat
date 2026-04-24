INSERT INTO category_property_assignments (
	category_id,
	property_id,
	is_satisfied,
	reason
)
VALUES
(
	'real_interval',
	'small',
	TRUE,
	'This is trivial.'
),
(
	'real_interval',
	'self-dual',
	TRUE,
	'Take $t \mapsto 1-t$.'
),
(
	'real_interval',
	'semi-strongly connected',
	TRUE,
	'This is trivial.'
),
(
	'real_interval',
	'locally ℵ₁-presentable',
	TRUE,
	'See <a href="https://math.stackexchange.com/questions/4481902/locally-presentable-vs-compactly-presentable-categories#comment9399784_4482185" target="_blank">MSE/4481902</a>.'
),
(
	'real_interval',
	'skeletal',
	TRUE,
	'The relation $\leq$ is antisymmetric.'
),
(
	'real_interval',
	'essentially countable',
	FALSE,
	'This is trivial.'
),
(
	'real_interval',
	'locally finitely presentable',
	FALSE,
	'It suffices to prove that $0$ (the initial object) is the only finitely presentable object. If $s > 0$, then $s = \sup_{n \in \mathbb{N}, \, s \geq 1/n } (s - 1/n)$, but there is no $n$ with $s \leq s - 1/n$.'
),
(
	'real_interval',
	'direct',
	FALSE,
	'Consider the strictly decreasing sequence $1/2^n$ for $n \geq 0$.'
),
(
	'real_interval',
	'inverse',
	FALSE,
	'Consider the strictly increasing sequence $1 - 1/2^n$ for $n \geq 0$.'
);