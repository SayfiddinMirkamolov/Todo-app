import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

function TodoModal({ show, onHide, onSave, todo }) {
  const [title, setTitle] = useState('');

  useEffect(() => {
    if (todo) {
      setTitle(todo.title);
    } else {
      setTitle('');
    }
  }, [todo]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTodo = { id: todo ? todo.id : Date.now(), title };
    onSave(newTodo);
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>{todo ? 'Edit Todo' : 'Add Todo'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>Todo</Form.Label>
            <Form.Control 
              type="text" 
              value={title} 
              onChange={(e) => setTitle(e.target.value)} 
              placeholder="Enter your todo" 
            />
          </Form.Group>
          <Button variant="primary" type="submit" className="mt-3">
            Save
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default TodoModal;
