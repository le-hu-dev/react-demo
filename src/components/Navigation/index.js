import React from "react";
import { Link } from "react-router-dom";

import { AuthUserContext } from "../Session";
import SignOutButton from "../SignOut";
import * as ROUTES from "../../constants/routes";
import * as ROLES from "../../constants/roles";

const Navigation = () => (
  <header>
    <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
      <Link className="navbar-brand" to={ROUTES.LANDING}>
        React Firebase
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarCollapse"
        aria-controls="navbarCollapse"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon" />
      </button>
      <AuthUserContext.Consumer>
        {authUser =>
          authUser ? (
            <NavigationAuth authUser={authUser} />
          ) : (
            <NavigationNonAuth />
          )
        }
      </AuthUserContext.Consumer>
    </nav>
  </header>
);

const NavigationAuth = ({ authUser }) => (
  <div class="collapse navbar-collapse" id="navbarCollapse">
    <ul class="navbar-nav mr-auto">
      <li class="nav-item">
        <Link className="nav-link" to={ROUTES.HOME}>
          Home
        </Link>
      </li>
      <li class="nav-item">
        <Link className="nav-link" to={ROUTES.TODO}>
          Todo
        </Link>
      </li>
      <li class="nav-item">
        <Link className="nav-link" to={ROUTES.SEARCH}>
          Search
        </Link>
      </li>
      <li class="nav-item">
        <Link className="nav-link" to={ROUTES.ACCOUNT}>
          Account
        </Link>
      </li>
      {authUser.roles.includes(ROLES.ADMIN) && (
        <li class="nav-item">
          <Link className="nav-link" to={ROUTES.ADMIN}>
            Admin
          </Link>
        </li>
      )}
    </ul>
    <SignOutButton />
  </div>
);

const NavigationNonAuth = () => (
  <div
    className="collapse navbar-collapse justify-content-end"
    id="navbarCollapse"
  >
    <div className="navbar-nav">
      <Link
        className="nav-item btn btn-md-custom btn-outline-success my-2 my-sm-0"
        to={ROUTES.SIGN_IN}
      >
        Sign In
      </Link>
    </div>
  </div>
);

export default Navigation;
