import { combineReducers } from 'redux';
import auth from './auth';
import equipment from './equipment';

export default combineReducers({
    auth,
    equipment
});