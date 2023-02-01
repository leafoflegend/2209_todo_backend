import * as pg from 'pg';
import { DB_NAME } from '../consts.js';

const { Client } = pg.default;

let todoBackendDB;

const connectToDB = async () => {
  console.log('Connecting to DB...');

  todoBackendDB = new Client(`postgres://eszwajkowski@localhost:5432/${DB_NAME}`);

  try {
    await todoBackendDB.connect();
  } catch (e) {
    console.error(e);
    console.warn(`Failed to connect to database, exiting.`);

    process.exit(1);
  }

  console.log('Connection to DB successful.');

  return true;
};

const getDB = () => {
  if (!todoBackendDB) {
    throw new Error(`Cannot get a DB you are not connected to!`);
  }

  return todoBackendDB;
};

const closeDB = async () => {
  const db = getDB();

  try {
    await db.end();
  } catch (e) {
    console.error(e);
    console.warn(`Failed to gracefully close connection with Database.`);

    process.exit(1);
  }
};

export {
  connectToDB,
  getDB,
  closeDB,
};
