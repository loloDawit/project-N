import React, { Fragment, Profiler } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import { removeCommentFromPost } from '../../actions/post';

const PostCommentItem = ({
  postId,
  comment: { _id, text, name, profilePic, user, createdAt },
  auth,
  removeCommentFromPost
}) => {
  return (
    <div className="post bg-white p-1 my-1">
      <div>
        <Link to={`/profile/${user}`}>
          <img className="round-img" src={profilePic} alt="" />
          <h4>{name}</h4>
        </Link>
      </div>
      <div>
        <p className="my-1">{text}</p>
        <p className="post-date">
          Posted on <Moment format="YYYY/MM/DD">{createdAt}</Moment>
        </p>
        {!auth.loading && user === auth.user.data._id && (
          <button
            onClick={() => removeCommentFromPost(postId, _id)}
            type="button"
            className="btn btn-danger"
          >
            <i className="fas fa-times" />
          </button>
        )}
      </div>
    </div>
  );
};

PostCommentItem.propType = {
  postId: PropTypes.string.isRequired,
  comment: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  removeCommentFromPost: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(mapStateToProps, { removeCommentFromPost })(
  PostCommentItem
);
