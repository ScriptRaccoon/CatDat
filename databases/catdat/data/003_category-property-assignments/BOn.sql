INSERT INTO category_property_assignments (
	category_id,
	property_id,
	is_satisfied,
	reason
)
VALUES
(
	'BOn',
	'strongly connected',
	TRUE,
	'This is trivial.'
),
(
	'BOn',
	'generator',
	TRUE,
	'There is just one object.'
),
(
	'BOn',
	'cogenerator',
	TRUE,
	'There is just one object.'
),
(
	'BOn',
	'left cancellative',
	TRUE,
	'It is well-known that ordinal addition satisfies $\alpha + \beta = \alpha + \gamma \implies \beta = \gamma$.'
),
(
	'BOn',
	'well-copowered',
	TRUE,
	'This follows from the description of epimorphisms as finite ordinals, see <a href="https://math.stackexchange.com/questions/5029605" target="_blank">MO/5029605</a>.'
),
(
	'BOn',
	'equalizers',
	TRUE,
	'See <a href="https://math.stackexchange.com/questions/5029668/" target="_blank">MSE/5029668</a>.'
),
(
	'BOn',
	'gaunt',
	TRUE,
	'This is because $0$ is the only ordinal number with an additive inverse.'
),
(
	'BOn',
	'cofiltered limits',
	TRUE,
	'See <a href="https://math.stackexchange.com/questions/5129138/" target="_blank">MSE/5129138</a>.'
),
(
	'BOn',
	'locally cartesian closed',
	TRUE,
	'The slice category $B\On / *$ is isomorphic to the poset $(\On,\geq)$ (not to $(\On,\leq)$). This category is thin and and semi-strongly connected, <a href="/category-implication/sequential_implies_lcc">hence</a> cartesian closed.'
),
(
	'BOn',
	'locally essentially small',
	FALSE,
	'This is because $\On$ is large.'
),
(
	'BOn',
	'initial object',
	FALSE,
	'This is trivial.'
),
(
	'BOn',
	'balanced',
	FALSE,
	'Every finite ordinal is both a mono- and an epimorphism (see below), but only $0$ is an isomorphism.'
),
(
	'BOn',
	'well-powered',
	FALSE,
	'This is because all ordinals are monomorphisms (see below) and they do not form a set.'
),
(
	'BOn',
	'sequential colimits',
	FALSE,
	'Assume that the sequence $\bullet \xrightarrow{1} \bullet \xrightarrow{1} \cdots$ has a colimit. This mounts to a (universal) sequence of ordinals $\alpha_n$ with $\alpha_n = \alpha_{n+1} + 1$. But then $\alpha_{n+1} < \alpha_n$, contradicting the fact that $\alpha_0$ is well-ordered.'
),
(
	'BOn',
	'pushouts',
	FALSE,
	'Assume that $1,\omega$ have a pushout. This is a (universal) pair of ordinals $\alpha,\beta$ with $\alpha + 1 = \beta + \omega$. But $\beta + \omega$ is a limit ordinal, while $\alpha + 1$ is not.'
),
(
	'BOn',
	'one-way',
	FALSE,
	'This is trivial.'
),
(
	'BOn',
	'cofiltered-limit-stable epimorphisms',
	FALSE,
	'The epimorphisms are the finite ordinals (see below), but the limit of the sequential diagram $\cdots \xrightarrow{1} * \xrightarrow{1} *$ is the ordinal $\omega$ by <a href="https://math.stackexchange.com/questions/5129138">MSE/5129138</a>.'
);