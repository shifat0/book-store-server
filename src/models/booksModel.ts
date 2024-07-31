import db from '../db';

async function createBooksTable() {
  const exists = await db.schema.hasTable('books');

  if (!exists) {
    await db.schema.createTable('books', (table) => {
      table.increments('id').primary();
      table.string('title').notNullable();
      table.text('description');
      table.string('published_date').notNullable();
      table.integer('author_id').unsigned().notNullable();
      table.foreign('author_id').references('id').inTable('authors');
    });
    console.log('Books table created');
  } else {
    console.log('Books table already exists');
  }
}

createBooksTable()
  .then(() => {
    console.log('Schema setup complete');
  })
  .catch((err) => {
    console.error('Error setting up schema:', err);
  })
  .finally(() => {
    db.destroy();
  });
