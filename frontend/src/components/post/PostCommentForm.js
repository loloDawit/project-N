import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addCommentToPost } from '../../actions/post';
/**
 * 
 * @param {*} param0 The post id, and function addCommmentToPost
 * 
 */
const PostCommentForm = ({ postId, addCommentToPost }) => {
  const [text, setText] = useState('');
  return (
    <div className="post-form">
      <div className="bg-primary p">
        <h3>Start a discussion...</h3>
      </div>
      <form
        className="form my-1"
        onSubmit={e => {
          e.preventDefault();
          addCommentToPost(postId, { text });
          setText('');
        }}
      >
        <textarea
          name="text"
          cols="30"
          rows="5"
          value={text}
          placeholder="Create a post"
          onChange={e => setText(e.target.value)}
          required
        ></textarea>
        <input type="submit" className="btn btn-dark my-1" value="Submit" />
      </form>
    </div>
  );
};

PostCommentForm.propTypes = {
  addCommentToPost: PropTypes.func.isRequired
};

export default connect(null, { addCommentToPost })(PostCommentForm);
