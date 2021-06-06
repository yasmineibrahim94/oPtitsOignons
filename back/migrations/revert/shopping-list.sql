-- Revert cuisinedb:shopping-list from pg

BEGIN;

ALTER TABLE "user" 
DROP COLUMN grocery_list_id;

DROP TABLE grocery_item, grocery_list ;

COMMIT;
