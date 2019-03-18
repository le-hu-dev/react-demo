import React from 'react';

import { withFirebase } from '../Firebase';

const SignOutButton = ({ firebase }) => (
    <button class="btn btn-md-custom btn-outline-warning my-2 my-sm-0" type="button" onClick={firebase.doSignOut}>Sign Out</button>
);

export default withFirebase(SignOutButton);