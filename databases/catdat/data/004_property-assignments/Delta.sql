INSERT INTO category_property_assignments (
	category_id,
	property_id,
	is_satisfied,
	reason
)
VALUES
(
    'Delta',
    'skeletal',
    TRUE,
    'If $[n] \to [m]$ is a bijection, then $n+1 = m+1$ by comparing the sizes, hence $n=m$.'
),
(
    'Delta',
    'countable',
    TRUE,
    'This is obvious.'
),
(
    'Delta',
    'small',
    TRUE,
    'This is trivial.'
),
(
    'Delta',
    'terminal object',
    TRUE,
    'The ordered set $[0] = \{0\}$ is terminal.'
),
(
    'Delta',
    'strongly connected',
    TRUE,
    'For all $n,m$ there are morphisms $[n] \to [0] \to [m]$.'
),
(
	'Delta',
	'cogenerator',
	TRUE,
	'The ordered set $[1] = \{0 < 1\}$ is a cogenerator, even for <a href="/category/Pos">the category of posets</a>, see there for a proof.'
),
(
    'Delta',
    'coequalizers',
    TRUE,
    'Assume that $X \rightrightarrows Y$ are morphisms in $\mathbf{FinOrd} \setminus \{\varnothing\}$. Since <a href="/category/FinOrd">$\mathbf{FinOrd}$ has coequalizers</a>, we have a coequalizer $Y \to Q$. Since $Y$ is non-empty, $Q$ is non-empty as well, and clearly $Y \to Q$ is then also the coequalizer in $\mathbf{FinOrd} \setminus \{\varnothing\}$.'
),
(
    'Delta',
    'generator',
    TRUE,
    'The ordered set $[0] = \{0\}$ is a generator.'
),
(
    'Delta',
    'mono-regular',
    TRUE,
    'The <a href="/category/FinOrd">proof for $\mathbf{FinOrd}$</a> also works for $\mathbf{FinSet} \setminus \{\varnothing\}$.'
),
(
    'Delta',
    'epi-regular',
    TRUE,
    'The <a href="/category/FinOrd">proof for $\mathbf{FinOrd}$</a> also works for $\mathbf{FinSet} \setminus \{\varnothing\}$.'
),
(
    'Delta',
    'cosifted',
    TRUE,
    'Let $X,Y \in \Delta$. We may pick $x \in X$, $y \in Y$. Then there is a "point span" $X \xleftarrow{x} [0] \xrightarrow{y} Y$. Every span $X \xleftarrow{f} Z \xrightarrow{g} Y$ is connected to such a point span: Pick $z \in Z$. This defines a morphism of spans:
    <p>$\begin{array}{ccccc} X & \xleftarrow{f(z)} & [0] & \xrightarrow{g(z)} & Y \\ \parallel & & \phantom{{\footnotesize z}} \downarrow {\footnotesize z} && \parallel \\ X & \xleftarrow{f} & Z & \xrightarrow{g} & Z \end{array}$</p>
    It remains to show that all point spans are connected to each other. Assume $x_0,x_1 \in X$ and $y \in Y$, w.l.o.g. $x_0 \leq x_1$. Define the map $f : [1] \to X$ by $f(0) = x_0$, $f(1) = x_1$, and the map $g : [1] \to Y$ by $g(0)=g(1)=y$. They are order-preserving and fit into a zig-zag of spans:
    <p>$\begin{array}{ccccc} X & \xleftarrow{x_0} & [0] & \xrightarrow{y} & Y \\ \parallel && \phantom{ {\footnotesize 0}} \downarrow {\footnotesize 0} && \parallel \\ X & \xleftarrow{f} & [1] & \xrightarrow{g} & Y \\ \parallel && \phantom{ {\footnotesize 1}} \uparrow  {\footnotesize 1} && \parallel \\ X & \xleftarrow{x_1} & [0] & \xrightarrow{y} & Y \end{array}$</p>
    This shows that the choice of $x \in X$ does not matter, and for $y \in Y$ the proof is the same.'
),
(
    'Delta',
    'coquotients of cocongruences',
    TRUE,
    'Given a jointly epimorphic pair of maps $f, g : [m] \to [n]$, that means the union of the images is all of $[n]$.  Also, given the coreflexivity map $r : [n] \to [m]$ with $r \circ f = r \circ g = \operatorname{id}$, since $r$ is order-preserving, each of the fibers of $r$ must be a contiguous interval in $[n]$.  However, such a fiber $r^{-1}(\{ i \}) = \{ f(i), g(i) \}$.  In other words, we must have that $f(i)$ and $g(i)$ map to adjacent or equal elements for each $i \in [m]$.  Taking into consideration that the cosymmetry map $s : [n] \to [n]$ would have to swap the elements in the adjacent case, giving a contradiction to $s$ being order-preserving, we see that in fact $f = g$.  Therefore, $[m]$ is the equalizer of $f$ and $g$.'
),
(
    'Delta',
    'strict terminal object',
    FALSE,
    'This is trivial.'
),
(
    'Delta',
    'cofiltered',
    FALSE,
    'The two maps $d^0,d^1 : [0] \rightrightarrows [1]$ are not equalized by any morphism.'
),
(
    'Delta',
    'coreflexive equalizers',
    FALSE,
    'The two maps $d^0,d^1 : [0] \rightrightarrows [1]$ have a common left inverse, the unique map $s^0 : [1] \to [0]$, but are not equalized by any morphism.'
),
(
	'Delta',
	'binary powers',
	FALSE,
	'The <a href="/category/FinOrd">proof for $\mathbf{FinOrd}$</a> also works for $\mathbf{FinSet} \setminus \{\varnothing\}$: The forgetful functor to $\mathbf{Set}$ is representable, hence preserves all limits. Thus, if the power $\{0 < 1\} \times \{0 < 1\}$ exists in $\mathbf{FinOrd} \setminus \{\varnothing\}$, we may assume its underlying set is the cartesian product and the projection morphisms are the usual projection maps. Moreover, these maps are order-preserving. Since the result must be a total order, we have $(0,1) \leq (1,0)$ or $(1,0) \leq (0,1)$. In the first case, apply $p_2$ to get $1 \leq 0$, a contradiction. In the second case, use $p_1$ to get a contradiction.'
),
(
	'Delta',
	'binary copowers',
	FALSE,
	'The <a href="/category/FinOrd">proof for $\mathbf{FinOrd}$</a> also works for $\mathbf{FinSet} \setminus \{\varnothing\}$: Assume that the copower $1+1$, i.e. the coproduct of two terminal objects exists, denoted $\{x\}$ and $\{y\}$. If $x \leq y$ holds in the coproduct, then the universal property would imply this relation for all pairs of elements in any non-empty finite order, which is absurd. Otherwise, $y \leq x$ holds in the coproduct, which yields the same contradiction.'
),
(
    'Delta',
    'sequential colimits',
    FALSE,
    'We can just copy the <a href="/category/FinOrd">proof for $\mathbf{FinOrd}$</a> to show that the sequence of inclusions $[0] \hookrightarrow [1] \hookrightarrow [2] \hookrightarrow \cdots$ has no colimit.'
),
(
    'Delta',
    'sequential limits',
    FALSE,
    'We can just copy the <a href="/category/FinOrd">proof for $\mathbf{FinOrd}$</a> to show that the sequence of truncations $\cdots \twoheadrightarrow [2] \twoheadrightarrow [1] \twoheadrightarrow [0]$ has no limit.'
),
(
    'Delta',
    'essentially finite',
    FALSE,
    'The set $\mathbb{N}$ is not finite.'
),
(
    'Delta',
    'pushouts',
    FALSE,
    'Assume that the two inclusions $\{0 < 1\} \leftarrow \{0\} \rightarrow \{0 < 2\}$ have a pushout in $\mathbf{FinOrd} \setminus \{\varnothing\}$. This would be a universal non-empty finite ordered set $X$ with three elements $0,1,2$ satisfying $0 \leq 1$ and $0 \leq 2$. Assume w.l.o.g. $1 \leq 2$ (the case $2 \leq 1$ is similar). The universal property yields an order-preserving map $X \to \{a < b < c\}$ with $0 \mapsto a$, $1 \mapsto c$, $2 \mapsto b$. But then $c \leq b$, which is a contradiction.'
);
