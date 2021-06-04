-- Revert cuisinedb:new-data from pg

BEGIN;

-- drop basic data

DELETE FROM allergy * ;
DELETE FROM category * ;
DELETE FROM difficulty * ;



COMMIT;
