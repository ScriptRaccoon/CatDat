INSERT INTO category_property_assignments (
	category_id,
	property_id,
	is_satisfied,
	reason
)
VALUES
(
	'Set_op',
	'locally presentable',
	FALSE,
	'This follows from the fact that the opposite category of a complete accessible large category is never accessible. See <a href="https://bookstore.ams.org/conm-104" target="_blank">Makkai-Pare</a>, Thm. 3.4.3.'
);
