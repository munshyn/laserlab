import { combineReducers } from 'redux';
import auth from './auth';
import equipment from './equipment';
import servicesApp from './servicesapp';

export default combineReducers({
    auth,
    equipment,
    servicesApp
});