import React from 'react';

// Components
import QuotesAdd from "./QuotesAdd";
import QuotesList from "./QuotesList";

import { Container, Header } from 'semantic-ui-react';

class QuotesContainer extends React.Component {

  render() {
    return (
      <Container>
        <Header as='h1'>Quote Store</Header>
        <QuotesAdd />
        <QuotesList />
      </Container>
    )
  }
}

export default QuotesContainer;