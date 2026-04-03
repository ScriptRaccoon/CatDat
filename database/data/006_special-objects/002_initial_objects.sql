CREATE TEMP TABLE initial_objects (
    category_id TEXT NOT NULL,
    description TEXT NOT NULL
);

INSERT INTO initial_objects (category_id, description)
VALUES
('1', 'the unique object'),
('Ab', 'trivial group'),
('Ab_fg', 'trivial group'),
('Alg(R)', '$R$'),
('Ban', 'trivial Banach space'),
('CAlg(R)', '$R$'),
('Cat', 'empty category'),
('CMon', 'trivial monoid'),
('CRing', 'ring of integers'),
('FI', 'empty set'),
('FinAb', 'trivial group'),
('FinOrd', 'empty ordered set'),
('FinSet', 'empty set'),
('FreeAb', 'trivial group'),
('Grp', 'trivial group'),
('Haus', 'empty space'),
('LRS', 'empty space'),
('M-Set', 'empty set with the unique action'),
('Man', 'empty manifold'),
('Meas', 'empty set with the unique $\sigma$-algebra'),
('Met', 'empty metric space'),
('Met_c', 'empty metric space'),
('Met_oo', 'empty metric space'),
('Mon', 'trivial monoid'),
('N', '$0$'),
('N_oo', '$0$'),
('On', '$0$'),
('Pos', 'empty poset'),
('Prost', 'empty proset'),
('R-Mod', 'trivial module'),
('R-Mod_div', 'trivial module'),
('real_interval', '$0$'),
('Rel', 'empty set'),
('Ring', 'ring of integers'),
('Rng', 'trivial ring'),
('Sch', 'empty scheme'),
('Set', 'empty set'),
('Set*', 'singleton pointed set'),
('SetxSet', '$(0,0)$'),
('Sh(X)', 'constant sheaf with value $\varnothing$, sending all non-empty open sets to $\varnothing$ and the empty set to a singleton'),
('Sh(X,Ab)', 'trivial abelian sheaf'),
('Sp', 'species $X$ with $X_n = \varnothing$'),
('sSet', 'simplicial set $X$ with $X_n = \varnothing$'),
('Top', 'empty space'),
('Top*', 'singleton space with the unique base point'),
('Vect', 'trivial vector space'),
('walking_commutative_square', '$a$'),
('walking_isomorphism', 'both objects'),
('walking_fork', '$0$'),
('walking_morphism', '$0$'),
('walking_span', '$0$'),
('Z', 'constant functor with value $\varnothing$'),
('Z_div', '$1$'),
('walking_composable_pair', '$0$');

INSERT INTO special_objects
	(category_id, description, type)
SELECT
	category_id, description, 'initial object'
FROM initial_objects;

DROP TABLE initial_objects;
