INSERT INTO category_property_assignments (
	category_id,
	property_id,
	is_satisfied,
	reason
)
VALUES
(
	'N_oo',
	'small',
	TRUE,
	'This is trivial.'
),
(
	'N_oo',
	'coproducts',
	TRUE,
	'Take the supremum.'
),
(
	'N_oo',
	'skeletal',
	TRUE,
	'The relation $\leq$ is antisymmetric.'
),
(
	'N_oo',
	'direct',
	TRUE,
	'This is because the natural numbers with $\infty$ with respect to $<$ are well-founded.'
),
(
	'N_oo',
	'infinitary distributive',
	TRUE,
	'We need to prove that $\sup_i \min(a,b_i) = \min(a, \sup_i b_i)$. The inequality $\leq$ is formal, we need to prove $\geq$. For the empty index set both sides are $0$. If $a = \infty$, both sides are $\sup_i b_i$. If the set $\{b_i\}$ is bounded, there is some $i_0$ with $b_{i_0} = \sup_i b_i$. Then $\sup_i \min(a,b_i) \geq \sup_i \min(a,b_{i_0}) =  \min(a, \sup_i b_i)$. If $a < \infty$ and the set $\{b_i\}$ is unbounded, there is some $i_0$ with $b_{i_0} > a$. Then $\sup_i \min(a,b_i) \geq \min(a,b_{i_0}) = a = \min(a,\infty) = \min(a, \sup_i b_i)$.'
),
(
	'N_oo',
	'locally strongly finitely presentable',
	TRUE,
	'Every natural number is strongly finitely presentable, and $\infty$ is the colimit of all $n < \infty$.'
),
(
	'N_oo',
	'infinitary codistributive',
	TRUE,
	'We need to prove $\max(a, \inf_i b_i) = \inf_i \max(a,b_i)$. The inequality $\leq$ is formal, we need to prove $\geq$. For the empty index set both sides are $\infty$. Otherwise, there is some $i_0$ with $b_{i_0} = \inf_i b_i$. Then $\max(a, \inf_i b_i) = \max(a, b_{i_0}) \geq   \inf_i \max(a,b_i)$.'
),
(
	'N_oo',
	'strongly connected',
	TRUE,
	'This is trivial.'
),
(
	'N_oo',
	'essentially finite',
	FALSE,
	'This is trivial.'
),
(
	'N_oo',
	'self-dual',
	FALSE,
	'This is because every upper set is infinite, but every lower set is finite.'
),
(
	'N_oo',
	'inverse',
	FALSE,
	'Consider the strictly increasing sequence $0 < 1 < 2 < \cdots$.'
);
