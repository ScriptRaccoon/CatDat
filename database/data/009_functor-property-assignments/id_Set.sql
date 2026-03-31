INSERT INTO functor_property_assignments (
    functor_id,
    property_id,
    is_satisfied,
    reason
)
VALUES
(
    'id_Set',
    'equivalence',
    TRUE,
    'This is trivial.'
),
(
    'id_Set',
    'representable',
    TRUE,
    'This functor is represented by any singleton set.'
);