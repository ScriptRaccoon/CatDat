INSERT INTO category_property_assignments (
	category_id,
	property_id,
	is_satisfied,
	reason
)
VALUES
(
	'Sch',
	'locally small',
	TRUE,
	'There is a forgetful functor $\Sch \to \LRS$ and $\LRS$ is locally small.'
),
(
	'Sch',
	'terminal object',
	TRUE,
	'The scheme $\Spec(\IZ)$ is terminal.'
),
(
	'Sch',
	'pullbacks',
	TRUE,
	'This is the well-known construction of the fiber product of schemes, see e.g. EGA I, Chap. I, Thm. 3.2.1.'
),
(
	'Sch',
	'well-powered',
	TRUE,
	'See <a href="https://mathoverflow.net/questions/160681" target="_blank">MO/160681</a>.'
),
(
	'Sch',
	'infinitary extensive',
	TRUE,
	'One uses the same proof as for locally ringed spaces, using that open subspaces of schemes are also schemes.'
),
(
	'Sch',
	'pushouts',
	FALSE,
	'The span $\IA^1 \leftarrow \Spec(k(t)) \rightarrow \IA^1$ has no pushout, see <a href="https://mathoverflow.net/questions/9961" target="_blank">MO/9961</a>.'
),
(
	'Sch',
	'countable powers',
	FALSE,
	'While all diagrams of affine schemes have a limit in the category of schemes, one can show that an infinite product of quasi-compact non-empty schemes only exists when almost all of them are affine, see <a href="https://mathoverflow.net/questions/65506" target="_blank">MO/65506</a>. Thus, for example the power $(\IP^1)^{\IN}$ does not exist in $\Sch$.'
),
(
	'Sch',
	'balanced',
	FALSE,
	'The canonical morphism $\Spec(\IZ/2 \times \IZ[1/2]) \longrightarrow \Spec(\IZ)$ is a mono- and an epimorphism, but no isomorphism.'
),
(
	'Sch',
	'skeletal',
	FALSE,
	'This is trivial.'
),
(
	'Sch',
	'Malcev',
	FALSE,
	'Consider the subscheme $V(x-y) \cup V(y) \subseteq \IA^2$. It contains the diagonal but it is not symmetric.'
),
(
	'Sch',
	'semi-strongly connected',
	FALSE,
	'This is because already the full subcategory of affine schemes is not semi-strongly connected, see <a href="/category/CRing">the entry for $\CRing$</a>. Specifically, there is no morphism between $\Spec(\IF_2)$ and $\Spec(\IF_3)$.'
),
(
	'Sch',
	'generating set',
	FALSE,
	'If $S$ is a generating set of schemes, then the set of affine open subsets of the schemes in $S$ would also be a generating set. This is then also a generating set in the category of affine schemes, corresponding to a cogenerating set in the <a href="/category/CRing">category of commutative rings</a>, which we know does not exist (see there for the proof).'
),
(
	'Sch',
	'quotients of congruences',
	FALSE,
	'If $\Sch$ had quotients of congruences, then by <a href="/lemma/pushouts-of-monos-via-congruence-quotients">this lemma</a> it would also have pushouts of monomorphisms, contradicting the fact that the span $\IA^1 \leftarrow \Spec(k(t)) \rightarrow \IA^1$ has no pushout - see <a href="https://mathoverflow.net/questions/9961" target="_blank">MO/9961</a>.'
);
