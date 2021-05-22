-- Revert cuisinedb:new-patch-grocery-list from pg

BEGIN;

ALTER TABLE grocery_list
DROP COLUMN "user_id" ;

ALTER TABLE "user"
ADD COLUMN grocery_list_id int REFERENCES grocery_list(id);

COMMIT;
