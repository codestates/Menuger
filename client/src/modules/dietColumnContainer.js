//Action Type
const SET_SELECTED_CONTAINER = 'dietColumnContainer/SET_SELECTED_CONTAINER';

//Action Creator
export const setSelectedContainer = columnList => ({ type: SET_SELECTED_CONTAINER, columnList });

//init
const initialState = [];

//Reducer
const dietColumnContainer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SELECTED_CONTAINER:
      const { columnList } = action;
      return columnList;
    default:
      return state;
  }
};

export default dietColumnContainer;
