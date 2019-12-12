import {
  USER_LOADED,
  USER_LOADING,
  AUTH_ERROR,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  REGISTER_FAIL,
  UPDATE_SUCCESS,
  DELETE_ACCOUNT
} from "../actions/types";

const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: false,
  isLoadin: false,
  user: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case USER_LOADING:
      return {
        ...state,
        isLoadin: true
      };
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        isLoadin: false,
        user: action.payload
      };
    case UPDATE_SUCCESS:
      return {
        ...state,
        user: action.payload
      };
    case LOGIN_SUCCESS:
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        isLoadin: false
      };
    case LOGOUT_SUCCESS:
    case AUTH_ERROR:
    case LOGIN_FAIL:
    case DELETE_ACCOUNT:
    case REGISTER_FAIL:
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        user: null,
        isAuthenticated: false,
        isLoadin: false
      };
    default:
      return state;
  }
}
