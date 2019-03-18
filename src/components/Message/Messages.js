import React, { Component } from 'react';

import { AuthUserContext } from '../Session';
import { withFirebase } from '../Firebase';
import MessageList from './MessageList';

class Messages extends Component {
    constructor(props) {
        super(props);

        this.state = {
            text: '',
            loading: false,
            messages: [],
            limit: 5,
        };
    }

    componentDidMount() {
        this.onListenToMessages();
    }

    onListenToMessages() {
        this.setState({ loading: true });

        this.props.firebase.messages()
        .orderByChild('createdAt')
        .limitToLast(this.state.limit)
        .on('value', snapshot => {
            const messageObject = snapshot.val();

            if (messageObject) {
                const messageList = Object.keys(messageObject).map(key => ({
                    ...messageObject[key],
                    uid: key,
                }));

                this.setState({ 
                    messages: messageList,
                    loading: false,
                });
            } else {
                this.setState({ messages: null, loading: false });
            }
        });
    }

    componentWillUnmount() {
        this.props.firebase.messages().off();
    }

    onChangeText = event => {
        this.setState({ text: event.target.value });
    };

    onCreateMessage = (event, authUser) => {
        this.props.firebase.messages().push({
            text: this.state.text,
            userId: authUser.uid,
            createdAt: this.props.firebase.serverValue.TIMESTAMP,
        });

        this.setState({ text: '' });

        event.preventDefault();
    }

    onEditMessage = (message, text) => {
        this.props.firebase.message(message.uid).set({
            ...message,
            text,
            editedAt: this.props.firebase.serverValue.TIMESTAMP,
        });
    };

    onRemoveMessage = uid => {
        this.props.firebase.message(uid).remove();
    };

    onNextPage = () => {
        this.setState(
            state => ({ limit: state.limit + 5 }),
            this.onListenToMessages,
        );
    };

    render() {
        const { users } = this.props;
        const { text, messages, loading } = this.state;

        return (
            <AuthUserContext.Consumer>
                {authUser => (
                    <div>
                        {loading && <div>loading...</div>}

                        {messages ? (
                            <MessageList 
                                messages={messages.map(message => ({
                                    ...message,
                                    user: users ? users[message.userId] : { userId: message.userId },
                                }))}
                                onEditMessage={this.onEditMessage}
                                onRemoveMessage={this.onRemoveMessage}
                            />
                        ) : (
                            <div class="alert alert-primary" role="alert">There are no messages ...</div>
                        )}

                        {!loading && messages && (
                            <div class="d-flex justify-content-end">
                                <button type="button" class="btn btn-outline-primary my-2 my-sm-0" onClick={this.onNextPage}><i class="fas fa-arrow-circle-down"></i> More</button>
                            </div>
                        )}

                        <div class="top-to-item">
                            <form onSubmit={event => this.onCreateMessage(event, authUser)}>
                                <div class="input-group mb-3">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text"><i class="fas fa-sms"></i></span>
                                    </div>
                                    <input type="text" class="form-control" placeholder="Enter your message" value={text} onChange={this.onChangeText} />
                                    <div class="input-group-append">
                                        <button type="submit" class="btn btn-outline-primary my-2 my-sm-0"><i class="fas fa-share-square"></i> Send</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </AuthUserContext.Consumer>
        );
    }
}

export default withFirebase(Messages);