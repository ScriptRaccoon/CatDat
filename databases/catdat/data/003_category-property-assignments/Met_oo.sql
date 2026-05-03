INSERT INTO category_property_assignments (
	category_id,
	property_id,
	is_satisfied,
	reason
)
VALUES
(
	'Met_oo',
	'locally small',
	TRUE,
	'There is a forgetful functor $\Met_{\infty} \to \Set$ and $\Set$ is locally small.'
),
(
	'Met_oo',
	'generator',
	TRUE,
	'The singleton metric space $1$ is a generator, since morphisms $1 \to X$ correspond to the elements of $X$.'
),
(
	'Met_oo',
	'locally ℵ₁-presentable',
	TRUE,
	'Example 4.5 in <a href="https://arxiv.org/abs/1504.02660" target="_blank">this preprint</a>'
),
(
	'Met_oo',
	'cartesian filtered colimits',
	TRUE,
	'We can use the same proof as for the <a href="/category/Met">category of metric spaces</a> since the equation $\inf_i \max(r, s_i) = \max(r, \inf_i s_i)$ also holds for for $r, s_i \in \IR \cup \{\infty\}$.'
),
(
	'Met_oo',
	'infinitary extensive',
	TRUE,
	'[Sketch] Since $\Set$ is infinitary extensive, a map $f : Y \to \coprod_i X_i =: X$ corresponds to a decomposition $Y = \coprod_i Y_i$ (as sets) with maps $f_i : Y_i \to X_i$. Endow $Y_i$ with the restricted metric. If $f$ is non-expansive, each $f_i$ is non-expansive, and for $x_i \in Y_i$ and $i \neq j$ we have $d_Y(x_i,x_j) \geq d_X(f(x_i),f(x_j)) = \infty$, so that $Y = \coprod_i Y_i$ holds as metric spaces.'
),
(
	'Met_oo',
	'cogenerator',
	TRUE,
	'The proof is similar to $\Met$, a cogenerator is given by $\IR \cup \{\infty\}$ with the metric in which $d(a,\infty)=\infty$ for $a \in \IR$. Then one checks that the maps $d(a,-) : X \to \IR \cup \{\infty\}$ are non-expansive and finishes as for $\Met$.'
),
(
	'Met_oo',
	'semi-strongly connected',
	TRUE,
	'Every non-empty metric space is weakly terminal (by using constant maps).'
),
(
	'Met_oo',
	'balanced',
	FALSE,
	'The inclusion $\IQ \hookrightarrow \IR$ provides a counterexample. Alternatively, consider the identity map $(X,2d) \to (X,d)$ for any non-trivial metric space $(X,d)$.'
),
(
	'Met_oo',
	'cartesian closed',
	FALSE,
	'This is proven in <a href="https://math.stackexchange.com/questions/5131457" target="_blank">MSE/5131457</a>.'
),
(
	'Met_oo',
	'filtered-colimit-stable monomorphisms',
	FALSE,
	'We can copy the proof from the <a href="/category/Met">category of metric spaces</a>.'
),
(
	'Met_oo',
	'skeletal',
	FALSE,
	'This is trivial.'
),
(
	'Met_oo',
	'Malcev',
	FALSE,
	'Consider the metric subspace $\{(a,b) \in \IR^2 : a \leq b\}$ of $\IR^2$.'
),
(
	'Met_oo',
	'co-Malcev',
	FALSE,
	'See <a href="https://mathoverflow.net/questions/509552">MO/509552</a>: Consider the forgetful functor $U : \Met_{\infty} \to \Set$ and the relation $R \subseteq U^2$ defined by $R(X) := \{(a,b) \in U(X)^2 : d(x,y) \leq 1 \}$. Both are representable: $U$ by the singleton metric space and $R$ by the metric space $\{ 0,1 \}$ where $d(0,1) := 1$. It is clear that $R$ is reflexive, but not transitive.'
),
(
	'Met_oo',
	'cofiltered-limit-stable epimorphisms',
	FALSE,
	'We already know that $\Set$ does not have this property. Now apply the contrapositive of the dual of <a href="/lemma/filtered-monos">this lemma</a> to the functor $\Set \to \Met_{\infty}$ that equips a set with the discrete topology.'
),
(
	'Met_oo',
	'effective cocongruences',
	FALSE,
	'The same counterexample as for <a href="/category/Met">$\mathbf{Met}$</a> works here. The difference in this case is that a binary copower of two copies of $(0,1)$ does exist in $\mathbf{Met}_\infty$. However, this would assign a distance of $\infty$ between points in $(-1,0)$ and points in $(0,1)$, which does not agree with the chosen subspace metric on $(-1,0) \cup (0,1)$.'
);
