-- Deploy cuisinedb:drop-unique-items-grocery to pg

BEGIN;

ALTER TABLE grocery_item DROP CONSTRAINT grocery_item_name_key;

COMMIT;
