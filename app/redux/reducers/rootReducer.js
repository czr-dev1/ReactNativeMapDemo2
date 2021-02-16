import { combineReducers } from 'redux';

import stories from './storyReducer';
import login from './authReducer';
import profile from './profileReducer';
import message from './messageReducer';

const rootReducer = combineReducers({
  storyReducer: stories,
  authReducer: auth,
  profileReducer: profile,
  messageReducer: message,
})

export default rootReducer;
