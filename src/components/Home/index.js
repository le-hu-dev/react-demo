import React, { Component } from 'react';
import { compose } from 'recompose';

import { withAuthorization, withEmailVerification } from '../Session';
import { withFirebase } from '../Firebase';
// import Messages from '../Message';

class HomePage extends Component {
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

                        <h1>Home Page</h1>
                        <p>This Page is accessible by every signed in user.</p>

                        {/* <Messages users={this.state.users} /> */}
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
)(HomePage);