CREATE TEMP TABLE products (
    category_id TEXT NOT NULL,
    description TEXT NOT NULL
);

INSERT INTO products (category_id, description)
VALUES
---------------------------------------------------------------
-- all products
---------------------------------------------------------------
('1', '$0 \times 0$'),
('Ab', 'direct products with pointwise operations'),
('Alg(R)', 'direct products with pointwise operations'),
('Ban', 'direct products with the $\sup$-norm'),
('CAlg(R)', 'direct products with pointwise operations'),
('Cat', 'direct products with pointwise operations'),
('CMon', 'direct products with pointwise operations'),
('CRing', 'direct products with pointwise operations'),
('Grp', 'direct products with pointwise operations'),
('Haus', 'direct product with the <a href="https://en.wikipedia.org/wiki/Product_topology" target="_blank">product topology</a>'),
('LRS', 'See <a href="https://arxiv.org/abs/1103.2139" target="_blank">Localization of ringed spaces</a> by W. Gillam. See also <a href="https://math.stackexchange.com/questions/1033675" target="_blank">MSE/1033675</a>.'),
('M-Set', 'direct products with the evident $M$-action'),
('Meas', 'direct products with the <a href="https://de.wikipedia.org/wiki/Produkt-%CF%83-Algebra" target="_blank">product $\sigma$-algebra</a>'),
('Met_oo', 'direct products with the metric $d(x,y) = \sup_i d_i(x_i,y_i)$'),
('Mon', 'direct products with pointwise operations'),
('N_oo', 'infimum'),
('Pos', 'direct products with the evident partial order'),
('Prost', 'direct products with the evident preorder'),
('R-Mod', 'direct products with pointwise operations'),
('R-Mod_div', 'direct products with pointwise operations'),
('real_interval', 'infimum'),
('Rel', 'disjoint unions (!)'),
('Ring', 'direct products with pointwise operations'),
('Rng', 'direct products with pointwise operations'),
('Set', 'direct products with pointwise operations'),
('Set*', 'direct products with pointwise operations'),
('Setne', 'direct products'),
('SetxSet', 'component-wise direct product'),
('Sh(X)', 'section-wise defined direct product'),
('Sh(X,Ab)', 'section-wise defined direct product'),
('sSet', 'pointwise defined direct product'),
('Top', 'direct product with the <a href="https://en.wikipedia.org/wiki/Product_topology" target="_blank">product topology</a>'),
('Top*', 'direct product with the <a href="https://en.wikipedia.org/wiki/Product_topology" target="_blank">product topology</a> and the obvious base point'),
('TorsFreeAb', 'direct products'),
('Vect', 'direct products with pointwise operations'),
('walking_commutative_square', '$b \times c = a$, $x \times x = x$, $a \times x = a$, $d \times x = x$'),
('walking_isomorphism', '$0 \times 0 = 0$'),
('walking_morphism', '$0 \times x = 0$, $1 \times x = x$'),
('walking_composable_pair', 'infimum taken in $\{0 < 1 < 2\}$'),
('Z', 'pointwise defined direct product'),
('Z_div', 'greatest common divisor'),

---------------------------------------------------------------
-- only finite and countable products
---------------------------------------------------------------
('Sp', '[finite case] pointwise defined direct product'),
('FinAb', '[finite case] direct products with pointwise operations'),
('FinGrp', '[finite case] direct products with pointwise operations'),
('FinOrd', '[finite case] direct products with the evident order'),
('FinSet', '[finite case] direct products'),
('Ab_fg', '[finite case] direct products'),
('FreeAb', '[finite case] direct sums'),
('Set_c', '[finite case] direct products'),
('Met_c', '[countable case] In the finite case, take direct products with the metric $d(x,y) = \sup_i d_i(x_i,y_i)$, but other metrics such as $d(x,y) = \sum_i d_i(x_i,y_i)$ also work. In the countable case, one can assume $d_i \leq 1$ and then define $d(x,y) = \sum_i d_i(x,y) / 2^i$.'),
('Met', '[finite case] direct products with the metric $d(x,y) = \sup_i d_i(x_i,y_i)$'),
('PMet', '[finite case] direct products with the pseudo-metric $d(x,y) = \sup_i d_i(x_i,y_i)$'),
('Sch', '[finite case] The idea is to use $\mathrm{Spec}(A) \times \mathrm{Spec}(B) = \mathrm{Spec}(A \otimes B)$ and then to glue affine pieces together. See EGA I, Chap. I, Thm. 3.2.1.'),
('Man', '[finite case] direct products $X \times Y$ with the product topology and the charts $\mathbb{R}^{n + m} = \mathbb{R}^n \times \mathbb{R}^m \cong U \times V \hookrightarrow X \times Y$ for charts $\mathbb{R}^n \cong U \hookrightarrow X$ and $\mathbb{R}^m \cong V \hookrightarrow Y$'),
('walking_span', '[binary case] $1 \times 2 = 0$, $x \times x = x$, $0 \times x = 0$');

INSERT INTO special_objects
	(category_id, description, type)
SELECT
	category_id, description, 'products'
FROM products;

DROP TABLE products;
