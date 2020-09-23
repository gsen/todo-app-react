import React, { useState, useEffect } from 'react';
import './App.css';
import Todo from './Todo';
import db from './firebase';
import Modal from './Modal';

const CollectionName = 'tasks';

function App() {

  const [todos, setTodos] = useState([]);


  useEffect(() => {
    db.collection(CollectionName).orderBy('timestamp').onSnapshot((snapshot) => {
      setTodos(snapshot.docs.map(doc => ({
        id: doc.id, title: doc.data().task, completed: doc.data().completed
      })));
    })
  }, []);

  const addTodo = (event) => {
    event.preventDefault();
    let newTodo = {
      id: "new",
      title: "",
      completed: false
    }
    setTodos([...todos, newTodo]);
  }

  const deleteTodo = (e, todoId) => {
    const index = todos.findIndex(todo => todo.id == todoId);
    if (index > -1) {
      todos.splice(index, 1);
      setTodos([...todos]);
    }
    if (todoId !== 'new') {
      db.collection(CollectionName).doc(todoId).delete();
    }
  }

  const onUpdate = (updatedTask) => {
    if (updatedTask && updatedTask.id !== 'new') {
      db.collection(CollectionName).doc(updatedTask.id).update({
        task: updatedTask.task,
        completed: updatedTask.completed
      });
    } else {
      db.collection(CollectionName).add({
        task: updatedTask.task,
        completed: updatedTask.completed,
        timestamp: Date.now()
      });
    }
  }
  return (
    <div className="main">
      <div className="container">
        <div className="heading">

          <span className="underlined">Things to do</span>
        </div>
        <div className="todos-container">
          {
            todos.map(todo => (
              <Todo key={todo.id} id={todo.id} title={todo.title} completed={todo.completed} onDelete={deleteTodo} onUpdate={onUpdate} />
            ))
          }
        </div>
        <div className="floating-btn" onClick={addTodo}>+</div>
      </div>
    </div >
  );
}

export default App;
