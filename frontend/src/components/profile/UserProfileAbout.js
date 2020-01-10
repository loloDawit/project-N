import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

const UserProfileAbout = ({ profile }) => {
  return (
    <div className="profile-about bg-light p-2">
      {profile.profile.data.bio && (
        <Fragment>
          <h2 className="text-primary">
            {profile.profile.data.user.name.trim().split(' ')[0]}'s Bio
          </h2>

          <p>{profile.profile.data.bio}</p>

          <div className="line"></div>
        </Fragment>
      )}

      <h2 className="text-primary">
        {profile.profile.data.skills && <span>Skill Set</span>}
      </h2>
      <div className="skills">
        {profile.profile.data.skills.map((skill, index) => (
          <div key={index} className="p-1">
            <i className="fas fa-check " /> {skill}
          </div>
        ))}
      </div>
    </div>
  );
};
UserProfileAbout.propTypes = {
  UserProfileAbout: PropTypes.object.isRequired
};
export default UserProfileAbout;
