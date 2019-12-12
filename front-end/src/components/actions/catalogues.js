import axios from "axios";
import { createMessage, returnErrors } from "./messages";
import {
  GET_CATALOGUES,
  ADD_CATALOGUE,
  DELETE_CATALOGUE,
  ADD_CLIENT
} from "./types";
import catalogues from "../reducers/catalogues";

// Get Catalogues
export const getCatalogues = () => (dispatch, getState) => {
  const token = getState().auth.token;

  const config = {
    headers: {}
  };

  if (token) {
    config.headers["Authorization"] = `Token ${token}`;
  }

  axios
    .get("http://localhost:8000/catalogues/", config)
    .then(res => {
      dispatch({
        type: GET_CATALOGUES,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

// Add Catalogue
export const addCatalogue = (name, slug_name) => (dispatch, getState) => {
  const token = getState().auth.token;

  const config = {
    headers: { "Content-Type": "application/json" }
  };

  if (token) {
    config.headers["Authorization"] = `Token ${token}`;
  }

  const body = JSON.stringify({
    name,
    slug_name
  });

  axios
    .post("http://localhost:8000/catalogues/", body, config)
    .then(res => {
      dispatch({
        type: ADD_CATALOGUE,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

// Delete Catalogue
export const deleteCatalogue = slug_name => (dispatch, getState) => {
  const token = getState().auth.token;

  const config = {
    headers: {}
  };

  if (token) {
    config.headers["Authorization"] = `Token ${token}`;
  }

  axios
    .delete(`http://localhost:8000/catalogues/${slug_name}`, config)
    .then(res => {
      dispatch({
        type: DELETE_CATALOGUE,
        payload: slug_name
      });
    })
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

// Add Client
export const addClient = (slug_name, username) => (dispatch, getState) => {
  const token = getState().auth.token;

  const config = {
    headers: {}
  };

  if (token) {
    config.headers["Authorization"] = `Token ${token}`;
  }

  const body = JSON.stringify({});

  axios
    .post(
      `http://localhost:8000/client/${username}/${slug_name}/add/`,
      body,
      config
    )
    .then(res => {
      dispatch({
        type: ADD_CLIENT,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};
