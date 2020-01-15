import React, {useState} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addPost } from '../../actions/post';
const PostForm = ({ addPost }) => {
  const [text, setText] = useState('');
  return (
    <div className="post-form">
      <div className="bg-primary p">
        <h3>You can add a post here...</h3>
      </div>
      <form
        className="form my-1"
        onSubmit={e => {
          e.preventDefault();
          addPost({ text });
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
        ></textarea>
        <input type="submit" className="btn btn-dark my-1" value="Submit" />
      </form>
    </div>
  );
};

PostForm.propTypes = {
  addPost: PropTypes.func.isRequired
};

export default connect(null, { addPost })(PostForm);
