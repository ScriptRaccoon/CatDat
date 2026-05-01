INSERT INTO category_property_assignments (
	category_id,
	property_id,
	is_satisfied,
	reason
)
VALUES
(
	'J2',
	'locally small',
	TRUE,
	'This is trivial.'
),
(
	'J2',
	'finitary algebraic',
	TRUE,
	'The structure of a Jónsson-Tarski algebra on a set $X$ is equivalent to one binary operation $\mu : X^2 \to X$ and two unary operations $\lambda, \rho : X \rightrightarrows X$ such that $\mu(\lambda(x),\rho(x)) = x$, $\lambda(\mu(x,y))=x$, and $\rho(\mu(x,y))=y$.'
),
(
	'J2',
	'Grothendieck topos',
	TRUE,
	'See the <a href="https://ncatlab.org/nlab/show/J%C3%B3nsson-Tarski+topos" target="_blank">nLab</a>.'
),
(
	'J2',
	'skeletal',
	FALSE,
	'This is trivial.'
),
(
	'J2',
	'semi-strongly connected',
	FALSE,
	'There is a bijection $\alpha = (\lambda,\rho) : \mathbb{N} \to \mathbb{N} \times \mathbb{N}$ such that $\lambda$ has a fixed point, but $\rho$ does not (see below). Then the isomorphism $\beta := (\rho,\lambda)$ has the opposite property. There cannot be any morphism $(\mathbb{N},\alpha) \to (\mathbb{N},\beta)$, as it would map the fixed point of $\lambda$ to a fixed point of $\rho$, and likewise there is no morphism $(\mathbb{N},\beta) \to (\mathbb{N},\alpha)$.<br>
	To construct $\alpha$ or rather $\alpha^{-1} : \mathbb{N} \times \mathbb{N} \to \mathbb{N}$, we can alter the standard bijection $(n,m) \mapsto 2^n (2m+1) - 1$ as follows:
	$$\alpha^{-1}(n,m) = \begin{cases} 2 & (n,m) = (0,0) \\ 0 & (n,m) = (0,1) \\ 2^n (2m+1) - 1 & \text{otherwise} \end{cases}$$
	Then $\alpha(0)=(0,1)$, i.e. $\lambda(0)=0$. The function $\rho$ has no fixed point, i.e. $\alpha^{-1}(n,m) \neq m$ for all $n,m$. Namely, if $(n,m)=(0,0)$, then $\alpha^{-1}(n,m)=2 \neq m$. If $(n,m)=(0,1)$, then $\alpha^{-1}(n,m)=0 \neq m$. Otherwise,
	$$\alpha^{-1}(n,m) = 2^n (2m+1) - 1 \geq (2m+1)-1 = 2m \geq m,$$
	and equality can only hold if $m=0$ and $n=0$, which we already excluded.'
);