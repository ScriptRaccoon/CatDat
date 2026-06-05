-- STRUCTURE TYPES

CREATE TABLE structure_types (
    type TEXT PRIMARY KEY
);

INSERT INTO structure_types (type) VALUES ('category'), ('functor');

-- STRUCTURES

CREATE TABLE structures (
    id TEXT NOT NULL,
    type TEXT NOT NULL,
    name TEXT NOT NULL,
    notation TEXT NOT NULL,
    description TEXT,
    nlab_link TEXT CHECK (nlab_link IS NULL OR nlab_link like 'https://%'),
    PRIMARY KEY (id, type),
    UNIQUE (name, type),
    FOREIGN KEY (type) REFERENCES structure_types (type) ON DELETE RESTRICT
);

CREATE UNIQUE INDEX idx_structures_lower_id_unique ON structures (lower(id), type);

CREATE INDEX idx_structures_by_type ON structures (type);

-- STRUCTURE MAPS

CREATE TABLE structure_maps (
    map TEXT NOT NULL,
    input_type TEXT NOT NULL,
    output_type TEXT NOT NULL,
    PRIMARY KEY (map, input_type, output_type),
    FOREIGN KEY (input_type) REFERENCES structure_types (type) ON DELETE RESTRICT,
    FOREIGN KEY (output_type) REFERENCES structure_types (type) ON DELETE RESTRICT
);

INSERT INTO structure_maps (map, input_type, output_type) VALUES
    ('source', 'functor', 'category'),
    ('target', 'functor', 'category'),
    ('left_adjoint', 'functor', 'functor');

CREATE TABLE structure_map_values (
    map TEXT NOT NULL,
    input TEXT NOT NULL,
    input_type TEXT NOT NULL,
    output TEXT NOT NULL,
    output_type TEXT NOT NULL,
    PRIMARY KEY (map, input, input_type, output, output_type),
    FOREIGN KEY (map, input_type, output_type)
        REFERENCES structure_maps (map, input_type, output_type) ON DELETE CASCADE,
    FOREIGN KEY (input, input_type) REFERENCES structures (id, type) ON DELETE CASCADE,
    FOREIGN KEY (output, output_type) REFERENCES structures (id, type) ON DELETE CASCADE
);

-- TAGS

CREATE TABLE tags (
    id INTEGER PRIMARY KEY,
    tag TEXT NOT NULL,
    type TEXT NOT NULL,
    UNIQUE (tag, type),
    FOREIGN KEY (type) REFERENCES structure_types (type) ON DELETE RESTRICT
);

CREATE INDEX idx_tags_by_type ON tags (type);

CREATE TABLE tag_assignments (
    structure TEXT NOT NULL,
    tag TEXT NOT NULL,
    type TEXT NOT NULL,
    PRIMARY KEY (structure, tag),
    FOREIGN KEY (structure, type) REFERENCES structures (id, type) ON DELETE CASCADE,
    FOREIGN KEY (tag, type) REFERENCES tags (tag, type) ON DELETE CASCADE
);

-- RELATED AND DUAL STRUCTURES

CREATE TABLE related_structures (
    structure TEXT NOT NULL,
    related_structure TEXT NOT NULL,
    type TEXT NOT NULL,
    PRIMARY KEY (structure, related_structure, type),
    FOREIGN KEY (structure, type) REFERENCES structures (id, type) ON DELETE CASCADE,
    FOREIGN KEY (related_structure, type) REFERENCES structures (id, type) ON DELETE CASCADE
);

CREATE TABLE dual_structures (
    structure TEXT NOT NULL,
    dual_structure TEXT NOT NULL,
    type TEXT NOT NULL,
    PRIMARY KEY (structure, dual_structure, type),
    FOREIGN KEY (structure, type) REFERENCES structures (id, type) ON DELETE CASCADE,
    FOREIGN KEY (dual_structure, type) REFERENCES structures (id, type) ON DELETE CASCADE,
    UNIQUE (structure),
    UNIQUE (dual_structure)
);

-- COMMENTS

CREATE TABLE structure_comments (
    id INTEGER PRIMARY KEY,
    structure TEXT NOT NULL,
    type TEXT NOT NULL,
    comment TEXT NOT NULL,
    FOREIGN KEY (structure, type) REFERENCES structures (id, type) ON DELETE CASCADE
);

CREATE INDEX idx_comments_by_structure ON structure_comments (structure, type);

-- PROPERTIES OF STRUCTURES

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
    CHECK (invariant_under_equivalences in (TRUE, FALSE)),
    PRIMARY KEY (id, type),
    FOREIGN KEY (type) REFERENCES structure_types (type) ON DELETE RESTRICT,
    FOREIGN KEY (relation) REFERENCES relations (relation) ON DELETE RESTRICT
);

