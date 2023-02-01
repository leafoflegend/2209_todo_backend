import {
  Card,
  CardContent,
  Typography,
  Checkbox,
  FormGroup,
  FormControlLabel,
} from '@mui/material';

const Todo = ({ todo: { title, description, completed, id }, markComplete }) => {
  return (
    <Card style={{ minWidth: '400px', maxWidth: '400px', margin: '1em' }}>
      <CardContent>
        <Typography variant="h5" component="div">
          {title}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {description}
        </Typography>
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                checked={completed}
                onChange={() => markComplete(id, !completed)}
              />
            }
            label={'Completed'}
          />
        </FormGroup>
      </CardContent>
    </Card>
  );
};

export default Todo;
