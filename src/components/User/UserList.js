import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';

class UserList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            users: [],
        };
    }

    componentDidMount() {
        this.setState({ loading: true });

        this.props.firebase.users().on('value', snapshot => {
            const usersObject = snapshot.val();

            const usersList = Object.keys(usersObject).map(key => ({
                ...usersObject[key],
                uid: key,
            }));

            this.setState({
                users: usersList,
                loading: false,
            });
        });
    }

    componentWillUnmount() {
        this.props.firebase.users().off();
    }

    render() {
        const { users, loading } = this.state;

        return (
            <div class="card card-signin my-5">
                <div class="card-header bg-dark text-white">
                    Users
                </div>
                <div class="card-body">
                    {loading && <div>Loading...</div>}
                    <table class="table table-hover">
                    <thead>
                        <tr>
                            <th>User ID</th>
                            <th>Username</th>
                            <th>Email</th>
                            <th> </th>
                        </tr>
                    </thead>
                    <tbody>
                    {users.map(user => (
                        <tr key={user.uid}>
                            <td>{user.uid}</td>
                            <td>{user.username}</td>
                            <td>{user.email}</td>
                            <td>
                                <Link className="btn-sm btn-primary my-2 my-sm-0" to={{
                                    pathname: `${ROUTES.ADMIN}/${user.uid}`,
                                    state: { user },
                                }}><i class="fas fa-address-card"></i></Link>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                </div>
            </div>
        );
    }
}

export default withFirebase(UserList);