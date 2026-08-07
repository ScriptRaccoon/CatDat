CREATE TABLE symmetric_monoidal_categories (
    id TEXT PRIMARY KEY,
    underlying_category TEXT NOT NULL,
    FOREIGN KEY (id) REFERENCES structures (id) ON DELETE CASCADE,
    FOREIGN KEY (underlying_category) REFERENCES categories (id) ON DELETE CASCADE
);

CREATE TRIGGER trg_symmetric_monoidal_category_type_check
BEFORE INSERT ON symmetric_monoidal_categories
BEGIN
    SELECT
        CASE
            WHEN 
              (SELECT type FROM structures WHERE id = NEW.id) != 'symmetric_monoidal_category'
            THEN RAISE(ABORT, 'Symmetric monoidal categories must have type "symmetric_monoidal_category"')
        END;
END;