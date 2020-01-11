import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { connect } from 'react-redux';

import {
  addLikeToUserPosts,
  removeLikeFromUserPosts,
  deletePostFromUserPosts
} from '../../actions/post';
const PostItem = ({
  addLikeToUserPosts,
  removeLikeFromUserPosts,
  deletePostFromUserPosts,

  auth,
  post: { _id, text, name, profilePic, user, likes, comments, createdAt }
}) => (
  <div className="post bg-white p-1 my-1">
    <div>
      <a href="profile.html">
        <img
          className="round-img"
          src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200"
          alt=""
        />
        <h4>{name}</h4>
      </a>
    </div>
    <div>
      <p className="my-1">{text}</p>
      <p className="post-date">
        Posted on <Moment format="YYYY/MM/DD">{createdAt}</Moment>
      </p>
      <button
        onClick={() => addLikeToUserPosts(_id)}
        type="button"
        className="btn btn-light"
      >
        <i className="fas fa-thumbs-up" />{' '}
        {likes.length > 0 && <span>{likes.length}</span>}
      </button>
      <button
        onClick={() => removeLikeFromUserPosts(_id)}
        type="button"
        className="btn btn-light"
      >
        <i className="fas fa-thumbs-down" />
      </button>

      <Link to={`/post/${_id}`} className="btn btn-primary">
        Discussion{' '}
        {comments && comments.length > 0 && (
          <span className="comment-count">{comments.length}</span>
        )}
      </Link>

      {!auth.loading && user === auth.user.data._id && (
        <button
          onClick={() => deletePostFromUserPosts(_id)}
          type="button"
          className="btn btn-danger"
        >
          <i className="fas fa-times" />
        </button>
      )}
    </div>
  </div>
);

PostItem.propTypes = {
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  addLikeToUserPosts: PropTypes.func.isRequired,
  removeLikeFromUserPosts: PropTypes.func.isRequired,
  deletePostFromUserPosts: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(mapStateToProps, {
  addLikeToUserPosts,
  removeLikeFromUserPosts,
  deletePostFromUserPosts
})(PostItem);
