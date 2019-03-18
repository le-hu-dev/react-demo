import React, { Component } from 'react';

import { withFirebase } from '../Firebase';

class UserItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            user: null,
            ...props.location.state,
        };
    }

    componentDidMount() {
        if (this.state.user) {
            return;
        }

        this.setState({ loading: true });

        this.props.firebase
        .user(this.props.match.params.id)
        .on('value', snapshot => {
            this.setState({
                user: snapshot.val(),
                loading: false,
            });
        });
    }

    componentWillUnmount() {
        this.props.firebase.user(this.props.match.params.id).off();
    }

    onSendPasswordResetEmail = () => {
        this.props.firebase.doPasswordReset(this.state.user.email);
    }

    render() {
        const { user, loading } = this.state;

        return (
            <div class="card card-signin my-5">
                <div class="card-header bg-dark text-white">
                    User ({this.props.match.params.id})
                </div>
                <div class="card-body">
                    {loading && <div>Loading...</div>}
                    {user && (
                        <div>
                            <p class="card-text"><strong>ID:</strong> {user.uid}</p>
                            <p class="card-text"><strong>Email:</strong> {user.email}</p>
                            <p class="card-text"><strong>Username:</strong> {user.username}</p>
                        </div>
                    )}
                </div>
                <div class="card-footer">
                    <div class="col-sm-10 col-md-8 col-lg-6 mx-auto">
                        <button type="button" class="btn btn-lg-custom btn-outline-primary btn-block text-uppercase" onClick={this.onSendPasswordResetEmail}>
                            <i class="fas fa-envelope"></i> Send Password Reset
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

export default withFirebase(UserItem);