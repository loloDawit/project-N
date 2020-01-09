import React, { useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getUserProfile, deleteUserAccount } from '../../actions/profile';
import Display from '../dashboard/Display';
import Experience from './Experience';
import Education from './Education';
import Spinner from '../layout/loading';
const Dashboard = ({
  getUserProfile,
  deleteUserAccount,
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
        <Fragment>
          <Display />
          <Experience experience={profile.data.experience} />
          <Education education={profile.data.education} />
          <div className="my-2">
            <button
              className="btn btn-danger"
              onClick={() => deleteUserAccount()}
            >
              <i className="fas fa-ban"> Delete Account</i>
            </button>
          </div>
        </Fragment>
      ) : (
        <Fragment>
          <p>
            Hi there, it looks like you don't have a profile. Please add your
            profile.
          </p>
          <Link to="/create-profile" className="btn btn-primary my-1">
            Create Profile
          </Link>
        </Fragment>
      )}
    </Fragment>
  );
};

Dashboard.propTypes = {
  getUserProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  deleteUserAccount: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
});
export default connect(mapStateToProps, { getUserProfile, deleteUserAccount })(
  Dashboard
);
