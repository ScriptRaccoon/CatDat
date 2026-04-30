PRAGMA foreign_keys = OFF;

DELETE FROM lemmas;

DELETE FROM category_implication_assumptions;
DELETE FROM category_implication_conclusions;
DELETE FROM category_implications;

DELETE FROM special_morphisms;
DELETE FROM special_morphism_types;

DELETE FROM special_objects;
DELETE FROM special_object_types;

DELETE FROM category_property_assignments;

DELETE FROM category_comments;
DELETE FROM related_categories;
DELETE FROM category_tag_assignments;
DELETE FROM categories;

DELETE FROM tags;

DELETE FROM related_category_properties;
DELETE FROM category_properties;

DELETE FROM functor_property_assignments;
DELETE FROM functor_properties;
DELETE FROM functors;

DELETE FROM relations;

DELETE FROM functor_implication_assumptions;
DELETE FROM functor_implication_conclusions;
DELETE FROM functor_implication_source_assumptions;
DELETE FROM functor_implication_target_assumptions;
DELETE FROM functor_implications;

DELETE FROM category_property_comments;

PRAGMA foreign_keys = ON;