CREATE TABLE functors (
    id TEXT PRIMARY KEY,
    left_adjoint TEXT,
    FOREIGN KEY (id)  REFERENCES structures (id) ON DELETE CASCADE,
    FOREIGN KEY (left_adjoint) REFERENCES structures (id) ON DELETE CASCADE
);

-- TODO: bring back check that left_adjoint has correct domain and codomain
-- TODO: move this feature to the structure_maps table
-- TODO: check that the left_adjoint is a functor

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