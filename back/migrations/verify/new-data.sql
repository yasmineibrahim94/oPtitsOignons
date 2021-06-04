-- Verify cuisinedb:new-data on pg

BEGIN;

SELECT * FROM allergy
WHERE id = 1;

SELECT * FROM category
WHERE id = 1;

SELECT * FROM difficulty
WHERE id = 1;

ROLLBACK;
