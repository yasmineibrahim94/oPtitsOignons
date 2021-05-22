-- Verify cuisinedb:adding-more-data on pg

BEGIN;

SELECT * FROM recipe WHERE id = 1 ;

ROLLBACK;
