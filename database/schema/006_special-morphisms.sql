CREATE TABLE special_morphisms (
    id INTEGER PRIMARY KEY,
    kind TEXT NOT NULL UNIQUE,
    property_type TEXT NOT NULL DEFAULT 'morphism'
        CHECK (property_type = 'morphism'),
    FOREIGN KEY (kind, property_type)
        REFERENCES properties (id, type) ON DELETE RESTRICT
);

-- The IDs of category properties and the kinds of special morphisms
-- are both used as "?proof=" keys on category pages, so they must be distinct.

CREATE TRIGGER trg_special_morphism_kind_distinct
BEFORE INSERT ON special_morphisms
BEGIN
    SELECT
        CASE
            WHEN EXISTS (
                SELECT 1 FROM properties WHERE id = NEW.kind AND type = 'category'
            )
            THEN RAISE(ABORT, 'The special morphism kind "' || NEW.kind || '" is also the ID of a category property')
        END;
END;

CREATE TRIGGER trg_category_property_id_distinct
BEFORE INSERT ON properties
WHEN NEW.type = 'category'
BEGIN
    SELECT
        CASE
            WHEN EXISTS (SELECT 1 FROM special_morphisms WHERE kind = NEW.id)
            THEN RAISE(ABORT, 'The category property ID "' || NEW.id || '" is also the kind of a special morphism')
        END;
END;

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
    proof TEXT,
    FOREIGN KEY (property_id, property_type)
        REFERENCES properties (id, type) ON DELETE CASCADE,
    FOREIGN KEY (kind) REFERENCES special_morphisms (kind) ON DELETE RESTRICT
);