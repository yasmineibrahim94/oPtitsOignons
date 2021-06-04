-- inert basic data

BEGIN;

INSERT INTO difficulty (label)
VALUES ('facile'), ('moyen'), ('difficile');

INSERT INTO category ("name")
VALUES ('Entée'), ('Plat'), ('Dessert'), ('Viénoiserie'), ('Boulangerie'), ('sauce');

INSERT INTO allergy (label)
VALUES ('Céréales contenant du gluten'), ('Crustacés'), ('Oeufs'), ('Poissons '), ('Arachides '), ('Soja ') ,('Lait '),('Fruits à coques'),('Céleri '),('Moutarde '),('Graines de sésame'),('Anhydride sulfureux et sulfites'),('Lupin '),('Mollusques ');

COMMIT;