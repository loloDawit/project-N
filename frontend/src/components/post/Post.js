import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getUserPost } from '../../actions/post';
import Spinner from '../layout/loading';

const Post = ({ getUserPost, post: { loading, post }, match }) => {
 useEffect(() => {
      getUserPost(match.params.id);
    }, [getUserPost]);
  return <div>Post</div>;
};

Post.propTypes = {
  getUserPost: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  post: state.post
});
export default connect(mapStateToProps, { getUserPost })(Post);