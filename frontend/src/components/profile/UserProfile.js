import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/loading';
import { getUserProfileById } from '../../actions/profile';
import UserProfileTop from './UserProfileTop';
import UserProfileAbout from './UserProfileAbout';
import UserGitProfile from './UserGitProfile';
import Moment from 'react-moment';
import moment from 'moment';
//import UserProfileExperience from './UserProfileExperience';
const UserProfile = ({ getUserProfileById, match, profile, auth }) => {
  useEffect(() => {
    getUserProfileById(match.params.id);
  }, [getUserProfileById, match.params.id]);
  return (
    <Fragment>
      {profile.profile === null || profile.loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <Link to="/profiles" className="btn btn-light">
            Back
          </Link>
          {/* Show edit link if user viewing their profile */}
          {auth.isAuthenticated &&
            auth.loading === false &&
            auth.user.data._id === profile.profile.data.user._id && (
              <Link to="/edit-profile" className="btn btn-dark">
                Edit My Profile
              </Link>
            )}
          <div className="profile-grid my-1">
            {/* -------------   Profile Section            ---------------*/}
            <UserProfileTop profile={profile} />
            {/** -------------   Profile About Section       ---------------*/}
            <UserProfileAbout profile={profile} />
            {/** -------------   Profile Experience Sections ---------------*/}
            <div className="profile-exp bg-white p-2">
              <h2 className="text-primary">Experience</h2>
              {profile.profile.data.experience.length > 0 ? (
                <Fragment>
                  {profile.profile.data.experience.map(experience => (
                    <div>
                      <h3 className="text-dark">{experience.company}</h3>
                      <p>
                        <Moment format="YYYY/MM/DD">
                          {moment.utc(experience.from)}
                        </Moment>{' '}
                        -{' '}
                        {!experience.to ? (
                          ' Now'
                        ) : (
                          <Moment format="YYYY/MM/DD">
                            {moment.utc(experience.to)}
                          </Moment>
                        )}
                      </p>
                      <p>
                        <strong>Position: </strong> {experience.title}
                      </p>
                      <p>
                        <strong>Location: </strong> {experience.location}
                      </p>
                      <p>
                        <strong>Description: </strong> {experience.description}
                      </p>
                    </div>
                  ))}
                </Fragment>
              ) : (
                <h4>No Experience History Found</h4>
              )}
            </div>
            {/** -------------   Profile Education Sections ---------------*/}
            <div>
              <div className="profile-exp bg-white p-2">
                <h2 className="text-primary">Education</h2>
                {profile.profile.data.education.length > 0 ? (
                  <Fragment>
                    {profile.profile.data.education.map(education => (
                      <div>
                        <h3 className="text-dark">{education.school}</h3>
                        <p>
                          <Moment format="YYYY/MM/DD">
                            {moment.utc(education.from)}
                          </Moment>{' '}
                          -{' '}
                          {!education.to ? (
                            ' Now'
                          ) : (
                            <Moment format="YYYY/MM/DD">
                              {moment.utc(education.to)}
                            </Moment>
                          )}
                        </p>
                        <p>
                          <strong>Degree: </strong> {education.degree}
                        </p>
                        <p>
                          <strong>Field Of Study: </strong>{' '}
                          {education.fieldofstudy}
                        </p>
                        <p>
                          <strong>Description: </strong> {education.description}
                        </p>
                      </div>
                    ))}
                  </Fragment>
                ) : (
                  <h4>No Education History Found</h4>
                )}
              </div>
            </div>
            {/** -------------   Profile Github Repos Sections ---------------*/}
            {profile.profile.data.githubusername && (<UserGitProfile username={profile.profile.data.githubusername} profile={profile} />)}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

UserProfile.propTypes = {
  getUserProfileById: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});
export default connect(mapStateToProps, { getUserProfileById })(UserProfile);
