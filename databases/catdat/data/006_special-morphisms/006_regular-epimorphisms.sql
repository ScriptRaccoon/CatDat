CREATE TEMP TABLE regular_epimorphisms (
    category_id TEXT NOT NULL,
    description TEXT NOT NULL,
	reason TEXT NOT NULL
);

INSERT INTO regular_epimorphisms (
	category_id,
	description,
	reason
)
VALUES
(
    '0',
    'same as epimorphisms',
    'This is because the category is epi-regular.'
),    
(
    '1',
    'same as epimorphisms',
    'This is because the category is epi-regular.'
),    
(
    '2',
    'same as epimorphisms',
    'This is because the category is epi-regular.'
),    
(
    'Ab',
    'same as epimorphisms',
    'This is because the category is epi-regular.'
),    
(
    'Ab_fg',
    'same as epimorphisms',
    'This is because the category is epi-regular.'
),    
(
    'Alg(R)',
    'surjective homomorphisms',
    'This holds in every finitary algebraic category.'
),    
(
    'B',
    'same as epimorphisms',
    'This is because the category is epi-regular.'
),    
(
    'BG_c',
    'same as isomorphisms',
    'This is because the category is left cancellative.'
),    
(
    'BG_f',
    'same as isomorphisms',
    'This is because the category is left cancellative.'
),    
(
    'BN',
    'same as isomorphisms',
    'This is because the category is left cancellative.'
),    
(
    'BOn',
    'same as isomorphisms',
    'This is because the category is left cancellative.'
),    
(
    'CAlg(R)',
    'surjective homomorphisms',
    'This holds in every finitary algebraic category.'
), 
(
    'CMon',
    'surjective homomorphisms',
    'This holds in every finitary algebraic category.'
),    
(
    'CRing',
    'surjective homomorphisms',
    'This holds in every finitary algebraic category.'
),    
(
    'Delta',
    'same as epimorphisms',
    'This is because the category is epi-regular.'
), 
(
    'FI',
    'same as epimorphisms',
    'This is because the category is epi-regular.'
),    
(
    'FinAb',
    'same as epimorphisms',
    'This is because the category is epi-regular.'
),
(
    'FinGrp',
    'same as epimorphisms',
    'This is because the category is epi-regular.'
),     
(
    'FinOrd',
    'same as epimorphisms',
    'This is because the category is epi-regular.'
),    
(
    'FinSet',
    'same as epimorphisms',
    'This is because the category is epi-regular.'
),    
(
    'Fld',
    'same as isomorphisms',
    'This is because the category is left cancellative.'
),
(
    'FS',
    'same as epimorphisms',
    'This is because the category is epi-regular.'
),    
(
    'Grp',
    'surjective homomorphisms',
    'This holds in every finitary algebraic category.'
),
(
    'M-Set',
    'surjective homomorphisms',
    'This holds in every finitary algebraic category.'
),
(
    'Mon',
    'surjective homomorphisms',
    'This holds in every finitary algebraic category.'
),    
(
    'N',
    'same as isomorphisms',
    'This is because the category is left cancellative.'
),    
(
    'N_oo',
    'same as isomorphisms',
    'This is because the category is left cancellative.'
),    
(
    'On',
    'same as isomorphisms',
    'This is because the category is left cancellative.'
),
(
    'R-Mod',
    'surjective homomorphisms',
    'This holds in every finitary algebraic category.'
),    
(
    'R-Mod_div',
    'surjective homomorphisms',
    'This holds in every finitary algebraic category.'
),    
(
    'real_interval',
    'same as isomorphisms',
    'This is because the category is left cancellative.'
),
(
    'Ring',
    'surjective homomorphisms',
    'This holds in every finitary algebraic category.'
),    
(
    'Rng',
    'surjective homomorphisms',
    'This holds in every finitary algebraic category.'
), 
(
    'Set_c',
    'same as epimorphisms',
    'This is because the category is epi-regular.'
), 
(
    'Set_f',
    'same as epimorphisms',
    'This is because the category is epi-regular.'
), 
(
    'Set',
    'surjective homomorphisms',
    'This holds in every finitary algebraic category.'
),    
(
    'Set*',
    'surjective homomorphisms',
    'This holds in every finitary algebraic category.'
),    
(
    'Setne',
    'same as epimorphisms',
    'This is because the category is epi-regular.'
),   
(
    'SetxSet',
    'same as epimorphisms',
    'This is because the category is epi-regular.'
),     
(
    'Sh(X)',
    'same as epimorphisms',
    'This is because the category is epi-regular.'
),    
(
    'Sh(X,Ab)',
    'same as epimorphisms',
    'This is because the category is epi-regular.'
),    
(
    'Sp',
    'same as epimorphisms',
    'This is because the category is epi-regular.'
),    
(
    'sSet',
    'same as epimorphisms',
    'This is because the category is epi-regular.'
),    
(
    'Top',
    'surjective quotient maps',
    'Regular epimorphisms are surjective quotient maps by the explicit construction of coequalizers. Conversely, if $q : X \to Y$ is a surjective quotient map, then one checks that $q$ is the coequalizer of its kernel pair $X \times_Y X \rightrightarrows X$: This is true for the underlying sets, and continuity of the induced morphism follows since $q$ is a quotient map.' 
),
(
    'Top*',
    'surjective pointed quotient maps',
    'Regular epimorphisms are surjective pointed quotient maps by the explicit construction of coequalizers. Conversely, if $q : X \to Y$ is a surjective pointed quotient map, then one checks that $q$ is the coequalizer of its kernel pair $X \times_Y X \rightrightarrows X$: This is true for the underlying pointed sets, and continuity of the induced morphism follows since $q$ is a quotient map.' 
),
(
    'Vect',
    'surjective homomorphisms',
    'This holds in every finitary algebraic category.'
),    
(
	'walking_commutative_square',
	'same as isomorphisms',
    'This is because the category is left cancellative.'
),
(
    'walking_composable_pair',
    'same as isomorphisms',
    'This is because the category is left cancellative.'
),    
(
    'walking_coreflexive_pair',
    'same as epimorphisms',
    'This is because the category is epi-regular.'
),
(
    'walking_fork',
    'same as isomorphisms',
    'This is because the category is left cancellative.'
),
(
	'walking_idempotent',
	'the identity',
	'This is trivial.'
),
(
    'walking_isomorphism',
    'same as isomorphisms',
    'This is because the category is left cancellative.'
),    
(
    'walking_morphism',
    'same as isomorphisms',
    'This is because the category is left cancellative.'
),    
(
    'walking_pair',
    'same as isomorphisms',
    'This is because the category is left cancellative.'
),  
(
    'walking_span',
    'same as isomorphisms',
    'This is because the category is right cancellative.'
),
(
    'walking_splitting',
    'same as epimorphisms',
    'This is because the category is epi-regular.'
),
(
    'Z',
    'same as epimorphisms',
    'This is because the category is epi-regular.'
),    
(
    'Z_div',
    'same as isomorphisms',
    'This is because the category is left cancellative.'
);

INSERT INTO special_morphisms
	(category_id, description, reason, type)
SELECT
	category_id, description, reason, 'regular epimorphisms'
FROM regular_epimorphisms;

DROP TABLE regular_epimorphisms;