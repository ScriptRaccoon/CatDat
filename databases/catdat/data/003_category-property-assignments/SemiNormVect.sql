INSERT INTO category_property_assignments (
	category_id,
	property_id,
	is_satisfied,
	reason
)
VALUES
(
    'SemiNormVect',
    'locally small',
    TRUE,
    'There is a forgetful functor to $\Vect$, which is locally small.'
),
(
    'SemiNormVect',
    'equalizers',
    TRUE,
    'It suffices to take the equalizer in $\Vect$ and restrict the norm. The universal property is easy to verify.'
),
(
    'SemiNormVect',
    'products',
    TRUE,
    'The product of a family of semi-normed vector spaces $(V_i, |{-}|)_{i \in I}$ is the subspace of the product $\prod_{i \in I} V_i$ that consists of those tuples $v=(v_i)_{i \in I}$ such that $\sup_{i \in I} |v_i| < \infty$, equipped with the semi-norm $|v| := \sup_{i \in I} |v_i|$. The universal property is easy to verify.'
),
(
    'SemiNormVect',
    'coproducts',
    TRUE,
    'The coproduct of a family of semi-normed vector spaces $(V_i, |{-}|)_{i \in I}$ is the direct sum (i.e. coproduct) $\bigoplus_{i \in I} V_i$  equipped with the semi-norm $|v| := \sum_{i \in I} |v_i|$. The universal property is easy to verify: if $h : \bigoplus_{i \in I} V_i \to T$ is a linear map such that each $h|_{V_i}$ is a contraction, then $\textstyle |h(v)| = |\sum_i h(v_i)| \leq \sum_i |h(v_i)| \leq \sum_i |v_i| = |v|$.'
),
(
    'SemiNormVect',
    'coequalizers',
    TRUE,
    'By the usual argument it suffices to construct quotients by subspaces. If $(V,|{-}|)$ is a semi-normed vector space and $U \subseteq V$ is a subspace, endow the quotient vector space $V/U$ with the semi-norm $|\pi(v)| := \inf_{u \in U} |v + u|$. This is indeed a semi-norm and satisfies the universal property.'
),
(
	'SemiNormVect',
	'CIP',
	TRUE,
	'This is immediate from the concrete description of coproducts and products.'
),
(
   'SemiNormVect',
   'generator',
   TRUE,
   'Assume that $f,g : (V,|{-}|) \rightrightarrows (W,|{-}|)$ are morphisms that equalize all morphisms from $(\IC,|{-}|)$ (with the usual norm). This means that $f(v)=g(v)$ when $|v| \leq 1$, and we need to prove $f(v)=g(v)$ for every $v$. If $|v| = 0$, this is clear. Otherwise, consider $w := 1/|v| \cdot v$. Then $|w| \leq 1$, hence $f(w)=g(w)$, and this implies $f(v)=g(v)$.'
),
(
   'SemiNormVect',
   'cogenerator',
   TRUE,
   'The object $(\IC,0)$ is a cogenerator since $\IC$ is a cogenerator in $\Vect$.'
),
(
	'SemiNormVect',
	'balanced',
	FALSE,
	'The linear map $\IC \to \IC$, $x \mapsto x/2$ is a counterexample. It is bijective, hence a mono- and epimorphism, but not isometric and therefore no isomorphism.'
),
(
    'SemiNormVect',
    'unital',
    FALSE,
    'The canonical morphism $(V,|{-}|) \oplus (W,|{-}|) \to (V,|{-}|) \times (W,|{-}|)$ is given by the monomorphism $(V \times W, |{-}|_1) \hookrightarrow (V \times W, |{-}|_{\sup})$, which is proper since $|{-}|_{\sup} < |{-}|_1$ in general, hence is no strong epimorphism.'
);