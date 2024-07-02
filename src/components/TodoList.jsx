import React from 'react';
import { ListGroup, Button } from 'react-bootstrap';

function TodoList({ todos, onEdit, onDelete }) {
  return (
    <ListGroup className="mt-3">
      {todos.map(todo => (
        <ListGroup.Item key={todo.id} className="d-flex justify-content-between align-items-center">
          {todo.title}
          <div>
            <Button variant="info" onClick={() => onEdit(todo)}>Edit</Button>
            <Button variant="danger" onClick={() => onDelete(todo.id)} className="ms-2">Delete</Button>
          </div>
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
}

export default TodoList;
