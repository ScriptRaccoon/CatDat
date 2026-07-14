CREATE TABLE functors (
    id TEXT PRIMARY KEY,
    domain TEXT NOT NULL,
    codomain TEXT NOT NULL,
    left_adjoint TEXT,
    UNIQUE (id, domain, codomain),
    FOREIGN KEY (id)  REFERENCES structures (id) ON DELETE CASCADE,
    FOREIGN KEY (domain) REFERENCES categories (id) ON DELETE CASCADE,
    FOREIGN KEY (codomain) REFERENCES categories (id) ON DELETE CASCADE,
    FOREIGN KEY (left_adjoint, codomain, domain)
        REFERENCES functors (id, domain, codomain)
        ON DELETE CASCADE
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