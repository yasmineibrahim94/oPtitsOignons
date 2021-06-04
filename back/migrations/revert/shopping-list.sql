-- Revert cuisinedb:shopping-list from pg

BEGIN;

DROP TABLE grocery_item, grocery_list ;

COMMIT;
