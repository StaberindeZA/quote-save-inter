import { ADD_QUOTE, DELETE_QUOTE } from "./actionTypes";

function postQuote(quote) {
  let quotePostFormat = [{
    "author": "Test Auth",
    "text": quote,
    "dateadded": 1566821162
  }];

  console.log(quotePostFormat);

  return fetch(
    '/api/quotes', {
    method: 'post',
    body: JSON.stringify(quotePostFormat)
    }
  );
}

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

export const remoteQuotes = (quote) => {
  return function (dispatch) {
    return postQuote(quote)
      .then(
        test => dispatch(addQuote(quote)),
        error => console.log(error)
      );
  };
}