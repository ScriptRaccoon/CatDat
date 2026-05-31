-- STRUCTURE TYPES

CREATE TABLE structure_types (
    type TEXT PRIMARY KEY
);

INSERT INTO structure_types (type) VALUES ('category'), ('functor');

-- STRUCTURES

CREATE TABLE structures (
    id TEXT PRIMARY KEY,
    type TEXT NOT NULL,
    name TEXT NOT NULL UNIQUE,
    notation TEXT NOT NULL,
    description TEXT,
    nlab_link TEXT CHECK (nlab_link IS NULL OR nlab_link like 'https://%'),
    FOREIGN KEY (type) REFERENCES structure_types (type) ON DELETE RESTRICT,
    UNIQUE (id, type)
);

CREATE UNIQUE INDEX idx_structures_lower_id_unique ON structures (lower(id));

CREATE INDEX idx_structures_by_type ON structures (type);

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
    structure_id TEXT NOT NULL,
    tag TEXT NOT NULL,
    type TEXT NOT NULL,
    PRIMARY KEY (structure_id, tag),
    FOREIGN KEY (structure_id, type) REFERENCES structures (id, type) ON DELETE CASCADE,
    FOREIGN KEY (tag, type) REFERENCES tags (tag, type) ON DELETE CASCADE
);

-- RELATED AND DUAL STRUCTURES

CREATE TABLE related_structures (
    structure_id TEXT NOT NULL,
    related_structure_id TEXT NOT NULL,
    PRIMARY KEY (structure_id, related_structure_id),
    FOREIGN KEY (structure_id) REFERENCES structures (id) ON DELETE CASCADE,
    FOREIGN KEY (related_structure_id) REFERENCES structures (id) ON DELETE CASCADE
    -- intentionally we do not save the type here
);

CREATE TABLE dual_structures (
    structure_id TEXT NOT NULL,
    dual_structure_id TEXT NOT NULL,
    type TEXT NOT NULL,
    PRIMARY KEY (structure_id, dual_structure_id),
    FOREIGN KEY (structure_id, type) REFERENCES structures (id, type) ON DELETE CASCADE,
    FOREIGN KEY (dual_structure_id, type) REFERENCES structures (id, type) ON DELETE CASCADE,
    UNIQUE (structure_id),
    UNIQUE (dual_structure_id)
);

-- COMMENTS

CREATE TABLE structure_comments (
    id INTEGER PRIMARY KEY,
    structure_id TEXT NOT NULL,
    comment TEXT NOT NULL,
    FOREIGN KEY (structure_id) REFERENCES structures (id) ON DELETE CASCADE
);

CREATE INDEX idx_comments_by_structure ON structure_comments (structure_id);

-- PROPERTIES OF STRUCTURES

CREATE TABLE relations (
    relation TEXT PRIMARY KEY,
    conditional TEXT NOT NULL
);

CREATE TABLE properties (
    id TEXT PRIMARY KEY,
    type TEXT NOT NULL,
    relation TEXT NOT NULL,
    description TEXT NOT NULL CHECK (length(description) > 0),
    nlab_link TEXT CHECK (nlab_link IS NULL OR nlab_link like 'https://%'),
    invariant_under_equivalences INTEGER NOT NULL DEFAULT TRUE,
    UNIQUE (id, type),
    FOREIGN KEY (type) REFERENCES structure_types (type) ON DELETE RESTRICT,
    FOREIGN KEY (relation) REFERENCES relations (relation) ON DELETE RESTRICT
);

CREATE UNIQUE INDEX idx_properties_lower_id_unique ON properties (lower(id));

CREATE INDEX idx_properties_by_type ON properties (type);

-- RELATED AND DUAL PROPERTIES 

CREATE TABLE related_properties (
    property_id TEXT NOT NULL,
    related_property_id TEXT NOT NULL,
    PRIMARY KEY (property_id, related_property_id),
    FOREIGN KEY (property_id) REFERENCES properties (id) ON DELETE CASCADE,
    FOREIGN KEY (related_property_id) REFERENCES properties (id) ON DELETE CASCADE
    -- intentionally we do not save the type here
);

