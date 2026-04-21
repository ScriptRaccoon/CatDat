CREATE TABLE implications (
    id TEXT PRIMARY KEY,
    reason TEXT NOT NULL,
    is_equivalence INTEGER NOT NULL DEFAULT FALSE,
    is_deduced INTEGER NOT NULL DEFAULT FALSE,
    dualized_from TEXT,
    CHECK (dualized_from IS NULL OR is_deduced = TRUE),
    FOREIGN KEY (dualized_from) REFERENCES implications (id) ON DELETE SET NULL
);

CREATE TABLE implication_assumptions (
    implication_id TEXT NOT NULL,
    property_id TEXT NOT NULL,
    PRIMARY KEY (implication_id, property_id),
    FOREIGN KEY (implication_id) REFERENCES implications (id) ON DELETE CASCADE,
    FOREIGN KEY (property_id) REFERENCES properties (id) ON DELETE CASCADE
);

CREATE TABLE implication_conclusions (
    implication_id TEXT NOT NULL,
    property_id TEXT NOT NULL,
    PRIMARY KEY (implication_id, property_id),
    FOREIGN KEY (implication_id) REFERENCES implications (id) ON DELETE CASCADE,
    FOREIGN KEY (property_id) REFERENCES properties (id) ON DELETE CASCADE
);

CREATE INDEX idx_assumptions_property ON implication_assumptions (property_id);

CREATE INDEX idx_conclusions_property ON implication_conclusions (property_id);

CREATE VIEW implications_view AS
SELECT
    i.id,
    i.is_equivalence,
    i.reason,
    i.is_deduced,
    i.dualized_from,
    (
        SELECT json_group_array(property_id) FROM (
            SELECT property_id
            FROM implication_assumptions a
            WHERE a.implication_id = i.id
            ORDER BY lower(property_id)
        )
    ) AS assumptions,
    (
        SELECT json_group_array(property_id) FROM (
            SELECT property_id
            FROM implication_conclusions c
            WHERE c.implication_id = i.id
            ORDER BY lower(property_id)
        )
    ) AS conclusions
FROM implications i;


CREATE VIEW implication_input AS
SELECT
    NULL AS id,
    NULL AS is_equivalence,
    NULL AS assumptions,
    NULL AS conclusions,
    NULL AS reason,
    NULL AS is_deduced,
    NULL AS dualized_from;


CREATE TRIGGER trg_implication_input_insert
INSTEAD OF INSERT ON implication_input
BEGIN
    INSERT INTO implications (id, is_equivalence, reason, is_deduced, dualized_from)
    VALUES (
        NEW.id,
        COALESCE(NEW.is_equivalence, FALSE),
        NEW.reason,
        COALESCE(NEW.is_deduced, FALSE),
        NEW.dualized_from
    );

    INSERT INTO implication_assumptions (implication_id, property_id)
    SELECT NEW.id, value
    FROM json_each(NEW.assumptions);

    INSERT INTO implication_conclusions (implication_id, property_id)
    SELECT NEW.id, value
    FROM json_each(NEW.conclusions);
END;