import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';

const PasswordForgotPage = () => (
    <div class="container">
        <div class="row top-to-header">
            <div class="col-sm-10 col-md-8 col-lg-6 mx-auto">

            <PasswordForgotForm />

            </div>
        </div>
    </div>
);

const INITIAL_STATE = {
    email: '',
    success: null,
    error: null,
};

class PasswordForgotFormBase extends Component {
    constructor(props) {
        super(props);

        this.state = { ...INITIAL_STATE };
    }

    onSubmit = event => {
        const { email } = this.state;

        this.props.firebase.doPasswordReset(email)
        .then((success) => {
            this.setState({ success });
            this.setState({ ...INITIAL_STATE });
        })
        .catch(error => {
            this.setState({ error });
        });

        event.preventDefault();
    };

    onChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

    render() {
        const { email, success, error } = this.state;

        const isInvalid = email === '';

        return (
            <div class="card card-signin my-5">
                <div class="card-body">
                    <h5 class="card-title text-center">Forgot Password</h5>
                    {success && <div class="alert alert-success alert-dismissible fade show" role="alert">
                        <strong>Success!</strong> Please check your email to reset your password.
                        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>}
                    {error && <div class="alert alert-danger alert-dismissible fade show" role="alert">
                        <strong>Error!</strong> {error.message}
                        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>}
                    <form class="form-signin" onSubmit={this.onSubmit}>
                        <div class="form-label-group">
                            <input type="email" id="inputEmail" name="email" value={this.state.email} onChange={this.onChange} class="form-control" placeholder="Email Address" required autofocus />
                            <label for="inputEmail">Email Address</label>
                        </div>

                        <button class="btn btn-lg btn-primary btn-block text-uppercase" disabled={isInvalid} type="submit"><i class="fas fa-envelope"></i> Reset My Password</button>
                    </form>
                </div>
            </div>
        );
    }
}

const PasswordForgotLink = () => (
    <div class="d-flex justify-content-end top-to-item">
        <Link className="card-link" to={ROUTES.PASSWORD_FORGOT}>Forgot Password?</Link>
    </div>
);

const PasswordForgotForm = withFirebase(PasswordForgotFormBase);

export default PasswordForgotPage;

export { PasswordForgotForm, PasswordForgotLink };