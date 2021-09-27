//Action Type
const SET_TOAST_REF = 'toast/SET_TOAST_REF';

//Action Creator
export const setToastRef = toastRef => ({ type: SET_TOAST_REF, payload: toastRef });

//init
const initialState = {
  toastRef: null,
};

//Reducer
const toastReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_TOAST_REF:
      return {
        ...state,
        toastRef: action.payload,
      };
    default:
      return state;
  }
};

export default toastReducer;
