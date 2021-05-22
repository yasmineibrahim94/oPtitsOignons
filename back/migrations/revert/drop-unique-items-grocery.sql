-- Revert cuisinedb:drop-unique-items-grocery from pg

BEGIN;

ALTER TABLE grocery_item ADD CONSTRAINT grocery_item_name_key UNIQUE ("name");

COMMIT;
