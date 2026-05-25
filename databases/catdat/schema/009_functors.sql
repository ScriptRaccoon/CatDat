CREATE TABLE functors (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL UNIQUE,
    notation TEXT NOT NULL,
    source TEXT NOT NULL,
    target TEXT NOT NULL,
    description TEXT NOT NULL CHECK (length(description) > 0),
    nlab_link TEXT CHECK (nlab_link IS NULL OR nlab_link like 'https://%'),
    FOREIGN KEY (source) REFERENCES categories (id) ON DELETE CASCADE,
    FOREIGN KEY (target) REFERENCES categories (id) ON DELETE CASCADE
);

CREATE UNIQUE INDEX functors_lower_id_unique ON functors (lower(id));

CREATE TABLE functor_tag_assignments (
    functor_id TEXT NOT NULL,
    tag TEXT NOT NULL,
    PRIMARY KEY (functor_id, tag),
    FOREIGN KEY (functor_id) REFERENCES functors (id) ON DELETE CASCADE,
    FOREIGN KEY (tag) REFERENCES tags (tag) ON DELETE CASCADE
);

CREATE TABLE related_functors (
    functor_id TEXT NOT NULL,
    related_functor_id TEXT NOT NULL,
    PRIMARY KEY (functor_id, related_functor_id),
    FOREIGN KEY (functor_id) REFERENCES functors (id) ON DELETE CASCADE,
    FOREIGN KEY (related_functor_id) REFERENCES functors (id) ON DELETE CASCADE
);

CREATE TABLE functor_comments (
    id INTEGER PRIMARY KEY,
    functor_id TEXT NOT NULL,
    comment TEXT NOT NULL,
    FOREIGN KEY (functor_id) REFERENCES functors (id) ON DELETE CASCADE
);

CREATE INDEX idx_functor_comments ON functor_comments (functor_id);
