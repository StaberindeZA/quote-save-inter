import React from 'react';
import { Button, Segment, Icon, Message } from 'semantic-ui-react';

const QuoteDisplay = (props) => {
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
          onClick={() => props.editClick(props.quote.id)}>
          <Icon name='edit' />
        </Button>
      </Segment>
    </Segment.Group>
  );
}

export default QuoteDisplay;