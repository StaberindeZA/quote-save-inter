import React from 'react';
import uuid from 'uuid';

import store from '../redux/store';
import { remoteAddQuotes } from '../redux/actions';

import { Form } from 'semantic-ui-react';

const QuoteAdd = (props) => (
  <Form onSubmit={props.submit}>
    <Form.Input label='Author' placeholder='Author name' type="text" value={props.author} onChange={props.authorChange}/>
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
    prevState.text = event.target.value;
    this.setState(prevState);
  }

  onAuthorChange = (event) => {
    let prevState = this.state;    
    prevState.author = event.target.value;
    this.setState(prevState);
  }

  onSubmit = (event) => {
    event.preventDefault();
    
    // Build dispatch
    const quote = {
      id: uuid.v4(),
      dateadded: new Date(),
      ...this.state
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