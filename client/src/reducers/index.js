import { combineReducers } from 'redux';
import alert from './alertReducer';
import auth from './authReducer';
import post from './postReducers';

export default combineReducers({
    alert,
    auth,
    post
})