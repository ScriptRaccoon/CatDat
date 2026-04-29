CREATE TABLE category_implications (
    id TEXT PRIMARY KEY,
    reason TEXT NOT NULL CHECK (length(reason) > 0),
    is_equivalence INTEGER NOT NULL DEFAULT FALSE,
    is_deduced INTEGER NOT NULL DEFAULT FALSE,
    dualized_from TEXT,
    CHECK (dualized_from IS NULL OR is_deduced = TRUE),
    FOREIGN KEY (dualized_from) REFERENCES category_implications (id) ON DELETE SET NULL
);

CREATE UNIQUE INDEX category_implications_lower_id_unique ON category_implications (lower(id));

CREATE TABLE category_implication_assumptions (
    implication_id TEXT NOT NULL,
    property_id TEXT NOT NULL,
    PRIMARY KEY (implication_id, property_id),
    FOREIGN KEY (implication_id) REFERENCES category_implications (id) ON DELETE CASCADE,
    FOREIGN KEY (property_id) REFERENCES category_properties (id) ON DELETE CASCADE
);

CREATE TABLE category_implication_conclusions (
    implication_id TEXT NOT NULL,
    property_id TEXT NOT NULL,
    PRIMARY KEY (implication_id, property_id),
    FOREIGN KEY (implication_id) REFERENCES category_implications (id) ON DELETE CASCADE,
    FOREIGN KEY (property_id) REFERENCES category_properties (id) ON DELETE CASCADE
);

CREATE INDEX idx_assumptions_category_property ON category_implication_assumptions (property_id);

CREATE INDEX idx_conclusions_category_property ON category_implication_conclusions (property_id);