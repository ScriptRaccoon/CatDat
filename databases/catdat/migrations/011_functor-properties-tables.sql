CREATE TABLE functor_properties (
    id TEXT PRIMARY KEY,
    relation TEXT NOT NULL,
    description TEXT NOT NULL CHECK (length(description) > 0),
    nlab_link TEXT CHECK (nlab_link IS NULL OR nlab_link like 'https://%'),
    invariant_under_equivalences INTEGER NOT NULL DEFAULT TRUE,
    dual_property_id TEXT,
    FOREIGN KEY (relation) REFERENCES relations (relation) ON DELETE RESTRICT,
    FOREIGN KEY (dual_property_id) REFERENCES functor_properties (id) ON DELETE SET NULL
);

CREATE TABLE functor_property_assignments (
    functor_id TEXT NOT NULL,
    property_id TEXT NOT NULL,
    is_satisfied INTEGER NOT NULL CHECK (is_satisfied IN (TRUE, FALSE)),
    reason TEXT NOT NULL CHECK (length(reason) > 0),
    is_deduced INTEGER NOT NULL DEFAULT FALSE CHECK (is_deduced in (TRUE, FALSE)),
    position INTEGER NOT NULL DEFAULT 0,
    PRIMARY KEY (functor_id, property_id),
    FOREIGN KEY (functor_id) REFERENCES functors (id) ON DELETE CASCADE,
    FOREIGN KEY (property_id) REFERENCES functor_properties (id) ON DELETE CASCADE
);