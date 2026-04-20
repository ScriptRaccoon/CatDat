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
	'small',
	TRUE,
	'This is trivial.'
),
(
	'walking_fork',
	'semi-strongly connected',
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
	'cofiltered-limit-stable epimorphisms',
	TRUE,
	'Let $(X_p)$ and $(Y_p)$ be diagrams in the walking fork indexed by a cofiltered poset $P$. Let $(X_p \to Y_p)_{p \in P}$ be compatible epimorphisms, we need to show that $\lim_p X_p \to \lim_p Y_p$ is an epimorphism as well. Assume it is not. The only non-epimorphism is $i : 0 \to 1$. Hence, $\lim_p X_p = 0$ and $\lim_p Y_p = 1$. So for every $p$ there is a morphism $1 \to Y_p$, meaning $Y_p \in \{1,2\}$. If $Y_p = 2$ for all $p$, the transition morphisms between them must be identities, so that $\lim_p Y_p = 2$, a contradiction. Choose $p$ with $Y_p = 1$. Then for all $q \leq p$ the morphism $Y_q \to Y_p$ shows that $Y_q = 1$ as well. Since $X_q \to Y_q = 1$ is an epimorphism by assumption, it cannot be $i : 0 \to 1$, and we see that $X_q = 1$. Then the transitions between the $X_q$ are identities, and we get the contradiction $\lim_p X_p = \lim_q X_q = 1$.'
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
	'binary powers',
	FALSE,
	'Assume that $X := 2 \times 2$ exists. Since there is a diagonal morphism $2 \to X$, we must have $X = 2$, and the two projections $p_1,p_2 : X \rightrightarrows 2$ must be equal to the identity. But $f,g$ induce a morphism $(f,g) : 1 \to X$ with $p_1 (f,g) = f$ and $p_2 (f,g) = g$, so that $f=g$, a contradiction.'
),
(
	'walking_fork',
	'strongly connected',
	FALSE,
	'There is no morphism $1 \to 0$.'
);