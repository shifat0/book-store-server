import db from '../db';

async function createAuthorsTable() {
  const exists = await db.schema.hasTable('authors');

  if (!exists) {
    await db.schema.createTable('authors', (table) => {
      table.increments('id').primary();
      table.string('name').notNullable();
      table.text('bio');
      table.date('birthdate').notNullable();
    });
    console.log('Authors table created');
  } else {
    console.log('Authors table already exists');
  }
}

createAuthorsTable()
  .then(() => {
    console.log('Authors table setup complete');
  })
  .catch((err) => {
    console.error('Error setting up authors table:', err);
  })
  .finally(() => {
    db.destroy();
  });
