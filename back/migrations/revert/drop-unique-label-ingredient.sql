-- Revert cuisinedb:drop-unique-label-ingredient from pg

BEGIN;

ALTER TABLE ingredient ADD CONSTRAINT ingredient_label_key UNIQUE(label);

COMMIT;
