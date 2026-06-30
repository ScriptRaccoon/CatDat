CREATE TABLE structure_types (
    type TEXT PRIMARY KEY
);

INSERT INTO structure_types (type) VALUES
    ('category'),
    ('functor');

CREATE TABLE structures (
    id TEXT PRIMARY KEY,
    type TEXT NOT NULL,
    name TEXT NOT NULL UNIQUE,
    notation TEXT NOT NULL,
    description TEXT,
    nlab_link TEXT CHECK (nlab_link IS NULL OR nlab_link like 'https://%'),
    dual_structure_id TEXT,
    UNIQUE (id, type),
    FOREIGN KEY (type) REFERENCES structure_types (type) ON DELETE RESTRICT,
    FOREIGN KEY (dual_structure_id, type) REFERENCES structures (id, type) ON DELETE RESTRICT
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

CREATE TABLE structure_maps (
    map TEXT NOT NULL,
    type TEXT NOT NULL,
    mapped_type TEXT NOT NULL,
    PRIMARY KEY (map, type, mapped_type),
    UNIQUE (map, type),
    FOREIGN KEY (type) REFERENCES structure_types (type) ON DELETE CASCADE,
    FOREIGN KEY (mapped_type) REFERENCES structure_types (type) ON DELETE CASCADE
);

INSERT INTO structure_maps
    (map, type, mapped_type)
VALUES
    ('source', 'functor', 'category'),
    ('target', 'functor', 'category');