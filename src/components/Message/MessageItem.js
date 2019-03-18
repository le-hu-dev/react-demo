import React, { Component } from 'react';

class MessageItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            editMode: false,
            editText: this.props.message.text,
        };
    }

    onToggleEditMode = () => {
        this.setState(state => ({
            editMode: !state.editMode,
            editText: this.props.message.text,
        }));
    };

    onChangeEditText = event => {
        this.setState({ editText: event.target.value });
    };

    onSaveEditText = () => {
        this.props.onEditMessage(this.props.message, this.state.editText);

        this.setState({ editMode: false });
    }

    render() {
        const { message, onRemoveMessage } = this.props;
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
                        <td>{message.user.username}</td>
                        <td>{message.user.userId}</td>
                        <td>{message.text}</td>
                        <td>{message.editedAt && <span>(Edited)</span>}</td>
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
                        <button type="button" class="btn-sm btn-outline-danger my-2 my-sm-0" onClick={() => onRemoveMessage(message.uid)}><i class="fas fa-minus-square"></i> </button>
                    </td>
                )}
                </tr>
            </tbody>
        );
    }
}

export default MessageItem;