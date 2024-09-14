# Book Store API

This is a simple Book Store API built with Node.js, Express, MySQL, and Knex.js. The API provides endpoints to manage authors and books.

## Table of Contents

- [Installation](#installation)
- [Database Setup](#database-setup)
- [Run the server](#run-the-server)

## Installation

1. Clone the repository:

```bash
git clone https://github.com/shifat0/book-store-server.git
cd book-store-server
```

2. Install the dependencies:

```bash
npm install
```

## Database Setup

1. Create a MySQL database (schema) using MySQL Workbench:

```sql
CREATE SCHEMA book_store;
```

Alternatively, you can use:

```sql
CREATE DATABASE book_store;
```

2. Create a .env file:

.env.example file is given in this repository. Follow the .env.example

3. Run Migrations Already created in the './src/models/migrations' folder:

```bash
npm run migrate
```

Alternatively if you want to create a new migration:

```bash
    npx knex migrate:make <migration-name>
```

After this command migration file will be created in './src/models/migrations' folder. Then run the following command:

```bash
    npm run migrate
```

Your Database is setup now.

## Run the server

The Final step to run the development server.

```bash
npm run dev
```
