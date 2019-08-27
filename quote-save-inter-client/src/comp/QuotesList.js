import React from 'react';
import { Button, Segment, Icon } from 'semantic-ui-react';

// Redux
import { connect } from 'react-redux';
import { deleteQuote } from '../redux/actions';


const Quote = (props) => (
  <Segment.Group horizontal>
    <Segment>
      {props.quote.text}
    </Segment>
    <Segment>
      <Button icon floated='right'
        onClick={() => props.deleteClick(props.quote.id)}>
        <Icon name='trash' />
      </Button>
    </Segment>
  </Segment.Group>
    
)

const ListDisplay = (props) => {

  const listOfQuotes = props.quotes.map((quote) => (
    <Quote
      key={quote.id}
      quote={quote}
      deleteClick={props.onDeleteClick}
    />
  ));
  
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
      dispatch(deleteQuote(id))
    ),
    dispatch: dispatch,
  }
);

export default connect(
  mapStateToListDisplayProps,
  mapDispatchToListDisplayProps
)(ListDisplay);