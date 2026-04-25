DROP TABLE category_property_assignments;

CREATE TABLE category_property_assignments (
    id INTEGER PRIMARY KEY,
    category_id TEXT NOT NULL,
    property_id TEXT NOT NULL,
    is_satisfied INTEGER NOT NULL
        CHECK (is_satisfied in (TRUE, FALSE)),
    reason TEXT NOT NULL CHECK (length(reason) > 0),
    is_deduced INTEGER NOT NULL DEFAULT FALSE
        CHECK (is_deduced in (TRUE, FALSE)),
    UNIQUE (category_id, property_id),
    FOREIGN KEY (category_id) REFERENCES categories (id) ON DELETE CASCADE,
    FOREIGN KEY (property_id) REFERENCES category_properties (id) ON DELETE CASCADE
);

CREATE INDEX idx_property_category ON category_property_assignments (property_id);

DROP TABLE functor_property_assignments;

CREATE TABLE functor_property_assignments (
    id INTEGER PRIMARY KEY,
    functor_id TEXT NOT NULL,
    property_id TEXT NOT NULL,
    is_satisfied INTEGER NOT NULL
        CHECK (is_satisfied IN (TRUE, FALSE)),
    reason TEXT NOT NULL CHECK (length(reason) > 0),
    is_deduced INTEGER NOT NULL DEFAULT FALSE
        CHECK (is_deduced in (TRUE, FALSE)),
    UNIQUE (functor_id, property_id),
    FOREIGN KEY (functor_id) REFERENCES functors (id) ON DELETE CASCADE,
    FOREIGN KEY (property_id) REFERENCES functor_properties (id) ON DELETE CASCADE
);

CREATE INDEX idx_property_functor ON functor_property_assignments (property_id);