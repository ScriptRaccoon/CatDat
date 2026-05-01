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
	'Ab',
	'category of abelian groups',
	'$\mathbf{Ab}$',
	'abelian groups',
	'group homomorphisms',
	'This is the prototype of an abelian category.',
	'https://ncatlab.org/nlab/show/Ab',
	NULL
),
(
	'Grp',
	'category of groups',
	'$\mathbf{Grp}$',
	'groups',
	'group homomorphisms',
	'This is the prototype of a finitary algebraic category.',
	'https://ncatlab.org/nlab/show/Grp',
	NULL
),
(
	'Vect',
	'category of vector spaces',
	'$\mathbf{Vect}_K$',
	'vector spaces over a field $K$',
	'linear maps',
	'This is a special case of the category of modules over a ring, where the ring is a field. It is the prototype of a split abelian category.',
	'https://ncatlab.org/nlab/show/Vect',
	NULL
),
(
	'Ring',
	'category of rings',
	'$\mathbf{Ring}$',
	'rings',
	'ring homomorphisms',
	'Here, rings always have a unit, and homomorphisms preserve them.',
	'https://ncatlab.org/nlab/show/Ring',
	NULL
),
(
	'Alg(R)',
	'category of algebras',
	'$\mathbf{Alg}(R)$',
	'algebras over a commutative ring $R \neq 0$',
	'maps preserving the ring and module structure',
	'This is a generalization of the category of rings, which we get for $R = \mathbb{Z}$. We assume our rings (and algebras) to be unital. For $R = 0$ we would get the trivial category, which is why we exclude this here.',
	'https://ncatlab.org/nlab/show/Alg',
	NULL
),
(
	'CRing',
	'category of commutative rings',
	'$\mathbf{CRing}$',
	'commutative rings',
	'ring homomorphisms',
	NULL,
	'https://ncatlab.org/nlab/show/CRing',
	NULL
),
(
	'CAlg(R)',
	'category of commutative algebras',
	'$\mathbf{CAlg}(R)$',
	'commutative algebras over a commutative ring $R \neq 0$',
	'maps preserving the ring and module structure',
	'This is a generalization of the category of commutative rings, which we get for $R = \mathbb{Z}$. In general, $\mathbf{CAlg}(R) \cong R \,/\, \mathbf{CRing}$. We assume our rings (and algebras) to be unital. For $R = 0$ we would get the trivial category, which is why we exclude this here.',
	'https://ncatlab.org/nlab/show/CommAlg',
	NULL
),
(
	'Rng',
	'category of rngs',
	'$\mathbf{Rng}$',
	'rngs, that is, non-unital rings',
	'maps that preserve addition and multiplication',
	NULL,
	'https://ncatlab.org/nlab/show/Rng',
	NULL
),
(
	'Mon',
	'category of monoids',
	'$\mathbf{Mon}$',
	'monoids',
	'monoid homomorphisms',
	NULL,
	'https://ncatlab.org/nlab/show/category+of+monoids',
	NULL
),
(
	'CMon',
	'category of commutative monoids',
	'$\mathbf{CMon}$',
	'commutative monoids',
	'monoid homomorphisms',
	NULL,
	'https://ncatlab.org/nlab/show/category+of+monoids',
	NULL
),
(
	'M-Set',
	'category of M-sets',
	'$M{-}\mathbf{Set}$',
	'sets with a left action of a monoid $M$',
	'maps that are compatible with the $M$-action, meaning $f(m \cdot x)=m \cdot f(x)$, also called $M$-maps',
	'Here, $M$ can be any monoid. But the most important special case is that of a group. To settle (future) non-properties, we assume that $M$ is non-trivial, since otherwise we just get the <a href="/category/Set">category of sets</a>.',
	'https://ncatlab.org/nlab/show/MSet',
	NULL
),
(
	'R-Mod',
	'category of left modules over a ring',
	'$R{-}\mathbf{Mod}$',
	'left $R$-modules',
	'$R$-linear maps',
	'This is the prototype of an abelian category. The category of right modules is the same with the opposite ring $R^{\mathrm{op}}$, hence not listed here.<br>
	To settle the unsatisfied properties, we make the assumption that $R$ is <i>not</i> semisimple: If $R$ is semisimple, then by the Artin-Wedderburn theorem, the category is equivalent to a finite direct product of categories $D{-}\mathbf{Mod}$ for division rings $D$, and the case of division rings is in a separate entry. In particular, $R \neq 0$ and $R$ is not a field.',
	'https://ncatlab.org/nlab/show/module',
	NULL
),
(
	'R-Mod_div',
	'category of left modules over a division ring',
	'$R{-}\mathbf{Mod}$',
	'left $R$-modules',
	'$R$-linear maps',
	'Here, we assume that $R$ is a non-commutative division ring, i.e. a skew-field which is not a field. The category of modules behaves mostly the same as in the commutative case.',
	'https://ncatlab.org/nlab/show/module',
	NULL
),
(
	'Fld',
	'category of fields',
	'$\mathbf{Fld}$',
	'fields',
	'field homomorphisms (i.e., ring homomorphisms)',
	'This is a typical example of a bad category of good objects.',
	'https://ncatlab.org/nlab/show/Field',
	NULL
),
(
	'FinAb',
	'category of finite abelian groups',
	'$\mathbf{FinAb}$',
	'finite abelian groups',
	'group homomorphisms',
	NULL,
	'https://ncatlab.org/nlab/show/finite+abelian+group',
	NULL
),
(
	'FinGrp',
	'category of finite groups',
	'$\mathbf{FinGrp}$',
	'finite groups',
	'group homomorphisms',
	NULL,
	'https://ncatlab.org/nlab/show/finite+group',
	NULL
),
(
	'Ab_fg',
	'category of finitely generated abelian groups',
	'$\mathbf{Ab}_{\mathrm{fg}}$',
	'finitely generated abelian groups',
	'group homomorphisms',
	NULL,
	'https://ncatlab.org/nlab/show/finitely+generated+module',
	NULL
),
(
	'FreeAb',
	'category of free abelian groups',
	'$\mathbf{FreeAb}$',
	'free abelian groups',
	'group homomorphisms',
	NULL,
	NULL,
	NULL
),
(
	'TorsFreeAb',
	'category of torsion-free abelian groups',
	'$\mathbf{TorsFreeAb}$',
	'torsion-free abelian groups',
	'group homomorphisms',
	'This is a typical example of a well-behaved additive category which is <i>not</i> abelian.',
	'https://ncatlab.org/nlab/show/torsion-free+module',
	NULL
),
(
	'Cat',
	'category of small categories',
	'$\mathbf{Cat}$',
	'small categories',
	'functors',
	'This is the category of small categories and functors between them. It is the prototype of a 2-category, but here we only treat it as a 1-category.',
	'https://ncatlab.org/nlab/show/Cat',
	NULL
);
