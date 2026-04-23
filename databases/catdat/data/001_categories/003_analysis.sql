INSERT INTO categories (
	id,
	name,
	notation,
	objects,
	morphisms,
	description,
	nlab_link,
	dual_category_id
)
VALUES
(
	'Ban',
	'category of Banach spaces with linear contractions',
	'$\Ban$',
	'Banach spaces over $\IC$',
	'linear contractions, i.e. linear maps of norm $\leq 1$',
	'The choice of morphisms is similar to that of $\Met$ which yields better categorical properties than continuous linear maps.',
	'https://ncatlab.org/nlab/show/Banach+space',
	NULL
),
(
	'SemiNormVect',
	'category of semi-normed vector spaces with linear contractions',
	'$\SemiNormVect$',
	'semi-normed vector spaces over $\IC$',
	'linear contractions, i.e. linear maps $f$ with $|f(x)| \leq |x|$',
	'In contrast to a norm, a semi-norm does not necessarily satisfy $|x|=0 \implies x=0$. In particular, every vector space $V$ yields a trivial semi-normed vector space $(V,0)$; and this construction yields a functor which is right adjoint to the forgetful functor $\SemiNormVect \to \Vect$.
	<br>The choice of morphisms is similar to that of $\PMet$ which yields better categorical properties than continuous linear maps.',
	NULL,
	NULL
),
(
	'NormVect',
	'category of normed vector spaces with linear contractions',
	'$\NormVect$',
	'normed vector spaces over $\IC$',
	'linear contractions, i.e. linear maps $f$ with $|f(x)| \leq |x|$',
	'The choice of morphisms is similar to that of $\Met$ which yields better categorical properties than continuous linear maps.',
	NULL,
	NULL
),
(
	'Meas',
	'category of measurable spaces',
	'$\Meas$',
	'measurable spaces',
	'measurable maps',
	'This is very similar to the category of topological spaces. Accordingly, limits and colimits can be constructed in the same way.',
	'https://ncatlab.org/nlab/show/Meas',
	NULL
),
(
	'Met',
	'category of metric spaces with non-expansive maps',
	'$\Met$',
	'metric spaces',
	'non-expansive maps $f$, meaning $d(f(x),f(y)) \leq d(x,y)$ for all $x,y$',
	'In contrast to continuous maps, which only refer to the induced topology, non-expansive maps are closer related to the metrics themselves. This category is badly-behaved, though, especially when compared with $\Met_{\infty}$.',
	'https://ncatlab.org/nlab/show/Met',
	NULL
),
(
	'PMet',
	'category of pseudo-metric spaces with non-expansive maps',
	'$\PMet$',
	'pseudo-metric spaces',
	'non-expansive maps $f$, meaning $d(f(x),f(y)) \leq d(x,y)$ for all $x,y$',
	'In contrast to metric spaces, we do not demand $d(x,y)=0 \implies x=y$ here.',
	NULL,
	NULL
),
(
	'Met_oo',
	'category of metric spaces with ∞ allowed',
	'$\Met_{\infty}$',
	'metric spaces, where the metric is allowed to assume the value $\infty$',
	'non-expansive maps $f$, meaning $d(f(x),f(y)) \leq d(x,y)$ for all $x,y$',
	'The fact that we allow $\infty$ means that universal constructions work much better when compared to $\Met$.',
	'https://ncatlab.org/nlab/show/Met',
	NULL
),
(
	'Met_c',
	'category of metric spaces with continuous maps',
	'$\Met_c$',
	'metric spaces',
	'continuous maps',
	'This category is equivalent to the subcategory of $\Top$ (or $\Haus$) that consists of metrizable topological spaces. Hence, the metrics only play a secondary role here.',
	'https://ncatlab.org/nlab/show/metrisable+topological+space',
	NULL
);