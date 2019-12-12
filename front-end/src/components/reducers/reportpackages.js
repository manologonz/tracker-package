import { GET_REPORT_PACKAGES, DELETE_PACKAG_ADMIN } from "../actions/types";

const initialState = {
  total_packags: {},
  admin_packages: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_REPORT_PACKAGES:
      return {
        ...state,
        total_packags: action.payload,
        admin_packages: action.payload.packages
      };
    case DELETE_PACKAG_ADMIN:
      return {
        ...state,
        admin_packages: state.admin_packages.filter(
          pack => pack.id !== action.payload
        )
      };
    default:
      return state;
  }
}
