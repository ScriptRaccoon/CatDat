CREATE VIEW functor_implications_view AS
SELECT
    i.id,
    i.is_equivalence,
    i.reason,
    i.is_deduced,
    i.dualized_from,
    (
        SELECT json_group_array(property_id) FROM (
            SELECT property_id
            FROM functor_implication_assumptions a
            WHERE a.implication_id = i.id
            ORDER BY lower(property_id)
        )
    ) AS assumptions,
    (
        SELECT json_group_array(property_id) FROM (
            SELECT property_id
            FROM functor_implication_source_assumptions a
            WHERE a.implication_id = i.id
            ORDER BY lower(property_id)
        )
    ) AS source_assumptions,
    (
        SELECT json_group_array(property_id) FROM (
            SELECT property_id
            FROM functor_implication_target_assumptions a
            WHERE a.implication_id = i.id
            ORDER BY lower(property_id)
        )
    ) AS target_assumptions,
    (
        SELECT json_group_array(property_id) FROM (
            SELECT property_id
            FROM functor_implication_conclusions c
            WHERE c.implication_id = i.id
            ORDER BY lower(property_id)
        )
    ) AS conclusions
FROM functor_implications i;


CREATE VIEW functor_implication_input AS
SELECT
    NULL AS id,
    NULL AS is_equivalence,
    NULL AS assumptions,
    NULL AS source_assumptions,
    NULL AS target_assumptions,
    NULL AS conclusions,
    NULL AS reason,
    NULL AS is_deduced,
    NULL AS dualized_from;


CREATE TRIGGER trg_functor_implication_input_insert
INSTEAD OF INSERT ON functor_implication_input
BEGIN
    INSERT INTO functor_implications (id, reason, is_equivalence, is_deduced, dualized_from)
    VALUES (
        NEW.id,
        NEW.reason,
        COALESCE(NEW.is_equivalence, FALSE),
        COALESCE(NEW.is_deduced, FALSE),
        NEW.dualized_from
    );

    INSERT INTO functor_implication_assumptions (implication_id, property_id)
    SELECT NEW.id, value
    FROM json_each(NEW.assumptions);

    INSERT INTO functor_implication_source_assumptions (implication_id, property_id)
    SELECT NEW.id, value
    FROM json_each(NEW.source_assumptions);

    INSERT INTO functor_implication_target_assumptions (implication_id, property_id)
    SELECT NEW.id, value
    FROM json_each(NEW.target_assumptions);

    INSERT INTO functor_implication_conclusions (implication_id, property_id)
    SELECT NEW.id, value
    FROM json_each(NEW.conclusions);
END;