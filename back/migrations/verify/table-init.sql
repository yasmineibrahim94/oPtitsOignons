-- Verify cuisinedb:table-init on pg

BEGIN;

SELECT * FROM "user";
SELECT * FROM allergy_has_user;
SELECT * FROM quantity;
SELECT * FROM review;
SELECT * FROM recipe;
SELECT * FROM ingredient;
SELECT * FROM allergy;
SELECT * FROM category;
SELECT * FROM difficulty; 

ROLLBACK;
