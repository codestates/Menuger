import { combineReducers } from 'redux';

//import module
import ex_counter from './ex_counter';
import dietColumnContainer from './dietColumnContainer';

const rootReducer = combineReducers({
  //module 등록
  ex_counter,
  dietColumnContainer,
});

export default rootReducer;
