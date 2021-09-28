import { combineReducers } from 'redux';

//import module
import ex_counter from './ex_counter';
import dietColumnContainer from './dietColumnContainer';
import toastReducer from './toast';
import userReducer from './user';

const rootReducer = combineReducers({
  //module 등록
  ex_counter,
  dietColumnContainer,
  toastReducer,
  userReducer,
});

export default rootReducer;
