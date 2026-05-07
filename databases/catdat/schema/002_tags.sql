CREATE TABLE tags (
    id INTEGER PRIMARY KEY,
    tag TEXT NOT NULL UNIQUE
);

CREATE TABLE category_tag_assignments (
    category_id TEXT NOT NULL,
    tag TEXT NOT NULL,
    PRIMARY KEY (category_id, tag),
    FOREIGN KEY (category_id) REFERENCES categories (id) ON DELETE CASCADE,
    FOREIGN KEY (tag) REFERENCES tags (tag) ON DELETE CASCADE
);
