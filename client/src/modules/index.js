import { combineReducers } from 'redux';

//import module
import ex_counter from './ex_counter';

const rootReducer = combineReducers({
  //module 등록
  ex_counter,
});

export default rootReducer;
