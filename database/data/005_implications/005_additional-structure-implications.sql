INSERT INTO implication_input (
	id,
	assumptions,
	conclusions,
	reason,
	is_equivalence
)
VALUES
(
	'finitary_algebraic_consequences',
	'["finitary algebraic"]',
	'["locally strongly finitely presentable", "monadically concrete"]',
	'The first is trivial because a locally strongly finitely presentable category is a variety of many-sorted finitary algebras. For the second, the forgetful functor to Set is monadic because the corresponding monad on Set takes a set to the collection of formal expressions in those variables modulo provable equality, and so it is easy to see an equivalence between an algebra over that monad and a model of the algebraic theory.',
	FALSE
),
(
	'monadically_concrete_consequences',
	'["monadically concrete"]',
	'["complete", "cocomplete", "Barr-exact", "locally essentially small"]',
	'It is complete because a monadic functor creates limits.  For cocompleteness, see for example Handbook of Categorial Algebra Vol. 2, Thm. 4.3.5.  For Barr-exactness, see <a href="https://ncatlab.org/nlab/show/colimits+in+categories+of+algebras#exact">here</a>.  The local smallness condition is easy from the fact that the monadic functor must be faithful.',
	FALSE
),
(
	'zero_morphisms_mean_strongly_connected',
	'["zero morphisms", "inhabited"]',
	'["strongly connected"]',
	'This holds by definition.',
	FALSE
),
(
	'preadditive_consequence',
	'["preadditive"]',
	'["locally essentially small", "zero morphisms"]',
	'This is trivial.',
	FALSE
),
(
	'additive_definition',
	'["additive"]',
	'["preadditive", "finite products"]',
	'This holds by definition.',
	TRUE
),
(
	'additive_biproducts',
	'["additive"]',
	'["biproducts"]',
	'This is standard, see e.g. Prop. 2.1 on the <a href="https://ncatlab.org/nlab/show/additive+category" target="_blank">nLab</a>.',
	FALSE
),
(
	'abelian_definition',
	'["abelian"]',
	'["additive", "kernels", "cokernels", "normal", "conormal"]',
	'This holds by definition.',
	TRUE
),
(
	'abelian_implies_exact',
	'["abelian"]',
	'["Barr-exact"]',
	'In an abelian category, every epimorphism is regular, and epimorphisms are pullback-stable, see <a href="https://ncatlab.org/nlab/show/Categories+for+the+Working+Mathematician" target="_blank">Mac Lane</a>, Ch. VIII.  This shows the category is regular.  For exactness, strict quotients of internal equivalence relations can be constructed as cokernels.',
	FALSE
),
(
	'grothendieck_abelian_definition',
	'["Grothendieck abelian"]',
	'["abelian", "coproducts", "generator", "exact filtered colimits"]',
	'This holds by definition.',
	TRUE
),
(
	'split_abelian_condition',
	'["split abelian"]',
	'["abelian"]',
	'This holds by definition.',
	FALSE
),
(
	'preadditive_products_criterion',
	'["preadditive", "finite coproducts"]',
	'["finite products"]',
	'See <a href="https://ncatlab.org/nlab/show/Categories+for+the+Working+Mathematician" target="_blank">Mac Lane</a>, VIII.2., Theorem 2.',
	FALSE
),
(
	'algebraic_well-copowered',
	'["finitary algebraic"]',
	'["well-copowered"]',
	'See <a href="https://mathoverflow.net/questions/486607" target="_blank">MSE/486607</a>. Alternatively, one may combine the facts that finitary algebraic categories are locally (finitely) presentable and that locally presentable categories are well-copowered, both of which are saved in the database. But we include the direct proof here as well, since it makes it easier to deduce the property for finitary algebraic categories appearing in practice.',
	FALSE
),
(
	'many_sorted_algebraic_implies_regular',
	'["locally strongly finitely presentable"]',
	'["regular"]',
	'The regular epimorphisms are precisely the sort-wise surjective homomorphisms, which are clearly stable under pullbacks.',
	FALSE
),
(
	'algebras_with_0_disjoint_products',
	'["finitary algebraic", "pointed"]',
	'["disjoint products"]',
	'We have a constant in every algebra, let us denoted it by $0$. Then the projection $A \times B \to A$ is clearly surjective, hence an epimorphism. To show that $A \sqcup_{A \times B} B$ is trivial, let $R$ be an algebra which admits homomorphisms $f : A \to R$, $g : B \to R$ such that $f(p_1(a,b)) = g(p_2(a,b))$ for all $(a,b) \times A \times B$. This means $f(a) = g(b)$. In particular, $f(a) = g(0) = 0$. Likewise, $g(b) = 0$, and we are done.',
	FALSE
),
(
	'grothendieck_abelian_cogenerator',
	'["Grothendieck abelian"]',
	'["cogenerator"]',
	'See <a href="https://ncatlab.org/nlab/show/Categories+and+Sheaves" target="_blank">Kashiwara-Schapira</a>, Thm. 9.6.3.',
	FALSE
),
(
	'grothendieck_abelian_self-dual',
	'["Grothendieck abelian", "self-dual"]',
	'["trivial"]',
	'This follows since the dual of a non-trivial Grothendieck abelian category cannot be Grothendieck abelian. See Peter Freyd, <i>Abelian categories</i>, p. 116.',
	FALSE
);
