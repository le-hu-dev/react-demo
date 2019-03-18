import React, { Component } from 'react';
import { compose } from 'recompose';

import { AuthUserContext, withAuthorization, withEmailVerification } from '../Session';
import { withFirebase } from '../Firebase';
import Todo from './Todo';

class TodoPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            users: null,
        };
    }

    componentDidMount() {
        this.props.firebase.users().on('value', snapshot => {
            this.setState({
                users: snapshot.val(),
            });
        });
    }

    componentWillUnmount() {
        this.props.firebase.users().off();
    }

    render() {
        return (
            <div class="container">
                <div class="row top-to-header">
                    <div class="col-sm-11 col-md-11 col-lg-10 mx-auto">
                        <h1>My Todo List</h1>

                        <AuthUserContext.Consumer>
                            {authUser => (
                                <Todo users={this.state.users} authUser={authUser} />
                            )}
                        </AuthUserContext.Consumer>
                    </div>
                </div>
            </div>
        );
    }
}

const condition = authUser => !!authUser;

export default compose(
    withFirebase,
    withEmailVerification,
    withAuthorization(condition),
)(TodoPage);
