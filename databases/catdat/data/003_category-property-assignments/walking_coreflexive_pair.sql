INSERT INTO category_property_assignments (
	category_id,
	property_id,
	is_satisfied,
	reason
)
VALUES
(
	'walking_coreflexive_pair',
	'finite',
	TRUE,
	'This is trivial.'
),
(
	'walking_coreflexive_pair',
	'small',
	TRUE,
	'This is trivial.'
),
(
	'walking_coreflexive_pair',
	'strongly connected',
	TRUE,
	'This is trivial.'
),
(
	'walking_coreflexive_pair',
	'gaunt',
	TRUE,
	'This is obvious.'
),
(
	'walking_coreflexive_pair',
	'terminal object',
	TRUE,
	'The object $[0]$ is terminal since it is already terminal in $\Delta$.'
),
(
	'walking_coreflexive_pair',
	'epi-regular',
	TRUE,
	'The only non-identity epimorphism is $p$, which is the coequalizer of $\mathrm{id}, ip : [1] \rightrightarrows [1]$ (since $pi = \mathrm{id}$).'
),
(
	'walking_coreflexive_pair',
	'mono-regular',
	TRUE,
	'The only non-identity monomorphisms are $i$ and $j$. The morphism $i$ is the equalizer of $\mathrm{id}, ip : [1] \rightrightarrows [1]$ (since $pi = \mathrm{id}$), and for $j$ it is the same argument.'
),
(
	'walking_coreflexive_pair',
	'coequalizers',
	TRUE,
	'We already know that the <a href="/category/Delta">simplex category $\Delta$ has coequalizers</a>, and the proof has shown that the cardinality does not increase, so we are done. But a direct proof is also possible: There are four non-equal parallel pairs: $(i,j)$, $(ip,jp)$, $(\mathrm{id},ip)$, and $(\mathrm{id},jp)$. The first two have the same coequalizer (if it exists) since $p$ is an epimorphism, the last two are symmetric, and we already remarked that $p$ is a coequalizer of $(\mathrm{id},ip)$. So it suffices to check that $p$ is a coequalizer of $i,j$, which is easy.'
),
(
	'walking_coreflexive_pair',
	'generator',
	TRUE,
	'The object $[0]$ is generator since this is already true in $\Delta$. A direct proof is also possible.'
),
(
	'walking_coreflexive_pair',
	'cogenerator',
	TRUE,
	'The object $[1]$ is cogenerator since this is already true in $\Delta$. A direct proof is also possible.'
),
(
	'walking_coreflexive_pair',
	'cosifted',
	TRUE,
	'Our proof that the <a href="/category/Delta">simplex category $\Delta$ is cosifted</a> has only used $[0],[1]$ as auxiliary objects and therefore also shows that $\Delta^{\leq 1}$ is cosifted.'
),
(
	'walking_coreflexive_pair',
	'generalized variety',
	TRUE,
	'This actually holds for every truncated simplex category $\Delta^{\leq n}$. See <a href="https://mathoverflow.net/questions/510760" target="_blank">MO/510760</a> for a proof that sifted colimits exist. See <a href="https://mathoverflow.net/questions/510827" target="_blank">MO/510827</a> for a proof that every object is strongly finitely presentable.'
),
(
	'walking_coreflexive_pair',
	'strict terminal object',
	FALSE,
	'The morphism $i : [0] \to [1]$ from the terminal object $[0]$ is a witness.'
),
(
	'walking_coreflexive_pair',
	'cofiltered',
	FALSE,
	'The morphisms $i,j : [0] \rightrightarrows [1]$ are not equalized by any morphism.'
),
(
	'walking_coreflexive_pair',
	'coreflexive equalizers',
	FALSE,
	'The coreflexive pair $i,j : [0] \rightrightarrows [1]$ has no equalizer, in fact is not equalized by any morphism.'
),
(
	'walking_coreflexive_pair',
	'pushouts',
	FALSE,
	'Assume that $[1] \xleftarrow{i} [0] \xrightarrow{i} [1]$ has a pushout in $\Delta^{\leq 1}$, where $i(0)=0$. This amounts to a universal totally ordered set of cardinality $\leq 2$ with elements $a,b,c$ satisfying $a \leq b$, $a \leq c$. Since a finite totally ordered set has trivial automorphism group, the automorphism defined by $a \mapsto a$, $b \mapsto c$, $c \mapsto b$ must be the identity, i.e., we have $b = c$. However, in $[1]$ the equations $0 \leq 0$, $0 \leq 1$ then show that the universal property fails.'
),
(
	-- TODO: remove this manual proof once locally multi-presentable is dualized, cf. #139
	'walking_coreflexive_pair',
	'multi-complete',
	FALSE,
	'This follows directly from existing results: If its dual, the walking reflexive pair, was multi-cocomplete, then since it is also accessible, it would be <a href="/category-property/locally_multi-presentable">locally multi-presentable</a>. But then it would have connected limits, in particular pullbacks.'
);