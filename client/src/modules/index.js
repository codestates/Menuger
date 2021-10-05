import { combineReducers } from 'redux';

import dietColumnContainer from './dietColumnContainer';
import toast from './toast';
import user from './user';
import post from './post';
import theme from './theme';

const rootReducer = combineReducers({
  dietColumnContainer,
  toast,
  user,
  post,
  theme,
});

export default rootReducer;
