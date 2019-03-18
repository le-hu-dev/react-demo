import React, { Component } from 'react';
import { withFirebase } from '../Firebase';

const INITIAL_STATE = {
    password: '',
    confirmedPassword: '',
    success: null,
    error: null,
};

class PasswordChangeForm extends Component {
    constructor(props) {
        super(props);

        this.state = { ...INITIAL_STATE };
    }

    onSubmit = event => {
        const { password } = this.state;

        this.props.firebase.doPasswordUpdate(password)
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
    }

    render() {
        const { password, confirmedPassword, success, error } = this.state;

        const isInvalid = password !== confirmedPassword || password === '';

        return (
            <div class="card card-signin my-5">
                <div class="card-body">
                    <h5 class="card-title text-center">Change Password</h5>
                    {success && <div class="alert alert-success alert-dismissible fade show" role="alert">
                        <strong>Success!</strong> Your password is updated.
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
                            <input type="password" id="inputPassword" name="password" value={password} onChange={this.onChange} class="form-control" placeholder="New Password" required />
                            <label for="inputPassword">New Password</label>
                        </div>

                        <div class="form-label-group">
                            <input type="password" id="inputConfirmedPassword" name="confirmedPassword" value={confirmedPassword} onChange={this.onChange} class="form-control" placeholder="Confirm New Password" required />
                            <label for="inputConfirmedPassword">Confirm New Password</label>
                        </div>

                        <button class="btn btn-lg btn-primary btn-block text-uppercase" disabled={isInvalid} type="submit"><i class="fas fa-key"></i> Update My Password</button>
                    </form>
                </div>
            </div>
        )
    }
}

export default withFirebase(PasswordChangeForm);