CREATE TEMP TABLE coproducts (
    category_id TEXT NOT NULL,
    description TEXT NOT NULL
);

INSERT INTO coproducts (category_id, description)
VALUES
---------------------------------------------------------------
-- all coproducts
---------------------------------------------------------------
('1', '$0 \sqcup 0 = 0$'),
('Ab', 'direct sums'),
('Alg(R)', 'see <a href="https://math.stackexchange.com/questions/625874" target="_blank">MSE/625874</a>'),
('Ban', 'The coproduct of a family of Banach spaces $(B_i)$ is the subspace $\bigl\{x \in \prod_i B_i : \sum_i |x_i| < \infty\bigr\}$ equipped with the $1$-norm $|x| := \sum_i |x_i|$.'),
('CAlg(R)', 'tensor products over $R$'),
('Cat', 'disjoint unions'),
('CMon', 'direct sums'),
('CRing', 'tensor products over $\mathbb{Z}$'),
('FreeAb', 'direct sums'),
('Grp', 'free products'),
('Haus', 'disjoint union with the disjoint union topology'),
('LRS', 'disjoint union with the product sheaf'),
('M-Set', 'disjoint union with obvious $M$-action'),
('Meas', 'disjoint union with the obvious $\sigma$-algebra'),
('Met_c', 'Given metric spaces $(X_i,d_i)$ with $d_i \leq 1$ w.l.o.g, we endow the disjoint union $\coprod_i X_i$ with the metric $d$ that extends the metrics $d_i$ and satisfies $d(x,y) = 1$ when $x,y$ are in different $X_i$.'),
('Met_oo', 'disjoint union with the metric that extends the given ones and gives points in different spaces the distance $\infty$'),
('Mon', 'free products'),
('N_oo', 'supremum'),
('On', 'supremum'),
('Pos', 'disjoint union with the obvious partial order that leaves the distinct summands incomparable'),
('Prost', 'disjoint union with the obvious preorder that leaves the distinct summands incomparable'),
('R-Mod', 'direct sums'),
('R-Mod_div', 'direct sums'),
('real_interval', 'supremum'),
('Rel', 'disjoint union'),
('Ring', 'see <a href="https://math.stackexchange.com/questions/625874" target="_blank">MSE/625874</a>'),
('Rng', 'see <a href="https://math.stackexchange.com/questions/4975797" target="_blank">MSE/4975797</a>'),
('Sch', 'disjoint union with the product sheaf'),
('Set', 'disjoint union'),
('Set*', 'wedge sum, aka one-point union'),
('SetxSet', 'component-wise disjoint union'),
('Sh(X)', 'associated sheaf to the section-wise disjoint union'),
('Sh(X,Ab)', 'associated sheaf to the section-wise direct sum'),
('sSet', 'pointwise disjoint union'),
('Top', 'disjoint union with the disjoint union topology'),
('Top*', 'wedge sum, aka one-point union'),
('TorsFreeAb', 'direct sums'),
('Vect', 'direct sums'),
('walking_commutative_square', '$b \sqcup c = d$, $a \sqcup x = x$, $d \sqcup x = d$, $x \sqcup x = x$'),
('walking_isomorphism', '$0 \sqcup 0 = 0$'),
('walking_morphism', '$0 \sqcup x = x$, $1 \sqcup x = 1$'),
('walking_composable_pair', 'supremum taken in $\{0 < 1 < 2\}$'),
('Z', 'pointwise disjoint union'),
('Z_div', 'the least common multiple, can be $0$ for infinite families'),

---------------------------------------------------------------
-- only finite and countable coproducts
---------------------------------------------------------------
('Sp', '[finite case] pointwise finite disjoint union'),
('FinAb', '[finite case] direct sum'),
('FinSet', '[finite case] disjoint union'),
('Ab_fg', '[finite case] direct sum'),
('Man', '[countable case] disjoint union with the disjoint union topology and the obvious charts'),
('N', '[finite case] supremum'),
('Set_c', '[countable case] disjoint union'),
('Set_f', '[finite case] disjoint union');

INSERT INTO special_objects
	(category_id, description, type)
SELECT
	category_id, description, 'coproducts'
FROM coproducts;

DROP TABLE coproducts;
