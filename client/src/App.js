import React, { Component } from 'react';
import Input from './components/Input';
import List from './components/List';
import Button from './components/Button';

class App extends Component {

  state = {
    todos: [],
    todo: ""
  }

  componentDidMount() {
    this.fetchTodos();
  }

  //
  // API Calls
  //
  fetchTodos() {
    fetch('http://192.168.99.100:30001/todos')
      .then(res => res.json())
      .then(todos => {
        this.setState({ todos });
      });
  }

  postTodo(todo, callback) {
    fetch('http://192.168.99.100:30001/todos', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(todo)
      })
      .then(res => res.json())
      .then((todo) => {
        callback(todo);
      })
  }

  putTodoComplete(todo, callback) {
    fetch(`http://192.168.99.100:30001/todos/${todo._id}`, {
      method: 'put',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ ...todo, status: 'complete' })
    })
    .then(res => res.json())
    .then((todo) => {
      callback(todo);
    })
  }

  deleteTodo(todoId, callback) {
    fetch(`http://192.168.99.100:30001/todos/${todoId}`, {
        method: 'delete'
      })
      .then(() => {
        callback();
      })
  }

  //
  // Event Handlers
  //
  handleTodoChange = (e) => {
    const todo = e.target.value;
    this.setState({ todo });
  }

  handleAddTodo = () => {
    const { todos, todo } = this.state;

    // do not add empty todos to our list
    if(!todo) {
      return;
    }

    this.postTodo({ label: todo }, (newTodo) => {
      // clear input field
      // add todo to list
      this.setState({
        todo: "",
        todos: [...todos, newTodo]
      });
    })
  }

  handleDelete = (oldTodo) => {
    const { todos } = this.state;
    this.deleteTodo(oldTodo._id, () => {
      // remove todo from list
      this.setState({
        todos: todos.filter(todo => todo._id !== oldTodo._id)
      });
    })
  }

  handleCheck = (todo) => {    
    const { todos } = this.state;
    this.putTodoComplete(todo, (newTodo) => {
      const newTodos = [...todos];
      const index = newTodos.findIndex(item => item._id === todo._id);
      newTodos[index] = newTodo;

      this.setState({
        todos: newTodos
      });
    })
  }

  //
  // Component Render
  //  
  render() {
    const { todo, todos } = this.state;

    return (
      <div className="flex flex--center">
        <div className="todo-list">
          <h1>todos</h1>
          <div className="flex">
            <Input value={todo} onChange={this.handleTodoChange} />
            <Button style={{ marginLeft: "10px" }} onClick={this.handleAddTodo}>➕</Button>
          </div>
          <List items={todos}
            onCheck={this.handleCheck}
            onDelete={this.handleDelete}
            />
        </div>
      </div>
    );
  }
}

export default App;
