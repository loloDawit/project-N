import React, { useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getUserProfile } from '../../actions/profile';
import Spinner from '../layout/loading'
const Dashboard = ({ getUserProfile, auth, profile:{profile, loading} }) => {
  useEffect(() => {
    getUserProfile();
  }, []);
  return loading && profile === null ? <Spinner /> : <Fragment>Test</Fragment>
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
