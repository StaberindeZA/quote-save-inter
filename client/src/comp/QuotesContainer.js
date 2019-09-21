import React from 'react';

import '../styles/QuotesContainer.css';

// Components
import QuotesAdd from "./QuotesAdd";
import QuotesList from "./QuotesList";

import { initialLoadStore } from '../client';

import { Container, Header, Icon } from 'semantic-ui-react';

class QuotesContainer extends React.Component {
  componentDidMount() {
    // Client - Get items from DB and load into Store
    initialLoadStore();  
  }

  render() {
    return (
      <Container className='quote-container'>
        <Header as='h1'>
          <Icon name='quote right' />
          <Header.Content>
            Quote Store
          </Header.Content>
        </Header>
        <QuotesAdd />
        <QuotesList />
      </Container>
    )
  }
}

export default QuotesContainer;