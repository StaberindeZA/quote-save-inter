import React from 'react';
import uuid from 'uuid';

import store from '../redux/store';
import { addQuote, remoteAddQuotes } from '../redux/actions';

import { Form } from 'semantic-ui-react';

const QuoteAdd = (props) => (
  <Form onSubmit={props.submit}>
    <Form.Input label='Author' placeholder='Author name' type="text" defaultValue={props.author} onChange={props.authorChange}/>
    <Form.TextArea label='Quote' value={props.text} onChange={props.quoteChange} />
    <Form.Button>Add</Form.Button>
  </Form>
)

class QuotesAdd extends React.Component {
  state = {
    text: '',
    author: '',
  }

  onQuoteChange = (event) => {
    let prevState = this.state;
    console.log(event.target.textContent);
    prevState.text = event.target.text;
    this.setState(prevState);
  }

  onAuthorChange = (event) => {
    let prevState = this.state;
    console.log(event);
    prevState.author = event.target.text;
    console.log(prevState);
    this.setState(prevState);
  }

  onSubmit = (event) => {
    event.preventDefault();

    // Build dispatch
    const quote = {
      id: uuid.v4(),
      author: this.state.author,
      text: this.state.text,
      dateadded: new Date()
    }

    store.dispatch(remoteAddQuotes(quote));
    console.log(quote);

    this.setState({text: '', author: ''});
  }

  render() {
    return (
      <QuoteAdd 
        text={this.state.text}
        author={this.state.author}
        submit={this.onSubmit}
        quoteChange={this.onQuoteChange}
        authorChange={this.onAuthorChange}
      />
    )
  }
}

export default QuotesAdd;