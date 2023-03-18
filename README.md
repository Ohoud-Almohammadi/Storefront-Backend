
# Storefront Backend-project 
In this project, i build an RESTFULL API for online store (Book store). 


## Required Libraries/Technologies:
- Postgres for the database
- Node/Express
- dotenv 
- db-migrate 
- jsonwebtoken 
- jasmine for testing


## Pakages:
### dependencies
- npm i bcrypt
- npm i db-migrate
- npm i db-migrate-pg
- npm i dotenv
- npm i express
- npm i jsonwebtoken
- npm i pg 

### dev-dependencies
- npm i @types/bcrypt
- npm i --save-dev @types/express
- npm i --save-dev @types/jasmine
- npm i --save-dev @types/jsonwebtoken
- npm i --save-dev @types/morgan
- npm i --save-dev @types/node
- npm i --save-dev @types/pg
- npm i --save-dev @types/supertest
- npm i --save-dev @typescript-eslint/eslint-plugin
- npm i --save-dev @typescript-eslint/parser
- npm i --save-dev eslint
- npm i --save-dev eslint-config-prettier
- npm i --save-dev eslint-plugin-prettier
- npm i --save-dev express-rate-limit
- npm i --save-dev jasmine
- npm i --save-dev jasmine-spec-reporter
- npm i --save-dev nodemon
- npm i --save-dev prettier
- npm i --save-dev supertest
- npm i --save-dev ts-node
- npm i --save-dev tsc-watch
- npm i --save-dev typescript



## Database Setup:
#### create user in psql:
CREATE USER storefront_user WITH PASSWORD 'password123';

#### create dev Database:
CREATE DATABASE storefront;
#### create test Database:
CREATE DATABASE storefront_test;

#### grant all databases to the user:
GRANT ALL PRIVILEGES ON DATABASE storefront TO storefront_user;
 GRANT ALL PRIVILEGES ON DATABASE storefront_test TO storefront_user;
    
## Database Migraions
db-migrate up

# Migrations used in this project
db-migrate create users-table --sql-file

db-migrate create products-table --sql-file  

db-migrate create orders-table --sql-file

db-migrate create orderProducts-table --sql-file

## .env file  (Environmental Variables )
NODE_ENV=dev
PORT =3000

POSTGRES_HOST=localhost

POSTGRES_PORT=5432

POSTGRES_DB=storefront

POSTGRES_TEST_DB=storefront_test

POSTGRES_USER=postgres

POSTGRES_PASSWORD= your pass

BCRYPT_PASSWORD= your pass

SALT_ROUNDS=10

TOKEN_SECRET=your secret


## Test project
- First, Set the NODE_ENV in the .env file to >> NODE_ENV=test 
- Second, run the folowing >> npm run test

## Run project using watch
npm run watch

The server will start on port 3000 and the database on port 5432.


The command Should migrates up tables for the test database, run the test then migrate down all the tables for the test database.
