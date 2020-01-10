import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getUserPosts } from '../../actions/post';
import PostItem from './PostItem'
import Spinner from '../layout/loading';
const Posts = ({ post: { loading, posts }, getUserPosts }) => {
  useEffect(() => {
    getUserPosts();
  }, [getUserPosts]);
  return loading ? (
    <Spinner />
  ) : (
    <Fragment>
      <h1 className="large text-primary">Team Annoucment</h1>
      <p className="lead">
        <i className="fas fa-users" /> NOC Key Infos
      </p>
      <div className="posts">
        {posts.map(post => (
          <PostItem key={post._id} post={post} />
        ))}
      </div>
    </Fragment>
  );
};

Posts.propTypes = {
  post: PropTypes.object.isRequired,
  getUserPosts: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  post: state.post
});
export default connect(mapStateToProps, { getUserPosts })(Posts);
