INSERT INTO category_property_assignments (
	category_id,
	property_id,
	is_satisfied,
	reason
)
VALUES
(
	'Z_div',
	'small',
	TRUE,
	'This is trivial.'
),
(
	'Z_div',
	'countable',
	TRUE,
	'This is trivial.'
),
(
	'Z_div',
	'products',
	TRUE,
	'Take the $\gcd$ of a subset. This also works for infinite sets, for example the $\gcd$ of all primes is $0$.'
),
(
	'Z_div',
	'distributive',
	TRUE,
	'We need to prove $\mathrm{lcm}_i \gcd(a, b_i) \cong \gcd(a, \mathrm{lcm}_i b_i)$ for finite families. If $x$ denotes the LHS and $y$ denotes the RHS, the relation $x \mid y$ is formal. If $v_p(-) : \mathbb{Z} \to \mathbb{N}_{\infty}$  denotes the multiplicity of a prime $p$, then $v_p(x)$ equals $\max_i \min(v_p(a),v_p(b_i))$, and $v_p(y)$ equals $\min(v_p(a), \max_i v_p(b_i))$. Since our family is finite, there is some $i_0$ with $\max_i v_p(b_i) = v_p(b_{i_0})$. Then $v_p(x) \geq \min(v_p(a),v_p(b_{i_0})) = v_p(y)$. This proves $y \mid x$.'
),
(
	'Z_div',
	'codistributive',
	TRUE,
	'We need to prove $\mathrm{lcm}(a, \gcd_i b_i) \cong \gcd_i \mathrm{lcm}(a,b_i)$ for finite families. This is clear for the empty family (both sides are $0$ then), so assume it is non-empty. If $x$ denotes the LHS and $y$ denotes the RHS, the relation $x \mid y$ is formal. If $v_p(-) : \mathbb{Z} \to \mathbb{N}_{\infty}$ denotes the multiplicity of a prime $p$, then $v_p(x)$ equals $\max(v_p(a), \min_i v_p(b_i))$, and $v_p(y)$ equals $\min_i \max(v_p(a), v_p(b_i))$. Choose some $i_0$ with $\min_i v_p(b_i) = v_p(b_{i_0})$. Then $v_p(x) = \max(v_p(a), v_p(b_{i_0})) \geq v_p(y)$.'
),
(
	'Z_div',
	'locally ℵ₁-presentable',
	TRUE,
	'Every $\aleph_1$-directed diagram is eventually constant.'
),
(
	'Z_div',
	'essentially finite',
	FALSE,
	'The non-negative integers are pairwise non-isomorphic in this category.'
),
(
	'Z_div',
	'skeletal',
	FALSE,
	'The integers $+1$ and $-1$ are isomorphic, but not equal.'
),
(
	'Z_div',
	'self-dual',
	FALSE,
	'The only integer with infinitely many divisors (up to isomorphism) is $0$. But many integers have infinitely many multiples (up to isomorphism).'
),
(
	'Z_div',
	'countably distributive',
	FALSE,
	'We have $2 \times \coprod_n 3^n = \gcd(2,\mathrm{lcm}_n(3^n)) = \gcd(2,0) = 2$, but $\coprod_n (2 \times 3^n) = \mathrm{lcm}_n \gcd(2,3^n) = \mathrm{lcm}_n 1  = 1$.'
),
(
	'Z_div',
	'countably codistributive',
	FALSE,
	'If $p$ runs through all odd primes, we have $2 \sqcup \prod_p p = \mathrm{lcm}(2,\mathrm{gcd}_p p) = \mathrm{lcm}(2,0) = 0$, but $\prod_p (2 \sqcup p) = \gcd_p (\mathrm{lcm}(2,p)) = \gcd_p (2 \cdot p) = 2$.'
);
