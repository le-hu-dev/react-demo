import React from "react"

import TodoItem from "./TodoItem"

const TodoList = ({ todos, onEditTodo, onRemoveTodo, onCheckTodo }) => (
  <ul class="list-group top-to-header">
    {todos.map(todo => (
      <TodoItem
        key={todo.uid}
        todo={todo}
        onEditTodo={onEditTodo}
        onRemoveTodo={onRemoveTodo}
        onCheckTodo={onCheckTodo}
      />
    ))}
  </ul>
)

export default TodoList
