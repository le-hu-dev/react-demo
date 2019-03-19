import React, { Component } from "react"

import { AuthUserContext } from "../Session"
import { withFirebase } from "../Firebase"
import TodoList from "./TodoList"

class Todo extends Component {
  constructor(props) {
    super(props)
    this.state = {
      text: "",
      loading: false,
      //data source
      todos: []
    }
  }

  componentDidMount() {
    this.onListenToTodos()
  }

  onListenToTodos() {
    this.setState({ loading: true })
    this.props.firebase
      .todos()
      .orderByChild("createdAt")
      .on("value", snapshot => {
        const todoObject = snapshot.val()

        if (todoObject) {
          const todoList = Object.keys(todoObject).map(key => ({
            ...todoObject[key],
            uid: key
          }))

          this.setState({
            todos: todoList,
            loading: false
          })
        } else {
          this.setState({ todos: null, loading: false })
        }
      })
  }

  componentWillUnmount() {
    this.props.firebase.todos().off()
  }

  onChangeText = event => {
    this.setState({ text: event.target.value })
  }

  onCreateTodo = (event, authUser) => {
    this.props.firebase.todos().push({
      text: this.state.text,
      userId: authUser.uid,
      createdAt: this.props.firebase.serverValue.TIMESTAMP,
      // completed ? yse/no
      completed: false
    })

    this.setState({ text: "" })
    event.preventDefault()
  }

  // text = {"aasdfasdf"}
  onEditTodo = (todo, text) => {
    this.props.firebase.todo(todo.uid).set({
      ...todo,
      text,
      editedAt: this.props.firebase.serverValue.TIMESTAMP
    })
  }

  onRemoveTodo = uid => {
    this.props.firebase.todo(uid).remove()
  }

  onCheckTodo = todo => {
    //set style;
    this.props.firebase.todo(todo.uid).set({
      ...todo,
      completed: !todo.completed,
      editedAt: this.props.firebase.serverValue.TIMESTAMP
    })
  }

  // onNextPage = () => {
  //   this.setState(state => ({ limit: state.limit + 5 }), this.onListenToTodos)
  // }

  render() {
    // const { users } = this.props
    const { text, todos, loading } = this.state

    return (
      <AuthUserContext.Consumer>
        {authUser => (
          <div>
            {loading && <div>loading...</div>}
            <label> {authUser.email} </label>
            {todos ? (
              <div>
                <TodoList
                  todos={todos.filter(todo => authUser.uid === todo.userId)}
                  onEditTodo={this.onEditTodo}
                  onRemoveTodo={this.onRemoveTodo}
                  onCheckTodo={this.onCheckTodo}
                />
              </div>
            ) : (
              <div class="alert alert-primary" role="alert">
                There are no todos ...
              </div>
            )}

            <div class="top-to-item">
              <form onSubmit={event => this.onCreateTodo(event, authUser)}>
                <div class="input-group mb-3">
                  <div class="input-group-prepend">
                    <span class="input-group-text">
                      <i class="fas fa-list-alt" />
                    </span>
                  </div>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Enter your Todo item"
                    value={text}
                    onChange={this.onChangeText}
                  />
                  <div class="input-group-append">
                    <button
                      type="submit"
                      class="btn btn-outline-primary my-2 my-sm-0"
                    >
                      <i class="fas fa-share-square" /> Add
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        )}
      </AuthUserContext.Consumer>
    )
  }
}

export default withFirebase(Todo)
