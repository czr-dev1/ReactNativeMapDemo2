import { combineReducers } from 'redux';

import stories from './storyReducer';
import profile from './profileReducer';
import login from './authReducer';

const rootReducer = combineReducers({
  storyReducer: stories,
  authReducer: login,
})

export default rootReducer;
