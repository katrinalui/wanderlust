import React, { Component } from 'react';
import Routers from './src/router';
import { Provider } from 'react-redux';
import configStore from './src/store/config_store';
import { View } from 'react-native';
import firebaseRef from './src/firebase';
import { COLOR, ThemeProvider } from 'react-native-material-ui';

firebaseRef();

const uiTheme = {
    palette: {
      primaryColor: COLOR.blue900,
      accentColor: COLOR.blue700,
    },
    toolbar: {
        container: {
            height: 50
        },
      },
    button: {
      container: {
        backgroundColor: 'blue'
      }
    }
  };

export default class App extends Component {
  render() {
    const store = configStore();
    return (
      <ThemeProvider uiTheme={uiTheme}>
        <Provider store={ store }>
            <Routers />
        </Provider>
      </ThemeProvider>
    );
  }
}
