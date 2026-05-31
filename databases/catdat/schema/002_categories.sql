CREATE TABLE categories (
    id TEXT PRIMARY KEY,
    objects TEXT NOT NULL,
    morphisms TEXT NOT NULL,
    FOREIGN KEY (id) REFERENCES structures (id) ON DELETE CASCADE
);

CREATE TRIGGER categories_type_check
BEFORE INSERT ON categories
FOR EACH ROW
BEGIN
    SELECT CASE
        WHEN (SELECT type FROM structures WHERE id = NEW.id) != 'category'
        THEN RAISE(ABORT, 'invalid category id')
    END;
END;

CREATE VIEW categories_view AS
    SELECT
        s.id, s.name, s.notation, s.description, s.nlab_link,
        c.objects, c.morphisms, d.dual_structure_id as dual_category_id
    FROM categories c
    INNER JOIN structures s ON s.id = c.id
    LEFT JOIN dual_structures d on d.structure_id = c.id
;

CREATE TABLE special_object_types (
    id INTEGER PRIMARY KEY,
    type TEXT NOT NULL UNIQUE,
    dual TEXT,
    FOREIGN KEY (dual) REFERENCES special_object_types (type) ON DELETE SET NULL
);

CREATE TABLE special_objects (
    category_id TEXT NOT NULL,
    type TEXT NOT NULL,
    description TEXT NOT NULL,
    PRIMARY KEY (category_id, type),
    FOREIGN KEY (type) REFERENCES special_object_types (type) ON DELETE RESTRICT,
    FOREIGN KEY (category_id) REFERENCES categories (id) ON DELETE CASCADE
);

CREATE INDEX idx_special_objects_by_category ON special_objects (category_id);

CREATE TABLE special_morphism_types (
    id INTEGER PRIMARY KEY,
    type TEXT NOT NULL UNIQUE,
    dual TEXT,
    FOREIGN KEY (dual) REFERENCES special_morphism_types (type) ON DELETE SET NULL
);

CREATE TABLE special_morphisms (
    category_id TEXT NOT NULL,
    type TEXT NOT NULL,
    description TEXT NOT NULL,
    proof TEXT NOT NULL,
    PRIMARY KEY (category_id, type),
    FOREIGN KEY (type) REFERENCES special_morphism_types (type) ON DELETE RESTRICT,
    FOREIGN KEY (category_id) REFERENCES categories (id) ON DELETE CASCADE
);

CREATE INDEX idx_special_morphisms_by_category ON special_morphisms (category_id);