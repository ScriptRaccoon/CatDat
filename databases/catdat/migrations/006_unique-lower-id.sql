-- cf. https://answers.netlify.com/t/my-url-paths-are-forced-into-lowercase/1659

CREATE UNIQUE INDEX categories_lower_id_unique ON categories (lower(id));
CREATE UNIQUE INDEX properties_lower_id_unique ON properties (lower(id));
CREATE UNIQUE INDEX implications_lower_id_unique ON implications (lower(id));

