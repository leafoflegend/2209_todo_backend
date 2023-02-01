import { getDB, connectToDB, closeDB } from './connection.js';

const seed = async (
  drop = true,
  close = true,
) => {
  await connectToDB();
  const db = getDB();

  if (drop) {
    console.log('Dropping previous tables from DB.');
    await db.query(`
DROP TABLE IF EXISTS todo;
    `);
    console.log('Dropping tables successful from DB.');
  }

  console.log('Creating tables in DB.');
  await db.query(`
CREATE TABLE IF NOT EXISTS todo (
    id UUID PRIMARY KEY default gen_random_uuid(),
    title VARCHAR(255) UNIQUE NOT NULL,
    description VARCHAR(255) NOT NULL,
    location VARCHAR(255),
    due_date VARCHAR(255),
    completed BOOLEAN DEFAULT FALSE
);
  `);
  console.log('Creating tables in DB successful.');

  if (close) {
    console.log('Closing connection to DB.');
    await closeDB();
    console.log('Connection to DB closed.');
  }
};

export default seed;
