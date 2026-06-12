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

-- property of source category of a functor (can be generalized when required)
CREATE TABLE source_assumptions (
    implication_id TEXT NOT NULL,
    property_id TEXT NOT NULL,
    type TEXT NOT NULL CHECK (type = 'functor'),
    property_type TEXT NOT NULL CHECK (property_type = 'category'),
    PRIMARY KEY (implication_id, property_id),
    FOREIGN KEY (implication_id, type)
        REFERENCES implications (id, type) ON DELETE CASCADE,
    FOREIGN KEY (property_id, property_type)
        REFERENCES properties (id, type) ON DELETE CASCADE
);

-- property of target category of a functor (can be generalized when required)
CREATE TABLE target_assumptions (
    implication_id TEXT NOT NULL,
    property_id TEXT NOT NULL,
    type TEXT NOT NULL CHECK (type = 'functor'),
    property_type TEXT NOT NULL CHECK (property_type = 'category'),
    PRIMARY KEY (implication_id, property_id),
    FOREIGN KEY (implication_id, type)
        REFERENCES implications (id, type) ON DELETE CASCADE,
    FOREIGN KEY (property_id, property_type)
        REFERENCES properties (id, type) ON DELETE CASCADE
);

CREATE INDEX idx_assumptions_property ON assumptions (property_id);

CREATE INDEX idx_conclusions_property ON conclusions (property_id);

CREATE INDEX idx_assumptions_source_property ON source_assumptions (property_id);

CREATE INDEX idx_conclusions_target_property ON target_assumptions (property_id);

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
            SELECT json_group_array(a.property_id)
            FROM source_assumptions a WHERE a.implication_id = i.id
            ORDER BY lower(a.property_id)
        ) AS source_assumptions,
        (
            SELECT json_group_array(a.property_id)
            FROM target_assumptions a WHERE a.implication_id = i.id
            ORDER BY lower(a.property_id)
        ) AS target_assumptions,
        (
            SELECT json_group_array(c.property_id)
            FROM conclusions c WHERE c.implication_id = i.id
            ORDER BY lower(c.property_id)
        ) AS conclusions
    FROM implications i
;