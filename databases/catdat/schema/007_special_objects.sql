CREATE TABLE special_object_types (
    type TEXT PRIMARY KEY,
    dual TEXT,
    position INTEGER NOT NULL DEFAULT 0,
    FOREIGN KEY (dual) REFERENCES special_object_types (type) ON DELETE SET NULL
);

CREATE TABLE special_objects (
    category_id TEXT NOT NULL,
    type TEXT NOT NULL,
    description TEXT NOT NULL,
    PRIMARY KEY (category_id, type),
    FOREIGN KEY (type) REFERENCES special_object_types (type) ON DELETE RESTRICT,
    FOREIGN KEY (category_id) REFERENCES categories (id) ON DELETE CASCADE
);

CREATE INDEX idx_special_objects_by_category ON special_objects (category_id);