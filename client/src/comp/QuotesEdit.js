import React from 'react';
import uuid from 'uuid';

import store from '../redux/store';

import { Form } from 'semantic-ui-react';

// Redux
import { connect } from 'react-redux';
import { remoteEditQuote } from '../redux/actions';

class QuoteEditDisplay extends React.Component {
  state = {
    value: this.props.quote.text,
  }

  onQuoteChange = (event) => {
    this.setState({value: event.target.value});
  }

  onSaveClick = (event) => {
    event.preventDefault();

    const editQuote = {
      ...this.props.quote,
      text: this.state.value
    }

    this.props.onSaveClick(editQuote);
  }

  render() {
    return (
      <Form onSubmit={this.onSaveClick}>
        <Form.Input label='Author' placeholder='Author'>
          {this.props.quote.author}
        </Form.Input>
        <Form.TextArea value={this.state.value} onChange={this.onQuoteChange} />
        <Form.Button>Save</Form.Button>
      </Form>
    );
  }
};

const mapStateToQuoteEditDisplayProps = (state, ownProps) => {

  const quote = state.quotes.find((quote) => quote.id === ownProps.id);
  const stateProps = { quote: quote };
  
  return stateProps;
}

const mapDispatchToQuoteEditDisplayProps = (dispatch) => (
  {
    onSaveClick: (quote) => (
      dispatch(remoteEditQuote(quote))
    ),
    dispatch: dispatch,
  }
);

export default connect(
  mapStateToQuoteEditDisplayProps,
  mapDispatchToQuoteEditDisplayProps
)(QuoteEditDisplay);