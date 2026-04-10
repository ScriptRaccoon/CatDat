INSERT INTO properties (
	id,
	relation,
	description,
	nlab_link,
	dual_property_id,
	invariant_under_equivalences
)
VALUES
(
	'finitary algebraic',
	'is',
	'A category is <i>finitary algebraic</i> if it is equivalent to the category of models of a one-sorted finitary algebraic theory. This is also known as a variety of one-sorted finitary algebras.',
	'https://ncatlab.org/nlab/show/algebraic+category',
	NULL,
	TRUE
),
(
	'zero morphisms',
	'has',
	'A category has <i>zero morphisms</i> if for every pair of objects $A,B$ there is a distinguished morphism $0_{A,B} : A \to B$, called the zero morphism, such that we have $f \circ 0_{A,B} = 0_{A,C}$ and $0_{B,C} \circ g = 0_{A,C}$ for all morphisms $f : B \to C$ and $g : A \to B$. The zero morphisms are unique if they exist, hence this is actually a property of the category.',
	'https://ncatlab.org/nlab/show/zero+morphism',
	'zero morphisms',
	TRUE
),
(
	'preadditive',
	'is',
	'A category is <i>preadditive</i> when it is locally essentially small* and each hom-set carries the structure of an abelian group such that the composition is bilinear. Notice that "preadditive" is an extra structure. The property here just says that some preadditive structure exists.<br>*We demand this instead of the more common "locally small" to ensure that preadditive categories are invariant under equivalences of categories.',
	'https://ncatlab.org/nlab/show/Ab-enriched+category',
	'preadditive',
	TRUE
),
(
	'additive',
	'is',
	'A category is <i>additive</i> if it is preadditive and has finite products (equivalently, finite coproducts). Note that in the context of finite products, the preadditive structure <a href="/lemma/preadditive_structure_unique">is unique</a>.',
	'https://ncatlab.org/nlab/show/additive+category',
	'additive',
	TRUE
),
(
	'abelian',
	'is',
	'A category is <i>abelian</i> if it is additive, every morphism has a kernel and a cokernel, and every monomorphism and epimorphism is normal. Equivalently, it is additive, has equalizers and coequalizers, and it is mono-regular and epi-regular. As opposed to other types of categories (such as monoidal categories), being abelian turns out to be a mere property.',
	'https://ncatlab.org/nlab/show/abelian+category',
	'abelian',
	TRUE
),
(
	'split abelian',
	'is',
	'A category is <i>split abelian</i> if it is abelian and every short exact sequence splits. Equivalently, every object is projective. Equivalently, every object is injective.',
	'https://ncatlab.org/nlab/show/split+exact+sequence',
	'split abelian',
	TRUE
),
(
	'Grothendieck abelian',
	'is',
	'A category is <i>Grothendieck abelian</i> if it is abelian, has coproducts (and is therefore cocomplete), a generator, and filtered colimits commute with finite limits. These categories play an important role in homological algebra.',
	'https://ncatlab.org/nlab/show/Grothendieck+category',
	NULL,
	TRUE
);