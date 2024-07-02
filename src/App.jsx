import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TodoList from './components/TodoList';
import TodoModal from './components/TodoModal';
import { Button, Container, Form, Spinner } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editTodo, setEditTodo] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:3001/todos')
      .then(response => {
        setTodos(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error(error);
        setLoading(false);
      });
  }, []);

  const handleAddTodo = (todo) => {
    axios.post('http://localhost:3001/todos', todo)
      .then(response => setTodos([...todos, response.data]))
      .catch(error => console.error(error));
    setShowModal(false);
  };

  const handleUpdateTodo = (updatedTodo) => {
    axios.put(`http://localhost:3001/todos/${updatedTodo.id}`, updatedTodo)
      .then(response => {
        const updatedTodos = todos.map(todo => 
          todo.id === updatedTodo.id ? updatedTodo : todo
        );
        setTodos(updatedTodos);
      })
      .catch(error => console.error(error));
    setEditTodo(null);
    setShowModal(false);
  };

  const handleDeleteTodo = (id) => {
    axios.delete(`http://localhost:3001/todos/${id}`)
      .then(() => setTodos(todos.filter(todo => todo.id !== id)))
      .catch(error => console.error(error));
  };

  const filteredTodos = todos.filter(todo => 
    todo.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Container className={darkMode ? 'bg-dark text-light' : ''}>
      <h1>Todo List</h1>
      <Form.Control 
        type="text" 
        placeholder="Search todos..." 
        value={search} 
        onChange={(e) => setSearch(e.target.value)} 
        className="mb-3"
      />
      <Button onClick={() => setShowModal(true)}>Add Todo</Button>
      <Button onClick={() => setDarkMode(!darkMode)} className="ms-2">
        {darkMode ? 'Light Mode' : 'Dark Mode'}
      </Button>
      {loading ? (
        <Spinner animation="border" />
      ) : (
        <TodoList 
          todos={filteredTodos} 
          onEdit={(todo) => {
            setEditTodo(todo);
            setShowModal(true);
          }} 
          onDelete={handleDeleteTodo} 
        />
      )}
      <TodoModal 
        show={showModal} 
        onHide={() => {
          setShowModal(false);
          setEditTodo(null);
        }} 
        onSave={editTodo ? handleUpdateTodo : handleAddTodo} 
        todo={editTodo} 
      />
    </Container>
  );
}

export default App;
