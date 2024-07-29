import db from '../db';

db.schema
  .createTableIfNotExists('books', (table) => {
    table.increments('id').primary();
    table.string('title').notNullable();
    table.text('description');
    table.date('published_date').notNullable();
    table.integer('author_id').notNullable();
    table.foreign('author_id').references('id').inTable('authors');
  })
  .then(() => {
    console.log('Books table created');
  })
  .catch((err) => {
    console.error('Error creating books table:', err);
  })
  .finally(() => {
    db.destroy();
  });
