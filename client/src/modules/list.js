import produce from 'immer';

//Action Type
const SET_LIST = 'list/SET_LIST';
const ADD_TO_LIST = 'list/ADD_TO_LIST';
const INCREASE_COUNT = 'list/INCREASE_COUNT';
const DECREASE_COUNT = 'list/DECREASE_COUNT';

//Action Creator
export const setList = list => ({ type: SET_LIST, payload: list });
export const addToList = list => ({ type: ADD_TO_LIST, payload: list });
export const increaseCount = payload => ({ type: INCREASE_COUNT, payload });
export const decreaseCount = payload => ({ type: DECREASE_COUNT, payload });

//init
const initialState = {
  list: [],
};

//Reducer
const listReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_LIST:
      return produce(state, draft => {
        draft.list = action.payload;
      });
    case ADD_TO_LIST:
      return produce(state, draft => {
        draft.list.push(...action.payload);
      });
    case INCREASE_COUNT:
      return produce(state, draft => {
        const idx = draft.list.findIndex(card => card._id === action.payload._id);
        draft.list[idx][`${action.payload.type}Count`]++;
      });
    case DECREASE_COUNT:
      return produce(state, draft => {
        const idx = draft.list.findIndex(card => card._id === action.payload._id);
        draft.list[idx][`${action.payload.type}Count`]--;
      });
    default:
      return state;
  }
};

export default listReducer;
