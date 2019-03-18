import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { compose } from "recompose";
import "../SignIn/index.css";

import { withFirebase } from "../Firebase";
import * as ROUTES from "../../constants/routes";
import * as ROLES from "../../constants/roles";

const SignUpPage = () => (
  <div className="container">
    <div className="row top-to-header">
      <div className="col-sm-10 col-md-8 col-lg-6 mx-auto">
        <SignUpForm />
      </div>
    </div>
  </div>
);

const INITIAL_STATE = {
  username: "",
  email: "",
  password: "",
  confirmedPassword: "",
  // agreed: false,
  isAdmin: false,
  error: null
};

const ERROR_CODE_ACCOUNT_EXISTS = "auth/email-already-in-use";
const ERROR_MSG_ACCOUNT_EXISTS = `
An account with this email address already exists. 
Try to login with this account insteat. If you think
the account is already used from one of the social 
logins, try to sign in with one of them. Afterward,
associate your accounts on your personal account page.
`;

class SignUpFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    const { username, email, password, isAdmin } = this.state;
    const roles = [];

    if (isAdmin) {
      roles.push(ROLES.ADMIN);
    }

    this.props.firebase
      .doCreateUserWithEmailAndPassword(email, password)
      .then(authUser => {
        // Create a user in your Firebase Realtime Database
        return this.props.firebase.user(authUser.user.uid).set({
          username,
          email,
          roles
        });
      })
      .then(() => {
        return this.props.firebase.doSendEmailVerification();
      })
      .then(() => {
        this.setState({ ...INITIAL_STATE });
        this.props.history.push(ROUTES.HOME);
      })
      .catch(error => {
        if (error.code === ERROR_CODE_ACCOUNT_EXISTS) {
          error.message = ERROR_MSG_ACCOUNT_EXISTS;
        }

        this.setState({ error });
      });

    event.preventDefault();
  };

  onChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  onChangeCheckAdmin = event => {
    this.setState({ [event.target.name]: event.target.checked });
  };

  render() {
    const {
      username,
      email,
      password,
      confirmedPassword,
      // agreed,
      isAdmin,
      error
    } = this.state;

    const isInvalid =
      // !agreed ||
      password !== confirmedPassword ||
      password === "" ||
      email === "" ||
      username === "";

    return (
      <div className="card card-signin my-5">
        <div className="card-body">
          <h5 className="card-title text-center">Create Account</h5>
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
                type="text"
                id="inputUsername"
                name="username"
                value={username}
                onChange={this.onChange}
                className="form-control"
                placeholder="Full Name"
                required
                autofocus
              />
              <label for="inputUsername">Full Name</label>
            </div>

            <div className="form-label-group">
              <input
                type="email"
                id="inputEmail"
                name="email"
                value={email}
                onChange={this.onChange}
                className="form-control"
                placeholder="Email Address"
                required
                autofocus
              />
              <label for="inputEmail">Email Address</label>
            </div>

            <div className="form-label-group">
              <input
                type="password"
                id="inputPassword"
                name="password"
                value={password}
                onChange={this.onChange}
                className="form-control"
                placeholder="Password"
                required
              />
              <label for="inputPassword">Password</label>
            </div>

            <div className="form-label-group">
              <input
                type="password"
                id="inputConfirmedPassword"
                name="confirmedPassword"
                value={confirmedPassword}
                onChange={this.onChange}
                className="form-control"
                placeholder="Confirm Password"
                required
              />
              <label for="inputConfirmedPassword">Confirm Password</label>
            </div>

            <div className="custom-control custom-checkbox mb-3">
              <input
                type="checkbox"
                id="checkAdmin"
                name="isAdmin"
                checked={isAdmin}
                onChange={this.onChangeCheckAdmin}
                className="custom-control-input"
              />
              <label className="custom-control-label" for="checkAdmin">
                Admin Role
              </label>
            </div>

            <div className="custom-control custom-checkbox mb-3">
              <input
                type="checkbox"
                id="checkTerms"
                className="custom-control-input"
              />
              <label className="custom-control-label" for="checkTerms">
                I agree to the{" "}
                <Link className="card-link" to={ROUTES.SIGN_UP}>
                  Terms of Privacy
                </Link>
              </label>
            </div>

            <button
              className="btn btn-lg btn-primary btn-block text-uppercase"
              disabled={isInvalid}
              type="submit"
            >
              <i className="fas fa-user-plus" /> Sign up
            </button>
          </form>
        </div>
      </div>
    );
  }
}

const SignUpForm = compose(
  withRouter,
  withFirebase
)(SignUpFormBase);

const SignUpLink = () => (
  <div className="d-flex justify-content-center">
    <p className="card-text">
      Don't have an account?{" "}
      <Link className="card-link" to={ROUTES.SIGN_UP}>
        Sign Up
      </Link>
    </p>
  </div>
);

// const SignUpForm = withRouter(withFirebase(SignUpFormBase));

export default SignUpPage;

export { SignUpForm, SignUpLink };
