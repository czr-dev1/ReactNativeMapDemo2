import { combineReducers } from 'redux';

import stories from './storyReducer';
import profile from './profileReducer';

const rootReducer = combineReducers({
  storyReducer: stories,
  profileReducer: profile
})

export default rootReducer;
