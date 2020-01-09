import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import moment from 'moment';
import { connect } from 'react-redux';
import { deleteUserExperience } from '../../actions/profile';

const Experience = ({ experience, deleteUserExperience }) => {
  const experiences = experience.map(experience => (
    <tr key={experience.id}>
      <td>{experience.company}</td>
      <td className="hide-sm">{experience.title}</td>
      <td className="hide-sm">{experience.location}</td>
      <td>
        <Moment format="YYYY-MM-DD">{experience.from}</Moment> -{' '}
        {experience.to === null ? (
          ' Present'
        ) : (
          <Moment format="YYYY-MM-DD">{experience.to}</Moment>
        )}
      </td>
      <td>
        <button
          onClick={() => deleteUserExperience(experience._id)}
          className="btn btn-danger"
        >
          {' '}
          <i className="fas fa-trash"></i>
        </button>
      </td>
    </tr>
  ));
  return (
    <Fragment>
      <h2 className="my-2">Work Experience History</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Company</th>
            <th className="hide-sm">Title</th>
            <th className="hide-sm">Location</th>
            <th className="hide-sm">Years</th>
            <th />
          </tr>
        </thead>
        <tbody>{experiences}</tbody>
      </table>
    </Fragment>
  );
};

Experience.propTypes = {
  experience: PropTypes.array.isRequired,
  deleteUserExperience: PropTypes.func.isRequired
};
export default connect(null, { deleteUserExperience })(Experience);
