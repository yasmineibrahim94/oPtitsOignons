-- Verify cuisinedb:new-data on pg

BEGIN;

SELECT * FROM "user"
WHERE id = 1;

SELECT * FROM ingredient
WHERE id = 1;

SELECT * FROM allergy
WHERE id = 1;

SELECT * FROM category
WHERE id = 1;

SELECT * FROM difficulty
WHERE id = 1;

ROLLBACK;
