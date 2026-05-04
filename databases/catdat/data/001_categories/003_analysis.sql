INSERT INTO categories (
	id,
	name,
	notation,
	objects,
	morphisms,
	description,
	nlab_link
)
VALUES
(
	'Ban',
	'category of Banach spaces with linear contractions',
	'$\Ban$',
	'Banach spaces over $\IC$',
	'linear contractions, i.e. linear maps of norm $\leq 1$',
	'The choice of morphisms is similar to that of $\Met$ which yields better categorical properties.',
	'https://ncatlab.org/nlab/show/Banach+space'
),
(
	'Meas',
	'category of measurable spaces',
	'$\Meas$',
	'measurable spaces',
	'measurable maps',
	'This is very similar to the category of topological spaces. Accordingly, limits and colimits can be constructed in the same way.',
	'https://ncatlab.org/nlab/show/Meas'
),
(
	'Met',
	'category of metric spaces with non-expansive maps',
	'$\Met$',
	'metric spaces',
	'non-expansive maps $f$, meaning $d(f(x),f(y)) \leq d(x,y)$ for all $x,y$',
	'In contrast to continuous maps, which only refer to the induced topology, non-expansive maps are closer related to the metrics themselves. This category is badly-behaved, though, especially when compared with $\Met_{\infty}$.',
	'https://ncatlab.org/nlab/show/Met'
),
(
	'PMet',
	'category of pseudo-metric spaces with non-expansive maps',
	'$\PMet$',
	'pseudo-metric spaces',
	'non-expansive maps $f$, meaning $d(f(x),f(y)) \leq d(x,y)$ for all $x,y$',
	'In contrast to metric spaces, we do not demand $d(x,y)=0 \implies x=y$ here.',
	NULL
),
(
	'Met_oo',
	'category of metric spaces with ∞ allowed',
	'$\Met_{\infty}$',
	'metric spaces, where the metric is allowed to assume the value $\infty$',
	'non-expansive maps $f$, meaning $d(f(x),f(y)) \leq d(x,y)$ for all $x,y$',
	'The fact that we allow $\infty$ means that universal constructions work much better when compared to $\Met$.',
	'https://ncatlab.org/nlab/show/Met'
),
(
	'Met_c',
	'category of metric spaces with continuous maps',
	'$\Met_c$',
	'metric spaces',
	'continuous maps',
	'This category is equivalent to the subcategory of $\Top$ (or $\Haus$) that consists of metrizable topological spaces. Hence, the metrics only play a secondary role here.',
	'https://ncatlab.org/nlab/show/metrisable+topological+space'
);