import { createContext, useContext, useReducer } from 'react';

/**
 * Session 17: Combines useReducer + Context to manage global todo state.
 */
const TodoContext = createContext();

const initialState = { todos: [] };

function todoReducer(state, action) {
  switch (action.type) {
    case 'ADD_TODO':
      return { todos: [...state.todos, { id: Date.now(), text: action.payload, completed: false }] };
    case 'TOGGLE_TODO':
      return { todos: state.todos.map(t => t.id === action.payload ? { ...t, completed: !t.completed } : t) };
    case 'REMOVE_TODO':
      return { todos: state.todos.filter(t => t.id !== action.payload) };
    default:
      return state;
  }
}

export function TodoProvider({ children }) {
  const [state, dispatch] = useReducer(todoReducer, initialState);

  const addTodo = (text) => dispatch({ type: 'ADD_TODO', payload: text });
  const toggleTodo = (id) => dispatch({ type: 'TOGGLE_TODO', payload: id });
  const removeTodo = (id) => dispatch({ type: 'REMOVE_TODO', payload: id });

  return (
    <TodoContext.Provider value={{ todos: state.todos, addTodo, toggleTodo, removeTodo }}>
      {children}
    </TodoContext.Provider>
  );
}

export function useTodos() {
  const context = useContext(TodoContext);
  if (!context) throw new Error('useTodos must be used within TodoProvider');
  return context;
}
