import {
  GET_POSTS,
  POST_FAILER,
  POST_UPDATE_LIKES,
  DELETE_POST,
  ADD_POST
} from '../actions/constant';

const initialState = {
  post: [],
  post: null,
  loading: true,
  error: {}
};

export default function(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_POSTS:
      return {
        ...state,
        posts: payload,
        loading: false
      };
    case ADD_POST:
      return {
        ...state,
        posts: [...state.posts, payload],
        loading: false
      };
    case POST_FAILER:
      return {
        ...state,
        error: payload,
        loading: false
      };
    case POST_UPDATE_LIKES:
      return {
        ...state,
        posts: state.posts.map(post =>
          post._id === payload.id ? { ...post, likes: payload.likes } : post
        ),
        loading: false
      };
    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter(post => post._id !== payload),
        loading: false
      };
    default:
      return state;
  }
}
