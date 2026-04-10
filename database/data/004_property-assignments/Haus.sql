INSERT INTO category_property_assignments (
	category_id,
	property_id,
	is_satisfied,
	reason
)
VALUES
(
	'Haus',
	'locally small',
	TRUE,
	'It is a full subcategory of $\mathbf{Top}$, which is locally small.'
),
(
    'Haus',
    'equalizers',
    TRUE,
    'This follows from the corresponding fact for $\mathbf{Top}$ since subspaces of Hausdorff spaces are again Hausdorff.'
),
(
    'Haus',
    'products',
    TRUE,
    'This follows from the corresponding fact for $\mathbf{Top}$ since products of Hausdorff spaces are again Hausdorff.'
),
(
    'Haus',
    'cocomplete',
    TRUE,
    'This follows since $\mathbf{Haus}$ is a reflective subcategory of $\mathbf{Top}$, which is cocomplete. For the reflector, see e.g. the <a href="https://ncatlab.org/nlab/show/Hausdorff+space#HausdorffReflection" target="_blank">nLab</a>. Explicitly, we construct the colimit of Hausdorff spaces by applying the reflector to the colimit of the underlying topological spaces.'
),
(
    'Haus',
    'infinitary extensive',
    TRUE,
    'This follows exactly as for $\mathbf{Top}$ since Hausdorff spaces are closed under taking subspaces and coproducts in $\mathbf{Top}$.'
),
(
	'Haus',
	'well-powered',
	TRUE,
	'This is clear from the classification of monomorphisms as injective continuous maps.'
),
(
	'Haus',
	'well-copowered',
	TRUE,
	'Every epimorphism has dense image, so it suffices to prove that if a Hausdorff space $X$ has a dense subset $D \subseteq X$, we can bound the cardinality of $X$ in terms of the cardinality of $D$. For $x \in X$ let $\alpha(x)$ be the set of all $U \cap D$, where $U$ is an open neighborhood of $x$. This defines a map $\alpha : X \to P(P(D))$, and we claim that it is injective: this is because $\{x\}$ is the intersection of all $\overline{U} = \overline{U \cap D}$, where $U$ runs through the open neighborhoods of $x$.'
),
(
	'Haus',
	'generator',
	TRUE,
	'The one-point space is a generator since it represents the forgetful functor $\mathbf{Haus} \to \mathbf{Set}$.'
),
(
	'Haus',
	'semi-strongly connected',
	TRUE,
	'Every non-empty Hausdorff space is weakly terminal (by using constant maps).'
),
(
    'Haus',
    'co-Malcev',
    TRUE,
    'See <a href="https://mathoverflow.net/a/509582/2841" target="_blank">MO/509548</a>.'
),
(
	'Haus',
	'cartesian closed',
	FALSE,
	'It is shown in <a href="https://math.stackexchange.com/questions/1255678">MSE/1255678</a> that $\mathbb{Q} \times - : \mathbf{Top} \to \mathbf{Top}$ does not preserve sequential colimits (so that it cannot be a left adjoint). The same example also works in $\mathbf{Haus}$: Surely $\mathbb{Q}$ is Hausdorff, $X_n$ is Hausdorff, as is their colimit $X$, and the colimit (taken in $\mathbf{Top}$) of the $X_n \times \mathbb{Q}$ admits a bijective continuous map to a Hausdorff space, therefore is also Hausdorff, meaning it is also the colimit taken in $\mathbf{Haus}$.'
),
(
	'Haus',
	'balanced',
	FALSE,
	'The inclusion $\mathbb{Q} \hookrightarrow \mathbb{R}$ is a counterexample; it is an epimorphism since $\mathbb{Q}$ is dense in $\mathbb{R}$.'
),
(
	'Haus',
	'skeletal',
	FALSE,
	'This is trivial.'
),
(
	'Haus',
	'Malcev',
	FALSE,
	'This is clear since $\mathbf{Set}$ is not Malcev and can be interpreted as the subcategory of discrete spaces (which are Hausdorff).'
),
(
	'Haus',
	'regular subobject classifier',
	FALSE,
	'Assume that there is a regular subobject classifier $\Omega$. By the classification of regular monomorphisms, we would have an isomorphism between $\mathrm{Hom}(X,\Omega)$ and the set of closed subsets of $X$ for any Hausdorff space $X$. If we take $X = 1$ we see that $\Omega$ has two points. Since $\Omega$ is Hausdorff, $\Omega \cong 1 + 1$ must be discrete. But then $\mathrm{Hom}(X,\Omega)$ is isomorphic to the set of all clopen subsets of $X$, of which there are usually far fewer than closed subsets (consider $X = [0,1]$).'
);
