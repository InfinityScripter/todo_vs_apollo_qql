import {VStack} from '@chakra-ui/react';
import {Spinner} from '@chakra-ui/react';
import {useQuery, useMutation, InMemoryCache} from '@apollo/client'

import TodoItem from './TodoItem';
import TotalCount from './TotalCount';
import {ALL_TODO, UPDATE_TODO,DELETE_TODO} from '../apollo/todos';

const TodoList = () => {
  const {loading,error,data } = useQuery(ALL_TODO);
  const [toggleTodo,{error:updateError}] = useMutation(UPDATE_TODO);
  // const [deleteTodo,{error:deleteError}] = useMutation(DELETE_TODO,{
  //   update(cache,{data:{deleteTodo}}){
  //     const {todos} = cache.readQuery({query:ALL_TODO});
  //     cache.writeQuery({
  //       query:ALL_TODO,
  //       data:{todos:todos.filter(todo=>todo.id!==deleteTodo.id)}
  //     })
  //   }
  // });

  const [deleteTodo,{error:deleteError}] = useMutation(DELETE_TODO,{
    update(cache,{data:{deleteTodo}}){
      cache.modify({
        fields:{
          allTodos(existingTodos){
            return existingTodos.filter(todo=>todo.__ref!==`Todo:${deleteTodo.id}`)
          }
        }
      })
    }
  });

  if (loading) return <Spinner/>;
  if (error||updateError||deleteError) return <p>Error :(</p>;

  return (
    <>
      <VStack spacing={2} mt={4}>
        {data.todos.map ((todo) => (
          <TodoItem
            key={todo.id}
            onToggleTodo={toggleTodo}
            onDeleteTodo={deleteTodo}
            {...todo}
          />
        ))}
      </VStack>
      <TotalCount/>
    </>
  );
};

export default TodoList;
