import express from 'express';
import { PORT } from './consts.js';

const server = express();
server.use(express.json());

export const startServer = () => new Promise((res) => {
  console.log(`Starting server on PORT:${PORT}...`);

  server.listen(PORT, () => {
    console.log(`Server started on PORT:${PORT}.`);
    res(server);
  });
});

export {
  server,
}
