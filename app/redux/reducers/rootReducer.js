import { combineReducers } from 'redux';

import stories from './storyReducer';
import login from './authReducer';
import profile from './profileReducer';

const rootReducer = combineReducers({
  storyReducer: stories,
  authReducer: login,
  profileReducer: profile,
})

export default rootReducer;
