import React from 'react';

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