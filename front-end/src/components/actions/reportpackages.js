import axios from "axios";
import { createMessage, returnErrors } from "./messages";
import { GET_REPORT_PACKAGES } from "./types";

//Get Report
// Get packages
export const getRepPackags = () => (dispatch, getState) => {
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
        type: GET_REPORT_PACKAGES,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

// Delete package
export const deletePackageAdmin = id => (dispatch, getState) => {
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
        type: DELETE_PACKAG_ADMIN,
        payload: id
      });
    })
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

// Delete package
export const setStorage = id => (dispatch, getState) => {
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

  const body = JSON.stringify({
    name
  });

  axios
    .post(`http://localhost:8000/packages/${id}/storage/`, body, config)
    .then(res => {
      dispatch({
        type: SET_STORAGE,
        payload: id
      });
    })
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

// Delete package
export const setTransit = id => (dispatch, getState) => {
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

  const body = JSON.stringify({
    name
  });

  axios
    .post(`http://localhost:8000/packages/${id}/transit/`, body, config)
    .then(res => {
      dispatch({
        type: SET_TRANSIT,
        payload: id
      });
    })
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

// Delete package
export const setDelivered = id => (dispatch, getState) => {
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

  const body = JSON.stringify({
    name
  });

  axios
    .post(`http://localhost:8000/packages/${id}/delivered/`, body, config)
    .then(res => {
      dispatch({
        type: SET_DELIVERED,
        payload: id
      });
    })
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};
