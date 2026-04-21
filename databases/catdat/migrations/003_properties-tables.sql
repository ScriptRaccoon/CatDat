CREATE TABLE relations (
    relation TEXT PRIMARY KEY,
    negation TEXT NOT NULL
);

CREATE TABLE properties (
    id TEXT PRIMARY KEY,
    relation TEXT NOT NULL,
    description TEXT NOT NULL,
    nlab_link TEXT CHECK (nlab_link IS NULL OR nlab_link like 'https://%'),
    invariant_under_equivalences INTEGER NOT NULL DEFAULT TRUE,
    dual_property_id TEXT,
    FOREIGN KEY (relation) REFERENCES relations (relation) ON DELETE RESTRICT,
    FOREIGN KEY (dual_property_id) REFERENCES properties (id) ON DELETE SET NULL
);

CREATE TABLE related_properties (
    property_id TEXT NOT NULL,
    related_property_id TEXT NOT NULL,
    PRIMARY KEY (property_id, related_property_id),
    FOREIGN KEY (property_id) REFERENCES properties (id) ON DELETE CASCADE,
    FOREIGN KEY (related_property_id) REFERENCES properties (id) ON DELETE CASCADE
);