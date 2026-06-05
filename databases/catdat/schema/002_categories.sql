CREATE TABLE categories (
    id TEXT PRIMARY KEY,
    type NOT NULL DEFAULT 'category' CHECK (type = 'category'),
    objects TEXT NOT NULL,
    morphisms TEXT NOT NULL,
    FOREIGN KEY (id, type) REFERENCES structures (id, type) ON DELETE CASCADE
);

CREATE VIEW categories_view AS
    SELECT
        s.id, s.name, s.notation, s.description, s.nlab_link,
        c.objects, c.morphisms, d.dual_structure as dual_category
    FROM categories c
    INNER JOIN structures s ON s.id = c.id
    LEFT JOIN dual_structures d ON d.structure = c.id AND d.type = c.type
;

CREATE TABLE special_object_types (
    id INTEGER PRIMARY KEY,
    type TEXT NOT NULL UNIQUE,
    dual TEXT,
    FOREIGN KEY (dual) REFERENCES special_object_types (type) ON DELETE SET NULL
);

CREATE TABLE special_objects (
    category TEXT NOT NULL,
    type TEXT NOT NULL,
    description TEXT NOT NULL,
    PRIMARY KEY (category, type),
    FOREIGN KEY (type) REFERENCES special_object_types (type) ON DELETE RESTRICT,
    FOREIGN KEY (category) REFERENCES categories (id) ON DELETE CASCADE
);

CREATE INDEX idx_special_objects_by_category ON special_objects (category);

CREATE TABLE special_morphism_types (
    id INTEGER PRIMARY KEY,
    type TEXT NOT NULL UNIQUE,
    dual TEXT,
    FOREIGN KEY (dual) REFERENCES special_morphism_types (type) ON DELETE SET NULL
);

CREATE TABLE special_morphisms (
    category TEXT NOT NULL,
    type TEXT NOT NULL,
    description TEXT NOT NULL,
    proof TEXT NOT NULL,
    PRIMARY KEY (category, type),
    FOREIGN KEY (type) REFERENCES special_morphism_types (type) ON DELETE RESTRICT,
    FOREIGN KEY (category) REFERENCES categories (id) ON DELETE CASCADE
);

CREATE INDEX idx_special_morphisms_by_category ON special_morphisms (category);