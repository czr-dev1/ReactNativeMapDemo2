import { combineReducers } from 'redux';

import stories from './storyReducer';
import login from './authReducer';

const rootReducer = combineReducers({
  storyReducer: stories,
  authReducer: login,
})

export default rootReducer;
