import axios from 'axios';
import { setAlert } from './alertActions';
import {
    DELETE_POST,
    GET_POSTS,
    POST_ERROR,
    UPDATE_LIKES,
    ADD_POST,
    GET_POST,
    ADD_COMMENT,
    REMOVE_COMMENT,
    CLEAN_POST,
    EDIT_POST
} from './constants';

// Get posts
export const getPosts = () => async dispatch => {
    try {
        const res = await axios.get('/api/posts');

        dispatch({
            type: GET_POSTS,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.responseStatusText, status: err.response.status }
        })
    }
}

// Add a like
export const addLike = (postId) => async dispatch => {
    try {
        const res = await axios.put(`/api/posts/like/${postId}`);

        dispatch({
            type: UPDATE_LIKES,
            payload: { postId, likes: res.data}
        });
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.responseStatusText, status: err.response.status }
        })
    }
}

// Remove a like
export const removeLike = (postId) => async dispatch => {
    try {
        const res = await axios.put(`/api/posts/unlike/${postId}`);

        dispatch({
            type: UPDATE_LIKES,
            payload: { postId, likes: res.data}
        });
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.responseStatusText, status: err.response.status }
        })
    }
}

// Delete post
export const deletePost = (postId) => async dispatch => {
    try {
        const res = await axios.delete(`/api/posts/${postId}`);

        dispatch({
            type: DELETE_POST,
            payload: postId
        });
        dispatch(setAlert('Post Removed', 'success'));
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.responseStatusText, status: err.response.status }
        })
    }
}

// Add post
export const addPost = (formData) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    try {
        const res = await axios.post('/api/posts', formData, config);
console.log(res)
        dispatch({
            type: ADD_POST,
            payload: res.data
        });
        dispatch(setAlert('Post Created', 'success'));
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.responseStatusText, status: err.response.status }
        })
    }
}

// Get a single post
export const getPost = (postId) => async dispatch => {
    try {
        const res = await axios.get(`/api/posts/${postId}`);

        dispatch({
            type: GET_POST,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.responseStatusText, status: err.response.status }
        })
    }
}

// Add comment
export const addComment = (postId, formData) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    try {
        const res = await axios.post(`/api/posts/comment/${postId}`, formData, config);

        console.log(res.data)

        dispatch({
            type: ADD_COMMENT,
            payload: res.data
        });
        dispatch(setAlert('Comment added', 'success'));
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.responseStatusText, status: err.response.status }
        })
    }
}

// Delete comment
export const deleteComment = (postId, commentId) => async dispatch => {
    try {
        const res = await axios.delete(`/api/posts/comment/${postId}/${commentId}`);

        dispatch({
            type: REMOVE_COMMENT,
            payload: commentId
        });
        dispatch(setAlert('Comment deleted', 'success'));
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.responseStatusText, status: err.response.status }
        })
    }
}

export const cleanPost = () => dispatch => {
  dispatch({
    type: CLEAN_POST,
  });
};


// Edit post 
export const editPost = (postId, formaData) => async dispatch => {
    console.log(postId)
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    try {

        const res = await axios.put(`/api/posts/edit/${postId}`, config, formaData)
        dispatch({
            type: EDIT_POST,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.responseStatusText, status: err.response.status }
        })
    }
}