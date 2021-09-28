//Action Type
const SET_USERINFO = 'user/SET_USERINFO';

//Action Creator
export const setUserInfo = userInfo => ({ type: SET_USERINFO, payload: userInfo });

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
      console.log('payload');
      console.log(action.payload);
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;
