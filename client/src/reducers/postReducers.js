import {
  GET_POSTS,
  POST_ERROR,
  UPDATE_LIKES,
  DELETE_POST,
  ADD_POST,
  GET_POST,
  ADD_COMMENT,
  REMOVE_COMMENT,
  EDIT_COMMENT,
  GET_COMMENT_TO_EDITION,
  EDIT_POST,
} from '../actions/constants';

const initialState = {
  posts: [],
  post: null,
  loading: true,
  error: {},
};

const post = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_POSTS:
      return {
        ...state,
        posts: payload,
        loading: false,
      };
    case GET_POST:
      return {
        ...state,
        post: payload,
        loading: false,
      };
    case ADD_POST:
      return {
        ...state,
        posts: [payload, ...state.posts],
        loading: false,
      };
    case EDIT_POST:
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === payload._id ? payload : post
        ),
        post: payload,
        loading: false,
      };
    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter((post) => {
          return post._id !== payload;
        }),
        post: null,
        loading: false,
      };
    case POST_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case UPDATE_LIKES:
      return {
        ...state,
        posts: state.posts.map((post) => {
          return post._id === payload.postId
            ? { ...post, likes: payload.likes }
            : post;
        }),
        post: state.post !== null && { ...state.post, likes: payload.likes },
        loading: false,
      };
    case ADD_COMMENT:
      return {
        ...state,
        post: { ...state.post, comments: payload },
        loading: false,
      };
    case REMOVE_COMMENT:
      return {
        ...state,
        post: {
          ...state.post,
          comments: state.post.comments.filter((comment) => {
            return comment._id !== payload;
          }),
          loading: false,
        },
      };
    case EDIT_COMMENT:
      return {
        ...state,
        post: {
          ...state.post,
          comments: state.post.comments.map((comment) => {
            return comment.id === payload._id ? payload : comment;
          }),
          loading: false,
        },
      };
    case GET_COMMENT_TO_EDITION:
      return {
        ...state,
        post: {
          ...state.post,
          comment_to_edition: payload,
          loading: false
        }
      };
    default:
      return state;
  }
};

export default post;
