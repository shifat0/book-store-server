import db from '../db';

db.schema
  .createTableIfNotExists('authors', (table) => {
    table.increments('id').primary();
    table.string('name').notNullable();
    table.text('bio');
    table.date('birthdate').notNullable();
  })
  .then(() => {
    console.log('Authors table created');
  })
  .catch((error) => {
    console.error('Error creating authors table:', error);
  })
  .finally(() => {
    db.destroy();
  });
