import React from 'react';
import uuid from 'uuid';

import store from '../redux/store';
import { addQuote, remoteAddQuotes } from '../redux/actions';

import { Form } from 'semantic-ui-react';

const QuoteAdd = (props) => (
  <Form onSubmit={props.submit}>
    <Form.Input label='Author' placeholder='Author name' />
    <Form.TextArea label='Quote' value={props.value} onChange={props.quoteChange} />
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
    console.log(quote);

    this.setState({value: ''});
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