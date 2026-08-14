CREATE TABLE structure_types (
    type TEXT PRIMARY KEY
);

INSERT INTO structure_types (type) VALUES
    ('category'),
    ('functor'),
    ('morphism'),
    ('symmetric_monoidal_category');


CREATE TABLE structure_maps (
    map TEXT NOT NULL,
    type TEXT NOT NULL,
    mapped_type TEXT NOT NULL,
    PRIMARY KEY (map, type, mapped_type),
    UNIQUE (map, type),
    FOREIGN KEY (type) REFERENCES structure_types (type) ON DELETE CASCADE,
    FOREIGN KEY (mapped_type) REFERENCES structure_types (type) ON DELETE CASCADE
);

-- TODO: add the boolean field "required" to the structure_maps table.
-- For example, the domain of a functor is required,
-- but its left adjoint is not.

INSERT INTO structure_maps
    (map, type, mapped_type)
VALUES
    ('domain', 'functor', 'category'),
    ('codomain', 'functor', 'category'),
    ('category', 'morphism', 'category'),
    ('underlying_category', 'symmetric_monoidal_category', 'category');
-- TODO: make left_adjoint a structure_map (with required = FALSE)
-- TODO: perhaps make dual a structure_map (with required = FALSE)
-- TODO: perhaps also "parent"

CREATE TABLE structures (
    id TEXT PRIMARY KEY,
    type TEXT NOT NULL,
    name TEXT NOT NULL UNIQUE,
    notation TEXT NOT NULL,
    description TEXT NOT NULL,
    nlab_link TEXT CHECK (nlab_link IS NULL OR nlab_link like 'https://%'),
    dual_structure_id TEXT,
    parent TEXT,
    UNIQUE (id, type),
    FOREIGN KEY (type) REFERENCES structure_types (type) ON DELETE RESTRICT,
    FOREIGN KEY (dual_structure_id, type) REFERENCES structures (id, type) ON DELETE RESTRICT
    FOREIGN KEY (parent, type) REFERENCES structures (id, type) ON DELETE RESTRICT
);

CREATE UNIQUE INDEX structures_lower_id_unique ON structures (lower(id));

CREATE INDEX structure_by_type ON structures (type);

CREATE TABLE related_structures (
    structure_id TEXT NOT NULL,
    related_structure_id TEXT NOT NULL,
    type TEXT NOT NULL,
    CHECK (structure_id != related_structure_id),
    PRIMARY KEY (structure_id, related_structure_id),
    FOREIGN KEY (structure_id, type) REFERENCES structures (id, type) ON DELETE CASCADE,
    FOREIGN KEY (related_structure_id, type) REFERENCES structures (id, type) ON DELETE CASCADE
);

CREATE TABLE structure_comments (
    id INTEGER PRIMARY KEY,
    structure_id TEXT NOT NULL,
    comment TEXT NOT NULL,
    FOREIGN KEY (structure_id) REFERENCES structures (id) ON DELETE CASCADE
);

CREATE INDEX idx_structure_comments ON structure_comments (structure_id);

CREATE TABLE structure_tags (
    id INTEGER PRIMARY KEY,
    tag TEXT NOT NULL,
    type TEXT NOT NULL,
    UNIQUE (tag, type),
    FOREIGN KEY (type) REFERENCES structure_types (type) ON DELETE RESTRICT
);

CREATE TABLE structure_tag_assignments (
    structure_id TEXT NOT NULL,
    type TEXT NOT NULL,
    tag TEXT NOT NULL,
    PRIMARY KEY (structure_id, type, tag),
    FOREIGN KEY (structure_id, type) REFERENCES structures (id, type) ON DELETE CASCADE,
    FOREIGN KEY (tag, type) REFERENCES structure_tags (tag, type) ON DELETE CASCADE
);

CREATE TABLE structure_map_assignments (
    map TEXT NOT NULL,
    type TEXT NOT NULL,
    mapped_type TEXT NOT NULL,
    structure_id TEXT NOT NULL,
    mapped_structure_id TEXT NOT NULL,
    FOREIGN KEY (map, type, mapped_type)
        REFERENCES structure_maps (map, type, mapped_type) ON DELETE CASCADE,
    FOREIGN KEY (structure_id, type)
        REFERENCES structures (id, type) ON DELETE CASCADE,
    FOREIGN KEY (mapped_structure_id, mapped_type)
        REFERENCES structures (id, type) ON DELETE CASCADE
);