import axios from "axios";
import { api_domain } from "../configs.json";
import {
  FETCH_ALL,
  SET_ADD_TODO_TEXT,
  TOGGLE_COMPLETE,
  TOGGLE_COMPLETE_ALL,
  HIDE_COMPLETE,
  FILTER_TODOS,
} from "./types";

export const fetchTodos = (query = "", callback = () => {}) => (dispatch) => {
  axios
    .get(`${api_domain}todos?${query}`)
    .then((res) => {
      callback();
      dispatch({
        type: FETCH_ALL,
        payload: res.data,
      });
    })
    .catch((err) => alert(err.message));
};

export const setTodoText = (text) => ({
  type: SET_ADD_TODO_TEXT,
  payload: text,
});

export const toggleCompleteAll = () => ({
  type: TOGGLE_COMPLETE_ALL,
});

export const toggleComplete = (id) => ({
  type: TOGGLE_COMPLETE,
  payload: id,
});

export const toggleHideComplete = () => ({
  type: HIDE_COMPLETE,
});

export const filterTodos = (title) => ({
  type: FILTER_TODOS,
  payload: title,
});
