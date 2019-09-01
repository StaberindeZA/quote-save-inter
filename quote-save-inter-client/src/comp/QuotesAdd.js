import React from 'react';

import store from '../redux/store';
import { addQuote, remoteQuotes } from '../redux/actions';

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

    // store.dispatch(addQuote(this.state.value));
    store.dispatch(remoteQuotes(this.state.value));

    this.setState({value: ''});
  }

  componentDidMount() {
    const url = '/api/quotes';
    fetch(url)
      .then(response => response.json())
      .then(
        (quotesList) => {
          quotesList.forEach((quote) => {
            store.dispatch(addQuote(quote.text))
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