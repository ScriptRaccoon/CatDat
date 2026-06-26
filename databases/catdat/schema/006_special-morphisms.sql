CREATE TABLE special_morphism_types (
    id INTEGER PRIMARY KEY,
    type TEXT NOT NULL UNIQUE,
    dual TEXT,
    FOREIGN KEY (dual) REFERENCES special_morphism_types (type) ON DELETE SET NULL
);

CREATE TABLE special_morphisms (
    category_id TEXT NOT NULL,
    type TEXT NOT NULL,
    description TEXT NOT NULL,
    proof TEXT NOT NULL,
    is_deduced INTEGER NOT NULL DEFAULT FALSE
        CHECK (is_deduced in (TRUE, FALSE)),
    PRIMARY KEY (category_id, type),
    FOREIGN KEY (type) REFERENCES special_morphism_types (type) ON DELETE RESTRICT,
    FOREIGN KEY (category_id) REFERENCES categories (id) ON DELETE CASCADE
);

CREATE INDEX idx_special_morphisms_by_category ON special_morphisms (category_id);