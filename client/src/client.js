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
      authoer: quote.author,
      text: quote.text,
      dateadded: quote.dateadded
    };
    store.dispatch(addQuote(fullQuote));
  });
}