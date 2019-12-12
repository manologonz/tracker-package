import axios from "axios";
import {
  USER_LOADED,
  USER_LOADING,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  SIGNUP_FAIL,
  SIGNUP_SUCCESS,
  UPDATE_SUCCESS,
  DELETE_ACCOUNT
} from "./types";
import { returnErrors } from "./messages";

// Check token and load the user
export const loadUser = () => (dispatch, getState) => {
  // User loading
  dispatch({
    type: USER_LOADING
  });

  // Get token from state
  const token = getState().auth.token;

  // Header
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  // If token, add to headers config
  if (token) {
    config.headers["Authorization"] = `Token ${token}`;
  }

  axios
    .get("http://127.0.0.1:8000/users/", config)
    .then(res => {
      dispatch({
        type: USER_LOADED,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({ type: AUTH_ERROR });
    });
};

// Login User
export const login = (username, password) => dispatch => {
  // Header
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  // Request body
  const body = JSON.stringify({
    username,
    password
  });

  axios
    .post("http://127.0.0.1:8000/users/login/", body, config)
    .then(res => {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({ type: LOGIN_FAIL });
    });
};

// User Register
export const signup = ({
  username,
  first_name,
  last_name,
  email,
  password,
  password_confirmation
}) => dispatch => {
  // Header
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  // Request body
  const body = JSON.stringify({
    username,
    first_name,
    last_name,
    email,
    password,
    password_confirmation
  });

  axios
    .post("http://127.0.0.1:8000/users/signup/", body, config)
    .then(res => {
      dispatch({
        type: SIGNUP_SUCCESS,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({ type: SIGNUP_FAIL });
    });
};

// Logout User
export const logout = () => (dispatch, getState) => {
  // Header
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  const token = getState().auth.token;

  // If token, add to headers config
  if (token) {
    config.headers["Authorization"] = `Token ${token}`;
  }

  axios
    .post("http://127.0.0.1:8000/users/logout/", null, config)
    .then(res => {
      dispatch({
        type: LOGOUT_SUCCESS,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status));
    });
};

// Update User
export const updateUser = ({ username, first_name, last_name, email }) => (
  dispatch,
  getState
) => {
  // Header
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  const token = getState().auth.token;

  // If token, add to headers config
  if (token) {
    config.headers["Authorization"] = `Token ${token}`;
  }

  const body = JSON.stringify({
    first_name,
    last_name,
    email
  });

  axios
    .patch(`http://127.0.0.1:8000/users/${username}/`, body, config)
    .then(res => {
      dispatch({
        type: UPDATE_SUCCESS,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status));
    });
};

export const deleteAccount = username => (dispatch, getState) => {
  // Header
  const config = {
    headers: {}
  };

  const token = getState().auth.token;

  // If token, add to headers config
  if (token) {
    config.headers["Authorization"] = `Token ${token}`;
  }

  axios
    .delete(`http://127.0.0.1:8000/users/${username}/`, config)
    .then(res => {
      dispatch({
        type: DELETE_ACCOUNT
      });
    })
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status));
    });
};

// User Admin
export const createAdmin = ({
  username,
  email,
  first_name,
  last_name,
  password,
  password_confirmation,
  is_admin
}) => (dispatch, getState) => {
  // Header
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  // Request body
  const body = JSON.stringify({
    username,
    first_name,
    last_name,
    email,
    is_admin,
    password,
    password_confirmation
  });

  axios
    .post("http://127.0.0.1:8000/users/signup/", body, config)
    .then(res => {
      dispatch({
        type: SIGNUP_SUCCESS,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status));
    });
};
