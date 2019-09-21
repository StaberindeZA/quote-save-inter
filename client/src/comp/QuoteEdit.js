import React from 'react';

import { Form, Segment, Button } from 'semantic-ui-react';


class QuoteEdit extends React.Component {
  state = {
    author: this.props.quote.author,
    value: this.props.quote.text,
  }

  onQuoteChange = (event) => {
    this.setState({value: event.target.value});
  }

  onAuthorChange = (event) => {
    this.setState({author: event.target.value});
  }

  onSaveClick = (event) => {
    event.preventDefault();
    const editQuote = {
      id: this.props.quote.id,
      author: this.state.author,
      text: this.state.value,
      dateadded: this.props.quote.dateadded
    }

    this.props.onSaveClick(editQuote);
  }

  render() {
    return (
      <Segment.Group horizontal>
        <Segment>
          <Form>
            <Form.Input label='Author' placeholder='Author' value={this.state.author} onChange={this.onAuthorChange} />
            <Form.TextArea label='Quote' value={this.state.value} onChange={this.onQuoteChange} />
            <Button onClick={this.onSaveClick}>Save</Button>
            <Button onClick={this.props.onCancelClick}>Cancel</Button>
          </Form>
        </Segment>
      </Segment.Group>
    );
  }
};

export default QuoteEdit;