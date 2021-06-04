-- Deploy cuisinedb:table-init to pg

BEGIN;

-- create all table for the project 

CREATE TABLE "user" ( 
    id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    email text NOT NULL UNIQUE,
    "password" text NOT NULL,
    "image" text,
    pseudo text NOT NULL UNIQUE
);

CREATE TABLE difficulty (
    id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    label text NOT NULL UNIQUE
);

CREATE TABLE category (
    id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "name" text NOT NULL UNIQUE
);

CREATE TABLE allergy (
    id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    label text NOT NULL UNIQUE
);

CREATE TABLE ingredient (
    id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    label text NOT NULL,
    "image" text,
    mesure_unit text NOT NULL,
    allergy_id int REFERENCES allergy(id) DEFAULT(null)
);

CREATE TABLE recipe (
    id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "name" text NOT NULL,
    prepare_time time,
    cooking_time time,
    "image" text,
    part_number int NOT NULL,
    part_type text NOT NULL,
    "share" boolean NOT NULL,
    category_id int REFERENCES category(id),
    "user_id" int REFERENCES "user"(id),
    "description" text,
    difficulty_id INT REFERENCES difficulty(id)
);

CREATE TABLE review (
    id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    content text,
    rate int,
    "date" timestamptz DEFAULT NOW(),
    "user_id" int REFERENCES "user"(id),
    recipe_id int REFERENCES recipe(id)
);

CREATE TABLE quantity (
    id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    ingredient_id int REFERENCES ingredient(id),
    recipe_id int REFERENCES recipe(id),
    quantity float NOT NULL
);

CREATE TABLE allergy_has_user (
    id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "user_id" int  REFERENCES "user"(id),
    allergy_id int REFERENCES allergy(id)
);

COMMIT;
