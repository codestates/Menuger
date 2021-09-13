//Action Type
//앞에 couter/ 작성하는이유는 다른파일과 겹치지 않기위해
const SET_DIFF = 'counter/SET_DIFF';
const INCREASE = 'counter/INCREASE';
const DECREASE = 'counter/DECREASE';

//Action Creator
export const setDiff = diff => ({ type: SET_DIFF, diff });
export const increase = () => ({ type: INCREASE });
export const decrease = () => ({ type: DECREASE });

//init
const initialState = {
  number: 0,
  diff: 1,
};

//Reducer
const counter = (state = initialState, action) => {
  switch (action.type) {
    case SET_DIFF:
      return {
        ...state,
        diff: action.diff,
      };

    case INCREASE:
      return {
        ...state,
        number: state.number + action.state.diff,
      };

    case DECREASE:
      return {
        ...state,
        number: state.number - action.state.diff,
      };

    default:
      return state;
  }
};

export default counter;
