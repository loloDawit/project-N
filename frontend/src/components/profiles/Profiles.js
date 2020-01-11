import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/loading';
import ProfileItem from './ProfileItem';
import { getAllUserProfile } from '../../actions/profile';

const Profiles = ({ getAllUserProfile, profile }) => {
  useEffect(() => {
    getAllUserProfile();
  }, [getAllUserProfile]);
  return (
    <Fragment>
      {profile.loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <h1 className="large text-primary">NOC DevOps Teams</h1>
          <p className="lead">
            <i className="fab fa-connectdevelop" /> Browse and connect with NOC
            Teammates
          </p>
          <div className="profiles">
            {profile.profiles.status === true ? (
              profile.profiles.data.map(profile => (
                <ProfileItem key={profile._id} profile={profile} />
              ))
            ) : (
              <h4>No profiles found...</h4>
            )}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

Profiles.propTypes = {
  getAllUserProfile: PropTypes.func.isRequired,
  profiles: PropTypes.object.isRequired
};
const mapToStateProps = state => ({
  profile: state.profile
});
export default connect(mapToStateProps, { getAllUserProfile })(Profiles);
