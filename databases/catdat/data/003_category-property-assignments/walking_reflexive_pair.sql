INSERT INTO category_property_assignments (
	category_id,
	property_id,
	is_satisfied,
	reason
)
VALUES
(
	'walking_reflexive_pair',
	'finite',
	TRUE,
	'This is trivial.'
),
(
	'walking_reflexive_pair',
	'small',
	TRUE,
	'This is trivial.'
),
(
	'walking_reflexive_pair',
	'strongly connected',
	TRUE,
	'This is trivial.'
),
(
	'walking_reflexive_pair',
	'gaunt',
	TRUE,
	'This is obvious.'
),
(
	'walking_reflexive_pair',
	'initial object',
	TRUE,
	'The object $0$ is clearly an initial object.'
),
(
	'walking_reflexive_pair',
	'mono-regular',
	TRUE,
	'The only non-identity monomorphism is $i$, which is the equalizer of $\mathrm{id}_1, ip : 1 \rightrightarrows 1$ (since $pi = \mathrm{id}_0$).'
),
(
	'walking_reflexive_pair',
	'epi-regular',
	TRUE,
	'The only non-identity epimorphisms are $p$ and $q$. The morphism $p$ is the coequalizer of $\mathrm{id}_1, ip : 1 \rightrightarrows 1$ (since $pi = \mathrm{id}_0$), and for $q$ it is the same argument.'
),
(
	'walking_reflexive_pair',
	'equalizers',
	TRUE,
	'There are four non-equal parallel pairs: $(p,q)$, $(ip,iq)$, $(\mathrm{id}_1,ip)$, and $(\mathrm{id}_1,iq)$. The first two have the same equalizer (if it exists) since $i$ is a monomorphism, and the last two are symmetric. So it suffices to consider $(p,q)$ and $(\mathrm{id}_1,ip)$.<br>
	(1) We claim that $i$ is an equalizer of $p,q$. We have $pi = qi$ since both sides are just $\mathrm{id}_0$. Conversely, let $f : x \to 1$ be a morphism with $pf = qf$, we will show that $f$ factors through $i$. If $x = 0$, so that $f = i$, we are done. If $x=1$, then there are three possibilities. The first one is $f=\mathrm{id}_1$, which violates $pf = qf$. The other two are $f = ip, iq$, which indeed factor through $i$.<br>
	(2) We already know that $i$ is an equalizer of $(\mathrm{id}_1,ip)$ (since $pi = \mathrm{id}_0$).'
),
(
	'walking_reflexive_pair',
	'strict initial object',
	FALSE,
	'The morphism $p : 1 \to 0$ is a witness.'
),
(
	'walking_reflexive_pair',
	'filtered',
	FALSE,
	'The morphisms $p,q : 1 \rightrightarrows 0$ are not coequalized by any morphism since $\mathrm{id}_0 \, p \neq \mathrm{id}_0 \, q$ and $i p \neq i q$.'
),
(
	'walking_reflexive_pair',
	'reflexive coequalizers',
	FALSE,
	'The reflexive pair $p,q : 1 \rightrightarrows 0$ has no coequalizer, in fact is not coequalized by any morphism since $\mathrm{id}_0 \, p \neq \mathrm{id}_0 \, q$ and $i p \neq i q$.'
),
(
	'walking_reflexive_pair',
	'pullbacks',
	FALSE,
	'The morphisms $p,q : 1 \rightrightarrows 0$ have no pullback: otherwise, since $0$ is initial, they would be coequalized by some morphism. But this is not the case since $\mathrm{id}_0 \, p \neq \mathrm{id}_0 \, q$ and $i p \neq i q$.'
);