import { combineReducers } from 'redux';

import stories from './storyReducer';

const rootReducer = combineReducers({
  storyReducer: stories
})

export default rootReducer;
