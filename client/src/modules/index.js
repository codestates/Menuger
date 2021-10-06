import { combineReducers } from 'redux';

import dietColumnContainer from './dietColumnContainer';
import toast from './toast';
import user from './user';
import theme from './theme';
import interaction from './interaction';

const rootReducer = combineReducers({
  dietColumnContainer,
  toast,
  user,
  theme,
  interaction,
});

export default rootReducer;
