INSERT INTO category_property_assignments (
	category_id,
	property_id,
	is_satisfied,
	reason
)
VALUES
(
	'Prost',
	'locally small',
	TRUE,
	'There is a forgetful functor $\Pos \to \Set$ and $\Set$ is locally small.'
),
(
	'Prost',
	'locally finitely presentable',
	TRUE,
	'The same proof as for $\Pos$ works, cf. <a href="https://ncatlab.org/nlab/show/Locally+Presentable+and+Accessible+Categories" target="_blank">Adamek-Rosicky</a>, Example 1.10.'
),
(
	'Prost',
	'generator',
	TRUE,
	'The singleton proset $1$ is a generator, since morphisms $1 \to P$ correspond to the elements of $P$.'
),
(
	'Prost',
	'cartesian closed',
	TRUE,
	'For prosets $P,Q$ we endow $\Hom(P,Q)$ with the preorder in which $f \leq g$ holds iff $f(p) \leq g(p)$ for all $p \in P$. The universal evaluation map is $\Hom(P,Q) \times P \to Q$, $(f,p) \mapsto f(p)$, it is order-preserving, and it satisfies the universal property.'
),
(
	'Prost',
	'cogenerator',
	TRUE,
	'Endow the set $\{ 0,1 \}$ with the preorder $0 \leq 1$, $1 \leq 0$ (which is not a partial order). Then every map $P \to \{0,1\}$ is order-preserving. Now the claim follows since the set $\{ 0,1 \}$ is a cogenerator in $\Set$.'
),
(
	'Prost',
	'infinitary extensive',
	TRUE,
	'[Sketch] Since $\Set$ is infinitary extensive, a map $f : P \to \coprod_i Q_i$ corresponds to a decomposition $P = \coprod_i P_i$ (as sets) with maps $f_i : P_i \to Q_i$. Endow $P_i$ with the induced order. If $f$ is order-preserving, the elements in different $P_i$ cannot be comparable (since their $f$-images are not comparable), so that $P = \coprod_i P_i$ as prosets, and each $f_i$ is order-preserving.'
),
(
	'Prost',
	'semi-strongly connected',
	TRUE,
	'Every non-empty proset is weakly terminal (by using constant maps).'
),
(
	'Prost',
	'coregular',
	TRUE,
	'See <a href="https://math.stackexchange.com/questions/5130295" target="_blank">MSE/5130295</a>.'
),
(
	'Prost',
	'regular subobject classifier',
	TRUE,
	'The set $\{0,1\}$ with the chaotic preorder $(0 \leq 1$, $1 \leq 0)$ is a regular subobject classifier since order-preserving maps $P \to \{0,1\}$ correspond to subsets of $P$.'	
),
(
	'Prost',
	'strict terminal object',
	FALSE,
	'This is trivial.'
),
(
	'Prost',
	'regular',
	FALSE,
	'See Example 3.14 at the <a href="https://ncatlab.org/nlab/show/regular+category" target="_blank">nLab</a>.'
),
(
	'Prost',
	'balanced',
	FALSE,
	'The inclusion $\{0,1\} \to \{0 < 1\}$ provides a counterexample (where in the domain there is no relation between $0$ and $1$).'
),
(
	'Prost',
	'skeletal',
	FALSE,
	'This is trivial.'
),
(
	'Prost',
	'Malcev',
	FALSE,
	'Consider the subproset $\{(a,b) : a \leq b \}$ of $\IN^2$.'
),
(
	'Prost',
	'co-Malcev',
	FALSE,
	'See <a href="https://mathoverflow.net/questions/509552">MO/509552</a>: Consider the forgetful functor $U : \Prost \to \Set$ and the relation $R \subseteq U^2$ defined by $R(A) := \{(a,b) \in U(A)^2 : a \leq b\}$. Both are representable: $U$ by the singleton preordered set and $R$ by $\{0 \leq 1 \}$. It is clear that $R$ is reflexive, but not symmetric.'
),
(
	'Prost',
	'cofiltered-limit-stable epimorphisms',
	FALSE,
	'We know that $\Set$ does not have this property. Now use the contrapositive of the dual of <a href="/lemma/filtered-monos">this lemma</a> applied to the functor $\Set \to \Prost$ that equips a set with the chaotic preorder.'
),
(
	'Prost',
	'effective cocongruences',
	FALSE,
	'Consider the proset $E := \{ a, b \}$ with the chaotic preorder. This represents the functor which sends a proset to the pairs of elements $x,y$ with $x \le y$ and $y \le x$. Therefore, it defines a cocongruence $1 \rightrightarrows E$, where the maps are the two possible functions. However, this cannot be effective: for any map $h : Z \to 1$ which equalizes the two functions, $Z$ must be empty. But that means the cokernel pair of $h$ is the two-element proset with the trivial preorder.'
);
