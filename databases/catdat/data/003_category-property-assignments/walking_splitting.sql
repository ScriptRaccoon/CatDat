INSERT INTO category_property_assignments (
	category_id,
	property_id,
	is_satisfied,
	reason
)
VALUES
(
	'walking_splitting',
	'finite',
	TRUE,
	'This is trivial.'
),
(
	'walking_splitting',
	'small',
	TRUE,
	'This is trivial.'
),
(
	'walking_splitting',
	'gaunt',
	TRUE,
	'This is obvious.'
),
(
	'walking_splitting',
	'pointed',
	TRUE,
	'The object $0$ is initial and terminal. This also means that $\mathrm{id}_0, i, p, ip$ are zero morphisms. The only non-zero morphism is $\mathrm{id}_1$.'
),
(
	'walking_splitting',
	'equalizers',
	TRUE,
	'The only parallel pair of non-equal morphisms is $\mathrm{id}_1, ip : 1 \rightrightarrows 1$, and their equalizer is $i$.'
),
(
	'walking_splitting',
	'self-dual',
	TRUE,
	'There is an isomorphism $\mathrm{Split}^\mathrm{op} \to \mathrm{Split}$ defined by $0 \mapsto 0$, $1 \mapsto 1$, $i \mapsto p$, $p \mapsto i$.'
),
(
	'walking_splitting',
	'normal',
	TRUE,
	'The only non-identity monomorphism is $i : 0 \to 1$, which is the kernel of $\mathrm{id}_1$.'
),
(
	'walking_splitting',
	'generator',
	TRUE,
	'The object $1$ a generator, since the only parallel pair of non-equal morphisms is $\mathrm{id}_1, ip : 1 \rightrightarrows 1$ with domain $1$.'
),
(
	'walking_splitting',
	'preadditive',
	TRUE,
	'We can define $\mathrm{id}_1 + \mathrm{id}_1 := ip$ (and it is clear how to add zero morphisms) and then verify that the axioms of a preadditive category hold. Alternatively, it suffices to find a preadditive category which is isomorphic to the walking splitting: Consider the full subcategory of $\mathbf{Vect}_{\mathbb{F}_2}$ that consists only of the trivial vector space $\{0\}$ and $\mathbb{F}_2$. Since $\mathbf{Vect}_{\mathbb{F}_2}$ is preadditive, it is preadditive as well. It has two objects, two identities, the morphisms $i : \{0\} \to \mathbb{F}_2$, $p : \mathbb{F}_2 \to \{0\}$, and the zero morphism $ip : \mathbb{F}_2 \to \mathbb{F}_2$. Clearly, $pi$ is the identity.'
),
(
	'walking_splitting',
	'sifted colimits',
	TRUE,
	'We work with the representation of the category as $\mathbf{Vect}^{\leq 1}_{\mathbb{F}_2}$, the category of vector spaces over $\mathbb{F}_2$ of dimension $\leq 1$. It suffices to show that it is closed under sifted colimits in $\mathbf{Vect}_{\mathbb{F}_2}$. More generally, we show this for $\mathbf{Vect}^{\leq d}_K \subseteq \mathbf{Vect}_K$, where $d \in \mathbb{N}$ and $K$ is a field. So let  $X : \mathcal{I} \to \mathbf{Vect}_K$ be a sifted diagram with colimit $(u_i : X_i \to X_\infty)_{i \in \mathcal{I}}$. Since $\mathcal{I}$ is sifted, for finitely many objects $i_1,\dotsc,i_n \in \mathcal{I}$ there is an object $k$ that admits morphisms $i_1 \to k, \dotsc, i_n \to k$; this is all we need to know about $\mathcal{I}$. Assume that each $X_i$ is of dimension $\leq d$, we need to show this for $X_\infty$ as well.<br>
	Every element in $X_\infty$ is a finite sum of elements of the form $u_i(x_i)$ with $x_i \in X_i$. Choose an object $k$ with morphisms $i \to k$ for every occurring $i$. If $y_i \in X_k$ denotes the image of $x_i$, we get $\sum_i u_i(x_i) = \sum_i u_k(y_i) = u_k(\sum_i y_i)$. Therefore, every element of $X_\infty$ has the form $u_i(x_i)$ for some $i \in \mathcal{I}$ and $x_i \in X_i$. Moreover, for finitely many elements in $X_\infty$ the index $i$ may be chosen uniformly.<br>
	Now, if $X_\infty$ has dimension $> d$, it would have linearly independent vectors $v_0,\dotsc,v_d$, all of which have a preimage in $X_i$ for some $i \in \mathcal{I}$. But then these preimages would be linearly independent as well, which contradicts $\dim(X_i) \leq d$.'
),
(
	'walking_splitting',
	'generalized variety',
	TRUE,
	'Again we work with $\mathbf{Vect}^{\leq 1}_{\mathbb{F}_2}$. We already know that it has sifted colimits and that the embedding to $\mathbf{Vect}_{\mathbb{F}_2}$ preserves them. The object $0$ is initial and hence strongly finitely presentable. The object $\mathbb{F}_2$ is strongly finitely presentable in $\mathbf{Vect}^{\leq 1}_{\mathbb{F}_2}$ since its hom-functor is the composition of the embedding and the forgetful functor $\mathbf{Vect}_{\mathbb{F}_2} \to \mathbf{Set}$, and the latter preserves sifted colimits by <a href="http://www.tac.mta.ca/tac/volumes/8/n3/8-03abs.html" target="_blank">[AR01, Lemma 3.3]</a> applied to $\mathbb{F}_2 \in \mathbf{Vect}_{\mathbb{F}_2}$.'
),
(
	'walking_splitting',
	'one-way',
	FALSE,
	'The morphism $ip : 1 \to 1$ provides a counterexample.'
);