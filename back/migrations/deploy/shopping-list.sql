-- Deploy cuisinedb:shopping-list to pg

BEGIN;

-- add new table "shopping list"

CREATE TABLE grocery_list (
    id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "name" text NOT NULL DEFAULT ('Ma liste de course')
);

CREATE TABLE grocery_item (
    id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "name" text UNIQUE NOT NULL,
    grocery_list_id int REFERENCES grocery_list(id)
);

ALTER TABLE "user"
ADD COLUMN grocery_list_id int REFERENCES grocery_list(id);

COMMIT;