import React, { Component } from "react"

class TodoItem extends Component {
  constructor(props) {
    super(props)

    this.state = {
      editMode: false,
      editText: this.props.todo.text
    }
  }

  onToggleEditMode = () => {
    this.setState(state => ({
      editMode: !state.editMode,
      editText: this.props.todo.text
    }))
  }

  onChangeEditText = event => {
    this.setState({ editText: event.target.value })
  }

  onSaveEditText = () => {
    this.props.onEditTodo(this.props.todo, this.state.editText)
    this.setState({ editMode: false })
  }

  render() {
    const { todo, onRemoveTodo, onCheckTodo } = this.props
    const { editMode, editText } = this.state
    const isDone = todo.completed ? "done" : "undone"

    return (
      <li class="list-group-item d-flex justify-content-between align-items-center">
        {editMode ? (
            <div class="input-group">
                <div class="input-group-prepend">
                    <span class="input-group-text"><i class="fas fa-pen-square"></i></span>
                </div>
                <input type="text" class="form-control text-md" placeholder="Enter your Todo item" value={editText} onChange={this.onChangeEditText} />
                <div class="input-group-append">
                    <button type="button" class="btn-sm btn-outline-primary ml-1" onClick={this.onSaveEditText}><i class="fas fa-save"></i> </button>
                    <button type="button" class="btn-sm btn-outline-primary ml-1" onClick={this.onToggleEditMode}><i class="fas fa-undo-alt"></i> </button>
                </div>
            </div>
        ) : (
            <div>
                <label className={isDone}>
                <input
                    type="checkbox"
                    className="mr-2"
                    onChange={() => onCheckTodo(todo)}
                    checked={todo.completed}
                /> {todo.text} {todo.editedAt && <span>(Edited)</span>}
                </label>
            </div>
        )}

        {!editMode && (
            <div>
                <button type="button" class="btn-sm btn-outline-primary ml-1 my-sm-0" onClick={this.onToggleEditMode}><i class="fas fa-pen-square"></i> </button>
                <button type="button" class="btn-sm btn-outline-danger ml-1 my-sm-0" onClick={() => onRemoveTodo(todo.uid)}><i class="fas fa-minus-square"></i> </button>
            </div>
        )}
    </li>
    )
  }
}

export default TodoItem
