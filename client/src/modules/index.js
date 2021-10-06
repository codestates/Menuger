import { combineReducers } from 'redux';

import toast from './toast';
import user from './user';
import theme from './theme';
import interaction from './interaction';

const rootReducer = combineReducers({
  toast,
  user,
  theme,
  interaction,
});

export default rootReducer;
