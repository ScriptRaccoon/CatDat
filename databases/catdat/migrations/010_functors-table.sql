CREATE TABLE functors (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL UNIQUE,
    source TEXT NOT NULL,
    target TEXT NOT NULL,
    description TEXT NOT NULL CHECK (length(description) > 0),
    nlab_link TEXT CHECK (nlab_link IS NULL OR nlab_link like 'https://%'),
    FOREIGN KEY (source) REFERENCES categories (id) ON DELETE CASCADE,
    FOREIGN KEY (target) REFERENCES categories (id) ON DELETE CASCADE
);