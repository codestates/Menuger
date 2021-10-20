//Action Type
const SET_USERINFO = 'user/SET_USERINFO';
const RESET_USERINFO = 'user/RESET_USERINFO';

//Action Creator
export const setUserInfo = userInfo => ({ type: SET_USERINFO, payload: userInfo });
export const resetUserInfo = () => ({ type: RESET_USERINFO });

//init
const initialState = {
  email: '',
  image_url: '',
  nickname: '',
  subscribes: [],
  type: 'user',
};

//Reducer
const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USERINFO:
      return {
        ...state,
        ...action.payload,
      };
    case RESET_USERINFO:
      return initialState;
    default:
      return state;
  }
};

export default userReducer;
