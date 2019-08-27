import { ADD_QUOTE, DELETE_QUOTE } from "./actionTypes";

export const addQuote = (text) => ({
  type: ADD_QUOTE,
  payload: {
    text: text,
  }
});

export const deleteQuote = (id) => ({
  type: DELETE_QUOTE,
  payload: {
    id: id
  }
});