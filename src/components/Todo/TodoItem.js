import React, { Component } from 'react';

class TodoItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            editMode: false,
            editText: this.props.todo.text,
        };
    }

    onToggleEditMode = () => {
        this.setState(state => ({
            editMode: !state.editMode,
            editText: this.props.todo.text,
        }));
    };

    onChangeEditText = event => {
        this.setState({ editText: event.target.value });
    };

    onSaveEditText = () => {
        this.props.onEditTodo(this.props.todo, this.state.editText);

        this.setState({ editMode: false });
    }

    render() {
        const { todo, onRemoveTodo } = this.props;
        const { editMode, editText } = this.state;

        return (
            <tbody>
                <tr>
                {editMode ? (
                    <div>
                        <td>
                            <input type="text" value={editText} onChange={this.onChangeEditText} />
                            <button type="button" class="btn-sm btn-outline-primary my-2 my-sm-0" onClick={this.onSaveEditText}><i class="fas fa-save"></i> </button>
                            <button type="button" class="btn-sm btn-outline-primary my-2 my-sm-0" onClick={this.onToggleEditMode}><i class="fas fa-undo-alt"></i> </button>
                        </td>
                    </div>
                ) : (
                    <div>
                        <td>{todo.user.username}</td>
                        <td>{todo.user.userId}</td>
                        <td>{todo.text}</td>
                        <td>{todo.editedAt && <span>(Edited)</span>}</td>
                    </div>
                )}

                {/* {editMode ? (
                    <input type="text" value={editText} onChange={this.onChangeEditText} />
                ) : (
                    <span>
                        <strong>{message.user.username} || {message.user.userId}</strong> {' '}
                        {message.text} {message.editedAt && <span>(Edited)</span>}
                    </span>
                )} */}
                
                {/* {editMode ? (
                    <span>
                        <button type="button" onClick={this.onSaveEditText}>Save</button>
                        <button type="button" onClick={this.onToggleEditMode}>Cancel</button>
                    </span>
                ) : (
                    <button type="button" onClick={this.onToggleEditMode}>Edit</button>
                )} */}

                {!editMode && (
                    <td>
                        <button type="button" class="btn-sm btn-outline-primary my-2 my-sm-0" onClick={this.onToggleEditMode}><i class="fas fa-pen-square"></i> </button>{' '}
                        <button type="button" class="btn-sm btn-outline-danger my-2 my-sm-0" onClick={() => onRemoveTodo(todo.uid)}><i class="fas fa-minus-square"></i> </button>
                    </td>
                )}
                </tr>
            </tbody>
        );
    }
}

export default TodoItem;