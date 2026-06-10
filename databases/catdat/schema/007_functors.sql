CREATE TABLE functors (
    id TEXT PRIMARY KEY,
    source TEXT NOT NULL,
    target TEXT NOT NULL,
    FOREIGN KEY (source) REFERENCES categories (id) ON DELETE CASCADE,
    FOREIGN KEY (target) REFERENCES categories (id) ON DELETE CASCADE,
    FOREIGN KEY (id)  REFERENCES structures (id) ON DELETE CASCADE
);

CREATE TRIGGER trg_functor_type_check
BEFORE INSERT ON functors
BEGIN
    SELECT
        CASE
            WHEN 
              (SELECT type FROM structures WHERE id = NEW.id) != 'functor'
            THEN RAISE(ABORT, 'Functors must have type "functor"')
        END;
END;