import store from './redux/store';
import { addQuote } from './redux/actions';

async function getAllQuotes() {
  const url = '/api/quotes';
  const fetchRes = await fetch(url);
  
  const json = await fetchRes.json();

  return json;
}

export async function initialLoadStore() {
  const resJson = await getAllQuotes();

  resJson.forEach((quote) => {
    const fullQuote = {
      id: quote.id,
      author: quote.author,
      text: quote.text,
      dateadded: quote.dateadded
    };
    store.dispatch(addQuote(fullQuote));
  });
}

export async function deleteSingleQuote(id) {
  const url = `/api/quotes/${id}`;
  const fetchRes = await fetch(url, { method: 'DELETE' });
  console.log(fetchRes);
  return "Success";
}

export async function updateSingleQuote(quote) {
  const url = `/api/quotes/${quote.id}`;

  let quotePutFormat = {
    "id": quote.id,
    "author": quote.author,
    "text": quote.text,
    "dateadded": quote.dateadded
  };

  return fetch(
    url, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'PUT',
      body: JSON.stringify(quotePutFormat)
    }
  );
}