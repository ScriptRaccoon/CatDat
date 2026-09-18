CREATE TABLE structure_types (
    type TEXT PRIMARY KEY
);

INSERT INTO structure_types (type) VALUES
    ('category'),
    ('functor'),
    ('morphism'),
    ('symmetric_monoidal_category');

CREATE TABLE structures (
    id TEXT PRIMARY KEY,
    type TEXT NOT NULL,
    name TEXT NOT NULL UNIQUE,
    notation TEXT NOT NULL,
    description TEXT NOT NULL,
    nlab_link TEXT CHECK (nlab_link IS NULL OR nlab_link like 'https://%'),
    dual_structure_id TEXT,
    parent_structure_id TEXT,
    UNIQUE (id, type),
    FOREIGN KEY (type) REFERENCES structure_types (type) ON DELETE RESTRICT,
    FOREIGN KEY (dual_structure_id, type) REFERENCES structures (id, type) ON DELETE RESTRICT,
    FOREIGN KEY (parent_structure_id, type) REFERENCES structures (id, type) ON DELETE RESTRICT
);

CREATE UNIQUE INDEX structures_lower_id_unique ON structures (lower(id));

CREATE INDEX idx_structures_by_type ON structures (type);

CREATE INDEX idx_structures_by_parent ON structures (parent_structure_id, type);

CREATE TABLE related_structures (
    id INTEGER PRIMARY KEY,
    structure_id TEXT NOT NULL,
    related_structure_id TEXT NOT NULL,
    type TEXT NOT NULL,
    CHECK (structure_id != related_structure_id),
    UNIQUE (structure_id, related_structure_id),
    FOREIGN KEY (structure_id, type) REFERENCES structures (id, type) ON DELETE CASCADE,
    FOREIGN KEY (related_structure_id, type) REFERENCES structures (id, type) ON DELETE CASCADE
);

CREATE TABLE structure_comments (
    id INTEGER PRIMARY KEY,
    structure_id TEXT NOT NULL,
    comment TEXT NOT NULL,
    FOREIGN KEY (structure_id) REFERENCES structures (id) ON DELETE CASCADE
);

CREATE INDEX idx_comments_by_structure ON structure_comments (structure_id);

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

CREATE INDEX idx_structures_by_tag ON structure_tag_assignments (type, tag, structure_id);

CREATE TABLE associated_structure_types (
    label TEXT NOT NULL,
    type TEXT NOT NULL,
    associated_type TEXT NOT NULL,
    required INTEGER NOT NULL
         CHECK (required in (TRUE, FALSE)),
    PRIMARY KEY (label, type, associated_type),
    UNIQUE (label, type),
    FOREIGN KEY (type) REFERENCES structure_types (type) ON DELETE CASCADE,
    FOREIGN KEY (associated_type) REFERENCES structure_types (type) ON DELETE CASCADE
);

INSERT INTO associated_structure_types
    (label, type, associated_type, required)
VALUES
    ('domain', 'functor', 'category', TRUE),
    ('codomain', 'functor', 'category', TRUE),
    ('category', 'morphism', 'category', TRUE),
    ('underlying_category', 'symmetric_monoidal_category', 'category', TRUE),
    ('left_adjoint', 'functor', 'functor', FALSE),
    ('right_adjoint', 'functor', 'functor', FALSE);

CREATE TABLE associated_structures (
    label TEXT NOT NULL,
    type TEXT NOT NULL,
    associated_type TEXT NOT NULL,
    structure_id TEXT NOT NULL,
    associated_structure_id TEXT NOT NULL,
    PRIMARY KEY (label, type, associated_type, structure_id),
    FOREIGN KEY (label, type, associated_type)
        REFERENCES associated_structure_types (label, type, associated_type)
        ON DELETE CASCADE,
    FOREIGN KEY (structure_id, type)
        REFERENCES structures (id, type) ON DELETE CASCADE,
    FOREIGN KEY (associated_structure_id, associated_type)
        REFERENCES structures (id, type) ON DELETE CASCADE
);

CREATE INDEX idx_associated_structures_by_structure ON associated_structures (structure_id);

CREATE INDEX idx_associated_structures_by_target ON associated_structures (associated_structure_id, type, label);