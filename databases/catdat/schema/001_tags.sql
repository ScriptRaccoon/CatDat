CREATE TABLE tags (
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
    FOREIGN KEY (tag, type) REFERENCES tags (tag, type) ON DELETE CASCADE
);