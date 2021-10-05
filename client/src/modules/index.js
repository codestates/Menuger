import { combineReducers } from 'redux';

import toast from './toast';
import user from './user';
import post from './post';
import theme from './theme';

const rootReducer = combineReducers({
  toast,
  user,
  post,
  theme,
});

export default rootReducer;
