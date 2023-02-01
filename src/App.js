import { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Modal,
  Button,
  Box,
  TextField,
  Checkbox,
  FormGroup,
  FormControlLabel,
  Typography,
} from '@mui/material';
import Todo from './Todo.js';

const style = {
  color: 'white',
  position: 'absolute',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};


function App() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [complete, setComplete] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [todos, setTodos] = useState([]);

  const getTodos = async () => {
    const { data: { todos: responseTodos } } =  await axios.get('/api/todo');

    responseTodos.sort((a, b) => {
      return a.title > b.title;
    });

    setTodos(responseTodos);
  };

  useEffect(() => {
    getTodos();
  }, []);

  const createTodo = async () => {
    await axios.post('/api/todo', {
      todo: {
        title,
        description,
        completed: complete,
      },
    });

    await getTodos();

    setTitle('');
    setDescription('');
    setComplete(false);
    setModalOpen(false);
  };

  const markComplete = async (uuid, complete) => {
    await axios.put(`/api/todo?uuid=${uuid}&complete=${complete ? 'true' : 'false'}`);

    await getTodos();
  };

  return (
    <div
      style={{
        width: '100vw',
        minWidth: '100vw',
        height: '100vh',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: 'darkslategray',
      }}
    >
      <Typography variant={'h2'}>My Todos</Typography>
      <Button onClick={() => setModalOpen(!modalOpen)}>Create Todo</Button>
      {
        todos.map((todo) => (
          <Todo todo={todo} key={todo.id} markComplete={markComplete} />
        ))
      }
      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
      >
        <Box sx={style}>
          <h2>Todo</h2>
          <FormGroup>
            <TextField
              label={'Title'}
              value={title}
              style={{
                margin: '1em',
              }}
              onChange={
                (e) => {
                  const { target: { value: newTitle } } = e;

                  setTitle(newTitle);
                }
              }
              required
            >
            </TextField>
            <TextField
              label={'Description'}
              value={description}
              multiline
              minRows={3}
              style={{
                margin: '1em',
              }}
              onChange={
                (e) => {
                  const { target: { value: newDescription } } = e;

                  setDescription(newDescription);
                }
              }
              required
            >
            </TextField>
            <FormControlLabel
              style={{
                margin: '1em',
              }}
              control={<Checkbox checked={complete} />}
              onChange={
                () => {
                  setComplete(!complete);
                }
              }
              label={'Completed'}>
            </FormControlLabel>
          </FormGroup>
          <Button onClick={createTodo}>Create Todo</Button>
        </Box>
      </Modal>
    </div>
  );
}

export default App;
