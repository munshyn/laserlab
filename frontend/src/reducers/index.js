import { combineReducers } from 'redux';
import auth from './auth';
import equipment from './equipment';
import servicesapp from './servicesapp';

export default combineReducers({
    auth,
    equipment,
    servicesapp
});