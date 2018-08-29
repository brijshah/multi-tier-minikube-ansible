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

  // React lets us know when the input field changes as in the user types a new character or deletes a character
  // You can create a handler for onChange to take care of this event
  // handleTodoChange is in charge, React will pass the event (e) into our handler
  // e.target is the actual html element the <input/> tag
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

  // w/ React the most important method is render(). It returns plain old html
  // Whats important to note about the App component is that it renders a input field + button combo and a list component
  // Input field to allow user input for their todo and the button to actually handle the action when they are finished
  // 
  // the input field will keep track of what the user is typing, need to keep it in state since its always changing
  // handleAddTodo will check if the user wrote any thing in the input box, if yes it'll fire an API Call to save that new todo
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
