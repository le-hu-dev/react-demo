import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { compose } from "recompose";
import "./index.css";

import { SignUpLink } from "../SignUp";
import { PasswordForgotLink } from "../PasswordForgot";
import { withFirebase } from "../Firebase";
import * as ROUTES from "../../constants/routes";

const SignInPage = () => (
  <div className="container">
    <div className="row top-to-header">
      <div className="col-sm-10 col-md-8 col-lg-6 mx-auto">
        <SignInForm />
      </div>
    </div>
  </div>
);

const INITIAL_STATE = {
  email: "",
  password: "",
  error: null
};

const ERROR_CODE_ACCOUNT_EXISTS =
  "auth/account-exists-with-different-credential";
const ERROR_MSG_ACCOUNT_EXISTS = `
An account with an email address to
this social account already exists. 
Try to login from this account insteat 
and associate your social account 
on your personal account page.
`;

class SignInFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    const { email, password } = this.state;

    this.props.firebase
      .doSignInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
        this.props.history.push(ROUTES.HOME);
      })
      .catch(error => {
        this.setState({ ...INITIAL_STATE });
        this.props.history.push(ROUTES.HOME);
        if (error.code === ERROR_CODE_ACCOUNT_EXISTS) {
          error.message = ERROR_MSG_ACCOUNT_EXISTS;
        }

        this.setState({ error });
      });

    event.preventDefault();
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { email, password, error } = this.state;

    const isInvalid = password === "" || email === "";

    return (
      <div className="card card-signin my-5">
        <div className="card-body">
          <h5 className="card-title text-center">Sign In</h5>
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
                value={email}
                onChange={this.onChange}
                className="form-control"
                placeholder="Email Address"
                required
                autoFocus
              />
              <label htmlFor="inputEmail">Email address</label>
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
              <label htmlFor="inputPassword">Password</label>
            </div>

            <div className="custom-control custom-checkbox mb-3">
              <input
                type="checkbox"
                className="custom-control-input"
                id="checkRememberMe"
              />
              <label className="custom-control-label" htmlFor="checkRememberMe">
                Remember Me
              </label>
            </div>

            <button
              className="btn btn-lg btn-primary btn-block text-uppercase"
              disabled={isInvalid}
              type="submit"
            >
              <i className="fas fa-sign-in-alt" /> Sign in
            </button>

            <PasswordForgotLink />

            <hr className="my-4" />
          </form>
        </div>
        <SignInGoogle />
        <SignInFacebook />
        {/* <SignInTwitter /> */}
        <div className="card-body">
          <SignUpLink />
        </div>
      </div>
    );
  }
}

class SignInCoogleBase extends Component {
  constructor(props) {
    super(props);

    this.state = { error: null };
  }

  onSubmit = event => {
    this.props.firebase
      .doSignInWithGoogle()
      .then(socialAuthUser => {
        // Create a user in your Firebase Realtime Database too
        return this.props.firebase.user(socialAuthUser.user.uid).set({
          username: socialAuthUser.user.displayName,
          email: socialAuthUser.user.email,
          roles: []
        });
      })
      .then(() => {
        this.setState({ error: null });
        this.props.history.push(ROUTES.HOME);
      })
      .catch(error => {
        this.setState({ error });
      });

    event.preventDefault();
  };

  render() {
    const { error } = this.state;

    return (
      <div className="col-sm-11 col-md-11 col-lg-11 mx-auto">
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
          <button
            className="btn btn-lg btn-google btn-block text-uppercase"
            type="submit"
          >
            <i className="fab fa-google mr-2" /> Sign in with Google
          </button>
        </form>
      </div>
    );
  }
}

class SignInFacebookBase extends Component {
  constructor(props) {
    super(props);

    this.state = { error: null };
  }

  onSubmit = event => {
    this.props.firebase
      .doSignInWithFacebook()
      .then(socialAuthUser => {
        // Create a user in your Firebase Realtime Database too
        return this.props.firebase.user(socialAuthUser.user.uid).set({
          username: socialAuthUser.additionalUserInfo.profile.name,
          email: socialAuthUser.additionalUserInfo.profile.email,
          roles: []
        });
      })
      .then(() => {
        this.setState({ error: null });
        this.props.history.push(ROUTES.HOME);
      })
      .catch(error => {
        this.setState({ error });
      });

    event.preventDefault();
  };

  render() {
    const { error } = this.state;

    return (
      <div className="col-sm-11 col-md-11 col-lg-11 mx-auto top-to-item">
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
          <button
            className="btn btn-lg btn-facebook btn-block text-uppercase"
            type="submit"
          >
            <i className="fab fa-facebook-f mr-2" /> Sign in with Facebook
          </button>
        </form>
      </div>
    );
  }
}

class SignInTwitterBase extends Component {
  constructor(props) {
    super(props);

    this.state = { error: null };
  }

  onSubmit = event => {
    this.props.firebase
      .doSignInWithTwitter()
      .then(socialAuthUser => {
        // Create a user in your Firebase Realtime Database too
        return this.props.firebase.user(socialAuthUser.user.uid).set({
          username: socialAuthUser.additionalUserInfo.profile.name,
          email: socialAuthUser.additionalUserInfo.profile.email,
          roles: []
        });
      })
      .then(() => {
        this.setState({ error: null });
        this.props.history.push(ROUTES.HOME);
      })
      .catch(error => {
        this.setState({ error });
      });

    event.preventDefault();
  };

  render() {
    const { error } = this.state;

    return (
      <div className="col-sm-11 col-md-11 col-lg-11 mx-auto top-to-item">
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
          <button
            className="btn btn-lg btn-twitter btn-block text-uppercase"
            type="submit"
          >
            <i className="fab fa-twitter-f mr-2" /> Sign in with Twitter
          </button>
        </form>
      </div>
    );
  }
}

const SignInForm = compose(
  withRouter,
  withFirebase
)(SignInFormBase);

const SignInGoogle = compose(
  withRouter,
  withFirebase
)(SignInCoogleBase);

const SignInFacebook = compose(
  withRouter,
  withFirebase
)(SignInFacebookBase);

const SignInTwitter = compose(
  withRouter,
  withFirebase
)(SignInTwitterBase);

export default SignInPage;

export { SignInForm, SignInGoogle, SignInFacebook, SignInTwitter };
