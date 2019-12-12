import {
  ADD_CATALOGUE,
  GET_CATALOGUES,
  DELETE_CATALOGUE,
  ADD_CLIENT
} from "../actions/types";

const initialState = {
  catalogues: [],
  update_catalogue: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_CATALOGUES:
      return {
        ...state,
        catalogues: action.payload
      };
    case ADD_CATALOGUE:
      return {
        ...state,
        catalogues: [...state.catalogues, action.payload]
      };
    case DELETE_CATALOGUE:
      return {
        ...state,
        catalogues: state.catalogues.filter(
          catalogue => catalogue.slug_name !== action.payload
        )
      };
    case ADD_CLIENT:
      return state;
    default:
      return state;
  }
}