CREATE TABLE dual_properties (
    property_id TEXT NOT NULL,
    dual_property_id TEXT NOT NULL,
    type TEXT NOT NULL,
    PRIMARY KEY (property_id, dual_property_id),
    FOREIGN KEY (property_id, type) REFERENCES properties (id, type) ON DELETE CASCADE,
    FOREIGN KEY (dual_property_id, type) REFERENCES properties (id, type) ON DELETE CASCADE,
    UNIQUE (property_id),
    UNIQUE (dual_property_id)
);

-- PROPERTY ASSIGNMENTS

CREATE TABLE property_assignments (
    id INTEGER PRIMARY KEY,
    type TEXT NOT NULL,
    structure_id TEXT NOT NULL,
    property_id TEXT NOT NULL,
    is_satisfied INTEGER
        -- we use is_satisfied = NULL for undecidable properties
        CHECK (is_satisfied in (TRUE, FALSE, NULL)),
    proof TEXT NOT NULL CHECK (length(proof) > 0),
    is_deduced INTEGER NOT NULL DEFAULT FALSE
        CHECK (is_deduced in (TRUE, FALSE)),
    check_redundancy INTEGER NOT NULL DEFAULT TRUE
        CHECK (check_redundancy in (TRUE, FALSE)),
    UNIQUE (structure_id, property_id),
    FOREIGN KEY (structure_id, type) REFERENCES structures (id, type) ON DELETE CASCADE,
    FOREIGN KEY (property_id, type) REFERENCES properties (id, type) ON DELETE CASCADE
);

CREATE INDEX idx_assignment_by_property ON property_assignments (property_id);
CREATE INDEX idx_assignment_by_type ON property_assignments (type);

-- IMPLICATIONS BETWEEN PROPERTIES

CREATE TABLE implications (
    id TEXT PRIMARY KEY,
    type TEXT NOT NULL,
    proof TEXT NOT NULL CHECK (length(proof) > 0),
    is_equivalence INTEGER NOT NULL DEFAULT FALSE
        CHECK (is_equivalence in (TRUE, FALSE)),
    is_deduced INTEGER NOT NULL DEFAULT FALSE
        CHECK (is_deduced in (TRUE, FALSE)),
    dualized_from TEXT,
    CHECK (dualized_from IS NULL OR is_deduced = TRUE),
    UNIQUE (id, type),
    FOREIGN KEY (type) REFERENCES structure_types (type) ON DELETE RESTRICT,
    FOREIGN KEY (dualized_from, type) REFERENCES implications (id, type) ON DELETE CASCADE
);

CREATE UNIQUE INDEX idx_implications_lower_id_unique ON implications (lower(id));

CREATE TABLE implication_properties (
    implication_id TEXT NOT NULL,
    property_id TEXT NOT NULL,
    type TEXT NOT NULL,
    kind TEXT NOT NULL
        CHECK (kind in ('assumption', 'conclusion')),
    structure TEXT NOT NULL
        CHECK (structure in ('self', 'source', 'target')),
    PRIMARY KEY (implication_id, property_id, kind, structure),
    FOREIGN KEY (implication_id, type) REFERENCES implications (id, type) ON DELETE CASCADE,
    FOREIGN KEY (property_id) REFERENCES properties (id) ON DELETE CASCADE
);

CREATE INDEX idx_implication_property ON implication_properties (property_id);

CREATE TRIGGER trg_implication_properties_type_structure_check
BEFORE INSERT ON implication_properties
BEGIN
    SELECT
        CASE
            WHEN NEW.type = 'category'
                 AND NEW.structure != 'self'
            THEN RAISE(ABORT, 'Category implications must use structure = self')

            WHEN NEW.type = 'category'
                 AND (SELECT type FROM properties WHERE id = NEW.property_id) != 'category'
            THEN RAISE(ABORT, 'Category implications require category properties')

            WHEN NEW.type = 'functor'
                 AND NEW.structure = 'self'
                 AND (SELECT type FROM properties WHERE id = NEW.property_id) != 'functor'
            THEN RAISE(ABORT, 'Functor self-structure requires functor properties')

            WHEN NEW.type = 'functor'
                 AND NEW.structure IN ('source', 'target')
                 AND (SELECT type FROM properties WHERE id = NEW.property_id) != 'category'
            THEN RAISE(ABORT, 'Functor source/target require category properties')
        END;
END;