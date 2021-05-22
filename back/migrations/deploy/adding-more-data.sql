-- Deploy cuisinedb:adding-more-data to pg

BEGIN;

-- add fiew recipe data just for test 

INSERT INTO recipe ("name", part_number, part_type, "share", category_id, "user_id", "description" )
VALUES ('moule frite',4,'personnes',false,1,2,'Un wiki est une application web qui permet la création, la modification et l illustration collaboratives de pages l intérieur d un site web. Il utilise un langage de balisage et son contenu est modifiable au moyen d un navigateur web. C est un logiciel de gestion de contenu, dont la structure implicite est minimale, tandis que la structure explicite se met en place progressivement en fonction des besoins des usagers.'),
('burger',4,'personnes',false,1,2,'Un wiki est une application web qui permet la création, la modification et l illustration collaboratives de pages l intérieur d un site web. Il utilise un langage de balisage et son contenu est modifiable au moyen d un navigateur web. C est un logiciel de gestion de contenu, dont la structure implicite est minimale, tandis que la structure explicite se met en place progressivement en fonction des besoins des usagers.'),
('moule frite',4,'personnes',false,2,1,'Un wiki est une application web qui permet la création, la modification et l illustration collaboratives de pages l intérieur d un site web. Il utilise un langage de balisage et son contenu est modifiable au moyen d un navigateur web. C est un logiciel de gestion de contenu, dont la structure implicite est minimale, tandis que la structure explicite se met en place progressivement en fonction des besoins des usagers.'),
('moule frite',4,'personnes',false,2,1,'Un wiki est une application web qui permet la création, la modification et l illustration collaboratives de pages l intérieur d un site web. Il utilise un langage de balisage et son contenu est modifiable au moyen d un navigateur web. C est un logiciel de gestion de contenu, dont la structure implicite est minimale, tandis que la structure explicite se met en place progressivement en fonction des besoins des usagers.');

COMMIT;
