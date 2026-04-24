CREATE TABLE special_morphism_types (
    type TEXT PRIMARY KEY,
    dual TEXT,
    position INTEGER NOT NULL DEFAULT 0,
    FOREIGN KEY (dual) REFERENCES special_morphism_types (type) ON DELETE SET NULL
);

CREATE TABLE special_morphisms (
    category_id TEXT NOT NULL,
    type TEXT NOT NULL,
    description TEXT NOT NULL,
    reason TEXT NOT NULL,
    PRIMARY KEY (category_id, type),
    FOREIGN KEY (type) REFERENCES special_morphism_types (type) ON DELETE RESTRICT,
    FOREIGN KEY (category_id) REFERENCES categories (id) ON DELETE CASCADE
);

CREATE INDEX idx_special_morphisms_by_category ON special_morphisms (category_id);