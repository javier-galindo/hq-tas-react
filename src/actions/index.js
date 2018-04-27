import { setLocale } from "react-redux-i18n";
import API from "../api";

export function getContributor(id) {
  return API.get(`/contributors/${id}.json`)
    .then(response => ({
      type: "GET_CONTRIBUTOR",
      payload: response.data,
    }))
    .catch(() => ({
      type: "HANDLE_ERROR",
      payload: true,
    }));
}

export function getContributorsUnassigned() {
  return API.get(`/contributors/unassigned.json?site_id=${process.env.REACT_APP_SITE_ID}`)
    .then(response => ({
      type: "GET_CONTRIBUTORS_UNASSIGNED",
      payload: response.data,
    }))
    .catch(() => ({
      type: "HANDLE_ERROR",
      payload: true,
    }));
}

export function getSiteFullInfo() {
  return API.get(`/sites/${process.env.REACT_APP_SITE_ID}/full.json`)
    .then(response => ({
      type: "GET_SITE_FULL_INFO",
      payload: response.data,
    }))
    .catch(() => ({
      type: "HANDLE_ERROR",
      payload: true,
    }));
}

export function getWorkrooms(floorId) {
  return API.get(`/workrooms.json?floor_id=${floorId}`)
    .then(response => ({
      type: "GET_WORKROOMS",
      payload: response.data,
    }))
    .catch(() => ({
      type: "HANDLE_ERROR",
      payload: true,
    }));
}

export function getWorkplaces(wid) {
  return API.get(`/workplaces.json?workroom_id=${wid}`)
    .then(response => ({
      type: "GET_WORKPLACES",
      payload: response.data,
    }))
    .catch(() => ({
      type: "HANDLE_ERROR",
      payload: true,
    }));
}

export function cleanWorkrooms() {
  return {
    type: "CLEAN_WORKROOMS",
    payload: null,
  };
}

export function cleanWorkplaces() {
  return {
    type: "CLEAN_WORKPLACES",
    payload: null,
  };
}

export const changeLanguage = lang => (dispatch) => {
  dispatch(setLocale(lang));
};
