import { combineReducers } from 'redux';

import dietColumnContainer from './dietColumnContainer';
import toast from './toast';
import user from './user';

const rootReducer = combineReducers({
  dietColumnContainer,
  toast,
  user,
});

export default rootReducer;
