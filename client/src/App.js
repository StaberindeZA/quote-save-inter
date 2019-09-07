import React from 'react';

// Redux
import { Provider } from 'react-redux';
import store from './redux/store';

// Components
import QuotesContainer from './comp/QuotesContainer';

function App() {
  return (
    <QuotesContainer />
  );
}

const WrappedApp = () => (
  <Provider store={store}>
    <App />
  </Provider>
)

export default WrappedApp;
