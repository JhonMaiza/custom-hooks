import { useEffect, useReducer } from "react";
import { todoReducer } from "../08-reducer/todoReducer";

// const initialState = [
//    { 
//      id: new Date().getTime(),
//      description: 'Recolectrar la piedra del alma'
//    },
//    { 
//      id: new Date().getTime() * 3,
//      description: 'Recolectrar la piedra del poder'
//    }
// ]

const init = () => {
  return JSON.parse( localStorage.getItem( 'todos' )) || [];
}

export const useTodos = () => {

  // const [ todos, dispatch ] = useReducer( todoReducer, initialState, init);
  const [ todos, dispatch ] = useReducer( todoReducer, [], init);

  useEffect( () => {
    localStorage.setItem('todos', JSON.stringify( todos ))
  }, [ todos ])

  const handleNewTodo = ( todo ) => {
    const action = {
      type: '[TODO] Add Todo',
      payload: todo
    };
    dispatch( action );
  };

  const handleDeleteTodo = ( id ) => {
    const action = {
      type:'[TODO] Remove Todo',
      payload: id
    }
    dispatch( action );
  };

  const handleToggleTodo = ( id ) => {
    const action = {
      type: '[TODO] Toggle Todo',
      payload: id,
    };
    dispatch( action );
  };

  return {
    todos,
    todosCount: todos.length,
    pendingTodosCount: todos.filter( todo => !todo.done ).length,
    handleNewTodo,
    handleToggleTodo,
    handleDeleteTodo
  }
}