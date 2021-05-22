-- Revert cuisinedb:fake-full-recipe from pg

BEGIN;

DELETE FROM quantity
WHERE recipe_id = 9;

DELETE FROM recipe
WHERE difficulty_id = 3;

ALTER TABLE recipe
DROP COLUMN difficulty_id;

COMMIT;
