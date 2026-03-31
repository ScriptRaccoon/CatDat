PRAGMA foreign_keys = OFF;

DELETE FROM implication_assumptions;
DELETE FROM implication_conclusions;
DELETE FROM implications;

DELETE FROM special_morphisms;
DELETE FROM special_morphism_types;

DELETE FROM special_objects;
DELETE FROM special_object_types;

DELETE FROM category_property_assignments;

DELETE FROM category_comments;
DELETE FROM related_categories;
DELETE FROM category_tags;
DELETE FROM categories;

DELETE FROM tags;

DELETE FROM related_properties;
DELETE FROM properties;

DELETE FROM functor_property_assignments;
DELETE FROM functor_properties;
DELETE FROM functors;

DELETE FROM relations;

DELETE FROM functor_implication_assumptions;
DELETE FROM functor_implication_conclusions;
DELETE FROM functor_implication_source_assumptions;
DELETE FROM functor_implication_target_assumptions;
DELETE FROM functor_implications;

PRAGMA foreign_keys = ON;