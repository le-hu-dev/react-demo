import React from 'react';

import AuthUserContext from './context';
import { withFirebase } from '../Firebase';

const needsEmailVerification = authUser =>
    authUser &&
    !authUser.emailVerified &&
    authUser.providerData
    .map(provider => provider.providerId)
    .includes('password');

const withEmailVerification = Component => {
    class WithEmailVerification extends React.Component {
        constructor(props) {
            super(props);

            this.state = { isSent: false };
        }

        onSendEmailVerification = () => {
            this.props.firebase.doSendEmailVerification()
            .then(() => this.setState({ isSent: true }));
        }

        render() {
            return (
                <AuthUserContext.Consumer>
                    {authUser =>  
                        needsEmailVerification(authUser) ? (
                            <div class="container">
                                <div class="row top-to-header">
                                    <div class="col-sm-10 col-md-8 col-lg-6 mx-auto">
                                        <div class="card card-signin my-5">
                                            <div class="card-body">
                                                <h5 class="card-title text-center">Last step to create your account</h5>
                                                {this.state.isSent ? (
                                                    <div class="alert alert-success" role="alert">
                                                        <h4 class="alert-heading">Email confirmation sent</h4>
                                                        <p>Check your emails (Spam folder included) for a confirmation email.</p>
                                                        <hr />
                                                        <p class="mb-0">Refresh this page once you confirmed your email.</p>
                                                    </div>
                                                ) : (
                                                    <div class="alert alert-warning" role="alert">
                                                        <h4 class="alert-heading">Verify your email</h4>
                                                        <p>Check your emails (Spam folder included) for a confirmation email or send another confirmation email.</p>
                                                    </div>
                                                )}
                                                
                                                <button 
                                                    type="button" 
                                                    class="btn btn-lg-custom btn-primary btn-block text-uppercase" 
                                                    onClick={this.onSendEmailVerification} 
                                                    disabled={this.state.isSent}
                                                >
                                                    <i class="fas fa-envelope"></i> Send confirmation email
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <Component {...this.props} />
                        )
                    }
                </AuthUserContext.Consumer>
            );
        }
    }

    return withFirebase(WithEmailVerification);
};

export default withEmailVerification;