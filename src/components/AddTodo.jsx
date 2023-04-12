import { useState } from 'react';
import {
  Button,
  FormControl,
  Input, Spinner,
} from '@chakra-ui/react';
import {useMutation} from '@apollo/client';
import {ADD_TODO, ALL_TODO} from '../apollo/todos';

const AddTodo = () => {
  const [text, setText] = useState('');
  const [addTodo, {loading, error}] = useMutation(ADD_TODO,
    {
      // refetchQueries: [{query: ALL_TODO}], // This is the old way
      update(cache, {data: {newTodo} }) {
        const {todos} = cache.readQuery({query: ALL_TODO});
        cache.writeQuery({
          query: ALL_TODO,
          data: {todos: [...todos, newTodo]}
        });
      }
    }
    );

  const handleAddTodo = () => {
    if (text.trim().length) {
      addTodo({
        variables: {
          title: text,
          user_id: 1,
          completed: false,
        }
      });
      setText('');
    }
  }

  const handleKey = (event) => {
    if (event.key === "Enter") handleAddTodo();
  }

  if (loading) return <Spinner/>;
  if (error) return <p>Error :(</p>;

  return (
    <FormControl display={'flex'} mt={6}>
      <Input
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyPress={handleKey}
      />
      <Button onClick={handleAddTodo}>Add todo</Button>
    </FormControl>
  );
};

export default AddTodo;
