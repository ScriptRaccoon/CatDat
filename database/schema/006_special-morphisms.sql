CREATE TABLE special_morphisms (
    id INTEGER PRIMARY KEY,
    kind TEXT NOT NULL UNIQUE,
    dual TEXT,
    FOREIGN KEY (dual) REFERENCES special_morphisms (kind) ON DELETE SET NULL
);

CREATE TABLE special_morphism_assignments (
    category_id TEXT NOT NULL,
    kind TEXT NOT NULL,
    description TEXT NOT NULL,
    proof TEXT NOT NULL,
    is_deduced INTEGER NOT NULL DEFAULT FALSE
        CHECK (is_deduced in (TRUE, FALSE)),
    PRIMARY KEY (category_id, kind),
    FOREIGN KEY (kind) REFERENCES special_morphisms (kind) ON DELETE RESTRICT,
    FOREIGN KEY (category_id) REFERENCES categories (id) ON DELETE CASCADE
);

CREATE INDEX idx_special_morphisms_by_category ON special_morphism_assignments (category_id);

CREATE TABLE special_morphism_rules (
    id INTEGER PRIMARY KEY,
    property_id TEXT NOT NULL,
    property_type TEXT NOT NULL DEFAULT 'category',
    kind TEXT NOT NULL,
    description TEXT NOT NULL,
    proof TEXT NOT NULL,
    FOREIGN KEY (property_id, property_type)
        REFERENCES properties (id, type) ON DELETE CASCADE,
    FOREIGN KEY (kind) REFERENCES special_morphisms (kind) ON DELETE RESTRICT
);