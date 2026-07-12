CREATE TABLE implications (
    id TEXT PRIMARY KEY,
    type TEXT NOT NULL,
    proof TEXT NOT NULL CHECK (length(proof) > 0),
    is_equivalence INTEGER NOT NULL DEFAULT FALSE,
    is_deduced INTEGER NOT NULL DEFAULT FALSE,
    dualized_from TEXT,
    UNIQUE (id, type),
    CHECK (dualized_from IS NULL OR is_deduced = TRUE),
    FOREIGN KEY (dualized_from, type) REFERENCES implications (id, type) ON DELETE RESTRICT,
    FOREIGN KEY (type) REFERENCES structure_types (type) ON DELETE RESTRICT
);

CREATE UNIQUE INDEX idx_implications_lower_id_unique ON implications (lower(id));

CREATE INDEX idx_implications_by_type ON implications (type);

CREATE TABLE assumptions (
    implication_id TEXT NOT NULL,
    property_id TEXT NOT NULL,
    type TEXT NOT NULL,
    PRIMARY KEY (implication_id, property_id),
    FOREIGN KEY (implication_id, type)
        REFERENCES implications (id, type) ON DELETE CASCADE,
    FOREIGN KEY (property_id, type)
        REFERENCES properties (id, type) ON DELETE CASCADE
);

CREATE INDEX idx_assumptions_property ON assumptions (property_id);

CREATE TABLE conclusions (
    implication_id TEXT NOT NULL,
    property_id TEXT NOT NULL,
    type TEXT NOT NULL,
    PRIMARY KEY (implication_id, property_id),
    FOREIGN KEY (implication_id, type)
        REFERENCES implications (id, type) ON DELETE CASCADE,
    FOREIGN KEY (property_id, type)
        REFERENCES properties (id, type) ON DELETE CASCADE
);

CREATE INDEX idx_conclusions_property ON conclusions (property_id);

CREATE TABLE mapped_assumptions (
    implication_id TEXT NOT NULL,
    map TEXT NOT NULL,
    property_id TEXT NOT NULL,
    type TEXT NOT NULL,
    property_type TEXT NOT NULL,
    PRIMARY KEY (implication_id, map, property_id),
    FOREIGN KEY (implication_id, type)
        REFERENCES implications (id, type) ON DELETE CASCADE,
    FOREIGN KEY (property_id, property_type)
        REFERENCES properties (id, type) ON DELETE CASCADE,
    FOREIGN KEY (map, type, property_type)
        REFERENCES structure_maps (map, type, mapped_type)
        ON DELETE RESTRICT
);

CREATE INDEX idx_assumptions_mapped_property ON mapped_assumptions (property_id);

CREATE VIEW implications_view AS
    SELECT
        i.id,
        i.type,
        i.is_equivalence,
        i.is_deduced,
        i.dualized_from,
        i.proof,
        (
            SELECT json_group_array(a.property_id)
            FROM assumptions a WHERE a.implication_id = i.id
            ORDER BY lower(a.property_id)
        ) AS assumptions,
        (
            SELECT json_group_array(c.property_id)
            FROM conclusions c WHERE c.implication_id = i.id
            ORDER BY lower(c.property_id)
        ) AS conclusions,
        (
            SELECT json_group_object(map, properties)
            FROM (
                SELECT
                    a.map,
                    json_group_array(a.property_id) AS properties
                FROM mapped_assumptions a
                WHERE a.implication_id = i.id
                GROUP BY a.map
            )
        ) AS mapped_assumptions
    FROM implications i
;