CREATE UNIQUE INDEX idx_properties_lower_id_unique ON properties (lower(id), type);

CREATE INDEX idx_properties_by_type ON properties (type);

-- RELATED AND DUAL PROPERTIES 

CREATE TABLE related_properties (
    property TEXT NOT NULL,
    related_property TEXT NOT NULL,
    type TEXT NOT NULL,
    PRIMARY KEY (property, related_property, type),
    FOREIGN KEY (property, type) REFERENCES properties (id, type) ON DELETE CASCADE,
    FOREIGN KEY (related_property, type) REFERENCES properties (id, type) ON DELETE CASCADE
);

CREATE TABLE dual_properties (
    property TEXT NOT NULL,
    dual_property TEXT NOT NULL,
    type TEXT NOT NULL,
    PRIMARY KEY (property, dual_property, type),
    FOREIGN KEY (property, type) REFERENCES properties (id, type) ON DELETE CASCADE,
    FOREIGN KEY (dual_property, type) REFERENCES properties (id, type) ON DELETE CASCADE,
    UNIQUE (property, type),
    UNIQUE (dual_property, type)
);

-- PROPERTY ASSIGNMENTS

CREATE TABLE property_assignments (
    id INTEGER PRIMARY KEY,
    type TEXT NOT NULL,
    structure TEXT NOT NULL,
    property TEXT NOT NULL,
    is_satisfied INTEGER
        -- we use is_satisfied = NULL for undecidable properties
        CHECK (is_satisfied in (TRUE, FALSE, NULL)),
    proof TEXT NOT NULL CHECK (length(proof) > 0),
    is_deduced INTEGER NOT NULL DEFAULT FALSE
        CHECK (is_deduced in (TRUE, FALSE)),
    check_redundancy INTEGER NOT NULL DEFAULT TRUE
        CHECK (check_redundancy in (TRUE, FALSE)),
    UNIQUE (structure, property, type),
    FOREIGN KEY (structure, type) REFERENCES structures (id, type) ON DELETE CASCADE,
    FOREIGN KEY (property, type) REFERENCES properties (id, type) ON DELETE CASCADE
);

CREATE INDEX idx_assignment_by_property ON property_assignments (property, type);
CREATE INDEX idx_assignment_by_type ON property_assignments (type);

-- IMPLICATIONS BETWEEN PROPERTIES

CREATE TABLE implications (
    id TEXT NOT NULL,
    type TEXT NOT NULL,
    proof TEXT NOT NULL CHECK (length(proof) > 0),
    is_equivalence INTEGER NOT NULL DEFAULT FALSE
        CHECK (is_equivalence in (TRUE, FALSE)),
    is_deduced INTEGER NOT NULL DEFAULT FALSE
        CHECK (is_deduced in (TRUE, FALSE)),
    dualized_from TEXT,
    CHECK (dualized_from IS NULL OR is_deduced = TRUE),
    PRIMARY KEY (id, type),
    FOREIGN KEY (type) REFERENCES structure_types (type) ON DELETE RESTRICT,
    FOREIGN KEY (dualized_from, type) REFERENCES implications (id, type) ON DELETE CASCADE
);

CREATE UNIQUE INDEX idx_implications_lower_id_unique ON implications (lower(id), type);

CREATE TABLE assumptions (
    implication TEXT NOT NULL,
    property TEXT NOT NULL,
    type TEXT NOT NULL,
    PRIMARY KEY (implication, property, type),
    FOREIGN KEY (implication, type) REFERENCES implications (id, type) ON DELETE CASCADE,
    FOREIGN KEY (property, type) REFERENCES properties (id, type) ON DELETE CASCADE
);

CREATE TABLE conclusions (
    implication TEXT NOT NULL,
    property TEXT NOT NULL,
    type TEXT NOT NULL,
    PRIMARY KEY (implication, property, type),
    FOREIGN KEY (implication, type) REFERENCES implications (id, type) ON DELETE CASCADE,
    FOREIGN KEY (property, type) REFERENCES properties (id, type) ON DELETE CASCADE
);

CREATE TABLE mapped_assumptions (
    map TEXT NOT NULL,
    implication TEXT NOT NULL,
    implication_type TEXT NOT NULL,
    property TEXT NOT NULL,
    property_type TEXT NOT NULL,
    PRIMARY KEY (map, implication, implication_type, property, property_type),
    FOREIGN KEY (implication, implication_type)
        REFERENCES implications (id, type)
        ON DELETE CASCADE,
    FOREIGN KEY (property, property_type)
        REFERENCES properties (id, type)
        ON DELETE CASCADE,
    FOREIGN KEY (map, implication_type, property_type)
        REFERENCES structure_maps (map, input_type, output_type)
        ON DELETE CASCADE
);