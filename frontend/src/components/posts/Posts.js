import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getUserPosts } from '../../actions/post';
const Posts = ({ post: { loading, post }, getUserPosts }) => {
  useEffect(() => {
    getUserPosts();
  }, [getUserPosts]);
  return <div></div>;
};

Posts.propTypes = {
  post: PropTypes.object.isRequired,
  getUserPosts: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  post: state.post
});
export default connect(mapStateToProps, { getUserPosts })(Posts);
