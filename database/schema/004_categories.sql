CREATE TABLE categories (
    id TEXT PRIMARY KEY,
    objects TEXT NOT NULL,
    morphisms TEXT NOT NULL,
    FOREIGN KEY (id) REFERENCES structures (id) ON DELETE CASCADE
);

CREATE TRIGGER trg_category_type_check
BEFORE INSERT ON categories
BEGIN
    SELECT
        CASE
            WHEN 
              (SELECT type FROM structures WHERE id = NEW.id) != 'category'
            THEN RAISE(ABORT, 'Categories must have type "category"')
        END;
END;

CREATE TABLE subcategory_closed_properties (
    property_id TEXT PRIMARY KEY,
    property_type TEXT NOT NULL DEFAULT 'category'
        CHECK (property_type = 'category'),
    requires_full INTEGER NOT NULL DEFAULT FALSE
        CHECK (requires_full IN (TRUE, FALSE)),
    requires_inhabited INTEGER NOT NULL DEFAULT FALSE
        CHECK (requires_inhabited IN (TRUE, FALSE)),
    FOREIGN KEY (property_id, property_type)
        REFERENCES properties (id, type) ON DELETE CASCADE
);
