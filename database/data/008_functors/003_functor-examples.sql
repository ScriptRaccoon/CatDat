INSERT INTO functors (
    id,
    name,
    source,
    target,
    description,
    nlab_link
)
VALUES
    (
        'id_Set',
        'identity functor on the category of sets',
        'Set',
        'Set',
        'Every category $\mathcal{C}$ has an identity functor $\mathrm{id}_{\mathcal{C}}$. Here, we specify that it is for the category of sets.',
        'https://ncatlab.org/nlab/show/identity+functor'
    ),
    (
        'abelianization',
        'abelianization functor for groups',
        'Grp',
        'Ab',
        'This functor maps a group $G$ to its abelianization $G^{\mathrm{ab}} := G/[G,G]$.',
        'https://ncatlab.org/nlab/show/abelianization'
    ),
    (
        'forget_vector',
        'forgetful functor for vector spaces',
        'Vect',
        'Set',
        'This functor $U$ maps a vector space $V$ (over a fixed field $K$) to its underlying set $U(V)$.',
        'https://ncatlab.org/nlab/show/forgetful+functor'
    ),
    (
        'free_group',
        'free group functor',
        'Set',
        'Grp',
        'This functor maps a set $X$ to the free group $F(X)$ on that set.',
        'https://ncatlab.org/nlab/show/free+functor'
    ),
    (
        'power_set_covariant',
        'covariant power set functor',
        'Set',
        'Set',
        'This functor maps a set $X$ to its power set $P(X)$ and a map of sets $f : X \to Y$ to the induced image operator $f_* : P(X) \to P(Y)$.',
        'https://ncatlab.org/nlab/show/power+set'
    ),
    (
        'power_set_contravariant',
        'contravariant power set functor',
        'Set_op',
        'Set',
        'This functor maps a set $X$ to its power set $P(X)$ and a map of sets $f : X \to Y$ to the induced preimage operator $f^* : P(Y) \to P(X)$.',
        'https://ncatlab.org/nlab/show/power+set'
    );