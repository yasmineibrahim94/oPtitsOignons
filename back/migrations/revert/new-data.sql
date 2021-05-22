-- Revert cuisinedb:new-data from pg

BEGIN;

-- drop basic data

DELETE FROM "user" * ;
DELETE FROM ingredient * ;
DELETE FROM allergy * ;
DELETE FROM category * ;
DELETE FROM difficulty * ;

ALTER TABLE ingredient
ALTER allergy_id DROP DEFAULT;

ALTER TABLE ingredient
ADD COLUMN "type" text NOT NULL;

COMMIT;
