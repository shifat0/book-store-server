# Book Store API

This is a simple Book Store API built with Node.js, Express, MySQL, and Knex.js. The API provides endpoints to manage authors and books.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Databse Setup](#database-setup)
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

## Databse Setup

1. Create a MySQL database:

```bash
CREATE DATABASE book_store;
```

2. Create a .env file:

.env.example file is given in this repository. Follow the .env.example

3. Run Migrations:

```bash
npm run migrate
```

Migration files are located at './src/models/migrations' folder

## Run the server

```bash
npm run dev
```
