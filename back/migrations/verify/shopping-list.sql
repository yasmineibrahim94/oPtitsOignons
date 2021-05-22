-- Verify cuisinedb:shopping-list on pg

BEGIN;

INSERT INTO grocery_list ("name")
VALUES ('ma liste');

INSERT INTO grocery_item ("name", grocery_list)
VALUES ('poivron', 1),
('choux-fleur', 1),
('tomate', 1);

ROLLBACK;
