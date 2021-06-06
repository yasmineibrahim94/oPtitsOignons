-- inert basic data

BEGIN;

ALTER TABLE ingredient
DROP COLUMN "type";
ALTER TABLE ingredient
ALTER allergy_id SET DEFAULT (null);


INSERT INTO difficulty (label)
VALUES ('facile'), ('moyen'), ('difficile');

INSERT INTO category ("name")
VALUES ('Entée'), ('Plat'), ('Dessert'), ('Viénoiserie'), ('Boulangerie'), ('sauce');

INSERT INTO allergy (label)
VALUES ('Céréales contenant du gluten'), ('Crustacés'), ('Oeufs'), ('Poissons '), ('Arachides '), ('Soja ') ,('Lait '),('Fruits à coques'),('Céleri '),('Moutarde '),('Graines de sésame'),('Anhydride sulfureux et sulfites'),('Lupin '),('Mollusques ');

INSERT INTO ingredient (label, mesure_unit, allergy_id)
VALUES 
('Sucre','gr',null),
('Sel','gr',null),
('Poivre','gr',null),
('Tomate','gr',null),
('Courgette','gr',null),
('Pomme','kg',null),
('Filet de poulet','gr',null),
('Truite','gr', 4),
('Noix', 'kg', 8);

INSERT INTO "user" (email ,"password" ,pseudo)
VALUES ('jean-paul@gmail.com', 'password', 'J-P'),
('jean-jacque@gmail.com', 'password', 'J-J'),
('jean-pierre@gmail.com', 'password', 'J-PI'),
('jean-francois@gmail.com', 'password', 'J-F');

COMMIT;