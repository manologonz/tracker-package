import axios from "axios";
import { createMessage, returnErrors } from "./messages";
import {
  GET_PACKAGS,
  DELETE_PACKAG,
  ADD_PACKAG,
  GET_ERRORS,
  SET_DELIVERED,
  SET_STORAGE,
  SET_TRANSIT
} from "./types";

// Get packages
export const getPackages = () => (dispatch, getState) => {
  // Get token from state
  const token = getState().auth.token;

  // Header
  const config = {
    headers: {}
  };

  // If token, add to headers config
  if (token) {
    config.headers["Authorization"] = `Token ${token}`;
  }

  axios
    .get("http://localhost:8000/packages/", config)
    .then(res => {
      dispatch({
        type: GET_PACKAGS,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

// Add package
export const addPackage = name => (dispatch, getState) => {
  // Get token from state
  const token = getState().auth.token;

  // Header
  const config = {
    headers: { "Content-Type": "application/json" }
  };

  // Set token if exist
  if (token) {
    config.headers["Authorization"] = `Token ${token}`;
  }

  const body = JSON.stringify({
    name
  });

  axios
    .post(`http://localhost:8000/packages/`, body, config)
    .then(res => {
      dispatch({
        type: ADD_PACKAG,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status));
    });
};

// Delete package
export const deletePackage = id => (dispatch, getState) => {
  // Get token from state
  const token = getState().auth.token;

  // Header
  const config = {
    headers: {}
  };

  // If token, add to headers config
  if (token) {
    config.headers["Authorization"] = `Token ${token}`;
  }

  axios
    .delete(`http://localhost:8000/packages/${id}/`, config)
    .then(res => {
      dispatch({
        type: DELETE_PACKAG,
        payload: id
      });
    })
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};
