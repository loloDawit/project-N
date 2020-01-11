import axios from 'axios';
import { setAlert } from './alert';
import {
  GET_POSTS,
  GET_POST,
  POST_FAILER,
  POST_UPDATE_LIKES,
  DELETE_POST,
  ADD_POST
} from './constant';

/**
 *
 * @param {*} post_id
 */
export const getUserPost = post_id => async dispatch => {
  try {
    const res = await axios.get(`/api/v1/posts/${post_id}`);
    dispatch({
      type: GET_POST,
      payload: res.data.data
    });
  } catch (err) {
    dispatch({
      type: POST_FAILER,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
/**
 * 
 */
export const getUserPosts = () => async dispatch => {
  try {
    const res = await axios.get('/api/v1/posts');
    dispatch({
      type: GET_POSTS,
      payload: res.data.data
    });
  } catch (err) {
    dispatch({
      type: POST_FAILER,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
/**
 *
 * @param {*} post_id Id of the post object
 */
export const addLikeToUserPosts = post_id => async dispatch => {
  try {
    const res = await axios.put(`/api/v1/posts/like/${post_id}`);
    dispatch({
      type: POST_UPDATE_LIKES,
      payload: { post_id, likes: res.data.data }
    });
  } catch (err) {
    dispatch({
      type: POST_FAILER,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
/**
 *
 * @param {*} post_id Id of the post object
 */
export const removeLikeFromUserPosts = post_id => async dispatch => {
  try {
    const res = await axios.put(`/api/v1/posts/unlike/${post_id}`);
    dispatch({
      type: POST_UPDATE_LIKES,
      payload: { post_id, likes: res.data.data }
    });
  } catch (err) {
    dispatch({
      type: POST_FAILER,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
/**
 *
 * @param {*} post_id Id of the post object
 */
export const deletePostFromUserPosts = post_id => async dispatch => {
  try {
    await axios.delete(`/api/v1/posts/${post_id}`);
    dispatch({
      type: DELETE_POST,
      payload: post_id
    });
    dispatch(setAlert('Post Deleted', 'success'));
  } catch (err) {
    dispatch({
      type: POST_FAILER,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
/**
 *
 * @param {*} post_id Id of the post object
 */
export const addPost = formData => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  try {
    const res = await axios.post('/api/v1/posts/', formData, config);
    dispatch({
      type: ADD_POST,
      payload: res.data.data
    });
    dispatch(setAlert('Post Added', 'success'));
  } catch (err) {
    dispatch({
      type: POST_FAILER,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

