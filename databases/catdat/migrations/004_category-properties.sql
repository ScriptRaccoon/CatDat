CREATE TABLE category_properties (
    id TEXT PRIMARY KEY,
    relation TEXT NOT NULL,
    description TEXT NOT NULL CHECK (length(description) > 0),
    nlab_link TEXT CHECK (nlab_link IS NULL OR nlab_link like 'https://%'),
    invariant_under_equivalences INTEGER NOT NULL DEFAULT TRUE,
    dual_property_id TEXT,
    FOREIGN KEY (relation) REFERENCES relations (relation) ON DELETE RESTRICT,
    FOREIGN KEY (dual_property_id) REFERENCES category_properties (id) ON DELETE SET NULL
);

CREATE UNIQUE INDEX category_properties_lower_id_unique ON category_properties (lower(id));

CREATE TABLE related_category_properties (
    property_id TEXT NOT NULL,
    related_property_id TEXT NOT NULL,
    PRIMARY KEY (property_id, related_property_id),
    FOREIGN KEY (property_id) REFERENCES category_properties (id) ON DELETE CASCADE,
    FOREIGN KEY (related_property_id) REFERENCES category_properties (id) ON DELETE CASCADE
);

CREATE TABLE category_property_assignments (
    category_id TEXT NOT NULL,
    property_id TEXT NOT NULL,
    is_satisfied INTEGER NOT NULL
        CHECK (is_satisfied in (TRUE, FALSE)),
    reason TEXT NOT NULL CHECK (length(reason) > 0),
    is_deduced INTEGER NOT NULL DEFAULT FALSE
        CHECK (is_deduced in (TRUE, FALSE)),
    position INTEGER NOT NULL DEFAULT 0,
    PRIMARY KEY (category_id, property_id),
    FOREIGN KEY (category_id) REFERENCES categories (id) ON DELETE CASCADE,
    FOREIGN KEY (property_id) REFERENCES category_properties (id) ON DELETE CASCADE
);

CREATE INDEX idx_property_category ON category_property_assignments (property_id);