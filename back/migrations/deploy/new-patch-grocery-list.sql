-- Deploy cuisinedb:new-patch-grocery-list to pg

BEGIN;

-- modiffication relation between user and grocery list

ALTER TABLE "user"
DROP COLUMN grocery_list_id;

ALTER TABLE grocery_list
ADD COLUMN "user_id" int REFERENCES "user"(id);

COMMIT;
