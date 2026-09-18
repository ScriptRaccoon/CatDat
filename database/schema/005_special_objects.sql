CREATE TABLE special_objects (
    id INTEGER PRIMARY KEY,
    kind TEXT NOT NULL UNIQUE,
    dual TEXT,
    FOREIGN KEY (dual) REFERENCES special_objects (kind) ON DELETE SET NULL
);

CREATE TABLE special_object_assignments (
    category_id TEXT NOT NULL,
    kind TEXT NOT NULL,
    description TEXT NOT NULL,
    is_deduced INTEGER NOT NULL DEFAULT FALSE
        CHECK (is_deduced in (TRUE, FALSE)),
    PRIMARY KEY (category_id, kind),
    FOREIGN KEY (kind) REFERENCES special_objects (kind) ON DELETE RESTRICT,
    FOREIGN KEY (category_id) REFERENCES categories (id) ON DELETE CASCADE
);

CREATE INDEX idx_special_objects_by_category ON special_object_assignments (category_id);