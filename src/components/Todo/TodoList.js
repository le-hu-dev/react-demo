import React from 'react';

import TodoItem from './TodoItem';

const TodoList = ({ todos, onEditTodo, onRemoveTodo }) => (
    <table class="table top-to-header">
        {todos.map(todo => (
            <TodoItem 
                key={todo.uid}
                todo={todo}
                onEditTodo={onEditTodo}
                onRemoveTodo={onRemoveTodo}
            />
        ))}
    </table>
);

export default TodoList;