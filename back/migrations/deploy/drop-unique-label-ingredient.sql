-- Deploy cuisinedb:drop-unique-label-ingredient to pg

BEGIN;

ALTER TABLE ingredient DROP CONSTRAINT ingredient_label_key;

COMMIT;
