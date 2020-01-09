import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import { deleteUserEducation } from '../../actions/profile';

const Education = ({ education, deleteUserEducation }) => {
  const educations = education.map(education => (
    <tr key={education.id}>
      <td>{education.school}</td>
      <td className="hide-sm">{education.degree}</td>
      <td className="hide-sm">{education.fieldofstudy}</td>
      <td>
        <Moment format="YYYY-MM-DD">{education.from}</Moment> -{' '}
        {education.to === null ? (
          ' Now'
        ) : (
          <Moment format="YYYY-MM-DD">{education.to}</Moment>
        )}
      </td>
      <td>
        <button
          onClick={() => deleteUserEducation(education._id)}
          className="btn btn-danger"
        >
          <i className="fas fa-trash"></i>
        </button>
      </td>
    </tr>
  ));
  return (
    <Fragment>
      <h2 className="my-2">Education History</h2>
      <table className="table">
        <thead>
          <tr>
            <th>School</th>
            <th className="hide-sm">Degree</th>
            <th className="hide-sm">Field of Study</th>
            <th className="hide-sm">Years</th>
            <th />
          </tr>
        </thead>
        <tbody>{educations}</tbody>
      </table>
    </Fragment>
  );
};

Education.propTypes = {
  education: PropTypes.array.isRequired,
  deleteUserEducation: PropTypes.func.isRequired
};
export default connect(null, { deleteUserEducation })(Education);
