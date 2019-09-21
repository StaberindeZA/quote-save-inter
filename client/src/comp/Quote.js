import React from 'react';

// Redux
import { connect } from 'react-redux';
import { remoteEditQuote, remoteDeleteQuotes } from '../redux/actions';

// Components
import QuoteDisplay from "./QuoteDisplay";
import QuoteEdit from "./QuoteEdit";


class Quote extends React.Component {
  state = {
    editEnabled: false,
  }

  onSaveClick = (quote) => {
    this.toggleEdit();
    this.props.onSaveClick(quote);
  }

  onEditClick = () => {
    this.toggleEdit();
  }

  onCancelClick = () => {
    this.toggleEdit();
  }

  toggleEdit = () => {
    this.setState({editEnabled: !this.state.editEnabled})
  }

  render () {
    if(this.state.editEnabled) {
      return (
        <QuoteEdit 
          quote={this.props.quote}
          onSaveClick={this.onSaveClick}
          onCancelClick={this.onCancelClick}
        />
      );
    } else {
      return (
        <QuoteDisplay
          quote={this.props.quote}
          deleteClick={this.props.onDeleteClick}
          editClick={this.onEditClick}
          saveClick={this.props.onSaveClick}
        />
      );
    }
  }  
}

export default Quote;

// const mapDispatchToQuoteProps = (dispatch) => (
//   {
//     onSaveClick: (quote) => (
//       dispatch(remoteEditQuote(quote))
//     ),
//     onDeleteClick: (id) => (
//       dispatch(remoteDeleteQuotes(id))
//     ),
//     dispatch: dispatch,
//   }
// );

// export default connect(
//   null,
//   mapDispatchToQuoteProps
// )(Quote);