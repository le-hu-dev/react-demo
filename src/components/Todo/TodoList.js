import React from "react"

import TodoItem from "./TodoItem"

const TodoList = ({ todos, onEditTodo, onRemoveTodo, onCheckTodo }) => (
  <table className="table top-to-header">
    {todos.map(todo => (
      <TodoItem
        key={todo.uid}
        todo={todo}
        onEditTodo={onEditTodo}
        onRemoveTodo={onRemoveTodo}
        onCheckTodo={onCheckTodo}
      />
    ))}
  </table>
)

export default TodoList
