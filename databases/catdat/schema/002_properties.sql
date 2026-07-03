CREATE TABLE relations (
    relation TEXT PRIMARY KEY,
    conditional TEXT NOT NULL
);

CREATE TABLE properties (
    id TEXT NOT NULL,
    type TEXT NOT NULL,
    relation TEXT NOT NULL,
    description TEXT NOT NULL CHECK (length(description) > 0),
    nlab_link TEXT CHECK (nlab_link IS NULL OR nlab_link like 'https://%'),
    invariant_under_equivalences INTEGER NOT NULL DEFAULT TRUE,
    dual_property_id TEXT,
    PRIMARY KEY (id, type),
    FOREIGN KEY (relation) REFERENCES relations (relation) ON DELETE RESTRICT,
    FOREIGN KEY (dual_property_id, type)
        REFERENCES properties (id, type) ON DELETE RESTRICT,
    FOREIGN KEY (type) REFERENCES structure_types (type) ON DELETE RESTRICT
);

CREATE UNIQUE INDEX properties_lower_id_unique ON properties (lower(id), type);

CREATE TABLE related_properties (
    property_id TEXT NOT NULL,
    related_property_id TEXT NOT NULL,
    type TEXT NOT NULL,
    CHECK (property_id != related_property_id),
    PRIMARY KEY (property_id, related_property_id, type),
    FOREIGN KEY (property_id, type)
        REFERENCES properties (id, type) ON DELETE CASCADE,
    FOREIGN KEY (related_property_id, type)
        REFERENCES properties (id, type) ON DELETE CASCADE
);

CREATE TABLE property_assignments (
    id INTEGER PRIMARY KEY,
    structure_id TEXT NOT NULL,
    property_id TEXT NOT NULL,
    type TEXT NOT NULL,
    is_satisfied INTEGER
        -- we use NULL for undecidable properties
        CHECK (is_satisfied in (TRUE, FALSE, NULL)),
    proof TEXT NOT NULL CHECK (length(proof) > 0),
    is_deduced INTEGER NOT NULL DEFAULT FALSE
        CHECK (is_deduced in (TRUE, FALSE)),
    check_redundancy INTEGER NOT NULL DEFAULT TRUE
        CHECK (check_redundancy in (TRUE, FALSE)),
    UNIQUE (structure_id, property_id),
    FOREIGN KEY (structure_id, type)
        REFERENCES structures (id, type) ON DELETE CASCADE,
    FOREIGN KEY (property_id, type)
        REFERENCES properties (id, type) ON DELETE CASCADE
);

CREATE INDEX idx_property_assigned ON property_assignments (property_id);

CREATE TABLE property_tags (
    id INTEGER PRIMARY KEY,
    tag TEXT NOT NULL,
    type TEXT NOT NULL,
    UNIQUE (tag, type),
    FOREIGN KEY (type) REFERENCES structure_types (type) ON DELETE RESTRICT
);

CREATE TABLE property_tag_assignments (
    property_id TEXT NOT NULL,
    type TEXT NOT NULL,
    tag TEXT NOT NULL,
    PRIMARY KEY (property_id, type, tag),
    FOREIGN KEY (property_id, type) REFERENCES properties (id, type) ON DELETE CASCADE,
    FOREIGN KEY (tag, type) REFERENCES property_tags (tag, type) ON DELETE CASCADE
);