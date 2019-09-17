import React from 'react';
import { Button, Segment, Icon, Message } from 'semantic-ui-react';

// Components
import QuotesAdd from "./QuotesAdd";
import QuotesEdit from "./QuotesEdit";

// Redux
import { connect } from 'react-redux';
import { remoteDeleteQuotes } from '../redux/actions';


const Quote = (props) => {
  if(props.quoteEdit) {
    return (
      <QuotesEdit 
        id={props.quote.id}
      />
    );
  } else {
    return (
      <Segment.Group horizontal>
        <Segment>
          <Message>
            <Message.Header>{props.quote.author}</Message.Header>
            {props.quote.text}
          </Message>
          <Button icon floated='right'
            onClick={() => props.deleteClick(props.quote.id)}>
            <Icon name='trash' />
          </Button>
          <Button icon floated='right'
            onClick={() => props.deleteClick(props.quote.id)}>
            <Icon name='edit' />
          </Button>
        </Segment>
      </Segment.Group>
    );
  }
}
    
const ListDisplay = (props) => {
  let listOfQuotes;
  let stateish = [];

  if(props.quotes) {

    props.quotes.forEach((quote) => {
      stateish.push({
        id: quote.id,
        quoteEdit: false
      });
    });

    listOfQuotes = props.quotes.map((quote) => {
      let quoteEdit = stateish.find((stater) =>  stater.id === quote.id );
      console.log("It got here right?????", stateish); 
      return (  
        <Quote
          key={quote.id}
          quote={quote}
          quoteEdit={quoteEdit.quoteEdit}
          deleteClick={props.onDeleteClick}
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