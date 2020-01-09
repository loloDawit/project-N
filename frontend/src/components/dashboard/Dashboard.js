import React, { useEffect, Fragment } from 'react';
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getUserProfile } from '../../actions/profile';
import Spinner from '../layout/loading';
const Dashboard = ({
  getUserProfile,
  auth: { user },
  profile: { profile, loading }
}) => {
  useEffect(() => {
    getUserProfile();
  }, []);
  return loading && profile === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <h1 className="large text-primary">Dashboard</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Welcome {user && user.data.name}
      </p>
      {/* Make sure user has a profile, if theere is a profile show the profile, if not 
      creat a new one-- shwo form to create a new one */}
      {profile !== null ? (
        <Fragment>hello </Fragment>
      ) : (
        <Fragment>
          <p>
            Hi there, it looks like you don't have a profile. Please add your
            profile.
          </p>
          <Link to="/create-profile" className="btn btn-primary my-1">Create Profile</Link>
        </Fragment>
      )}
    </Fragment>
  );
};

Dashboard.propTypes = {
  getUserProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
});
export default connect(mapStateToProps, { getUserProfile })(Dashboard);
