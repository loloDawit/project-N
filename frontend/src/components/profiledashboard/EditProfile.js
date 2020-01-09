import React, { useState, Fragment, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createUserProfile, getUserProfile } from '../../actions/profile';

const EditProfile = ({
  profile,
  createUserProfile,
  getUserProfile,
  history
}) => {
  const [formData, setFormData] = useState({
    nocstatus: '',
    status: '',
    company: '',
    website: '',
    location: '',
    skills: '',
    githubusername: '',
    bio: '',
    twitter: '',
    linkedin: '',
    github: ''
  });
  const [displaySocialInputs, toggleSocialInputs] = useState(false);
  useEffect(() => {
    getUserProfile();
    // set the form data
    setFormData({
      // if the form is not loading and there is no data, put blank or set it
      company:
        profile.loading || !profile.profile.data.company
          ? ''
          : profile.profile.data.company,
      website:
        profile.loading || !profile.profile.data.website
          ? ''
          : profile.profile.data.website,
      location:
        profile.loading || !profile.profile.data.location
          ? ''
          : profile.profile.data.location,
      status:
        profile.loading || !profile.profile.data.status
          ? ''
          : profile.profile.data.status,
      nocstatus:
        profile.loading || !profile.profile.data.nocstatus
          ? ''
          : profile.profile.data.nocstatus,
      skills:
        profile.loading || !profile.profile.data.skills
          ? ''
          : profile.profile.data.skills.join(','),
      githubusername:
        profile.loading || !profile.profile.data.githubusername
          ? ''
          : profile.profile.data.githubusername,
      bio:
        profile.loading || !profile.profile.data.bio
          ? ''
          : profile.profile.data.bio,
      twitter:
        profile.loading || !profile.profile.data.sociallinks
          ? ''
          : profile.profile.data.sociallinks.twitter,
      github:
        profile.loading || !profile.profile.data.sociallinks
          ? ''
          : profile.profile.data.sociallinks.github,
      linkedin:
        profile.loading || !profile.profile.data.sociallinks
          ? ''
          : profile.profile.data.sociallinks.linkedin
    });
  }, [
    profile.loading,
    profile.profile.data.bio,
    profile.profile.data.company,
    profile.profile.data.githubusername,
    profile.profile.data.location,
    profile.profile.data.nocstatus,
    profile.profile.data.skills,
    profile.profile.data.sociallinks,
    profile.profile.data.status,
    profile.profile.data.website,
    getUserProfile
  ]);
  const {
    nocstatus,
    status,
    company,
    website,
    location,
    skills,
    githubusername,
    bio,
    twitter,
    linkedin,
    github
  } = formData;
  const onChange = e =>
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  const onSubmit = e => {
    e.preventDefault();
    createUserProfile(formData, history, true);
  };
  return (
    <Fragment>
      <h1 className="large text-primary">Create Your Profile</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Let's get some information about you to
        create your profile
      </p>
      <small>* = required field</small>
      <form className="form" onSubmit={e => onSubmit(e)}>
        <div className="form-group">
          <select name="status" value={status} onChange={e => onChange(e)}>
            <option value="0">* Select Professional Status</option>
            <option value="Developer">Developer</option>
            <option value="Junior Developer">Junior Developer</option>
            <option value="Senior Developer">Senior Developer</option>
            <option value="Manager">Manager</option>
            <option value="Student or Learning">DevOps</option>
            <option value="Instructor">Network Engineer</option>
            <option value="Intern">Sinor Manager</option>
            <option value="Other">Other</option>
          </select>
          <small className="form-text">
            Give us an idea of where you are at in your career
          </small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Company"
            name="company"
            value={company}
            onChange={e => onChange(e)}
          />
          <small className="form-text">
            Could be your own company or one you work for
          </small>
        </div>
        <div className="form-group">
          <select
            name="nocstatus"
            value={nocstatus}
            onChange={e => onChange(e)}
          >
            <option value="0"> Select NOC Status</option>
            <option value="E1">Enginner 1</option>
            <option value="Ninja">Ninja</option>
            <option value="PM">PM</option>
          </select>
          <small className="form-text">Give us your NOC status</small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Website"
            name="website"
            value={website}
            onChange={e => onChange(e)}
          />
          <small className="form-text">
            Could be your own or a company website
          </small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Location"
            name="location"
            value={location}
            onChange={e => onChange(e)}
          />
          <small className="form-text">
            City & state suggested (eg. Seattle, WA)
          </small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="* Skills"
            name="skills"
            value={skills}
            onChange={e => onChange(e)}
          />
          <small className="form-text">
            Please use comma separated values (eg.
            Network,Operations,JavaScript,Database)
          </small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Github Username"
            name="githubusername"
            value={githubusername}
            onChange={e => onChange(e)}
          />
          <small className="form-text">
            If you want your latest repos and a Github link, include your
            username
          </small>
        </div>
        <div className="form-group">
          <textarea
            placeholder="A short bio of yourself"
            name="bio"
            value={bio}
            onChange={e => onChange(e)}
          ></textarea>
          <small className="form-text">Tell us a little about yourself</small>
        </div>

        <div className="my-2">
          <button
            onClick={() => {
              toggleSocialInputs(!displaySocialInputs);
            }}
            type="button"
            className="btn btn-light"
          >
            Add Social Network Links
          </button>
          <span>Optional</span>
        </div>

        {displaySocialInputs && (
          <Fragment>
            {' '}
            <div className="form-group social-input">
              <i className="fab fa-twitter fa-2x"></i>
              <input
                type="text"
                placeholder="Twitter URL"
                name="twitter"
                value={twitter}
                onChange={e => onChange(e)}
              />
            </div>
            <div className="form-group social-input">
              <i className="fab fa-github fa-2x"></i>
              <input
                type="text"
                placeholder="GitHub URL"
                name="github"
                value={github}
                onChange={e => onChange(e)}
              />
            </div>
            <div className="form-group social-input">
              <i className="fab fa-linkedin fa-2x"></i>
              <input
                type="text"
                placeholder="Linkedin URL"
                name="linkedin"
                value={linkedin}
                onChange={e => onChange(e)}
              />
            </div>{' '}
          </Fragment>
        )}

        <input type="submit" className="btn btn-primary my-1" />
        <Link className="btn btn-light my-1" to="/dashboard">
          Go Back
        </Link>
      </form>
    </Fragment>
  );
};

EditProfile.propTypes = {
  createUserProfile: PropTypes.func.isRequired,
  getUserProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  profile: state.profile
});
export default connect(mapStateToProps, { createUserProfile, getUserProfile })(
  withRouter(EditProfile)
);
