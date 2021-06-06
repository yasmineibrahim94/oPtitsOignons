-- Deploy cuisinedb:fake-full-recipe to pg

BEGIN;

ALTER TABLE recipe
ADD COLUMN difficulty_id INT REFERENCES difficulty(id);

INSERT INTO recipe ("name" , prepare_time , cooking_time , part_number , part_type , "share", category_id , "user_id" , "description", difficulty_id)
VALUES ('ma recette entiere','00:00:12','00:00:12',5,'personnes',true,2,2,'une desciption tres longue', 3);

INSERT INTO quantity (ingredient_id, recipe_id, quantity)
VALUES  ('2','9',25),
('3','9',10),
('4','9',5),
('8','9',15),
('9','9',30);



COMMIT;
