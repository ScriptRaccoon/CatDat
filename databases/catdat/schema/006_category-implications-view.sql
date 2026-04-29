CREATE VIEW category_implications_view AS
SELECT
    i.id,
    i.is_equivalence,
    i.reason,
    i.is_deduced,
    i.dualized_from,
    (
        SELECT json_group_array(property_id) FROM (
            SELECT property_id
            FROM category_implication_assumptions a
            WHERE a.implication_id = i.id
            ORDER BY lower(property_id)
        )
    ) AS assumptions,
    (
        SELECT json_group_array(property_id) FROM (
            SELECT property_id
            FROM category_implication_conclusions c
            WHERE c.implication_id = i.id
            ORDER BY lower(property_id)
        )
    ) AS conclusions
FROM category_implications i;


CREATE TRIGGER trg_category_implications_view_insert
INSTEAD OF INSERT ON category_implications_view
BEGIN
    INSERT INTO category_implications
        (id, is_equivalence, reason, is_deduced, dualized_from)
    VALUES (
        NEW.id,
        COALESCE(NEW.is_equivalence, FALSE),
        NEW.reason,
        COALESCE(NEW.is_deduced, FALSE),
        NEW.dualized_from
    );

    INSERT INTO category_implication_assumptions (implication_id, property_id)
    SELECT NEW.id, value
    FROM json_each(NEW.assumptions);

    INSERT INTO category_implication_conclusions (implication_id, property_id)
    SELECT NEW.id, value
    FROM json_each(NEW.conclusions);
END;