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