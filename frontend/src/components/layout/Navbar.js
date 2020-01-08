import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout, loadUser } from '../../actions/auth';
const Navbar = ({ logout, auth: { isAuthenticated, loading } }) => {
  const authrizedLinks = (
    <ul>
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
        <Link to="#!">Teams</Link>
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
Navbar.prototype = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};
const mapStateToPros = state => ({
  auth: state.auth
});
export default connect(mapStateToPros, { logout })(Navbar);
