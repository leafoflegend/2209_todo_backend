import { getDB, connectToDB, closeDB } from './connection.js';
import seed from './seed.js';

const createTodo = async (todo) => {
  const db = getDB();

  const {
    title,
    description,
    location = '',
    dueDate = '',
    completed = false,
  } = todo;

  try {
    await db.query(`
INSERT INTO todo (title, description, location, due_date, completed) 
VALUES ($1, $2, $3, $4, $5); 
    `, [title, description, location, dueDate, completed])

    return true;
  } catch (e) {
    console.error(`Query to insert todo failed.\n${JSON.stringify(todo, null, 2)}\n${e}`);

    return false;
  }
};

const markCompletion = async (uuid, complete) => {
  const db = getDB();

  try {
    await db.query(`
UPDATE todo
SET completed = $1
WHERE id = $2;
    `, [complete, uuid]);

    return true;
  } catch (e) {
    console.error(`Query to update todo failed.\nUUID: ${uuid}\ncomplete: ${complete}\n${e}`);

    return false;
  }
};

const getTodos = async () => {
  const db = getDB();

  try {
    const { rows } = await db.query(`
SELECT * FROM todo;
    `);

    return rows;
  } catch (e) {
    console.error(`Query to get todos failed. ${e}`);
  }
};

export {
  getDB,
  closeDB,
  connectToDB,
  createTodo,
  markCompletion,
  getTodos,
  seed,
};
