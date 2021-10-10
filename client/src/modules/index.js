import { combineReducers } from 'redux';

import toast from './toast';
import user from './user';
import theme from './theme';
import interaction from './interaction';
import list from './list';

const rootReducer = combineReducers({
  toast,
  user,
  theme,
  interaction,
  list,
});

export default rootReducer;
