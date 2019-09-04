import React from 'react';

import uuid from 'uuid';
import store from '../redux/store';
import { addQuote, remoteAddQuotes } from '../redux/actions';

import { Button, Form } from 'semantic-ui-react';

const QuoteAdd = (props) => (
  <Form onSubmit={props.submit}>
    <Form.TextArea value={props.value} onChange={props.quoteChange} />
    <Form.Button>Add</Form.Button>
  </Form>
)

class QuotesAdd extends React.Component {
  state = {
    value: '',
  }

  onQuoteChange = (event) => {
    this.setState({value: event.target.value});
  }

  onSubmit = (event) => {
    event.preventDefault();

    // Build dispatch
    const quote = {
      id: uuid.v4(),
      author: 'PLACEHOLDER',
      text: this.state.value,
      dateadded: new Date()
    }

    // store.dispatch(addQuote(this.state.value));
    store.dispatch(remoteAddQuotes(quote));

    this.setState({value: ''});
  }

  componentDidMount() {
    const url = '/api/quotes';
    fetch(url)
      .then(response => response.json())
      .then(
        (quotesList) => {
          quotesList.forEach((quote) => {
            const fullQuote = {
              id: quote.id,
              authoer: quote.author,
              text: quote.text,
              dateadded: quote.dateadded
            };
            store.dispatch(addQuote(fullQuote));
          })
        }
        // data => this.setState({value: data[0].text})
        // data => console.log("This is what we want:", data)
        
      );
  }

  render() {
    return (
      <QuoteAdd 
        value={this.state.value}
        submit={this.onSubmit}
        quoteChange={this.onQuoteChange}
      />
    )
  }
}

export default QuotesAdd;