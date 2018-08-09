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

  fetchTodos() {
    fetch('http://localhost:8080/todos')
      .then(res => res.json())
      .then(todos => {
        this.setState({ todos });
      });
  }

  postTodo(todo, callback) {
    fetch('http://localhost:8080/todos', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(todo)
      })
      .then(() => {
        callback();
      })
  }

  render() {
    const { todo, todos } = this.state;

    return (
      <div>
        <Input value={todo} onChange={this.handleTodoChange} />
        <Button onClick={this.handleAddTodo}>Add Todo</Button>
        <List items={todos}></List>
      </div>
    );
  }

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

    this.postTodo({ label: todo }, () => {
      // clear input field
      // add todo to list
      this.setState({
        todo: "",
        todos: [...todos, {
          label: todo
        }]
      });
    })

  }
}

export default App;
