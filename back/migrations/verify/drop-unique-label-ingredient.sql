-- Verify cuisinedb:drop-unique-label-ingredient on pg

BEGIN;

INSERT INTO ingredient (label, mesure_unit)
VALUES ('raisin','kg'),
('raisin','kg');
ROLLBACK;
