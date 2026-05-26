CREATE TABLE adjoint_functors (
    left_adjoint TEXT NOT NULL,
    right_adjoint TEXT NOT NULL,
    PRIMARY KEY (left_adjoint, right_adjoint),
    FOREIGN KEY (left_adjoint) REFERENCES functors (id) ON DELETE CASCADE,
    FOREIGN KEY (right_adjoint) REFERENCES functors (id) ON DELETE CASCADE
);