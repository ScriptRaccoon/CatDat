INSERT INTO category_property_assignments (
	category_id,
	property_id,
	is_satisfied,
	reason
)
VALUES
(
	'Sh(X,Ab)',
	'locally small',
	TRUE,
	'This is easy.'
),
(
	'Sh(X,Ab)',
	'Grothendieck abelian',
	TRUE,
	'This is standard, see for example Theorem 18.1.6. in <a href="https://ncatlab.org/nlab/show/Categories+and+Sheaves" target="_blank">Kashiwara-Schapira</a>.'
),
(
	'Sh(X,Ab)',
	'skeletal',
	FALSE,
	'Consider constant sheaves for isomorphic but non-equal abelian groups.'
),
(
	'Sh(X,Ab)',
	'split abelian',
	FALSE,
	'Choose a point $x \in X$. The functor $x_* : \mathbf{Ab} \to \mathrm{Sh}(X,\mathbf{Ab})$ (skyscraper sheaf) is exact, and its left adjoint $x^* : \mathrm{Sh}(X,\mathbf{Ab}) \to \mathbf{Ab}$ (stalk) satisfies $x^* x_* \cong \mathrm{id}_{\mathbf{Ab}}$. Now, since $\mathbf{Ab}$ is not split abelian (see <a href="/category/Ab">here</a>), there is a short exact sequence of abelian groups $0 \to A \to B \to C \to 0$ that does not split. Then $0 \to x_* A \to x_* B \to x_* C \to 0$ is also exact, but it does not split: Otherwise it would also be split after applying $x^*$, which however gives the original sequence in $\mathbf{Ab}$.'
);

