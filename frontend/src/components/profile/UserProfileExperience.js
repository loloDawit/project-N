/**
 * ! TO DO, Having issue with destructuring
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import moment from 'moment';

const UserProfileExperience = ({ profile }) => (
 
    <div>
      <h3 className="text-dark">{profile.profile.data.experience.company}</h3>
      <p>
        <Moment format="YYYY/MM/DD">{moment.utc(profile.profile.data.experience.from)}</Moment> -{' '}
        {!profile.profile.data.experience.to ? (
          ' Now'
        ) : (
          <Moment format="YYYY/MM/DD">{moment.utc(profile.profile.data.experience.to)}</Moment>
        )}
      </p>
      <p>
        <strong>Position: </strong> {profile.profile.data.experience.title}
      </p>
      <p>
        <strong>Location: </strong> {profile.profile.data.experience.location}
      </p>
      <p>
        <strong>Description: </strong> {profile.profile.data.experience.description}
      </p>
    </div>

);

UserProfileExperience.propTypes = {
  profile: PropTypes.object.isRequired
};
export default UserProfileExperience;
