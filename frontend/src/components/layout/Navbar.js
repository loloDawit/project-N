import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';
const Navbar = ({ logout, auth: { isAuthenticated, loading } }) => {
  const authrizedLinks = (
    <ul>
      <li>
        <Link to="/profiles">
          <i className="fa fa-users" />{' '}
          <span className="hide-sm">Teams</span>
        </Link>
      </li>
      <li>
        <Link to="/dashboard">
          <i className="fas fa-user" />{' '}
          <span className="hide-sm">Dashboard</span>
        </Link>
      </li>
      <li>
        <a onClick={logout} href="#!">
          <i className="fas fa-sign-out-alt" />{' '}
          <span className="hide-sm"> Logout </span>
        </a>
      </li>
    </ul>
  );
  const guestLinks = (
    <ul>
      <li>
        <Link to="/profiles">
          <span className="hide-sm">Teams</span>
        </Link>
      </li>
      <li>
        <Link to="/register">Register</Link>
      </li>
      <li>
        <Link to="/login">Login</Link>
      </li>
    </ul>
  );
  return (
    <nav className="navbar bg-dark">
      <h1>
        <Link to="/">
          <i className="fas fa-address-book"></i> NOC TeamApp
        </Link>
      </h1>
      {!loading && (
        <Fragment>{isAuthenticated ? authrizedLinks : guestLinks}</Fragment>
      )}
    </nav>
  );
};
Navbar.protoTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};
const mapStateToPros = state => ({
  auth: state.auth
});
export default connect(mapStateToPros, { logout })(Navbar);
