-- Revert cuisinedb:table-init from pg

BEGIN;

-- drop all tables 

DROP TABLE 
  allergy_has_user,
  quantity,
  review,
  recipe,
  ingredient,
  allergy,
  category,
  difficulty,
  "user"; 

COMMIT;
