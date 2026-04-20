CREATE TEMP TABLE terminal_objects (
    category_id TEXT NOT NULL,
    description TEXT NOT NULL
);

INSERT INTO terminal_objects (category_id, description)
VALUES
('1', 'the unique object'),
('Ab', 'trivial group'),
('Ab_fg', 'trivial group'),
('Alg(R)', 'trivial algebra'),
('Ban', 'trivial Banach space'),
('CAlg(R)', 'trivial algebra'),
('Cat', '<a href="/category/1">trivial category</a>'),
('CMon', 'trivial monoid'),
('CRing', 'zero ring'),
('FinAb', 'trivial group'),
('FinGrp', 'trivial group'),
('FinOrd', 'singleton ordered set'),
('FinSet', 'singleton set'),
('FreeAb', 'trivial group'),
('Grp', 'trivial group'),
('Haus', 'singleton space'),
('LRS', '$\mathrm{Spec}(\mathbb{Z})$'),
('M-Set', 'singleton set with the unique action'),
('Man', 'singleton manifold of dimension $0$'),
('Meas', 'singleton set with the unique $\sigma$-algebra'),
('Met', 'singleton space'),
('Met_c', 'singleton space'),
('Met_oo', 'singleton space'),
('Mon', 'trivial monoid'),
('N_oo', '$\infty$'),
('PMet', 'singleton space'),
('Pos', 'singleton poset'),
('Prost', 'singleton proset'),
('R-Mod', 'zero module'),
('R-Mod_div', 'zero module'),
('real_interval', '$1$'),
('Rel', 'empty set'),
('Ring', 'zero ring'),
('Rng', 'zero ring'),
('Sch', '$\mathrm{Spec}(\mathbb{Z})$'),
('Set_c', 'singleton set'),
('Set', 'singleton set'),
('Set*', 'singleton pointed set'),
('Setne', 'singleton set'),
('SetxSet', '$(1,1)$'),
('Sh(X)', 'constant sheaf with value a singleton'),
('Sh(X,Ab)', 'trivial abelian sheaf'),
('Sp', 'species $X$ with $X_n = 1$'),
('sSet', 'simplicial set $X$ with $X_n = 1$'),
('Top', 'singleton space'),
('Top*', 'singleton space with the unique base point'),
('Vect', 'trivial vector space'),
('walking_commutative_square', '$d$'),
('walking_isomorphism', 'both objects'),
('walking_morphism', '$1$'),
('Z', 'constant functor with value $1$'),
('Z_div', '$0$'),
('walking_composable_pair', '$2$');

INSERT INTO special_objects
	(category_id, description, type)
SELECT
	category_id, description, 'terminal object'
FROM terminal_objects;

DROP TABLE terminal_objects;
