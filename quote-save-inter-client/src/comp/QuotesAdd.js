import React from 'react';

import store from '../redux/store';
import { addQuote } from '../redux/actions';

import { Button, Form } from 'semantic-ui-react';

const QuoteAdd = (props) => (
  // <div>
  //   <form onSubmit={props.submit}>
  //     <label>
  //       <div class="ui input"><textarea onChange={props.quoteChange} /></div>
  //     </label>
  //     <input type="submit" value="Submit" />
  //   </form>
  // </div>

  <Form onSubmit={props.submit}>
    <Form.TextArea onChange={props.quoteChange} />
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

    store.dispatch(addQuote(this.state.value));

    this.setState({value: ''});
  }

  componentDidMount() {
    const url = '/api/quotes';
    fetch(url)
      .then(response => response.json())
      .then(
        // data => this.setState({value: data[0].text})
        data => console.log(data)
      );
  }

  render() {
    return (
      <QuoteAdd 
        submit={this.onSubmit}
        quoteChange={this.onQuoteChange}
      />
    )
  }
}

export default QuotesAdd;