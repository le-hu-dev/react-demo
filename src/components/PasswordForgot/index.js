import React, { Component } from "react";
import { Link } from "react-router-dom";

import { withFirebase } from "../Firebase";
import * as ROUTES from "../../constants/routes";

const PasswordForgotPage = () => (
  <div className="container">
    <div className="row top-to-header">
      <div className="col-sm-10 col-md-8 col-lg-6 mx-auto">
        <PasswordForgotForm />
      </div>
    </div>
  </div>
);

const INITIAL_STATE = {
  email: "",
  success: null,
  error: null
};

class PasswordForgotFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    const { email } = this.state;

    this.props.firebase
      .doPasswordReset(email)
      .then(success => {
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

    const isInvalid = email === "";

    return (
      <div className="card card-signin my-5">
        <div className="card-body">
          <h5 className="card-title text-center">Forgot Password</h5>
          {success && (
            <div
              className="alert alert-success alert-dismissible fade show"
              role="alert"
            >
              <strong>Success!</strong> Please check your email to reset your
              password.
              <button
                type="button"
                className="close"
                data-dismiss="alert"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
          )}
          {error && (
            <div
              className="alert alert-danger alert-dismissible fade show"
              role="alert"
            >
              <strong>Error!</strong> {error.message}
              <button
                type="button"
                className="close"
                data-dismiss="alert"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
          )}
          <form className="form-signin" onSubmit={this.onSubmit}>
            <div className="form-label-group">
              <input
                type="email"
                id="inputEmail"
                name="email"
                value={this.state.email}
                onChange={this.onChange}
                className="form-control"
                placeholder="Email Address"
                required
                autofocus
              />
              <label for="inputEmail">Email Address</label>
            </div>

            <button
              className="btn btn-lg btn-primary btn-block text-uppercase"
              disabled={isInvalid}
              type="submit"
            >
              <i className="fas fa-envelope" /> Reset My Password
            </button>
          </form>
        </div>
      </div>
    );
  }
}

const PasswordForgotLink = () => (
  <div className="d-flex justify-content-end top-to-item">
    <Link className="card-link" to={ROUTES.PASSWORD_FORGOT}>
      Forgot Password?
    </Link>
  </div>
);

const PasswordForgotForm = withFirebase(PasswordForgotFormBase);

export default PasswordForgotPage;

export { PasswordForgotForm, PasswordForgotLink };
