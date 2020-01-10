import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getUserGitHubRepo } from '../../actions/profile';
import Spinner from '../layout/loading';

const UserGitProfile = ({ username, getUserGitHubRepo, gitrepos }) => {
  useEffect(() => {
    getUserGitHubRepo(username);
  }, [getUserGitHubRepo]);
  return (
    <div className="profile-github">
      <h2 className="text-primary my-1">Github Projects</h2>
      {gitrepos === null ? (
        <Spinner />
      ) : (
        gitrepos.map(repo => (
          <div key={repo.id} className="repo bg-white p-1 my-1">
            <div>
              <h4>
                <a
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {repo.name}
                </a>
              </h4>
              <p>{repo.description}</p>
            </div>
            <div>
              <ul>
                <li className="badge badge-primary">
                  Stars: {repo.stargazers_count}
                </li>
                <li className="badge badge-dark">
                  Watchers: {repo.watchers_count}
                </li>
                <li className="badge badge-light">Forks: {repo.forks_count}</li>
              </ul>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

UserGitProfile.propTypes = {
  username: PropTypes.string.isRequired,
  getUserGitHubRepo: PropTypes.func.isRequired,
  gitrepos: PropTypes.array.isRequired
};

const mapStateToPrps = state => ({
  gitrepos: state.profile.gitrepos
});
export default connect(mapStateToPrps, { getUserGitHubRepo })(UserGitProfile);
