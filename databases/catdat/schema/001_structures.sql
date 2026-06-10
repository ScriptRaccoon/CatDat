CREATE TABLE structure_types (
    type TEXT PRIMARY KEY
);

INSERT INTO structure_types (type) VALUES
    ('category'),
    ('functor');

CREATE TABLE structures (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL UNIQUE,
    notation TEXT NOT NULL,
    description TEXT,
    nlab_link TEXT CHECK (nlab_link IS NULL OR nlab_link like 'https://%'),
    type TEXT NOT NULL,
    UNIQUE (id, type),
    FOREIGN KEY (type) REFERENCES structure_types (type) ON DELETE RESTRICT
);

CREATE UNIQUE INDEX structures_lower_id_unique ON structures (lower(id));

CREATE INDEX structure_by_type ON structures (type);

CREATE TABLE related_structures (
    structure_id TEXT NOT NULL,
    related_structure_id TEXT NOT NULL,
    type TEXT NOT NULL,
    PRIMARY KEY (structure_id, related_structure_id, type),
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


