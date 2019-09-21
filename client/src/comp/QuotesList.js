import React from 'react';

// Components
import Quote from "./Quote";
import { remoteEditQuote, remoteDeleteQuotes } from '../redux/actions';

// Redux
import { connect } from 'react-redux';
    
const ListDisplay = (props) => {
  let listOfQuotes;

  if(props.quotes) {

    listOfQuotes = props.quotes.map((quote) => {
      return (  
        <Quote
          key={quote.id}
          quote={quote}
          onSaveClick={props.onSaveClick}
          onDeleteClick={props.onDeleteClick}
        />
      )});

  } else {
    listOfQuotes = "No quotes have been added. Be the first!";
  }
  
  return (
    <div>
      {listOfQuotes}
    </div>
  )
};

const mapStateToListDisplayProps = (state) => {

  const returnObj = { quotes: state.quotes };
  
  return returnObj;
}

const mapDispatchToListDisplayProps = (dispatch) => (
  {
    onSaveClick: (quote) => (
      dispatch(remoteEditQuote(quote))
    ),
    onDeleteClick: (id) => (
      dispatch(remoteDeleteQuotes(id))
    ),
    dispatch: dispatch,
  }
);

export default connect(
  mapStateToListDisplayProps,
  mapDispatchToListDisplayProps
)(ListDisplay);