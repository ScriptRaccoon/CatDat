CREATE TABLE category_property_assignments (
    category_id TEXT NOT NULL,
    property_id TEXT NOT NULL,
    is_satisfied INTEGER NOT NULL
        CHECK (is_satisfied in (TRUE, FALSE)),
    reason TEXT,
    is_deduced INTEGER NOT NULL DEFAULT FALSE
        CHECK (is_deduced in (TRUE, FALSE)),
    position INTEGER NOT NULL DEFAULT 0,
    PRIMARY KEY (category_id, property_id),
    FOREIGN KEY (category_id) REFERENCES categories (id) ON DELETE CASCADE,
    FOREIGN KEY (property_id) REFERENCES properties (id) ON DELETE CASCADE
);

CREATE INDEX idx_property_category ON category_property_assignments (property_id);