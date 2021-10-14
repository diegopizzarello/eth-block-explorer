import React from 'react';
import { Provider } from 'react-redux'
import { Router } from '@reach/router';

import BlockList from './Screens/BlockList/BlockList';
import Block from './Screens/Block/Block';
import { store } from './store'

function App() {
  return (
    <Provider store={store}>
      <Router>
        <BlockList path="/" />
        <Block path="block/:blockNumber" />
      </Router>
    </Provider>
  );
}

export default App;
