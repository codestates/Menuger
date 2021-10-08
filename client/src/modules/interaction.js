//Action Type
const SET_INTERACTION = 'interaction/SET_INTERACTION';

//Action Creator
export const setInteraction = interaction => ({ type: SET_INTERACTION, payload: interaction });

//init
const initialState = {
  recipes: {
    likeIds: [],
    bookmarkIds: [],
    subscribes: [],
  },
  diets: {
    likeIds: [],
    bookmarkIds: [],
    subscribes: [],
  },
};

//Reducer
const interactionReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_INTERACTION:
      return {
        ...state,
        recipes: {
          likeIds: [...action.payload.recipes.likeIds],
          bookmarkIds: [...action.payload.recipes.bookmarkIds],
          subscribes: [...action.payload.recipes.subscribes],
        },
        diets: {
          likeIds: [...action.payload.diets.likeIds],
          bookmarkIds: [...action.payload.diets.bookmarkIds],
          subscribes: [...action.payload.diets.subscribes],
        },
      };
    default:
      return state;
  }
};

export default interactionReducer;
