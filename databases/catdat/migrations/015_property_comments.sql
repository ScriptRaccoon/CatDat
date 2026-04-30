CREATE TABLE category_property_comments (
    category_id TEXT NOT NULL,
    property_id TEXT NOT NULL,
    comment TEXT NOT NULL,
    PRIMARY KEY (category_id, property_id),
    FOREIGN KEY (category_id) REFERENCES categories (id) ON DELETE CASCADE,
    FOREIGN KEY (property_id) REFERENCES category_properties (id) ON DELETE CASCADE
);