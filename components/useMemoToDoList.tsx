import { JSXElementConstructor, Key, ReactElement, ReactFragment, useMemo } from 'react';
import { filterTodos } from '../lib/useMemoUtils'

interface Props {
  todos: any
  theme: string
  tab: string
}
export default function TodoList({ todos, theme, tab } : Props) {
  const visibleTodos = useMemo(
    () => filterTodos(todos, tab),
    [todos, tab]
  );
  return (
    <div className={theme}>
      <p><b>Note: <code>filterTodos</code> is artificially slowed down!</b></p>
      <ul>
        {visibleTodos.map((todo: { id: Key | null | undefined; completed: any; text: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | ReactFragment | null | undefined; }) => (
          <li key={todo.id}>
            {todo.completed ?
              <s>{todo.text}</s> :
              todo.text
            }
          </li>
        ))}
      </ul>
    </div>
  );
}