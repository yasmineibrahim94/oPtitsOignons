# INTRODUCTION

An API for managing / creating / sharing cooking recipes

## Techno

- NodeJs
- Express-Server
- sqitch
- postgress

## INSTALLATION

- created a postgress DB: `https://docs.postgresql.fr/12/tutorial-createdb.html`
  
- create an `.env` at the project recine and fill it with the fields from the`.env.example`
  
- install project dependencies: `npm install`
  
- creation of tables for the DB
    - install sqitch: `https://sqitch.org/download/`
    - deploy the DB: `sqitch deploy db:pg:<name-of-the-DB>`

### Mocha Test

in the terminal: `npm test` \
the test create facke test data for you and drop it just after.

### Launch

in the terminal: `npm start`

### API test

- `npm start`
- `api.http`

### Swagger Documentation

`http://localhost:3000/api-docs`
