CREATE TABLE tags (
    tag TEXT PRIMARY KEY,
    position INTEGER DEFAULT 0
);

CREATE TABLE category_tags (
    category_id TEXT NOT NULL,
    tag TEXT NOT NULL,
    PRIMARY KEY (category_id, tag),
    FOREIGN KEY (category_id) REFERENCES categories (id) ON DELETE CASCADE,
    FOREIGN KEY (tag) REFERENCES tags (tag) ON DELETE CASCADE
);
