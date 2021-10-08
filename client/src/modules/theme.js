//Action Type
const TOGGLE_THEME = 'theme/TOGGLE_THEME';

//Action Creator
export const toggleTheme = () => ({ type: TOGGLE_THEME });

//init
const initialState = {
  isDarkMode: false,
};

//Reducer
const themeReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_THEME:
      return {
        isDarkMode: !state.isDarkMode,
      };
    default:
      return state;
  }
};

export default themeReducer;
