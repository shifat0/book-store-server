import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('books', (table) => {
    table.increments('id').primary();
    table.string('title').notNullable();
    table.text('description');
    table.date('publishedDate').notNullable();
    table.integer('authorId').unsigned().notNullable();
    table.foreign('authorId').references('id').inTable('authors');
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('books');
}
