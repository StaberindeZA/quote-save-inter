import { ADD_QUOTE, DELETE_QUOTE } from "./actionTypes";
import { deleteSingleQuote } from "../client";

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

export const remoteDeleteQuotes = (id) => {
  return function (dispatch) {
    return deleteSingleQuote(id)
      .then(
        test => dispatch(deleteQuote(id)),
        error => console.log(error)
      );
  };
}