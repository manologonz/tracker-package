import { GET_PACKAGS, DELETE_PACKAG, ADD_PACKAG } from "../actions/types";

const initialState = {
  packags: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_PACKAGS:
      return {
        ...state,
        packags: action.payload
      };
    case DELETE_PACKAG:
      return {
        ...state,
        packags: state.packags.filter(pack => pack.id !== action.payload)
      };
    case ADD_PACKAG:
      return {
        ...state,
        packags: [...state.packags, action.payload]
      };
    default:
      return state;
  }
}
