//Action Type
const SET_POST_INFO = 'post/SET_POST_INFO';
const RESET_POST_INFO = 'post/RESET_POST_INFO';

//Action Creator
export const setPostInfo = (postType, postId) => ({
  type: SET_POST_INFO,
  payload: { postType, postId },
});
export const resetPostInfo = () => ({
  type: RESET_POST_INFO,
});

//init
const initialState = {
  postType: '',
  postId: '',
};

//Reducer
const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_POST_INFO:
      return {
        ...state,
        ...action.payload,
      };
    case RESET_POST_INFO:
      return initialState;
    default:
      return state;
  }
};

export default postReducer;
