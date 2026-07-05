CREATE TABLE morphisms (
    id TEXT PRIMARY KEY,
    category TEXT NOT NULL,
    FOREIGN KEY (id) REFERENCES structures (id) ON DELETE CASCADE,
    FOREIGN KEY (category) REFERENCES categories (id) ON DELETE CASCADE
);

CREATE TRIGGER trg_morphism_type_check
BEFORE INSERT ON morphisms
BEGIN
    SELECT
        CASE
            WHEN 
              (SELECT type FROM structures WHERE id = NEW.id) != 'morphism'
            THEN RAISE(ABORT, 'Morphisms must have type "morphism"')
        END;
END;