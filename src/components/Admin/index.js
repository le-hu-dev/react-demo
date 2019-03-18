import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { compose } from 'recompose';

import { withAuthorization, withEmailVerification } from '../Session';
import { UserList, UserItem } from '../User';
import * as ROLES from '../../constants/roles';
import * as ROUTES from '../../constants/routes';

const AdminPage = () => (
    <div class="container">
        <div class="row top-to-header">
            <div class="col-sm-11 col-md-11 col-lg-10 mx-auto">
                <h1>Admin Page</h1>
                <p>This Admin Page is accessible by every signed in admin user.</p>

                <Switch>
                    <Route exact path={ROUTES.ADMIN_DETAILS} component={UserItem} />
                    <Route exact path={ROUTES.ADMIN} component={UserList} />
                </Switch>
            </div>
        </div>
    </div>
);

const condition = authUser => authUser && authUser.roles.includes(ROLES.ADMIN);

export default compose(
    withEmailVerification,
    withAuthorization(condition),
)(AdminPage);