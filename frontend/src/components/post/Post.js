import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getUserPost } from '../../actions/post';
import Spinner from '../layout/loading';
import PostItem from '../posts/PostItem';
import { Link } from 'react-router-dom';
import PostCommentForm from './PostCommentForm';
import PostCommentItem from './PostCommentItem';
const Post = ({ getUserPost, post: { loading, post }, match }) => {
  useEffect(() => {
    getUserPost(match.params.id);
  }, [getUserPost]);
  return loading || post == null ? (
    <Spinner />
  ) : (
    <Fragment>
      <Link to="/posts" className="btn">
        Back
      </Link>
      <PostItem post={post} showPostActions={false} />
      <PostCommentForm postId={post._id} />
      <div className="comments">
        {post.comments.map(comment => (
          <PostCommentItem
            key={comment._id}
            comment={comment}
            postId={post._id}
          />
        ))}
      </div>
    </Fragment>
  );
};

Post.propTypes = {
  getUserPost: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  post: state.post
});
export default connect(mapStateToProps, { getUserPost })(Post);
