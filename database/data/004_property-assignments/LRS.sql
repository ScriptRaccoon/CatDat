INSERT INTO category_property_assignments (
	category_id,
	property_id,
	is_satisfied,
	reason
)
VALUES
(
	'LRS',
	'locally small',
	TRUE,
	'For two ringed spaces $(X,O_X), (Y,O_Y)$, the collection of morphisms $X \to Y$ of ringed spaces is the collection $\prod_{f \in \hom(X,Y)} \hom(O_Y,f_* O_X)$, which is a set since $\hom(X,Y)$ is a set and each $\hom(O_Y,f_* O_X)$ is a set.'
),
(
	'LRS',
	'complete',
	TRUE,
	'See <a href="https://arxiv.org/abs/1103.2139" target="_blank">Localization of ringed spaces</a> by W. Gillam. See also <a href="https://math.stackexchange.com/questions/1033675" target="_blank">MSE/1033675</a>.'
),
(
	'LRS',
	'cocomplete',
	TRUE,
	'See Demazure-Gabriel''s "Groupes algébriques", I. §1. 1.6. Specifically, the forgetful functor to ringed spaces preserves colimits, and colimits of ringed spaces are built from colimits of topological spaces and limits of commutative rings, see <a href="https://math.stackexchange.com/questions/1646202" target="_blank">MSE/1646202</a>.'
),
(
	'LRS',
	'well-powered',
	TRUE,
	'Let $f : X \to Y$ be a monomorphism of locally ringed spaces. I claim that $f$ is injective, from which the claim will follow. The diagonal $\Delta : X \to X \times_Y X$ is an isomorphism. By the explicit construction of fiber products, $X \times_Y X$ consists of triples $(x_1,x_2,\mathfrak{p})$ where $x_1,x_2 \in X$, $y := f(x_1) = f(x_2)$ and $\mathfrak{p}$ is a prime ideal in $k(x_1) \otimes_{k(y)} k(x_2)$. The map $\Delta$ is given by $\Delta(x) = \bigl(x,x,\ker(k(x) \otimes_{k(f(x))} k(x) \to k(x)\bigr)$, and it is bijective. This clearly implies that $f$ is injective (and that each tensor product $k(x) \otimes_{k(f(x))} k(x)$ has a unique prime ideal, namely the kernel mentioned).'
),
(
	'LRS',
	'well-copowered',
	TRUE,
	'It is enough to prove that every epimorphism of locally ringed spaces is surjective. The forgetful functor $\mathbf{LRS} \to \mathbf{RS}$ has a right adjoint (see <a href="https://arxiv.org/abs/1103.2139" target="_blank">Localization of ringed spaces</a> by W. Gillam), so it preserves epimorphisms. The forgetful functor $\mathbf{RS} \to \mathbf{Top}$ also has a right adjoint, namely $X \mapsto (X,\underline{\mathbb{Z}})$, so it also preserves epimorphisms.'
),
(
	'LRS',
	'infinitary extensive',
	TRUE,
	'[Sketch] Since $\mathbf{Top}$ is infinitary extensive, a morphism $f : Y \to \coprod_i X_i =: X$ yields a decomposition $Y = \coprod_i Y_i$ (as topological spaces) with continuous maps $f_i : Y_i \to X_i$. Endow the open subset $Y_i \subseteq Y$ with the restricted sheaf. Then each $f_i$ becomes a morphism of locally ringed spaces, and $Y = \coprod_i Y_i$ holds as locally ringed spaces.'
),
(
	'LRS',
	'strict terminal object',
	FALSE,
	'This is because $\mathbf{CRing}$ does not have a strict initial object.'
),
(
	'LRS',
	'balanced',
	FALSE,
	'The canonical morphism $\mathrm{Spec}(\mathbb{Z}/2 \times \mathbb{Z}[1/2]) \longrightarrow \mathrm{Spec}(\mathbb{Z})$ is a mono- and an epimorphism, but no isomorphism.'
),
(
	'LRS',
	'skeletal',
	FALSE,
	'This is trivial.'
),
(
	'LRS',
	'Malcev',
	FALSE,
	'This is because the category of schemes already is not Malcev.'
),
(
	'LRS',
	'strongly connected',
	FALSE,
	'This is because already the full subcategory of affine schemes is not strongly connected, see <a href="/category/CRing">the entry for $\mathbf{CRing}$</a>. Specifically, there is no morphism between $\mathrm{Spec}(\mathbb{F}_2)$ and $\mathrm{Spec}(\mathbb{F}_3)$.'
),
(
	'LRS',
	'co-Malcev',
	FALSE,
	'We can adjust the proof for <a href="/category/Top">$\mathbf{Top}$</a> (see <a href="https://mathoverflow.net/questions/509548" target="_blank">MO/509548</a>) as follows: Let $k$ be a field, $X$ be a singleton and $Y = \{u,v\}$ be the Sierpinski space where $\{u\}$ is open, but $\{v\}$ is not. Endow both with the sheaf of locally constant functions to $k$. Thus, $\mathcal{O}_X(X) = k$, $\mathcal{O}_Y(Y) = \mathcal{O}_Y(\{u\}) = k$. There is a canonical morphism $p : X + X \to Y$. It is a coreflexive corelation that is not cosymmetric.'
);
