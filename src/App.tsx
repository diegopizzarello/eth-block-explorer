import React from 'react';
import BlockList from './Screens/BlockList/BlockList';

import { store } from './store'
import { Provider } from 'react-redux'

function App() {
  return (
    <Provider store={store}>
      <BlockList />
    </Provider>
  );
}

export default App;
