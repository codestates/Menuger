import { combineReducers } from 'redux';

//import module
import ex_counter from './ex_counter';
import dietColumnContainer from './dietColumnContainer';
import toastReducer from './toast';

const rootReducer = combineReducers({
  //module 등록
  ex_counter,
  dietColumnContainer,
  toastReducer,
});

export default rootReducer;
