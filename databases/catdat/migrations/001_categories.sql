CREATE TABLE categories (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL UNIQUE,
    notation TEXT NOT NULL,
    objects TEXT NOT NULL,
    morphisms TEXT NOT NULL,
    description TEXT,
    nlab_link TEXT CHECK (nlab_link IS NULL OR nlab_link like 'https://%'),
    dual_category_id TEXT REFERENCES categories (id)
);

CREATE UNIQUE INDEX categories_lower_id_unique ON categories (lower(id));

CREATE TABLE related_categories (
    category_id TEXT NOT NULL,
    related_category_id TEXT NOT NULL,
    PRIMARY KEY (category_id, related_category_id),
    FOREIGN KEY (category_id) REFERENCES categories (id) ON DELETE CASCADE,
    FOREIGN KEY (related_category_id) REFERENCES categories (id) ON DELETE CASCADE
);

CREATE TABLE category_comments (
    id INTEGER PRIMARY KEY,
    category_id TEXT NOT NULL,
    comment TEXT NOT NULL,
    FOREIGN KEY (category_id) REFERENCES categories (id) ON DELETE CASCADE
);

CREATE INDEX idx_category_comments ON category_comments (category_id);