import React, { Component } from 'react';
import { compose } from 'recompose';
import { Link } from 'react-router-dom';

import { AuthUserContext, withAuthorization, withEmailVerification, } from '../Session';
import { withFirebase } from '../Firebase';
import PasswordChangeForm from '../PasswordChange';

const SIGN_IN_METHODS = [
    {
        id: 'password',
        provider: null,
    },
    {
        id: 'google.com',
        provider: 'googleProvider',
    },
    {
        id: 'facebook.com',
        provider: 'facebookProvider',
    },
    {
        id: 'twitter.com',
        provider: 'twitterProvider',
    },
];

const AccountPage = () => (
    <div class="container">
        <div class="row top-to-header">
        <AuthUserContext.Consumer>
            {authUser => (
                <div class="col-sm-10 col-md-8 col-lg-6 mx-auto">
                    <h3>Account: {authUser.email}</h3>
                    <PasswordChangeForm />
                    <LoginManagement authUser={authUser} />
                </div>
            )}
        </AuthUserContext.Consumer>
        </div>
    </div>
);

class LoginManagementBase extends Component {
    constructor(props) {
        super(props);

        this.state = {
            activeSignInMethods: [],
            error: null,
        };
    }

    componentDidMount() {
        this.fetchSignInMethods();
    }

    fetchSignInMethods = () => {
        this.props.firebase.auth
        .fetchSignInMethodsForEmail(this.props.authUser.email)
        .then(activeSignInMethods => this.setState({ activeSignInMethods, error: null }),)
        .catch(error => this.setState({ error }));
    };

    onSocialLoginLink = provider => {
        this.props.firebase.auth.currentUser
        .linkWithPopup(this.props.firebase[provider])
        .then(this.fetchSignInMethods)
        .catch(error => this.setState({ error }));
    };

    onDefaultLoginLink = password => {
        const credential = this.props.firebase.emailAuthProvider.credential(this.props.authUser.email, password,);

        this.props.firebase.auth.currentUser
        .linkAndRetrieveDataWithCredential(credential)
        .then(this.fetchSignInMethods)
        .catch(error => this.setState({ error }));
    };

    onUnlink = providerId => {
        this.props.firebase.auth.currentUser
        .unlink(providerId)
        .then(this.fetchSignInMethods)
        .catch(error => this.setState({ error }));
    };

    render() {
        const { activeSignInMethods, error } = this.state;

        return (
            <div class="card card-signin my-5">
                <div class="card-body">
                    <h5 class="card-title text-center">Sign In Methods</h5>
                    {error && <div class="alert alert-danger alert-dismissible fade show" role="alert">
                        <strong>Error!</strong> {error.message}
                        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>}
                    <div class="list-group">
                    {SIGN_IN_METHODS.map(signInMethod => {
                        const onlyOneLeft = activeSignInMethods.length === 1;
                        const isEnabled = activeSignInMethods.includes(signInMethod.id,);

                        return (
                            <Link to="#" className="list-group-item list-group-item-action" key={signInMethod.id}>
                                {signInMethod.id === 'password' ? (
                                    <DefaultLoginToggle
                                        onlyOneLeft={onlyOneLeft}
                                        isEnabled={isEnabled}
                                        signInMethod={signInMethod}
                                        onLink={this.onDefaultLoginLink}
                                        onUnlink={this.onUnlink}
                                    />
                                ) : (
                                    <SocialLoginToggle
                                        onlyOneLeft={onlyOneLeft}
                                        isEnabled={isEnabled}
                                        signInMethod={signInMethod}
                                        onLink={this.onSocialLoginLink}
                                        onUnlink={this.onUnlink}
                                    />
                                )}
                            </Link>
                        );
                    })}
                    </div>
                </div>
            </div>
        );
    }
}

const SocialLoginToggle = ({
    onlyOneLeft,
    isEnabled,
    signInMethod,
    onLink,
    onUnlink,
}) => 
    isEnabled ? (
        <button type="button" class="btn btn-md-custom btn-outline-primary btn-block text-uppercase" onClick={() => onUnlink(signInMethod.id)} disabled={onlyOneLeft}>
            Deactivate {signInMethod.id}
        </button>
    ) : (
        <button type="button" class="btn btn-md-custom btn-outline-primary btn-block text-uppercase" onClick={() => onLink(signInMethod.provider)}>
            Link {signInMethod.id}
        </button>
    );

class DefaultLoginToggle extends Component {
    constructor(props) {
        super(props);

        this.state = { password: '', confirmedPassword: '' };
    }

    onSubmit = event => {
        event.preventDefault();

        this.props.onLink(this.state.password);
        this.setState({ password: '', confirmedPassword: '' });
    };

    onChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

    render() {
        const {
            onlyOneLeft,
            isEnabled,
            signInMethod,
            onUnlink,
        } = this.props;

        const { password, confirmedPassword } = this.state;

        const isInvalid = password !== confirmedPassword || password === '';

        return isEnabled ? (
            <button type="button" class="btn btn-md-custom btn-outline-primary btn-block text-uppercase" onClick={() => onUnlink(signInMethod.id)} disabled={onlyOneLeft}>
                Deactivate {signInMethod.id}
            </button>
        ) : (
            <div class="card card-signin my-5">
                <div class="card-body">
                    <form class="form-signin" onSubmit={this.onSubmit}>
                        <div class="form-label-group">
                            <input type="password" id="inputPassword" name="password" value={password} onChange={this.onChange} class="form-control" placeholder="New Password" required />
                            <label for="inputPassword">New Password</label>
                        </div>

                        <div class="form-label-group">
                            <input type="password" id="inputConfirmedPassword" name="confirmedPassword" value={confirmedPassword} onChange={this.onChange} class="form-control" placeholder="Confirm New Password" required />
                            <label for="inputConfirmedPassword">Confirm New Password</label>
                        </div>

                        <button class="btn btn-lg btn-primary btn-block text-uppercase" disabled={isInvalid} type="submit">
                            Link {signInMethod.id}
                        </button>
                    </form>
                </div>
            </div>
        );
    }
}

const LoginManagement = withFirebase(LoginManagementBase);

const condition = authUser => !!authUser;

export default compose(
    withEmailVerification,
    withAuthorization(condition),
)(AccountPage);