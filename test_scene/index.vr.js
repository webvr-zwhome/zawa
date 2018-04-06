import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { AppRegistry } from 'react-vr';

import App from './src/App';
import { move } from './src/reducers';

const initialState = {
  cameraPosition: [0, 0, 0],
};

let store = createStore(move, initialState);

export default class test_scene extends React.Component {
 
  render() {
    return (
      <Provider store={store}>
        <App />
      </Provider>  
    );
  }
};

AppRegistry.registerComponent('test_scene', () => test_scene);
