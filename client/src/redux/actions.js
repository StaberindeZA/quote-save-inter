import { ADD_QUOTE, DELETE_QUOTE, EDIT_QUOTE } from "./actionTypes";
import { deleteSingleQuote, updateSingleQuote } from "../client";

function postQuote(quote) {
  let quotePostFormat = {
    "id": quote.id,
    "author": quote.author,
    "text": quote.text,
    "dateadded": quote.dateadded
  };

  return fetch(
    '/api/quotes', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify(quotePostFormat)
    }
  );
}

export const addQuote = (quote) => ({
  type: ADD_QUOTE,
  payload: {
    id: quote.id,
    author: quote.author,
    text: quote.text,
    dateadded: quote.dateadded
  }
});

export const editQuote = (quote) => ({
  type: EDIT_QUOTE,
  payload: {
    id: quote.id,
    author: quote.author,
    text: quote.text,
    dateadded: quote.dateadded
  }
});

export const deleteQuote = (id) => ({
  type: DELETE_QUOTE,
  payload: {
    id: id
  }
});

export const remoteAddQuotes = (quote) => {
  return function (dispatch) {
    return postQuote(quote)
      .then(
        test => dispatch(addQuote(quote)),
        error => console.log(error)
      );
  };
}

export const remoteEditQuote = (quote) => {
  console.log("Made it to remoteEditQuote", quote);
  return function (dispatch) {
    return updateSingleQuote(quote)
      .then(
        test => dispatch(editQuote(quote)),
        error => console.log(error)
      );
  };
}

export const remoteDeleteQuotes = (id) => {
  return function (dispatch) {
    return deleteSingleQuote(id)
      .then(
        test => dispatch(deleteQuote(id)),
        error => console.log(error)
      );
  };
}