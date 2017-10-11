import React, { Component } from 'react';
import Routers from './src/router';
import { Provider } from 'react-redux';
import configStore from './src/store/config_store';

export default class App extends Component {
  render() {
    const store = configStore();
    window.store = store;
    return (
      <Provider store={ store }>
        <Routers />
      </Provider>
    );
  }
}
