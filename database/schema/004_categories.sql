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