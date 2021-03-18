import { combineReducers } from 'redux';

import stories from './storyReducer';
import auth from './authReducer';
import profile from './profileReducer';
import message from './messageReducers';

const rootReducer = combineReducers({
  storyReducer: stories,
  authReducer: auth,
  profileReducer: profile,
  messageReducer: message,
})

export default rootReducer;
