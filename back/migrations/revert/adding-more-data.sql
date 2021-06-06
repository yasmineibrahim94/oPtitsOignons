-- Revert cuisinedb:adding-more-data from pg

BEGIN;

DELETE FROM recipe * ;

COMMIT;
