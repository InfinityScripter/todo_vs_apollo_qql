import {VStack} from '@chakra-ui/react';
import {Spinner} from '@chakra-ui/react';
import {useQuery} from '@apollo/client'

import TodoItem from './TodoItem';
import TotalCount from './TotalCount';
import {ALL_TODO} from '../apollo/todos';

const TodoList = () => {
  const {loading,error,data } = useQuery(ALL_TODO);

  if (loading) return <Spinner/>;
  if (error) return <p>Error :(</p>;

  return (
    <>
      <VStack spacing={2} mt={4}>
        {data.todos.map ((todo) => (
          <TodoItem
            key={todo.id}
            {...todo}
          />
        ))}
      </VStack>
      <TotalCount/>
    </>
  );
};

export default TodoList;
