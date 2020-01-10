import React from 'react';
import PropTypes from 'prop-types';

const UserProfileTop = ({ profile }) => {
  return (
    <div className="profile-top bg-primary p-2">
      <img
        className="round-img my-1"
        src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200"
        alt=""
      />
      <h1 className="large">{profile.profile.data.user.name}</h1>
      <p className="lead">
        {profile.profile.data.status}
        {profile.profile.data.company && (
          <span> at {profile.profile.data.company}</span>
        )}
      </p>
      <p>
        {profile.profile.data.location && (
          <span>{profile.profile.data.location}</span>
        )}
      </p>
      <div className="icons my-1">
        {/** --------------- Social links starts -------------------
         * If social links exist check and show */}
        {profile.profile.data.sociallinks &&
          profile.profile.data.sociallinks.github && (
            <a
              href={profile.profile.data.sociallinks.github}
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-github fa-2x"></i>
            </a>
          )}
        {profile.profile.data.sociallinks &&
          profile.profile.data.sociallinks.twitter && (
            <a
              href={profile.profile.data.sociallinks.twitter}
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-twitter fa-2x"></i>
            </a>
          )}
        {profile.profile.data.sociallinks &&
          profile.profile.data.sociallinks.linkedin && (
            <a
              href={profile.profile.data.sociallinks.linkedin}
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-linkedin fa-2x"></i>
            </a>
          )}
      </div>
    </div>
  );
};

UserProfileTop.propTypes = {
  profile: PropTypes.object.isRequired
};
export default UserProfileTop;
