CREATE TABLE functors (
    id TEXT PRIMARY KEY,
    source TEXT NOT NULL,
    target TEXT NOT NULL,
    FOREIGN KEY (source) REFERENCES categories (id) ON DELETE CASCADE,
    FOREIGN KEY (target) REFERENCES categories (id) ON DELETE CASCADE,
    FOREIGN KEY (id) REFERENCES structures (id) ON DELETE CASCADE
);

CREATE TRIGGER functors_type_check
BEFORE INSERT ON functors
FOR EACH ROW
BEGIN
    SELECT CASE
        WHEN (SELECT type FROM structures WHERE id = NEW.id) != 'functor'
        THEN RAISE(ABORT, 'invalid functor id')
    END;
END;

CREATE VIEW functors_view AS
    SELECT
        s.id, s.name, s.notation, s.description, s.nlab_link,
        f.source, f.target
    FROM functors f
    INNER JOIN structures s
    ON s.id = f.id;

CREATE TABLE adjoint_functors (
    left_adjoint TEXT NOT NULL,
    right_adjoint TEXT NOT NULL,
    PRIMARY KEY (left_adjoint, right_adjoint),
    UNIQUE (left_adjoint),
    UNIQUE (right_adjoint),
    FOREIGN KEY (left_adjoint) REFERENCES functors (id) ON DELETE CASCADE,
    FOREIGN KEY (right_adjoint) REFERENCES functors (id) ON DELETE CASCADE
);

CREATE TRIGGER adjoint_functors_source_target_check_insert
BEFORE INSERT ON adjoint_functors
BEGIN
    SELECT
        CASE
            WHEN (
                (SELECT source FROM functors WHERE id = NEW.left_adjoint) !=
                (SELECT target FROM functors WHERE id = NEW.right_adjoint)
            )
            OR (
                (SELECT target FROM functors WHERE id = NEW.left_adjoint) !=
                (SELECT source FROM functors WHERE id = NEW.right_adjoint)
            )
            THEN RAISE(ABORT, 'Adjoint functors must have reversed source/target')
        END;
END;

CREATE TABLE required_target_categories (
    functor_property_id TEXT NOT NULL,
    category_id TEXT NOT NULL,
    FOREIGN KEY (functor_property_id) REFERENCES properties (id) ON DELETE CASCADE,
    FOREIGN KEY (category_id) REFERENCES categories (id) ON DELETE CASCADE
);

CREATE TRIGGER trg_required_target_categories_functor_property
BEFORE INSERT ON required_target_categories
BEGIN
    SELECT CASE
        WHEN (
            SELECT type FROM properties WHERE id = NEW.functor_property_id
        ) != 'functor'
        THEN RAISE(ABORT, 'property with required target must be a functor property')
    END;
END;
