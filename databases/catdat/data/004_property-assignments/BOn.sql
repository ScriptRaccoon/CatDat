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
	'skeletal',
	TRUE,
	'There is just one object.'
),
(
	'BOn',
	'pullbacks',
	TRUE,
	'If $\alpha,\beta$ are ordinals, w.l.o.g. $\alpha \leq \beta$, choose $\delta$ with $\beta = \alpha + \delta$. Then the pair $\delta,0$ is a pullback of $\alpha,\beta$: We have $\alpha + \delta = \beta + 0$, and if $\epsilon_1,\,\epsilon_2$ is a pair of ordinals with $\alpha + \epsilon_1 = \beta + \epsilon_2$, we may cancel $\alpha$ to get $\epsilon_1 = \delta + \epsilon_2$, so that the pair factors as $\delta + \epsilon_2,\, 0 + \epsilon_2$.'
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
	'The slice category $B\mathbf{On} / *$ is isomorphic to the poset $(\mathbf{On},\geq)$ (not to $(\mathbf{On},\leq)$). This category is thin and and semi-strongly connected, <a href="/category-implication/sequential_implies_lcc">hence</a> cartesian closed.'
),
(
	'BOn',
	'locally essentially small',
	FALSE,
	'This is because $\mathbf{On}$ is large.'
),
(
	'BOn',
	'initial object',
	FALSE,
	'This is trivial.'
),
(
	'BOn',
	'terminal object',
	FALSE,
	'This is trivial.'
),
(
	'BOn',
	'right cancellative',
	FALSE,
	'Since $1 + \omega = 0 + \omega$, the ordinal $\omega$ is not an epimorphism. In fact, the epimorphisms are exactly the finite ordinals (see below).'
),
(
	'BOn',
	'balanced',
	FALSE,
	'Every finite ordinal is both a mono- and an epimorphism (see below), but only $0$ is an isomorphism.'
),
(
	'BOn',
	'binary powers',
	FALSE,
	'Assume that the unique object has a product with itself. This amounts to a pair of ordinals $\pi_1,\pi_2$ such that for every pair of ordinals $\alpha_1,\alpha_2$ there is a unique ordinal $\tau$ with $\pi_i + \tau = \alpha_i$ for $i = 1,2$. Applying this to $\alpha_i = 0$ we get $\pi_i = 0$. Now we get a contradiction for any distinct $\alpha_1,\alpha_2$.'
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