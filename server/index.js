import {
  connectToDB,
  createTodo,
  getTodos,
  markCompletion,
} from './db/index.js';
import { startServer, server } from './server.js';

const startApplication = async () => {
  console.log(`Starting application.`);

  await connectToDB();

  server.get('/api/todo', async (req, res) => {
    const todos = await getTodos();

    res.send({
      todos,
    });
  });

  server.post('/api/todo', async (req, res) => {
    const { todo } = req.body;

    await createTodo(todo);

    res.sendStatus(201);
  });

  server.put('/api/todo', async (req, res) => {
    const { uuid, complete } = req.query;

    let boolComplete = complete === 'true' ? true : false;

    await markCompletion(uuid, boolComplete);

    res.sendStatus(202);
  });

  await startServer();
  console.log(`Application started successfully.`);
};

startApplication();
